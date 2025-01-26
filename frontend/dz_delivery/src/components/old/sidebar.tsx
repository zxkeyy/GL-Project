import {
    Home,
    Package,
    Filter,
    TrendingUp,
    FileText,
    Users,
} from "lucide-react";
import { Link } from "react-router-dom";

export function Sidebar() {
    return (
        <div className="bg-gray-800 text-white min-w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform -translate-x-full md:relative md:translate-x-0 transition duration-200 ease-in-out">
            <nav>
                <Link
                    to="/"
                    className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white"
                >
                    <Home className="inline-block mr-2" size={20} />
                    Dashboard
                </Link>
                <Link
                    to="/package-management"
                    className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white"
                >
                    <Package className="inline-block mr-2" size={20} />
                    Package Management
                </Link>
                <Link
                    to="/allocation"
                    className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white"
                >
                    <Filter className="inline-block mr-2" size={20} />
                    Allocation
                </Link>
                <Link
                    to="/prediction"
                    className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white"
                >
                    <TrendingUp className="inline-block mr-2" size={20} />
                    Stock Prediction
                </Link>
                <Link
                    to="/reports"
                    className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white"
                >
                    <FileText className="inline-block mr-2" size={20} />
                    Reports
                </Link>
                <Link
                    to="/user-management"
                    className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white"
                >
                    <Users className="inline-block mr-2" size={20} />
                    User Management
                </Link>
            </nav>
        </div>
    );
}
