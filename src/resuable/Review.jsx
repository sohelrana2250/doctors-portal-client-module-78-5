import { useQuery } from "@tanstack/react-query";
import React, { useContext, useState } from "react";
import Loading from "../Pages/Shared/Loading/Loading";
import DisplayError from "../Pages/Shared/DisplayError/DisplayError";
import toast from "react-hot-toast";
import { AiFillDelete } from "react-icons/ai";
import DeleteAction from "../commonAction/DeleteAction";
import { AuthContext } from "../contexts/AuthProvider";

const Review = () => {
  const { user } = useContext(AuthContext);
  const [search, setSearchTerm] = useState("");
  const {
    data: review = [],
    refetch,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["review"],
    queryFn: async () => {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_SERVER_API}/api/v1/all_my_review`,
          {
            headers: {
              authorization: `bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await res.json();
        return data;
      } catch (error) {
        toast.error(error?.message || "An error occurred");
        return [];
      }
    },
  });

  if (isLoading) {
    return <Loading />;
  }
  if (error) {
    return <DisplayError />;
  }

  const onDelete = (id) => {
    if (id) {
      DeleteAction(
        `${process.env.REACT_APP_SERVER_API}/api/v1/delete_review/${id}`,
        refetch
      );
    }
  };

  // Helper function to get the average rating for a doctor
  const getAverageRating = (doctorEmail) => {
    const doctorRating = review?.avg?.find(
      (rating) => rating._id === doctorEmail
    );
    return doctorRating ? doctorRating.averageRating : "No rating available";
  };

  // Convert search term to lowercase for case-insensitive matching
  const searchLower = search.toLowerCase();

  // Filtered reviews based on search term
  const filteredReviews = review?.data?.filter((review) => {
    return (
      review?.comment.toLowerCase().includes(searchLower) ||
      review?.email.toLowerCase().includes(searchLower) ||
      review?.doctoremail.toLowerCase().includes(searchLower)
    );
  });

  return (
    <>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-serif text-center mb-4 bg-blue-900 rounded text-white ml-16 mr-16">
          My Review Section
        </h1>
        {/* search bar  */}
        <div className="flex items-center justify-center mb-8 m-3">
          <input
            type="search"
            id="default-search"
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full p-4 pl-10 text-sm text-white border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-slate-900 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search by comment,  Patients mail, or doctor's email"
            required
          />
        </div>
        {review?.data?.length === 0 && (
          <img
            className="w-full h-full"
            src="https://via.placeholder.com/150"
            alt="Not Available"
          />
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredReviews.map((review) => (
            <div
              className="card w-full bg-gradient-to-b from-sky-800 to-black text-white shadow-xl m-4"
              key={review._id}
            >
              <div className="card-body">
                <h2 className="card-title">{review.comment}</h2>
                <p>Rating: {review.rating}</p>
                <p>Doctor: {review.doctoremail}</p>
                <p>Average Rating: {getAverageRating(review.doctoremail)}</p>
                <p>Patient: {review.email}</p>
                <p>Appointment Id: {review.appointmentId}</p>
                <p>Date: {new Date(review.createAt).toLocaleDateString()}</p>
                {user?.photoURL === "user" && (
                  <div className="card-actions justify-end">
                    <button
                      className="btn btn-error btn-outline btn-sm"
                      onClick={() => onDelete(review._id)}
                    >
                      <AiFillDelete className="mr-2" /> Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Review;
