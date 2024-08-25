import { useQuery } from "@tanstack/react-query";
import React from "react";
import Loading from "../../../Shared/Loading/Loading";
import DisplayError from "../../../Shared/DisplayError/DisplayError";
import VideoCallDocToPatient from "../../../../resuable/VideoCallDocToPatient";
import toast from "react-hot-toast";

const AllBookingVideoCall = () => {
  const {
    data: videocall = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["videocall"],
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
      <VideoCallDocToPatient isLoading={isLoading} videocall={videocall} />
    </>
  );
};

export default AllBookingVideoCall;
