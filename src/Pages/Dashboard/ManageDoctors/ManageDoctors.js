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

  const closeModal = () => {
    setDeletingDoctor(null);
  };

  const {
    data: doctors,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["doctors"],
    queryFn: async () => {
      try {
        const res = await fetch("http://localhost:5000/doctors", {
          headers: {
            authorization: `bearer ${localStorage.getItem("accessToken")}`,
          },
        });
        const data = await res.json();
        return data;
      } catch (error) {}
    },
  });

  const handleDeleteDoctor = (doctor) => {
    fetch(`http://localhost:5000/doctors/${doctor._id}`, {
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
    return <Loading></Loading>;
  }

  return (
    <>
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
                <th>Spacilish</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {doctors?.map((doctor) => (
                <tr key={doctor?._id}>
                  <td>
                    <div className="avatar">
                      <div className="w-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                        <img src={doctor?.image} />
                      </div>
                    </div>
                  </td>
                  <td>{doctor?.name}</td>
                  <td>{doctor?.qualification.join(", ")}</td>
                  <td>{doctor?.medicalCollege}</td>
                  <td>{doctor?.specialty}</td>
                  <td>{doctor?.email}</td>
                  <td>{doctor?.phoneNumber}</td>
                  <td>{doctor?.gender}</td>
                  <td>{doctor?.experience}</td>
                  <td>{doctor?.appointmentfee}</td>
                  <td>{doctor?.currentWorkingPlace}</td>
                  <td>{doctor?.designation}</td>
                  <td>
                    <label
                      htmlFor="selected_model"
                      onClick={() => setDoctorId(doctor?._id)}
                      className="btn btn-primary btn-sm text-white"
                    >
                      Selected Specilish
                    </label>
                    <DoctorSpecilities doctorId={doctorId} />
                  </td>
                  <td>
                    <label
                      htmlFor="booking-modal"
                      onClick={() => setDoctorId(doctor?._id)}
                      className="btn btn-primary btn-sm text-white"
                    >
                      Edit
                    </label>
                    <UpdateDoctorModal doctorId={doctorId} />
                  </td>
                  <td>
                    <label
                      htmlFor="confirmation-modal"
                      className="btn btn-sm btn-error"
                    >
                      Delete
                    </label>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* <h2 className="text-3xl font-serif text-center m-3">Manage Doctors: {doctors?.length}</h2>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Avatar</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Specialty</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            doctors.map((doctor, i) => <tr key={doctor._id}>
                                <th>{i + 1}</th>
                                <td><div className="avatar">
                                    <div className="w-16 rounded-full">
                                        <img src={doctor.image} alt="" />
                                    </div>
                                </div></td>
                                <td>{doctor.name}</td>
                                <td>{doctor.email}</td>
                                <td>{doctor.specialty}</td>
                                <td>
                                    <label onClick={() => setDeletingDoctor(doctor)} htmlFor="confirmation-modal" className="btn btn-sm btn-error">Delete</label>
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
            {
                deletingDoctor && <ConfirmationModal
                    title={`Are you sure you want to delete?`}
                    message={`If you delete ${deletingDoctor.name}. It cannot be undone.`}
                    successAction = {handleDeleteDoctor}
                    successButtonName="Delete"
                    modalData = {deletingDoctor}
                    closeModal = {closeModal}
                >
                </ConfirmationModal>
            } */}
    </>
  );
};

export default ManageDoctors;
