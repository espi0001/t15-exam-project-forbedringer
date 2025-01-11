import { IoCloseOutline } from "react-icons/io5"; // Ikon
import { useEffect, useRef } from "react"; // Importerer React hooks: useEffect (sideeffekter) og useRef (referencer)
// Komponenter
import { Button } from "./ui/button";
import ClearButton from "./ClearButton";

const FilterPanel = ({ filters, setFilters, schedule, daysMap, bands, closeFilter }) => {
  const panelRef = useRef(null); // Opretter en reference til filterpanelet for at detektere klik udenfor

  // Luk filterpanelet, hvis brugeren klikker udenfor det
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (panelRef.current && !panelRef.current.contains(event.target)) {
        closeFilter(); // Lukker filterpanelet
      }
    };

    document.addEventListener("mousedown", handleClickOutside); // Lytter efter klik udenfor
    return () => {
      document.removeEventListener("mousedown", handleClickOutside); // Fjerner event listener
    };
  }, [closeFilter]); // Dependency array: kører kun når `closeFilter` ændrer sig

  return (
    <div ref={panelRef}>
      <div className="flex flex-col justify-between items-center mb-[24px]">
        <button onClick={closeFilter} className="self-end text-lg hover:text-red_color transition-base">
          <IoCloseOutline className="w-12 h-12 " />
        </button>
        <p className="self-start text-step_h4">Filters</p>
      </div>
      <hr />

      {/* Filter: Days */}
      <article className="py-[16px]">
        <div className="flex justify-between items-center mb-2">
          <p className="font-semibold text-step_text_large">Days</p>
          {/* Clear button som komponent */}
          <ClearButton onClick={() => setFilters({ ...filters, day: [] })} label="Clear" />
        </div>
        <form className="space-y-2">
          {/* Looper igennem daysMap og viser checkboxer for hver dag */}
          {Object.keys(daysMap).map((fullDayName) => {
            // Beregn antallet af bands for denne dag og matcher andre aktive filtre
            const count = bands
              .filter((band) => band.schedules.some((schedule) => schedule.day === daysMap[fullDayName])) // Filtrerer bands, der spiller på denne dag
              .filter((band) => {
                // Tjekker om bandet også matcher andre aktive filtre
                const matchesGenre = filters.genre.length === 0 || filters.genre.includes(band.genre);
                const matchesStage = filters.stage.length === 0 || band.schedules.some((schedule) => filters.stage.includes(schedule.stage));
                return matchesGenre && matchesStage; // returnerer bands, der opfylder filtrene
              }).length;

            return (
              <label key={fullDayName} className="filter-label-styling space-x-2">
                {/* Checkbox for hver dag */}
                <input
                  type="checkbox"
                  value={daysMap[fullDayName]} // Kort dag-navn (mon, tue osv)
                  checked={filters.day.includes(daysMap[fullDayName])} // Er checkboxen checked?
                  onChange={(e) => {
                    const selectedDay = e.target.value; // Henter den dag valgte dag
                    const updatedDays = e.target.checked
                      ? [...filters.day, selectedDay] // Hvis checkboxen er checked, tilføjer den dag
                      : filters.day.filter((day) => day !== selectedDay); // Hvis checkboxen er unchecked, fjerner vi den dagen
                    setFilters({ ...filters, day: updatedDays }); // Opdaterer state for dag-filtre
                  }}
                  style={{
                    width: "clamp(0.875rem, 0.8315rem + 0.2174vw, 1rem)", // Matcher tekststørrelsen
                    height: "clamp(0.875rem, 0.8315rem + 0.2174vw, 1rem)", // Matcher tekststørrelsen
                  }}
                  className="form-checkbox text-black_color border-less_black_color rounded"
                />
                <span className="text-step_text_regular">{fullDayName}</span> {/* Fuldt navn på dagen */}
                <span className="text-step_text_tiny text-gray-500 ml-2">({count})</span> {/* Antal bands */}
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
          {/* Clear button som komponent */}
          <ClearButton onClick={() => setFilters({ ...filters, stage: [] })} label="Clear" />
        </div>
        <form className="space-y-2">
          {/* Looper igennem schedule og viser checkboxer for hver scene */}
          {Object.keys(schedule).map((stage) => {
            // Beregn antallet af bands der spiller på denne scene og matcher andre filtre
            const count = bands
              .filter((band) => band.schedules.some((schedule) => schedule.stage === stage)) // Filtrerer bands, der spiller på denne scene
              .filter((band) => {
                // Tjek, om bandet opfylder andre aktive filtre
                const matchesGenre = filters.genre.length === 0 || filters.genre.includes(band.genre);
                const matchesDay = filters.day.length === 0 || band.schedules.some((schedule) => filters.day.includes(schedule.day));
                return matchesGenre && matchesDay; // returnerer bands, der opfylder filtrene
              }).length;

            return (
              <label key={stage} className="filter-label-styling space-x-2">
                {/* Checkbox for hver scene */}
                <input
                  type="checkbox"
                  value={stage} // Scene-navn
                  checked={filters.stage.includes(stage)} // Er scenen valgt?
                  onChange={(e) => {
                    const selectedStage = e.target.value; // Henter den valgte scene
                    const updatedStages = e.target.checked
                      ? [...filters.stage, selectedStage] // Tilføj scene, hvis valgt
                      : filters.stage.filter((s) => s !== selectedStage); // Fjern scene, hvis fravalgt
                    setFilters({ ...filters, stage: updatedStages }); // Opdaterer state for scene-filtre
                  }}
                  style={{
                    width: "clamp(0.875rem, 0.8315rem + 0.2174vw, 1rem)", // Matcher tekststørrelsen
                    height: "clamp(0.875rem, 0.8315rem + 0.2174vw, 1rem)", // Matcher tekststørrelsen
                  }}
                  className="form-checkbox text-black_color border-less_black_color rounded"
                />
                <span className="text-step_text_regular">{stage}</span> {/* Navn på scene */}
                <span className="text-step_text_tiny text-gray-500 ml-2">({count})</span> {/* Antal bands */}
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
          {/* Clear button som komponent */}
          <ClearButton onClick={() => setFilters({ ...filters, genre: [] })} label="Clear" />
        </div>
        <form className="space-y-2">
          {/* Looper igennem bands og viser checkboxer for hver genre */}
          {Array.from(new Set(bands.map((band) => band.genre))).map((genre) => {
            // Beregn antallet af bands for denne genre
            const count = bands
              .filter((band) => band.genre === genre) // Filtrerer bands for denne genre
              .filter((band) => {
                // Tjekker, om bandet også matcher andre filtre
                const matchesDay = filters.day.length === 0 || band.schedules.some((schedule) => filters.day.includes(schedule.day));
                const matchesStage = filters.stage.length === 0 || band.schedules.some((schedule) => filters.stage.includes(schedule.stage));
                return matchesDay && matchesStage; // Returnerer bands, der opfylder filtrene
              }).length;

            return (
              <label key={genre} className="filter-label-styling space-x-2">
                {/* Checkbox for hver genre */}
                <input
                  type="checkbox"
                  value={genre} // Genre-navn
                  checked={filters.genre.includes(genre)} // Er genre valgt?
                  onChange={(e) => {
                    const selectedGenre = e.target.value; // Den valgte genre
                    const updatedGenreFilters = e.target.checked
                      ? [...filters.genre, selectedGenre] // Tilføjer genre, hvis checkboxen er checked
                      : filters.genre.filter((g) => g !== selectedGenre); // Fjerner genre, hvis checkboxen er unchecked
                    setFilters({ ...filters, genre: updatedGenreFilters }); // Opdaterer filters.genre
                  }}
                  style={{
                    width: "clamp(0.875rem, 0.8315rem + 0.2174vw, 1rem)", // Matcher tekststørrelsen
                    height: "clamp(0.875rem, 0.8315rem + 0.2174vw, 1rem)", // Matcher tekststørrelsen
                  }}
                  className="form-checkbox text-black_color border-less_black_color rounded"
                />
                <span className="text-step_text_regular">{genre}</span> {/* Genre-navn */}
                <span className="text-step_text_tiny text-gray-500 ml-2">({count})</span> {/* Antal bands */}
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
