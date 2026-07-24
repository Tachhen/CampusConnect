import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

function DashboardLayout({ children }) {
    return (
        <div className="flex bg-slate-100">

            <Sidebar />

            <div className="flex-1">

                <Navbar />

                <main className="p-8">
                    {children}
                </main>

            </div>

        </div>
    );
}

export default DashboardLayout;