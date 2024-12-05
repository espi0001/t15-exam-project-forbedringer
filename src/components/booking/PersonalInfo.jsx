"use client";
import { useState } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { User } from "lucide-react";

export default function PersonalInfo({ bookingData, setBookingData, onNext, onBack }) {
  const handleInfoChange = (index, field, value) => {
    const newInfo = [...bookingData.personalInfo];
    if (!newInfo[index]) newInfo[index] = {};
    newInfo[index][field] = value;
    setBookingData({ ...bookingData, personalInfo: newInfo });
  };

  const isValid = () => {
    return bookingData.personalInfo.length === bookingData.ticketCount && bookingData.personalInfo.every((info) => info.name && info.email);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-6 w-6" />
          Personal Information
        </CardTitle>
      </CardHeader>
      <CardContent>
        {Array.from({ length: bookingData.ticketCount }).map((_, index) => (
          <div key={index} className="mb-6 p-4 border rounded">
            <h3 className="text-lg font-semibold mb-2">Ticket #{index + 1}</h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor={`name-${index}`}>Full Name</Label>
                <Input id={`name-${index}`} value={bookingData.personalInfo[index]?.name || ""} onChange={(e) => handleInfoChange(index, "name", e.target.value)} className="mt-1" />
              </div>
              <div>
                <Label htmlFor={`email-${index}`}>Email</Label>
                <Input id={`email-${index}`} type="email" value={bookingData.personalInfo[index]?.email || ""} onChange={(e) => handleInfoChange(index, "email", e.target.value)} className="mt-1" />
              </div>
            </div>
          </div>
        ))}

        <div className="flex justify-between mt-4">
          <Button variant="outline" onClick={onBack}>
            Back
          </Button>
          <Button onClick={onNext} disabled={!isValid()}>
            Continue to Payment
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
