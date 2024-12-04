"use client";
import { useState } from "react";
import { IoFilter } from "react-icons/io5";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";

const FilterGenreAccordion = ({ genres, onFilterChange }) => {
  const [isOpen, setIsOpen] = useState(false); // Styrer, om accordion er åbent
  const [selectedGenre, setSelectedGenre] = useState("All"); // Styrer det aktive filter

  const handleGenreChange = (event) => {
    const selected = event.target.value; // Hent den valgte genre fra radio button
    setSelectedGenre(selected); // Opdater den aktive genre
    onFilterChange(selected); // Filtrer produkterne baseret på den valgte genre
  };

  return (
    <div>
      {/* Hovedknappen til at åbne/lukke accordion */}
      <button onClick={() => setIsOpen(!isOpen)} className="flex w-full justify-between items-center font-semibold my-[20px]">
        <span className="flex justify-between gap-2 text-[1.125rem]">
          {/* <IoFilter /> */}
          Genre
        </span>
        {isOpen ? <IoIosArrowUp className="" /> : <IoIosArrowDown className="" />}
      </button>

      {/* Filtermuligheder */}
      {isOpen && (
        <form className="flex flex-col items-start">
          {/* Radio buttons for hver genre */}
          {genres.map((genre) => (
            <label key={genre} className="flex items-center space-x-2 cursor-pointer my-[8px]">
              <input
                type="radio"
                name="genre" // Radio buttons skal have samme 'name' for at være en gruppe
                value={genre}
                checked={selectedGenre === genre} // Markér den valgte genre som checked
                onChange={handleGenreChange} // Håndter ændringen af genre
                className="hidden"
              />
              <span className={`w-[18px] h-[18px] rounded-full border border-1 border-white mr-[18px] flex justify-center items-center cursor-pointer ${selectedGenre === genre ? "bg-white border-white " : "border-white"}`}>
                {/* Indre cirkel, når radio button er valgt */}
                {selectedGenre === genre && <span className="w-2.5 h-2.5 bg-black rounded-full"></span>}
              </span>
              <span>{genre}</span>
            </label>
          ))}
        </form>
      )}
    </div>
  );
};

export default FilterGenreAccordion;
