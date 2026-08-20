import { Liter, Unbounded, Geist } from 'next/font/google';
import localFont from 'next/font/local'; // Assuming you kept the Geist local font from Next 15 setup
import './globals.css';

const liter = Liter({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-liter'
});

const unbounded = Unbounded({
  subsets: ['latin'],
  weight: '900',
  variable: '--font-unbounded'
});

const geist = Geist({
  subsets: ['latin'],
  weight: '900',
  variable: '--font-geist'
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${liter.variable} ${unbounded.variable} ${geist.variable} antialiased`}>
      <body>
        {children}
      </body>
    </html>
  );
}