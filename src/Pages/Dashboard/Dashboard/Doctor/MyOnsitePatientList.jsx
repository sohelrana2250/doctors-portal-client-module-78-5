import React, { useContext } from "react";
import { AuthContext } from "../../../../contexts/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../Shared/Loading/Loading";
import DisplayError from "../../../Shared/DisplayError/DisplayError";
import BookingReport from "../../../../resuable/BookingReport";

const MyOnsitePatientList = () => {
  const { user } = useContext(AuthContext);

  const url = `${process.env.REACT_APP_SERVER_API}/Onsitebookings?email=${user?.email}`;

  const {
    data: bookings = [],
    isLoading,

    refetch,
    error,
  } = useQuery({
    queryKey: ["bookings", user?.email],
    queryFn: async () => {
      const res = await fetch(url, {
        headers: {
          authorization: `bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      const data = await res.json();
      return data;
    },
  });

  if (isLoading) {
    return <Loading />;
  }
  if (error) {
    return <DisplayError />;
  }

  //console.log(bookings);

  return (
    <div className="m-2">
      {/* <BookingReport
      isLoading={isLoading}
      mybooking={bookings}
      refetch={refetch}
    /> */}
      <h1 className="text-center font-serif text-2xl m-3">
        Doctors Booking Schedules
      </h1>

      <BookingReport
        mybooking={bookings}
        refetch={refetch}
        isLoading={isLoading}
      />
    </div>
  );
};

export default MyOnsitePatientList;
