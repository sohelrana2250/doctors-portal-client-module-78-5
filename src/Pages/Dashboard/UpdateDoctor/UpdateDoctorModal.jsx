import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../contexts/AuthProvider";
import toast from "react-hot-toast";

const UpdateDoctorModal = ({ doctorId }) => {
  const {
    user: { displayName },
  } = useContext(AuthContext);
  const [specificDoctor, setSpecificDoctor] = useState({});

  useEffect(() => {
    fetch(`http://localhost:5000/specific/doctors/${doctorId}`, {
      method: "GET",
      headers: {
        authorization: `bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("API ERROR");
        }
        return res.json();
      })
      .then((data) => {
        setSpecificDoctor(data?.data);
      })
      .catch((error) => {
        toast.error(error?.message);
      });
  }, [doctorId]);

  const handelManagementDoctorSubmit = (event) => {
    event.preventDefault();
    const element = event.target;
    const name = element.name.value;
    const medicalCollege = element.medicalCollege.value;
    const registeredDoctor = element.registeredDoctor.value;
    const phoneNumber = element.phoneNumber.value;
    const gender = element.gender.value;
    const experience = Number(element.experience.value);
    const appointmentfee = Number(element.appointmentfee.value);
    const currentWorkingPlace = element.currentWorkingPlace.value;
    const designation = element.designation.value;

    const updateData = {
      name,
      medicalCollege,
      registeredDoctor,
      phoneNumber,
      gender,
      experience,
      appointmentfee,
      currentWorkingPlace,
      designation,
    };

    fetch(`http://localhost:5000/update/doctor/${doctorId}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify(updateData),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("API ERROR");
        }
        return res.json();
      })
      .then((data) => {
        toast.success(data?.message);
      })
      .catch((error) => {
        toast.error(error?.message);
      });
  };
  return (
    <>
      <input type="checkbox" id="booking-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box w-full max-w-5xl relative">
          <label
            htmlFor="booking-modal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="text-lg font-bold">
            Admin Name : {displayName ? displayName : "Antor"}
          </h3>
          <form
            onSubmit={handelManagementDoctorSubmit}
            className="grid grid-cols-1 gap-3 mt-10"
          >
            <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4">
              <div className="form-control w-full max-w-full">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  name="name"
                  defaultValue={specificDoctor?.name}
                  className="input input-bordered w-full max-w-full"
                  required
                />
              </div>
              <div className="form-control w-full max-w-full">
                <label className="label">
                  <span className="label-text">Medical College</span>
                </label>
                <input
                  type="text"
                  name="medicalCollege"
                  defaultValue={specificDoctor?.medicalCollege}
                  className="input input-bordered w-full max-w-full"
                  required
                />
              </div>

              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text">Registered Doctor License</span>
                </label>
                <input
                  type="text"
                  name="registeredDoctor"
                  defaultValue={specificDoctor?.registeredDoctor}
                  className="input input-bordered w-full max-w-xs"
                  required
                />
              </div>
            </div>

            <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4">
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text">Doctor Phone Number</span>
                </label>
                <input
                  type="text"
                  name="phoneNumber"
                  defaultValue={specificDoctor?.phoneNumber}
                  className="input input-bordered w-full max-w-xs"
                  required
                />
              </div>

              <div className="form-control w-full max-w-full">
                <label className="label">
                  <span className="label-text">Gender</span>
                </label>
                <select
                  name="gender"
                  className="select input-bordered w-full max-w-full"
                  required
                >
                  <option disabled>
                    {" "}
                    Selected gender :{specificDoctor?.gender}
                  </option>
                  <option value="Male">Male</option>
                  <option value="Male">Female</option>
                </select>
              </div>

              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text">Experience</span>
                </label>
                <input
                  type="number"
                  name="experience"
                  defaultValue={specificDoctor?.experience}
                  className="input input-bordered w-full max-w-xs"
                  required
                />
              </div>
            </div>

            <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4">
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text">AppointmentFee</span>
                </label>
                <input
                  type="number"
                  name="appointmentfee"
                  defaultValue={specificDoctor?.appointmentfee}
                  className="input input-bordered w-full max-w-xs"
                  required
                />
              </div>

              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text">Current Working Place</span>
                </label>
                <input
                  type="text"
                  name="currentWorkingPlace"
                  defaultValue={specificDoctor?.currentWorkingPlace}
                  className="input input-bordered w-full max-w-xs"
                  required
                />
              </div>

              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text">Designation</span>
                </label>
                <input
                  type="text"
                  name="designation"
                  defaultValue={specificDoctor?.designation}
                  className="input input-bordered w-full max-w-xs"
                  required
                />
              </div>
            </div>

            <div className="flex justify-center">
              <input
                className="btn btn-accent  btn-sm m-3"
                value="Update"
                type="submit"
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default UpdateDoctorModal;
