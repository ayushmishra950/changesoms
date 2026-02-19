import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
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
import { Textarea } from "@/components/ui/textarea";
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
  Briefcase,
  MapPin,
  Clock,
  DollarSign,
  Users,
  Plus,
  LayoutList,
  LayoutGrid,
  Eye,
  Edit,
} from "lucide-react";
import { Helmet } from "react-helmet-async";

// Mock Data
const jobsData = [
  {
    id: 1,
    title: "Senior React Developer",
    company: "TechNova",
    location: "San Francisco, CA (Remote)",
    type: "Full-time",
    salary: "$120k - $150k",
    postedDate: "2024-03-01",
    status: "Active",
    applicants: 45,
    views: 1200,
    hires: 2,
    description: "We are looking for an experienced React developer to join our team...",
    requirements: ["5+ years of experience", "React, TypeScript, Node.js", "Strong communication skills"],
  },
  {
    id: 2,
    title: "Product Designer",
    company: "GreenFields",
    location: "Austin, TX (On-site)",
    type: "Contract",
    salary: "$90k - $110k",
    postedDate: "2024-03-05",
    status: "Active",
    applicants: 28,
    views: 850,
    hires: 0,
    description: "Design intuitive user experiences for our agricultural tech products...",
    requirements: ["Figma proficiency", "User research experience", "Portfolio required"],
  },
  {
    id: 3,
    title: "Marketing Manager",
    company: "MediCare Plus",
    location: "New York, NY (Hybrid)",
    type: "Full-time",
    salary: "$100k - $130k",
    postedDate: "2024-02-20",
    status: "Closed",
    applicants: 112,
    views: 3500,
    hires: 1,
    description: "Lead our marketing initiatives and brand strategy...",
    requirements: ["Marketing degree", "SEO/SEM knowledge", "Team leadership"],
  },
  {
    id: 4,
    title: "DevOps Engineer",
    company: "FinServe",
    location: "London, UK (Remote)",
    type: "Full-time",
    salary: "$110k - $140k",
    postedDate: "2024-03-10",
    status: "Active",
    applicants: 15,
    views: 400,
    hires: 0,
    description: "Build and maintain our CI/CD pipelines and cloud infrastructure...",
    requirements: ["AWS/Azure", "Docker & Kubernetes", "Scripting skills"],
  },
  {
    id: 5,
    title: "Customer Support Specialist",
    company: "EduLearn",
    location: "Remote",
    type: "Part-time",
    salary: "$25/hr",
    postedDate: "2024-03-12",
    status: "Draft",
    applicants: 0,
    views: 0,
    hires: 0,
    description: "Assist students and teachers on our online learning platform...",
    requirements: ["Excellent written English", "Patience and empathy", "Tech-savvy"],
  },
];

const JobsPage: React.FC = () => {
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  // Filter Logic
  const filteredJobs = jobsData.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "All" || job.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Active":
        return <Badge className="bg-green-100 text-green-700 hover:bg-green-200 border-none">Active</Badge>;
      case "Closed":
        return <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-200 border-none">Closed</Badge>;
      case "Draft":
        return <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-200 border-none">Draft</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const openJobDetails = (job: any) => {
    setSelectedJob(job);
    setIsDetailsOpen(true);
  };

  return (
    <>
      <Helmet>
        <title>Jobs | Job Portal</title>
      </Helmet>

      <div className="flex flex-col min-h-screen bg-gray-50/40 p-6 space-y-6">

        {/* Page Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Job Listings</h1>
            <p className="text-muted-foreground mt-1">
              Create and manage job posts, track candidates, and view metrics.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center bg-white p-1 rounded-lg border shadow-sm mr-2">
              <Button
                variant={viewMode === 'list' ? 'secondary' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
                className="gap-2"
              >
                <LayoutList className="h-4 w-4" /> List
              </Button>
              <Button
                variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className="gap-2"
              >
                <LayoutGrid className="h-4 w-4" /> Cards
              </Button>
            </div>
            <Button className="gap-2 bg-blue-600 hover:bg-blue-700" onClick={() => setIsCreateOpen(true)}>
              <Plus className="h-4 w-4" /> Post New Job
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
                placeholder="Search jobs..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-[200px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Statuses</SelectItem>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Closed">Closed</SelectItem>
                  <SelectItem value="Draft">Draft</SelectItem>
                </SelectContent>
              </Select>
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
                    <TableHead>Job Title</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Posted Date</TableHead>
                    <TableHead>Applications</TableHead>
                    <TableHead>Views</TableHead>
                    <TableHead>Hired</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredJobs.map((job) => (
                    <TableRow key={job.id} className="cursor-pointer hover:bg-muted/50" onClick={() => openJobDetails(job)}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{job.title}</div>
                          <div className="text-xs text-muted-foreground">{job.company} • {job.location}</div>
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(job.status)}</TableCell>
                      <TableCell>{job.postedDate}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 font-medium">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          {job.applicants}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Eye className="h-4 w-4" />
                          {job.views}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="rounded-full px-2">{job.hires}</Badge>
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
                            <DropdownMenuItem onClick={(e) => { e.stopPropagation(); openJobDetails(job) }}>View Details</DropdownMenuItem>
                            <DropdownMenuItem onClick={(e) => e.stopPropagation()}>Edit Job</DropdownMenuItem>
                            <DropdownMenuItem onClick={(e) => e.stopPropagation()}>Close Job</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600" onClick={(e) => e.stopPropagation()}>Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJobs.map((job) => (
              <Card key={job.id} className="hover:shadow-md transition-shadow cursor-pointer flex flex-col" onClick={() => openJobDetails(job)}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{job.title}</CardTitle>
                      <CardDescription className="mt-1">{job.company}</CardDescription>
                    </div>
                    {getStatusBadge(job.status)}
                  </div>
                </CardHeader>
                <CardContent className="flex-1 pb-4">
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" /> {job.location}
                    </div>
                    <div className="flex items-center gap-2">
                      <Briefcase className="h-4 w-4" /> {job.type}
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4" /> {job.salary}
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-6 pt-4 border-t">
                    <div className="text-center">
                      <p className="text-xl font-bold text-gray-900">{job.applicants}</p>
                      <p className="text-xs text-muted-foreground">Applicants</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xl font-bold text-gray-900">{job.views}</p>
                      <p className="text-xs text-muted-foreground">Views</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xl font-bold text-gray-900">{job.hires}</p>
                      <p className="text-xs text-muted-foreground">Hired</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="pt-0 justify-end">
                  <Button variant="outline" size="sm">Manage</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Job Details Sheet */}
      <Sheet open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <SheetContent className="sm:max-w-2xl overflow-y-auto">
          {selectedJob && (
            <div className="space-y-6">
              <SheetHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <SheetTitle className="text-2xl">{selectedJob.title}</SheetTitle>
                    <SheetDescription className="text-lg">{selectedJob.company}</SheetDescription>
                  </div>
                  {getStatusBadge(selectedJob.status)}
                </div>
              </SheetHeader>

              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground border-b pb-4">
                <div className="flex items-center gap-2"><MapPin className="h-4 w-4" /> {selectedJob.location}</div>
                <div className="flex items-center gap-2"><Briefcase className="h-4 w-4" /> {selectedJob.type}</div>
                <div className="flex items-center gap-2"><DollarSign className="h-4 w-4" /> {selectedJob.salary}</div>
                <div className="flex items-center gap-2"><Clock className="h-4 w-4" /> Posted {selectedJob.postedDate}</div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <Card className="bg-blue-50 border-blue-100">
                  <CardContent className="p-4 text-center">
                    <p className="text-2xl font-bold text-blue-700">{selectedJob.applicants}</p>
                    <p className="text-xs text-blue-600 font-medium uppercase">Applicants</p>
                  </CardContent>
                </Card>
                <Card className="bg-purple-50 border-purple-100">
                  <CardContent className="p-4 text-center">
                    <p className="text-2xl font-bold text-purple-700">{selectedJob.views}</p>
                    <p className="text-xs text-purple-600 font-medium uppercase">Views</p>
                  </CardContent>
                </Card>
                <Card className="bg-green-50 border-green-100">
                  <CardContent className="p-4 text-center">
                    <p className="text-2xl font-bold text-green-700">{selectedJob.hires}</p>
                    <p className="text-xs text-green-600 font-medium uppercase">Hired</p>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Description</h3>
                <p className="text-gray-700 text-sm leading-relaxed">{selectedJob.description}</p>

                <h3 className="text-lg font-semibold">Requirements</h3>
                <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
                  {selectedJob.requirements.map((req: string, i: number) => (
                    <li key={i}>{req}</li>
                  ))}
                </ul>
              </div>

              <div className="flex justify-end gap-3 pt-6 border-t">
                <Button variant="outline"><Edit className="h-4 w-4 mr-2" />Edit Job</Button>
                <Button className="bg-blue-600 hover:bg-blue-700">View Applications</Button>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>

      {/* Create Job Sheet (Simplified) */}
      <Sheet open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <SheetContent className="sm:max-w-xl overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Post a New Job</SheetTitle>
            <SheetDescription>Fill in the details to publish a new job opening.</SheetDescription>
          </SheetHeader>
          <div className="py-6 space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Job Title</label>
              <Input placeholder="e.g. Senior Frontend Engineer" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Company</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Company" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="TechNova">TechNova</SelectItem>
                    <SelectItem value="GreenFields">GreenFields</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Employment Type</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="full-time">Full-time</SelectItem>
                    <SelectItem value="contract">Part-time</SelectItem>
                    <SelectItem value="contract">Contract</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Location</label>
              <Input placeholder="e.g. Remote, San Fransisco, CA" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Description</label>
              <Textarea placeholder="Describe the role and responsibilities..." className="min-h-[150px]" />
            </div>
          </div>
          <SheetFooter>
            <Button variant="outline" onClick={() => setIsCreateOpen(false)}>Cancel</Button>
            <Button className="bg-blue-600 hover:bg-blue-700">Draft Post</Button>
            <Button className="bg-green-600 hover:bg-green-700">Publish Now</Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default JobsPage;
