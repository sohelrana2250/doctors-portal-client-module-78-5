import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthProvider";
import useToken from "../../hooks/useToken";
import toast from "react-hot-toast";

const Login = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const { signIn } = useContext(AuthContext);
  const [loginError, setLoginError] = useState("");
  const [loginUserEmail, setLoginUserEmail] = useState("");
  const [token] = useToken(loginUserEmail);
  const location = useLocation();
  const navigate = useNavigate();
  if (token) {
    const from = location.state?.from?.pathname || "/";
    navigate(from, { replace: true });
  }

  const handleLogin = (data) => {
    setLoginError("");
    signIn(data.email, data.password)
      .then((result) => {
        const user = result.user;
        // console.log(user);
        //user?.emailVerified

        if (user?.emailVerified) {
          setLoginUserEmail(data.email);
        } else {
          toast.error(`You Are Not Varified User`);
        }
      })
      .catch((error) => {
        setLoginError(error.message);
      });
  };

  return (
    <div className="h-[800px] flex justify-center items-center">
      <div className="w-96 p-7">
        <h2 className="text-xl text-center">Login</h2>
        <form onSubmit={handleSubmit(handleLogin)}>
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
            />
            <label className="label">
              {" "}
              <span className="label-text">Forget Password?</span>
            </label>
            {errors.password && (
              <p className="text-red-600">{errors.password?.message}</p>
            )}
          </div>
          <input
            className="btn btn-accent w-full"
            value="Login"
            type="submit"
          />
          <div>
            {loginError && <p className="text-red-600">{loginError}</p>}
          </div>
        </form>
        <p className="underline">
          New to Doctors Portal
          <Link className="text-secondary" to="/signup">
            Create new Account
          </Link>
        </p>
        <p className="underline">
          Forgot Password System ,
          <Link to="/forgot_password_care_pulse" className="text-secondary">
            Forget Password
          </Link>
        </p>

        {/* The button to open modal */}
        <label
          htmlFor="my_modal_6"
          className="text-xl btn-outline font-serif btn w-full mt-2"
        >
          Account Credentials
        </label>

        <div className="divider">OR</div>
        <button className="btn btn-outline w-full">CONTINUE WITH GOOGLE</button>
      </div>

      {/* Put this part before </body> tag */}
      <input type="checkbox" id="my_modal_6" className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="modal-box">
          <div>
            <h1 className="text-xl font-bold">Patient Account</h1>
            <p>
              <span className="font-bold">Email:</span>antordaury462@gmail.com
            </p>
            <p>
              <span className="font-bold">Password:</span>SP225715p**
            </p>
            <h1 className="text-xl font-bold">Admin Account</h1>
            <p>
              <span className="font-bold">Email:</span>amsr215019@gmail.com
            </p>
            <p>
              <span className="font-bold">Password:</span>SP225715p**
            </p>
            <h1 className="text-xl font-bold">Doctor Account</h1>
            <p>
              <span className="font-bold">Email:</span>
              salmansalman19347@gmail.com
            </p>
            <p>
              <span className="font-bold">Password:</span>123456
            </p>
          </div>
          <div className="modal-action">
            <label htmlFor="my_modal_6" className="btn">
              Close!
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
