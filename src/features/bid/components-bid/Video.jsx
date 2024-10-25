/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

function Video({ vid }) {
  const [video, setVideo] = useState("");

  useEffect(() => {
    setVideo(vid);
  }, [vid]);
  return (
    <>
      <div className="ml-[200px]">
        <video
          controls
          src={video}
          type="video.mp4"
          className="rounded-2xl"
          height="300px"
          width="665px"
        ></video>
      </div>
    </>
  );
}

export default Video;
