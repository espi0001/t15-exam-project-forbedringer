const API_BASE_URL = "https://lively-scrawny-secretary.glitch.me";
// const API_BASE_URL = "http://localhost:8080";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const api = {
  saveBooking: async (bookingData) => {
    try {
      const response = await fetch(`${SUPABASE_URL}/rest/v1/bookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({
          reservation_id: bookingData.reservationId,
          name: bookingData.name,
          email: bookingData.email,
          ticket_type: bookingData.ticketType,
          camping_area: bookingData.campingArea,
          tent_setup: bookingData.tentSetup,
          green_camping: bookingData.greenCamping,
        }),
      });

      if (!response.ok) throw new Error("Failed to save booking");
      return await response.json();
    } catch (error) {
      console.error("Save booking error:", error);
      throw error;
    }
  },

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

  createReservation: async (area, amount) => {
    try {
      const response = await fetch(`${API_BASE_URL}/reserve-spot`, {
        method: "PUT",
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

  fulfillReservation: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/fullfill-reservation`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (!response.ok) throw new Error("Failed to fulfill reservation");
      return await response.json();
    } catch (error) {
      console.error("Fulfill reservation error:", error);
      throw error;
    }
  },
};
