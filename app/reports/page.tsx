'use client'
import Link from "next/link"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem, DropdownMenuCheckboxItem } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { BadgeAlertIcon, BellIcon, ExpandIcon, FilterIcon, ListOrderedIcon, PercentIcon } from "lucide-react"
import { useEffect, useState } from "react"
import { AlertCount, getLatestTransactions, TransactionCount } from "@/actions/db"
import { transactions } from "@prisma/client"

export default function Page() {
  const [TData, setTData] = useState<{thismonth: number, lastmonth: number} | null>();
  const [AData, setAData] = useState<{thismonth: number, lastmonth: number} | null>();
  const [LatestTransactions, setLatestTransactions] = useState<transactions[] | null>();

  async function getTransactionCount(){
    const res = await TransactionCount()
    console.log(res)
    setTData(res)
    const alert = await AlertCount()
    setAData(alert)
  }
  
  useEffect(() => {
    getTransactionCount()
    const fetchLatestTransactions = async () => {
      const data = await getLatestTransactions(50);
      setLatestTransactions(data)
    }
    fetchLatestTransactions()
  }, []);
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40 py-6">
      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Transactions</CardTitle>
              <Button size="sm" variant="outline" className="h-8 gap-1">
                <FilterIcon className="h-4 w-4" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Filter</span>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{TData?.thismonth}</div>
              <p className="text-xs text-muted-foreground">{TData && Math.round(100*(TData.thismonth*2 - TData.lastmonth)/TData.lastmonth)}% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Alerts</CardTitle>
              <Button size="sm" variant="outline" className="h-8 gap-1">
                <BellIcon className="h-4 w-4" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">View Alerts</span>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{AData?.thismonth}</div>
              <p className="text-xs text-muted-foreground">{AData && AData.lastmonth - 2*AData.thismonth} new alerts this month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Fraud Rate</CardTitle>
              <PercentIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{TData && AData && Math.round(100*AData.thismonth/TData.thismonth)}%</div>
              <p className="text-xs text-muted-foreground">{TData && AData && Math.round(100*AData.lastmonth/TData.lastmonth -  100*AData.thismonth/TData.thismonth)}% from last month</p>
            </CardContent>
          </Card>
        </div>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Recent Transactions</CardTitle>
            <div className="flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size="sm" variant="outline" className="h-8 gap-1">
                    <FilterIcon className="h-4 w-4" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Filter</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuCheckboxItem checked>Normal</DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem>Fraudulent</DropdownMenuCheckboxItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size="sm" variant="outline" className="h-8 gap-1">
                    <ListOrderedIcon className="h-4 w-4" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Sort</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Sort by</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuCheckboxItem checked>Date</DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem>Amount</DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem>Status</DropdownMenuCheckboxItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Transaction ID</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Timestamp</TableHead>
                  <TableHead>
                    <span className="sr-only">Actions</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {LatestTransactions?.map((transaction) => (
                  <TableRow key={transaction.transactionId}>
                    <TableCell className="font-medium">{transaction.transactionId}</TableCell>
                    <TableCell>${transaction.amount}</TableCell>
                    <TableCell>
                      <Badge variant={transaction.status === 'Approved' ? 'default' : 'destructive'}>{transaction.status}</Badge>
                    </TableCell>
                    <TableCell>{transaction.createdAt.toString()}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button aria-haspopup="true" size="icon" variant="ghost">
                            <ExpandIcon className="h-4 w-4" />
                            <span className="sr-only">Toggle menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem>
                            <Link href={`/transactions/${transaction.transactionId}`}>
                              View Details
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem>Flag as Fraudulent</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
                
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter>
            <div className="text-xs text-muted-foreground">
              Showing <strong>1-50</strong> of <strong>10000</strong> transactions
            </div>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Alerts</CardTitle>
            <Button size="sm" variant="outline" className="h-8 gap-1">
              <BellIcon className="h-4 w-4" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">View All</span>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground">
                  <BadgeAlertIcon className="h-5 w-5" />
                </div>
                <div className="grid gap-1">
                  <div className="font-medium">Suspicious Activity Detected</div>
                  <p className="text-sm text-muted-foreground">
                    A transaction of $550 from an unknown IP address was flagged as potentially fraudulent.
                  </p>
                  <div className="text-xs text-muted-foreground">2023-06-27 09:30 AM</div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground">
                  <BadgeAlertIcon className="h-5 w-5" />
                </div>
                <div className="grid gap-1">
                  <div className="font-medium">Unusual Transaction Pattern</div>
                  <p className="text-sm text-muted-foreground">
                    A series of small transactions from the same account within a short time frame has been detected.
                  </p>
                  <div className="text-xs text-muted-foreground">2023-06-26 03:45 PM</div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground">
                  <BadgeAlertIcon className="h-5 w-5" />
                </div>
                <div className="grid gap-1">
                  <div className="font-medium">Potential Account Compromise</div>
                  <p className="text-sm text-muted-foreground">
                    Unusual login activity from a new device has been detected on an account.
                  </p>
                  <div className="text-xs text-muted-foreground">2023-06-25 11:20 AM</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
