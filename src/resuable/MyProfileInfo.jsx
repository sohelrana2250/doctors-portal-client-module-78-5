import { useQuery } from "@tanstack/react-query";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import Loading from "../Pages/Shared/Loading/Loading";
import DisplayError from "../Pages/Shared/DisplayError/DisplayError";
import { AuthContext } from "../contexts/AuthProvider";
import { GrDevice } from "react-icons/gr";
import {
  MdOutlineSettingsSystemDaydream,
  MdOutlineSignalWifiStatusbar4Bar,
  MdOutlineSignalWifiStatusbarNull,
  MdSignalWifiStatusbarConnectedNoInternet,
} from "react-icons/md";
import { BsBrowserChrome } from "react-icons/bs";
import { PiTrainRegionalThin } from "react-icons/pi";

import DeviceDetector from "device-detector-js";
import { TypeOfImage } from "../utilites/TypesOfImages";
import GenerateImage from "../commonAction/GenerateImage";
import PutAction from "../commonAction/PutAction";

const MyProfileInfo = () => {
  const { user, updateUser } = useContext(AuthContext);
  const [deviceInfo, setDeviceInfo] = useState(null);

  useEffect(() => {
    const deviceDetector = new DeviceDetector();
    const userAgent = navigator.userAgent;

    const info = deviceDetector.parse(userAgent);
    setDeviceInfo(info);
  }, []);
  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const districtName = userTimeZone.split("/")[1];

  const {
    data: profile = [],
    refetch,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_SERVER_API}/api/v1/my_profile_information`,
          {
            headers: {
              authorization: `bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );

        // Check if the response is not ok (e.g., 4xx or 5xx status codes)
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await res.json();
        return data;
      } catch (error) {
        // Display a toast message for the error
        toast.error(error.message);

        // Return an empty object or an appropriate default value
        return {};
      }
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <DisplayError />;
  }

  const handelProfileSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const address = form.address.value;
    const contactNumber = form.contactNumber.value;
    const name = form.name.value;
    let image = form.photo.files[0];
    if (TypeOfImage.includes(image?.name?.split(".")?.pop()?.toLowerCase())) {
      image = await GenerateImage(image);
    } else {
      image = profile?.data?.image;
    }

    const updateInfo = {
      displayName: name,
      photoURL: user?.photoURL,
    };
    if (updateInfo) {
      updateUser(updateInfo)
        .then(() => {
          PutAction(
            `${process.env.REACT_APP_SERVER_API}/api/v1/updateUserProfile/${profile?.data?._id}`,
            {
              address,
              contactNumber,
              image,
            },
            refetch
          );
          refetch();
        })
        .catch((error) => {
          toast.error(error?.message);
        });
    } else {
      toast.error("Some Isssues Are There ");
    }
  };

  return (
    <>
      {!isLoading && (
        <>
          <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            <div className="flex items-center space-x-6">
              <div>
                <div className="avatar flex justify-center">
                  <div className="w-36 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                    <img
                      src={
                        profile.data.image ||
                        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzF32lbq4BoRPJ3bZ4FrQiFe9uhw5tRZBqxzt7G00uhbmqTW3f-PeYpIMOUzFCsYpuOMI&usqp=CAU"
                      }
                      alt={`${profile.data._id}`}
                    />
                  </div>
                </div>
              </div>
              <div>
                <h1 className="text-3xl font-serif text-gray-800">
                  {user?.displayName}
                </h1>
                <p className="text-gray-600">
                  Contract Number{profile.data.contactNumber}
                </p>

                <p className="text-gray-600">Address: {profile.data.address}</p>
              </div>
            </div>
          </div>

          {deviceInfo && (
            <div className=" grid lg:grid-cols-2 sm:grid-cols-1 bg-white border border-gray-200 shadow sm:p-8  dark:bg-blue-500 dark:border-gray-700">
              <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
                    User Information
                  </h5>
                  <a
                    href="#"
                    className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
                  >
                    View all
                  </a>
                </div>
                <div className="flow-root">
                  <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                    <li className="py-3 sm:py-4">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <GrDevice className="text-xl bg-green-400 rounded" />
                        </div>
                        <div className="flex-1 min-w-0 ms-4">
                          <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                            <strong>Device Name:</strong>
                          </p>
                        </div>
                        <div className="inline-flex items-center text-base font-semibold dark:text-white">
                          {deviceInfo.device.brand || "common"}
                          {deviceInfo.device.model || 5100}
                        </div>
                      </div>
                    </li>
                    <li className="py-3 sm:py-4">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <MdOutlineSettingsSystemDaydream className="text-xl bg-green-500" />
                        </div>
                        <div className="flex-1 min-w-0 ms-4">
                          <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                            <strong>OS:</strong>
                          </p>
                        </div>
                        <div className="inline-flex items-center text-base font-semibold dark:text-white">
                          {deviceInfo.os.name} {deviceInfo.os.version}
                        </div>
                      </div>
                    </li>
                    <li className="py-3 sm:py-4">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <BsBrowserChrome className="text-xl bg-orange-600 rounded" />
                        </div>
                        <div className="flex-1 min-w-0 ms-4">
                          <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                            <strong>Browser:</strong>
                          </p>
                        </div>
                        <div className="inline-flex items-center text-base font-semibold dark:text-white">
                          {deviceInfo.client.name} {deviceInfo.client.version}
                        </div>
                      </div>
                    </li>
                    <li className="py-3 sm:py-4">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <MdOutlineSignalWifiStatusbar4Bar className="text-xl bg-white rounded" />
                        </div>
                        <div className="flex-1 min-w-0 ms-4">
                          <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                            <strong>Active</strong>
                          </p>
                        </div>
                        <div className="inline-flex items-center text-base font-semibold dark:text-white">
                          {navigator.onLine ? (
                            <p className="btn btn-success btn-sm">
                              <MdOutlineSignalWifiStatusbarNull className="text-xl bg-white rounded" />{" "}
                              Active
                            </p>
                          ) : (
                            <p className="btn btn-error btn-sm">
                              <MdSignalWifiStatusbarConnectedNoInternet className="text-xl bg-red-900 rounded" />
                              In-Active
                            </p>
                          )}
                        </div>
                      </div>
                    </li>
                    <li className="py-3 sm:py-4">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <PiTrainRegionalThin className="text-xl rounded bg-white" />
                        </div>
                        <div className="flex-1 min-w-0 ms-4">
                          <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                            <strong>Continent:</strong>
                          </p>
                        </div>
                        <div className="inline-flex items-center text-base font-semibold dark:text-white">
                          {userTimeZone}
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <PiTrainRegionalThin className="text-xl rounded bg-white" />
                        </div>
                        <div className="flex-1 min-w-0 ms-4">
                          <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                            <strong>District Name:</strong>
                          </p>
                        </div>
                        <div className="inline-flex items-center text-base font-semibold dark:text-white">
                          {districtName}
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="  py-6 flex flex-col justify-center sm:py-12">
                <div className="relative py-3 sm:max-w-xl sm:mx-auto">
                  <div className="">
                    <div className="max-w-md mx-auto">
                      <div>
                        <h1 className="text-2xl font-serif">Update Profile</h1>
                      </div>
                      <div className="divide-y divide-gray-200">
                        <form
                          onSubmit={handelProfileSubmit}
                          className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7"
                        >
                          <div className="relative">
                            <input
                              autoComplete="off"
                              id="email"
                              name="email"
                              defaultValue={user?.email}
                              type="text"
                              className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                              placeholder="Email address"
                              readOnly
                            />
                            <label
                              htmlFor="email"
                              className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                            >
                              Email Address
                            </label>
                          </div>
                          <div className="relative">
                            <input
                              autoComplete="off"
                              id="name"
                              name="name"
                              defaultValue={user?.displayName}
                              type="text"
                              className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                              placeholder="Password"
                            />
                            <label
                              htmlFor="name"
                              className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                            >
                              Name
                            </label>
                          </div>
                          <div className="relative">
                            <input
                              autoComplete="off"
                              id="contactNumber"
                              name="contactNumber"
                              type="text"
                              defaultValue={profile.data.contactNumber}
                              className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                              placeholder="specialty"
                            />
                            <label
                              htmlFor="role"
                              className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                            >
                              Contact Number
                            </label>
                          </div>
                          <div className="relative">
                            <input
                              autoComplete="off"
                              id="address"
                              name="address"
                              type="text"
                              defaultValue={profile.data.address}
                              className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                              placeholder="address"
                            />
                            <label
                              htmlFor="createdAt"
                              className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                            >
                              Address
                            </label>
                          </div>

                          <div className="relative">
                            <div className="flex justify-center">
                              <label className="block">
                                <span className="sr-only">
                                  Choose profile photo
                                </span>
                                <input
                                  type="file"
                                  name="photo"
                                  className="block w-full text-sm text-slate-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-full file:border-0
                  file:text-sm file:font-semibold
                  file:bg-violet-50 file:text-violet-700
                  hover:file:bg-violet-100"
                                />
                              </label>
                            </div>
                          </div>

                          <div className="relative">
                            <button
                              type="submit"
                              className="bg-blue-500 text-white rounded-md px-2 py-1"
                            >
                              Update
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default MyProfileInfo;
