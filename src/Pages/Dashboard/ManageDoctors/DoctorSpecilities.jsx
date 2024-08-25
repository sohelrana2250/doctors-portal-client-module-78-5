import React, { useContext, useState } from "react";
import medical_specialties from "../../../utilites/medical_specialties";
import { AuthContext } from "../../../contexts/AuthProvider";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import PutAction from "../../../commonAction/PutAction";
const DoctorSpecilities = ({ doctorId }) => {
  const [selectedSpecialties, setSelectedSpecialties] = useState([]);

  const {
    user: { displayName, email },
  } = useContext(AuthContext);

  const toggleSpecialty = (specialty) => {
    setSelectedSpecialties((prevSelected) =>
      prevSelected.includes(specialty)
        ? prevSelected.filter((s) => s !== specialty)
        : [...prevSelected, specialty]
    );
  };

  const handelSelectDoctorSpecilities = (event) => {
    event.preventDefault();
    if (!selectedSpecialties.length) {
      toast.error("Select Specilities");
    }
    Swal.fire({
      title: "Do you want to  changes any thing ?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "submit",
      denyButtonText: `Don't Submit`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        PutAction(
          `${process.env.REACT_APP_SERVER_API}/doctor/speciality/${doctorId}`,
          selectedSpecialties
        );
        Swal.fire("Submitted!", "", "success");
      } else if (result.isDenied) {
        Swal.fire("Changes are not Submitted", "", "info");
      }
    });
  };
  return (
    <>
      <input type="checkbox" id="selected_model" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box w-full max-w-5xl relative">
          <label
            htmlFor="selected_model"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="text-lg font-bold">
            Admin Name : {displayName ? displayName : "Antor"}
          </h3>
          <form
            onSubmit={handelSelectDoctorSpecilities}
            className="grid grid-cols-1 gap-3 mt-10"
          >
            <div className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-4">
              <div className="form-control w-full max-w-full">
                <label className="label">
                  <span className="label-text">Date</span>
                </label>
                <input
                  type="text"
                  name="date"
                  defaultValue={new Date().toString()}
                  className="input input-bordered w-full max-w-full"
                  required
                />
              </div>

              <div className="form-control w-full max-w-full">
                <label className="label">
                  <span className="label-text">Admin Email</span>
                </label>
                <input
                  type="text"
                  name="email"
                  defaultValue={email}
                  className="input input-bordered w-full max-w-full"
                  required
                />
              </div>
            </div>
            <div className="p-4">
              <div className="form-control w-full max-w-full">
                <div className="dropdown dropdown-top">
                  <label
                    tabIndex={0}
                    className="btn btn-primary btn-block btn-sm mb-2"
                  >
                    Select Specialties
                  </label>
                  <ul
                    tabIndex={0}
                    className="dropdown-top menu p-2 shadow bg-base-100 rounded-box w-full h-full overflow-x-auto "
                  >
                    {medical_specialties.map((item, index) => (
                      <li key={index}>
                        <label className="cursor-pointer ">
                          <input
                            type="checkbox"
                            checked={selectedSpecialties.includes(
                              item.specialty
                            )}
                            onChange={() => toggleSpecialty(item.specialty)}
                            className="checkbox checkbox-primary"
                          />
                          <span className="ml-2">{item.specialty}</span>
                        </label>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <input
                className="btn btn-accent  btn-sm m-3"
                value="CREATE SPECILITY"
                type="submit"
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default DoctorSpecilities;
