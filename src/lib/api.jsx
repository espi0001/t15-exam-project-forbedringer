// const API_BASE_URL = "https://lively-scrawny-secretary.glitch.me";
const API_BASE_URL = "http://localhost:8080";

export const api = {
  getAvailableSpots: async () => {
    try {
      console.log("Fetching spots...");
      const response = await fetch(`${API_BASE_URL}/available-spots`);
      console.log("Spots response:", response);
      if (!response.ok) throw new Error("Failed to fetch spots");
      const data = await response.json();
      console.log("Spots data:", data);
      return data;
    } catch (error) {
      console.error("Spots fetch error:", error);
      throw error;
    }
  },

  reserveSpot: async (area, amount) => {
    try {
      console.log("Reserving spot...", { area, amount });
      const response = await fetch(`${API_BASE_URL}/reserve-spot`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ area, amount }),
      });
      console.log("Reserve response:", response);
      if (!response.ok) throw new Error("Failed to reserve spot");
      const data = await response.json();
      console.log("Reserve data:", data);
      return data;
    } catch (error) {
      console.error("Reserve error:", error);
      throw error;
    }
  },

  fulfillReservation: async (id) => {
    try {
      console.log("Fulfilling reservation...", { id });
      const response = await fetch(`${API_BASE_URL}/fullfill-reservation`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      console.log("Fulfill response:", response);
      if (!response.ok) throw new Error("Failed to fulfill reservation");
      const data = await response.json();
      console.log("Fulfill data:", data);
      return data;
    } catch (error) {
      console.error("Fulfill error:", error);
      throw error;
    }
  },

  getBands: async () => {
    try {
      console.log("Fetching bands...");
      const response = await fetch(`${API_BASE_URL}/bands`);
      console.log("Bands response:", response);
      if (!response.ok) throw new Error("Failed to fetch bands");
      const data = await response.json();
      console.log("Bands data:", data);
      return data;
    } catch (error) {
      console.error("Bands fetch error:", error);
      throw error;
    }
  },

  getSchedule: async () => {
    try {
      console.log("Fetching schedule...");
      const response = await fetch(`${API_BASE_URL}/schedule`);
      console.log("Schedule response:", response);
      if (!response.ok) throw new Error("Failed to fetch schedule");
      const data = await response.json();
      console.log("Schedule data:", data);
      return data;
    } catch (error) {
      console.error("Schedule fetch error:", error);
      throw error;
    }
  },

  getEvents: async () => {
    try {
      console.log("Fetching events...");
      const response = await fetch(`${API_BASE_URL}/events`);
      console.log("Events response:", response);
      if (!response.ok) throw new Error("Failed to fetch events");
      const data = await response.json();
      console.log("Events data:", data);
      return data;
    } catch (error) {
      console.error("Events fetch error:", error);
      throw error;
    }
  },
};
