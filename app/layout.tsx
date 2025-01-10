import "./global.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ecommerce",
  description: "A shoe store",
};

export default function RootLayout(props: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <html>
      <body>
        {props.children}
        {props.modal}
        <div id="modal-root" />
      </body>
    </html>
  );
}
