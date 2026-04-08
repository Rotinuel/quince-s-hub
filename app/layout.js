import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Providers from '@/components/Providers';

export const metadata = {
  title: 'Quinces Hub – Quality Products at Your Doorstep',
  description: 'Shop essentials, fashion, bags, shoes, fitness items, household items, kitchen and home products. Fast delivery in Lagos and across Nigeria.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-[#faf9f7] text-[#1a1a1a] font-sans antialiased">
        <Providers>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
