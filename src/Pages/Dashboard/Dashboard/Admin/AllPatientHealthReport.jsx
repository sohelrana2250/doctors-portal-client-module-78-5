import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import toast from "react-hot-toast";
import Loading from "../../../Shared/Loading/Loading";
import DisplayError from "../../../Shared/DisplayError/DisplayError";
import { Link } from "react-router-dom";

const AllPatientHealthReport = () => {
  const [search, setSearchTerm] = useState("");

  const {
    data: patientProfile = [],
    refetch,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["patientProfile"],
    queryFn: async () => {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_SERVER_API}/api/v1/my_profile`,
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
      {/* search bar  */}
      <div className="flex items-center justify-center mb-8 m-3">
        <input
          type="search"
          id="default-search"
          onChange={(e) => setSearchTerm(e.target.value)}
          className="block w-full p-4 pl-6 text-sm text-white border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-slate-900 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Search by  email, or phone number"
          required
        />
      </div>

      {patientProfile?.data
        ?.filter((patient) => {
          return search.toLowerCase() === ""
            ? patient
            : patient.email.includes(search) ||
                patient.contactNumber.includes(search);
        })
        .map((patient, index) => (
          <div
            key={index}
            className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4 sm:py-4 sm:px-8 lg:px-10 mt-6"
          >
            <div className="flex items-center space-x-4">
              <img
                className="w-20 h-20 rounded-full"
                src={patient.image}
                alt="Profile"
              />
              <div className="flex-1">
                <h2 className="text-2xl font-semibold text-gray-900">
                  {patient.email}
                </h2>
                <p className="text-sm text-gray-600">{patient.address}</p>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Contact Number
                </label>
                <p className="text-sm text-gray-900">{patient.contactNumber}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Date of Birth
                </label>
                <p className="text-sm text-gray-900">{patient.dateOfBirth}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Gender
                </label>
                <p className="text-sm text-gray-900">{patient.gender}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Blood Group
                </label>
                <p className="text-sm text-gray-900">{patient.bloodGroup}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Height
                </label>
                <p className="text-sm text-gray-900">{patient.height}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Weight
                </label>
                <p className="text-sm text-gray-900">{patient.weight}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Dietary Preferences
                </label>
                <p className="text-sm text-gray-900">
                  {patient.dietaryPreferences}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Mental Health History
                </label>
                <a
                  href={patient.mentalHealthHistory}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-500 underline"
                >
                  View
                </a>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Marital Status
                </label>
                <p className="text-sm text-gray-900">{patient.maritalStatus}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  HasAllergies
                </label>
                <p className="text-sm text-gray-900">
                  {patient.hasAllergies ? (
                    <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-sm">
                      yes
                    </span>
                  ) : (
                    <span className="px-2 py-1 font-semibold leading-tight text-red-700 bg-red-100 rounded-sm">
                      No
                    </span>
                  )}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  HasDiabetes
                </label>
                <p className="text-sm text-gray-900">
                  {patient.hasDiabetes ? (
                    <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-sm">
                      yes
                    </span>
                  ) : (
                    <span className="px-2 py-1 font-semibold leading-tight text-red-700 bg-red-100 rounded-sm">
                      No
                    </span>
                  )}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Smoking Status
                </label>
                <p className="text-sm text-gray-900">
                  {patient.smokingStatus ? (
                    <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-sm">
                      yes
                    </span>
                  ) : (
                    <span className="px-2 py-1 font-semibold leading-tight text-red-700 bg-red-100 rounded-sm">
                      No
                    </span>
                  )}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Pregnancy Status
                </label>
                <p className="text-sm text-gray-900">
                  {patient.pregnancyStatus ? (
                    <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-sm">
                      yes
                    </span>
                  ) : (
                    <span className="px-2 py-1 font-semibold leading-tight text-red-700 bg-red-100 rounded-sm">
                      No
                    </span>
                  )}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  HasPast Surgeries
                </label>
                <p className="text-sm text-gray-900">
                  {patient.hasPastSurgeries ? (
                    <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-sm">
                      yes
                    </span>
                  ) : (
                    <span className="px-2 py-1 font-semibold leading-tight text-red-700 bg-red-100 rounded-sm">
                      No
                    </span>
                  )}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Recent Anxiety
                </label>
                <p className="text-sm text-gray-900">
                  {patient.recentAnxiety ? (
                    <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-sm">
                      yes
                    </span>
                  ) : (
                    <span className="px-2 py-1 font-semibold leading-tight text-red-700 bg-red-100 rounded-sm">
                      No
                    </span>
                  )}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Recent Depression
                </label>
                <p className="text-sm text-gray-900">
                  {patient.recentDepression ? (
                    <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-sm">
                      yes
                    </span>
                  ) : (
                    <span className="px-2 py-1 font-semibold leading-tight text-red-700 bg-red-100 rounded-sm">
                      No
                    </span>
                  )}
                </p>
              </div>
              <div className="flex justify-end">
                <Link
                  to={`/dashboard/update_patient_profile/${patient._id}`}
                  className="btn btn-outline btn-sm btn-primary"
                >
                  Update
                </Link>
              </div>
            </div>
          </div>
        ))}
    </>
  );
};

export default AllPatientHealthReport;
