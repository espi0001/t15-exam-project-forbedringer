"use client";
import { useState } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { User } from "lucide-react";
import { MdArrowLeft } from "react-icons/md";

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
          <User size={50} />
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
                <Label htmlFor={`name-${index}`}>Full name</Label> {/* Label for navn */}
                <Input id={`name-${index}`} name={`name-${index}`} value={bookingData.personalInfo[index]?.name || ""} placeholder="Jane Foo" onChange={(e) => handleInfoChange(index, "name", e.target.value)} className="mt-1 placeholder:text-gray-400" />
              </div>
              {/* Input for e-mail */}
              <div>
                <Label htmlFor={`email-${index}`}>Email</Label> {/* Label for e-mail */}
                <Input id={`email-${index}`} name={`email-${index}`} type="email" value={bookingData.personalInfo[index]?.email || ""} placeholder="foofest@mail.com" onChange={(e) => handleInfoChange(index, "email", e.target.value)} className="mt-1 placeholder:text-gray-400" />
              </div>
            </div>
          </div>
        ))}

        {/* Navigationsknapper */}
        <div className="flex justify-between mt-4">
          <Button variant="outline" onClick={onBack}>
            {/* Knappen for at gå tilbage */}
            <MdArrowLeft size={20} />
            Back {/* Gå tilbage til forrige trin */}
          </Button>
          <Button type="submit" variant="tertiary" disabled={!isValid()}>
            {/* Knappen for at gå videre, kun aktiv hvis validering er ok */}
            Continue to payment
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
