import React from "react";

function TopButtons({ setQuery }) {
  const cities = [
    {
      id: 1,
      title: "London",
    },
    {
      id: 2,
      title: "Mumbai",
    },
    {
      id: 3,
      title: "Mönchengladbach",
    },
    {
      id: 4,
      title: "Düsseldorf",
    },
    {
      id: 5,
      title: "Berlin",
    },
  ];

  return (
    <div className="flex items-center justify-around my-6">
      {cities.map((city) => (
        <button
          key={city.id}
          className="text-white text-lg font-medium"
          onClick={() => setQuery({ name: city.title, count: 1 })}
        >
          {city.title}
        </button>
      ))}
    </div>
  );
}

export default TopButtons;
