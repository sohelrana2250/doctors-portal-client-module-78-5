import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../../Shared/Loading/Loading";
import toast from "react-hot-toast";
import DisplayError from "../../../Shared/DisplayError/DisplayError";
import { useForm } from "react-hook-form";
import PostAction from "../../../../commonAction/PostAction";

const DoctorsPrescription = () => {
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();

  const { id } = useParams();
  const {
    data: patientDoctor = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["patientDoctor"],
    queryFn: async () => {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_SERVER_API}/api/v1/prescription_doctor_history/${id}`,
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

  const onSubmit = (data) => {
    const presscriprion = {
      ...data,
      patientemail: patientDoctor.data.patientInformation.email,
      bookingId: id,
    };
    if (presscriprion) {
      PostAction(
        presscriprion,
        `${process.env.REACT_APP_SERVER_API}/api/v1/doctorprescription`
      );
      navigate(`/dashboard/video_callling_doctors`);
      reset();
    }
  };

  return (
    <>
      <h1 className="bg-blue-900 ml-10 mr-10 rounded-md text-white text-2xl font-serif text-center m-3">
        Patient History
      </h1>
      {!isLoading && (
        <>
          <div className="p-6 max-w-5xl mx-auto bg-white rounded-xl shadow-md space-y-4 sm:py-4 sm:px-8 lg:px-10 mt-6">
            <div className="flex items-center space-x-4">
              <img
                className="w-20 h-20 rounded-full"
                src={patientDoctor.data.patientInformation.image}
                alt="Profile"
              />
              <div className="flex-1">
                <h2 className="text-2xl font-semibold text-gray-900">
                  {patientDoctor.data.patientInformation.email}
                </h2>
                <p className="text-sm text-gray-600">
                  {patientDoctor.data.patientInformation.address}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                {
                  label: "Contact Number",
                  value: patientDoctor.data.patientInformation.contactNumber,
                },
                {
                  label: "Date of Birth",
                  value: patientDoctor.data.patientInformation.dateOfBirth,
                },
                {
                  label: "Gender",
                  value: patientDoctor.data.patientInformation.gender,
                },
                {
                  label: "Blood Group",
                  value: patientDoctor.data.patientInformation.bloodGroup,
                },
                {
                  label: "Height",
                  value: patientDoctor.data.patientInformation.height,
                },
                {
                  label: "Weight",
                  value: patientDoctor.data.patientInformation.weight,
                },
                {
                  label: "Dietary Preferences",
                  value:
                    patientDoctor.data.patientInformation.dietaryPreferences,
                },
                {
                  label: "Mental Health History",
                  value: (
                    <a
                      href={
                        patientDoctor.data.patientInformation
                          .mentalHealthHistory
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-500 underline"
                    >
                      View
                    </a>
                  ),
                },
                {
                  label: "Marital Status",
                  value: patientDoctor.data.patientInformation.maritalStatus,
                },
                {
                  label: "Has Allergies",
                  value: patientDoctor.data.patientInformation.hasAllergies ? (
                    <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-sm">
                      Yes
                    </span>
                  ) : (
                    <span className="px-2 py-1 font-semibold leading-tight text-red-700 bg-red-100 rounded-sm">
                      No
                    </span>
                  ),
                },
                {
                  label: "Has Diabetes",
                  value: patientDoctor.data.patientInformation.hasDiabetes ? (
                    <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-sm">
                      Yes
                    </span>
                  ) : (
                    <span className="px-2 py-1 font-semibold leading-tight text-red-700 bg-red-100 rounded-sm">
                      No
                    </span>
                  ),
                },
                {
                  label: "Smoking Status",
                  value: patientDoctor.data.patientInformation.smokingStatus ? (
                    <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-sm">
                      Yes
                    </span>
                  ) : (
                    <span className="px-2 py-1 font-semibold leading-tight text-red-700 bg-red-100 rounded-sm">
                      No
                    </span>
                  ),
                },
                {
                  label: "Pregnancy Status",
                  value: patientDoctor.data.patientInformation
                    .pregnancyStatus ? (
                    <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-sm">
                      Yes
                    </span>
                  ) : (
                    <span className="px-2 py-1 font-semibold leading-tight text-red-700 bg-red-100 rounded-sm">
                      No
                    </span>
                  ),
                },
                {
                  label: "Has Past Surgeries",
                  value: patientDoctor.data.patientInformation
                    .hasPastSurgeries ? (
                    <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-sm">
                      Yes
                    </span>
                  ) : (
                    <span className="px-2 py-1 font-semibold leading-tight text-red-700 bg-red-100 rounded-sm">
                      No
                    </span>
                  ),
                },
                {
                  label: "Recent Anxiety",
                  value: patientDoctor.data.patientInformation.recentAnxiety ? (
                    <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-sm">
                      Yes
                    </span>
                  ) : (
                    <span className="px-2 py-1 font-semibold leading-tight text-red-700 bg-red-100 rounded-sm">
                      No
                    </span>
                  ),
                },
                {
                  label: "Recent Depression",
                  value: patientDoctor.data.patientInformation
                    .recentDepression ? (
                    <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-sm">
                      Yes
                    </span>
                  ) : (
                    <span className="px-2 py-1 font-semibold leading-tight text-red-700 bg-red-100 rounded-sm">
                      No
                    </span>
                  ),
                },
              ].map((item, index) => (
                <div key={index}>
                  <label className="block text-sm font-medium text-gray-700">
                    {item.label}
                  </label>
                  <p className="text-sm text-gray-900">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      <div className="container mx-auto p-4">
        <div className="border p-4 rounded-lg shadow-lg max-w-3xl mx-auto">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h1 className="text-xl font-bold">
                {patientDoctor.data.doctorInformation.name}
              </h1>
              <p>
                {patientDoctor.data.doctorInformation.qualification.join(", ")}
              </p>
              <p>{patientDoctor.data.doctorInformation.designation}</p>
              <p>{patientDoctor.data.doctorInformation.currentWorkingPlace}</p>
            </div>
            <div>
              <img
                src={patientDoctor.data.doctorInformation.photo}
                alt="Doctor"
                className="w-24 h-24 rounded-full"
              />
            </div>
          </div>
          <div className="border-t pt-4">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block mb-1">Name:</label>
                  <input
                    {...register("name")}
                    className="input input-bordered w-full"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-1">Date:</label>
                  <input
                    type="date"
                    {...register("date")}
                    className="input input-bordered w-full"
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="block mb-1">Age:</label>
                  <input
                    type="number"
                    {...register("age")}
                    className="input input-bordered w-full"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-1">Sex:</label>
                  <select
                    {...register("sex")}
                    className="select select-bordered w-full"
                    required
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block mb-1">Address:</label>
                  <input
                    {...register("address")}
                    className="input input-bordered w-full"
                    required
                  />
                </div>
              </div>
              <div className="mb-4">
                <label className="block mb-1">Prescription:</label>
                <textarea
                  {...register("prescription")}
                  required
                  className="textarea textarea-bordered w-full"
                  rows="6"
                  defaultValue={`Medicine Name :    DD | MM | EV \n.♣ Napa Extra 500  30 | 1 | 2.\n ♣ Napa  30 | 1 | 2.\n ♣ Napa  30 | 1 | 2.\n ♣ Napa  30 | 1 | 2..\n ♣ Napa  30 | 1 | 2.\n ♣ Napa  30 | 1 | 2.`}
                ></textarea>
              </div>
              <button
                type="submit"
                className="btn btn-primary btn-sm  btn-outline"
              >
                submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default DoctorsPrescription;
