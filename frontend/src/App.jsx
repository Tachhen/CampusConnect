import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import MentorDashboard from "./pages/MentorDashboard";
import StudentDashboard from "./pages/StudentDashboard";
import Sessions from "./pages/Sessions";
import CreateSession from "./pages/CreateSession";
import Chat from "./pages/Chat";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Protected Routes */}

                <Route
                    path="/mentor"
                    element={
                        <ProtectedRoute>
                            <MentorDashboard />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/student"
                    element={
                        <ProtectedRoute>
                            <StudentDashboard />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/sessions"
                    element={
                        <ProtectedRoute>
                            <Sessions />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/create-session"
                    element={
                        <ProtectedRoute>
                            <CreateSession />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/chat"
                    element={
                        <ProtectedRoute>
                            <Chat />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;