"use client";
import { useState, useEffect } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"; // UI-komponenter til opbygning af kortlayout
import { Label } from "../ui/label"; // Komponent til tekstlabels
import { Button } from "../ui/button"; // Komponent til knapper
import { Checkbox } from "../ui/checkbox"; // Checkbox-komponent
import { Tent } from "lucide-react"; // Ikon for camping
import { api } from "@/lib/api"; // API-funktioner

import { MdArrowLeft } from "react-icons/md";

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
        <CardTitle className="flex items-center gap-2 text-step_h4 lg:text-step_h2">
          <Tent size={50} />
          Camping options
        </CardTitle>
      </CardHeader>
      <CardContent className="mb-6 p-4 border rounded">
        {/* Viser fejlmeddelelse, hvis der opstår en fejl */}
        {error && <div className="text-red_color mb-4">{error}</div>}

        {/* Viser indlæsningsstatus, indtil data er hentet */}
        {loading ? (
          <p>Loading available spots...</p>
        ) : (
          <div className="space-y-4">
            {/* Vælg campingområde */}
            <div>
              <Label>Select camping area</Label>
              <select
                value={bookingData.campingArea} // Forvalgt værdi fra bookingData
                onChange={(e) =>
                  setBookingData({
                    ...bookingData,
                    campingArea: e.target.value, // Opdater campingområde i bookingData
                  })
                }
                className="w-full text-step_text_regular p-2 border rounded mt-1 bg-white_color"
              >
                <option value="">Select an area</option> {/* Standard valg */}
                {availableSpots.map((spot) => (
                  <option key={spot.area} value={spot.area} className="text-step_text_regular bg-white_color">
                    {spot.area} ({spot.available} spots available) {/* Viser områder og tilgængelige pladser */}
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
              <Label htmlFor="greenCamping">Green camping (+ 249,-)</Label>
            </div>

            {/* Vælg opsætning af telt */}
            {/* <div className="pt-4">
              <Label>Tent setup</Label>
              <select
                value={bookingData.tentSetup} // Forvalgt værdi fra bookingData
                onChange={(e) =>
                  setBookingData({
                    ...bookingData,
                    tentSetup: e.target.value, // Opdater teltopsætning i bookingData
                  })
                }
                className="w-full p-2 text-step_text_regular border rounded mt-1 bg-white_color"
              >
                <option value="" className="bg-white_color">
                  No tent setup
                </option>
             
                <option value="2person">2-Person Tent (299,-)</option>
                <option value="3person">3-Person Tent (399,-)</option>
              </select>
            </div> */}

            <div className="flex justify-between mt-4">
              <Button variant="outline" onClick={onBack}>
                <MdArrowLeft size={20} />
                Back {/* Gå tilbage til forrige trin */}
              </Button>
              <Button className="text-white" variant="tertiary" onClick={onNext} disabled={!bookingData.campingArea}>
                Continue to personal info {/* Fortsæt til næste trin */}
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
