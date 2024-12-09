"use client";
import { useState, useEffect } from "react";

const Page = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const eventsResponse = await fetch("https://lively-scrawny-secretary.glitch.me/events");
      const eventsData = await eventsResponse.json();
      setEvents(events);
    };

    fetchData();
    console.log(events);
  });
  return (
    <div className="mx-[20px] py-[64px] lg:mx-[64px] lg:py-[112px]">
      <section>
        {events.map((event, index) => (
          <div key={index}>
            <h2>{event.scene}</h2>
            <p>{event.day}</p>
            <p>{event.day}</p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Page;
