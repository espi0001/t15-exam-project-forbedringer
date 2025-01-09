import { IoCloseOutline } from "react-icons/io5";
import { Button } from "./ui/button";
import { useEffect, useRef } from "react";

const FilterPanel = ({ filters, setFilters, schedule, daysMap, bands, closeFilter }) => {
  const panelRef = useRef(null); // Create a ref for the filter panel

  // Close filter panel if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (panelRef.current && !panelRef.current.contains(event.target)) {
        closeFilter();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [closeFilter]);

  return (
    <div ref={panelRef} className="">
      <div className="flex flex-col justify-between items-center mb-[24px]">
        <button onClick={closeFilter} className="self-end text-lg hover:text-red_color transition-base">
          <IoCloseOutline className="w-12 h-12 " />
        </button>
        <h2 className="self-start text-step_h4">Filters</h2>
      </div>
      <hr />

      {/* Filter: Days */}
      <article className="py-[16px]">
        <div className="flex justify-between items-center mb-2">
          <p className="font-semibold">Days</p>
          {/* Clear button */}
          <button onClick={() => setFilters({ ...filters, day: [] })} className="text-xs text-less_black_color underline">
            Clear
          </button>
        </div>
        <form className="space-y-2">
          {/* Looper igennem daysMap og viser checkboxer for hver dag */}
          {Object.keys(daysMap).map((fullDayName) => {
            // Beregn antallet af bands for denne dag
            const count = bands
              .filter((band) => band.schedules.some((schedule) => schedule.day === daysMap[fullDayName]))
              .filter((band) => {
                // Tjek, om bandet opfylder andre aktive filtre
                const matchesGenre = filters.genre.length === 0 || filters.genre.includes(band.genre);
                const matchesStage = filters.stage.length === 0 || band.schedules.some((schedule) => filters.stage.includes(schedule.stage));
                return matchesGenre && matchesStage;
              }).length;

            return (
              <label key={fullDayName} className="flex items-center space-x-2 text-sm cursor-pointer">
                {/* Checkbox for hver dag */}
                <input
                  type="checkbox"
                  value={daysMap[fullDayName]} // dagens korte navn fra daysMap
                  checked={filters.day.includes(daysMap[fullDayName])}
                  onChange={(e) => {
                    const selectedDay = e.target.value; // Henter den dag der er valgt
                    const updatedDays = e.target.checked
                      ? [...filters.day, selectedDay] // Hvis checkboxen er checked, tilføjer vi den dag til filters.day
                      : filters.day.filter((day) => day !== selectedDay); // Hvis checkboxen er unchecked, fjerner vi den dag fra filters.day
                    setFilters({ ...filters, day: updatedDays }); // Opdaterer filters.day med de nye dage
                  }}
                  className="form-checkbox text-black_color border-less_black_color rounded"
                />
                {/* Viser fulde navn for dagen */}
                <span className="text-step_text_regular">{fullDayName}</span>
                {/* Viser antallet af bands for dagen */}
                <span className="text-xs text-gray-500 ml-2">({count})</span>
              </label>
            );
          })}
        </form>
      </article>

      <hr />

      {/* Filter: Stages */}
      <article className="py-[16px]">
        <div className="flex justify-between items-center mb-2">
          <p className="font-semibold">Stages</p>
          {/* Clear button */}
          <button onClick={() => setFilters({ ...filters, stage: [] })} className="text-xs text-less_black_color underline">
            Clear
          </button>
        </div>
        <form className="space-y-2">
          {Object.keys(schedule).map((stage) => {
            // Beregn antallet af bands for denne scene
            const count = bands
              .filter((band) => band.schedules.some((schedule) => schedule.stage === stage))
              .filter((band) => {
                // Tjek, om bandet opfylder andre aktive filtre
                const matchesGenre = filters.genre.length === 0 || filters.genre.includes(band.genre);
                const matchesDay = filters.day.length === 0 || band.schedules.some((schedule) => filters.day.includes(schedule.day));
                return matchesGenre && matchesDay;
              }).length;

            return (
              <label key={stage} className="flex items-center space-x-2 text-sm cursor-pointer">
                <input
                  type="checkbox"
                  value={stage}
                  checked={filters.stage.includes(stage)}
                  onChange={(e) => {
                    const selectedStage = e.target.value;
                    const updatedStages = e.target.checked ? [...filters.stage, selectedStage] : filters.stage.filter((s) => s !== selectedStage);
                    setFilters({ ...filters, stage: updatedStages });
                  }}
                  className="form-checkbox text-black_color border-less_black_color rounded"
                />
                <span className="text-step_text_regular">{stage}</span>
                <span className="text-xs text-gray-500 ml-2">({count})</span>
              </label>
            );
          })}
        </form>
      </article>

      <hr />

      {/* Filter: Genre */}
      <article className="py-[16px]">
        <div className="flex justify-between items-center mb-2">
          <p className="font-semibold">Genre</p>
          {/* Clear button */}
          <button onClick={() => setFilters({ ...filters, genre: [] })} className="text-xs text-less_black_color underline">
            Clear
          </button>
        </div>
        <form className="space-y-2">
          {Array.from(new Set(bands.map((band) => band.genre))).map((genre) => {
            // Beregn antallet af bands for denne genre
            const count = bands
              .filter((band) => band.genre === genre)
              .filter((band) => {
                // Tjek, om bandet opfylder andre aktive filtre
                const matchesDay = filters.day.length === 0 || band.schedules.some((schedule) => filters.day.includes(schedule.day));
                const matchesStage = filters.stage.length === 0 || band.schedules.some((schedule) => filters.stage.includes(schedule.stage));
                return matchesDay && matchesStage;
              }).length;

            return (
              <label key={genre} className="flex items-center space-x-2 text-sm cursor-pointer">
                {/* Checkbox for hver genre */}
                <input
                  type="checkbox"
                  value={genre}
                  checked={filters.genre.includes(genre)}
                  onChange={(e) => {
                    const selectedGenre = e.target.value; // Henter genren
                    const updatedGenreFilters = e.target.checked
                      ? [...filters.genre, selectedGenre] // Tilføjer genre, hvis checkboxen er checked
                      : filters.genre.filter((g) => g !== selectedGenre); // Fjerner genre, hvis checkboxen er unchecked
                    setFilters({ ...filters, genre: updatedGenreFilters }); // Opdaterer filters.genre
                  }}
                  className="form-checkbox text-black_color border-less_black_color rounded"
                />
                {/* Vis navnet på genren */}
                <span className="text-step_text_regular">{genre}</span>
                {/* Vis antal bands for genren */}
                <span className="text-xs text-gray-500 ml-2">({count})</span>
              </label>
            );
          })}
        </form>
      </article>

      <hr className="border-less_black_color" />

      <Button variant="outline" onClick={closeFilter} className="mt-4 w-full ">
        Apply Filters
      </Button>
    </div>
  );
};

export default FilterPanel;
