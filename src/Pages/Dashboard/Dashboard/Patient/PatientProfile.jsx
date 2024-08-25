import { useQuery } from "@tanstack/react-query";
import React from "react";
import toast from "react-hot-toast";
import Loading from "../../../Shared/Loading/Loading";
import DisplayError from "../../../Shared/DisplayError/DisplayError";
import { Link } from "react-router-dom";

const PatientProfile = () => {
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
      {!isLoading && (
        <>
          <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4 sm:py-4 sm:px-8 lg:px-10 mt-6">
            <div className="flex items-center space-x-4">
              <img
                className="w-20 h-20 rounded-full"
                src={patientProfile.data.image}
                alt="Profile"
              />
              <div className="flex-1">
                <h2 className="text-2xl font-semibold text-gray-900">
                  {patientProfile.data.email}
                </h2>
                <p className="text-sm text-gray-600">
                  {patientProfile.data.address}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Contact Number
                </label>
                <p className="text-sm text-gray-900">
                  {patientProfile.data.contactNumber}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Date of Birth
                </label>
                <p className="text-sm text-gray-900">
                  {patientProfile.data.dateOfBirth}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Gender
                </label>
                <p className="text-sm text-gray-900">
                  {patientProfile.data.gender}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Blood Group
                </label>
                <p className="text-sm text-gray-900">
                  {patientProfile.data.bloodGroup}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Height
                </label>
                <p className="text-sm text-gray-900">
                  {patientProfile.data.height}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Weight
                </label>
                <p className="text-sm text-gray-900">
                  {patientProfile.data.weight}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Dietary Preferences
                </label>
                <p className="text-sm text-gray-900">
                  {patientProfile.data.dietaryPreferences}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Mental Health History
                </label>
                <a
                  href={patientProfile.data.mentalHealthHistory}
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
                <p className="text-sm text-gray-900">
                  {patientProfile.data.maritalStatus}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  HasAllergies
                </label>
                <p className="text-sm text-gray-900">
                  {patientProfile.data.hasAllergies ? (
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
                  {patientProfile.data.hasDiabetes ? (
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
                  {patientProfile.data.smokingStatus ? (
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
                  {patientProfile.data.pregnancyStatus ? (
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
                  {patientProfile.data.hasPastSurgeries ? (
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
                  {patientProfile.data.recentAnxiety ? (
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
                  {patientProfile.data.recentDepression ? (
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
                  to={`/dashboard/update_patient_profile/${patientProfile.data._id}`}
                  className="btn btn-outline btn-sm btn-primary"
                >
                  Update
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default PatientProfile;
