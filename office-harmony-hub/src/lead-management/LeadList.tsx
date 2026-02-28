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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  MoreHorizontal,
  Plus,
  Search,
  UserPlus,
  Mail,
  Phone,
  Filter,
  ArrowUpDown,
  Trash2,
  Edit,
} from "lucide-react";
import { toast } from "sonner";
import LeadForm from "./forms/LeadForm";

export type LeadStatus = "New" | "Contacted" | "Interested" | "Enrolled" | "Lost";

export type Lead = {
  id: string;
  name: string;
  email: string;
  phone: string;
  course: string;
  status: LeadStatus;
  source?: string;
  createdAt: string;
};

const dummyLeads: Lead[] = [
  {
    id: "1",
    name: "Rahul Sharma",
    email: "rahul.sharma@example.com",
    phone: "9876543210",
    course: "Web Development",
    status: "New",
    source: "LinkedIn",
    createdAt: "2023-10-25",
  },
  {
    id: "2",
    name: "Priya Patel",
    email: "priya.patel@example.com",
    phone: "9123456780",
    course: "Data Science",
    status: "Interested",
    source: "Instagram",
    createdAt: "2023-10-24",
  },
  {
    id: "3",
    name: "Amit Kumar",
    email: "amit.kumar@example.com",
    phone: "9988776655",
    course: "UI/UX Design",
    status: "Contacted",
    source: "Website",
    createdAt: "2023-10-23",
  },
  {
    id: "4",
    name: "Sneha Reddy",
    email: "sneha.reddy@example.com",
    phone: "8877665544",
    course: "React Mastery",
    status: "Enrolled",
    source: "Referral",
    createdAt: "2023-10-22",
  },
  {
    id: "5",
    name: "Vikram Singh",
    email: "vikram.singh@example.com",
    phone: "7766554433",
    course: "Python for Beginners",
    status: "Lost",
    source: "Cold Call",
    createdAt: "2023-10-21",
  },
];

const statusColors: Record<LeadStatus, string> = {
  New: "bg-blue-100 text-blue-700 border-blue-200",
  Contacted: "bg-purple-100 text-purple-700 border-purple-200",
  Interested: "bg-yellow-100 text-yellow-700 border-yellow-200",
  Enrolled: "bg-green-100 text-green-700 border-green-200",
  Lost: "bg-red-100 text-red-700 border-red-200",
};

const LeadList: React.FC = () => {
  const [leads, setLeads] = useState<Lead[]>(dummyLeads);
  const [search, setSearch] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [leadlistrefresh, setLeadListRefresh] = useState(false);
  const [initialData, setInitialData] = useState<any>(null);
  const [editingLead, setEditingLead] = useState<Lead | null>(null);

  const filteredLeads = useMemo(() => {
    return leads.filter(
      (lead) =>
        lead.name.toLowerCase().includes(search.toLowerCase()) ||
        lead.email.toLowerCase().includes(search.toLowerCase()) ||
        lead.phone.includes(search) ||
        lead.course.toLowerCase().includes(search.toLowerCase())
    );
  }, [leads, search]);

  const handleAddLead = (data: any) => {
    const newLead: Lead = {
      ...data,
      id: (leads.length + 1).toString(),
      createdAt: new Date().toISOString().split("T")[0],
    };
    setLeads([newLead, ...leads]);
    setIsAddDialogOpen(false);
    toast.success("Lead added successfully");
  };

  const handleEditLead = (data: any) => {
    if (!editingLead) return;
    setLeads(
      leads.map((l) =>
        l.id === editingLead.id ? { ...l, ...data } : l
      )
    );
    setEditingLead(null);
    toast.success("Lead updated successfully");
  };

  const handleDeleteLead = (id: string) => {
    setLeads(leads.filter((l) => l.id !== id));
    toast.success("Lead deleted successfully");
  };

  const handleStatusUpdate = (id: string, status: LeadStatus) => {
    setLeads(leads.map((l) => (l.id === id ? { ...l, status } : l)));
    toast.success(`Status updated to ${status}`);
  };

  return (
    <>
      <LeadForm
        isOpen={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        initialData={initialData}
        setLeadListRefresh={setLeadListRefresh}
      />
      <div className="p-4 md:p-8 space-y-6 bg-slate-50/50 min-h-screen">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">Lead Management</h1>
            <p className="text-slate-500 mt-1">Manage and track your potential students efficiently.</p>
          </div>
          <Button
            onClick={() => { setInitialData(null); setIsAddDialogOpen(true) }}
            className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-md transition-all"
          >
            <Plus className="mr-2 h-4 w-4" /> Add New Lead
          </Button>
        </div>

        <Card className="border-none shadow-sm overflow-hidden">
          <CardHeader className="bg-white border-b pb-4 px-6">
            <div className="flex flex-col md:flex-row md:items-center gap-4 justify-between">
              <div className="relative w-full md:w-96">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Search leads by name, email, or course..."
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
                    <TableHead className="font-semibold text-slate-700">Lead Details</TableHead>
                    <TableHead className="font-semibold text-slate-700">Contact</TableHead>
                    <TableHead className="font-semibold text-slate-700">Course & Source</TableHead>
                    <TableHead className="font-semibold text-slate-700">Status</TableHead>
                    <TableHead className="font-semibold text-slate-700">Created At</TableHead>
                    <TableHead className="text-right font-semibold text-slate-700">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredLeads.length > 0 ? (
                    filteredLeads.map((lead) => (
                      <TableRow key={lead.id} className="hover:bg-slate-50/80 transition-colors">
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold border border-indigo-200">
                              {lead.name.charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <p className="font-medium text-slate-900">{lead.name}</p>
                              <p className="text-xs text-slate-500">ID: LAD-{lead.id.padStart(3, '0')}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="flex items-center text-sm text-slate-600">
                              <Mail className="mr-2 h-3 w-3" /> {lead.email}
                            </div>
                            <div className="flex items-center text-sm text-slate-600">
                              <Phone className="mr-2 h-3 w-3" /> {lead.phone}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <p className="text-sm font-medium text-slate-800">{lead.course}</p>
                            <Badge variant="outline" className="text-[10px] font-normal py-0 px-2 bg-slate-50 border-slate-200">
                              {lead.source || "Unknown"}
                            </Badge>
                          </div>
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <button className="focus:outline-none">
                                <Badge className={`${statusColors[lead.status]} border cursor-pointer hover:opacity-80 transition-opacity`}>
                                  {lead.status}
                                </Badge>
                              </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="start">
                              <DropdownMenuLabel>Update Status</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              {(["New", "Contacted", "Interested", "Enrolled", "Lost"] as LeadStatus[]).map((status) => (
                                <DropdownMenuItem
                                  key={status}
                                  onClick={() => handleStatusUpdate(lead.id, status)}
                                  className={lead.status === status ? "bg-slate-100" : ""}
                                >
                                  {status}
                                </DropdownMenuItem>
                              ))}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                        <TableCell className="text-sm text-slate-600">
                          {lead.createdAt}
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-40">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem onClick={() => { setInitialData(lead); setIsAddDialogOpen(true) }}>
                                <Edit className="mr-2 h-4 w-4" /> Edit Lead
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="text-red-600 focus:text-red-600"
                                onClick={() => handleDeleteLead(lead.id)}
                              >
                                <Trash2 className="mr-2 h-4 w-4" /> Delete Lead
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
                          <UserPlus className="h-10 w-10 mb-2 opacity-20" />
                          <p>No leads found matching your search.</p>
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
    </>
  );
};

export default LeadList;