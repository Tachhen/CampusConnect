import { Link, useNavigate } from "react-router-dom";

function Navbar() {
    const navigate = useNavigate();

    const role = localStorage.getItem("role");

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        navigate("/");
    };

    return (
        <nav className="bg-blue-700 text-white px-8 py-4 flex justify-between items-center">

            <h1 className="text-2xl font-bold">
                CampusConnect
            </h1>

            <div className="flex gap-6 items-center">

                <Link to="/sessions">
                    Sessions
                </Link>

                {role === "MENTOR" && (
                    <>
                        <Link to="/mentor">Dashboard</Link>
                        <Link to="/create-session">Create Session</Link>
                    </>
                )}

                {role === "STUDENT" && (
                    <Link to="/student">My Sessions</Link>
                )}

                <button
                    onClick={logout}
                    className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded"
                >
                    Logout
                </button>

            </div>

        </nav>
    );
}

export default Navbar;