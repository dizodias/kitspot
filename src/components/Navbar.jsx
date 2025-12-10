'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FaShoppingCart, FaSearch, FaShieldAlt, FaChevronDown, FaGlobe } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import { useFilter } from '../context/FilterContext';
import MenuTimes from './MenuTimes';
import logoKitSpot from '../../public/kitSpotLogoBlue.svg';

export default function Navbar() {
  const { carrinho } = useCart();
  const { termoBusca, setTermoBusca, timeSelecionado, setTimeSelecionado } = useFilter();
  const [menuAberto, setMenuAberto] = useState(false);

  return (
    <>
      <nav className="bg-kitspot sticky-top">
        <div className="container header-container">
          
          <div className="header-top">
              
              <div className="header-left">
                  <div className="times-btn" onClick={() => setMenuAberto(!menuAberto)}>
                      {timeSelecionado ? (
                          <img src={timeSelecionado.escudo} alt={timeSelecionado.nome} style={{width:'28px', height:'28px', objectFit:'contain'}} />
                      ) : (
                          <FaShieldAlt size={20} />
                      )}
                      <span className="d-none d-md-block text-uppercase ms-2" style={{fontSize: '0.85rem', letterSpacing: '1px'}}>
                          {timeSelecionado ? timeSelecionado.nome : "Times"}
                      </span>
                      <FaChevronDown size={10} className="ms-2" style={{opacity: 0.7}}/>
                  </div>
              </div>

              <div className="header-center">
                  <Link className="navbar-brand m-0 p-0" href="/">
                      <img src="/kitSpotLogoBlue.svg" alt="KitSpot" style={{ height: '45px' }} />
                  </Link>
              </div>

              <div className="header-right d-flex align-items-center gap-4">
                  <Link href="/carrinho" className="nav-link-custom position-relative" style={{color: 'var(--ks-accent)'}}>
                      <FaShoppingCart size={22} color="var(--ks-accent)" />
                      {carrinho.length > 0 && (
                      <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{fontSize: '0.6rem'}}>
                          {carrinho.length}
                      </span>
                      )}
                  </Link>
              </div>
          </div>

          <div className="header-bottom position-relative">
              <input
                  className="form-control search-bar"
                  type="search"
                  placeholder="O que você procura hoje?"
                  value={termoBusca}
                  onChange={(e) => setTermoBusca(e.target.value)}
              />
              <button className="btn position-absolute end-0 top-0 h-100 border-0" style={{ color: '#666', padding: '0 20px' }}>
                  <FaSearch size={18} />
              </button>
          </div>

        </div>
      </nav>

      {/* Menu Overlay fica aqui */}
      <MenuTimes 
        isOpen={menuAberto} 
        onClose={() => setMenuAberto(false)} 
        onSelectTeam={setTimeSelecionado} 
      />
    </>
  );
}