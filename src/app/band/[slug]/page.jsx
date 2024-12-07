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
    <div className="mx-[20px] py-[64px] lg:mx-[64px] lg:py-[112px]">
      {/* bands header */}
      <h1 className="mb-[48px] lg:mb-[80px]">{band.name}</h1>
      <img src={band.logo} alt={`${band.name} logo`} width={200} height={200} />
      <p className="text-lg mt-2 font-light">{band.genre}</p>

      {/* Band Members */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Members</h2>
        <p>{band.members}</p>
      </div>

      {/* Band Bio */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">About the Band</h2>
        <p>{band.bio}</p>
      </div>
      {/* Band Schedule */}
      {bandSchedules.length > 0 ? (
        <div>
          <h2 className="text-2xl font-semibold mb-4">Schedule</h2>
          <ul className="space-y-2">
            {bandSchedules.map((schedule, index) => (
              <li key={index} className="p-4 border rounded shadow-sm">
                <strong>{schedule.day.toUpperCase()}</strong>: {schedule.stage} ({schedule.start} - {schedule.end})
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="text-lg">No schedule available for this band.</p>
      )}
    </div>
  );
};

export default Page;
