// const API_BASE_URL = "https://lively-scrawny-secretary.glitch.me";
const API_BASE_URL = "http://localhost:8080";

export const api = {
  // GET metoder
  getAvailableSpots: async () => {
    try {
      console.log("Fetching spots...");
      const response = await fetch(`${API_BASE_URL}/available-spots`, {
        method: "GET",
      });
      if (!response.ok) throw new Error("Failed to fetch spots");
      return await response.json();
    } catch (error) {
      console.error("Spots fetch error:", error);
      throw error;
    }
  },

  getBands: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/bands`, {
        method: "GET",
      });
      if (!response.ok) throw new Error("Failed to fetch bands");
      return await response.json();
    } catch (error) {
      console.error("Bands fetch error:", error);
      throw error;
    }
  },

  getSchedule: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/schedule`, {
        method: "GET",
      });
      if (!response.ok) throw new Error("Failed to fetch schedule");
      return await response.json();
    } catch (error) {
      console.error("Schedule fetch error:", error);
      throw error;
    }
  },

  getEvents: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/events`, {
        method: "GET",
      });
      if (!response.ok) throw new Error("Failed to fetch events");
      return await response.json();
    } catch (error) {
      console.error("Events fetch error:", error);
      throw error;
    }
  },

  // POST metoder - bruges til at oprette nye ressourcer
  createReservation: async (area, amount) => {
    try {
      const response = await fetch(`${API_BASE_URL}/reservations`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ area, amount }),
      });
      if (!response.ok) throw new Error("Failed to create reservation");
      return await response.json();
    } catch (error) {
      console.error("Reservation creation error:", error);
      throw error;
    }
  },

  // PATCH metoder - bruges til at opdatere eksisterende ressourcer delvist
  updateReservation: async (id, updates) => {
    try {
      const response = await fetch(`${API_BASE_URL}/reservations/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });
      if (!response.ok) throw new Error("Failed to update reservation");
      return await response.json();
    } catch (error) {
      console.error("Reservation update error:", error);
      throw error;
    }
  },

  // DELETE metoder - bruges til at slette ressourcer
  deleteReservation: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/reservations/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete reservation");
      return await response.json();
    } catch (error) {
      console.error("Reservation deletion error:", error);
      throw error;
    }
  },
};
