import { useEffect, useState } from "react";
import api from "../services/api";

function Sessions() {
    const [sessions, setSessions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadSessions();
    }, []);

    const loadSessions = async () => {
        try {
            const response = await api.get("/sessions");
            setSessions(response.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const register = async (id) => {
        try {
            const response = await api.post(`/sessions/${id}/register`);
            alert(response.data);
        } catch (error) {
            alert(error.response?.data || "Registration failed");
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen text-2xl">
                Loading sessions...
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 py-10 px-6">
            <div className="max-w-5xl mx-auto">

                <h1 className="text-4xl font-bold text-center mb-10 text-blue-700">
                    Available Mentoring Sessions
                </h1>

                {sessions.length === 0 ? (
                    <div className="bg-white rounded-xl shadow p-8 text-center text-gray-500">
                        No sessions available.
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 gap-6">
                        {sessions.map((session) => (
                            <div
                                key={session.id}
                                className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition"
                            >
                                <h2 className="text-2xl font-bold text-gray-800">
                                    {session.title}
                                </h2>

                                <p className="text-gray-600 mt-3">
                                    {session.description}
                                </p>

                                <div className="mt-5 space-y-2">
                                    <p>
                                        <span className="font-semibold">
                                            Mentor:
                                        </span>{" "}
                                        {session.mentorName}
                                    </p>

                                    <p>
                                        <span className="font-semibold">
                                            Date & Time:
                                        </span>{" "}
                                        {new Date(session.sessionTime).toLocaleString()}
                                    </p>
                                </div>

                                <button
                                    onClick={() => register(session.id)}
                                    className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition"
                                >
                                    Register
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Sessions;