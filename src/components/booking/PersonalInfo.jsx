"use client";
import { useState } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card";
import { Label } from "../ui/Label";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import { User } from "lucide-react";

export default function PersonalInfo({ bookingData, setBookingData, onNext, onBack }) {
  // Funktion til at opdatere personlige oplysninger for hver billet
  const handleInfoChange = (index, field, value) => {
    const newInfo = [...bookingData.personalInfo]; // Kopier den eksisterende personalInfo-array
    if (!newInfo[index]) newInfo[index] = {}; // Initialiser objektet, hvis det ikke findes
    newInfo[index][field] = value; // Opdater det specifikke felt (name eller email)
    setBookingData({ ...bookingData, personalInfo: newInfo }); // Gem opdateringen i bookingData
  };

  // Validerer, om alle krævede oplysninger er udfyldt
  const isValid = () => {
    return (
      bookingData.personalInfo.length === bookingData.ticketCount && // Sikrer, at der er udfyldt oplysninger for hver billet
      bookingData.personalInfo.every((info) => info.name && info.email) // Tjekker, at både navn og e-mail er udfyldt
    );
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
        {/* Genererer inputfelter for hver billet */}
        {Array.from({ length: bookingData.ticketCount }).map((_, index) => (
          <div key={index} className="mb-6 p-4 border rounded">
            <h3 className="text-lg font-semibold mb-2">Ticket #{index + 1}</h3> {/* Vis hvilken billet der udfyldes */}
            <div className="space-y-4">
              {/* Input for fulde navn */}
              <div>
                <Label htmlFor={`name-${index}`}>Full Name</Label> {/* Label for navn */}
                <Input
                  id={`name-${index}`} // Unik ID for inputfelt
                  value={bookingData.personalInfo[index]?.name || ""} // Forvalgt værdi
                  onChange={(e) => handleInfoChange(index, "name", e.target.value)} // Opdater navn i state
                  className="mt-1"
                />
              </div>
              {/* Input for e-mail */}
              <div>
                <Label htmlFor={`email-${index}`}>Email</Label> {/* Label for e-mail */}
                <Input
                  id={`email-${index}`} // Unik ID for inputfelt
                  type="email"
                  name="email"
                  value={bookingData.personalInfo[index]?.email || ""} // Forvalgt værdi
                  onChange={(e) => handleInfoChange(index, "email", e.target.value)} // Opdater e-mail i state
                  className="mt-1"
                  required
                />
              </div>
            </div>
          </div>
        ))}

        {/* Navigationsknapper */}
        <div className="flex justify-between mt-4">
          <Button variant="outline" onClick={onBack}>
            {/* Knappen for at gå tilbage */}
            Back
          </Button>
          <Button variant="secondary" onClick={onNext} disabled={!isValid()}>
            {/* Knappen for at gå videre, kun aktiv hvis validering er ok */}
            Continue to Payment
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
