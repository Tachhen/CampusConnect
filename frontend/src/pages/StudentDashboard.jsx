import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import DashboardLayout from "../components/layout/DashboardLayout";

function StudentDashboard() {
    const navigate = useNavigate();

    const [sessions, setSessions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadMySessions();
    }, []);

    const loadMySessions = async () => {
        try {
            const response = await api.get("/sessions/student");
            setSessions(response.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const upcomingSessions = sessions.filter(
        session => new Date(session.sessionTime) > new Date()
    );

    if (loading) {
        return (
            <DashboardLayout>
                <div className="text-center text-2xl font-semibold py-20">
                    Loading...
                </div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout>

            {/* Welcome */}

            <div className="mb-8">

                <h1 className="text-4xl font-bold">
                    Welcome Back 👋
                </h1>

                <p className="text-gray-500 mt-2">
                    Continue your learning journey.
                </p>

            </div>

            {/* Statistics */}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

                <div className="bg-white rounded-xl shadow-lg p-6">

                    <h3 className="text-gray-500">
                        Registered Sessions
                    </h3>

                    <p className="text-4xl font-bold mt-2">
                        {sessions.length}
                    </p>

                </div>

                <div className="bg-white rounded-xl shadow-lg p-6">

                    <h3 className="text-gray-500">
                        Upcoming Sessions
                    </h3>

                    <p className="text-4xl font-bold mt-2">
                        {upcomingSessions.length}
                    </p>

                </div>

                <div className="bg-white rounded-xl shadow-lg p-6">

                    <h3 className="text-gray-500">
                        Mentors
                    </h3>

                    <p className="text-4xl font-bold mt-2">
                        {
                            new Set(
                                sessions.map(
                                    session => session.mentorName
                                )
                            ).size
                        }
                    </p>

                </div>

            </div>

            {/* Quick Actions */}

            <div className="bg-white rounded-xl shadow-lg p-6 mb-10">

                <h2 className="text-2xl font-bold mb-6">
                    Quick Actions
                </h2>

                <div className="flex flex-wrap gap-4">

                    <button
                        onClick={() => navigate("/sessions")}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
                    >
                        Browse Sessions
                    </button>

                    <button
                        onClick={() => navigate("/chat")}
                        className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg"
                    >
                        Open Chat
                    </button>

                </div>

            </div>

            {/* Registered Sessions */}

            <h2 className="text-3xl font-bold mb-6">
                My Registered Sessions
            </h2>

            {sessions.length === 0 ? (

                <div className="bg-white rounded-xl shadow-lg p-10 text-center text-gray-500">
                    You haven't registered for any sessions yet.
                </div>

            ) : (

                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

                    {sessions.map(session => (

                        <div
                            key={session.sessionId}
                            className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition"
                        >

                            <h3 className="text-2xl font-bold">
                                {session.title}
                            </h3>

                            <p className="text-gray-600 mt-3">
                                {session.description}
                            </p>

                            <div className="border-t mt-5 pt-5 space-y-2">

                                <p>
                                    <strong>Mentor:</strong>{" "}
                                    {session.mentorName}
                                </p>

                                <p>
                                    <strong>Session Time:</strong>{" "}
                                    {new Date(
                                        session.sessionTime
                                    ).toLocaleString()}
                                </p>

                                <p>
                                    <strong>Registered On:</strong>{" "}
                                    {new Date(
                                        session.registeredAt
                                    ).toLocaleString()}
                                </p>

                            </div>

                            <div className="flex gap-3 mt-6">

                                <button
                                    onClick={() => navigate("/chat")}
                                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg"
                                >
                                    Chat
                                </button>

                                <button
                                    onClick={() => navigate("/sessions")}
                                    className="flex-1 bg-slate-700 hover:bg-slate-800 text-white py-2 rounded-lg"
                                >
                                    View
                                </button>

                            </div>

                        </div>

                    ))}

                </div>

            )}

        </DashboardLayout>
    );
}

export default StudentDashboard;