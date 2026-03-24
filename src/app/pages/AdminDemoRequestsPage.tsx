import { useState, useEffect } from "react";
import { Link } from "react-router";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { 
  GraduationCap, 
  Search, 
  Eye, 
  Trash2, 
  CheckCircle2, 
  XCircle,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Mail,
  Phone,
  Building,
  Users
} from "lucide-react";

export interface DemoRequest {
  id: string;
  fullName: string;
  workEmail: string;
  phoneNumber: string;
  schoolName: string;
  role: string;
  otherRole?: string;
  studentCount: string;
  countryCity: string;
  challenges: string;
  accountStatus: string;
  createdAt: string;
  status: "pending" | "contacted" | "completed" | "archived";
}

const roleLabels: Record<string, string> = {
  owner: "Owner",
  head_of_school: "Head of School",
  administrator: "Administrator",
  teacher: "Teacher",
  other: "Other",
};

const studentCountLabels: Record<string, string> = {
  "0-200": "0-200",
  "200-500": "200-500",
  "500-1000": "500-1000",
  "1000+": "1000+",
};

const statusLabels: Record<string, { label: string; color: string }> = {
  pending: { label: "Pending", color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400" },
  contacted: { label: "Contacted", color: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400" },
  completed: { label: "Completed", color: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400" },
  archived: { label: "Archived", color: "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400" },
};

export function AdminDemoRequestsPage() {
  const [requests, setRequests] = useState<DemoRequest[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedRequest, setSelectedRequest] = useState<DemoRequest | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Load requests from localStorage
  useEffect(() => {
    const storedRequests = localStorage.getItem("demoRequests");
    if (storedRequests) {
      try {
        const parsed = JSON.parse(storedRequests);
        setRequests(parsed);
      } catch (e) {
        console.error("Failed to parse demo requests:", e);
      }
    }
  }, []);

  // Filter requests based on search and status
  const filteredRequests = requests.filter((request) => {
    const matchesSearch = 
      request.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.workEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.schoolName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.phoneNumber.includes(searchTerm);
    
    const matchesStatus = statusFilter === "all" || request.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Pagination
  const totalPages = Math.ceil(filteredRequests.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedRequests = filteredRequests.slice(startIndex, startIndex + itemsPerPage);

  // Update request status
  const updateStatus = (id: string, newStatus: DemoRequest["status"]) => {
    const updatedRequests = requests.map((req) =>
      req.id === id ? { ...req, status: newStatus } : req
    );
    setRequests(updatedRequests);
    localStorage.setItem("demoRequests", JSON.stringify(updatedRequests));
    
    // Update selected request if it's the one being modified
    if (selectedRequest?.id === id) {
      setSelectedRequest({ ...selectedRequest, status: newStatus });
    }
  };

  // Delete request
  const deleteRequest = (id: string) => {
    if (confirm("Are you sure you want to delete this request?")) {
      const updatedRequests = requests.filter((req) => req.id !== id);
      setRequests(updatedRequests);
      localStorage.setItem("demoRequests", JSON.stringify(updatedRequests));
      
      if (selectedRequest?.id === id) {
        setSelectedRequest(null);
      }
    }
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/" className="flex items-center gap-3 group">
                <div className="flex items-center justify-center w-10 h-10 bg-[#e35336] dark:bg-[#f47236] rounded-xl group-hover:scale-105 transition-all">
                  <GraduationCap className="w-6 h-6 text-slate-950" />
                </div>
                <span className="text-xl font-semibold text-foreground">Admin Panel</span>
              </Link>
              <div className="h-6 w-px bg-slate-200 dark:bg-slate-700" />
              <h1 className="text-xl font-semibold text-foreground">Demo Requests</h1>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                {requests.length} total request{requests.length !== 1 ? "s" : ""}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Filters */}
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, email, school, or phone..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="pl-10 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700"
              />
            </div>
            
            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="px-4 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-foreground"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="contacted">Contacted</option>
              <option value="completed">Completed</option>
              <option value="archived">Archived</option>
            </select>
          </div>
        </div>

        {/* Requests Table & Detail View */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Table */}
          <div className={`lg:col-span-${selectedRequest ? "2" : "3"}`}>
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
              {filteredRequests.length === 0 ? (
                <div className="p-12 text-center">
                  <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">No requests found</h3>
                  <p className="text-muted-foreground">
                    {searchTerm || statusFilter !== "all" 
                      ? "Try adjusting your search or filter criteria"
                      : "No demo requests have been submitted yet"}
                  </p>
                </div>
              ) : (
                <>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                            Date
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                            Name
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                            Email
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                            School
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                            Status
                          </th>
                          <th className="px-4 py-3 text-right text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                        {paginatedRequests.map((request) => (
                          <tr 
                            key={request.id} 
                            className={`hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer ${selectedRequest?.id === request.id ? "bg-slate-100 dark:bg-slate-800" : ""}`}
                            onClick={() => setSelectedRequest(request)}
                          >
                            <td className="px-4 py-3 text-sm text-muted-foreground">
                              {new Date(request.createdAt).toLocaleDateString()}
                            </td>
                            <td className="px-4 py-3 text-sm font-medium text-foreground">
                              {request.fullName}
                            </td>
                            <td className="px-4 py-3 text-sm text-foreground">
                              {request.workEmail}
                            </td>
                            <td className="px-4 py-3 text-sm text-foreground">
                              {request.schoolName}
                            </td>
                            <td className="px-4 py-3">
                              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${statusLabels[request.status].color}`}>
                                {statusLabels[request.status].label}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-right">
                              <div className="flex items-center justify-end gap-1">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedRequest(request);
                                  }}
                                  className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-muted-foreground hover:text-foreground transition-colors"
                                  title="View details"
                                >
                                  <Eye className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    deleteRequest(request.id);
                                  }}
                                  className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-muted-foreground hover:text-red-500 transition-colors"
                                  title="Delete"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="px-4 py-3 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredRequests.length)} of {filteredRequests.length} results
                      </span>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                          disabled={currentPage === 1}
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </Button>
                        <span className="text-sm text-muted-foreground">
                          Page {currentPage} of {totalPages}
                        </span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                          disabled={currentPage === totalPages}
                        >
                          <ChevronRight className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Detail Panel */}
          {selectedRequest && (
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 sticky top-24">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-foreground">Request Details</h3>
                  <button
                    onClick={() => setSelectedRequest(null)}
                    className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700"
                  >
                    <XCircle className="w-5 h-5 text-muted-foreground" />
                  </button>
                </div>

                <div className="space-y-4">
                  {/* Status */}
                  <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                    <span className="text-sm font-medium text-muted-foreground">Status</span>
                    <select
                      value={selectedRequest.status}
                      onChange={(e) => updateStatus(selectedRequest.id, e.target.value as DemoRequest["status"])}
                      className="text-sm px-2 py-1 rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
                    >
                      <option value="pending">Pending</option>
                      <option value="contacted">Contacted</option>
                      <option value="completed">Completed</option>
                      <option value="archived">Archived</option>
                    </select>
                  </div>

                  {/* Full Name */}
                  <div>
                    <label className="text-xs font-medium text-muted-foreground uppercase">Full Name</label>
                    <p className="text-sm font-medium text-foreground mt-1">{selectedRequest.fullName}</p>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="text-xs font-medium text-muted-foreground uppercase">Work Email</label>
                    <p className="text-sm text-foreground mt-1 flex items-center gap-2">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      {selectedRequest.workEmail}
                    </p>
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="text-xs font-medium text-muted-foreground uppercase">Phone Number</label>
                    <p className="text-sm text-foreground mt-1 flex items-center gap-2">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      {selectedRequest.phoneNumber}
                    </p>
                  </div>

                  {/* School */}
                  <div>
                    <label className="text-xs font-medium text-muted-foreground uppercase">School / Institution</label>
                    <p className="text-sm text-foreground mt-1 flex items-center gap-2">
                      <Building className="w-4 h-4 text-muted-foreground" />
                      {selectedRequest.schoolName}
                    </p>
                  </div>

                  {/* Role */}
                  <div>
                    <label className="text-xs font-medium text-muted-foreground uppercase">Role</label>
                    <p className="text-sm text-foreground mt-1">
                      {selectedRequest.role === "other" && selectedRequest.otherRole 
                        ? selectedRequest.otherRole 
                        : roleLabels[selectedRequest.role] || selectedRequest.role}
                    </p>
                  </div>

                  {/* Student Count */}
                  <div>
                    <label className="text-xs font-medium text-muted-foreground uppercase">Number of Students</label>
                    <p className="text-sm text-foreground mt-1 flex items-center gap-2">
                      <Users className="w-4 h-4 text-muted-foreground" />
                      {studentCountLabels[selectedRequest.studentCount] || selectedRequest.studentCount}
                    </p>
                  </div>

                  {/* Country/City */}
                  {selectedRequest.countryCity && (
                    <div>
                      <label className="text-xs font-medium text-muted-foreground uppercase">Country / City</label>
                      <p className="text-sm text-foreground mt-1">{selectedRequest.countryCity}</p>
                    </div>
                  )}

                  {/* Challenges */}
                  {selectedRequest.challenges && (
                    <div>
                      <label className="text-xs font-medium text-muted-foreground uppercase">Challenges</label>
                      <p className="text-sm text-foreground mt-1">{selectedRequest.challenges}</p>
                    </div>
                  )}

                  {/* Date */}
                  <div>
                    <label className="text-xs font-medium text-muted-foreground uppercase">Submitted</label>
                    <p className="text-sm text-foreground mt-1 flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      {formatDate(selectedRequest.createdAt)}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-4 border-t border-slate-200 dark:border-slate-700">
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={() => {
                        if (selectedRequest.status === "pending") {
                          updateStatus(selectedRequest.id, "contacted");
                        } else if (selectedRequest.status === "contacted") {
                          updateStatus(selectedRequest.id, "completed");
                        }
                      }}
                    >
                      {selectedRequest.status === "pending" && (
                        <>
                          <CheckCircle2 className="w-4 h-4 mr-2" />
                          Mark Contacted
                        </>
                      )}
                      {selectedRequest.status === "contacted" && (
                        <>
                          <CheckCircle2 className="w-4 h-4 mr-2" />
                          Mark Completed
                        </>
                      )}
                      {selectedRequest.status === "completed" && "Completed"}
                      {selectedRequest.status === "archived" && "Archived"}
                    </Button>
                    <Button
                      variant="outline"
                      className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                      onClick={() => deleteRequest(selectedRequest.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
