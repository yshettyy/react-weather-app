import { DateTime } from "luxon";

const WEATHER_URL = "https://api.open-meteo.com/v1";
const BASE_URL = "https://geocoding-api.open-meteo.com/v1";
const GEO_URL = "https://nominatim.openstreetmap.org";

const getCityData = (infoType, searchParams) => {
  const url = new URL(BASE_URL + "/" + infoType);
  url.search = new URLSearchParams({ ...searchParams });
  return fetch(url).then((res) => res.json());
};

const getCityFromLocation = (infoType, searchParams) => {
  const url = new URL(GEO_URL + "/" + infoType);
  url.search = new URLSearchParams({ ...searchParams });
  return fetch(url).then((res) => res.json());
};

const formatCity = (data) => {
  const city = data["address"]["city"];
  return city;
};

const getCityFromCoord = (searchParams) => {
  const cityData = getCityFromLocation("reverse.php", searchParams).then(
    formatCity
  );
  return cityData;
};
const getWeatherData = (infoType, searchParams) => {
  const url = new URL(WEATHER_URL + "/" + infoType);
  url.search = new URLSearchParams({ ...searchParams });
  return fetch(url).then((res) => res.json());
};

const formatCityData = (data) => {
  const { latitude, longitude, country_code, timezone, name } = data.results[0];

  return { latitude, longitude, country_code, timezone, name };
};

const formatWeather = (data) => {
  const { timezone } = data;
  const { temperature, windspeed, winddirection, weathercode } =
    data["current_weather"];
  const { sunrise, sunset, temperature_2m_max, temperature_2m_min } =
    data["daily"];
  const { relativehumidity_2m, temperature_2m, time, apparent_temperature } =
    data["hourly"];
  const sliceValueHourly = countLostElements(time);
  const sliceValueDaily = countLostElements(data["daily"]["time"]);
  return {
    currentTemp: temperature,
    currentWindSpeed: windspeed,
    currentWindDirection: winddirection,
    currentWeatherCode: weathercode,
    currentTime: DateTime.now()
      .setZone(timezone)
      .toFormat("cccc, dd LLL yyyy' | LocalTime: 'hh:mm a"),
    maxTemp: temperature_2m_max[0],
    minTemp: temperature_2m_min[0],
    sunrise: formatToLocalTime(sunrise[0], timezone, "hh:mm a"),
    sunset: formatToLocalTime(sunset[0], timezone, "hh:mm a"),
    humidity: relativehumidity_2m[sliceValueHourly],
    feelsLike: apparent_temperature[sliceValueHourly],
    sliceValue: sliceValueHourly,
    daily: [
      {
        time: formatToLocalTime(
          data["daily"]["time"][sliceValueDaily],
          timezone,
          "ccc"
        ),
        temperature_2m: temperature_2m_max[sliceValueDaily],
        temperature_2m_min: temperature_2m_min[sliceValueDaily],
        weathercode: data["daily"]["weathercode"][sliceValueDaily],
      },
      {
        time: formatToLocalTime(
          data["daily"]["time"][sliceValueDaily + 1],
          timezone,
          "ccc"
        ),
        temperature_2m: temperature_2m_max[sliceValueDaily + 1],
        temperature_2m_min: temperature_2m_min[sliceValueDaily + 1],
        weathercode: data["daily"]["weathercode"][sliceValueDaily + 1],
      },
      {
        time: formatToLocalTime(
          data["daily"]["time"][sliceValueDaily + 2],
          timezone,
          "ccc"
        ),
        temperature_2m: temperature_2m_max[sliceValueDaily + 2],
        temperature_2m_min: temperature_2m_min[sliceValueDaily + 2],
        weathercode: data["daily"]["weathercode"][sliceValueDaily + 2],
      },
      {
        time: formatToLocalTime(
          data["daily"]["time"][sliceValueDaily + 3],
          timezone,
          "ccc"
        ),
        temperature_2m: temperature_2m_max[sliceValueDaily + 3],
        temperature_2m_min: temperature_2m_min[sliceValueDaily + 3],
        weathercode: data["daily"]["weathercode"][sliceValueDaily + 3],
      },
      {
        time: formatToLocalTime(
          data["daily"]["time"][sliceValueDaily + 4],
          timezone,
          "ccc"
        ),
        temperature_2m: temperature_2m_max[sliceValueDaily + 4],
        temperature_2m_min: temperature_2m_min[sliceValueDaily + 4],
        weathercode: data["daily"]["weathercode"][sliceValueDaily + 4],
      },
      {
        time: formatToLocalTime(
          data["daily"]["time"][sliceValueDaily + 5],
          timezone,
          "ccc"
        ),
        temperature_2m: temperature_2m_max[sliceValueDaily + 5],
        temperature_2m_min: temperature_2m_min[sliceValueDaily + 5],
        weathercode: data["daily"]["weathercode"][sliceValueDaily + 5],
      },
      {
        time: formatToLocalTime(
          data["daily"]["time"][sliceValueDaily + 6],
          timezone,
          "ccc"
        ),
        temperature_2m: temperature_2m_max[sliceValueDaily + 6],
        temperature_2m_min: temperature_2m_min[sliceValueDaily + 6],
        weathercode: data["daily"]["weathercode"][sliceValueDaily + 6],
      },
    ],
    hourly: [
      {
        time: formatToLocalTime(
          data["hourly"]["time"][sliceValueHourly + 1],
          timezone,
          "hh:mm"
        ),
        temperature_2m: temperature_2m[sliceValueHourly + 1],
        weathercode: data["hourly"]["weathercode"][sliceValueHourly + 1],
      },
      {
        time: formatToLocalTime(
          data["hourly"]["time"][sliceValueHourly + 2],
          timezone,
          "hh:mm"
        ),
        temperature_2m: temperature_2m[sliceValueHourly + 2],
        weathercode: data["hourly"]["weathercode"][sliceValueHourly + 2],
      },
      {
        time: formatToLocalTime(
          data["hourly"]["time"][sliceValueHourly + 3],
          timezone,
          "hh:mm"
        ),
        temperature_2m: temperature_2m[sliceValueHourly + 3],
        weathercode: data["hourly"]["weathercode"][sliceValueHourly + 3],
      },
      {
        time: formatToLocalTime(
          data["hourly"]["time"][sliceValueHourly + 4],
          timezone,
          "hh:mm"
        ),
        temperature_2m: temperature_2m[sliceValueHourly + 4],
        weathercode: data["hourly"]["weathercode"][sliceValueHourly + 4],
      },
      {
        time: formatToLocalTime(
          data["hourly"]["time"][sliceValueHourly + 5],
          timezone,
          "hh:mm"
        ),
        temperature_2m: temperature_2m[sliceValueHourly + 5],
        weathercode: data["hourly"]["weathercode"][sliceValueHourly + 5],
      },
      {
        time: formatToLocalTime(
          data["hourly"]["time"][sliceValueHourly + 6],
          timezone,
          "hh:mm"
        ),
        temperature_2m: temperature_2m[sliceValueHourly + 6],
        weathercode: data["hourly"]["weathercode"][sliceValueHourly + 6],
      },
      {
        time: formatToLocalTime(
          data["hourly"]["time"][sliceValueHourly + 7],
          timezone,
          "hh:mm"
        ),
        temperature_2m: temperature_2m[sliceValueHourly + 7],
        weathercode: data["hourly"]["weathercode"][sliceValueHourly + 7],
      },
    ],
  };
};

const getFormattedCityData = async (searchParams) => {
  const formattedCityData = await getCityData("search", searchParams).then(
    formatCityData
  );
  const { latitude, longitude, timezone } = formattedCityData;

  const formattedWeatherData = await getWeatherData("forecast", {
    latitude: latitude,
    longitude: longitude,
    timezone: timezone,
    current_weather: true,
    hourly:
      "temperature_2m,relativehumidity_2m,apparent_temperature,rain,snowfall,weathercode,windspeed_10m,windgusts_10m",
    daily:
      "weathercode,temperature_2m_max,temperature_2m_min,sunrise,sunset,rain_sum,snowfall_sum,windspeed_10m_max,windgusts_10m_max",
    timeformat: "unixtime",
    forecast_days: 16,
  }).then(formatWeather);

  return { ...formattedCityData, ...formattedWeatherData };
};
const formatToLocalTime = (secs, zone, format) =>
  DateTime.fromSeconds(secs).setZone(zone).toFormat(format);

function countLostElements(timestamps) {
  const currentTimestamp = Math.floor(Date.now() / 1000);
  const smallerTimestamps = timestamps.filter(
    (timestamp) => timestamp < currentTimestamp
  );
  return smallerTimestamps.length;
}
function mapKeyToStringValue(key) {
  const keyMap = {
    0: "Clear",
    1: "Mainly clear",
    2: "Partly Cloudy",
    3: "Overcast",
    45: "Fog",
    48: "Freezing Fog",
    51: "Drizzle Light",
    53: "Drizzle Moderate",
    55: "Drizzle Dense",
    56: "Freezing Drizzle Light",
    57: "Freezing Drizzle Intense",
    61: "Rain Slight",
    63: "Rain Moderate",
    65: "Rain Heavy",
    66: "Freezing Rain Light",
    67: "Freezing Rain Intense",
    71: "Snow Fall Slight",
    73: "Snow Fall Moderate",
    75: "Snow Fall Intense",
    77: "Snow Grains",
    80: "Rain showers Slight",
    81: "Rain showers Moderate",
    82: "Rain showers Violent",
    85: "Snow showers Slight",
    86: "Snow showers Heavy",
    95: "Thunderstorm",
    96: "Thunderstorm",
    99: "Thunderstorm Heavy Hail",
  };

  return keyMap[key] || "Unknown";
}

function findKeyByValue(value) {
  const keyValueMap = {
    "01d": [0, 1],
    "02d": [2],
    "03d": [3],
    "50d": [45, 48],
    "09d": [51, 53, 55, 56, 57, 80, 81, 82],
    "10d": [61, 63, 65],
    "13d": [66, 67, 71, 73, 75, 77, 85, 86],
    "11d": [95, 96, 99],
  };

  for (const key in keyValueMap) {
    if (keyValueMap.hasOwnProperty(key)) {
      const values = keyValueMap[key];
      if (values.includes(value)) {
        return key;
      }
    }
  }
}
const iconUrlCode = (code) =>
  `https://openweathermap.org/img/wn/${code}@2x.png`;

export default getFormattedCityData;

export {
  formatToLocalTime,
  iconUrlCode,
  findKeyByValue,
  mapKeyToStringValue,
  getCityFromCoord,
};
