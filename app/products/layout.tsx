export default function ProductsLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-2 lg:px-4">
      {children}
      {modal}
    </div>
  );
}
