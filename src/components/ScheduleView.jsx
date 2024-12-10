"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader } from "./ui/Card";
import { api } from "@/lib/api";

export default function ScheduleView() {
  const [scheduleData, setScheduleData] = useState(null);
  const [lineupData, setLineupData] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDay, setSelectedDay] = useState("mon");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [schedule, bands, eventData] = await Promise.all([api.getSchedule(), fetch("http://localhost:8080/bands").then((res) => res.json()), api.getEvents()]);
        setScheduleData(schedule);
        setLineupData(bands);
        setEvents(eventData);
      } catch (err) {
        setError("Failed to load schedule");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p className="text-white_color text-center">Loading schedule...</p>;
  if (error) return <p className="text-red_color text-center">{error}</p>;
  if (!scheduleData || !lineupData.length) return null;

  // Opret et lookup-objekt for hurtigere opslag af slug baseret på bandnavn
  const bandSlugLookup = lineupData.reduce((acc, band) => {
    acc[band.name] = band.slug;
    return acc;
  }, {});

  return (
    <Card className="w-full max-w-6xl mx-auto mb-10">
      <CardHeader>
        <div className="font-medium flex justify-center gap-2">
          {["mon", "tue", "wed", "thu", "fri", "sat", "sun"].map((day) => (
            <button key={day} onClick={() => setSelectedDay(day)} className={`px-3 py-1 rounded ${selectedDay === day ? "bg-[#7d0200] text-white" : "bg-gray-200"}`}>
              {day.toUpperCase()}
            </button>
          ))}
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Object.keys(scheduleData).map((stage) => (
            <div key={stage} className="border rounded-lg p-4">
              <h5 className="font-bold mb-4">{stage}</h5>
              <div className="space-y-2">
                {scheduleData[stage][selectedDay]
                  ?.filter((event) => event.act.toLowerCase() !== "break") // Filtrer "break"-events fra
                  .map((event, idx) => {
                    const slug = bandSlugLookup[event.act]; // Slå slug op for act
                    return (
                      <div key={idx} className={`hover:scale-105 transition-transform duration-300 p-2 rounded ${events.some((e) => e.act === event.act && e.cancelled) ? "bg-red-100" : "bg-gray-100"}`}>
                        {slug ? (
                          // Link til singleview, hvis slug findes
                          <Link href={`/band/${slug}`} className="font-medium text-step_p ">
                            {event.act}
                          </Link>
                        ) : (
                          // Hvis slug ikke findes, vis bare navnet
                          <p className="font-medium">{event.act}</p>
                        )}
                        <p className="text-sm">
                          {event.start} - {event.end}
                        </p>
                        {events.some((e) => e.act === event.act && e.cancelled) && <p className="text-red-600 text-sm">CANCELLED</p>}
                      </div>
                    );
                  })}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
