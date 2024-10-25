/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

function Picture({ img }) {
  const [picture, setPicture] = useState("");

  useEffect(() => {
    setPicture(img);
  }, [img]);
  return (
    <div className="ml-[200px] border-2 border-[#bcab6f] rounded-2xl outline outline-offset-2 outline-white">
      <img
        src={picture}
        width={900}
        height={970}
        className="rounded-2xl"
        alt="Koi Fish"
      />
    </div>
  );
}

export default Picture;
