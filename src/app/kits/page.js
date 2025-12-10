'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

export default function KitsPage() {
  const [kits, setKits] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/api/produtos')
      .then(res => {
        // Filtra tudo que é KIT (pela flag antiga ou pela nova tag)
        const apenasKits = res.data.filter(p => p.isKit || p.tags?.includes('KIT'));
        setKits(apenasKits);
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="container mt-5 text-center">Carregando ofertas...</div>;

  return (
    <div className="container mt-5 mb-5">
      <div className="text-center mb-5">
        <h1 className="fw-bold" style={{color: '#1d1d1f'}}>Kits & Combos</h1>
        <p className="text-muted">Economize comprando o uniforme completo do seu time de coração.</p>
      </div>

      {kits.length === 0 ? (
        <div className="text-center py-5">
            <h3>Nenhum kit disponível no momento. :(</h3>
            <Link href="/" className="btn btn-primary mt-3">Voltar para a Loja</Link>
        </div>
      ) : (
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
            {kits.map(kit => (
            <div key={kit.id} className="col">
                <Link href={`/produto/${kit.id}`} className="text-decoration-none text-dark">
                <div className="card h-100 border-0 shadow-sm overflow-hidden" style={{borderRadius: '16px'}}>
                    <div className="position-relative" style={{height: '250px', background: '#f9f9f9'}}>
                        <span className="badge bg-warning text-dark position-absolute top-0 end-0 m-3 shadow-sm">
                            OFERTA ESPECIAL
                        </span>
                        {/* Mashup de imagens para o Kit */}
                        <div className="w-100 h-100 d-flex align-items-center justify-content-center">
                            {kit.imagens.length >= 2 ? (
                                <>
                                    <img src={kit.imagens[0]} alt="" style={{height: '70%', transform: 'translateX(10px) scale(0.9)', zIndex: 1}} />
                                    <img src={kit.imagens[1]} alt="" style={{height: '80%', transform: 'translateX(-10px) scale(1.1)', zIndex: 2}} />
                                </>
                            ) : (
                                <img src={kit.imagens[0]} alt="" style={{maxHeight: '80%'}} />
                            )}
                        </div>
                    </div>
                    <div className="card-body text-center">
                        <h5 className="fw-bold mb-1">{kit.nome}</h5>
                        <small className="text-muted text-uppercase">{kit.timeId ? 'Oficial' : 'Promocional'}</small>
                        <h3 className="fw-bold mt-3" style={{color: '#0071e3'}}>
                            R$ {Math.floor(kit.preco)},{(kit.preco % 1).toFixed(2).substring(2)}
                        </h3>
                        <p className="small text-success fw-bold">Frete Grátis para todo Brasil</p>
                    </div>
                </div>
                </Link>
            </div>
            ))}
        </div>
      )}
    </div>
  );
}