import { Button } from "./ui/button";

export default function Navigation({ activeView, setActiveView }) {
  return (
    <nav className="bg-white/10 backdrop-blur-sm p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Midgard Music Festival</h1>
        <div className="space-x-4">
          <Button variant={activeView === "booking" ? "default" : "outline"} onClick={() => setActiveView("booking")}>
            Book Tickets
          </Button>
          <Button variant={activeView === "schedule" ? "default" : "outline"} onClick={() => setActiveView("schedule")}>
            View Schedule
          </Button>
        </div>
      </div>
    </nav>
  );
}
