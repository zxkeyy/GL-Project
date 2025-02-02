import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import ClientLayout from "./components/ClientLayout";
import AdminLayout from "./components/AdminLayout";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ClientDashboard from "./pages/client/Dashboard";
import CreateDelivery from "./pages/client/CreateDelivery";
import TrackDelivery from "./pages/client/TrackDelivery";
import DeliveryHistory from "./pages/client/DeliveryHistory";
import AdminDashboard from "./pages/admin/Dashboard";
import UserManagement from "./pages/admin/UserManagement";
import DeliveryManagement from "./pages/admin/DeliveryManagement";
import SystemOverview from "./pages/admin/SystemOverview";
import NotFound from "./pages/NotFound";
import TrackDeliveries from "./pages/client/TrackDeliveries";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import About from "./pages/About";
import DriverApplication from "./pages/DriverApplication";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        errorElement: <NotFound />,
        children: [
            { path: "login", element: <Login /> },
            { path: "signup", element: <Signup /> },
            { path: "about", element: <About /> },
            { path: "services", element: <Services /> },
            { path: "contact", element: <Contact /> },
            { path: "driver-application", element: <DriverApplication /> },
            {
                path: "client",
                element: <ClientLayout />,
                children: [
                    { path: "", element: <ClientDashboard /> },
                    { path: "create-delivery", element: <CreateDelivery /> },
                    { path: "track-delivery", element: <TrackDeliveries /> },
                    { path: "track-delivery/:id", element: <TrackDelivery /> },
                    { path: "delivery-history", element: <DeliveryHistory /> },
                ],
            },
            {
                path: "admin",
                element: <AdminLayout />,
                children: [
                    { path: "", element: <AdminDashboard /> },
                    { path: "user-management", element: <UserManagement /> },
                    {
                        path: "delivery-management",
                        element: <DeliveryManagement />,
                    },
                    { path: "system-overview", element: <SystemOverview /> },
                ],
            },
        ],
    },
]);

export default router;
