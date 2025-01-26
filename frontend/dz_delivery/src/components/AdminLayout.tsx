import type React from "react"
import { Outlet } from "react-router-dom"
import AdminSidebar from "./AdminSidebar"

const AdminLayout: React.FC = () => {
  return (
    <div className="flex">
      <AdminSidebar />
      <div className="flex-1 p-4">
        <Outlet />
      </div>
    </div>
  )
}

export default AdminLayout

