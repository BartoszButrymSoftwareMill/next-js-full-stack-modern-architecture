export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex grow justify-center items-center w-full">
      {children}
    </div>
  );
}
