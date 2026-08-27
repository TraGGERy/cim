import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'CIM Level 6 Master • Commercial Intelligence & Strategy Hub',
  description: 'Exam-accurate learning, onscreen testing simulator, 3D WebGL models, and interruptive active-recall training based on the official 2024 V1.1 CIM Qualification Specifications.'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="bg-slate-950 text-slate-100 antialiased min-h-screen selection:bg-blue-600 selection:text-white">
        {children}
      </body>
    </html>
  );
}
