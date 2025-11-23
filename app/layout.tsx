import type { Metadata } from 'next';
import { Outfit } from 'next/font/google';
import './globals.css';
import { AIChatBot } from '@/components/ai-chat'; // Import the Chatbot

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  weight: ['300', '400', '600', '700'],
});

export const metadata: Metadata = {
  title: 'NeuroDash | AI Hackathon Platform',
  description: 'Train models and visualize datasets.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${outfit.variable} font-sans bg-dark text-white overflow-x-hidden`}
      >
        {children}

        {/* The AI Chatbot lives here, accessible on all pages */}
        <AIChatBot />
      </body>
    </html>
  );
}
