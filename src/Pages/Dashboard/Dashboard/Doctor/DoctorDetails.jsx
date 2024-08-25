import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router-dom";
import Loading from "../../../Shared/Loading/Loading";
import DisplayError from "../../../Shared/DisplayError/DisplayError";
import toast from "react-hot-toast";
import { FaPhoneSquareAlt } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { AiOutlineSafetyCertificate } from "react-icons/ai";
import { FaRegAddressCard } from "react-icons/fa";
const DoctorDetails = () => {
  const { id } = useParams();
  const {
    data: specificDoctor = [],
    refetch,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["specificDoctor"],
    queryFn: async () => {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_SERVER_API}/specific/doctors/${id}`,
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

  return (
    <>
      <br />
      <br />
      {!isLoading && (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg ">
          <div className="flex items-center space-x-6">
            <div>
              <div className="avatar flex justify-center">
                <div className="w-52 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img
                    src={
                      specificDoctor.data.image ||
                      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzF32lbq4BoRPJ3bZ4FrQiFe9uhw5tRZBqxzt7G00uhbmqTW3f-PeYpIMOUzFCsYpuOMI&usqp=CAU"
                    }
                    alt={`${specificDoctor.data.name}`}
                  />
                </div>
              </div>
            </div>
            <div>
              <h1 className="text-3xl font-serif text-gray-800">
                {specificDoctor.data.name}
              </h1>
              <p className="text-gray-600">{specificDoctor.data.specialty}</p>
              <p className="text-gray-600">
                {specificDoctor.data.designation} at
                {specificDoctor.data.currentWorkingPlace}
              </p>
              <p className="text-gray-600">
                Experience: {specificDoctor.data.experience} years
              </p>
              <p className="text-gray-600">
                Appointment Fee: ${specificDoctor.data.appointmentfee}
              </p>
            </div>
          </div>
          <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-2">
            <div className="mt-6">
              <h2 className="text-2xl font-serif text-gray-800">
                Qualifications
              </h2>
              <ul className="list-disc list-inside text-gray-600">
                {specificDoctor.data.qualification.map((qual, index) => (
                  <span className="flex m-1" key={index}>
                    <AiOutlineSafetyCertificate className="text-xl" /> {qual}
                  </span>
                ))}
              </ul>
            </div>
            <div className="mt-6">
              <h2 className="text-2xl font-serif text-gray-800">
                Specialist In
              </h2>
              <ul className="list-disc list-inside text-gray-600">
                {specificDoctor.data.specialist.map((spec, index) => (
                  <span className="flex m-1" key={index}>
                    {" "}
                    <AiOutlineSafetyCertificate className="text-xl" /> {spec}
                  </span>
                ))}
              </ul>
            </div>
            <div className="mt-6">
              <h2 className="text-2xl font-serif text-gray-800">
                Contact Information
              </h2>
              <p className="text-gray-600 flex ">
                <HiOutlineMail className="text-xl" />
                {specificDoctor.data.email}
              </p>
              <p className="text-gray-600 flex">
                <FaPhoneSquareAlt className="text-xl" />{" "}
                {specificDoctor.data.phoneNumber}
              </p>
              <p className="text-gray-600 flex">
                <FaRegAddressCard className="text-xl m-1" />{" "}
                {specificDoctor.data.district} , {specificDoctor.data.chamber}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DoctorDetails;
