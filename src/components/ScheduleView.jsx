"use client";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/Card";
import { Calendar } from "lucide-react";
import { api } from "@/lib/api";

export default function ScheduleView() {
  const [scheduleData, setScheduleData] = useState(null);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDay, setSelectedDay] = useState("mon");

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const [schedule, eventData] = await Promise.all([api.getSchedule(), api.getEvents()]);
        setScheduleData(schedule);
        setEvents(eventData);
      } catch (err) {
        setError("Failed to load schedule");
      } finally {
        setLoading(false);
      }
    };

    fetchSchedule();
  }, []);

  if (loading) return <p className="text-white text-center">Loading schedule...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;
  if (!scheduleData) return null;

  return (
    <Card className="w-full max-w-6xl mx-auto mb-10">
      <CardHeader>
        {/* <CardTitle className="flex items-center gap-2">
          <Calendar className="h-6 w-6" />
          Festival Schedule
        </CardTitle> */}
        <div className="flex justify-center gap-2">
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
                {scheduleData[stage][selectedDay]?.map((event, idx) => (
                  <div key={idx} className={`p-2 rounded ${events.some((e) => e.act === event.act && e.cancelled) ? "bg-red-100" : "bg-gray-100"}`}>
                    <p className="font-medium">{event.act}</p>
                    <p className="text-sm">
                      {event.start} - {event.end}
                    </p>
                    {events.some((e) => e.act === event.act && e.cancelled) && <p className="text-red-600 text-sm">CANCELLED</p>}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
