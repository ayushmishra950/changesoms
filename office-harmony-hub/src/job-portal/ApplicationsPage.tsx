import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  LayoutList,
  // LayoutKanban,
  Search,
  Filter,
  MoreHorizontal,
  Mail,
  Phone,
  Briefcase,
  Calendar,
  Clock,
  CheckCircle2,
  XCircle,
  FileText,
  MessageSquare,
  ArrowRight,
  Download,
} from "lucide-react";
import { Helmet } from "react-helmet-async";

// Mock Data
const applicationsData = [
  {
    id: 1,
    candidate: "Rahul Sharma",
    role: "Full Stack Developer",
    date: "2024-03-10",
    status: "Screening",
    rating: 4.5,
    avatar: "https://github.com/shadcn.png",
    email: "rahul.sharma@example.com",
  },
  {
    id: 2,
    candidate: "Priya Singh",
    role: "UI/UX Designer",
    date: "2024-03-12",
    status: "Interview",
    rating: 4.8,
    avatar: "https://github.com/shadcn.png",
    email: "priya.singh@example.com",
  },
  {
    id: 3,
    candidate: "Amit Patel",
    role: "Data Scientist",
    date: "2024-03-08",
    status: "Rejected",
    rating: 3.2,
    avatar: "https://github.com/shadcn.png",
    email: "amit.patel@example.com",
  },
  {
    id: 4,
    candidate: "Sneha Gupta",
    role: "Product Manager",
    date: "2024-03-14",
    status: "Applied",
    rating: 4.0,
    avatar: "https://github.com/shadcn.png",
    email: "sneha.gupta@example.com",
  },
  {
    id: 5,
    candidate: "Vikram Malhotra",
    role: "DevOps Engineer",
    date: "2024-03-11",
    status: "Offer Sent",
    rating: 4.9,
    avatar: "https://github.com/shadcn.png",
    email: "vikram.m@example.com",
  },
  {
    id: 6,
    candidate: "Anjali Verma",
    role: "Frontend Developer",
    date: "2024-03-15",
    status: "Hired",
    rating: 4.7,
    avatar: "https://github.com/shadcn.png",
    email: "anjali.v@example.com",
  },
  {
    id: 7,
    candidate: "Rohan Das",
    role: "Backend Developer",
    date: "2024-03-16",
    status: "Screening",
    rating: 4.2,
    avatar: "https://github.com/shadcn.png",
    email: "rohan.das@example.com",
  },
];

const KANBAN_STAGES = [
  "Applied",
  "Screening",
  "Interview",
  "Offer Sent",
  "Hired",
  "Rejected",
];

const ApplicationsPage: React.FC = () => {
  const [viewMode, setViewMode] = useState<"list" | "kanban">("list");
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");

  // Filter Logic
  const filteredApplications = applicationsData.filter((app) => {
    const matchesSearch =
      app.candidate.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === "All" || app.role === roleFilter;

    return matchesSearch && matchesRole;
  });

  const uniqueRoles = Array.from(new Set(applicationsData.map((a) => a.role)));

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Hired":
        return <Badge className="bg-green-100 text-green-700 hover:bg-green-200 border-none">Hired</Badge>;
      case "Rejected":
        return <Badge className="bg-red-100 text-red-700 hover:bg-red-200 border-none">Rejected</Badge>;
      case "Interview":
        return <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-200 border-none">Interview</Badge>;
      case "Offer Sent":
        return <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200 border-none">Offer Sent</Badge>;
      case "Screening":
        return <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-200 border-none">Screening</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Hired": return "bg-green-500";
      case "Rejected": return "bg-red-500";
      case "Interview": return "bg-purple-500";
      case "Offer Sent": return "bg-blue-500";
      case "Screening": return "bg-amber-500";
      default: return "bg-gray-400";
    }
  }

  return (
    <>
      <Helmet>
        <title>Applications | Job Portal</title>
      </Helmet>

      <div className="flex flex-col min-h-screen bg-gray-50/40 p-6 space-y-6">

        {/* Page Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Applications</h1>
            <p className="text-muted-foreground mt-1">
              Track and manage job applications across all stages.
            </p>
          </div>
          <div className="flex items-center gap-2 bg-white p-1 rounded-lg border shadow-sm">
            <Button
              variant={viewMode === 'list' ? 'secondary' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
              className="gap-2"
            >
              <LayoutList className="h-4 w-4" /> List
            </Button>
            <Button
              variant={viewMode === 'kanban' ? 'secondary' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('kanban')}
              className="gap-2"
            >
              {/* <LayoutKanban className="h-4 w-4" /> */}
              Board
            </Button>
          </div>
        </div>

        {/* Filters */}
        <Card className="shadow-sm">
          <CardContent className="p-4 flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-1/3">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search candidate..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger className="w-full sm:w-[200px]">
                  <SelectValue placeholder="Filter by Job Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Roles</SelectItem>
                  {uniqueRoles.map((role) => (
                    <SelectItem key={role} value={role}>{role}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" /> more filters
              </Button>
              <Button variant="outline" className="gap-2">
                <Download className="h-4 w-4" /> Export
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Content Area */}
        {viewMode === 'list' ? (
          <Card className="shadow-sm">
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Candidate</TableHead>
                    <TableHead>Role Applied</TableHead>
                    <TableHead>Date Applied</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredApplications.length > 0 ? (
                    filteredApplications.map((app) => (
                      <TableRow key={app.id} className="cursor-pointer hover:bg-muted/50">
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarImage src={app.avatar} alt={app.candidate} />
                              <AvatarFallback>{app.candidate.substring(0, 2).toUpperCase()}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{app.candidate}</div>
                              <div className="text-xs text-muted-foreground">{app.email}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{app.role}</TableCell>
                        <TableCell>{app.date}</TableCell>
                        <TableCell>{getStatusBadge(app.status)}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <span className="font-medium">{app.rating}</span>
                            <span className="text-xs text-muted-foreground">/ 5</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem>View Profile</DropdownMenuItem>
                              <DropdownMenuItem>Evaluate</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-red-600">Reject</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                        No applications found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        ) : (
          // Kanban View
          <div className="flex overflow-x-auto pb-4 gap-4 h-[calc(100vh-220px)]">
            {KANBAN_STAGES.map((stage) => {
              const stageApps = filteredApplications.filter(app => app.status === stage);
              const colorClass = getStatusColor(stage);

              return (
                <div key={stage} className="min-w-[300px] max-w-[300px] flex flex-col gap-3 bg-gray-100/50 p-2 rounded-lg border h-full">
                  <div className="flex items-center justify-between p-2">
                    <h3 className="font-semibold text-sm text-gray-700">{stage}</h3>
                    <Badge variant="secondary" className="bg-white">{stageApps.length}</Badge>
                  </div>

                  <div className="flex-1 overflow-y-auto space-y-3 p-1">
                    {stageApps.map((app) => (
                      <Card key={app.id} className="p-3 shadow-sm hover:shadow-md transition-shadow cursor-grab active:cursor-grabbing">
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={app.avatar} />
                              <AvatarFallback>{app.candidate.substring(0, 2)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="text-sm font-medium leading-none">{app.candidate}</p>
                              <p className="text-xs text-muted-foreground mt-0.5">{app.role}</p>
                            </div>
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-6 w-6 p-0">
                                <MoreHorizontal className="h-3 w-3" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>Move to Next Stage</DropdownMenuItem>
                              <DropdownMenuItem>Reject</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                        <div className="flex items-center justify-between mt-3 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {app.date}
                          </div>
                          <div className="flex items-center gap-1">
                            <div className={`h-2 w-2 rounded-full ${colorClass}`} />
                            {stage}
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default ApplicationsPage;
