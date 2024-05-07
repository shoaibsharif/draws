import { ColorSchemeScript } from "@mantine/core";
import "@mantine/core/styles.css";
import { PropsWithChildren } from "react";
import { Toaster } from "react-hot-toast";
import "./globals.scss";
import { Providers } from "./providers";

export const metadata = {
  title: "Graphland Drawing Tool",
};

const RootLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <Providers>{children}</Providers>
        <Toaster position="bottom-right" />
      </body>
    </html>
  );
};

export default RootLayout;
