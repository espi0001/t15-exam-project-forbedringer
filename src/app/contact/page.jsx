import Contact from "@/components/Contact";
export const metadata = {
  title: "Foo Fest | Contact",
  description: "Get in touch with Foo Fest for any inquiries or support.",
};

export default function Page() {
  return (
    <div>
      <Contact /> {/* Reference til klientkomponenten */}
    </div>
  );
}
