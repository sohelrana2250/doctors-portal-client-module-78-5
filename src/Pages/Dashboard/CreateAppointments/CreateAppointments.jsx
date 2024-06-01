import React from "react";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { Sloats } from "../../../utilites/Sloats";
import PostAction from "../../../commonAction/PostAction";

const CreateAppointments = () => {
  const {
    data: allcategorie = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["allcategorie"],
    queryFn: async () => {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_SERVER_API}/all_teatment_categorie`,
          {
            method: "GET",
            headers: {
              authorization: `bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await res.json();

        if (data && data.data) {
          return data.data; // Assuming data.data contains the categories
        } else {
          throw new Error("Data structure from API is invalid");
        }
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
    return <div>Error fetching data</div>;
  }

  const handeCreateAppointment = (event) => {
    event.preventDefault();
    const element = event.target;
    const name = element.name.value;
    const price = element.price.value;
    const slots = Sloats;
    const data = {
      name,
      price,
      slots,
    };
    if (!data) {
      toast.error("Empty Sloat , Input the Value");
    }
    PostAction(
      data,
      `${process.env.REACT_APP_SERVER_API}/create_appointment_sloat`
    );
    element.reset();
  };

  return (
    <>
      <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
        <div className="relative py-3 sm:max-w-xl sm:mx-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
          <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
            <div className="max-w-md mx-auto">
              <div>
                <h1 className="text-2xl font-serif">
                  Create Medical Appointment
                </h1>
              </div>
              <div className="divide-y divide-gray-200">
                <form
                  onSubmit={handeCreateAppointment}
                  className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7"
                >
                  <div className="relative">
                    <input
                      autocomplete="off"
                      id="price"
                      name="price"
                      type="number"
                      required
                      className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                      placeholder="Email address"
                    />
                    <label
                      htmlFor="email"
                      className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                      Price
                    </label>
                  </div>
                  {/* jdhkjahsf */}
                  <div className="form-control w-full max-w-full">
                    <label className="label">
                      <span className="label-text">Select Specialty</span>
                    </label>
                    <select
                      name="name"
                      id="name"
                      required
                      className="select select-bordered"
                    >
                      {allcategorie?.map((specialty, index) => (
                        <option key={index} value={specialty}>
                          {specialty}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="relative">
                    <button className="bg-blue-500 text-white rounded-md px-2 py-1">
                      CREATE
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateAppointments;
