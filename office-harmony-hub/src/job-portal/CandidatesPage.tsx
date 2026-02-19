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
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Search,
  Filter,
  MoreHorizontal,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  FileText,
  CheckCircle2,
  XCircle,
  Clock,
  Calendar,
  Download,
  Users,
  Linkedin,
  Github,
} from "lucide-react";
import { Helmet } from "react-helmet-async";

// Mock Data
const candidatesData = [
  {
    id: 1,
    name: "Rahul Sharma",
    email: "rahul.sharma@example.com",
    phone: "+91 98765 43210",
    role: "Full Stack Developer",
    appliedDate: "2024-03-10",
    status: "Shortlisted",
    experience: "4 Years",
    location: "Bangalore, India",
    skills: ["React", "Node.js", "TypeScript", "AWS"],
    avatar: "https://github.com/shadcn.png",
    resumeLink: "#",
  },
  {
    id: 2,
    name: "Priya Singh",
    email: "priya.singh@example.com",
    phone: "+91 98123 45678",
    role: "UI/UX Designer",
    appliedDate: "2024-03-12",
    status: "In Review",
    experience: "3 Years",
    location: "Mumbai, India",
    skills: ["Figma", "Adobe XD", "Sketch", "HTML/CSS"],
    avatar: "https://github.com/shadcn.png",
    resumeLink: "#",
  },
  {
    id: 3,
    name: "Amit Patel",
    email: "amit.patel@example.com",
    phone: "+91 99887 76655",
    role: "Data Scientist",
    appliedDate: "2024-03-08",
    status: "Rejected",
    experience: "5 Years",
    location: "Delhi, India",
    skills: ["Python", "TensorFlow", "Pandas", "SQL"],
    avatar: "https://github.com/shadcn.png",
    resumeLink: "#",
  },
  {
    id: 4,
    name: "Sneha Gupta",
    email: "sneha.gupta@example.com",
    phone: "+91 91234 56789",
    role: "Product Manager",
    appliedDate: "2024-03-14",
    status: "Interview",
    experience: "6 Years",
    location: "Pune, India",
    skills: ["Agile", "JIRA", "Product Strategy", "Scrum"],
    avatar: "https://github.com/shadcn.png",
    resumeLink: "#",
  },
  {
    id: 5,
    name: "Vikram Malhotra",
    email: "vikram.m@example.com",
    phone: "+91 88776 65544",
    role: "DevOps Engineer",
    appliedDate: "2024-03-11",
    status: "Hired",
    experience: "4.5 Years",
    location: "Hyderabad, India",
    skills: ["Docker", "Kubernetes", "CI/CD", "Azure"],
    avatar: "https://github.com/shadcn.png",
    resumeLink: "#",
  },
  {
    id: 6,
    name: "Anjali Verma",
    email: "anjali.v@example.com",
    phone: "+91 76543 21098",
    role: "Full Stack Developer",
    appliedDate: "2024-03-15",
    status: "New",
    experience: "2 Years",
    location: "Bangalore, India",
    skills: ["MERN Stack", "Redux", "Tailwind"],
    avatar: "https://github.com/shadcn.png",
    resumeLink: "#",
  },
];

const CandidatesPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [roleFilter, setRoleFilter] = useState("All");
  const [selectedCandidate, setSelectedCandidate] = useState<any>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  // Filter Logic
  const filteredCandidates = candidatesData.filter((candidate) => {
    const matchesSearch =
      candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      candidate.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "All" || candidate.status === statusFilter;
    const matchesRole = roleFilter === "All" || candidate.role === roleFilter;

    return matchesSearch && matchesStatus && matchesRole;
  });

  // Unique Roles for Filter
  const uniqueRoles = Array.from(
    new Set(candidatesData.map((c) => c.role))
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Hired":
        return <Badge className="bg-green-100 text-green-700 hover:bg-green-200 border-none">Hired</Badge>;
      case "Rejected":
        return <Badge className="bg-red-100 text-red-700 hover:bg-red-200 border-none">Rejected</Badge>;
      case "Interview":
        return <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-200 border-none">Interview</Badge>;
      case "Shortlisted":
        return <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200 border-none">Shortlisted</Badge>;
      case "New":
        return <Badge className="bg-blue-50 text-blue-600 hover:bg-blue-100 border-blue-200">New</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const openCandidateDetails = (candidate: any) => {
    setSelectedCandidate(candidate);
    setIsSheetOpen(true);
  };

  return (
    <>
      <Helmet>
        <title>Candidates | Job Portal</title>
      </Helmet>

      <div className="flex flex-col min-h-screen bg-gray-50/40 p-6 space-y-6">

        {/* Page Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Candidates</h1>
            <p className="text-muted-foreground mt-1">
              Manage and track candidate applications.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" /> Export
            </Button>
            <Button className="gap-2 bg-blue-600 hover:bg-blue-700">
              <Briefcase className="h-4 w-4" /> Post a Job
            </Button>
          </div>
        </div>

        {/* Status Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="items-center p-4 flex justify-between shadow-sm">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Candidates</p>
              <h3 className="text-2xl font-bold mt-1">1,250</h3>
            </div>
            <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
              {/* <Users className="h-5 w-5 text-blue-600" /> */}
            </div>
          </Card>
          <Card className="items-center p-4 flex justify-between shadow-sm">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Shortlisted</p>
              <h3 className="text-2xl font-bold mt-1">340</h3>
            </div>
            <div className="h-10 w-10 bg-purple-100 rounded-full flex items-center justify-center">
              <CheckCircle2 className="h-5 w-5 text-purple-600" />
            </div>
          </Card>
          <Card className="items-center p-4 flex justify-between shadow-sm">
            <div>
              <p className="text-sm font-medium text-muted-foreground">In Review</p>
              <h3 className="text-2xl font-bold mt-1">85</h3>
            </div>
            <div className="h-10 w-10 bg-amber-100 rounded-full flex items-center justify-center">
              <Clock className="h-5 w-5 text-amber-600" />
            </div>
          </Card>
          <Card className="items-center p-4 flex justify-between shadow-sm">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Hired</p>
              <h3 className="text-2xl font-bold mt-1">45</h3>
            </div>
            <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center">
              <Briefcase className="h-5 w-5 text-green-600" />
            </div>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card className="shadow-sm">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
              <div className="relative w-full md:w-1/3">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search by name or email..."
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
                <Select value={roleFilter} onValueChange={setRoleFilter}>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="All Roles" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All Roles</SelectItem>
                    {uniqueRoles.map((role) => (
                      <SelectItem key={role} value={role}>{role}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="All Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All Status</SelectItem>
                    <SelectItem value="New">New</SelectItem>
                    <SelectItem value="In Review">In Review</SelectItem>
                    <SelectItem value="Shortlisted">Shortlisted</SelectItem>
                    <SelectItem value="Interview">Interview</SelectItem>
                    <SelectItem value="Hired">Hired</SelectItem>
                    <SelectItem value="Rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="icon" title="Reset Filters" onClick={() => { setStatusFilter('All'); setRoleFilter('All'); setSearchQuery('') }}>
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Candidates Table */}
        <Card className="shadow-sm">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Candidate</TableHead>
                  <TableHead>Role Applied</TableHead>
                  <TableHead>Date Applied</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCandidates.length > 0 ? (
                  filteredCandidates.map((candidate) => (
                    <TableRow key={candidate.id} className="cursor-pointer hover:bg-muted/50" onClick={() => openCandidateDetails(candidate)}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={candidate.avatar} alt={candidate.name} />
                            <AvatarFallback>{candidate.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{candidate.name}</div>
                            <div className="text-xs text-muted-foreground">{candidate.email}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{candidate.role}</TableCell>
                      <TableCell>{candidate.appliedDate}</TableCell>
                      <TableCell>{getStatusBadge(candidate.status)}</TableCell>
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
                            <DropdownMenuItem onClick={(e) => { e.stopPropagation(); openCandidateDetails(candidate) }}>View Profile</DropdownMenuItem>
                            <DropdownMenuItem onClick={(e) => e.stopPropagation()}>Schedule Interview</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600" onClick={(e) => e.stopPropagation()}>Reject</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                      No candidates found matching your filters.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

      </div>

      {/* Candidate Details Sheet */}
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent className="sm:max-w-xl overflow-y-auto">
          {selectedCandidate && (
            <div className="space-y-6">
              <SheetHeader>
                <SheetTitle>Candidate Profile</SheetTitle>
                <SheetDescription>Detailed information about the applicant.</SheetDescription>
              </SheetHeader>

              {/* Profile Header */}
              <div className="flex items-center gap-4 py-4 border-b">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={selectedCandidate.avatar} />
                  <AvatarFallback className="text-lg">{selectedCandidate.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-xl font-bold">{selectedCandidate.name}</h2>
                  <p className="text-muted-foreground">{selectedCandidate.role}</p>
                  <div className="mt-2 text-sm">{getStatusBadge(selectedCandidate.status)}</div>
                </div>
              </div>

              {/* Contact Info */}
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-gray-500 uppercase">Contact Information</h3>
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-gray-400" />
                  <span>{selectedCandidate.email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-gray-400" />
                  <span>{selectedCandidate.phone}</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  <span>{selectedCandidate.location}</span>
                </div>
              </div>

              {/* Proffessional Info */}
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-gray-500 uppercase">Professional Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <span className="text-xs text-gray-500">Experience</span>
                    <p className="font-medium">{selectedCandidate.experience}</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <span className="text-xs text-gray-500">Applied Date</span>
                    <p className="font-medium">{selectedCandidate.appliedDate}</p>
                  </div>
                </div>
              </div>

              {/* Skills */}
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-gray-500 uppercase">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedCandidate.skills.map((skill: string) => (
                    <Badge key={skill} variant="secondary">{skill}</Badge>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="pt-6 border-t flex flex-col gap-3">
                <Button className="w-full bg-blue-600 hover:bg-blue-700">Schedule Interview</Button>
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" className="w-full border-green-600 text-green-600 hover:bg-green-50">Hire Candidate</Button>
                  <Button variant="outline" className="w-full border-red-600 text-red-600 hover:bg-red-50">Reject Application</Button>
                </div>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </>
  );
};

export default CandidatesPage;
