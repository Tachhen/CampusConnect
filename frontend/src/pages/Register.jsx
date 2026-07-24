import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

function Register() {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            const response = await api.post("/auth/register", {
                name,
                email,
                password,
            });

            setMessage(response.data);
            setError("");

            setTimeout(() => {
                navigate("/");
            }, 1500);

        } catch (err) {
            setError(err.response?.data || "Registration failed");
            setMessage("");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-xl shadow-lg w-96">

                <h1 className="text-3xl font-bold text-center mb-6">
                    Register
                </h1>

                {message && (
                    <p className="text-green-600 text-center mb-3">
                        {message}
                    </p>
                )}

                {error && (
                    <p className="text-red-500 text-center mb-3">
                        {error}
                    </p>
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
                        className="w-full bg-green-600 text-white py-3 rounded hover:bg-green-700"
                    >
                        Register
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