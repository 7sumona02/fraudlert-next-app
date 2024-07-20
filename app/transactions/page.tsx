'use client'

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { CartesianGrid, XAxis, Bar, BarChart, Line, LineChart } from "recharts"
import { Input } from "@/components/ui/input"
import { ActivityIcon, BellIcon, ChevronLeftIcon, ChevronRightIcon, CircleAlertIcon, DownloadIcon, EyeIcon, FilterIcon, MenuIcon, SettingsIcon, ShieldCheckIcon, User } from "lucide-react"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Pagination, PaginationContent, PaginationItem } from "@/components/ui/pagination"
import Search from "./Search"
import { useEffect, useState } from "react"
import { transactions } from "@prisma/client"
import { getLatest6Month, getTransactionsByDay } from "@/actions/db"

export default function Page() {
  const [Last5Days, setLast5Days] = useState<{
    [key: string]: {
        amount: number;
        status: string;
        flag: string;
    };
} | null>();

const [Last6Month, setLast6Month] = useState<{
  [key: string]: {
      amount: number;
      month: string;
  };
} | null>();

  useEffect(() => {
    const fetchLast5Days = async () => {
      // get transactions of last 5 days from today and give the total amount group by date and max status and maximum flag appeared
      const data = await getTransactionsByDay(5);
      const data2 = await getLatest6Month();
      setLast5Days(data)
      setLast6Month(data2)
      console.log(data2)
    }
    fetchLast5Days()
  }, []);

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <Search />
      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
        <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Transactions</CardTitle>
              <CardDescription>Monitor and analyze financial transactions.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative w-full overflow-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Amount</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {Last5Days && Object.entries(Last5Days).map(([date, data]) => (
                      <TableRow key={date}>
                        <TableCell>${data.amount.toFixed(2)}</TableCell>
                        <TableCell>{date}</TableCell>
                        <TableCell>Multiple Locations</TableCell>
                        <TableCell>
                          <Badge variant={data.flag === "Fraudulent" ? "outline" : "secondary"}>{data.flag}</Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="outline" size="icon">
                            <EyeIcon className="h-4 w-4" />
                            <span className="sr-only">View</span>
                          </Button>
                        </TableCell>
                      </TableRow>
                  ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
            <CardFooter>
              <div className="flex items-center justify-between">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="h-7 gap-1 text-sm">
                      <FilterIcon className="h-3.5 w-3.5" />
                      <span className="sr-only sm:not-sr-only">Filter</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuCheckboxItem checked>Legitimate</DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem>Fraudulent</DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem>Pending</DropdownMenuCheckboxItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="outline" className="h-7 gap-1 text-sm">
                    <DownloadIcon className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only">Export</span>
                  </Button>
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <Button size="icon" variant="outline" className="h-6 w-6">
                          <ChevronLeftIcon className="h-3.5 w-3.5" />
                          <span className="sr-only">Previous</span>
                        </Button>
                      </PaginationItem>
                      <PaginationItem>
                        <Button size="icon" variant="outline" className="h-6 w-6">
                          <ChevronRightIcon className="h-3.5 w-3.5" />
                          <span className="sr-only">Next</span>
                        </Button>
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              </div>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Fraud Alerts</CardTitle>
              <CardDescription>Monitor and manage fraud alerts.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="flex items-start gap-4 rounded-md bg-accent p-4 text-accent-foreground">
                  <CircleAlertIcon className="mt-1 h-5 w-5" />
                  <div className="grid gap-1">
                    <div className="flex items-center gap-2">
                      <div className="font-medium">Suspicious Transaction</div>
                      <div className="text-xs text-muted-foreground">2023-06-24 15:32</div>
                    </div>
                    <p>A transaction of $150.00 from Los Angeles, CA is flagged as potentially fraudulent.</p>
                    <div className="flex items-center gap-2">
                      <Button variant="secondary" size="sm">
                        Acknowledge
                      </Button>
                      <Button variant="outline" size="sm">
                        Resolve
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-4 rounded-md bg-accent p-4 text-accent-foreground">
                  <CircleAlertIcon className="mt-1 h-5 w-5" />
                  <div className="grid gap-1">
                    <div className="flex items-center gap-2">
                      <div className="font-medium">Unusual Spending Pattern</div>
                      <div className="text-xs text-muted-foreground">2023-06-23 18:45</div>
                    </div>
                    <p>Multiple transactions from different locations within a short time frame have been detected.</p>
                    <div className="flex items-center gap-2">
                      <Button variant="secondary" size="sm">
                        Acknowledge
                      </Button>
                      <Button variant="outline" size="sm">
                        Resolve
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-4 rounded-md bg-accent p-4 text-accent-foreground">
                  <CircleAlertIcon className="mt-1 h-5 w-5" />
                  <div className="grid gap-1">
                    <div className="flex items-center gap-2">
                      <div className="font-medium">Potential Account Compromise</div>
                      <div className="text-xs text-muted-foreground">2023-06-22 11:27</div>
                    </div>
                    <p>Unusual login activity and multiple failed attempts have been detected on the account.</p>
                    <div className="flex items-center gap-2">
                      <Button variant="secondary" size="sm">
                        Acknowledge
                      </Button>
                      <Button variant="outline" size="sm">
                        Resolve
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Fraud Analytics</CardTitle>
              <CardDescription>Visualize transaction patterns and trends.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col">
                <BarchartChart className="w-full" />
                <LinechartChart  className="aspect-[16/9]"  />
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

interface BarchartChartProps extends React.HTMLAttributes<HTMLDivElement> {
  }

  function BarchartChart(props: BarchartChartProps) {
    return (
      <div {...props}>
        <ChartContainer
          config={{
            desktop: {
              label: "Desktop",
              color: "#2563eb",
            },
          }}
          className="min-h-[140px]"
        >
          <BarChart
            accessibilityLayer
            data={[
              { month: "February", desktop: 305 },
              { month: "March", desktop: 237 },
              { month: "April", desktop: 73 },
              { month: "May", desktop: 209 },
              { month: "June", desktop: 214 },
              { month: "July", desktop: 186 },
            ]}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Bar dataKey="desktop" fill="var(--color-desktop)" radius={8} />
          </BarChart>
        </ChartContainer>
      </div>
    )
  }
  
  interface LinechartChartProps extends React.HTMLAttributes<HTMLDivElement> {
  }
  
  function LinechartChart(props: LinechartChartProps) {
    return (
      <div {...props}>
        <ChartContainer
          config={{
            desktop: {
              label: "Desktop",
              color: "#2563eb",
            },
          }}
        >
          <LineChart
            accessibilityLayer
            data={[
              { month: "February", desktop: 305 },
              { month: "March", desktop: 237 },
              { month: "April", desktop: 73 },
              { month: "May", desktop: 209 },
              { month: "June", desktop: 214 },
              { month: "July", desktop: 186 },
            ]}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Line dataKey="desktop" type="natural" stroke="var(--color-desktop)" strokeWidth={2} dot={false} />
          </LineChart>
        </ChartContainer>
      </div>
    )
  }