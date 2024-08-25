import { useQuery } from "@tanstack/react-query";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import Loading from "../Pages/Shared/Loading/Loading";
import DisplayError from "../Pages/Shared/DisplayError/DisplayError";
import { TypeOfImage, UplodeFileType } from "../utilites/TypesOfImages";
import GenerateImage from "../commonAction/GenerateImage";
import GenerateFile from "../commonAction/GenerateFile";
import PutAction from "../commonAction/PutAction";

const UpdatePatientProfile = () => {
  const { id } = useParams();

  const {
    data: updateprofile = {},
    refetch,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["updateprofile", id],
    queryFn: async () => {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_SERVER_API}/api/v1/update_patient_profile/${id}`,
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

  const [formData, setFormData] = useState({
    contactNumber: "",
    address: "",
    dateOfBirth: "",
    gender: "male",
    bloodGroup: "",
    maritalStatus: "UNMARRIED",
    height: "",
    weight: "",
    hasAllergies: false,
    hasDiabetes: false,
    smokingStatus: false,
    dietaryPreferences: "",
    pregnancyStatus: false,
    recentAnxiety: false,
    hasPastSurgeries: false,
    recentDepression: false,
    image: null,
    mentalHealthHistory: null,
  });

  useEffect(() => {
    if (updateprofile.data) {
      setFormData(updateprofile.data);
    }
  }, [updateprofile]);

  if (isLoading) {
    return <Loading />;
  }
  if (error) {
    return <DisplayError />;
  }

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData({
      ...formData,
      [name]:
        type === "checkbox" ? checked : type === "file" ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData?.image && formData?.image?.name) {
      if (
        TypeOfImage.includes(formData.image.name.split(".").pop().toLowerCase())
      ) {
        const image = await GenerateImage(formData.image);
        formData.image = image;
      }
    }

    if (formData?.mentalHealthHistory && formData?.mentalHealthHistory?.name) {
      if (
        UplodeFileType.includes(
          formData.mentalHealthHistory.name.split(".").pop().toLowerCase()
        )
      ) {
        const fileUrl = await GenerateFile(formData.mentalHealthHistory);
        formData.mentalHealthHistory = fileUrl;
      }
    }

    // PostAction(
    //   formData,
    //   `${process.env.REACT_APP_SERVER_API}/patient/createpatient`
    // );

    if (formData) {
      PutAction(
        `${process.env.REACT_APP_SERVER_API}/api/v1/update_patient_profile_info/${id}`,
        formData,
        refetch
      );
    } else {
      toast.error("Some Isuues Are There in Form Data");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-full mx-auto p-4">
      <div className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-2">
        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">Contact Number</span>
          </label>
          <input
            type="text"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
            className="input input-bordered"
          />
        </div>

        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">Address</span>
          </label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="input input-bordered"
          />
        </div>
      </div>

      <div className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-2">
        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">Date of Birth</span>
          </label>
          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            className="input input-bordered"
          />
        </div>

        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">Gender</span>
          </label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="select select-bordered"
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-2">
        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">Blood Group</span>
          </label>
          <input
            type="text"
            name="bloodGroup"
            value={formData.bloodGroup}
            onChange={handleChange}
            className="input input-bordered"
          />
        </div>

        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">Marital Status</span>
          </label>
          <select
            name="maritalStatus"
            value={formData.maritalStatus}
            onChange={handleChange}
            className="select select-bordered"
          >
            <option value="UNMARRIED">UNMARRIED</option>
            <option value="MARRIED">MARRIED</option>
          </select>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-2">
        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">Height</span>
          </label>
          <input
            type="text"
            name="height"
            value={formData.height}
            onChange={handleChange}
            className="input input-bordered"
          />
        </div>

        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">Weight</span>
          </label>
          <input
            type="text"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            className="input input-bordered"
          />
        </div>
      </div>

      <div className="grid lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-1 gap-2">
        <div className="form-control mb-4">
          <label className="cursor-pointer label">
            <span className="label-text">Has Allergies</span>
            <input
              type="checkbox"
              name="hasAllergies"
              checked={formData.hasAllergies}
              onChange={handleChange}
              className="checkbox checkbox-primary"
            />
          </label>
        </div>

        <div className="form-control mb-4">
          <label className="cursor-pointer label">
            <span className="label-text">Has Diabetes</span>
            <input
              type="checkbox"
              name="hasDiabetes"
              checked={formData.hasDiabetes}
              onChange={handleChange}
              className="checkbox checkbox-primary"
            />
          </label>
        </div>

        <div className="form-control mb-4">
          <label className="cursor-pointer label">
            <span className="label-text">Smoking Status</span>
            <input
              type="checkbox"
              name="smokingStatus"
              checked={formData.smokingStatus}
              onChange={handleChange}
              className="checkbox checkbox-primary"
            />
          </label>
        </div>
      </div>

      <div className="grid lg:grid-cols-1 md:grid-cols-1 sm:grid-cols-1 gap-2">
        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">Dietary Preferences</span>
          </label>
          <input
            type="text"
            name="dietaryPreferences"
            value={formData.dietaryPreferences}
            onChange={handleChange}
            className="input input-bordered"
          />
        </div>
      </div>

      <div className="grid lg:grid-cols-4 md:grid-cols-4 sm:grid-cols-1 gap-2">
        <div className="form-control mb-4">
          <label className="cursor-pointer label">
            <span className="label-text">Pregnancy Status</span>
            <input
              type="checkbox"
              name="pregnancyStatus"
              checked={formData.pregnancyStatus}
              onChange={handleChange}
              className="checkbox checkbox-primary"
            />
          </label>
        </div>

        <div className="form-control mb-4">
          <label className="cursor-pointer label">
            <span className="label-text">Recent Anxiety</span>
            <input
              type="checkbox"
              name="recentAnxiety"
              checked={formData.recentAnxiety}
              onChange={handleChange}
              className="checkbox checkbox-primary"
            />
          </label>
        </div>
        <div className="form-control mb-4">
          <label className="cursor-pointer label">
            <span className="label-text">Past Surgeries</span>
            <input
              type="checkbox"
              name="hasPastSurgeries"
              checked={formData.hasPastSurgeries}
              onChange={handleChange}
              className="checkbox checkbox-primary"
            />
          </label>
        </div>

        <div className="form-control mb-4">
          <label className="cursor-pointer label">
            <span className="label-text">Recent Depression</span>
            <input
              type="checkbox"
              name="recentDepression"
              checked={formData.recentDepression}
              onChange={handleChange}
              className="checkbox checkbox-primary"
            />
          </label>
        </div>
      </div>
      <div className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-2">
        <div className="relative mb-4">
          <div className="flex justify-center">
            <label className="block">
              <span className="text-xl font-serif m-2">
                Choose profile photo
              </span>
              <input
                type="file"
                name="image"
                onChange={handleChange}
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
        <div className="relative mb-4">
          <div className="flex justify-center">
            <label className="block">
              <span className="text-xl font-serif m-2">
                Upload Medical History Pdf File
              </span>
              <input
                type="file"
                name="mentalHealthHistory"
                onChange={handleChange}
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
      </div>

      <button type="submit" className="btn btn-primary w-full">
        Submit
      </button>
    </form>
  );
};

export default UpdatePatientProfile;
