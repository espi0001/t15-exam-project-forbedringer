import Image from "next/image";
import placeholderLogo from "@/images/placeholder-image.jpg";
import AboutSection from "@/app/band/AboutSection";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata = {
  title: "Foo Fest | Band",
  description: "Learn more about the band, members and schedule time.",
};

const Page = async ({ params }) => {
  const slug = await params.slug;

  // Fetch band data
  const bandResponse = await fetch(`https://lively-scrawny-secretary.glitch.me/bands/${slug}`);
  const band = await bandResponse.json();

  // Fetch schedule data for the band
  const scheduleResponse = await fetch(`https://lively-scrawny-secretary.glitch.me/schedule`);
  const scheduleData = await scheduleResponse.json();

  // Fetch related artists based on genre
  const relatedArtistsResponse = await fetch(`https://lively-scrawny-secretary.glitch.me/bands?genre=${encodeURIComponent(band.genre)}`);
  const relatedArtists = await relatedArtistsResponse.json();

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
    <div>
      <div className="relative w-full h-[300px] lg:h-[400px]">
        <div
          style={{
            backgroundImage: `url(${band.logo.startsWith("http") ? band.logo : `/logos/${band.logo}`})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
          className="absolute inset-0 object-cover brightness-50 bg-center bg-less_black_color"
        />
        <h1 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white_color lg:text-4xl font-bold z-10">{band.name}</h1>
      </div>
      <section className="mx-[20px] lg:mx-[64px] pt-[48px] pb-[24px] lg:pt-[48px] lg:flex gap-[80px] justify-between">
        <article className="lg:w-3/5 grid gap-4">
          <AboutSection bio={band.bio} />

          <div className="mb-0"> {/* Removed margin */}
            <h2 className="text-xl font-bold">Members</h2>
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
            <h2 className="text-xl font-bold">Genre</h2>
            <p className="text-lg font-medium text-step_p">{band.genre}</p>
          </div>
        </article>
        <div className="lg:w-2/5">
          <div className="mt-6 sm:mt-8">
            <h3 className="font-bold mb-2 sm:mb-2">Performs at</h3>
            {bandSchedules.length > 0 ? (
              <div>
                {bandSchedules.map((schedule, index) => (
                  <p key={index} className="p-4 border rounded shadow-sm single-view-schedule-p">
                    <strong>{schedule.day.toUpperCase()}</strong>: {schedule.stage} ({schedule.start} - {schedule.end})
                  </p>
                ))}
              </div>
            ) : (
              <p className="text-lg">No schedule available for this band.</p>
            )}
          </div>
          <Link href="/schedule">
            <Button variant="default" size="lg" className="mt-6 mb-10">
              View full schedule
            </Button>
          </Link>
        </div>
      </section>
      {/* Related Artists Section */}
<section className="mx-[20px] lg:mx-[64px] pb-[24px]">
  <h2 className="font-medium">Related Artists</h2>
  {relatedArtists.length > 0 ? (
    <div className="grid gap-4">
      {(() => {
        // First try to get artists with the same genre
        const sameGenreArtists = relatedArtists
          .filter((artist) => artist.genre === band.genre && artist.name !== band.name);

        // If no same genre artists found, get all artists except current band
        const artistsToShow = sameGenreArtists.length > 0 
          ? sameGenreArtists 
          : relatedArtists.filter((artist) => artist.name !== band.name);

        // Shuffle the array
        return [...artistsToShow]
          .sort(() => Math.random() - 0.5)
          .slice(0, 3) // Take first 3 after shuffling
          .map((artist, index) => (
            <div key={index} className="group p-4 border rounded shadow-sm transition-all">
              <Link href={`/band/${artist.slug}`} className="block">
                <h3 className="font-medium text-black_color group-hover:text-white group-hover:bg-red_color p-4 transition-all">{artist.name}</h3>
                <p className="text-sm text-gray-600 group-hover:text-white group-hover:bg-red_color p-4 transition-all">{artist.genre}</p>
              </Link>
            </div>
          ));
      })()}
    </div>
  ) : (
    <p className="text-lg">No related artists found.</p>
  )}
</section>
    </div>
  );
};

export default Page;
