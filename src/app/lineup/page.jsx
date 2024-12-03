"use client";
import { useState, useEffect } from "react";

import Image from "next/image";

const Page = () => {
  const [data, setData] = useState({ bands: [] });

  useEffect(() => {
    const fetchData = async () => {
      let response = await fetch("http://localhost:8080/bands");
      let result = await response.json();
      console.log(result);
      setData(result);
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1>Line-up</h1>
      <section className="flex gap-[64px]">
        <article className="w-1/3">
          <p>Filter</p>
        </article>

        <article className="w-2/3 grid grid-cols-2 lg:grid-cols-3 gap-4">
          {data && data.length > 0 ? (
            data.map((band, index) => (
              <div key={index} className="grid grid-cols-1 grid-rows-1">
                <img src={band.logo} alt="Band Logo" width={290} height={296} className="col-span-1 row-span-1" />
                <p className="font-bold text-xl mt-2 col-span-1 row-span-1">{band.name}</p>
              </div>
            ))
          ) : (
            <p>No bands found.</p>
          )}
        </article>
      </section>
    </div>
  );
};

export default Page;
