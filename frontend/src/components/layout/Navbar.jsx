function Navbar() {
    const username = localStorage.getItem("username");

    return (
        <header className="bg-white shadow px-8 py-5 flex justify-between">

            <div>
                <h1 className="text-3xl font-bold">
                    Dashboard
                </h1>

                <p className="text-gray-500">
                    Welcome back, {username}
                </p>
            </div>

            <div className="flex items-center gap-5">

                <button className="text-2xl">
                    🔔
                </button>

                <img
                    src="https://ui-avatars.com/api/?name=Mentor"
                    className="w-11 h-11 rounded-full"
                    alt=""
                />

            </div>

        </header>
    );
}

export default Navbar;