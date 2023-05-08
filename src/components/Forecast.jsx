import React from "react";
import { iconUrlCode, findKeyByValue } from "../Services/weatherService";

function Forecast({ title, items }) {
  return (
    <div>
      <div className="flex items-center justify-start mt-6">
        <p className="text-white font-medium uppercase">{title}</p>
      </div>
      <hr className="my-2" />

      <div className="flex flex-row items-center justify-between text-white">
        {items.map((item) => (
          <div className="flex flex-col items-center justify-center">
            <p className="font-light text-sm">{item.time}</p>
            <img
              src={iconUrlCode(findKeyByValue(item.weathercode))}
              className="w-12 my-1"
              alt=""
            />
            <p className="font-medium">{`${item.temperature_2m.toFixed()}°`}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Forecast;
