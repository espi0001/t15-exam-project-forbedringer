"use client";
import { useState, useEffect } from "react";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";

const Page = () => {
  const [bands, setBands] = useState([]); // State for bands fetched from the API
  const [schedule, setSchedule] = useState({}); // State for the schedule fetched from the API
  const [filteredBands, setFilteredBands] = useState([]); // State for the filtered list of bands to display
  // State for the current filters (genre, day, stage)
  const [filters, setFilters] = useState({
    genre: "",
    day: "",
    stage: "",
  });

  // Styrer om accordion er åbent på de forskellige kategorier
  const [isStagesOpen, setIsStagesOpen] = useState(false);
  const [isGenreOpen, setIsGenreOpen] = useState(false);
  const [isDaysOpen, setIsDaysOpen] = useState(false);

  // Fetch data from the APIs when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch bands data
        const bandsResponse = await fetch("http://localhost:8080/bands");
        const bandsData = await bandsResponse.json();

        // Fetch schedule data
        const scheduleResponse = await fetch("http://localhost:8080/schedule");
        const scheduleData = await scheduleResponse.json();

        // Combine bands data with their schedule information
        const updatedBands = bandsData.map((band) => {
          // Find all schedule slots for this band
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
          // Add the schedule information to the band object
          return { ...band, schedules: bandSchedules };
        });

        // Set state with the combined data
        setBands(updatedBands);
        setFilteredBands(updatedBands); // Initialize filteredBands with all bands
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

    // Filter by genre if a genre is selected
    if (filters.genre.length > 0) {
      updatedBands = updatedBands.filter((band) => filters.genre.includes(band.genre));
    }

    // Filter by day if a day is selected
    if (filters.day) {
      updatedBands = updatedBands.filter((band) => band.schedules.some((schedule) => schedule.day === filters.day));
    }

    // Filter by stage if a stage is selected
    if (filters.stage) {
      updatedBands = updatedBands.filter((band) => band.schedules.some((schedule) => schedule.stage === filters.stage));
    }

    // Update the state with the filtered bands
    setFilteredBands(updatedBands);
  }, [filters, bands]);

  return (
    <div className="mx-[20px] py-[64px] lg:mx-[64px] lg:py-[112px]">
      <h1 className="mb-[48px] lg:mb-[80px]">Line-up</h1>

      <section className="flex flex-col lg:flex-row gap-[64px]">
        {/* Filter Controls */}
        <article className="lg:w-1/4">
          <h5 className="font-bold mb-[24px]">Filters</h5>
          <hr />

          <div>
            <button onClick={() => setIsStagesOpen(!isStagesOpen)} className="flex w-full justify-between items-center font-semibold my-[20px]">
              Stages {isStagesOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
            </button>
            {isStagesOpen && (
              <form className="flex flex-col items-start" onChange={(e) => setFilters({ ...filters, stage: e.target.value })} value={filters.stage}>
                {/* radio buttons for hver genre */}
                {Object.keys(schedule).map((stage) => (
                  <label key={stage} value={stage} className="flex items-center cursor-pointer my-[8px]">
                    <input type="checkbox" name="stage" value={stage} checked={filters.stage === stage} onChange={() => {}} className="hidden" />
                    <span className={`w-[18px] h-[18px] rounded-full border border-1 border-white mr-[18px] flex justify-center items-center cursor-pointer ${filters.stage === stage ? "bg-white border-white " : "border-white"}`}>
                      {/* Indre cirkel, når radio button er valgt */}
                      {filters.stage === stage && <span className="w-2.5 h-2.5 bg-black rounded-full"></span>}
                    </span>
                    <span>{stage}</span>
                  </label>
                ))}
              </form>
            )}
          </div>

          <hr />
          {/* Dropdown for filtering by genre */}
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
          {/* days */}
          <div>
            <button onClick={() => setIsDaysOpen(!isDaysOpen)} className="flex w-full justify-between items-center font-semibold my-[20px]">
              All Days {isDaysOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
            </button>

            {isDaysOpen && (
              <form className="flex flex-col items-start" onChange={(e) => setFilters({ ...filters, day: e.target.value })} value={filters.day}>
                {/* Predefined list of days */}

                {["mon", "tue", "wed", "thu", "fri", "sat", "sun"].map((day) => (
                  <label key={day} value={day} className="flex items-center cursor-pointer my-[8px]">
                    <input type="radio" name="day" value={day} checked={filters.day === day} onChange={() => {}} className="hidden" />
                    <span className={`w-[18px] h-[18px] rounded-full border border-1 border-white mr-[18px] flex justify-center items-center cursor-pointer ${filters.day === day ? "bg-white border-white " : "border-white"}`}>
                      {/* Indre cirkel, når radio button er valgt */}
                      {filters.day === day && <span className="w-2.5 h-2.5 bg-black rounded-full"></span>}
                    </span>
                    <span>{day.charAt(0).toUpperCase() + day.slice(1)}</span>
                  </label>
                ))}
              </form>
            )}
          </div>
        </article>

        {/* Band List */}
        <article className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Render each band in the filtered list */}
          {filteredBands.map((band) => (
            <div key={band.slug} className="border rounded p-4">
              <h2 className="text-xl font-bold">{band.name}</h2>
              <p className="text-gray-600">{band.genre}</p>
              <div>
                {/* Show the band's schedule if available */}
                {band.schedules.length > 0 ? (
                  band.schedules.map((schedule, index) => (
                    <p key={index} className="text-sm text-gray-500">
                      {schedule.day.toUpperCase()} - {schedule.stage} ({schedule.start} - {schedule.end})
                    </p>
                  ))
                ) : (
                  // Display message if no schedule is available
                  <p className="text-sm text-gray-500">No schedule available</p>
                )}
              </div>
            </div>
          ))}
        </article>
      </section>
    </div>
  );
};

export default Page;
