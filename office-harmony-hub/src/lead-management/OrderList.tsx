import React, { useState, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  MoreHorizontal,
  Search,
  Mail,
  Phone,
  Filter,
  ArrowUpDown,
  Trash2,
  Eye,
  Download,
  CreditCard,
  Calendar,
} from "lucide-react";
import { toast } from "sonner";

export type PaymentStatus = "Paid" | "Pending" | "Failed";

export type Order = {
  id: string;
  orderId: string;
  customerName: string;
  email: string;
  phone: string;
  course: string;
  amount: number;
  paymentStatus: PaymentStatus;
  orderDate: string;
};

const dummyOrders: Order[] = [
  {
    id: "1",
    orderId: "ORD-2023-001",
    customerName: "Sneha Reddy",
    email: "sneha.reddy@example.com",
    phone: "8877665544",
    course: "React Mastery",
    amount: 4999,
    paymentStatus: "Paid",
    orderDate: "2023-10-22",
  },
  {
    id: "2",
    orderId: "ORD-2023-002",
    customerName: "Ramesh Kumar",
    email: "ramesh@email.com",
    phone: "9876543210",
    course: "Web Development",
    amount: 5999,
    paymentStatus: "Paid",
    orderDate: "2023-10-25",
  },
  {
    id: "3",
    orderId: "ORD-2023-003",
    customerName: "Anjali Gupta",
    email: "anjali.gupta@example.com",
    phone: "9988112233",
    course: "Data Science",
    amount: 8999,
    paymentStatus: "Pending",
    orderDate: "2023-10-26",
  },
  {
    id: "4",
    orderId: "ORD-2023-004",
    customerName: "Vikrant Singh",
    email: "vikrant.singh@example.com",
    phone: "7766551122",
    course: "Python for Beginners",
    amount: 2999,
    paymentStatus: "Failed",
    orderDate: "2023-10-27",
  },
  {
    id: "5",
    orderId: "ORD-2023-005",
    customerName: "Pooja Sharma",
    email: "pooja.sharma@example.com",
    phone: "9123456789",
    course: "UI/UX Design",
    amount: 4500,
    paymentStatus: "Paid",
    orderDate: "2023-10-28",
  },
];

const paymentStatusColors: Record<PaymentStatus, string> = {
  Paid: "bg-green-100 text-green-700 border-green-200",
  Pending: "bg-yellow-100 text-yellow-700 border-yellow-200",
  Failed: "bg-red-100 text-red-700 border-red-200",
};

const OrderList: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>(dummyOrders);
  const [search, setSearch] = useState("");

  const filteredOrders = useMemo(() => {
    return orders.filter(
      (order) =>
        order.customerName.toLowerCase().includes(search.toLowerCase()) ||
        order.email.toLowerCase().includes(search.toLowerCase()) ||
        order.orderId.toLowerCase().includes(search.toLowerCase()) ||
        order.course.toLowerCase().includes(search.toLowerCase())
    );
  }, [orders, search]);

  const handleDeleteOrder = (id: string) => {
    setOrders(orders.filter((o) => o.id !== id));
    toast.success("Order deleted successfully");
  };

  const handleUpdatePaymentStatus = (id: string, status: PaymentStatus) => {
    setOrders(orders.map((o) => (o.id === id ? { ...o, paymentStatus: status } : o)));
    toast.success(`Payment status updated to ${status}`);
  };

  return (
    <div className="p-4 md:p-8 space-y-6 bg-slate-50/50 min-h-screen">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Enrolled Orders</h1>
          <p className="text-slate-500 mt-1">Manage enrollments, payments, and student orders.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="bg-white">
            <Download className="mr-2 h-4 w-4" /> Export Data
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-none shadow-sm bg-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-500 uppercase">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">
              ₹{orders.filter(o => o.paymentStatus === "Paid").reduce((acc, curr) => acc + curr.amount, 0).toLocaleString()}
            </div>
            <p className="text-xs text-green-600 mt-1 font-medium">From successful enrollments</p>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm bg-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-500 uppercase">Active Enrollments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">
              {orders.filter(o => o.paymentStatus === "Paid").length}
            </div>
            <p className="text-xs text-indigo-600 mt-1 font-medium">Students currently enrolled</p>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm bg-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-500 uppercase">Pending Payments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">
              {orders.filter(o => o.paymentStatus === "Pending").length}
            </div>
            <p className="text-xs text-yellow-600 mt-1 font-medium">Awaiting payment verification</p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-none shadow-sm overflow-hidden">
        <CardHeader className="bg-white border-b pb-4 px-6">
          <div className="flex flex-col md:flex-row md:items-center gap-4 justify-between">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search by name, order ID, or course..."
                className="pl-10 bg-slate-50 border-slate-200 focus:bg-white transition-all"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="text-slate-600">
                <Filter className="mr-2 h-4 w-4" /> Filter
              </Button>
              <Button variant="outline" size="sm" className="text-slate-600">
                <ArrowUpDown className="mr-2 h-4 w-4" /> Sort
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-slate-50">
                <TableRow>
                  <TableHead className="font-semibold text-slate-700">Order ID</TableHead>
                  <TableHead className="font-semibold text-slate-700">Student</TableHead>
                  <TableHead className="font-semibold text-slate-700">Course & Price</TableHead>
                  <TableHead className="font-semibold text-slate-700">Payment Status</TableHead>
                  <TableHead className="font-semibold text-slate-700">Date</TableHead>
                  <TableHead className="text-right font-semibold text-slate-700">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.length > 0 ? (
                  filteredOrders.map((order) => (
                    <TableRow key={order.id} className="hover:bg-slate-50/80 transition-colors">
                      <TableCell className="font-mono text-xs font-semibold text-indigo-600">
                        {order.orderId}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-700 font-bold border border-slate-200">
                            {order.customerName.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <p className="font-medium text-slate-900">{order.customerName}</p>
                            <p className="text-xs text-slate-500">{order.email}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <p className="text-sm font-medium text-slate-800">{order.course}</p>
                          <p className="text-xs font-semibold text-slate-600">₹{order.amount.toLocaleString()}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <button className="focus:outline-none">
                              <Badge className={`${paymentStatusColors[order.paymentStatus]} border cursor-pointer hover:opacity-80 transition-opacity`}>
                                {order.paymentStatus}
                              </Badge>
                            </button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="start">
                            <DropdownMenuLabel>Update Payment</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            {(["Paid", "Pending", "Failed"] as PaymentStatus[]).map((status) => (
                              <DropdownMenuItem
                                key={status}
                                onClick={() => handleUpdatePaymentStatus(order.id, status)}
                                className={order.paymentStatus === status ? "bg-slate-100" : ""}
                              >
                                {status}
                              </DropdownMenuItem>
                            ))}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                      <TableCell className="text-sm text-slate-600">
                        <div className="flex items-center">
                          <Calendar className="mr-2 h-3 w-3 opacity-50" />
                          {order.orderDate}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-48">
                            <DropdownMenuLabel>Order Options</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              <Eye className="mr-2 h-4 w-4" /> View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <CreditCard className="mr-2 h-4 w-4" /> View Receipt
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              className="text-red-600 focus:text-red-600"
                              onClick={() => handleDeleteOrder(order.id)}
                            >
                              <Trash2 className="mr-2 h-4 w-4" /> Delete Order
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="h-40 text-center">
                      <div className="flex flex-col items-center justify-center text-slate-500">
                        <Search className="h-10 w-10 mb-2 opacity-20" />
                        <p>No orders found matching your search.</p>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderList;