import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"; // UI-komponenter
import { Button } from "../ui/button"; // Knapkomponent
import { CheckCircle2 } from "lucide-react"; // Ikon

export default function Confirmation({ reservationId, onReset }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center text-green-600 flex items-center gap-2 text-step_h4 lg:text-step_h2">
          <CheckCircle2 size={50} />
          Thank you for your purchase!
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center space-y-4">
          <p>Your order has been confirmed.</p>
          <p>
            Reservation ID: <span className="font-bold">{reservationId}</span> {/* Viser reservations-ID */}
          </p>
          <p>We've sent the confirmation details to your email.</p>
          <Button className="text-white" onClick={onReset}>
            Book more tickets {/* Starter ny booking */}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
