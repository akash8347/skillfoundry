// app/dashboard/page.jsx
"use client";

import * as React from "react";
import { useState, useEffect, useMemo } from "react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from "recharts";
import { Calendar as CalendarIcon, IndianRupee, Search } from "lucide-react";
import { DateRange } from "react-day-picker";
import {
  addDays, format, startOfMonth, endOfMonth,
  startOfYear, endOfYear, getMonth, getYear
} from "date-fns";
import { cn } from "@/lib/utils"; // From Shadcn/UI
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

// --- Helper Functions for Date and FY Logic ---

const BUSINESS_START_YEAR = 2025;

// Generates an array of financial year strings (e.g., "2025-2026")
const generateFyOptions = () => {
  const currentYear = getYear(new Date());
  const currentMonth = getMonth(new Date());
  // FY starts in April (month index 3)
  const latestFyStartYear = currentMonth >= 3 ? currentYear : currentYear - 1;
  
  const options = [];
  for (let year = latestFyStartYear; year >= BUSINESS_START_YEAR; year--) {
    options.push(`${year}-${year + 1}`);
  }
  return options;
};

// Constant for months in a financial year
const fyMonths = [
  { label: "April", value: 3 }, { label: "May", value: 4 }, { label: "June", value: 5 },
  { label: "July", value: 6 }, { label: "August", value: 7 }, { label: "September", value: 8 },
  { label: "October", value: 9 }, { label: "November", value: 10 }, { label: "December", value: 11 },
  { label: "January", value: 0 }, { label: "February", value: 1 }, { label: "March", value: 2 },
];

// --- Sub-components for better organization ---

const CardSkeleton = () => (
  <Card className="animate-pulse">
    <CardHeader>
      <div className="h-6 bg-muted rounded w-3/4"></div>
      <div className="h-4 bg-muted rounded w-1/2 mt-1"></div>
    </CardHeader>
    <CardContent>
      <div className="h-8 bg-muted rounded w-1/3"></div>
      <div className="h-4 bg-muted rounded w-full mt-2"></div>
    </CardContent>
  </Card>
);

const InvoiceDetailSheet = ({ invoice, onOpenChange }) => {
    if (!invoice) return null;

    return (
        <Sheet open={!!invoice} onOpenChange={onOpenChange}>
            <SheetContent className="sm:max-w-lg w-[90vw] overflow-y-auto">
                <SheetHeader className="text-left">
                    <SheetTitle>Invoice Details</SheetTitle>
                    <SheetDescription>
                        Details for invoice #{invoice.invoiceNumber}.
                    </SheetDescription>
                </SheetHeader>
                <div className="divide-y divide-muted-foreground/20 mt-4">
                    <div className="py-3">
                        <h3 className="text-lg font-semibold mb-2">Customer</h3>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                            <p className="text-muted-foreground">Name:</p><p>{invoice.user?.name || invoice.name}</p>
                            <p className="text-muted-foreground">Email:</p><p>{invoice.user?.email || invoice.email}</p>
                            <p className="text-muted-foreground">Phone:</p><p>{invoice.user?.mobile || invoice.phone}</p>
                            <p className="text-muted-foreground">Country:</p><p>{invoice.country}</p>
                        </div>
                    </div>
                    <div className="py-3">
                        <h3 className="text-lg font-semibold mb-2">Items</h3>
                        <Table>
                            <TableHeader><TableRow><TableHead>Description</TableHead><TableHead>HSN</TableHead><TableHead className="text-right">Amount</TableHead></TableRow></TableHeader>
                            <TableBody>
                                {invoice.items.map((item, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{item.description}</TableCell><TableCell>{item.hsn}</TableCell>
                                        <TableCell className="text-right">{(item.amount || 0).toLocaleString(undefined, {style: 'currency', currency: invoice.currency})}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                    <div className="py-3">
                        <h3 className="text-lg font-semibold mb-2">Summary</h3>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                            <p className="text-muted-foreground">Subtotal:</p><p className="text-right">{(invoice.subTotal || 0).toLocaleString(undefined, {style: 'currency', currency: invoice.currency})}</p>
                            <p className="text-muted-foreground font-semibold">Total:</p><p className="text-right font-semibold">{(invoice.total || 0).toLocaleString(undefined, {style: 'currency', currency: invoice.currency})}</p>
                            <p className="text-muted-foreground">Total (INR):</p><p className="text-right">₹{(invoice.convertedINRAmount || 0).toLocaleString('en-IN')}</p>
                        </div>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
};

// --- Main Dashboard Component ---

export default function InvoiceDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;
  
  // State for new filters
  const [search, setSearch] = useState("");
  const [fyOptions, setFyOptions] = useState([]);
  const [selectedFy, setSelectedFy] = useState("");
  const [selectedMonth, setSelectedMonth] = useState(getMonth(new Date()).toString());
  const [dateRange, setDateRange] = React.useState({
    from: new Date(),
    to: new Date(),
  });

  // Initialize financial year options and set the default selected FY
  useEffect(() => {
    const options = generateFyOptions();
    setFyOptions(options);
    if (options.length > 0) {
      setSelectedFy(options[0]);
    }
  }, []);

  // Main data fetching effect
  useEffect(() => {
    // Don't fetch if the date range is not set
    if (!dateRange?.from || !dateRange?.to) return;

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const params = new URLSearchParams({
          page,
          limit: itemsPerPage,
          search,
          startDate: format(dateRange.from, "yyyy-MM-dd"),
          endDate: format(dateRange.to, "yyyy-MM-dd"),
        });
        const response = await fetch(`/api/invoices?${params.toString()}`);
        if (!response.ok) throw new Error(`Failed to fetch data: ${response.statusText}`);
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dateRange, page, search]);

  // Handler for changing the Financial Year
  const handleFyChange = (fy) => {
    setSelectedFy(fy);
    const [startYear] = fy.split('-').map(Number);
    // When FY changes, set the date range to the entire financial year
    const newFromDate = new Date(startYear, 3, 1); // April 1st
    const newToDate = new Date(startYear + 1, 2, 31); // March 31st
    setDateRange({ from: newFromDate, to: newToDate });
    // Reset month selection or set to a valid month within that year
    setSelectedMonth(null); // Let user pick a month for the new FY
  };

  // Handler for changing the Month
  const handleMonthChange = (monthValue) => {
    if (!selectedFy) return;
    const monthIndex = parseInt(monthValue, 10);
    setSelectedMonth(monthValue);
    
    const [startYear] = selectedFy.split('-').map(Number);
    // For Jan, Feb, March, the year is the second part of the FY string
    const year = monthIndex < 3 ? startYear + 1 : startYear;

    const newFromDate = startOfMonth(new Date(year, monthIndex, 1));
    const newToDate = endOfMonth(new Date(year, monthIndex, 1));
    setDateRange({ from: newFromDate, to: newToDate });
  };
  
  const totalPages = data?.tableData?.totalPages || 1;

  if (error) return <div className="flex items-center justify-center h-screen text-red-500 text-center p-4">Error: {error}</div>;

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
            {/* --- Advanced Filters --- */}
            <div className="flex flex-wrap items-center gap-4">
              {/* Date Range Picker */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="date"
                    variant={"outline"}
                    className={cn(
                      "w-[260px] justify-start text-left font-normal",
                      !dateRange && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateRange?.from ? (
                      dateRange.to ? (
                        <>
                          {format(dateRange.from, "LLL dd, y")} -{" "}
                          {format(dateRange.to, "LLL dd, y")}
                        </>
                      ) : (
                        format(dateRange.from, "LLL dd, y")
                      )
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    initialFocus
                    mode="range"
                    defaultMonth={dateRange?.from}
                    selected={dateRange}
                    onSelect={setDateRange}
                    numberOfMonths={2}
                  />
                </PopoverContent>
              </Popover>

              {/* Financial Year Selector */}
              <Select value={selectedFy} onValueChange={handleFyChange}>
                  <SelectTrigger className="w-[200px]">
                      <SelectValue placeholder="Select Financial Year" />
                  </SelectTrigger>
                  <SelectContent>
                      {fyOptions.map(fy => <SelectItem key={fy} value={fy}>FY {fy}</SelectItem>)}
                  </SelectContent>
              </Select>

              {/* Month Selector */}
              <Select value={selectedMonth} onValueChange={handleMonthChange}>
                  <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select Month" />
                  </SelectTrigger>
                  <SelectContent>
                      {fyMonths.map(month => <SelectItem key={month.value} value={month.value.toString()}>{month.label}</SelectItem>)}
                  </SelectContent>
              </Select>
            </div>
            
            {/* --- Metric Cards --- */}
            <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
                {loading ? Array.from({ length: 4 }).map((_, i) => <CardSkeleton key={i} />) : (
                    <>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"><CardTitle className="text-sm font-medium">Total Sales (INR)</CardTitle><IndianRupee className="h-4 w-4 text-muted-foreground" /></CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">₹{(data.metrics?.totalINR || 0).toLocaleString('en-IN')}</div>
                                <p className="text-xs text-muted-foreground">Total from {data.metrics?.invoiceCount || 0} invoices in period.</p>
                            </CardContent>
                        </Card>
                        {data.metrics?.salesByCurrency?.map(({ currency, totalAmount, count }) => (
                            <Card key={currency}>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"><CardTitle className="text-sm font-medium">Total Sales ({currency})</CardTitle></CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{(totalAmount || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} {currency}</div>
                                    <p className="text-xs text-muted-foreground">From {count || 0} invoices in period</p>
                                </CardContent>
                            </Card>
                        ))}
                    </>
                )}
            </div>

            {/* --- Chart & Table --- */}
             <Card>
                <CardHeader><CardTitle>GSTR-1 (Table 6A): Exports</CardTitle><CardDescription>Invoice data for the selected period. Click a row for full details.</CardDescription>
                  <div className="relative w-full md:w-1/3 pt-4">
                    <Search className="absolute left-2.5 top-6 h-4 w-4 text-muted-foreground" /><Input placeholder="Search by name or invoice #" className="pl-8" value={search} onChange={(e) => setSearch(e.target.value)}/>
                  </div>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader><TableRow><TableHead>Inv No.</TableHead><TableHead>Inv Date</TableHead><TableHead>Customer</TableHead><TableHead>Place of Supply</TableHead><TableHead>HSN</TableHead><TableHead className="text-right">Inv Value (INR)</TableHead><TableHead className="text-right">Taxable (INR)</TableHead><TableHead>Tax</TableHead></TableRow></TableHeader>
                            <TableBody>
                                {loading ? Array.from({ length: 5 }).map((_, i) => ( <TableRow key={i} className="animate-pulse">{Array.from({length: 8}).map((_, j) => <TableCell key={j}><div className="h-5 bg-muted rounded"></div></TableCell>)}</TableRow>)) : (
                                  
                                    data.tableData?.invoices?.map((invoice) => (
                                        <TableRow key={invoice._id} onClick={() => setSelectedInvoice(invoice)} className="cursor-pointer">
                                            <TableCell className="font-medium">{invoice.invoiceNumber}</TableCell>
                                            <TableCell>{format(new Date(invoice.date), "dd-MM-yyyy")}</TableCell>
                                            <TableCell>{invoice.name}</TableCell>
                                            <TableCell>{invoice.country}</TableCell>
                                            {console.log(invoice.convertedINRAmount)}
                                            <TableCell>{invoice.items?.[0]?.hsn || 'N/A'}</TableCell>
                                            <TableCell className="text-right">{(invoice.convertedINRAmount || 0).toLocaleString('en-IN')}</TableCell>
                                            <TableCell className="text-right">{(invoice.convertedINRAmount || 0).toLocaleString('en-IN')}</TableCell>
                                            <TableCell>0%</TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
                <div className="flex items-center justify-end space-x-2 py-4 px-6">
                    <span className="text-sm text-muted-foreground">Page {page} of {totalPages}</span>
                    <Button variant="outline" size="sm" onClick={() => setPage(p => Math.max(p - 1, 1))} disabled={page === 1}>Previous</Button>
                    <Button variant="outline" size="sm" onClick={() => setPage(p => Math.min(p + 1, totalPages))} disabled={page === totalPages}>Next</Button>
                </div>
            </Card>
            <InvoiceDetailSheet invoice={selectedInvoice} onOpenChange={(isOpen) => !isOpen && setSelectedInvoice(null)} />
        </main>
    </div>
  );
}