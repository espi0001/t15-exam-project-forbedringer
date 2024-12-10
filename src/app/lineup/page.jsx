"use client";
import { useState, useEffect } from "react";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import Link from "next/link";
import GSAPTextReveal from "@/components/GSAPTextReveal";
import { api } from "@/lib/api"; // Importer api her
import gsap from "gsap";

const Page = () => {
  const [bands, setBands] = useState([]); // State for bands fetched fra API

  // hvorfor er der {} her og ikke []?
  const [schedule, setSchedule] = useState({}); // State for schedule fetched fra API
  const [filteredBands, setFilteredBands] = useState([]); // State for filtrering af bands
  const [filters, setFilters] = useState({
    genre: "",
    day: "",
    stage: "",
  }); // Filters for genre, day og stage

  // Styrer om accordion er åbent på de forskellige kategorier
  const [isStagesOpen, setIsStagesOpen] = useState(false);
  const [isGenreOpen, setIsGenreOpen] = useState(false);
  const [isDaysOpen, setIsDaysOpen] = useState(false);

  // Random billeder fra Unsplash
  const defaultImages = ["/images/nathan-bingle-sN2j2z2Oc7U-unsplash.jpg", "/images/hans-eiskonen-fzEc8omEqfw-unsplash.jpg", "/images/israel-caballero-tlBi_vbVly8-unsplash.jpg", "/images/maeva-vigier-Akitbu5uH7A-unsplash.jpg"];

  const getRandomImage = () => {
    return defaultImages[Math.floor(Math.random() * defaultImages.length)];
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
          const bandLogo = !band.logo ? getRandomImage() : band.logo;
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
    // mangler nogle effekter på siden + den ser lidt kedelig ud.
    // skal filtre være komponenter? hvordan ville man gøre det?
    // Kan man ændre sådan så billedet også bliver et link her på siden ?
    // Tilføj noget hover på bands grid
    // Når man har klikket på et bandt og går tilbage, skal filtrene gemmes så de er der når man kommer tilbage
    // Hvad med der hvor der ikke er noget logo / billede på bands???
    // Skal der være et filter på band billedet? teksten er ovenpå og ikke læsbar

    // Fonten er ikke så læsbar (kig på sigleview)
    // Skal der filter på billedet?
    // skal den se anderledes ud?

    // ANDET
    // mapper i komponentet? forsår ikke der er så mange komponenter
    // tjekke styling på alle siderne om de er ens
    // vi skal bruge config eller sådan noget
    // billetter skal være på en ny side for sig selv - Skal også se lidt anderledes ud
    // mangler events siden
    // about er lidt lang og ikke nødvendigvis "ens" - Måske der skal være en undermenu på den?
    // Hvad mangler vi ellers?
    // Kan vi have noget loading agtigt som på sebs praktik side? sådan så det er mere spændende at komme ind på siden?

    <div className="mx-[20px] py-[64px] lg:mx-[64px] lg:py-[112px]">
      <GSAPTextReveal />
      {/* Filter Controls */}
      <section className="flex flex-col lg:flex-row gap-[64px]">
        <article className="lg:w-1/4">
          <h5 className="font-bold mb-[24px]">Filters</h5>
          <hr />
          {/* accordion for stages */}
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
          {/* Accordion for genre */}
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
                {/* Checkboxes buttons for hver genre */}
                {Array.from(new Set(bands.map((band) => band.genre))).map((genre) => (
                  <label key={genre} value={genre} className="flex items-center cursor-pointer my-[8px]">
                    <input type="checkbox" name="genre" value={genre} checked={filters.genre.includes(genre)} onChange={() => {}} className="hidden" />
                    <span className={`w-[18px] h-[18px] border border-1 border-white mr-[18px] flex justify-center items-center cursor-pointer ${filters.genre.includes(genre) ? "bg-white border-white " : "border-white"}`}>
                      {/* Indre cirkel, når radio button er valgt */}
                      {filters.genre.includes(genre) && <span className="w-2.5 h-2.5 bg-black"></span>}
                    </span>
                    <span>{genre}</span>
                  </label>
                ))}
              </form>
            )}
          </div>
          <hr />
          {/* Accordion for days */}
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

        {/* Band List */}
        <article className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Render each band in the filtered list */}
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
      </section>
    </div>
  );
};

export default Page;
