import { useQuery } from "@tanstack/react-query";
import React from "react";
import Loading from "../../../Shared/Loading/Loading";
import DisplayError from "../../../Shared/DisplayError/DisplayError";
import VideoCallDocToPatient from "../../../../resuable/VideoCallDocToPatient";
import toast from "react-hot-toast";

const DoctorsVideoCall = () => {
  const {
    data: videocall = [],
    refetch,
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
      {videocall?.data?.length === 0 && (
        <div className="avatar">
          <div className="w-full rounded">
            <img
              src="https://t3.ftcdn.net/jpg/01/38/48/40/360_F_138484065_1enzXuW8NlkppNxSv4hVUrYoeF8qgoeY.jpg"
              alt=""
            />
          </div>
        </div>
      )}
      <VideoCallDocToPatient isLoading={isLoading} videocall={videocall} />
    </>
  );
};

export default DoctorsVideoCall;
