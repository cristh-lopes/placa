"use client";

import ThemeRegistry from "../components/ThemeRegistry";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import { useState } from "react";

const SIDEBAR_WIDTH = 220;
const NAVBAR_HEIGHT = 64;
const FOOTER_HEIGHT = 48;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen((open) => !open);

  return (
    <html lang="en" style={{ height: '100%', minHeight: '100%' }}>
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Rajdhani:wght@700&display=swap" rel="stylesheet" />
      </head>
      <body style={{ margin: 0, padding: 0, height: '100%', minHeight: '100vh', boxSizing: 'border-box', display: 'flex', flexDirection: 'column' }}>
        <ThemeRegistry>
          <Navbar onMenuClick={toggleSidebar} />
          <Sidebar open={sidebarOpen} onClose={toggleSidebar} />
          <main
            style={{
              marginTop: NAVBAR_HEIGHT,
              marginLeft: 0,
              marginBottom: FOOTER_HEIGHT,
              flex: 1,
              minHeight: 0,
              height: `calc(100vh - ${NAVBAR_HEIGHT + FOOTER_HEIGHT}px)`,
              overflow: "auto",
              background: "inherit",
              boxSizing: "border-box",
              width: '100vw',
            }}
            className="main-responsive"
          >
            {children}
          </main>
          <Footer />
        </ThemeRegistry>
      </body>
    </html>
  );
}
