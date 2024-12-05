"use client";
import { useState, useEffect } from "react";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";

const Page = () => {
  // State for bands fetched from the API
  const [bands, setBands] = useState([]);
  // State for the schedule fetched from the API
  const [schedule, setSchedule] = useState({});
  // State for the filtered list of bands to display
  const [filteredBands, setFilteredBands] = useState([]);
  // State for the current filters (genre, day, stage)
  const [filters, setFilters] = useState({
    genre: "",
    day: "",
    stage: "",
  });
  const [isOpen, setIsOpen] = useState(false); // Styrer, om accordion er åbent

  // Fetch data from the APIs when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch bands data
        const bandsResponse = await fetch("https://lively-scrawny-secretary.glitch.me/bands");
        const bandsData = await bandsResponse.json();

        // Fetch schedule data
        const scheduleResponse = await fetch("https://lively-scrawny-secretary.glitch.me/schedule");
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
    if (filters.genre) {
      updatedBands = updatedBands.filter((band) => band.genre === filters.genre);
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
          <p className="text-[1.125rem] my-[20px] font-semibold">Stages</p>
          {/* Dropdown for filtering by stage */}
          <select className="border rounded p-2" onChange={(e) => setFilters({ ...filters, stage: e.target.value })} value={filters.stage}>
            <option value="">All Stages</option>
            {/* Create a list of stages from the schedule keys */}
            {Object.keys(schedule).map((stage) => (
              <option key={stage} value={stage}>
                {stage}
              </option>
            ))}
          </select>

          {/* Dropdown for filtering by genre */}
          <div>
            <button onClick={() => setIsOpen(!isOpen)} className="flex w-full justify-between items-center font-semibold my-[20px]">
              Genre {isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
            </button>

            {isOpen && (
              <form className="flex flex-col items-start" onChange={(e) => setFilters({ ...filters, genre: e.target.value })} value={filters.genre}>
                {/* radio buttons for hver genre */}
                {Array.from(new Set(bands.map((band) => band.genre))).map((genre) => (
                  <label key={genre} value={genre} className="flex items-center cursor-pointer my-[8px]">
                    <input type="radio" name="genre" value={genre} checked={filters.genre === genre} onChange={() => {}} className="hidden" />
                    <span className={`w-[18px] h-[18px] rounded-full border border-1 border-white mr-[18px] flex justify-center items-center cursor-pointer ${filters.genre === genre ? "bg-white border-white " : "border-white"}`}>
                      {/* Indre cirkel, når radio button er valgt */}
                      {filters.genre === genre && <span className="w-2.5 h-2.5 bg-black rounded-full"></span>}
                    </span>
                    <span>{genre}</span>
                  </label>
                ))}
              </form>
            )}
          </div>
          <select className="border rounded p-2" onChange={(e) => setFilters({ ...filters, genre: e.target.value })} value={filters.genre}>
            <option value="">All Genres</option>
            {/* Create a unique list of genres from the bands and populate the dropdown */}
            {Array.from(new Set(bands.map((band) => band.genre))).map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </select>

          {/* Dropdown for filtering by day */}
          <select className="border rounded p-2" onChange={(e) => setFilters({ ...filters, day: e.target.value })} value={filters.day}>
            <option value="">All Days</option>
            {/* Predefined list of days */}
            {["mon", "tue", "wed", "thu", "fri", "sat", "sun"].map((day) => (
              <option key={day} value={day}>
                {day.charAt(0).toUpperCase() + day.slice(1)}
              </option>
            ))}
          </select>
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
