import { useQuery } from "@tanstack/react-query";
import React, { useContext, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Loading from "../../Shared/Loading/Loading";
import { AuthContext } from "../../../contexts/AuthProvider";
import { FiTrash } from "react-icons/fi";
import AllDistrict from "../../../utility/District";
const AddDoctor = () => {
  const { createUser, updateUser, EmailVarification, logOut } =
    useContext(AuthContext);
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm();
  const [signUpError, setSignUPError] = useState("");
  const imageHostKey = process.env.REACT_APP_imgbb_key;

  const {
    fields: skillFields,
    append: skillAppend,
    remove: skillRemove,
  } = useFieldArray({ control, name: "qualification" });

  const { data: specialties, isLoading } = useQuery({
    queryKey: ["specialty"],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.REACT_APP_SERVER_API}/appointmentSpecialty`
      );
      const data = await res.json();
      return data;
    },
  });

  const handleAddDoctor = (data) => {
    const image = data.image[0];
    const formData = new FormData();
    formData.append("image", image);
    const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`;
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imgData) => {
        if (imgData.success) {
          data.image = imgData.data.url;
          data.experience = Number(data.experience);
          data.appointmentfee = Number(data.appointmentfee);
          setSignUPError("");
          createUser(data.email, data.password)
            .then((result) => {
              const user = result.user;
              const userInfo = {
                displayName: data.name,
                photoURL: "doctor",
              };
              updateUser(userInfo)
                .then(() => {
                  if (!!user) {
                    EmailVarification();
                    saveUser({ ...data, specialist: [] });
                  }
                })
                .catch((err) => toast.error(err?.message));
            })
            .catch((error) => {
              setSignUPError(error.message);
            });
        }
      });
    reset();
  };

  const saveUser = (doctor) => {
    fetch(`${process.env.REACT_APP_SERVER_API}/doctors`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify(doctor),
    })
      .then((res) => res.json())
      .then((result) => {
        if (!!result) {
          toast.success(`${doctor.name} is added successfully`);
          logOut()
            .then(() => {
              localStorage.setItem("accessToken", null);
            })
            .catch((err) => console.log(err));
        }
      })
      .catch((error) => {
        toast.error(error?.message);
      });
  };

  if (isLoading) {
    return <Loading></Loading>;
  }

  // https://verify.bmdc.org.bd/
  return (
    <>
      <h1 className="text-3xl text-center font-serif m-3">Add To Doctor</h1>
      <div className="w-full flex justify-center items-center rounded-md  px-4 py-2 md:w-full  lg:w-full bg-[url()]">
        <form onSubmit={handleSubmit(handleAddDoctor)}>
          <div className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-4">
            <div className="form-control w-full max-w-full">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                {...register("name", {
                  required: "Name is Required",
                })}
                className="input input-bordered w-full max-w-full"
                required
              />
              {errors.name && (
                <p className="text-red-500">{errors.name.message}</p>
              )}
            </div>
            <div className="form-control w-full max-w-full">
              <label className="label">
                {" "}
                <span className="label-text">Medical College</span>
              </label>
              <input
                type="text"
                {...register("medicalCollege", {
                  required: "medicalCollege is Required",
                })}
                className="input input-bordered w-full max-w-full"
                required
              />
              {errors.medicalCollege && (
                <p className="text-red-500">{errors.medicalCollege.message}</p>
              )}
            </div>
          </div>

          <div className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-4">
            <div className="form-control w-full max-w-full">
              <label className="label">
                {" "}
                <span className="label-text">Specialty</span>
              </label>
              <select
                {...register("specialty")}
                className="select input-bordered w-full max-w-full"
                required
              >
                {specialties.map((specialty) => (
                  <option key={specialty._id} value={specialty.name}>
                    {specialty.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-control w-full max-w-full">
              <label className="label">
                {" "}
                <span className="label-text">Photo</span>
              </label>
              <input
                type="file"
                {...register("image", {
                  required: "Photo is Required",
                })}
                className="input input-bordered w-full max-w-full"
                required
              />
              {errors.img && (
                <p className="text-red-500">{errors.img.message}</p>
              )}
            </div>
          </div>
          <div className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-4">
            <div className="form-control w-full max-w-xs">
              <label className="label">
                {" "}
                <span className="label-text">Email</span>
              </label>
              <input
                type="text"
                {...register("email", {
                  required: "Email Address is required",
                })}
                className="input input-bordered w-full max-w-xs"
                required
              />
              {errors.email && (
                <p className="text-red-600">{errors.email?.message}</p>
              )}
            </div>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                {" "}
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be 6 characters or longer",
                  },
                })}
                className="input input-bordered w-full max-w-xs"
                required
              />
              {errors.password && (
                <p className="text-red-600">{errors.password?.message}</p>
              )}
            </div>
          </div>

          <div className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-4">
            <div className="form-control w-full max-w-xs">
              <label className="label">
                {" "}
                <span className="label-text">Registered Doctor License</span>
              </label>
              <input
                type="text"
                {...register("registeredDoctor", {
                  required: "Registered Doctor is required",
                  minLength: {
                    value: 6,
                    message:
                      "registeredDoctor  must be 10 characters or longer",
                  },
                })}
                className="input input-bordered w-full max-w-xs"
                required
              />
              {errors.registeredDoctor && (
                <p className="text-red-600">
                  {errors?.registeredDoctor?.message}
                </p>
              )}
            </div>

            <div className="form-control w-full max-w-xs">
              <label className="label">
                {" "}
                <span className="label-text">Doctor Phone Number</span>
              </label>
              <input
                type="text"
                {...register("phoneNumber", {
                  required: "Phone Number is required",
                  minLength: {
                    value: 11,
                    message: " phone Number  must be 11 characters or longer",
                  },
                })}
                className="input input-bordered w-full max-w-xs"
                required
              />
              {errors.phoneNumber && (
                <p className="text-red-600">{errors?.phoneNumber?.message}</p>
              )}
            </div>
          </div>
          <div className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-4">
            <div className="form-control w-full max-w-full">
              <label className="label">
                {" "}
                <span className="label-text">Gender</span>
              </label>
              <select
                {...register("gender")}
                className="select input-bordered w-full max-w-full"
                required
              >
                <option value="Male">Male</option>
                <option value="Male">Female</option>
              </select>
              {errors.gender && (
                <p className="text-red-600">{errors?.gender?.message}</p>
              )}
            </div>

            <div className="form-control w-full max-w-xs">
              <label className="label">
                {" "}
                <span className="label-text">Experience</span>
              </label>
              <input
                type="number"
                {...register("experience", {
                  required: "Email Address is required",
                })}
                className="input input-bordered w-full max-w-xs"
                required
              />
              {errors.experience && (
                <p className="text-red-600">{errors?.experience?.message}</p>
              )}
            </div>
          </div>

          <div className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-4">
            <div className="form-control w-full max-w-xs">
              <label className="label">
                {" "}
                <span className="label-text">AppointmentFee</span>
              </label>
              <input
                type="number"
                {...register("appointmentfee", {
                  required: "AppointmentFee is required",
                })}
                className="input input-bordered w-full max-w-xs"
                required
              />
              {errors.appointmentfe && (
                <p className="text-red-600">
                  {errors?.appointmentfee?.message}
                </p>
              )}
            </div>

            <div className="form-control w-full max-w-xs">
              <label className="label">
                {" "}
                <span className="label-text">Current Working Place</span>
              </label>
              <input
                type="text"
                {...register("currentWorkingPlace", {
                  required: "Current Working Place is required",
                })}
                className="input input-bordered w-full max-w-xs"
                required
              />
              {errors.currentWorkingPlace && (
                <p className="text-red-600">
                  {errors?.currentWorkingPlace?.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-4">
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Designation</span>
              </label>
              <input
                type="text"
                {...register("designation", {
                  required: "Designation is required",
                })}
                className="input input-bordered w-full max-w-xs"
                required
              />
              {errors.designation && (
                <p className="text-red-600">{errors?.designation?.message}</p>
              )}
            </div>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Chamber Address</span>
              </label>
              <input
                type="text"
                {...register("chamber", {
                  required: "Chamber is required",
                })}
                maxLength={50}
                className="input input-bordered w-full max-w-xs"
                required
              />
              {errors.designation && (
                <p className="text-red-600">{errors?.chamber?.message}</p>
              )}
            </div>
          </div>
          <div className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-4">
            <div className="form-control w-full max-w-full">
              <label className="label">
                <span className="label-text">District Name </span>
              </label>
              <select
                {...register("district")}
                className="select input-bordered w-full max-w-full"
                required
              >
                {AllDistrict.map((district) => (
                  <option key={district.id} value={district.district_name}>
                    {district.district_name} | {district.bn_name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <div className="form-control w-full max-w-full">
              <label className="mb-2">Qualification</label>

              <div className="grid lg:grid-cols-1">
                {skillFields.map((item, index) => {
                  return (
                    <div
                      key={item.key}
                      className="flex items-center gap-3 mb-5"
                    >
                      <input
                        type="text"
                        {...register(`qualification[${index}]`)}
                        className="input input-bordered w-full rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => skillRemove(index)}
                        className="grid place-items-center rounded-full flex-shrink-0 bg-red-500/20 border border-red-500 h-11 w-11 group transition-all hover:bg-red-500"
                      >
                        <FiTrash
                          className="text-red-500 group-hover:text-white transition-all"
                          size="20"
                        />
                      </button>
                    </div>
                  );
                })}
              </div>
              <div>
                <button
                  type="button"
                  onClick={() => skillAppend("")}
                  className="btn btn-outline btn-sm"
                >
                  Add Skill
                </button>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <input
              className="btn btn-accent  btn-sm m-3"
              value="Add Doctor"
              type="submit"
            />
          </div>
          {signUpError && <p className="text-red-600">{signUpError}</p>}
        </form>
      </div>
    </>
  );
};

/**
 * Three places to store images
 * 1. Third party image hosting server
 * 2. File system of your server
 * 3. mongodb (database)
 */

export default AddDoctor;
