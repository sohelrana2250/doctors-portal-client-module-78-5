import React, { useContext, useState } from "react";
import { AuthContext } from "../../../contexts/AuthProvider";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import DisplayError from "../DisplayError/DisplayError";

const ForgotPasswordInCarePules = () => {
  const { ResetPassword } = useContext(AuthContext);
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const onSubmit = (data) => {
    ResetPassword(data?.email)
      .then(() => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Checked Your Email",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/login");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setError(`error Code ${errorCode} and Error Message ${errorMessage}`);
      });
    reset();
  };

  return (
    <>
      <div
        className="w-full px-4 py-2 md:w-full  lg:w-full  "
        style={{ backgroundImage: `url("")` }}
      >
        {error && <DisplayError />}
        <div className="font-mono">
          <div className="container mx-auto">
            <div className="flex justify-center px-6 my-12">
              <div className="w-full xl:w-3/4 lg:w-11/12 flex">
                <div
                  className="w-full h-auto bg-gray-400 hidden lg:block lg:w-1/2 bg-cover rounded-l-lg"
                  style={{
                    backgroundImage: `url("https://img.freepik.com/free-vector/forgot-password-concept-illustration_114360-1123.jpg")`,
                    width: "45%",
                  }}
                ></div>

                <div className="w-full lg:w-1/2 bg-white p-5 rounded-lg lg:rounded-l-none">
                  <div className="px-8 mb-4 text-center">
                    <h3 className="pt-4 mb-2 text-2xl">
                      Forgot Your Password?
                    </h3>
                    <p className="mb-4 text-sm text-gray-700">
                      We get it, stuff happens. Just enter your email address
                      below and we'll send you a link to reset your password!
                    </p>
                  </div>
                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="px-8 pt-6 pb-8 mb-4 bg-white rounded"
                  >
                    <div className="mb-4">
                      <label
                        className="block mb-2 text-sm font-bold text-gray-700"
                        htmlFor="email"
                      >
                        Email
                      </label>
                      <input
                        className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        id="email"
                        type="email"
                        {...register("email")}
                        placeholder="Enter Email Address..."
                      />
                      {errors?.email && (
                        <p role="alert">{errors?.email?.message}</p>
                      )}
                    </div>

                    <div className="mb-4">
                      <label
                        className="block mb-2 text-sm font-bold text-gray-700"
                        htmlFor="name"
                      >
                        User Name
                      </label>
                      <input
                        className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        id="name"
                        type="text"
                        placeholder="Enter Your User Name "
                      />
                    </div>

                    <div className="mb-4">
                      <label
                        className="block mb-2 text-sm font-bold text-gray-700"
                        htmlFor="date"
                      >
                        Date
                      </label>
                      <input
                        className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        id="date"
                        type="text"
                        defaultValue={new Date().toString()}
                        placeholder=""
                        readOnly
                      />
                    </div>
                    <div className="mb-6 text-center">
                      <button
                        className="w-full px-4 py-2 font-bold text-white bg-red-500 rounded-full hover:bg-red-700 focus:outline-none focus:shadow-outline"
                        type="submit"
                      >
                        Reset Password
                      </button>
                    </div>
                    <hr className="mb-6 border-t" />
                    <div className="text-center">
                      <a
                        className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                        href="..."
                      >
                        Create an Account!
                      </a>
                    </div>
                    <div className="text-center">
                      <a
                        className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                        href="..."
                      >
                        Already have an account? Login!
                      </a>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPasswordInCarePules;
