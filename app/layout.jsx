import "@/assets/styles/globals.css";
import Navbar from "@/components/Navbar";

// Sets metadata for the entire application
export const metadata = {
  title: "Property Pulse",
  keywords: "real estate, property, rentals",
  description: "Your go-to platform for real estate insights.",
};

const MainLayout = ({ children }) => {
  return (
    <html>
      <body>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
};

export default MainLayout;
