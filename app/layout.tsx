"use client";
import { SessionProvider } from "next-auth/react";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/navBar";
import Footer from "@/components/footer";
import { Provider } from "react-redux";
import { store } from "@/lib/store";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

let persistor = persistStore(store);

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider>
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              <NavBar />
              <div className="middle">{children}</div>
              <Footer />
            </PersistGate>
          </Provider>
        </SessionProvider>
      </body>
    </html>
  );
}
