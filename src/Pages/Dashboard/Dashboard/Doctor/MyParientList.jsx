import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import Loading from "../../../Shared/Loading/Loading";
import DisplayError from "../../../Shared/DisplayError/DisplayError";
import BookingReport from "../../../../resuable/BookingReport";
import { AuthContext } from "../../../../contexts/AuthProvider";

const MyParientList = () => {
  const { user } = useContext(AuthContext);

  const url = `${process.env.REACT_APP_SERVER_API}/bookings?email=${user?.email}`;

  const {
    data: bookings = [],
    isLoading,
    isError,
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

export default MyParientList;
