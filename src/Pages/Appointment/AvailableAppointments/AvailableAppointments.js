import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import React, { useState } from "react";
import Loading from "../../Shared/Loading/Loading";
import BookingModal from "../BookingModal/BookingModal";
import AppointmentOption from "./AppointmentOption";
import DisplayError from "../../Shared/DisplayError/DisplayError";

const AvailableAppointments = ({ selectedDate }) => {
  const [treatment, setTreatment] = useState(null);
  const [search, setAvailableAppointments] = useState("");
  const date = format(selectedDate, "PP");
  const {
    data: appointmentOptions = [],
    refetch,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["appointmentOptions", date],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.REACT_APP_SERVER_API}/v2/appointmentOptions?date=${date}`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      const data = await res.json();
      return data;
    },
  });

  if (isLoading) {
    return <Loading></Loading>;
  }
  if (error) {
    return <DisplayError />;
  }

  return (
    <section className="my-16">
      <div className="flex items-center justify-center mb-8">
        <select
          onChange={(e) => setAvailableAppointments(e.target.value)}
          className="select select-primary w-full max-w-xs"
        >
          <option disabled selected>
            All AvailableAppointments
          </option>
          <option value="">All</option>
          {appointmentOptions?.map((v, index) => (
            <option key={index}>{v?.name}</option>
          ))}
        </select>
      </div>

      <p className="text-center text-secondary font-bold">
        Available Appointments on {format(selectedDate, "PP")}
      </p>
      <div className="grid gap-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 m-1 mt-6">
        {!isLoading &&
          appointmentOptions
            ?.filter((option) => {
              return search.toLowerCase() === ""
                ? option
                : option.name.toLowerCase() === search.toLowerCase();
            })
            .map((option) => (
              <AppointmentOption
                key={option._id}
                appointmentOption={option}
                setTreatment={setTreatment}
              ></AppointmentOption>
            ))}

        {/* {appointmentOptions.map((option) => (
          <AppointmentOption
            key={option._id}
            appointmentOption={option}
            setTreatment={setTreatment}
          ></AppointmentOption>
        ))} */}
      </div>
      {treatment && (
        <BookingModal
          selectedDate={selectedDate}
          treatment={treatment.appointmentOption}
          condition={treatment.condition}
          setTreatment={setTreatment}
          refetch={refetch}
        ></BookingModal>
      )}
    </section>
  );
};

export default AvailableAppointments;
