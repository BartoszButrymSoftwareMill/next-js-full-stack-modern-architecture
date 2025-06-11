export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex justify-center px-4 pb-4">
      <div className="w-full max-w-5xl px-6">{children}</div>
    </main>
  );
}
