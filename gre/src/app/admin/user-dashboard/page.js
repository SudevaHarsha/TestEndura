import DashboardTable from "@/components/dashboard/DashboardTable";
import SideNavbar from "@/components/dashboard/SideNavbar";
import { db } from "@/lib/db";
import React from "react";

const AdminDashboard = async () => {
  const users = await db.profile.findMany();
  return (
    <div className="flex w-full p-6">
      {/* <h3 className="text-gray-700 text-3xl font-medium">Dashboard</h3> */}

      <SideNavbar users={users} />
      <DashboardTable />
    </div>
  );
};

export default AdminDashboard;
