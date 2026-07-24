import { useEffect, useState } from "react";
import api from "../services/api";
import DashboardLayout from "../components/layout/DashboardLayout";

function MentorDashboard() {
    const [sessions, setSessions] = useState([]);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        sessionTime: "",
    });

    const loadSessions = async () => {
        try {
            const response = await api.get("/sessions/mentor");
            setSessions(response.data);
        } catch(err) {
            console.error(err);
        }
    };

    useEffect(() => {
        loadSessions();
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const createSession = async (e) => {
        e.preventDefault();
        try {
            await api.post("/sessions", formData);
            setFormData({
                title: "",
                description: "",
                sessionTime: ""
            });
            loadSessions();
        } catch(err) {
            alert(err.response?.data || "Error");
        }
    };

    const deleteSession = async (id) => {
        if (!confirm("Delete session?")) return;
        try {
            await api.delete(`/sessions/${id}`);
            loadSessions();
        } catch(err) {
            alert(err.response?.data);
        }
    };

    const now = new Date();
    const upcoming = sessions.filter(s => new Date(s.sessionTime) > now);
    const completed = sessions.filter(s => new Date(s.sessionTime) < now);

    return (
        <DashboardLayout>
            <div className="space-y-6">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 text-white shadow-xl">
                    <h1 className="text-3xl font-bold">Mentor Dashboard</h1>
                    <p className="text-blue-100 mt-2">Create sessions and guide your students</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
                        <p className="text-gray-500 text-sm font-medium">Total Sessions</p>
                        <p className="text-3xl font-bold text-gray-800 mt-2">{sessions.length}</p>
                    </div>

                    <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
                        <p className="text-gray-500 text-sm font-medium">Upcoming</p>
                        <p className="text-3xl font-bold text-green-600 mt-2">{upcoming.length}</p>
                    </div>

                    <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
                        <p className="text-gray-500 text-sm font-medium">Completed</p>
                        <p className="text-3xl font-bold text-gray-400 mt-2">{completed.length}</p>
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-8">
                    <h2 className="text-xl font-bold text-gray-800 mb-6">Create New Session</h2>
                    <form onSubmit={createSession} className="space-y-4">
                        <input
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="Session title"
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                            required
                        />
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Description"
                            rows="3"
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
                            required
                        />
                        <input
                            type="datetime-local"
                            name="sessionTime"
                            value={formData.sessionTime}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                            required
                        />
                        <button
                            type="submit"
                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition-colors"
                        >
                            Create Session
                        </button>
                    </form>
                </div>

                <div>
                    <h2 className="text-xl font-bold text-gray-800 mb-6">My Sessions</h2>

                    {sessions.length === 0 ? (
                        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-12 text-center">
                            <p className="text-gray-500">No sessions created yet</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                            {sessions.map(session => {
                                const isUpcoming = new Date(session.sessionTime) > now;
                                return (
                                    <div key={session.id} className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
                                        <div className="flex items-start justify-between">
                                            <h3 className="text-lg font-bold text-gray-800">{session.title}</h3>
                                            <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                                                isUpcoming ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
                                            }`}>
                                                {isUpcoming ? 'Upcoming' : 'Completed'}
                                            </span>
                                        </div>
                                        <p className="text-gray-600 text-sm mt-2">{session.description}</p>
                                        <p className="text-sm text-gray-700 mt-4 bg-gray-50 rounded-xl p-3">
                                            {new Date(session.sessionTime).toLocaleString()}
                                        </p>
                                        <button
                                            onClick={() => deleteSession(session.id)}
                                            className="mt-4 text-red-500 hover:text-red-700 text-sm font-medium transition-colors"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </DashboardLayout>
    );
}

export default MentorDashboard;