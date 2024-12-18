import Tickets from "@/components/Tickets";
export const metadata = {
  title: "Foo Fest | Tickets",
  description: "Buy your tickets for Foo Fest 2025 now!",
};
export default function Page() {
  return (
    <div>
      <Tickets />
    </div>
  );
}
