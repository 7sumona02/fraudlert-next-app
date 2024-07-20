import Link from "next/link"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem, DropdownMenuCheckboxItem } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { BadgeAlertIcon, BellIcon, ExpandIcon, FilterIcon, ListOrderedIcon, PercentIcon } from "lucide-react"

export default function Page() {
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
              <div className="text-2xl font-bold">12,345</div>
              <p className="text-xs text-muted-foreground">+5.2% from last month</p>
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
              <div className="text-2xl font-bold">78</div>
              <p className="text-xs text-muted-foreground">+12 new alerts this week</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Fraud Rate</CardTitle>
              <PercentIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2.5%</div>
              <p className="text-xs text-muted-foreground">-0.3% from last month</p>
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
                <TableRow>
                  <TableCell className="font-medium">TX123456</TableCell>
                  <TableCell>$250.00</TableCell>
                  <TableCell>
                    <Badge variant="secondary">Normal</Badge>
                  </TableCell>
                  <TableCell>2023-06-23 10:42 AM</TableCell>
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
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Flag as Fraudulent</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">TX987654</TableCell>
                  <TableCell>$150.00</TableCell>
                  <TableCell>
                    <Badge variant="outline">Fraudulent</Badge>
                  </TableCell>
                  <TableCell>2023-06-24 03:21 PM</TableCell>
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
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Flag as Normal</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">TX456789</TableCell>
                  <TableCell>$350.00</TableCell>
                  <TableCell>
                    <Badge variant="secondary">Normal</Badge>
                  </TableCell>
                  <TableCell>2023-06-25 08:15 AM</TableCell>
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
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Flag as Fraudulent</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">TX789012</TableCell>
                  <TableCell>$450.00</TableCell>
                  <TableCell>
                    <Badge variant="secondary">Normal</Badge>
                  </TableCell>
                  <TableCell>2023-06-26 12:00 PM</TableCell>
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
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Flag as Fraudulent</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">TX012345</TableCell>
                  <TableCell>$550.00</TableCell>
                  <TableCell>
                    <Badge variant="outline">Fraudulent</Badge>
                  </TableCell>
                  <TableCell>2023-06-27 09:30 AM</TableCell>
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
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Flag as Normal</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter>
            <div className="text-xs text-muted-foreground">
              Showing <strong>1-10</strong> of <strong>32</strong> transactions
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
