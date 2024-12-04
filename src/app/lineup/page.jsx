"use client";
import { useState, useEffect } from "react";
import FilterGenreAccordion from "@/components/FilterGenreAccordion"; // Importér dit filterkomponent

const Page = () => {
  const [data, setData] = useState([]); // Ændret til en liste
  const [filteredData, setFilteredData] = useState([]); // For at gemme de filtrerede bands
  //   const [filter, setFilter] = useState(""); // Genre filter
  const [sort, setSort] = useState(false); // For alphabetic sorting

  useEffect(() => {
    const fetchData = async () => {
      let response = await fetch("http://localhost:8080/bands");
      let result = await response.json();
      console.log("Fetched data:", result); // Debugging log
      setData(result);
      setFilteredData(result); // Initiale data skal vises uden filtre
    };
    fetchData();
  }, []);

  // Genre filter handler (nu via FilterGenreAccordion-komponenten)
  const handleGenreChange = (genre) => {
    // Hvis vi vælger "all", skal vi vise alle bands
    setFilteredData(genre === "all" ? data : data.filter((band) => band.genre?.toLowerCase().includes(genre.toLowerCase())));
  };

  // Sorting alphabetically
  const sortedBands = sort ? [...filteredData].sort((a, b) => a.name.localeCompare(b.name)) : filteredData;

  //  genrer man kan vælge imellem
  const genres = ["All", "Alternative Metal", "Alternative Rock", "Blues", "Classical", "Country", "Electronic", "Folk", "Funk", "Grunge", "Hard Rock", "Hardcore Punk", "Heavy Metal", "Hip Hop", "Jazz", "Latin", "Metal", "Non Music", "Pop", "Rap", "Reggae", "Rock", "Soul", "Stage And Screen", "World"];
  //   // Ensure data.bands exists before filtering
  //   const filteredData = data.filter((band) => (filter ? band.genre?.toLowerCase().includes(filter.toLowerCase()) : true));
  //   // Sorting alphabetically
  //   const sortedBands = sort ? [...filteredData].sort((a, b) => a.name.localeCompare(b.name)) : filteredData;

  return (
    <div className="mx-[64px]">
      <h1>Line-up</h1>

      <section className="flex gap-[64px]">
        {/* Filter */}
        <article className="w-1/4">
          <h5 className="font-bold mb-[24px]">Filters</h5>

          <hr />

          <p className="text-[1.125rem] my-[20px] font-semibold">Stages</p>

          <hr />

          {/* Brug FilterGenreAccordion til at håndtere genre filtreringen */}
          <FilterGenreAccordion genres={genres} onFilterChange={handleGenreChange} />

          <hr />

          <p className="text-[1.125rem my-[20px] font-semibold">Days</p>

          <hr />
        </article>
        <div className="w-3/4 flex flex-col">
          {/* Sorting button */}
          <button onClick={() => setSort(!sort)} className="border p-2 self-end mb-[24px]">
            {sort ? "Reset Sorting" : "Sort A-Z"}
          </button>

          <article className="grid grid-cols-2 lg:grid-cols-3 gap-4 justify-center">
            {sortedBands.length > 0 ? (
              sortedBands.map((band, index) => (
                <div key={index} className="grid grid-cols-1 grid-rows-1 bg-slate-900">
                  <img src={band.logo} alt={`${band.name} Logo`} width={290} height={296} className="col-span-1 row-span-1" />
                  <p className="font-bold text-xl mt-2 col-span-1 row-span-1">{band.name}</p>
                </div>
              ))
            ) : (
              <p>No bands found.</p>
            )}
          </article>
        </div>
      </section>
    </div>
  );
};

export default Page;
