"use client";
import { useState, useEffect } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card"; // UI-komponenter til opbygning af kortlayout
import { Label } from "../ui/Label"; // Komponent til tekstlabels
import { Button } from "../ui/Button"; // Komponent til knapper
import { Checkbox } from "../ui/Checkbox"; // Checkbox-komponent
import { Tent } from "lucide-react"; // Ikon for camping
import { api } from "@/lib/api"; // API-funktioner

export default function CampingOptions({ bookingData, setBookingData, onNext, onBack }) {
  // Lokal state til at holde ledige campingområder
  const [availableSpots, setAvailableSpots] = useState([]);
  const [loading, setLoading] = useState(true); // State til at vise indlæsningsstatus
  const [error, setError] = useState(null); // State til fejlmeddelelser

  // Henter ledige campingområder, når komponenten indlæses
  useEffect(() => {
    const fetchSpots = async () => {
      try {
        // Hent ledige områder fra API
        const spots = await api.getAvailableSpots();
        setAvailableSpots(spots); // Opdater state med data
        setLoading(false); // Stop indlæsning
      } catch (err) {
        setError("Failed to load available spots"); // Angiv fejlmeddelelse, hvis API'et fejler
        setLoading(false); // Stop indlæsning
      }
    };
    fetchSpots();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Tent className="h-6 w-6" />
          Camping Options
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Viser fejlmeddelelse, hvis der opstår en fejl */}
        {error && <div className="text-red-500 mb-4">{error}</div>}

        {/* Viser indlæsningsstatus, indtil data er hentet */}
        {loading ? (
          <p>Loading available spots...</p>
        ) : (
          <div className="space-y-4">
            {/* Vælg campingområde */}
            <div>
              <Label>Select Camping Area</Label>
              <select
                value={bookingData.campingArea} // Forvalgt værdi fra bookingData
                onChange={(e) =>
                  setBookingData({
                    ...bookingData,
                    campingArea: e.target.value, // Opdater campingområde i bookingData
                  })
                }
                className="w-full p-2 border rounded mt-1"
              >
                <option value="">Select an area</option> {/* Standard valg */}
                {availableSpots.map((spot) => (
                  <option key={spot.area} value={spot.area}>
                    {spot.area} ({spot.spots} spots available) {/* Viser områder og tilgængelige pladser */}
                  </option>
                ))}
              </select>
            </div>

            {/* Checkbox for grøn camping */}
            <div className="flex items-center space-x-2">
              <Checkbox
                id="greenCamping" // ID for checkbox
                checked={bookingData.greenCamping} // Forvalgt værdi fra bookingData
                onCheckedChange={(checked) =>
                  setBookingData({
                    ...bookingData,
                    greenCamping: checked,
                  })
                }
              />
              <Label htmlFor="greenCamping">Green Camping (+249,-)</Label>
            </div>

            {/* Vælg opsætning af telt */}
            <div>
              <Label>Tent Setup</Label>
              <select
                value={bookingData.tentSetup} // Forvalgt værdi fra bookingData
                onChange={(e) =>
                  setBookingData({
                    ...bookingData,
                    tentSetup: e.target.value, // Opdater teltopsætning i bookingData
                  })
                }
                className="w-full p-2 border rounded mt-1"
              >
                <option value="">No tent setup</option> {/* Standard valg */}
                <option value="2person">2-Person Tent (299,-)</option>
                <option value="3person">3-Person Tent (399,-)</option>
              </select>
            </div>

            <div className="flex justify-between mt-4">
              <Button variant="outline" onClick={onBack}>
                Back {/* Gå tilbage til forrige trin */}
              </Button>
              <Button variant="tertiary" onClick={onNext} disabled={!bookingData.campingArea}>
                Continue to Personal Info {/* Fortsæt til næste trin */}
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
