"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { api } from "@/lib/api";
import HeaderBillede from "@/components/HeaderBillede";
import HeaderText from "@/components/HeaderText";
import { Button } from "@/components/ui/Button";

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
      <HeaderBillede billede="/images/jodie-walton-unsplash.jpg" />

      <section className="mx-[20px] lg:mx-[64px] p-6">
        <Card className="w-full max-w-6xl mx-auto mb-10">
          <HeaderText h1="Stage Schedule" text="Experience unforgettable performances and immerse yourself in the festival vibe." />
          {/* className={`${selectedDay === day ? "bg-red_color text-white_color" : "bg-gray-200"}`} */}
          <CardHeader>
            <div className="font-medium flex-wrap flex justify-center gap-2">
              {["mon", "tue", "wed", "thu", "fri", "sat", "sun"].map((day) => (
                <Button key={day} onClick={() => setSelectedDay(day)} className={`${selectedDay === day ? "bg-red_color border-red_color" : ""}`}>
                  {day.toUpperCase()}
                </Button>
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
                  <div key={stageIdx} className="border rounded p-4">
                    <h4 className="font-bold mb-4">{stage}</h4>
                    <div className="space-y-2">
                      {scheduleData[stage][selectedDay]
                        ?.filter((event) => event.act.toLowerCase() !== "break")
                        .map((event, idx) => {
                          const slug = bandSlugLookup[event.act];
                          return slug ? (
                            <Link
                              key={`${stage}-${idx}`} // Unik key for hvert event med stage og index
                              href={`/band/${slug}`}
                              className={`block hover:scale-105 transition-transform duration-300 p-2 rounded ${events.some((e) => e.act === event.act && e.cancelled) ? "bg-red_color" : "bg-light_grey_color"}`}
                            >
                              <p className="font-medium text-step_p">{event.act}</p>
                              <p className="text-step_text_tiny">
                                {event.start} - {event.end}
                              </p>
                              {events.some((e) => e.act === event.act && e.cancelled) && <p className="text-red_color text-step_text_tiny">CANCELLED</p>}
                            </Link>
                          ) : (
                            <div
                              key={`${stage}-${idx}`} // Unik key også her
                              className={`p-2 rounded ${events.some((e) => e.act === event.act && e.cancelled) ? "bg-red_color" : "bg-light_grey_color"}`}
                            >
                              <p className="font-medium text-step_p">{event.act}</p>
                              <p className="text-step_text_tiny">
                                {event.start} - {event.end}
                              </p>
                              {events.some((e) => e.act === event.act && e.cancelled) && <p className="text-red_color text-step_text_tiny">CANCELLED</p>}
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
