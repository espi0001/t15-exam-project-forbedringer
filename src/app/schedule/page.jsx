"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { api } from "@/lib/api";

export default function Page() {
  const [scheduleData, setScheduleData] = useState(null);
  const [lineupData, setLineupData] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDay, setSelectedDay] = useState("mon");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [schedule, bands, eventData] = await Promise.all([
          api.getSchedule(), // Henter skemaet
          api.getBands(), // Hent bands
          api.getEvents(), // Hent events
        ]);
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

  // Lookup for band slugs
  const bandSlugLookup = lineupData.reduce((acc, band) => {
    acc[band.name] = band.slug;
    return acc;
  }, {});

  return (
    <div>
      <div
        style={{
          backgroundImage: "url('/images/jodie-walton-unsplash.jpg')",
          backgroundRepeat: "no-repeat",
          backgroundColor: "black",
        }}
        className="w-full h-[250px] py-[64px] lg:py-[112px] bg-center bg-fill bg-cover bg-black bg-opacity-50"
      >
        <h1 className="font-black text-white text-center">Festival Schedule</h1>
      </div>

      <section className="p-6">
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
              {Object.keys(scheduleData).map(
                (
                  stage,
                  stageIdx // Tilføj en key for hver stage
                ) => (
                  <div key={stageIdx} className="border rounded-lg p-4">
                    <h5 className="font-bold mb-4">{stage}</h5>
                    <div className="space-y-2">
                      {scheduleData[stage][selectedDay]
                        ?.filter((event) => event.act.toLowerCase() !== "break")
                        .map((event, idx) => {
                          const slug = bandSlugLookup[event.act];
                          return slug ? (
                            <Link
                              key={`${stage}-${idx}`} // Unik key for hvert event med stage og index
                              href={`/band/${slug}`}
                              className={`block hover:scale-105 transition-transform duration-300 p-2 rounded ${events.some((e) => e.act === event.act && e.cancelled) ? "bg-red-100" : "bg-gray-100"}`}
                            >
                              <p className="font-medium text-step_p">{event.act}</p>
                              <p className="text-sm">
                                {event.start} - {event.end}
                              </p>
                              {events.some((e) => e.act === event.act && e.cancelled) && <p className="text-red-600 text-sm">CANCELLED</p>}
                            </Link>
                          ) : (
                            <div
                              key={`${stage}-${idx}`} // Unik key også her
                              className={`p-2 rounded ${events.some((e) => e.act === event.act && e.cancelled) ? "bg-red-100" : "bg-gray-100"}`}
                            >
                              <p className="font-medium">{event.act}</p>
                              <p className="text-sm">
                                {event.start} - {event.end}
                              </p>
                              {events.some((e) => e.act === event.act && e.cancelled) && <p className="text-red-600 text-sm">CANCELLED</p>}
                            </div>
                          );
                        })}
                    </div>
                  </div>
                )
              )}
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
