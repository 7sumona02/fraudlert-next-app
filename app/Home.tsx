'use client'

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { dataUpload } from "@/actions/db"

interface SelectProps {
  children: React.ReactNode;
  id: string;
  className: string;
}

export default function Home() {
  async function upload() {
    await dataUpload();
    console.log("Done")
  }
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 grid grid-cols-1 md:grid-cols-[240px_1fr] gap-4 p-4 md:p-6">
        <div className="bg-background rounded-lg shadow-sm p-4 md:p-6">
          <h2 className="text-lg font-semibold mb-4">Filters</h2>
          <div className="grid gap-4">
            <div>
              <Label htmlFor="transaction-type">Transaction Type</Label>
              <Select >
                <option value="">All</option>
                <option value="purchase">Purchase</option>
                <option value="withdrawal">Withdrawal</option>
                <option value="deposit">Deposit</option>
              </Select>
            </div>
            <div>
              <Label htmlFor="transaction-amount">Amount</Label>
              <div className="flex gap-2">
                <Input id="transaction-amount-min" type="number" placeholder="Min" className="w-full" />
                <Input id="transaction-amount-max" type="number" placeholder="Max" className="w-full" />
              </div>
            </div>
            <div>
              <Label htmlFor="transaction-status">Status</Label>
              <Select>
                <option value="">All</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="declined">Declined</option>
              </Select>
            </div>
            <Button className="w-full">Apply Filters</Button>
          </div>
        </div>
        <div className="bg-background rounded-lg shadow-sm p-4 md:p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Recent Transactions</h2>
            <Button onClick={upload} variant="outline" size="sm">
              Export
            </Button>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Timestamp</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Flags</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>2023-04-15 10:23 AM</TableCell>
                <TableCell>$250.00</TableCell>
                <TableCell>New York, NY</TableCell>
                <TableCell>
                  <Badge variant="secondary">Pending</Badge>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">High Risk</Badge>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>2023-04-14 3:45 PM</TableCell>
                <TableCell>$100.00</TableCell>
                <TableCell>Los Angeles, CA</TableCell>
                <TableCell>
                  <Badge variant="secondary">Pending</Badge>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">Unusual Location</Badge>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>2023-04-13 9:12 AM</TableCell>
                <TableCell>$500.00</TableCell>
                <TableCell>Chicago, IL</TableCell>
                <TableCell>
                  <Badge variant="default">Approved</Badge>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">Large Amount</Badge>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>2023-04-12 2:30 PM</TableCell>
                <TableCell>$75.00</TableCell>
                <TableCell>Miami, FL</TableCell>
                <TableCell>
                  <Badge variant="destructive">Declined</Badge>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">Suspicious Activity</Badge>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>2023-04-11 11:00 AM</TableCell>
                <TableCell>$300.00</TableCell>
                <TableCell>Seattle, WA</TableCell>
                <TableCell>
                  <Badge variant="default">Approved</Badge>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">Unusual Frequency</Badge>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <div className="bg-background rounded-lg shadow-sm p-4 md:p-6 col-span-1 md:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Alerts</h2>
            <Button variant="outline" size="sm">
              Resolve All
            </Button>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Timestamp</TableHead>
                <TableHead>Alert Type</TableHead>
                <TableHead>Details</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>2023-04-15 11:30 AM</TableCell>
                <TableCell>Suspicious Activity</TableCell>
                <TableCell>Unusual transaction pattern detected for account #123456789</TableCell>
                <TableCell>
                  <Badge variant="secondary">Pending</Badge>
                </TableCell>
                <TableCell>
                  <Button variant="outline" size="sm">
                    Investigate
                  </Button>
                  <Button variant="outline" size="sm">
                    Resolve
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>2023-04-14 4:45 PM</TableCell>
                <TableCell>Unusual Location</TableCell>
                <TableCell>Transaction from an unfamiliar location for account #987654321</TableCell>
                <TableCell>
                  <Badge variant="secondary">Pending</Badge>
                </TableCell>
                <TableCell>
                  <Button variant="outline" size="sm">
                    Investigate
                  </Button>
                  <Button variant="outline" size="sm">
                    Resolve
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>2023-04-13 10:00 AM</TableCell>
                <TableCell>Large Amount</TableCell>
                <TableCell>Unusually large transaction for account #456789123</TableCell>
                <TableCell>
                  <Badge variant="default">Resolved</Badge>
                </TableCell>
                <TableCell>
                  <Button variant="outline" size="sm">
                    View
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>2023-04-12 3:15 PM</TableCell>
                <TableCell>Unusual Frequency</TableCell>
                <TableCell>Multiple transactions in a short period for account #789123456</TableCell>
                <TableCell>
                  <Badge variant="secondary">Pending</Badge>
                </TableCell>
                <TableCell>
                  <Button variant="outline" size="sm">
                    Investigate
                  </Button>
                  <Button variant="outline" size="sm">
                    Resolve
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </main>
    </div>
  )
}
