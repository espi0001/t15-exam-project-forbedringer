import { Button } from "./ui/Button";

export default function Navigation({ activeView, setActiveView }) {
  return (
    <nav className="p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-2xl mt-10 font-black text-white">Tickets & overview</h1>
        <div className="space-x-4">
          <Button className="bg-white hover:bg-[#7d0200] text-black" variant={activeView === "booking" ? "default" : ""} onClick={() => setActiveView("booking")}>
            Book Tickets
          </Button>
          <Button className="bg-[#7d0200] hover:bg-black text-white" variant={activeView === "schedule" ? "default" : ""} onClick={() => setActiveView("schedule")}>
            View Schedule
          </Button>
        </div>
      </div>
    </nav>
  );
}
