"use client";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"; // UI-komponenter
import { Label } from "../ui/label"; // Label-komponent
import { Input } from "../ui/input"; // Input-komponent
import { Button } from "../ui/button"; // Knapkomponent
import { User } from "lucide-react"; // Ikon for bruger
import { MdArrowLeft } from "react-icons/md"; // Ikon til tilbage-knappen

export default function PersonalInfo({ bookingData, setBookingData, onNext, onBack }) {
  // Opdaterer personlige oplysninger for en specifik billet
  const handleInfoChange = (index, field, value) => {
    const newInfo = [...bookingData.personalInfo]; // Kopierer personlige oplysninger
    if (!newInfo[index]) newInfo[index] = {}; // Initialiser objektet, hvis det ikke findes
    newInfo[index][field] = value; // Opdater teltopsætning for specifik billet
    setBookingData({ ...bookingData, personalInfo: newInfo }); // Gemmer opdaterede oplysninger
  };

  // Validerer, om alle krævede oplysninger er udfyldt
  const isValid = () => {
    return (
      bookingData.personalInfo.length === bookingData.ticketCount && // Tjekker, at der er indtastet data for alle billetter
      bookingData.personalInfo.every((info) => info.name && info.email) // Tjekker, at navn og email er udfyldt
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-step_h4 lg:text-step_h2">
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
                <Input
                  id={`name-${index}`}
                  name={`name-${index}`}
                  value={bookingData.personalInfo[index]?.name || ""} // Forvalgt værdi
                  placeholder="Jane Foo"
                  onChange={(e) => handleInfoChange(index, "name", e.target.value)} // Opdaterer navn
                  className="mt-1 placeholder:text-grey_color"
                />
              </div>
              {/* Input for e-mail */}
              <div>
                <Label htmlFor={`email-${index}`}>Email</Label> {/* Label for e-mail */}
                <Input
                  id={`email-${index}`}
                  name={`email-${index}`}
                  type="email"
                  value={bookingData.personalInfo[index]?.email || ""} // Forvalgt værdi
                  placeholder="janefoo@email.com"
                  onChange={(e) => handleInfoChange(index, "email", e.target.value)} // Opdaterer email
                  className="mt-1 placeholder:text-grey_color"
                />
              </div>
              {/* Vælg opsætning af telt */}
              <div className="pt-4">
                <Label>Tent setup</Label>
                <select
                  value={bookingData.personalInfo[index]?.tentSetup || ""} // Unik værdi for hver billet
                  onChange={(e) => handleInfoChange(index, "tentSetup", e.target.value)} // Håndter opdatering
                  className="w-full p-2 text-step_text_regular border rounded mt-1 bg-white_color"
                >
                  <option value="">No tent setup</option>
                  <option value="2person">2-Person Tent (299,-)</option>
                  <option value="3person">3-Person Tent (399,-)</option>
                </select>
              </div>
            </div>
          </div>
        ))}

        {/* Tilbage og Fortsæt */}
        <div className="flex justify-between mt-4">
          <Button variant="outline" onClick={onBack}>
            <MdArrowLeft size={20} />
            Back {/* Gå tilbage til forrige trin */}
          </Button>
          <Button
            className="text-white"
            type="submit"
            variant="tertiary"
            disabled={!isValid()} // Deaktiveret uden gyldige data
          >
            {/* Knappen for at gå videre, kun aktiv hvis validering er ok */}
            Continue to payment
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
