import { useState } from "react";
import { Body } from "../components/Body";
import { Navbar } from "../components/home/Navbar";
import { Sidebar } from "../components/home/Sidebar";

export const Courses = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (
    <Body>
      <div className="bg-white">
        <header className="absolute inset-x-0 top-0 z-50">
          <Navbar
            onPress={() => {
              setMobileMenuOpen(true);
            }}
          />
          <Sidebar
            menuValue={mobileMenuOpen}
            onClose={() => {
              setMobileMenuOpen(false);
            }}
          />
        </header>
      </div>
    </Body>
  );
};
