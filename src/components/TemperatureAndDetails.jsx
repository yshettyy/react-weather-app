import React from "react";
import {
  iconUrlCode,
  findKeyByValue,
  mapKeyToStringValue,
} from "../Services/weatherService";
import {
  UilTemperature,
  UilTear,
  UilWind,
  UilSun,
  UilSunset,
} from "@iconscout/react-unicons";

function TemperatureAndDetails({
  weather: {
    currentWeatherCode,
    currentTemp,
    feelsLike,
    humidity,
    currentWindSpeed,
    sunrise,
    sunset,
    maxTemp,
    minTemp,
  },
}) {
  return (
    <div>
      <div className="flex items-center justify-center py-6 text-xl text-cyan-300">
        <p>{mapKeyToStringValue(currentWeatherCode)}</p>
      </div>

      <div className="flex flex-row items-center justify-between text-white py-3">
        <img
          src={iconUrlCode(findKeyByValue(currentWeatherCode))}
          alt=""
          className="w-20"
        />
        <p className="text-5xl">{`${currentTemp.toFixed()}°`}</p>
        <div className="flex flex-col space-y-2">
          <div className="flex font-light text-sm items-center justify-center">
            <UilTemperature size={18} className="mr-1" />
            Real fell:
            <span className="font-medium ml-1">{`${feelsLike.toFixed()}°`}</span>
          </div>
          <div className="flex font-light text-sm items-center justify-center">
            <UilTear size={18} className="mr-1" />
            Humidity:
            <span className="font-medium ml-1">{`${humidity.toFixed()}%`}</span>
          </div>
          <div className="flex font-light text-sm items-center justify-center">
            <UilWind size={18} className="mr-1" />
            Wind:
            <span className="font-medium ml-1">{`${currentWindSpeed.toFixed()}km/h`}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-row items-center justify-center space-x-2 text-white text-sm py-3">
        <UilSun />
        <p className="font-light">
          Rise:
          <span className="font-medium ml-1">{sunrise}</span>
        </p>
        <p className="font-light">|</p>

        <UilSunset />
        <p className="font-light">
          Set:
          <span className="font-medium ml-1">{sunset}</span>
        </p>
        <p className="font-light">|</p>

        <UilSun />
        <p className="font-light">
          High:
          <span className="font-medium ml-1">{`${maxTemp.toFixed()}°`}</span>
        </p>
        <p className="font-light">|</p>

        <UilSun />
        <p className="font-light">
          Low:
          <span className="font-medium ml-1">{`${minTemp.toFixed()}°`}</span>
        </p>
      </div>
    </div>
  );
}

export default TemperatureAndDetails;
