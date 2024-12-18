"use client";
import { motion, AnimatePresence } from "framer-motion"; // animation
import { useState, useEffect } from "react";
import { IoFilter } from "react-icons/io5"; // icon
import { api } from "@/lib/api"; // Importer api her
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import FilterPanel from "@/components/FilterPanel";
import ContactHero from "@/images/danny-howe-unsplash.avif";
import HeaderBillede from "@/components/HeaderBillede";
import HeaderText from "@/components/HeaderText";

export const metadata = {
  title: "Foo Fest | Lineup",
  description: "Explore the amazing lineup for Foo Fest 2025.",
};

const Page = () => {
  const panelSlide = {
    initial: { x: "-100%" },
    enter: { x: "0", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } },
    exit: { x: "-100%", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } },
  }; // Filterpanel animation
  const [bands, setBands] = useState([]); // State for bands fetched fra API
  const [schedule, setSchedule] = useState({}); // State for schedule fetched fra API
  const [filteredBands, setFilteredBands] = useState([]); // State for filtrering af bands
  const [isSorted, setIsSorted] = useState(false); // State for at tracke sortering
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

  const toggleSort = () => {
    if (isSorted) {
      setFilteredBands([...bands]); // Nulstil til original rækkefølge
    } else {
      const sortedBands = [...filteredBands].sort((a, b) => a.name.localeCompare(b.name));
      setFilteredBands(sortedBands);
    }
    setIsSorted(!isSorted); // Skift sorteringsstatus
  };

  return (
    <div>
      <HeaderBillede billede={ContactHero} />
      <section className="mx-mx_default lg:mx-mx_lg py-py_default lg:py-py_lg flex flex-col gap-4">
        <Card>
          <HeaderText h1="Lineup" text="Get ready for an unforgettable festival experience with 126 incredible bands across multiple stages. Discover your new favorite artists and enjoy a week of diverse music, energy, and pure festival vibes!" />

          <div className="flex justify-between items-center mb-4">
            <section>
              {/* Filter Button */}
              <Button onClick={() => setIsFiltersOpen(true)} size="lg">
                <IoFilter />
                <span>Filters</span>
              </Button>

              {/* FilterPanel Component */}
              <AnimatePresence mode="wait">
                {isFiltersOpen && (
                  <motion.div
                    variants={panelSlide} // Use the animation variants
                    initial="initial"
                    animate="enter"
                    exit="exit"
                    className="fixed bg-white top-0 left-0 w-full h-full md:w-[300px] z-50 overflow-y-auto px-[20px] py-[28px]"
                  >
                    <FilterPanel filters={filters} setFilters={setFilters} schedule={schedule} daysMap={daysMap} bands={bands} closeFilter={() => setIsFiltersOpen(false)} />
                  </motion.div>
                )}
              </AnimatePresence>
            </section>

            <section>
              {/* a-z knap */}
              <Button size="lg" variant="outline" onClick={toggleSort} className={`${isSorted ? "bg-red_color text-white_color" : ""}`}>
                Sort A-Z {/* Skift tekst baseret på sorteringstilstand */}
              </Button>
            </section>
          </div>

          {/* Main Band Grid */}
          <section className={`transition-transform duration-300 ${isFiltersOpen ? "opacity-50" : "opacity-100"} grid grid-cols-2 lg:grid-cols-4 gap-4`}>
            {filteredBands.slice(0, visibleCount).map((band) => (
              <article key={band.slug} className="relative w-full h-[300px] bg-less_black_color rounded overflow-hidden transition-transform hover:scale-105 group">
                <Image src={band.logo.startsWith("http") ? band.logo : `/logos/${band.logo}`} width={100} height={100} className="relative w-full h-[300px] brightness-50" alt={band.name} />
                <div className="absolute inset-0 bg-black_color bg-opacity-20 flex items-end p-4 group-hover:bg-opacity-0">
                  <Link href={`/band/${band.slug}`} className="absolute text-white_color text-step_text_large font-bold inset-0 flex justify-center items-end p-5">
                    {band.name}
                  </Link>
                </div>
              </article>
            ))}
          </section>
          {visibleCount < filteredBands.length && (
            <div className="mt-4 flex items-center justify-between">
              <span className="text-less_black_color text-step_p">
                {Math.min(visibleCount, filteredBands.length)} out of {filteredBands.length} bands
              </span>
              <Button
                variant="default"
                className="text-white_color"
                size="lg"
                onClick={() => setVisibleCount((prevCount) => prevCount + 12)} // Vis 30 flere kunstnere ad gangen
              >
                Load more
              </Button>
            </div>
          )}
        </Card>
      </section>
    </div>
  );
};

export default Page;
