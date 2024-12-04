"use client";
import { useState } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Music } from "lucide-react";

export default function TicketSelection({ bookingData, setBookingData, onNext }) {
  const handleTicketTypeChange = (value) => {
    setBookingData({ ...bookingData, ticketType: value });
  };

  const handleCountChange = (value) => {
    setBookingData({ ...bookingData, ticketCount: parseInt(value) || 1 });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Music className="h-6 w-6" />
          Select Your Tickets
        </CardTitle>
      </CardHeader>
      <CardContent>
        <RadioGroup value={bookingData.ticketType} onValueChange={handleTicketTypeChange} className="mb-4">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="regular" id="regular" />
            <Label htmlFor="regular">Regular Ticket (799,-)</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="vip" id="vip" />
            <Label htmlFor="vip">VIP Ticket (1299,-)</Label>
          </div>
        </RadioGroup>

        <div className="mb-4">
          <Label htmlFor="count">Number of Tickets</Label>
          <Input type="number" id="count" min="1" value={bookingData.ticketCount} onChange={(e) => handleCountChange(e.target.value)} className="mt-1" />
        </div>

        <Button onClick={onNext} disabled={!bookingData.ticketType || bookingData.ticketCount < 1} className="w-full">
          Continue to Camping Options
        </Button>
      </CardContent>
    </Card>
  );
}
