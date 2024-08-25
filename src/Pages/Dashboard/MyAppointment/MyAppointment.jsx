import React from "react";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import Loading from "../../Shared/Loading/Loading";
import DisplayError from "../../Shared/DisplayError/DisplayError";
import { MdPreview } from "react-icons/md";
import { FaFileMedical, FaCcPaypal } from "react-icons/fa";
import { FaUserCheck } from "react-icons/fa6";
import { FaRegUser } from "react-icons/fa";
import { TbBrandBooking } from "react-icons/tb";
import { MdOutlineDoNotDisturbOnTotalSilence } from "react-icons/md";
import { FaUserDoctor } from "react-icons/fa6";
import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  Legend,
  Bar,
} from "recharts";

const MyAppointment = () => {
  const {
    data: mydashboard = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["mydashboard"],
    queryFn: async () => {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_SERVER_API}/api/v1/common_dashboard`,
          {
            headers: {
              authorization: `bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
        const data = await res.json();
        return data;
      } catch (error) {
        toast.error(error?.message);
      }
    },
  });

  if (isLoading) {
    return <Loading />;
  }
  if (error) {
    return <DisplayError />;
  }

  const paymentSummery = mydashboard?.data?.commonthree;

  return (
    <>
      <br />
      <br />
      <div className="flex justify-center items-center">
        <div className="grid lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-1">
          <div className="card bg-gradient-to-b from-black via-black to-red-600 w-64 shadow-xl m-2 text-white">
            <div className="card-body">
              <div className="flex justify-evenly">
                <MdPreview className="text-3xl" />
                <p className="font-serif text-xl">My Review</p>
                <p className="font-serif text-xl">
                  {mydashboard?.data?.commonone}
                </p>
              </div>
            </div>
          </div>
          <div className="card bg-gradient-to-b from-black via-black to-green-700 w-64 shadow-xl m-2 text-white">
            <div className="card-body">
              <div className="flex justify-evenly">
                <FaFileMedical className="text-3xl" />
                <p className="font-serif text-xl">Prescription</p>
                <p className="font-serif text-xl">
                  {mydashboard?.data?.commontwo}
                </p>
              </div>
            </div>
          </div>
          <div className="card bg-gradient-to-b from-black via-black to-blue-900 w-64 shadow-xl m-2 text-white">
            <div className="card-body">
              <div className="flex justify-evenly">
                <FaCcPaypal className="text-3xl" />
                <p className="font-serif text-xl">Payment</p>
                <p className="font-serif text-xl">
                  {mydashboard?.data?.commonthree?.length}
                </p>
              </div>
            </div>
          </div>
          {mydashboard?.data?.commonfour && (
            <>
              <div className="card bg-gradient-to-b from-black via-black to-blue-900 w-64 shadow-xl m-2 text-white">
                <div className="card-body">
                  <div className="flex justify-evenly">
                    <FaUserCheck className="text-3xl" />
                    <p className="font-serif text-xl">Patient</p>
                    <p className="font-serif text-xl">
                      {mydashboard?.data?.commonfour}
                    </p>
                  </div>
                </div>
              </div>

              <div className="card bg-gradient-to-b from-black via-black to-green-700 w-64 shadow-xl m-2 text-white">
                <div className="card-body">
                  <div className="flex justify-evenly">
                    <FaRegUser className="text-3xl" />
                    <p className="font-serif text-xl">Users</p>
                    <p className="font-serif text-xl">
                      {mydashboard?.data?.commonfive}
                    </p>
                  </div>
                </div>
              </div>

              <div className="card bg-gradient-to-b from-black via-black to-red-600 w-64 shadow-xl m-2 text-white">
                <div className="card-body">
                  <div className="flex justify-evenly">
                    <TbBrandBooking className="text-3xl" />
                    <p className="font-serif text-xl">Booking</p>
                    <p className="font-serif text-xl">
                      {mydashboard?.data?.commonsix}
                    </p>
                  </div>
                </div>
              </div>

              <div className="card bg-gradient-to-b from-black via-black to-blue-900 w-64 shadow-xl m-2 text-white">
                <div className="card-body">
                  <div className="flex justify-evenly">
                    <MdOutlineDoNotDisturbOnTotalSilence className="text-3xl" />
                    <p className="font-serif text-xl">Total Booking</p>
                    <p className="font-serif text-xl">
                      {mydashboard?.data?.commonseven}
                    </p>
                  </div>
                </div>
              </div>

              <div className="card bg-gradient-to-b from-black via-black to-red-600 w-64 shadow-xl m-2 text-white">
                <div className="card-body">
                  <div className="flex justify-evenly">
                    <FaUserDoctor className="text-3xl" />
                    <p className="font-serif text-xl">Doctors</p>
                    <p className="font-serif text-xl">
                      {mydashboard?.data?.commoneight}
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <ResponsiveContainer width="100%" height={500}>
        <BarChart data={paymentSummery}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="slot" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="price" fill="#0ee832" />
          <Bar dataKey="treatment" fill="#9a13d4" />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
};

export default MyAppointment;
