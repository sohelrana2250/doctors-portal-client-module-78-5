import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import toast from "react-hot-toast";
import Loading from "../../../Shared/Loading/Loading";
import DisplayError from "../../../Shared/DisplayError/DisplayError";
import DoctorCard from "./DoctorCard";

const BookingAppointment = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("");

  const {
    data: bookigAppointment = [],
    refetch,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["bookigAppointment"],
    queryFn: async () => {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_SERVER_API}/patient/bookingSloat`
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

  const uniqueSpecialties = [
    ...new Set(bookigAppointment.map((item) => item.specialty)),
  ];

  const filteredAppointments = bookigAppointment.filter((doctor) => {
    const matchesSpecialty = selectedSpecialty
      ? doctor.specialty === selectedSpecialty
      : true;
    const matchesSearchTerm = searchTerm
      ? doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.bookings.some((booking) =>
          booking.treatment.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : true;

    return matchesSpecialty && matchesSearchTerm;
  });

  return (
    <>
      <div className="p-8 min-h-screen">
        {/* search bar */}
        <div className="flex items-center justify-center mb-8">
          <select
            onChange={(e) => setSelectedSpecialty(e.target.value)}
            className="rounded-r-sm bg-white h-14 "
            defaultValue=""
          >
            <option value="" disabled selected>
              Specialty
            </option>
            {!isLoading &&
              uniqueSpecialties.map((specialty, index) => (
                <option key={index} value={specialty}>
                  {specialty}
                </option>
              ))}
          </select>
          <input
            type="search"
            id="default-search"
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full p-4 pl-10 text-sm text-white border border-gray-300 rounded-r-lg focus:ring-blue-500 focus:border-blue-500 bg-slate-900 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search by name or treatment"
            required
          />
        </div>

        <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-2">
          {!isLoading &&
            filteredAppointments?.map((doctor) => (
              <DoctorCard key={doctor._id} doctor={doctor} refetch={refetch} />
            ))}
        </div>
      </div>
    </>
  );
};

export default BookingAppointment;
