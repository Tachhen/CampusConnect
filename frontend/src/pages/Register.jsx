import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

function Register() {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleRegister = async (e) => {
        e.preventDefault();

        console.log("REGISTER BUTTON CLICKED");

        setError("");
        setMessage("");
        setIsLoading(true);

        try {
            const response = await api.post("/auth/register", {
                name,
                email,
                password,
            });

            console.log("REGISTER RESPONSE:", response.data);

            setMessage(response.data);

            setTimeout(() => {
                navigate("/");
            }, 1500);

        } catch (err) {
            console.error("REGISTER ERROR:", err);
            console.error("RESPONSE:", err.response);

            setError(
                err.response?.data?.message ||
                err.response?.data ||
                "Registration failed"
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-xl shadow-lg w-96">

                <h1 className="text-3xl font-bold text-center mb-2">
                    Create Account
                </h1>

                <p className="text-center text-gray-500 mb-6">
                    Join CampusConnect
                </p>

                {message && (
                    <div className="bg-green-100 text-green-700 p-3 rounded mb-4">
                        {message}
                    </div>
                )}

                {error && (
                    <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
                        {error}
                    </div>
                )}

                <form onSubmit={handleRegister}>

                    <input
                        type="text"
                        placeholder="Full Name"
                        className="w-full border p-3 rounded mb-4"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />

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
                        className="w-full bg-green-600 text-white py-3 rounded hover:bg-green-700 disabled:opacity-50"
                    >
                        {isLoading ? "Creating account..." : "Register"}
                    </button>

                </form>

                <p className="text-center mt-5">
                    Already have an account?{" "}
                    <Link
                        to="/"
                        className="text-blue-600 font-semibold"
                    >
                        Login
                    </Link>
                </p>

            </div>
        </div>
    );
}

export default Register;