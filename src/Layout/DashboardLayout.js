import React, { useContext } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { AuthContext } from "../contexts/AuthProvider";
import useAdmin from "../hooks/useAdmin";
import Navbar from "../Pages/Shared/Navbar/Navbar";
import toast from "react-hot-toast";
import { TbBrandBooking } from "react-icons/tb";
import { CgProfile } from "react-icons/cg";
import { MdVideoCall } from "react-icons/md";
import { GrHistory } from "react-icons/gr";
import { LuActivitySquare } from "react-icons/lu";
import { GrSchedulePlay } from "react-icons/gr";
import { TbMan } from "react-icons/tb";
import { FaPrescription } from "react-icons/fa";
import { RiMentalHealthLine } from "react-icons/ri";
import { MdOutlinePreview } from "react-icons/md";
import { HiMiniUsers } from "react-icons/hi2";
import { FaUserDoctor } from "react-icons/fa6";
import { ImProfile } from "react-icons/im";
import { MdOutlineManageHistory } from "react-icons/md";
import { MdCreateNewFolder } from "react-icons/md";
import { TbWallOff } from "react-icons/tb";
import { MdOutlinePassword } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { BiSolidCheckboxChecked } from "react-icons/bi";
import { TbReportMedical } from "react-icons/tb";
import { TbReportSearch } from "react-icons/tb";
import { FaCcPaypal } from "react-icons/fa";
import { FaUsersBetweenLines } from "react-icons/fa6";
import { IoCloudOfflineOutline } from "react-icons/io5";
import { MdOutlineAutoDelete } from "react-icons/md";
const DashboardLayout = () => {
  const { user } = useContext(AuthContext);
  const [isAdmin] = useAdmin(user?.email);
  console.log(isAdmin);
  let { pathname } = useLocation();

  // console.log(user?.photoURL);
  // console.log(isAdmin);
  const router =
    isAdmin && user?.photoURL === "user" ? "admin" : user?.photoURL;

  let AdminAccessRouter = [];
  switch (router) {
    case "admin": {
      AdminAccessRouter.push(
        {
          icon: <HiMiniUsers className="text-2xl" />,
          name: "All users",
          path: "/dashboard/allusers",
        },
        {
          icon: <BiSolidCheckboxChecked className="text-2xl" />,
          name: "Doctor Varify",
          path: "/dashboard/doctor_varify",
        }, //https://verify.bmdc.org.bd/
        {
          icon: <FaUserDoctor className="text-2xl" />,
          name: "Add A Doctor",
          path: "/dashboard/adddoctor",
        },
        {
          icon: <MdOutlineManageHistory className="text-2xl" />,
          name: "Manage Doctors",
          path: "/dashboard/managedoctors",
        },
        {
          icon: <MdCreateNewFolder className="text-2xl" />,
          name: "Create Appointment",
          path: "/dashboard/create_appointment",
        },
        {
          icon: <TbWallOff className="text-2xl" />,
          name: "All Appointment",
          path: "/dashboard/all_appointment",
        },
        {
          icon: <RiMentalHealthLine className="text-2xl " />,
          name: "Health Checked",
          path: "/dashboard/checked_mantal_health",
        },
        {
          icon: <MdOutlinePreview className="text-2xl" />,
          name: "Review",
          path: "/dashboard/review_section",
        },
        {
          icon: <ImProfile className="text-2xl " />,
          name: "My Profile",
          path: "/dashboard/my-profile-information",
        },
        {
          icon: <LuActivitySquare className="text-2xl " />,
          name: "Activity",
          path: "/dashboard",
        },
        {
          icon: <MdOutlinePassword className="text-2xl" />,
          name: "Chnage Password",
          path: "/dashboard/chnage_password",
        },

        {
          icon: <RiLockPasswordFill className="text-2xl" />,
          name: "Reset Password",
          path: "/forgot_password_care_pulse",
        },
        {
          icon: <TbReportMedical className="text-2xl" />,
          name: "Health Report",
          path: "/dashboard/AllPatientHealthReport",
        },
        {
          icon: <TbReportSearch className="text-2xl" />,
          name: "Booking Report",
          path: "/dashboard/allbooking_report",
        },
        {
          icon: <FaCcPaypal className="text-2xl" />,
          name: "Payment Report",
          path: "/dashboard/payment_report",
        },
        {
          icon: <MdOutlineAutoDelete className="text-2xl" />,
          name: "Delete Account",
          path: "/dashboard/delete_account",
        }
      );
      break;
    }

    case "doctor": {
      AdminAccessRouter.push(
        {
          icon: <GrSchedulePlay className="text-2xl" />,
          name: "Select Time",
          path: "/dashboard/appointment",
        },
        {
          icon: <TbMan className="text-2xl" />,
          name: "Online Patient",
          path: "/dashboard/my_patientlist",
        },
        {
          icon: <FaUsersBetweenLines className="text-xl" />,
          name: "OnSite Patient",
          path: "/dashboard/my_onsite_patientlist",
        },
        {
          icon: <MdVideoCall className="text-2xl " />,
          name: "Video Calling",
          path: "/dashboard/video_callling_doctors",
        },
        {
          icon: <CgProfile className="text-2xl " />,
          name: "My Profile",
          path: "/dashboard/myprofile",
        },
        {
          icon: <FaPrescription className="text-2xl " />,
          name: "Prescription",
          path: "/dashboard/prescription",
        },
        {
          icon: <LuActivitySquare className="text-2xl " />,
          name: "Activity",
          path: "/dashboard",
        },
        // {
        //   icon: <RiMentalHealthLine className="text-2xl " />,
        //   name: "Health Checked",
        //   path: "/dashboard/checked_mantal_health",
        // },
        {
          icon: <MdOutlinePreview className="text-2xl" />,
          name: "Review",
          path: "/dashboard/review_section",
        },
        {
          icon: <MdOutlinePassword className="text-2xl" />,
          name: "Chnage Password",
          path: "/dashboard/chnage_password",
        },
        {
          icon: <RiLockPasswordFill className="text-2xl" />,
          name: "Forget Password",
          path: "/forgot_password_care_pulse",
        },
        {
          icon: <MdOutlineAutoDelete className="text-2xl" />,
          name: "Delete Account",
          path: "/dashboard/delete_account",
        }
      );
      break;
    }

    case "user": {
      AdminAccessRouter.push(
        {
          icon: <TbBrandBooking className="text-2xl " />,
          name: "Online Appointment",
          path: "/dashboard/myappointments",
        },
        {
          icon: <IoCloudOfflineOutline className="text-2xl" />,
          name: "Onsite Appointment",
          path: "/dashboard/myonsite_appointment",
        },
        {
          icon: <CgProfile className="text-2xl " />,
          name: "My Health",
          path: "/dashboard/patient_profile",
        },
        {
          icon: <MdVideoCall className="text-2xl " />,
          name: "Video Call",
          path: "/dashboard/video_call",
        },
        {
          icon: <ImProfile className="text-2xl " />,
          name: "My Profile",
          path: "/dashboard/my-profile-information",
        },

        {
          icon: <GrHistory className="text-2xl " />,
          name: "Medical History",
          path: "/dashboard/patientprescription",
        },
        {
          icon: <LuActivitySquare className="text-2xl " />,
          name: "Activity",
          path: "/dashboard",
        },

        {
          icon: <RiMentalHealthLine className="text-2xl " />,
          name: "Health Checked",
          path: "/dashboard/checked_mantal_health",
        },
        {
          icon: <MdOutlinePreview className="text-2xl" />,
          name: "Review",
          path: "/dashboard/review_section",
        },
        {
          icon: <MdOutlinePassword className="text-2xl" />,
          name: "Chnage Password",
          path: "/dashboard/chnage_password",
        },
        {
          icon: <RiLockPasswordFill className="text-2xl" />,
          name: "Reset Password",
          path: "/forgot_password_care_pulse",
        },
        {
          icon: <MdOutlineAutoDelete className="text-2xl" />,
          name: "Delete Account",
          path: "/dashboard/delete_account",
        }
      );
      break;
    }

    default: {
      toast.error("You Are Unauthorized User");
    }
  }

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
          <ul className="menu p-4 w-72   text-base-content m-1">
            {AdminAccessRouter?.map((v, index) => {
              const isActive = pathname === v.path;

              return (
                <Link
                  key={index}
                  className={`m-1 ${
                    isActive ? "text-blue-500" : "text-gray-600"
                  }`}
                  to={v.path}
                >
                  <li>
                    <div>
                      {v.icon}
                      {v.name}
                    </div>
                  </li>
                </Link>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
