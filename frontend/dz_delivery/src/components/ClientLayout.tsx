import type React from "react"
import { Outlet } from "react-router-dom"
import ClientSidebar from "./ClientSidebar"

const ClientLayout: React.FC = () => {
  return (
    <div className="flex">
      <ClientSidebar />
      <div className="flex-1 p-4">
        <Outlet />
      </div>
    </div>
  )
}

export default ClientLayout

