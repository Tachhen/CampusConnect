import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();

        console.log("LOGIN BUTTON CLICKED");

        setError("");
        setIsLoading(true);

        try {
            const response = await api.post("/auth/login", {
                email,
                password,
            });

            console.log("LOGIN RESPONSE:", response.data);

            localStorage.setItem("token", response.data.token);
            localStorage.setItem("role", response.data.role);
            localStorage.setItem("username", response.data.username);

            if (response.data.role === "MENTOR") {
                navigate("/mentor");
            } else if (response.data.role === "STUDENT") {
                navigate("/student");
            } else if (response.data.role === "ADMIN") {
                navigate("/admin");
            } else {
                navigate("/sessions");
            }
        } catch (err) {
            console.error("LOGIN ERROR:", err);
            console.error("RESPONSE:", err.response);

            setError(
                err.response?.data?.message ||
                err.response?.data ||
                "Invalid email or password"
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-xl shadow-lg w-96">

                <h1 className="text-3xl font-bold text-center mb-2">
                    CampusConnect
                </h1>

                <p className="text-center text-gray-500 mb-6">
                    Login to your account
                </p>

                {error && (
                    <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin}>

                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full border p-3 rounded mb-4"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full border p-3 rounded mb-4"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 disabled:opacity-50"
                    >
                        {isLoading ? "Logging in..." : "Login"}
                    </button>

                </form>

                <p className="text-center mt-5">
                    Don't have an account?{" "}
                    <Link
                        to="/register"
                        className="text-blue-600 font-semibold"
                    >
                        Register
                    </Link>
                </p>

            </div>
        </div>
    );
}

export default Login;