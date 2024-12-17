import { IoCloseOutline } from "react-icons/io5";
import { Button } from "./ui/button";

const FilterPanel = ({ filters, setFilters, schedule, daysMap, bands, closeFilter }) => {
  // Framer Motion animation-variabler

  return (
    <div className="">
      <div className="flex flex-col justify-between items-center mb-[24px]">
        <button onClick={closeFilter} className="self-end text-lg hover:text-red_color transition-base">
          <IoCloseOutline className="w-12 h-12 " />
        </button>
        <h4 className="self-start ">Filters</h4>
      </div>
      <hr />

      {/* Filter: Days */}
      <article className="py-[16px]">
        <div className="flex justify-between items-center mb-2">
          <p className="font-semibold">Days</p>
          <button onClick={() => setFilters({ ...filters, day: [] })} className="text-xs text-grey_color underline">
            Clear
          </button>
        </div>
        <form className="space-y-2">
          {Object.keys(daysMap).map((fullDayName) => (
            <label key={fullDayName} className="flex items-center space-x-2 text-sm cursor-pointer">
              <input
                type="checkbox"
                value={daysMap[fullDayName]}
                checked={filters.day.includes(daysMap[fullDayName])}
                onChange={(e) => {
                  const selectedDay = e.target.value;
                  const updatedDays = e.target.checked ? [...filters.day, selectedDay] : filters.day.filter((day) => day !== selectedDay);
                  setFilters({ ...filters, day: updatedDays });
                }}
                className="form-checkbox text-black_color border-grey_color rounded"
              />
              <span className="text-step_text_regular">{fullDayName}</span>
            </label>
          ))}
        </form>
      </article>

      <hr />

      {/* Filter: Stages */}
      <article className="py-[16px]">
        <div className="flex justify-between items-center mb-2">
          <p className="font-semibold">Stages</p>
          <button onClick={() => setFilters({ ...filters, stage: [] })} className="text-xs text-grey_color underline">
            Clear
          </button>
        </div>
        <form className="space-y-2">
          {Object.keys(schedule).map((stage) => (
            <label key={stage} className="flex items-center space-x-2 text-sm cursor-pointer">
              <input
                type="checkbox"
                value={stage}
                checked={filters.stage.includes(stage)}
                onChange={(e) => {
                  const selectedStage = e.target.value;
                  const updatedStages = e.target.checked ? [...filters.stage, selectedStage] : filters.stage.filter((stage) => stage !== selectedStage);
                  setFilters({ ...filters, stage: updatedStages });
                }}
                className="form-checkbox text-black_color border-grey_color rounded"
              />
              <span className="text-step_text_regular">{stage}</span>
            </label>
          ))}
        </form>
      </article>

      <hr />

      {/* Filter: Genre */}
      <article className="py-[16px]">
        <div className="flex justify-between items-center mb-2">
          <p className="font-semibold">Genre</p>
          <button onClick={() => setFilters({ ...filters, genre: [] })} className="text-xs text-grey_color underline">
            Clear
          </button>
        </div>
        <form className="space-y-2">
          {Array.from(new Set(bands.map((band) => band.genre))).map((genre) => (
            <label key={genre} className="flex items-center space-x-2 text-sm cursor-pointer">
              <input
                type="checkbox"
                value={genre}
                checked={filters.genre.includes(genre)}
                onChange={(e) => {
                  const selectedGenre = e.target.value;
                  const updatedGenreFilters = e.target.checked ? [...filters.genre, selectedGenre] : filters.genre.filter((g) => g !== selectedGenre);
                  setFilters({ ...filters, genre: updatedGenreFilters });
                }}
                className="form-checkbox text-black_color border-grey_color rounded"
              />
              <span className="text-step_text_regular">{genre}</span>
            </label>
          ))}
        </form>
      </article>

      <hr className="border-grey_color" />

      <Button variant="outline" onClick={closeFilter} className="mt-4 w-full ">
        Apply Filters
      </Button>
    </div>
  );
};

export default FilterPanel;
