export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>to do list</title>
      </head>
      <body suppressHydrationWarning={true}>{children}</body>
    </html>
  );
}
