import React from "react";
import Loading from "../../../Shared/Loading/Loading";
import DisplayError from "../../../Shared/DisplayError/DisplayError";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import PrescriptionList from "../../../../resuable/PrescriptionList";

const PatientPrescription = () => {
  const {
    data: myprescription = [],

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

export default PatientPrescription;
