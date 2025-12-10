'use client';

import { FaArrowRight } from 'react-icons/fa';

export default function Carreiras() {
  const vagas = [
    { id: 1, cargo: "Desenvolvedor Front-end (React/Next.js)", local: "Remoto", tipo: "Tempo Integral" },
    { id: 2, cargo: "Designer de UI/UX", local: "São Paulo, SP", tipo: "Híbrido" },
    { id: 3, cargo: "Analista de E-commerce Pleno", local: "Remoto", tipo: "Tempo Integral" },
    { id: 4, cargo: "Estagiário de Marketing Esportivo", local: "Rio de Janeiro, RJ", tipo: "Presencial" },
  ];

  return (
    <div className="container mt-5 mb-5" style={{maxWidth: '800px'}}>
      <div className="text-center mb-5">
        <span className="badge bg-primary bg-opacity-10 text-primary mb-2">Carreiras</span>
        <h1 className="fw-bold mb-3">Faça parte do time KitSpot</h1>
        <p className="text-muted">
            Estamos sempre em busca de talentos que compartilham nossa paixão por tecnologia e futebol. 
            Confira as posições abertas abaixo.
        </p>
      </div>

      <div className="list-group shadow-sm border-0">
        {vagas.map(vaga => (
            <a href="#" key={vaga.id} className="list-group-item list-group-item-action p-4 d-flex justify-content-between align-items-center border-bottom">
                <div>
                    <h5 className="mb-1 fw-bold">{vaga.cargo}</h5>
                    <div className="d-flex gap-3 text-muted small">
                        <span>📍 {vaga.local}</span>
                        <span>⏰ {vaga.tipo}</span>
                    </div>
                </div>
                <div className="btn btn-outline-dark rounded-pill btn-sm px-3">
                    Aplicar <FaArrowRight className="ms-1" size={10} />
                </div>
            </a>
        ))}
      </div>

      <div className="mt-5 text-center p-4 bg-light rounded-3">
        <h5>Não encontrou sua vaga?</h5>
        <p className="text-muted small mb-3">Envie seu currículo para nosso banco de talentos.</p>
        <button className="btn btn-dark" onClick={() => alert("Currículo enviado para o banco de talentos!")}>
            Enviar Currículo Espontâneo
        </button>
      </div>
    </div>
  );
}