import { useQuery } from "@tanstack/react-query";
import React from "react";
import DisplayError from "../../Shared/DisplayError/DisplayError";
import toast from "react-hot-toast";
import CardComponent from "./CardComponent";
import DeleteAction from "../../../commonAction/DeleteAction";

const AllCareteApointment = () => {
  const {
    data: allAppointment = [],
    isLoading,
    refetch,
    error,
  } = useQuery({
    queryKey: ["allAppointment"],
    queryFn: async () => {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_SERVER_API}/appointmentSpecialty`,
          {
            method: "GET",
          }
        );
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await res.json();

        return data;
      } catch (error) {
        toast.error(`Failed to fetch categories: ${error.message}`);
        return []; // Return an empty array on error
      }
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <DisplayError />;
  }
  // console.log(".....allAppointment.....");
  // console.log(allAppointment);

  const handleDelete = (id) => {
    if (id) {
      DeleteAction(
        `${process.env.REACT_APP_SERVER_API}/admin/delete_appointment/${id}`,
        refetch
      );
    }
  };

  return (
    <>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl text-center font-serif fo mb-4">
          Available Appointments Sloats :{allAppointment?.length}
        </h1>

        {/* searching Appointment  ----> Avaliable Selecting Option  --->next time  */}
        {!isLoading && (
          <CardComponent data={allAppointment} onDelete={handleDelete} />
        )}
      </div>
    </>
  );
};

export default AllCareteApointment;
