import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthProvider";
import "./style.css";
import toast from "react-hot-toast";
const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);

  const handleLogOut = () => {
    logOut()
      .then(() => {
        localStorage.setItem("accessToken", null);
      })
      .catch((err) => toast.error(err?.message));
  };

  const menuItems = (
    <React.Fragment>
      <li>
        <Link className="header-links" to="/">
          Home
        </Link>
      </li>
      <li>
        <Link className="header-links" to="/booking_appointment">
          Online Appointment
        </Link>
      </li>
      <li>
        <Link className="header-links" to="/onsite_booking_appointment">
          OnSite Appointment
        </Link>
      </li>
      <li>
        <Link className="header-links" to="/about">
          About
        </Link>
      </li>
      {user?.uid && user?.emailVerified ? (
        <>
          <li>
            <Link className="header-links" to="/dashboard">
              Dashboard
            </Link>
          </li>
          <li>
            <button onClick={handleLogOut}>SignOut</button>
          </li>
        </>
      ) : (
        <li>
          <Link className="header-links" to="/login">
            Login
          </Link>
        </li>
      )}
    </React.Fragment>
  );

  return (
    <div className="navbar bg-base-100 flex justify-between">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={1}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            {menuItems}
          </ul>
        </div>
        <div className="avatar">
          <div className="w-10 ml-2 rounded-sm">
            <img
              src="https://genialcare.com.br/wp-content/uploads/2023/05/logo_CarePlus.png"
              alt=""
            />
          </div>
        </div>
        <Link to="/" className="btn btn-ghost normal-case text-xl">
          CARE PULSE
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal p-0">{menuItems}</ul>
      </div>
      <label
        htmlFor="dashboard-drawer"
        tabIndex={2}
        className="btn btn-ghost lg:hidden"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h8m-8 6h16"
          />
        </svg>
      </label>
    </div>
  );
};

export default Navbar;
