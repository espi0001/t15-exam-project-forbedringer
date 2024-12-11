import Image from "next/image";
import placeholderLogo from "@/images/placeholder-image.png";
import AboutSection from "@/app/band/AboutSection";

// Dynamically import local logos
const importLogo = (logoName) => {
  try {
    return require(`@/images/band-logos/${logoName}`);
  } catch (error) {
    return placeholderLogo;
  }
};

// singleview for a band
const Page = async ({ params }) => {
  const slug = await params.slug; // henter slug fra URL'en

  // fetch band data
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

  // Attempt to import the logo, fallback to placeholder if not found
  const bandLogo = importLogo(band.logo);

  return (
    <div>
      <div className="relative">
        {/* Adjust Image Container */}
        <Image
          src={bandLogo}
          alt={`${band.name} logo`}
          className="w-full h-[300px] lg:h-[400px] object-cover bg-center"
          width={1200}
          height={400}
        />
        <h1 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white lg:text-4xl font-bold">
          {band.name}
        </h1>
      </div>
      <section className="mx-[20px] lg:mx-[64px] py-[48px] lg:py-[80px] lg:flex gap-[80px] justify-between">
        <article className="lg:w-3/5 grid gap-4">
          <AboutSection bio={band.bio} />

          <div>
            <h2 className="">Members</h2>
            {band.members.length > 0 ? (
              <div>
                {band.members.map((bandmembers, index) => (
                  <ul key={index}>
                    <li className="text-step_p">{bandmembers}</li>
                  </ul>
                ))}
              </div>
            ) : (
              <p className="text-lg">No members are available for this band.</p>
            )}
          </div>
          <div>
            <h2 className="font-bold text-step_h5">Genre</h2>
            <p className="text-lg font-light text-step_p">{band.genre}</p>
          </div>
        </article>
        <div className="lg:w-2/5">
          <div className="mt-6 sm:mt-8">
            <h5 className="font-bold mb-2 sm:mb-2">Performs at</h5>
            {bandSchedules.length > 0 ? (
              <div>
                {bandSchedules.map((schedule, index) => (
                  <p
                    key={index}
                    className="p-4 border rounded shadow-sm single-view-schedule-p"
                  >
                    <strong>{schedule.day.toUpperCase()}</strong>: {schedule.stage} ({schedule.start} -{" "}
                    {schedule.end})
                  </p>
                ))}
              </div>
            ) : (
              <p className="text-lg">No schedule available for this band.</p>
            )}
          </div>

          <article className="flex justify-between mt-8">
            <div>
              <h5>Day</h5>
              {bandSchedules.length > 0 ? (
                <div className="font-extralight">
                  {bandSchedules.map((schedule, index) => (
                    <p key={index} className="single-view-schedule-p">
                      {schedule.day}
                    </p>
                  ))}
                </div>
              ) : (
                <p className="text-lg">No schedule available for this band.</p>
              )}
            </div>
            <div>
              <h5>Stage</h5>
              {bandSchedules.length > 0 ? (
                <div>
                  {bandSchedules.map((schedule, index) => (
                    <p key={index} className="single-view-schedule-p">
                      {schedule.stage}
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
                    <p key={index} className="single-view-schedule-p">
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
    </div>
  );
};

export default Page;
