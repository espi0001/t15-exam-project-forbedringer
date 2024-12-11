// Import af nødvendige moduler
import * as React from "react"; // Importerer React biblioteket
import { Slot } from "@radix-ui/react-slot"; // Importerer Slot komponent fra Radix UI (bruges til at overføre renderede komponenter som børn)
import { cva } from "class-variance-authority"; // Importerer cva funktion, som hjælper med at håndtere CSS-klasser baseret på varianter

import { cn } from "@/lib/utils"; // Importerer en hjælpefunktion (cn) til at sammensætte klasse-navne

// Definerer en cva-funktion til at oprette forskellige knap-variantstile
const buttonVariants = cva(
  "transition-all duration-500 ease-in-out inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-step_p font-medium border focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", // Standard klasser for knap-udseende og tilstande
  {
    // Konfiguration af varianter for knappen (f.eks. farver, størrelse)
    variants: {
      variant: {
        // De forskellige knap-varianter, som kan anvendes
        default: "bg-black_color border-black_color hover:bg-red_color hover:border-red_color text-white_color hover:text-white_color",
        secondary: "bg-red_color border-red_color text-white_color hover:border hover:border-white_color",
        tertiary: "bg-red_color border-red_color text-white_color hover:bg-black_color",
        footer: "bg-black_color border-black_color text-black_color hover:bg-black_color hover:text-white_color",
        outline: "border-red_color hover:bg-accent",
      },
      size: {
        // De forskellige størrelser, som knappen kan have
        default: "h-9 px-4 py-2", // Standardstørrelse
        sm: "h-8 rounded-full px-3 text-xs", // Lille størrelse
        lg: "rounded-full px-6 py-2", // Stor størrelse
        xl: "rounded-full px-16 py-4 text-[1.1rem]",
      },
    },
    // Standardværdier, hvis ingen varianter angives
    defaultVariants: {
      variant: "default", // Standard-variant er 'default'
      size: "default", // Standard-størrelse er 'default'
    },
  }
);

// Knap-komponenten, der accepterer forskellige props for at tilpasse knappen
const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  // Bestemmer, om knappen skal være et 'button' eller en Slot (brugerdefineret komponent)
  const Comp = asChild ? Slot : "button";

  // Returnerer knappen med de anvendte CSS-klasser og eventuelle andre props
  return (
    <Comp
      className={cn(buttonVariants({ variant, size, className }))} // Anvender cva-funktionen til at generere de rette klasser
      ref={ref} // Giver ref til komponenten (bruges f.eks. til at få adgang til DOM-elementet)
      {...props}
    /> // Overfører øvrige props til knappen (som f.eks. onClick, disabled)
  );
});
Button.displayName = "Button"; // Sætter et navn for komponenten (kan bruges til debugging)

export { Button, buttonVariants }; // Eksporterer knap-komponenten og buttonVariants for at kunne bruges andre steder
