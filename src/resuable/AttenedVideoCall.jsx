import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AgoraUIKit from "agora-react-uikit";
import { FaVideo } from "react-icons/fa"; // Importing VideoCall icon from react-icon
const AttenedVideoCall = () => {
  const { videoCallingId } = useParams();
  const [startVideoCall, setStartVideoCall] = useState(false);
  const navigate = useNavigate();
  const rtcProps = {
    appId: process.env.REACT_APP_VIDEO_CALL_APP_ID || "test",
    channel: videoCallingId,
    token: null,
  };

  const callbacks = {
    EndCall: () => {
      setStartVideoCall(false);
      navigate("/dashboard");
    },
  };

  return (
    <>
      {startVideoCall ? (
        <div className="flex w-full h-screen">
          <AgoraUIKit rtcProps={rtcProps} callbacks={callbacks} />
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center w-full max-w-md mx-auto mt-10 gap-4">
          <button
            onClick={() => setStartVideoCall(true)}
            className="btn btn-primary flex items-center gap-2"
          >
            Start Call <FaVideo />
          </button>
          <img
            src="https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExb25jMWk1b3VxYWtjYTdpZXlnNGcwZHVqcGppejM3bDUybTl3aXQ0ayZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/PnHX3RAVHsjHXTO4qv/giphy.gif"
            className="w-full h-full"
            alt="video call gif"
          />
        </div>
      )}
    </>
  );
};

export default AttenedVideoCall;
