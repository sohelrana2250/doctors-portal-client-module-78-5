import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import toast from "react-hot-toast";
import ConfirmationModal from "../../Shared/ConfirmationModal/ConfirmationModal";
import Loading from "../../Shared/Loading/Loading";
import UpdateDoctorModal from "../UpdateDoctor/UpdateDoctorModal";
import DoctorSpecilities from "./DoctorSpecilities";

const ManageDoctors = () => {
  const [deletingDoctor, setDeletingDoctor] = useState(null);
  const [doctorId, setDoctorId] = useState("");
  const [search, setSearchTerm] = useState("");

  const closeModal = () => {
    setDeletingDoctor(null);
  };

  const {
    data: doctors = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["doctors"],
    queryFn: async () => {
      try {
        const res = await fetch(
          "https://care-pulse-server.vercel.app/doctors",
          {
            headers: {
              authorization: `bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
        const data = await res.json();
        return data;
      } catch (error) {
        toast.error(error.message);
      }
    },
  });

  const handleDeleteDoctor = (doctor) => {
    fetch(`https://care-pulse-server.vercel.app/doctors/${doctor._id}`, {
      method: "DELETE",
      headers: {
        authorization: `bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount > 0) {
          refetch();
          toast.success(`Doctor ${doctor.name} deleted successfully`);
        }
      });
  };

  if (isLoading) {
    return <Loading />;
  }

  const filteredDoctors = doctors.filter((doctor) => {
    const searchLower = search.toLowerCase();
    return (
      doctor.name.toLowerCase().includes(searchLower) ||
      doctor.email.toLowerCase().includes(searchLower) ||
      doctor.phoneNumber.toLowerCase().includes(searchLower)
    );
  });

  return (
    <>
      <br />
      <br />
      {/* search bar  */}
      <div className="flex items-center justify-center mb-8 m-3">
        <input
          type="search"
          id="default-search"
          onChange={(e) => setSearchTerm(e.target.value)}
          className="block w-full p-4 pl-10 text-sm text-white border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-slate-900 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Search by name, email, or phone number"
          required
        />
      </div>
      <div className="container mx-auto p-4">
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Qualifications</th>
                <th>Medical College</th>
                <th>Specialty</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th>Gender</th>
                <th>Experience (years)</th>
                <th>Appointment Fee</th>
                <th>Current Working Place</th>
                <th>Designation</th>
                <th>Specialty</th>
                <th>Edit</th>
                <th>District</th>
                <th>Chamber</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {filteredDoctors.map((doctor) => (
                <tr key={doctor._id}>
                  <td>
                    <div className="avatar">
                      <div className="w-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                        <img src={doctor.image} alt={doctor.name} />
                      </div>
                    </div>
                  </td>
                  <td>{doctor.name}</td>
                  <td>{doctor.qualification.join(", ")}</td>
                  <td>{doctor.medicalCollege}</td>
                  <td>{doctor.specialty}</td>
                  <td>{doctor.email}</td>
                  <td>{doctor.phoneNumber}</td>
                  <td>{doctor.gender}</td>
                  <td>{doctor.experience}</td>
                  <td>{doctor.appointmentfee}</td>
                  <td>{doctor.currentWorkingPlace}</td>
                  <td>{doctor.designation}</td>
                  <td>
                    <label
                      htmlFor="selected_model"
                      onClick={() => setDoctorId(doctor._id)}
                      className="btn btn-primary btn-sm text-white"
                    >
                      Select Specialty
                    </label>
                    <DoctorSpecilities doctorId={doctorId} />
                  </td>
                  <td>
                    <label
                      htmlFor="booking-modal"
                      onClick={() => setDoctorId(doctor._id)}
                      className="btn btn-primary btn-sm text-white"
                    >
                      Edit
                    </label>
                    <UpdateDoctorModal doctorId={doctorId} />
                  </td>
                  <td>{doctor.district}</td>
                  <td>{doctor.chamber}</td>
                  <td>
                    <label
                      htmlFor="confirmation-modal"
                      onClick={() => setDeletingDoctor(doctor)}
                      className="btn btn-sm btn-error"
                    >
                      Delete
                    </label>
                    {deletingDoctor && (
                      <ConfirmationModal
                        title={`Are you sure you want to delete?`}
                        message={`If you delete ${deletingDoctor.name}, it cannot be undone.`}
                        successAction={() => handleDeleteDoctor(deletingDoctor)}
                        successButtonName="Delete"
                        modalData={deletingDoctor}
                        closeModal={closeModal}
                      />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ManageDoctors;
