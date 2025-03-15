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
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { stone400 } from "@/lib/constants";

let persistor = persistStore(store);

const inter = Inter({ subsets: ["latin"] });
const theme = createTheme({
  typography: {
    fontFamily:
      '"Proxima Nova", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiInputBase-root": {
            "&.Mui-focused fieldset": {
              borderColor: stone400, // border color on focus
            },
          },
          "& .MuiInputLabel-root.Mui-focused": {
            color: stone400, // label color on focus
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: stone400, // select border color on focus
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          "&.Mui-focused": {
            color: stone400, // select label color on focus
          },
        },
      },
    },
  },
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider theme={theme}>
          <SessionProvider>
            <Provider store={store}>
              <PersistGate loading={null} persistor={persistor}>
                <div style={{ position: "absolute" }}>
                  <NavBar />
                  <div className="middle">{children}</div>
                  <Footer />
                </div>
              </PersistGate>
            </Provider>
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
