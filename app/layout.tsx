import "./global.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ecommerce",
  description: "A shoe store",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
        <div id="modal-root" />
      </body>
    </html>
  );
}
