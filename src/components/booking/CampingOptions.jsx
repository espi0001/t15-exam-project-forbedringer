"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Tent } from "lucide-react";
import { api } from "@/lib/api";

export default function CampingOptions({ bookingData, setBookingData, onNext, onBack }) {
  const [availableSpots, setAvailableSpots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSpots = async () => {
      try {
        const spots = await api.getAvailableSpots();
        setAvailableSpots(spots);
        setLoading(false);
      } catch (err) {
        setError("Failed to load available spots");
        setLoading(false);
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
        {error && <div className="text-red-500 mb-4">{error}</div>}
        {loading ? (
          <div>Loading available spots...</div>
        ) : (
          <div className="space-y-4">
            <div>
              <Label>Select Camping Area</Label>
              <select
                value={bookingData.campingArea}
                onChange={(e) =>
                  setBookingData({
                    ...bookingData,
                    campingArea: e.target.value,
                  })
                }
                className="w-full p-2 border rounded mt-1"
              >
                <option value="">Select an area</option>
                {availableSpots.map((spot) => (
                  <option key={spot.area} value={spot.area}>
                    {spot.area} ({spot.spots} spots available)
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="greenCamping"
                checked={bookingData.greenCamping}
                onCheckedChange={(checked) =>
                  setBookingData({
                    ...bookingData,
                    greenCamping: checked,
                  })
                }
              />
              <Label htmlFor="greenCamping">Green Camping (+249,-)</Label>
            </div>

            <div>
              <Label>Tent Setup</Label>
              <select
                value={bookingData.tentSetup}
                onChange={(e) =>
                  setBookingData({
                    ...bookingData,
                    tentSetup: e.target.value,
                  })
                }
                className="w-full p-2 border rounded mt-1"
              >
                <option value="">No tent setup</option>
                <option value="2person">2-Person Tent (299,-)</option>
                <option value="3person">3-Person Tent (399,-)</option>
              </select>
            </div>

            <div className="flex justify-between mt-4">
              <Button variant="outline" onClick={onBack}>
                Back
              </Button>
              <Button onClick={onNext} disabled={!bookingData.campingArea}>
                Continue to Personal Info
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
