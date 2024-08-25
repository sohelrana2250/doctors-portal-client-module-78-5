import { useQuery } from "@tanstack/react-query";
import React from "react";
import toast from "react-hot-toast";
import Loading from "../../../Shared/Loading/Loading";
import DisplayError from "../../../Shared/DisplayError/DisplayError";
import PrescriptionList from "../../../../resuable/PrescriptionList";

const Prescription = () => {
  const {
    data: myprescription = [],
    refetch,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["myprescription"],
    queryFn: async () => {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_SERVER_API}/api/v1/find_the_prescription`,
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
      <PrescriptionList isLoading={isLoading} myprescription={myprescription} />
    </>
  );
};

export default Prescription;
