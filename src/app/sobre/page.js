'use client';

import { FaRegHandshake, FaGlobeAmericas, FaAward } from 'react-icons/fa';

export default function SobreNos() {
  return (
    <div className="container mt-5 mb-5">
      {/* Hero Section */}
      <div className="row align-items-center mb-5">
        <div className="col-md-6">
            <h1 className="display-4 fw-bold mb-3" style={{color: '#1d1d1f'}}>Vestindo paixões desde 2025.</h1>
            <p className="lead text-muted">
                A KitSpot nasceu com uma missão simples: conectar torcedores aos mantos sagrados de seus times, com a qualidade que o futebol merece e a tecnologia de uma experiência de compra moderna.
            </p>
        </div>
        <div className="col-md-6">
            <div className="bg-light rounded-4 d-flex align-items-center justify-content-center" style={{height: '300px'}}>
                <span className="text-muted fw-bold display-1 opacity-25">KITSPOT</span>
            </div>
        </div>
      </div>

      <hr className="my-5 opacity-25" />

      {/* Valores */}
      <div className="row g-4 text-center">
        <div className="col-md-4">
            <div className="p-4 border rounded-4 h-100">
                <FaRegHandshake size={40} className="mb-3 text-primary" />
                <h4>Confiança</h4>
                <p className="text-muted small">Garantimos a autenticidade de todos os produtos e a segurança na entrega.</p>
            </div>
        </div>
        <div className="col-md-4">
            <div className="p-4 border rounded-4 h-100">
                <FaGlobeAmericas size={40} className="mb-3 text-success" />
                <h4>Abrangência</h4>
                <p className="text-muted small">Do Brasileirão às ligas europeias, nosso catálogo não tem fronteiras.</p>
            </div>
        </div>
        <div className="col-md-4">
            <div className="p-4 border rounded-4 h-100">
                <FaAward size={40} className="mb-3 text-warning" />
                <h4>Qualidade</h4>
                <p className="text-muted small">Tecidos tecnológicos, acabamento premium e durabilidade de campeão.</p>
            </div>
        </div>
      </div>
    </div>
  );
}