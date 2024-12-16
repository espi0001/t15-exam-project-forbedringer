import { Button } from "./ui/Button";

export default function Navigation({ activeView, setActiveView }) {
  return (
    <nav className="p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-2xl mt-10 font-black text-white_color">Tickets & overview</h1>
        <div className="space-x-4">
          <Button className="bg-white_color hover:bg-red_color text-black_color" variant={activeView === "booking" ? "default" : ""} onClick={() => setActiveView("booking")}>
            Book Tickets
          </Button>
          <Button className="bg-red_color hover:bg-black_color text-white_color" variant={activeView === "schedule" ? "default" : ""} onClick={() => setActiveView("schedule")}>
            View Schedule
          </Button>
        </div>
      </div>
    </nav>
  );
}
