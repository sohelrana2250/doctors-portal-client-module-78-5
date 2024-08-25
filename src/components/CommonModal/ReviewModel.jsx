import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import PostAction from "../../commonAction/PostAction";
import toast from "react-hot-toast";
// https://care-pulse-server.vercel.app/
const ReviewModel = () => {
  const { id, appointmentId } = useParams();
  const navigate = useNavigate();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    if (data && id && appointmentId) {
      data.rating = Number(data.rating);
      PostAction(
        { ...data, doctorId: id, appointmentId },
        `${process.env.REACT_APP_SERVER_API}/api/v1/review`
      );
      reset();
      navigate("/dashboard/video_call");
    } else {
      toast.error("Some Isuues Are There ");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md  bg-gradient-to-b from-gray-800 to-black w-full  p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-6 text-white text-center">
          Leave a Review
        </h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label
              htmlFor="rating"
              className="block text-sm font-medium text-white mb-1"
            >
              Rating
            </label>
            <input
              type="number"
              id="rating"
              className="input input-bordered w-full "
              {...register("rating", {
                required: "Rating is required",
                min: { value: 0, message: "Minimum rating is 0" },
                max: { value: 5, message: "Maximum rating is 5" },
              })}
            />
            {errors.rating && (
              <p className="text-red-500 text-sm mt-1">
                {errors.rating.message}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="comment"
              className="block text-sm font-medium text-white mb-1"
            >
              Comment
            </label>
            <textarea
              id="comment"
              className="textarea textarea-bordered w-full"
              {...register("comment", {
                required: "Comment is required",
                maxLength: {
                  value: 500,
                  message: "Comment cannot exceed 500 characters",
                },
              })}
            ></textarea>
            {errors.comment && (
              <p className="text-red-500 text-sm mt-1">
                {errors.comment.message}
              </p>
            )}
          </div>

          <button type="submit" className="btn btn-primary w-full">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReviewModel;
