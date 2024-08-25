import { useQuery } from "@tanstack/react-query";
import React from "react";
import Loading from "../../../Shared/Loading/Loading";
import DisplayError from "../../../Shared/DisplayError/DisplayError";
import toast from "react-hot-toast";
import BookingReport from "../../../../resuable/BookingReport";

const MyBookingAppointment = () => {
  ///api/v1/patient/mybooking

  const {
    data: mybooking = [],
    refetch,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["mybooking"],
    queryFn: async () => {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_SERVER_API}/api/v1/patient/mybooking`,
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
      <BookingReport
        isLoading={isLoading}
        mybooking={mybooking}
        refetch={refetch}
      />
    </>
  );
};

export default MyBookingAppointment;
