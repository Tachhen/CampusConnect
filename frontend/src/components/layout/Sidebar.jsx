import { NavLink, useNavigate } from "react-router-dom";

function Sidebar() {
    const navigate = useNavigate();

    const logout = () => {
        localStorage.clear();
        navigate("/");
    };

    return (
        <aside className="w-64 min-h-screen bg-slate-900 text-white flex flex-col">

            <div className="text-3xl font-bold p-6 border-b border-slate-700">
                CampusConnect
            </div>

            <nav className="flex-1 mt-6">

                <NavLink
                    to="/mentor"
                    className={({ isActive }) =>
                        `block px-6 py-4 hover:bg-slate-800 ${
                            isActive ? "bg-blue-600" : ""
                        }`
                    }
                >
                    🏠 Dashboard
                </NavLink>

                <NavLink
                    to="/chat"
                    className={({ isActive }) =>
                        `block px-6 py-4 hover:bg-slate-800 ${
                            isActive ? "bg-blue-600" : ""
                        }`
                    }
                >
                    💬 Chat
                </NavLink>

                <NavLink
                    to="/resources"
                    className={({ isActive }) =>
                        `block px-6 py-4 hover:bg-slate-800 ${
                            isActive ? "bg-blue-600" : ""
                        }`
                    }
                >
                    📁 Resources
                </NavLink>

                <NavLink
                    to="/notifications"
                    className={({ isActive }) =>
                        `block px-6 py-4 hover:bg-slate-800 ${
                            isActive ? "bg-blue-600" : ""
                        }`
                    }
                >
                    🔔 Notifications
                </NavLink>

                <NavLink
                    to="/profile"
                    className={({ isActive }) =>
                        `block px-6 py-4 hover:bg-slate-800 ${
                            isActive ? "bg-blue-600" : ""
                        }`
                    }
                >
                    👤 Profile
                </NavLink>

            </nav>

            <button
                onClick={logout}
                className="m-6 bg-red-500 hover:bg-red-600 rounded-lg py-3"
            >
                Logout
            </button>

        </aside>
    );
}

export default Sidebar;