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