import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../../Layout/DashboardLayout";
import Main from "../../Layout/Main";
import Appointment from "../../Pages/Appointment/Appointment/Appointment";
import AddDoctor from "../../Pages/Dashboard/AddDoctor/AddDoctor";
import AllUsers from "../../Pages/Dashboard/AllUsers/AllUsers";
import ManageDoctors from "../../Pages/Dashboard/ManageDoctors/ManageDoctors";
import MyAppointment from "../../Pages/Dashboard/MyAppointment/MyAppointment";
import Payment from "../../Pages/Dashboard/Payment/Payment";
import Home from "../../Pages/Home/Home/Home";
import Login from "../../Pages/Login/Login";
import DisplayError from "../../Pages/Shared/DisplayError/DisplayError";
import SignUp from "../../Pages/SignUp/SignUp";
import AdminRoute from "../AdminRoute/AdminRoute";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import CreateAppointments from "../../Pages/Dashboard/CreateAppointments/CreateAppointments";
import AllCareteApointment from "../../Pages/Dashboard/CreateAppointments/AllCareteApointment";
import MyProfile from "../../Pages/Dashboard/Dashboard/Doctor/MyProfile";
import BookingAppointment from "../../Pages/Dashboard/Dashboard/Patient/BookingAppointment";
import DoctorDetails from "../../Pages/Dashboard/Dashboard/Doctor/DoctorDetails";
import PatientInfo from "../../Pages/Dashboard/Dashboard/Patient/PatientInfo";
import PatientProfile from "../../Pages/Dashboard/Dashboard/Patient/PatientProfile";
import MyBookingAppointment from "../../Pages/Dashboard/Dashboard/Patient/MyBookingAppointment";
import VideoCall from "../../Pages/Dashboard/Dashboard/Patient/VideoCall";
import MyParientList from "../../Pages/Dashboard/Dashboard/Doctor/MyParientList";
import DoctorsVideoCall from "../../Pages/Dashboard/Dashboard/Doctor/DoctorsVideoCall";
import Prescription from "../../Pages/Dashboard/Dashboard/Doctor/Prescription";
import DoctorsPrescription from "../../Pages/Dashboard/Dashboard/Doctor/DoctorsPrescription";
import PatientPrescription from "../../Pages/Dashboard/Dashboard/Patient/PatientPrescription";
import AttenedVideoCall from "../../resuable/AttenedVideoCall";
import TestMain from "../../components/CheckedMantalHealth/TestMain";
import Depression from "../../components/CheckedMantalHealth/Depression";
import Bipolar from "../../components/CheckedMantalHealth/Bipolar";
import Anxiety from "../../components/CheckedMantalHealth/Anxiety";
import Suicidal from "../../components/CheckedMantalHealth/Suicidal";
import ReviewModel from "../../components/CommonModal/ReviewModel";
import Review from "../../resuable/Review";
import MyProfileInfo from "../../resuable/MyProfileInfo";
import ResetPassword from "../../resuable/ResetPassword";
import ForgotPassword from "../../resuable/ForgotPassword";
import DoctorVarification from "../../Pages/Dashboard/Dashboard/Admin/DoctorVarification";
import AllPatientHealthReport from "../../Pages/Dashboard/Dashboard/Admin/AllPatientHealthReport";
import AllBookingVideoCall from "../../Pages/Dashboard/Dashboard/Admin/AllBookingVideoCall";
import PaymentReport from "../../Pages/Dashboard/Dashboard/Admin/PaymentReport";
import UpdatePatientProfile from "../../resuable/UpdatePatientProfile";
import OnsiteAppointment from "../../Pages/Appointment/OnSiteAppointment/OnsiteAppointment";
import MyOnsitePatientList from "../../Pages/Dashboard/Dashboard/Doctor/MyOnsitePatientList";
import MyOnsiteAppointment from "../../Pages/Dashboard/Dashboard/Patient/MyOnsiteAppointment";
import About from "../../Pages/Shared/About/About";
import AccountDelete from "../../Pages/Shared/DeleteAccount/AccountDelete";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement: <DisplayError></DisplayError>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/signup",
        element: <SignUp></SignUp>,
      },
      {
        path: "/about",
        element: <About />,
      },

      {
        path: "/booking_appointment",
        element: (
          <PrivateRoute>
            <BookingAppointment />
          </PrivateRoute>
        ),
      },
      {
        path: "/patientInfo",
        element: <PatientInfo />,
      },
      {
        path: "/onsite_booking_appointment",
        element: (
          <PrivateRoute>
            <OnsiteAppointment />
          </PrivateRoute>
        ),
      },
      {
        path: "/doctor/details/:id",
        element: (
          <PrivateRoute>
            <DoctorDetails />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    errorElement: <DisplayError></DisplayError>,
    children: [
      {
        path: "/dashboard",
        element: <MyAppointment></MyAppointment>,
      },
      {
        path: "/dashboard/create_appointment",
        element: <CreateAppointments />,
      },
      {
        path: "/dashboard/allusers",
        element: (
          <AdminRoute>
            <AllUsers></AllUsers>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/delete_account",
        element: (
          <PrivateRoute>
            <AccountDelete />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/all_appointment",
        element: (
          <AdminRoute>
            <AllCareteApointment />
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/adddoctor",
        element: (
          <AdminRoute>
            <AddDoctor></AddDoctor>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/managedoctors",
        element: (
          <AdminRoute>
            <ManageDoctors></ManageDoctors>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/appointment",
        element: <Appointment></Appointment>,
      },
      {
        path: "/dashboard/payment/:id",
        element: <Payment></Payment>,
        loader: ({ params }) =>
          fetch(`https://care-pulse-server.vercel.app/bookings/${params.id}`),
      },
      {
        path: "/dashboard/myprofile",
        element: (
          <PrivateRoute>
            <MyProfile />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/patient_profile",
        element: (
          <PrivateRoute>
            <PatientProfile />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/myappointments",
        element: (
          <PrivateRoute>
            <MyBookingAppointment />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/video_call",
        element: (
          <PrivateRoute>
            <VideoCall />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/my_patientlist",
        element: (
          <PrivateRoute>
            <MyParientList />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/video_callling_doctors",
        element: (
          <PrivateRoute>
            <DoctorsVideoCall />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/prescription",
        element: (
          <PrivateRoute>
            <Prescription />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/doctor_presscription/:id",
        element: (
          <PrivateRoute>
            <DoctorsPrescription />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/patientprescription",
        element: (
          <PrivateRoute>
            <PatientPrescription />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/my_video_call/:videoCallingId",
        element: (
          <PrivateRoute>
            <AttenedVideoCall />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/checked_mantal_health",
        element: (
          <PrivateRoute>
            <TestMain />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/depression",
        element: (
          <PrivateRoute>
            <Depression />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/bipolar",
        element: (
          <PrivateRoute>
            <Bipolar />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/anxiety",
        element: (
          <PrivateRoute>
            <Anxiety />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/suicidal",
        element: (
          <PrivateRoute>
            <Suicidal />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/review/:id/:appointmentId",
        element: (
          <PrivateRoute>
            <ReviewModel />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/review_section",
        element: (
          <PrivateRoute>
            <Review />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/my-profile-information",
        element: (
          <PrivateRoute>
            <MyProfileInfo />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/chnage_password",
        element: (
          <PrivateRoute>
            <ResetPassword />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/reset_password",
        element: (
          <PrivateRoute>
            <ForgotPassword />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/doctor_varify",
        element: (
          <PrivateRoute>
            <DoctorVarification />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/AllPatientHealthReport",
        element: (
          <PrivateRoute>
            <AllPatientHealthReport />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/allbooking_report",
        element: (
          <PrivateRoute>
            <AllBookingVideoCall />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/payment_report",
        element: (
          <PrivateRoute>
            <PaymentReport />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/update_patient_profile/:id",
        element: (
          <PrivateRoute>
            <UpdatePatientProfile />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/my_onsite_patientlist",
        element: (
          <PrivateRoute>
            <MyOnsitePatientList />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/myonsite_appointment",
        element: (
          <PrivateRoute>
            <MyOnsiteAppointment />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
