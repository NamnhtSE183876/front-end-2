function Information({
  varietyName,
  currentPrice,
  breederName,
  gender,
  size,
  age,
}) {
  // Chuyển đổi giá trị gender
  const formattedGender =
    gender === "MALE"
      ? "Male"
      : gender === "FEMALE"
      ? "Female"
      : gender === "UNKNOWN"
      ? "Unknown"
      : gender;

  return (
    <div className=" text-white">
      <div className="flex items-center gap-12">
        <h1 className="font-bold  text-xl ml-6 mt-3">{varietyName}</h1>
        <div className="flex items-center">
          <h1 className="font-bold  text-xl ml-8 mt-3 ">{currentPrice}</h1>
          <h2 className="ml-1 text-xs mt-4">vnd</h2>
        </div>
      </div>
      <div className="bg-black h-[3px] w-[300px] mt-4" />
      <div className="flex items-center mt-5 ml-3">
        <div className="">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-house m-3"
            viewBox="0 0 16 16"
          >
            <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5z" />
          </svg>
        </div>
        <h1 className="">{breederName}</h1>
        <div className="ml-[80px]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-gender-ambiguous"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M11.5 1a.5.5 0 0 1 0-1h4a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V1.707l-3.45 3.45A4 4 0 0 1 8.5 10.97V13H10a.5.5 0 0 1 0 1H8.5v1.5a.5.5 0 0 1-1 0V14H6a.5.5 0 0 1 0-1h1.5v-2.03a4 4 0 1 1 3.471-6.648L14.293 1zm-.997 4.346a3 3 0 1 0-5.006 3.309 3 3 0 0 0 5.006-3.31z"
            />
          </svg>
        </div>
        <h1 className="ml-3">{formattedGender}</h1>
      </div>
      <div className="flex items-center ml-3">
        <div className="">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-rulers m-3"
            viewBox="0 0 16 16"
          >
            <path d="M1 0a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h5v-1H2v-1h4v-1H4v-1h2v-1H2v-1h4V9H4V8h2V7H2V6h4V2h1v4h1V4h1v2h1V2h1v4h1V1a1 1 0 0 0-1-1z" />
          </svg>
        </div>
        <h1 className="">{size} cm</h1>
        <div className="ml-[92px]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-cake-fill"
            viewBox="0 0 16 16"
          >
            <path d="m7.399.804.595-.792.598.79A.747.747 0 0 1 8.5 1.806V4H11a2 2 0 0 1 2 2v3h1a2 2 0 0 1 2 2v4a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1v-4a2 2 0 0 1 2-2h1V6a2 2 0 0 1 2-2h2.5V1.813a.747.747 0 0 1-.101-1.01ZM12 6.414a.9.9 0 0 1-.646-.268 1.914 1.914 0 0 0-2.708 0 .914.914 0 0 1-1.292 0 1.914 1.914 0 0 0-2.708 0A.9.9 0 0 1 4 6.414v1c.49 0 .98-.187 1.354-.56a.914.914 0 0 1 1.292 0c.748.747 1.96.747 2.708 0a.914.914 0 0 1 1.292 0c.374.373.864.56 1.354.56zm2.646 5.732a.914.914 0 0 1-1.293 0 1.914 1.914 0 0 0-2.707 0 .914.914 0 0 1-1.292 0 1.914 1.914 0 0 0-2.708 0 .914.914 0 0 1-1.292 0 1.914 1.914 0 0 0-2.708 0 .914.914 0 0 1-1.292 0L1 11.793v1.34c.737.452 1.715.36 2.354-.28a.914.914 0 0 1 1.292 0c.748.748 1.96.748 2.708 0a.914.914 0 0 1 1.293 0 1.915 1.915 0 0 0 2.354.28v-1.34z" />
          </svg>
        </div>
        <h1 className="m-3">{age} year</h1>
      </div>
    </div>
  );
}

export default Information;
