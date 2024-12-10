"use client";
import { useState, useEffect } from "react";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import Link from "next/link";
import { api } from "@/lib/api"; // Importer api her
import { Button } from "@/components/ui/Button";
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

  // Styrer om accordion er åbent på de forskellige kategorier
  // const [isStagesOpen, setIsStagesOpen] = useState(false);
  // const [isGenreOpen, setIsGenreOpen] = useState(false);
  // const [isDaysOpen, setIsDaysOpen] = useState(false);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  // Random billeder fra Unsplash
  // const defaultImages = ["/images/nathan-bingle-sN2j2z2Oc7U-unsplash.jpg", "/images/hans-eiskonen-fzEc8omEqfw-unsplash.jpg", "/images/israel-caballero-tlBi_vbVly8-unsplash.jpg", "/images/maeva-vigier-Akitbu5uH7A-unsplash.jpg"];

  // const getRandomImage = () => {
  //   return defaultImages[Math.floor(Math.random() * defaultImages.length)];
  // };

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
    // Når man har klikket på et bandt og går tilbage, skal filtrene gemmes så de er der når man kommer tilbage
    // Hvad med der hvor der ikke er noget logo / billede på bands???
    // Skal der være et filter på band billedet? teksten er ovenpå og ikke læsbar
    // Skal der filter på billedet?

    <div className="">
      <div
        style={{
          backgroundImage: "url('/images/jodie-walton-unsplash.jpg')",
          backgroundRepeat: "no-repeat",
          backgroundColor: "black",
        }}
        className="w-full h-[250px] py-[64px] lg:py-[112px] bg-center bg-fill bg-cover bg-black bg-opacity-50"
      >
        <h1 className="font-black text-white text-center">Lineup</h1>
      </div>
      {/* <GSAPTextReveal /> */}
      <div className="mx-[20px] lg:mx-[64px] py-[64px] lg:py-[112px] flex flex-col gap-4">
        <section>
          {/* Filter Button */}

          <Button onClick={() => setIsFiltersOpen(true)} className="top-4 left-4 z-50 bg-black text-white py-2 px-4 rounded">
            Filters
          </Button>

          {/* Off-canvas Filter Panel */}
          <div className={`px-[20px] py-[48px] fixed text-text_color top-0 left-0 h-full w-full md:w-[400px] bg-primary z-50 transition-transform duration-300 ${isFiltersOpen ? "translate-x-0" : "-translate-x-full"}`}>
            <div className="flex justify-between items-center mb-[24px]">
              <h5 className="">Filters</h5>
              <button onClick={() => setIsFiltersOpen(false)} className="text-lg hover:text-gray-500">
                ✕
              </button>
            </div>
            <hr />
            <div className="py-[16px]">
              {/* Filter: Stages */}
              <div className="flex justify-between items-center mb-2">
                <p className="font-semibold">Stages</p>
                <button onClick={() => setFilters({ ...filters, stage: "" })} className="text-xs text-gray-500 underline">
                  Clear
                </button>
              </div>
              <form
                className="space-y-2"
                onChange={(e) => {
                  const updatedStageFilters = e.target.checked ? [...filters.stage, e.target.value] : filters.stage.filter((stage) => stage !== e.target.value);
                  setFilters({ ...filters, stage: updatedStageFilters });
                }}
              >
                {Object.keys(schedule).map((stage) => (
                  <label key={stage} className="flex items-center space-x-2 text-sm cursor-pointer">
                    <input type="checkbox" value={stage} checked={filters.stage.includes(stage)} className="form-checkbox text-black border-gray-300 rounded" />
                    <span>{stage}</span>
                  </label>
                ))}
              </form>
            </div>

            <hr className="border-gray-300" />

            {/* Filter: Genre */}
            <div className="py-[16px]">
              <div className="flex justify-between items-center mb-2">
                <p className="font-semibold">Genre</p>
                <button onClick={() => setFilters({ ...filters, genre: "" })} className="text-xs text-gray-500 underline">
                  Clear
                </button>
              </div>
              <form
                className="space-y-2"
                onChange={(e) => {
                  const updatedGenreFilters = e.target.checked ? [...filters.genre, e.target.value] : filters.genre.filter((genre) => genre !== e.target.value);
                  setFilters({ ...filters, genre: updatedGenreFilters });
                }}
              >
                {Array.from(new Set(bands.map((band) => band.genre))).map((genre) => (
                  <label key={genre} className="flex items-center space-x-2 text-sm cursor-pointer">
                    <input type="checkbox" value={genre} checked={filters.genre.includes(genre)} className="form-checkbox text-black border-gray-300 rounded" />
                    <span>{genre}</span>
                  </label>
                ))}
              </form>
            </div>

            <hr className="border-gray-300" />

            {/* Filter: Days */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <p className="font-semibold">Days</p>
                <button onClick={() => setFilters({ ...filters, day: "" })} className="text-xs text-gray-500 underline">
                  Clear
                </button>
              </div>
              <form
                className="space-y-2"
                onChange={(e) => {
                  const updatedDayFilters = e.target.checked ? [...filters.day, e.target.value] : filters.day.filter((day) => day !== e.target.value);
                  setFilters({ ...filters, day: updatedDayFilters });
                }}
              >
                {["mon", "tue", "wed", "thu", "fri", "sat", "sun"].map((day) => (
                  <label key={day} className="flex items-center space-x-2 text-sm cursor-pointer">
                    <input type="checkbox" value={day} checked={filters.day.includes(day)} className="form-checkbox text-black border-gray-300 rounded" />
                    <span>{day.charAt(0).toUpperCase() + day.slice(1)}</span>
                  </label>
                ))}
              </form>
            </div>

            <button onClick={() => setIsFiltersOpen(false)} className="mt-4 w-full bg-black text-white py-2 rounded">
              Apply Filters
            </button>
          </div>
        </section>

        {/* Main Band Grid */}
        <section className={`transition-transform duration-300 ${isFiltersOpen ? "opacity-50" : "opacity-100"} grid grid-cols-2 lg:grid-cols-4 gap-4`}>
          {filteredBands.map((band) => (
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
      </div>
    </div>
  );
};

export default Page;

{
  /* <section className="mx-[20px] lg:mx-[64px] py-[64px] lg:py-[112px] flex flex-col lg:flex-row gap-[64px]">
        <article className="lg:w-1/4">
          <h5 className="font-bold mb-[24px]">Filters</h5>
          <hr />

          <div>
            <button onClick={() => setIsStagesOpen(!isStagesOpen)} className="flex w-full justify-between items-center font-semibold my-[20px]">
              Stages {isStagesOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
            </button>
            {isStagesOpen && (
              <form
                className="flex flex-col items-start"
                onChange={(e) => {
                  const updatedStageFilters = e.target.checked
                    ? [...filters.stage, e.target.value] // Tilføj hvis checked
                    : filters.stage.filter((stage) => stage !== e.target.value); // Fjern hvis unchecked
                  setFilters({ ...filters, stage: updatedStageFilters });
                }}
                value={filters.stage}
              >
                {Object.keys(schedule).map((stage) => (
                  <label key={stage} value={stage} className="flex items-center cursor-pointer my-[8px]">
                    <input type="checkbox" name="stage" value={stage} checked={filters.stage.includes(stage)} onChange={() => {}} className="hidden" />
                    <span className={`w-[18px] h-[18px] border border-1 border-white mr-[18px] flex justify-center items-center cursor-pointer ${filters.stage.includes(stage) ? "bg-white border-white" : "border-white"}`}>{filters.stage.includes(stage) && <span className="w-2.5 h-2.5 bg-black rounded-full"></span>}</span>
                    <span>{stage}</span>
                  </label>
                ))}
              </form>
            )}
          </div>

          <hr />

          <div>
            <button onClick={() => setIsGenreOpen(!isGenreOpen)} className="flex w-full justify-between items-center font-semibold my-[20px]">
              Genre {isGenreOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
            </button>
            {isGenreOpen && (
              <form
                className="flex flex-col items-start"
                onChange={(e) => {
                  const updatedGenreFilters = e.target.checked
                    ? [...filters.genre, e.target.value] // Tilføj hvis checked
                    : filters.genre.filter((genre) => genre !== e.target.value); // Fjern hvis unchecked
                  setFilters({ ...filters, genre: updatedGenreFilters });
                }}
                value={filters.genre}
              >
                {Array.from(new Set(bands.map((band) => band.genre))).map((genre) => (
                  <label key={genre} value={genre} className="flex items-center cursor-pointer my-[8px]">
                    <input type="checkbox" name="genre" value={genre} checked={filters.genre.includes(genre)} onChange={() => {}} className="hidden" />
                    <span className={`w-[18px] h-[18px] border border-1 border-white mr-[18px] flex justify-center items-center cursor-pointer ${filters.genre.includes(genre) ? "bg-white border-white " : "border-white"}`}>{filters.genre.includes(genre) && <span className="w-2.5 h-2.5 bg-black"></span>}</span>
                    <span>{genre}</span>
                  </label>
                ))}
              </form>
            )}
          </div>
          <hr />

          <div>
            <button onClick={() => setIsDaysOpen(!isDaysOpen)} className="flex w-full justify-between items-center font-semibold my-[20px]">
              Days {isDaysOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
            </button>

            {isDaysOpen && (
              <form
                className="flex flex-col items-start"
                onChange={(e) => {
                  const updatedDayFilters = e.target.checked
                    ? [...filters.day, e.target.value] // Tilføj hvis checked
                    : filters.day.filter((day) => day !== e.target.value); // Fjern hvis unchecked
                  setFilters({ ...filters, day: updatedDayFilters });
                }}
                value={filters.day}
              >
                {["mon", "tue", "wed", "thu", "fri", "sat", "sun"].map((day) => (
                  <label key={day} value={day} className="flex items-center cursor-pointer my-[8px]">
                    <input type="checkbox" name="day" value={day} checked={filters.day.includes(day)} onChange={() => {}} className="hidden" />
                    <span className={`w-[18px] h-[18px] border border-1 border-white mr-[18px] flex justify-center items-center cursor-pointer ${filters.day.includes(day) ? "bg-white border-white" : "border-white"}`}>{filters.day.includes(day) && <span className="w-2.5 h-2.5 bg-black rounded-full"></span>}</span>
                    <span>{day.charAt(0).toUpperCase() + day.slice(1)}</span>
                  </label>
                ))}
              </form>
            )}
          </div>
          <hr />
        </article>

        <article className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredBands.map((band) => (
            <div key={band.slug} className="relative w-[290px] h-[296px] transition-transform hover:scale-105 group">
              <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${band.logo})` }} />
              <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-0" />
              <Link href={`/band/${band.slug}`} className="absolute inset-0 flex items-end p-5">
                <h2 className="text-xl font-bold text-white">{band.name}</h2>
              </Link>
            </div>
          ))}
        </article>
      </section> */
}
