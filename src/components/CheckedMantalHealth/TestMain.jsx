import React from "react";
import { Link } from "react-router-dom";

const TestMain = () => {
  return (
    <div className="min-h-screen py-12 mb-1">
      <section>
        <h2 className="text-4xl font-extrabold text-center font-serif">
          Select Your Test
        </h2>
        {/* <p className="text-center text-yellow-500 text-md">Screening of Patient Health Questionnaire (PHQ-9).</p> */}
        <div className="content-center lg:flex lg:justify-center lg:items-center">
          <Link
            to="/aIAssistant"
            className="flex justify-center pt-10 m-auto lg:w-1/4 lg:mx-6 lg:my-8"
          >
            <div className="relative w-64 h-48">
              <div className="absolute top-0 left-0 flex items-center w-64 h-40 mt-6 ml-6 bg-white border-8 border-gray-700 border-solid rounded-lg">
                <div className="w-1/3 h-40"></div>
                <div className="w-2/3 h-32 pr-4">
                  <h3 className="pt-1 text-xl font-semibold text-gray-700">
                    AI Solution
                  </h3>
                  <p className="pt-1 text-sm text-gray-600">
                    Give an free AI test to check if you have any problem.
                  </p>
                </div>
              </div>
              <div className="absolute top-0 left-0 z-20 w-12 h-12 mt-6 ml-6 bg-white rounded-full">
                <svg
                  className="mt-2 ml-2"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="#E02424"
                  width="32px"
                  height="32px"
                >
                  <path d="M0 0h24v24H0V0z" fill="none" />
                  <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z" />
                </svg>
              </div>
              <div className="absolute top-0 left-0 z-10 w-24 h-40 py-20 text-5xl font-bold text-center text-white bg-red-600 rounded-lg">
                01
              </div>
              <div className="absolute top-0 left-0 z-30 w-24 h-2 mt-40 ml-48 bg-red-600"></div>
            </div>
          </Link>
          <Link
            to="/dashboard/suicidal"
            className="flex justify-center pt-10 m-auto lg:w-1/4 lg:mx-6 lg:my-8"
          >
            <div className="relative w-64 h-48">
              <div className="absolute top-0 left-0 flex items-center w-64 h-40 mt-6 ml-6 bg-white border-8 border-gray-700 border-solid rounded-lg">
                <div className="w-1/3 h-40"></div>
                <div className="w-2/3 h-32 pr-4">
                  <h3 className="pt-1 text-xl font-semibold text-gray-700">
                    Suicidal Test
                  </h3>
                  <p className="pt-1 text-sm text-gray-600">
                    If you want Checked Your Suicidal Test is Existed Or Not
                  </p>
                </div>
              </div>
              <div className="absolute top-0 left-0 z-20 w-12 h-12 mt-6 ml-6 bg-white rounded-full">
                <svg
                  className="mt-2 ml-2"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="#057A55"
                  width="32px"
                  height="32px"
                >
                  <path d="M0 0h24v24H0z" fill="none" />
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
                </svg>
              </div>
              <div className="absolute top-0 left-0 z-10 w-24 h-40 py-20 text-5xl font-bold text-center text-white bg-green-600 rounded-lg">
                02
              </div>
              <div className="absolute top-0 left-0 z-30 w-24 h-2 mt-40 ml-48 bg-green-600"></div>
            </div>
          </Link>
          <Link
            to="/dashboard/depression"
            className="flex justify-center pt-10 m-auto lg:w-1/4 lg:mx-6 lg:my-8"
          >
            <div className="relative w-64 h-48">
              <div className="absolute top-0 left-0 flex items-center w-64 h-40 mt-6 ml-6 bg-white border-8 border-gray-700 border-solid rounded-lg">
                <div className="w-1/3 h-40"></div>
                <div className="w-2/3 h-32 pr-4">
                  <h3 className="pt-1 text-xl font-semibold text-gray-700">
                    Counseling
                  </h3>
                  <p className="pt-1 text-sm text-gray-600">
                    If you want discuss with Agronomist, please book Appointment
                    for counseling.
                  </p>
                </div>
              </div>
              <div className="absolute top-0 left-0 z-20 w-12 h-12 mt-6 ml-6 bg-white rounded-full">
                <svg
                  className="mt-2 ml-2"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="#1C64F2"
                  width="32px"
                  height="32px"
                >
                  <path d="M0 0h24v24H0z" fill="none" />
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
                </svg>
              </div>
              <div className="absolute top-0 left-0 z-10 w-24 h-40 py-20 text-5xl font-bold text-center text-white bg-blue-600 rounded-lg">
                03
              </div>
              <div className="absolute top-0 left-0 z-30 w-24 h-2 mt-40 ml-48 bg-blue-600"></div>
            </div>
          </Link>
        </div>
        <div className="content-center lg:flex lg:justify-center lg:items-center">
          <Link
            to="/dashboard/anxiety"
            className="flex justify-center pt-10 m-auto lg:w-1/4 lg:mx-6 lg:my-8"
          >
            <div className="relative w-64 h-48">
              <div className="absolute top-0 left-0 flex items-center w-64 h-40 mt-6 ml-6 bg-white border-8 border-gray-700 border-solid rounded-lg">
                <div className="w-1/3 h-40"></div>
                <div className="w-2/3 h-32 pr-4">
                  <h3 className="pt-1 text-xl font-semibold text-gray-700">
                    Predicted Planing
                  </h3>
                  <p className="pt-1 text-sm text-gray-600">
                    Planing for seeds and pestiside.
                  </p>
                </div>
              </div>
              <div className="absolute top-0 left-0 z-20 w-12 h-12 mt-6 ml-6 bg-white rounded-full">
                <svg
                  className="mt-2 ml-2"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="#7E3AF2"
                  width="32px"
                  height="32px"
                >
                  <path d="M0 0h24v24H0z" fill="none" />
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
                </svg>
              </div>
              <div className="absolute top-0 left-0 z-10 w-24 h-40 py-20 text-5xl font-bold text-center text-white bg-purple-600 rounded-lg">
                04
              </div>
              <div className="absolute top-0 left-0 z-30 w-24 h-2 mt-40 ml-48 bg-purple-600"></div>
            </div>
          </Link>
          <Link
            to="/dashboard/bipolar"
            className="flex justify-center pt-10 m-auto lg:w-1/4 lg:mx-6 lg:my-8"
          >
            <div className="relative w-64 h-48">
              <div className="absolute top-0 left-0 flex items-center w-64 h-40 mt-6 ml-6 bg-white border-8 border-gray-700 border-solid rounded-lg">
                <div className="w-1/3 h-40"></div>
                <div className="w-2/3 h-32 pr-4">
                  <h3 className="pt-1 text-xl font-semibold text-gray-700">
                    Identify plant{" "}
                  </h3>
                  <p className="pt-1 text-sm text-gray-600">
                    The Bipolar Test is for people experiencing mood swings.
                  </p>
                </div>
              </div>
              <div className="absolute top-0 left-0 z-20 w-12 h-12 mt-6 ml-6 bg-white rounded-full">
                <svg
                  className="mt-2 ml-2"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="#C026D3"
                  width="32px"
                  height="32px"
                >
                  <path d="M0 0h24v24H0z" fill="none" />
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
                </svg>
              </div>
              <div className="absolute top-0 left-0 z-10 w-24 h-40 py-20 text-5xl font-bold text-center text-white bg-fuchsia-600 rounded-lg">
                05
              </div>
              <div className="absolute top-0 left-0 z-30 w-24 h-2 mt-40 ml-48 bg-fuchsia-600"></div>
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default TestMain;
