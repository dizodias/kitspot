import './globals.css';
import { CartProvider } from '../context/CartContext';
import { FilterProvider } from '../context/FilterContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export const metadata = {
  title: 'KitSpot',
  description: 'A sua loja de camisas de time favorita.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        <CartProvider>
          <FilterProvider> {/* Envolvendo com o contexto de filtro */}
            
            <Navbar />
            
            <div id="app-root">
                {children}
            </div>

            <Footer />
            
          </FilterProvider>
        </CartProvider>
      </body>
    </html>
  );
}