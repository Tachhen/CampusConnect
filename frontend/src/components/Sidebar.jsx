import { Link, useNavigate } from "react-router-dom";
import {
    FaHome,
    FaBook,
    FaComments,
    FaFolder,
    FaBell,
    FaUser,
    FaSignOutAlt
} from "react-icons/fa";

function Sidebar() {

    const navigate = useNavigate();

    const logout = () => {
        localStorage.clear();
        navigate("/");
    };

    return (
        <div className="w-64 h-screen bg-slate-900 text-white flex flex-col">

            <div className="text-3xl font-bold p-6 border-b border-slate-700">
                CampusConnect
            </div>

            <nav className="flex-1 p-4 space-y-3">

                <Link
                    to="/student"
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-700 transition"
                >
                    <FaHome />
                    Dashboard
                </Link>

                <Link
                    to="/sessions"
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-700 transition"
                >
                    <FaBook />
                    Sessions
                </Link>

                <Link
                    to="/chat"
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-700 transition"
                >
                    <FaComments />
                    Chat
                </Link>

                <Link
                    to="/files"
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-700 transition"
                >
                    <FaFolder />
                    Files
                </Link>

                <Link
                    to="/notifications"
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-700 transition"
                >
                    <FaBell />
                    Notifications
                </Link>

                <Link
                    to="/profile"
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-700 transition"
                >
                    <FaUser />
                    Profile
                </Link>

            </nav>

            <button
                onClick={logout}
                className="m-4 flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 rounded-lg py-3 transition"
            >
                <FaSignOutAlt />
                Logout
            </button>

        </div>
    );
}

export default Sidebar;