"use client";
import { useState, useEffect } from "react";
import { IoFilter } from "react-icons/io5";

import Link from "next/link";
import { api } from "@/lib/api"; // Importer api her
import { Button } from "@/components/ui/Button";
import FilterPanel from "@/components/FilterPanel";
import GSAPTextReveal from "@/components/GSAPTextReveal";
import gsap from "gsap";

const Page = () => {
  const [bands, setBands] = useState([]); // State for bands fetched fra API

  // hvorfor er der {} her og ikke []?
  // schedule er sandsynligvis et objekt, hvor hver nøgle repræsenterer en scene (stage), og værdien for hver nøgle er et underobjekt eller et array, der indeholder daglige tidsplaner.
  const [schedule, setSchedule] = useState({}); // State for schedule fetched fra API
  const [filteredBands, setFilteredBands] = useState([]); // State for filtrering af bands
  const [filters, setFilters] = useState({
    genre: "",
    day: "",
    stage: "",
  }); // Filters for genre, day og stage
  const [isFiltersOpen, setIsFiltersOpen] = useState(false); // Om filteret er åbent
  const [visibleCount, setVisibleCount] = useState(12); // Start med at vise 12 kunstnere

  // ændre navnene på dagene til fuld navn på dagen
  const daysMap = {
    Monday: "mon",
    Tuesday: "tue",
    Wednesday: "wed",
    Thursday: "thu",
    Friday: "fri",
    Saturday: "sat",
    Sunday: "sun",
  };

  // Fetch data from the APIs when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [bandsData, scheduleData] = await Promise.all([api.getBands(), api.getSchedule()]);

        // kombinerer bandsData og scheduleData
        const updatedBands = bandsData.map((band) => {
          // finder scheduleData for hvert band
          const bandSchedules = [];
          for (const stage in scheduleData) {
            for (const day in scheduleData[stage]) {
              scheduleData[stage][day].forEach((slot) => {
                if (slot.act === band.name) {
                  bandSchedules.push({ stage, day, start: slot.start, end: slot.end });
                }
              });
            }
          }
          // tilføjer logo til bandet
          const bandLogo = !band.logo ? "/images/default-logo.jpg" : band.logo;
          return { ...band, schedules: bandSchedules, logo: bandLogo };
        });

        setBands(updatedBands);
        setFilteredBands(updatedBands);
        setSchedule(scheduleData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Filter bands whenever filters or the bands list change
  useEffect(() => {
    let updatedBands = [...bands];

    // Stage filter
    if (filters.stage.length > 0) {
      updatedBands = updatedBands.filter((band) => band.schedules.some((schedule) => filters.stage.includes(schedule.stage)));
    }

    // Genre filter
    if (filters.genre.length > 0) {
      updatedBands = updatedBands.filter((band) => filters.genre.includes(band.genre));
    }

    // Day filter
    if (filters.day.length > 0) {
      updatedBands = updatedBands.filter((band) => band.schedules.some((schedule) => filters.day.includes(schedule.day)));
    }

    // Update the state with the filtered bands
    setFilteredBands(updatedBands);
  }, [filters, bands]);

  return (
    <div className="">
      <div
        style={{
          backgroundImage: "url('/images/jodie-walton-unsplash.jpg')",
          backgroundRepeat: "no-repeat",
          backgroundColor: "black",
        }}
        className="w-full h-[250px] py-[64px] lg:py-[112px] bg-center bg-fill bg-cover bg-black bg-opacity-50"
      >
        <h1 className="font-black text-white text-center anim">Lineup</h1>
      </div>
      {/* <GSAPTextReveal /> */}
      <div className="mx-[20px] lg:mx-[64px] py-[64px] lg:py-[112px] flex flex-col gap-4">
        <div className="flex justify-between items-center mb-4">
          <section>
            {/* Filter Button */}
            <Button onClick={() => setIsFiltersOpen(true)} className="">
              <IoFilter />
              <span>Filters</span>
            </Button>

            {/* FilterPanel Component */}
            {isFiltersOpen && <FilterPanel filters={filters} setFilters={setFilters} schedule={schedule} daysMap={daysMap} bands={bands} closeFilter={() => setIsFiltersOpen(false)} />}
          </section>

          <section>
            {/* a-z knap */}
            <Button
              onClick={() => {
                const sortedBands = [...filteredBands].sort((a, b) => a.name.localeCompare(b.name));
                setFilteredBands(sortedBands);
              }}
              className="bg-black text-white py-2 px-4 rounded"
            >
              Sort A-Z
            </Button>
          </section>
        </div>
        {/* Main Band Grid */}
        <section className={`transition-transform duration-300 ${isFiltersOpen ? "opacity-50" : "opacity-100"} grid grid-cols-2 lg:grid-cols-4 gap-4`}>
          {filteredBands.slice(0, visibleCount).map((band) => (
            <div key={band.slug} className="relative w-full h-[300px] bg-gray-200 rounded overflow-hidden transition-transform hover:scale-105 group">
              <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${band.logo})` }} />
              <div className="absolute inset-0 bg-black bg-opacity-20 flex items-end p-4 group-hover:bg-opacity-0">
                <Link href={`/band/${band.slug}`} className="absolute text-white text-lg font-bold inset-0 flex items-end p-5">
                  {band.name}
                </Link>
              </div>
            </div>
          ))}
        </section>
        {visibleCount < filteredBands.length && (
          <div className="mt-4 flex items-center justify-between">
            <span className="text-gray-500">
              {Math.min(visibleCount, filteredBands.length)} out of {filteredBands.length} bands
            </span>
            <Button
              onClick={() => setVisibleCount((prevCount) => prevCount + 12)} // Vis 30 flere kunstnere ad gangen
              className="bg-black text-white py-2 px-4 rounded"
            >
              Load more
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
