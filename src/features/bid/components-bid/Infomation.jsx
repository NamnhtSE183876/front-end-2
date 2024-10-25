import { useEffect, useState } from "react";

/* eslint-disable react/prop-types */
function Information({
  gender,
  size,
  age,
  breeder,
  varietyName,
  fishId,
  registed,
}) {
  const [checkRegisted, setCheckRegisted] = useState("");

  const handleCheckRegisted = () => {
    console.log("trong info check deposit: ", registed);
    if (registed) {
      setCheckRegisted("Deposited");
    } else {
      setCheckRegisted("Unpaid deposit");
    }
  };

  const formatGender = (gender) => {
    switch (gender) {
      case "MALE":
        return "Male";
      case "FEMALE":
        return "Female";
      case "UNKNOWN":
        return "Unknown";
    }
  };

  useEffect(() => {
    handleCheckRegisted();
  }, [registed]);

  return (
    <div className="ml-[30px] mt-[20px] h-[200px] w-[800px] bg-gray-900 hover:bg-gray-800 rounded-2xl border-2 hover:border-4 border-[#bcab6f] outline outline-offset-2 outline-white">
      <div className="flex items-center">
        <h1 className="font-bold text-3xl pt-3 pl-3 text-[#bcab6f]">
          {varietyName + "#" + fishId}
        </h1>
        <div className="h-[40px] w-[200px] bg-[#C0392B] ml-[430px] rounded-3xl flex justify-center items-center mt-3 mr-2 text-ellipsis overflow-hidden whitespace-nowrap">
          <h1 className="font-bold text-white ">{checkRegisted}</h1>
        </div>
      </div>
      <div className="flex items-center justify-between gap-3 mt-7">
        <div className="bg-slate-500 h-[40px] w-[550px] rounded-[50px] flex items-center justify-between pl-7 ml-3 ">
          <div className="text-xl font-bold">Gender</div>
          <div className="text-xl font-bold mr-8">{formatGender(gender)}</div>
        </div>
        <div className="bg-slate-500 h-[40px] w-[550px] rounded-[50px] flex items-center justify-between pl-7 mr-3">
          <h1 className="text-xl font-bold">Size</h1>
          <h1 className="text-xl font-bold mr-8">{size} cm</h1>
        </div>
      </div>
      <div className="flex items-center justify-between gap-3">
        <div className="bg-slate-500 h-[40px] w-[550px] mt-5 rounded-[50px] flex items-center justify-between pl-7 ml-3">
          <h1 className="text-xl font-bold">Breeder</h1>
          <h1 className="text-xl font-bold mr-8">{breeder}</h1>
        </div>
        <div className="bg-slate-500 h-[40px] w-[550px] mt-5 rounded-[50px] flex items-center justify-between pl-7 mr-3">
          <h1 className="text-xl font-bold">Age</h1>
          <h1 className="text-xl font-bold mr-8">{age} year</h1>
        </div>
      </div>
    </div>
  );
}

export default Information;
