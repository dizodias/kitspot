'use client';

import React from 'react';
import Link from 'next/link';
import { FaLock, FaCreditCard, FaBox, FaInstagram, FaTwitter, FaFacebookF } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="footer-apple mt-5">
      <div className="footer-content-wrapper">
        
        {/* Faixa de Confiança */}
        <div className="trust-badges-container row mb-4">
            <div className="col-md-4 mb-3 mb-md-0 trust-item">
                <FaCreditCard size={18} color="#333" />
                <div className="trust-text">
                    <h6>Parcele suas compras em até 12x</h6>
                    <p>Pagamentos seguros via Cartão ou Pix.</p>
                </div>
            </div>
            <div className="col-md-4 mb-3 mb-md-0 trust-item">
                <FaBox size={18} color="#333" />
                <div className="trust-text">
                    <h6>Entrega Expressa</h6>
                    <p>Frete grátis para compras acima de R$ 200.</p>
                </div>
            </div>
            <div className="col-md-4 trust-item">
                <FaLock size={18} color="#333" />
                <div className="trust-text">
                    <h6>Compra 100% Segura</h6>
                    <p>Proteção de dados de ponta a ponta.</p>
                </div>
            </div>
        </div>

        {/* Colunas de Links */}
        <div className="row">
          <div className="col-6 col-md-3 mb-4 footer-column">
            <h5>Descobrir e Comprar</h5>
            <Link href="/" className="footer-link">Loja</Link>
            <Link href="/tabela" className="footer-link">Tabela Brasileirão</Link>
            <Link href="/kits" className="footer-link">Kits Promocionais</Link>
          </div>

          <div className="col-6 col-md-3 mb-4 footer-column">
            <h5>Sua Conta</h5>
            <Link href="/carrinho" className="footer-link">Gerenciar Pedidos</Link>
          </div>

          <div className="col-6 col-md-3 mb-4 footer-column">
            <h5>KitSpot Store</h5>
            <Link href="/sobre" className="footer-link">Sobre nós</Link>
            <Link href="/trabalhe-conosco" className="footer-link">Carreiras</Link>
          </div>

          <div className="col-6 col-md-3 mb-4 footer-column">
            <h5>Ajuda</h5>
            <Link href="/contato" className="footer-link">Fale Conosco</Link>
          </div>
        </div>

        {/* Rodapé Final */}
        <div className="footer-bottom-apple">
            <div className="d-flex align-items-center gap-2">
                <small>Copyright © {new Date().getFullYear()} KitSpot Inc. Todos os direitos reservados.</small>
            </div>
        </div>
      </div>
    </footer>
  );
}