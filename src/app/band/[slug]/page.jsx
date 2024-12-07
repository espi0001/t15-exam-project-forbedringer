import Image from "next/image";

// singleview for a band
const Page = async ({ params }) => {
  const slug = params.slug; // henter slug fra URL'en
  //   const [band, setBand] = useState(null);

  //   fetch band data
  const bandResponse = await fetch(`http://localhost:8080/bands/${slug}`);
  const band = await bandResponse.json();

  // Fetch schedule data for the band
  const scheduleResponse = await fetch(`http://localhost:8080/schedule`);
  const scheduleData = await scheduleResponse.json();

  // Find the band's schedule
  const bandSchedules = [];
  for (const stage in scheduleData) {
    for (const day in scheduleData[stage]) {
      scheduleData[stage][day].forEach((slot) => {
        if (slot.act === band.name) {
          bandSchedules.push({
            stage,
            day,
            start: slot.start,
            end: slot.end,
          });
        }
      });
    }
  }

  return (
    <div className=" py-[64px]  lg:py-[112px]">
      <img src={band.logo} alt={`${band.name} logo`} className="w-full h-[300px] lg:h-[400px] bg-cover bg-center" />
      <section className="mx-[20px] lg:mx-[64px] py-[48px] lg:py-[80px] lg:flex gap-[80px] justify-between">
        <article className="lg:w-3/5 grid gap-4">
          <h1 className="">{band.name}</h1>
          <div>
            <h5>Genre</h5>
            <p className="text-lg mt-2 font-light">{band.genre}</p>
          </div>
          <div>
            <h2 className="">About the Band</h2>
            <p>{band.bio}</p>
          </div>

          <div>
            <h2 className="">Members</h2>
            {/* Hvis der er flere skal der laves en map */}
            {/* <p className="flex gap-4">{band.members}</p> */}
            {/* {band.members.map((bandmembers, index) => (
              <ul>
                <li key={index} className="">
                  {bandmembers}
                </li>
              </ul>
            ))} */}
            {band.members.length > 0 ? (
              <div>
                {band.members.map((bandmembers, index) => (
                  <ul>
                    <li key={index} className="">
                      {bandmembers}
                    </li>
                  </ul>
                ))}
              </div>
            ) : (
              <p className="text-lg">No schedule available for this band.</p>
            )}
          </div>
        </article>
        <div className="lg:w-2/5 ">
          <div className="">
            <h5>Schedule</h5>
            {bandSchedules.length > 0 ? (
              <div>
                {bandSchedules.map((schedule, index) => (
                  <p key={index} className="p-4 border rounded shadow-sm">
                    <strong>{schedule.day.toUpperCase()}</strong>: {schedule.stage} ({schedule.start} - {schedule.end})
                  </p>
                ))}
              </div>
            ) : (
              <p className="text-lg">No schedule available for this band.</p>
            )}
          </div>

          <article className="flex justify-between mt-8">
            <div>
              <h5>Stage</h5>
              {bandSchedules.length > 0 ? (
                <div>
                  {bandSchedules.map((schedule, index) => (
                    <p key={index} className="">
                      {schedule.stage}
                    </p>
                  ))}
                </div>
              ) : (
                <p className="text-lg">No schedule available for this band.</p>
              )}
            </div>
            <div>
              <h5>Day</h5>
              {bandSchedules.length > 0 ? (
                <div>
                  {bandSchedules.map((schedule, index) => (
                    <p key={index} className="">
                      {schedule.day}
                    </p>
                  ))}
                </div>
              ) : (
                <p className="text-lg">No schedule available for this band.</p>
              )}
            </div>
            <div>
              <h5>Time</h5>
              {bandSchedules.length > 0 ? (
                <div>
                  {bandSchedules.map((schedule, index) => (
                    <p key={index} className="">
                      {schedule.start} - {schedule.end}
                    </p>
                  ))}
                </div>
              ) : (
                <p className="text-lg">No schedule available for this band.</p>
              )}
            </div>
          </article>
        </div>
      </section>
      {/* bands header */}

      {/* <img src={band.logo} alt={`${band.name} logo`} width={200} height={200} /> */}

      {/* Band Members */}

      {/* Band Schedule */}
    </div>
  );
};

export default Page;
