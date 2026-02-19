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
  LayoutList,
  LayoutGrid,
  Search,
  Filter,
  MoreHorizontal,
  Mail,
  Phone,
  MapPin,
  Globe,
  Building2,
  Users,
  Briefcase,
  CheckCircle2,
  XCircle,
  Plus,
  Download,
} from "lucide-react";
import { Helmet } from "react-helmet-async";

// Mock Data
const companiesData = [
  {
    id: 1,
    name: "TechNova",
    industry: "Technology",
    location: "San Francisco, CA",
    employees: "500-1000",
    website: "https://technova.com",
    email: "contact@technova.com",
    phone: "+1 (555) 123-4567",
    status: "Active",
    logo: "https://github.com/shadcn.png",
    activeJobs: 12,
    totalHires: 45,
    description: "Leading provider of innovative software solutions.",
  },
  {
    id: 2,
    name: "GreenFields",
    industry: "Agriculture",
    location: "Austin, TX",
    employees: "200-500",
    website: "https://greenfields.com",
    email: "info@greenfields.com",
    phone: "+1 (555) 987-6543",
    status: "Active",
    logo: "https://github.com/shadcn.png",
    activeJobs: 5,
    totalHires: 12,
    description: "Sustainable agriculture and farming technology.",
  },
  {
    id: 3,
    name: "MediCare Plus",
    industry: "Healthcare",
    location: "New York, NY",
    employees: "1000+",
    website: "https://medicare.com",
    email: "hr@medicare.com",
    phone: "+1 (555) 246-8135",
    status: "Pending",
    logo: "https://github.com/shadcn.png",
    activeJobs: 8,
    totalHires: 20,
    description: "Healthcare services and medical equipment provider.",
  },
  {
    id: 4,
    name: "FinServe",
    industry: "Finance",
    location: "London, UK",
    employees: "50-200",
    website: "https://finserve.com",
    email: "contact@finserve.com",
    phone: "+44 20 7946 0958",
    status: "Suspended",
    logo: "https://github.com/shadcn.png",
    activeJobs: 0,
    totalHires: 5,
    description: "Financial consultancy and investment services.",
  },
  {
    id: 5,
    name: "EduLearn",
    industry: "Education",
    location: "Remote",
    employees: "10-50",
    website: "https://edulearn.com",
    email: "hello@edulearn.com",
    phone: "+1 (555) 321-0987",
    status: "Active",
    logo: "https://github.com/shadcn.png",
    activeJobs: 3,
    totalHires: 8,
    description: "Online learning platform for professionals.",
  },
];

const CompaniesPage: React.FC = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [industryFilter, setIndustryFilter] = useState("All");
  const [selectedCompany, setSelectedCompany] = useState<any>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  // Filter Logic
  const filteredCompanies = companiesData.filter((company) => {
    const matchesSearch =
      company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      company.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesIndustry =
      industryFilter === "All" || company.industry === industryFilter;

    return matchesSearch && matchesIndustry;
  });

  const uniqueIndustries = Array.from(
    new Set(companiesData.map((c) => c.industry))
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Active":
        return <Badge className="bg-green-100 text-green-700 hover:bg-green-200 border-none">Active</Badge>;
      case "Suspended":
        return <Badge className="bg-red-100 text-red-700 hover:bg-red-200 border-none">Suspended</Badge>;
      case "Pending":
        return <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-200 border-none">Pending</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const openCompanyDetails = (company: any) => {
    setSelectedCompany(company);
    setIsSheetOpen(true);
  };

  return (
    <>
      <Helmet>
        <title>Companies | Job Portal</title>
      </Helmet>

      <div className="flex flex-col min-h-screen bg-gray-50/40 p-6 space-y-6">

        {/* Page Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Companies</h1>
            <p className="text-muted-foreground mt-1">
              Manage registered companies and their job postings.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center bg-white p-1 rounded-lg border shadow-sm mr-2">
              <Button
                variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className="gap-2"
              >
                <LayoutGrid className="h-4 w-4" /> Grid
              </Button>
              <Button
                variant={viewMode === 'list' ? 'secondary' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
                className="gap-2"
              >
                <LayoutList className="h-4 w-4" /> List
              </Button>
            </div>
            <Button className="gap-2 bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4" /> Add Company
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
                placeholder="Search companies..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
              <Select value={industryFilter} onValueChange={setIndustryFilter}>
                <SelectTrigger className="w-full sm:w-[200px]">
                  <SelectValue placeholder="Industry" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Industries</SelectItem>
                  {uniqueIndustries.map((ind) => (
                    <SelectItem key={ind} value={ind}>{ind}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button variant="outline" className="gap-2">
                <Download className="h-4 w-4" /> Export
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Content Area */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCompanies.map((company) => (
              <Card key={company.id} className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => openCompanyDetails(company)}>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <Avatar className="h-12 w-12 rounded-lg">
                    <AvatarImage src={company.logo} alt={company.name} />
                    <AvatarFallback className="rounded-lg">{company.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  {getStatusBadge(company.status)}
                </CardHeader>
                <CardContent className="pt-4">
                  <h3 className="font-bold text-lg">{company.name}</h3>
                  <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                    <Building2 className="h-3 w-3" /> {company.industry}
                  </p>
                  <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                    <MapPin className="h-3 w-3" /> {company.location}
                  </p>

                  <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t">
                    <div>
                      <p className="text-xs text-muted-foreground uppercase">Active Jobs</p>
                      <p className="text-lg font-bold">{company.activeJobs}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase">Total Hires</p>
                      <p className="text-lg font-bold">{company.totalHires}</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="pt-0 justify-end">
                  <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700 hover:bg-blue-50">View Details</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="shadow-sm">
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Company</TableHead>
                    <TableHead>Industry</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Jobs</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCompanies.map((company) => (
                    <TableRow key={company.id} className="cursor-pointer hover:bg-muted/50" onClick={() => openCompanyDetails(company)}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-9 w-9 rounded-lg">
                            <AvatarImage src={company.logo} alt={company.name} />
                            <AvatarFallback className="rounded-lg">{company.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                          </Avatar>
                          <span className="font-medium">{company.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>{company.industry}</TableCell>
                      <TableCell>{company.location}</TableCell>
                      <TableCell>{company.email}</TableCell>
                      <TableCell>{company.activeJobs}</TableCell>
                      <TableCell>{getStatusBadge(company.status)}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <span className="sr-only">Open menu</span>
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={(e) => { e.stopPropagation(); openCompanyDetails(company) }}>View Details</DropdownMenuItem>
                            <DropdownMenuItem onClick={(e) => e.stopPropagation()}>Edit Company</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600" onClick={(e) => e.stopPropagation()}>Deactivate</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Company Details Sheet */}
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent className="sm:max-w-xl overflow-y-auto">
          {selectedCompany && (
            <div className="space-y-6">
              <SheetHeader>
                <SheetTitle>Company Profile</SheetTitle>
                <SheetDescription>Detailed information and metrics.</SheetDescription>
              </SheetHeader>

              {/* Profile Header */}
              <div className="flex flex-col items-center py-6 border-b text-center">
                <Avatar className="h-24 w-24 rounded-xl mb-4">
                  <AvatarImage src={selectedCompany.logo} />
                  <AvatarFallback className="text-2xl rounded-xl">{selectedCompany.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <h2 className="text-2xl font-bold">{selectedCompany.name}</h2>
                <p className="text-muted-foreground">{selectedCompany.industry} • {selectedCompany.location}</p>
                <div className="mt-3">{getStatusBadge(selectedCompany.status)}</div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg text-center border">
                  <h3 className="text-2xl font-bold">{selectedCompany.activeJobs}</h3>
                  <p className="text-xs text-muted-foreground uppercase">Active Jobs</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg text-center border">
                  <h3 className="text-2xl font-bold">{selectedCompany.totalHires}</h3>
                  <p className="text-xs text-muted-foreground uppercase">Total Hires</p>
                </div>
              </div>

              {/* Contact Info */}
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-gray-900 border-b pb-2">Overview</h3>
                <p className="text-sm text-gray-600">{selectedCompany.description}</p>

                <div className="space-y-2 mt-4">
                  <div className="flex items-center gap-3 text-sm">
                    <Globe className="h-4 w-4 text-gray-400" />
                    <a href={selectedCompany.website} className="text-blue-600 hover:underline">{selectedCompany.website}</a>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Mail className="h-4 w-4 text-gray-400" />
                    <span>{selectedCompany.email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Phone className="h-4 w-4 text-gray-400" />
                    <span>{selectedCompany.phone}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Users className="h-4 w-4 text-gray-400" />
                    <span>{selectedCompany.employees} Employees</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="pt-6 border-t flex flex-col gap-3">
                <div className="grid grid-cols-2 gap-3">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">Edit Profile</Button>
                  <Button variant="outline" className="w-full">Manage Jobs</Button>
                </div>
                <Button variant="ghost" className="w-full text-red-600 hover:text-red-700 hover:bg-red-50">Suspend Account</Button>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </>
  );
};

export default CompaniesPage;
