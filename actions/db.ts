'use server'

import df from '../public/csvjson.json'
import {faker} from '@faker-js/faker'
import { PrismaClient, transactions } from '@prisma/client'

const prisma = new PrismaClient()

type DB = {
    sn: number;
    type: string;
    amount: number;
    oldbalanceOrg: number;
    newbalanceOrg: number;
    isFraud: number;
  };

function dataGen(data: DB): transactions{
  const date = faker.date.recent({days: 180})
  return {
    transactionId: faker.string.uuid(),
    transactionType: data.type,
    amount: data.amount,
    oldBalance: data.oldbalanceOrg,
    newBalance: data.newbalanceOrg,
    createdAt: date,
    updatedAt: date,
    status: data.isFraud === 1 ? 'Disapproved' : 'Approved',
    accountNo: parseInt(faker.finance.accountNumber(7)),
    details: null,
    alertType: data.isFraud === 1 ? 'Fraud' : 'Completed',
    flag: data.isFraud === 1 ? 'Suspicious' : 'Clear',
}
}


export async function dataUpload(){
  
  const arr: transactions[] = df.map((d)=>{
  return dataGen(d)
})
  await prisma.transactions.createMany({
    data: arr
  })

};


export async function getLatestTransactions(n?: number){
  const data = await prisma.transactions.findMany({
    take: n || 20,
    orderBy: {
      createdAt: 'desc'
    }
  })
  return data
}

export async function getTransactionsByDay(days: number){
  // get transactions of last 5 days from today and give the total amount group by date and max status and maximum flag appeared

  const result = await prisma.transactions.findMany({
    where: {
      createdAt: {
        gte: new Date(new Date().setDate(new Date().getDate() - days))
      }
    },
    select: {
      createdAt: true,
      amount: true,
      status: true,
      flag: true
    },
    orderBy: {
      createdAt: 'desc'
    }
  })


  const data = result.reduce((acc, curr)=>{
    const date = curr.createdAt.toISOString().split('T')[0]
    let flag = 0;
    if(acc[date] && acc[date].flag && curr.flag){
      acc[date].amount += curr.amount
      acc[date].status = acc[date].status < curr.status ? curr.status : acc[date].status
      acc[date].flag = acc[date].flag < curr.flag ? curr.flag : acc[date].flag
    }else{
      acc[date] = {
        amount: curr.amount,
        status: curr.status,
        flag: curr.flag || ""
      }
    }
    return acc
  }
  ,{} as {[key: string]: {amount: number, status: string, flag
  : string}})

  return data
  // return result;
}

export async function getLatest6Month(){
  const result = await prisma.transactions.findMany({
    where: {
      createdAt: {
        gte: new Date(new Date().setMonth(new Date().getMonth() - 6))
      }
    },
    select: {
      createdAt: true,
      amount: true,
    },
    orderBy: {
      createdAt: 'desc'
    }
  })
  // monthly data array like [{month: 'jan', amount: 1000}, {month: 'feb', amount: 2000]
  const data = result.reduce((acc, curr)=>{
    const month = curr.createdAt.toISOString().split('-')[1]
    if(acc[month]){
      acc[month].amount += curr.amount
      acc[month].month = month  
    }else{
      acc[month] = {
        amount: curr.amount,
        month: month
      }
    }
    return acc
  },{} as {[key: string]: {amount: number, month: string}})

  return data

}


export async function TransactionCount(){
  const thismonth = await prisma.transactions.count({
    where: {
      createdAt: {
        gte: new Date(new Date().setMonth(new Date().getMonth() - 1))
      }
    }
  })
  const lastmonth = await prisma.transactions.count({
    where: {
      createdAt: {
        gte: new Date(new Date().setMonth(new Date().getMonth() - 2))
      }
    }
  })
  return {
    thismonth,
    lastmonth
  }
}




export async function AlertCount(){
  const thismonth = await prisma.transactions.count({
    where: {
      createdAt: {
        gte: new Date(new Date().setMonth(new Date().getMonth() - 1))
      },
      alertType: 'Fraud'
    }
  })
  const lastmonth = await prisma.transactions.count({
    where: {
      createdAt: {
        gte: new Date(new Date().setMonth(new Date().getMonth() - 2))
      },
      alertType: 'Fraud'
    }
  })
  return {
    thismonth,
    lastmonth,
  }
}

export async function getLatestTransactionDate(){
  const result = await prisma.transactions.findMany({
    take: 1,
    orderBy: {
      createdAt: 'desc'
    }
  })
  return result[0]
}

export async function getTransactionByType(till: Date){
  const result = await prisma.transactions.findMany({
    where:{
      createdAt: {
        gt: till
      },
      status: 'processing'
    },
  })

  return result
}

export async function setTransactionData(id: string, status: string, alertType: string, flag: string){
  const result = await prisma.transactions.update({
    where: {
      transactionId: id
    },
    data: {
      status,
      alertType,
      flag
    }
  })
  return result
}