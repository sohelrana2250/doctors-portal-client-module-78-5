import React, { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { AuthContext } from "../contexts/AuthProvider";
import useAdmin from "../hooks/useAdmin";
import Navbar from "../Pages/Shared/Navbar/Navbar";

const DashboardLayout = () => {
  const { user } = useContext(AuthContext);
  const [isAdmin] = useAdmin(user?.email);

  const AdminAccessRouter = [
    { name: "All users", path: "/dashboard/allusers" },
    { name: "Add A Doctor", path: "/dashboard/adddoctor" },
    { name: "Manage Doctors", path: "/dashboard/managedoctors" },
    { name: "Create Appointment", path: "/dashboard/create_appointment" },
    { name: "All Appointment", path: "/dashboard/all_appointment" },
  ];
  return (
    <div>
      <Navbar></Navbar>
      <div className="drawer drawer-mobile">
        <input
          id="dashboard-drawer"
          type="checkbox"
          className="drawer-toggle"
        />
        <div className="drawer-content">
          <Outlet></Outlet>
        </div>
        <div className="drawer-side">
          <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 text-base-content ">
            <li>
              <Link to="/dashboard">My Appointments</Link>
            </li>
            {isAdmin && (
              <>
                {AdminAccessRouter?.map((v, index) => (
                  <li>
                    <Link key={index} className="m-1" to={v.path}>
                      {v.name}
                    </Link>
                  </li>
                ))}
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
