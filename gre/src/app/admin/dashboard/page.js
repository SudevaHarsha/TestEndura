import Dashboard from "@/components/dashboard/Dashboard";
import DashboardTable from "@/components/dashboard/DashboardTable";
import SideNavbar from "@/components/dashboard/SideNavbar";
import Navbar from "@/components/sections/Navbar";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";

import {
  redirectToSignIn,
  RedirectToSignIn,
  redirectToSignUp,
} from "@clerk/nextjs";
import { redirect } from "next/dist/server/api-utils";

const AdminDashboard = async () => {
  const profile = await currentProfile();
  console.log(profile);

  if (!profile.role === "admin") {
    return <RedirectToSignIn redirectUrl="/sign-in" />;
  }
  const users = await db.profile.findMany();
  return (
    <div className="w-full p-6">
      {/* <h3 className="text-gray-700 text-3xl font-medium">Dashboard</h3> */}
      <Navbar />
      <Dashboard users={users} />
    </div>
  );
};

export default AdminDashboard;
