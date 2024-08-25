import { useQuery } from "@tanstack/react-query";
import React from "react";
import Loading from "../../../Shared/Loading/Loading";
import DisplayError from "../../../Shared/DisplayError/DisplayError";
import toast from "react-hot-toast";
import BookingReport from "../../../../resuable/BookingReport";

const MyOnsiteAppointment = () => {
  const {
    data: onsiteAppointment = [],
    refetch,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["onsiteAppointment"],
    queryFn: async () => {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_SERVER_API}/api/v1/myonsite_appointment`,
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
        mybooking={onsiteAppointment}
        refetch={refetch}
      />
    </>
  );
};

export default MyOnsiteAppointment;
