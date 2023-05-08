import React from "react";

function TimeAndLocation({ weather: { currentTime, country_code, name } }) {
  return (
    <div>
      <div className="flex items-center justify-center my-6">
        <p className="text-white text-xl font-extralight">{currentTime}</p>
      </div>

      <div className="flex items-center justify-center my-3">
        <p className="text-white text-3xl font-medium">{`${name}, ${country_code}`}</p>
      </div>
    </div>
  );
}

export default TimeAndLocation;
