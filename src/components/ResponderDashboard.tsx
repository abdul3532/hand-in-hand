import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
    Shield,
    MapPin,
    Clock,
    Phone,
    User,
    AlertTriangle,
    CheckCircle,
    MessageSquare,
    Map,
    List,
    Navigation,
    Baby,
    Accessibility,
} from "lucide-react";

interface HelpRequest {
    id: string;
    name: string;
    phone: string;
    location: string;
    requestType: string;
    description: string;
    timestamp: Date;
    urgency: "critical" | "high" | "medium";
    status?: "pending" | "acknowledged" | "responding" | "resolved";
    response?: string;
    vulnerabilityFlags?: string[];
    distance?: string;
    assignedTo?: string;
}

export function ResponderDashboard() {
    const [requests, setRequests] = useState<HelpRequest[]>([]);
    const [selectedRequest, setSelectedRequest] = useState<HelpRequest | null>(null);
    const [responseMessage, setResponseMessage] = useState("");
    const [filterStatus, setFilterStatus] = useState<string>("all");
    const [viewMode, setViewMode] = useState<"list" | "map">("list");
    const [showAssignModal, setShowAssignModal] = useState(false);
    const [volunteerName, setVolunteerName] = useState("Lina Santos");

    useEffect(() => {
        loadRequests();
        const interval = setInterval(() => {
            loadRequests();
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    const loadRequests = () => {
        const stored = localStorage.getItem("helpRequests");
        if (stored) {
            const parsed = JSON.parse(stored).map((req: any) => ({
                ...req,
                timestamp: new Date(req.timestamp),
                status: req.status || "pending",
                vulnerabilityFlags: req.vulnerabilityFlags || [],
                distance: req.distance || calculateDistance(),
            }));
            setRequests(parsed);
        } else {
            const mockRequests: HelpRequest[] = [
                {
                    id: "1",
                    name: "Tan Wei Ming",
                    phone: "+65 9123 4567",
                    location: "Blk 123 Ang Mo Kio Ave 3, #05-45",
                    requestType: "RESCUE",
                    description: "Water level rising fast in my unit. Need evacuation assistance for elderly mother.",
                    timestamp: new Date(Date.now() - 15 * 60000),
                    urgency: "critical",
                    status: "pending",
                    vulnerabilityFlags: ["Elderly", "Mobility Issues"],
                    distance: "0.8 km",
                },
                {
                    id: "2",
                    name: "Lim Hui Ling",
                    phone: "+65 8234 5678",
                    location: "Toa Payoh Community Centre",
                    requestType: "SHELTER",
                    description: "Shelter is overcrowded. No space for families with young children.",
                    timestamp: new Date(Date.now() - 30 * 60000),
                    urgency: "high",
                    status: "acknowledged",
                    response: "Team dispatched to assess capacity. ETA 10 mins.",
                    vulnerabilityFlags: ["Children", "Family with Infant"],
                    distance: "1.2 km",
                    assignedTo: "Maria Cruz",
                },
                {
                    id: "3",
                    name: "Kumar Rajesh",
                    phone: "+65 9345 6789",
                    location: "Lorong 6 Toa Payoh",
                    requestType: "ROAD",
                    description: "Fallen tree blocking entire road. Cannot access main road.",
                    timestamp: new Date(Date.now() - 45 * 60000),
                    urgency: "medium",
                    status: "responding",
                    distance: "2.3 km",
                },
                {
                    id: "4",
                    name: "Farid Abdullah",
                    phone: "+62 812 3456 7890",
                    location: "Jl. Raya 234, Jakarta Utara",
                    requestType: "RESCUE",
                    description: "Need transport to evacuation center. Father uses wheelchair, mother needs medication.",
                    timestamp: new Date(Date.now() - 20 * 60000),
                    urgency: "critical",
                    status: "pending",
                    vulnerabilityFlags: ["Wheelchair User", "Medication Required", "Elderly"],
                    distance: "1.5 km",
                },
                {
                    id: "5",
                    name: "Sarah Gonzales",
                    phone: "+63 917 234 5678",
                    location: "Barangay Santo Niño, Marikina",
                    requestType: "SUPPLIES",
                    description: "Child with asthma needs medicine. Running low on inhaler.",
                    timestamp: new Date(Date.now() - 10 * 60000),
                    urgency: "high",
                    status: "pending",
                    vulnerabilityFlags: ["Child", "Medical Emergency"],
                    distance: "0.5 km",
                },
            ];
            setRequests(mockRequests);
            localStorage.setItem("helpRequests", JSON.stringify(mockRequests));
        }
    };

    const calculateDistance = () => {
        const distances = ["0.3 km", "0.5 km", "0.8 km", "1.2 km", "1.5 km", "2.3 km", "3.1 km"];
        return distances[Math.floor(Math.random() * distances.length)];
    };

    const getUrgencyColor = (urgency: string) => {
        switch (urgency) {
            case "critical":
                return "bg-red-100 text-red-800 border-red-300";
            case "high":
                return "bg-orange-100 text-orange-800 border-orange-300";
            case "medium":
                return "bg-yellow-100 text-yellow-800 border-yellow-300";
            default:
                return "bg-gray-100 text-gray-800 border-gray-300";
        }
    };

    const getStatusColor = (status?: string) => {
        switch (status) {
            case "pending":
                return "bg-red-100 text-red-700";
            case "acknowledged":
                return "bg-blue-100 text-blue-700";
            case "responding":
                return "bg-purple-100 text-purple-700";
            case "resolved":
                return "bg-green-100 text-green-700";
            default:
                return "bg-gray-100 text-gray-700";
        }
    };

    const handleStatusChange = (requestId: string, newStatus: string) => {
        const updated = requests.map((req) =>
            req.id === requestId ? { ...req, status: newStatus as any } : req
        );
        setRequests(updated);
        localStorage.setItem("helpRequests", JSON.stringify(updated));
    };

    const handleSendResponse = (requestId: string) => {
        const updated = requests.map((req) =>
            req.id === requestId
                ? { ...req, status: "acknowledged" as const, response: responseMessage }
                : req
        );
        setRequests(updated);
        localStorage.setItem("helpRequests", JSON.stringify(updated));
        setResponseMessage("");
        setSelectedRequest(null);
    };

    const handleAssignToSelf = (requestId: string) => {
        const updated = requests.map((req) =>
            req.id === requestId ? { ...req, assignedTo: volunteerName } : req
        );
        setRequests(updated);
        localStorage.setItem("helpRequests", JSON.stringify(updated));
        setShowAssignModal(false);
        setSelectedRequest(null);
    };

    const filteredRequests = requests
        .filter((req) => filterStatus === "all" || req.status === filterStatus)
        .sort((a, b) => {
            const urgencyOrder = { critical: 0, high: 1, medium: 2 };
            return urgencyOrder[a.urgency] - urgencyOrder[b.urgency];
        });

    const stats = {
        pending: requests.filter((r) => r.status === "pending").length,
        acknowledged: requests.filter((r) => r.status === "acknowledged").length,
        responding: requests.filter((r) => r.status === "responding").length,
        resolved: requests.filter((r) => r.status === "resolved").length,
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-indigo-700 text-white shadow-lg">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
                                <Shield className="w-7 h-7 text-indigo-700" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold">Responder Dashboard</h1>
                                <p className="text-indigo-200 text-sm">HandinHand Emergency Coordination</p>
                            </div>
                        </div>
                        <Link to="/" className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-lg transition">
                            Exit Dashboard
                        </Link>
                    </div>
                </div>
            </header>

            {/* Stats Bar */}
            <div className="bg-white border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        <div className="bg-red-50 rounded-lg p-4">
                            <div className="text-2xl font-bold text-red-700">{stats.pending}</div>
                            <div className="text-sm text-red-600">Pending</div>
                        </div>
                        <div className="bg-blue-50 rounded-lg p-4">
                            <div className="text-2xl font-bold text-blue-700">{stats.acknowledged}</div>
                            <div className="text-sm text-blue-600">Acknowledged</div>
                        </div>
                        <div className="bg-purple-50 rounded-lg p-4">
                            <div className="text-2xl font-bold text-purple-700">{stats.responding}</div>
                            <div className="text-sm text-purple-600">Responding</div>
                        </div>
                        <div className="bg-green-50 rounded-lg p-4">
                            <div className="text-2xl font-bold text-green-700">{stats.resolved}</div>
                            <div className="text-sm text-green-600">Resolved</div>
                        </div>
                    </div>

                    {/* View Toggle */}
                    <div className="flex gap-2">
                        <button
                            onClick={() => setViewMode("list")}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${viewMode === "list"
                                ? "bg-indigo-600 text-white"
                                : "bg-white text-gray-700 border hover:bg-gray-50"
                                }`}
                        >
                            <List className="w-4 h-4" />
                            List View
                        </button>
                        <button
                            onClick={() => setViewMode("map")}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${viewMode === "map"
                                ? "bg-indigo-600 text-white"
                                : "bg-white text-gray-700 border hover:bg-gray-50"
                                }`}
                        >
                            <Map className="w-4 h-4" />
                            Map View
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Filters */}
                <div className="mb-6 flex gap-2 flex-wrap">
                    {["all", "pending", "acknowledged", "responding"].map((status) => (
                        <button
                            key={status}
                            onClick={() => setFilterStatus(status)}
                            className={`px-4 py-2 rounded-lg transition capitalize ${filterStatus === status
                                ? "bg-indigo-600 text-white"
                                : "bg-white text-gray-700 border hover:bg-gray-50"
                                }`}
                        >
                            {status === "all" ? "All Requests" : status}
                        </button>
                    ))}
                </div>

                {/* Map View */}
                {viewMode === "map" && (
                    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                        <h3 className="font-bold text-lg mb-4">Request Map - Sorted by Priority & Proximity</h3>
                        <div className="bg-gray-100 rounded-lg p-12 mb-4 text-center">
                            <div className="w-full h-96 bg-gray-200 rounded-lg flex items-center justify-center">
                                <div className="text-gray-500">
                                    <Map className="w-16 h-16 mx-auto mb-2" />
                                    <p className="font-semibold">Interactive Map View</p>
                                    <p className="text-sm">In production: Real-time map with color-coded pins</p>
                                    <p className="text-sm mt-2">🔴 Critical | 🟠 High | 🟡 Medium</p>
                                </div>
                            </div>
                        </div>
                        <div className="text-sm text-gray-600">
                            <p><strong>Map features in production:</strong></p>
                            <ul className="list-disc list-inside space-y-1 mt-2">
                                <li>Color-coded pins based on urgency level</li>
                                <li>Cluster markers for multiple nearby requests</li>
                                <li>Volunteer location tracking</li>
                                <li>Optimized routing to avoid duplication</li>
                                <li>Special icons for vulnerability flags (wheelchair, children, elderly)</li>
                            </ul>
                        </div>
                    </div>
                )}

                {/* Requests List */}
                <div className="space-y-4">
                    {filteredRequests.length === 0 ? (
                        <div className="bg-white rounded-lg shadow p-12 text-center">
                            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Active Requests</h3>
                            <p className="text-gray-600">
                                {filterStatus === "all"
                                    ? "There are currently no help requests."
                                    : `No requests with status: ${filterStatus}`}
                            </p>
                        </div>
                    ) : (
                        filteredRequests.map((request) => (
                            <div key={request.id} className="bg-white rounded-lg shadow hover:shadow-md transition">
                                <div className="p-6">
                                    {/* Header */}
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-2 flex-wrap">
                                                <span
                                                    className={`px-3 py-1 rounded-full text-xs font-semibold border ${getUrgencyColor(request.urgency)}`}
                                                >
                                                    {request.urgency.toUpperCase()}
                                                </span>
                                                <span
                                                    className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(request.status)}`}
                                                >
                                                    {request.status?.toUpperCase() || "PENDING"}
                                                </span>
                                                <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-semibold">
                                                    {request.requestType}
                                                </span>
                                                {request.distance && (
                                                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold flex items-center gap-1">
                                                        <Navigation className="w-3 h-3" />
                                                        {request.distance}
                                                    </span>
                                                )}
                                            </div>

                                            {/* Vulnerability Flags */}
                                            {request.vulnerabilityFlags && request.vulnerabilityFlags.length > 0 && (
                                                <div className="flex flex-wrap gap-2 mb-3">
                                                    {request.vulnerabilityFlags.map((flag) => (
                                                        <span
                                                            key={flag}
                                                            className="px-2 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-semibold flex items-center gap-1"
                                                        >
                                                            {flag.includes("Wheelchair") && <Accessibility className="w-3 h-3" />}
                                                            {(flag.includes("Child") || flag.includes("Infant")) && (
                                                                <Baby className="w-3 h-3" />
                                                            )}
                                                            {flag.includes("Elderly") && "👴"}
                                                            {flag}
                                                        </span>
                                                    ))}
                                                </div>
                                            )}

                                            <h3 className="font-semibold text-lg text-gray-900 flex items-center gap-2">
                                                <User className="w-5 h-5 text-gray-500" />
                                                {request.name}
                                            </h3>
                                            {request.assignedTo && (
                                                <p className="text-sm text-purple-700 mt-1 font-medium">
                                                    ✓ Assigned to: {request.assignedTo}
                                                </p>
                                            )}
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-gray-500">
                                            <Clock className="w-4 h-4" />
                                            {Math.floor((Date.now() - new Date(request.timestamp).getTime()) / 60000)} mins ago
                                        </div>
                                    </div>

                                    {/* Details */}
                                    <div className="space-y-2 mb-4">
                                        <div className="flex items-start gap-2 text-gray-700">
                                            <Phone className="w-4 h-4 mt-1 flex-shrink-0" />
                                            <span>{request.phone}</span>
                                        </div>
                                        <div className="flex items-start gap-2 text-gray-700">
                                            <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                                            <span>{request.location}</span>
                                        </div>
                                        <div className="flex items-start gap-2 text-gray-700">
                                            <AlertTriangle className="w-4 h-4 mt-1 flex-shrink-0" />
                                            <span>{request.description}</span>
                                        </div>
                                    </div>

                                    {/* Previous Response */}
                                    {request.response && (
                                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
                                            <div className="flex items-start gap-2">
                                                <MessageSquare className="w-4 h-4 text-blue-600 mt-1" />
                                                <div className="flex-1">
                                                    <div className="text-xs font-semibold text-blue-800 mb-1">Response Sent:</div>
                                                    <div className="text-sm text-blue-900">{request.response}</div>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Actions */}
                                    <div className="flex gap-2 pt-4 border-t flex-wrap">
                                        <select
                                            value={request.status}
                                            onChange={(e) => handleStatusChange(request.id, e.target.value)}
                                            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500"
                                        >
                                            <option value="pending">Pending</option>
                                            <option value="acknowledged">Acknowledged</option>
                                            <option value="responding">Responding</option>
                                            <option value="resolved">Resolved</option>
                                        </select>

                                        {!request.assignedTo && request.status === "pending" && (
                                            <button
                                                onClick={() => {
                                                    setSelectedRequest(request);
                                                    setShowAssignModal(true);
                                                }}
                                                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition text-sm font-medium"
                                            >
                                                Assign to Me
                                            </button>
                                        )}

                                        <button
                                            onClick={() => setSelectedRequest(request)}
                                            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition text-sm font-medium"
                                        >
                                            Send Response
                                        </button>

                                        <a
                                            href={`tel:${request.phone}`}
                                            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-sm font-medium flex items-center gap-2"
                                        >
                                            <Phone className="w-4 h-4" />
                                            Call
                                        </a>

                                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm font-medium flex items-center gap-2">
                                            <Navigation className="w-4 h-4" />
                                            Navigate
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Response Modal */}
            {selectedRequest && !showAssignModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-xl shadow-xl max-w-lg w-full p-6">
                        <h3 className="text-xl font-bold mb-4">Send Response to {selectedRequest.name}</h3>
                        <textarea
                            value={responseMessage}
                            onChange={(e) => setResponseMessage(e.target.value)}
                            placeholder="Type your response message..."
                            rows={4}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 mb-4"
                        />
                        <div className="flex gap-3">
                            <button
                                onClick={() => setSelectedRequest(null)}
                                className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => handleSendResponse(selectedRequest.id)}
                                disabled={!responseMessage.trim()}
                                className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Send SMS
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Assign Task Modal */}
            {showAssignModal && selectedRequest && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-xl shadow-xl max-w-lg w-full p-6">
                        <h3 className="text-xl font-bold mb-4">Assign Task</h3>
                        <div className="mb-4">
                            <p className="text-gray-700 mb-2">
                                <strong>Request:</strong> {selectedRequest.requestType}
                            </p>
                            <p className="text-gray-700 mb-2">
                                <strong>Location:</strong> {selectedRequest.location}
                            </p>
                            <p className="text-gray-700 mb-2">
                                <strong>Distance:</strong> {selectedRequest.distance}
                            </p>
                            {selectedRequest.vulnerabilityFlags && selectedRequest.vulnerabilityFlags.length > 0 && (
                                <div className="mt-3">
                                    <p className="text-sm font-semibold text-orange-700 mb-1">Special Considerations:</p>
                                    <div className="flex flex-wrap gap-1">
                                        {selectedRequest.vulnerabilityFlags.map((flag) => (
                                            <span key={flag} className="px-2 py-1 bg-orange-100 text-orange-700 text-xs rounded-full">
                                                {flag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
                            <p className="text-sm text-blue-900">
                                By assigning this task to yourself, you confirm you can handle the specific needs and will navigate to
                                this location.
                            </p>
                        </div>
                        <div className="flex gap-3">
                            <button
                                onClick={() => {
                                    setShowAssignModal(false);
                                    setSelectedRequest(null);
                                }}
                                className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => handleAssignToSelf(selectedRequest.id)}
                                className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
                            >
                                Confirm Assignment
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
