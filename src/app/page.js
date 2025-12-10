'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { useFilter } from '../context/FilterContext';

// Função auxiliar para cores das tags (Mesma lógica do Admin)
const getTagColor = (tag) => {
    switch(tag) {
        case 'LANÇAMENTO': return 'bg-primary';      // Azul
        case 'PROMOÇÃO': return 'bg-danger';         // Vermelho
        case 'KIT': return 'bg-warning text-dark';   // Amarelo
        case 'EXCLUSIVO KITSPOT': return 'bg-success'; // Verde
        default: return 'bg-secondary';
    }
};

export default function Home() {
  const { termoBusca, timeSelecionado } = useFilter(); 
  
  const [produtos, setProdutos] = useState([]);
  const [proximosJogos, setProximosJogos] = useState([]);

  useEffect(() => {
    carregarDados();
  }, [timeSelecionado]);

  const carregarDados = async () => {
    try {
        // Chamada para a API interna do Next.js (compatível com Vercel)
        const resProd = await axios.get('/api/produtos');
        setProdutos(resProd.data);

        if (timeSelecionado) {
            try {
                // Tenta buscar os jogos (você precisará criar a rota /api/jogos também)
                const resJogos = await axios.get(`/api/jogos?timeId=${timeSelecionado.id}`);
                setProximosJogos(resJogos.data);
            } catch (error) {
                console.warn("API de jogos não encontrada ou erro na busca.");
                setProximosJogos([]);
            }
        } else {
            setProximosJogos([]);
        }
    } catch (error) {
        console.error("Erro ao buscar dados. Verifique se a rota /api/produtos foi criada corretamente.");
    }
  };

  const produtosFiltrados = produtos.filter(p => {
    const nomeProduto = p.nome ? p.nome.toLowerCase() : '';
    const busca = termoBusca ? termoBusca.toLowerCase() : '';
    
    const matchTexto = nomeProduto.includes(busca);
    const matchTime = timeSelecionado ? p.timeId === timeSelecionado.id : true;
    
    return matchTexto && matchTime;
  });

  return (
    <div className="container mt-4">
      
      {/* CABEÇALHO DO TIME (SELECIONADO) */}
      {timeSelecionado ? (
        <div className="team-header">
            {/* Esquerda: Escudo e Info */}
            <div className="d-flex align-items-center gap-4 flex-grow-1">
                <img 
                    src={timeSelecionado.escudo} 
                    alt={timeSelecionado.nome} 
                    style={{height: '80px', filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.1))'}} 
                    onError={(e) => e.target.src='https://via.placeholder.com/80'}
                />
                <div>
                    <h2 className="fw-bold mb-0" style={{color: '#333'}}>{timeSelecionado.nome}</h2>
                    <p className="text-muted mb-0">Loja Oficial e Licenciada</p>
                </div>
            </div>

            {/* Direita: Próximos Jogos */}
            <div className="d-none d-md-block" style={{minWidth: '250px', borderLeft: '1px solid #ddd', paddingLeft: '20px'}}>
                <small className="fw-bold text-uppercase text-muted">Próximos Jogos</small>
                {proximosJogos.length > 0 ? (
                    proximosJogos.map(jogo => (
                        <div key={jogo.id} className="game-card">
                            <div className="game-data">{jogo.data} • {jogo.torneio}</div>
                            <div className="game-vs">vs {jogo.adversario}</div>
                            <div className="game-local">📍 {jogo.local}</div>
                        </div>
                    ))
                ) : (
                    <p className="text-muted small mt-2">Nenhum jogo agendado.</p>
                )}
            </div>
        </div>
      ) : (
        !termoBusca && <h4 className="mb-4 fw-bold" style={{color: '#1a1d23'}}>Destaques da Semana</h4>
      )}

      {termoBusca && <p className="mb-4">Resultados para: <strong>{termoBusca}</strong></p>}
      
      {/* GRID DE PRODUTOS */}
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-3">
        {produtosFiltrados.length === 0 && (
            <div className="col-12 text-center py-5">
                <h3 className="text-muted">Nenhum produto encontrado.</h3>
            </div>
        )}

        {produtosFiltrados.map(prod => (
          <div key={prod.id} className="col">
            <Link href={`/produto/${prod.id}`} className="text-decoration-none text-dark">
              <div className={`card-produto h-100 d-flex flex-column ${prod.isKit ? 'border-warning' : ''} position-relative`}>
                
                {/* === ÁREA DAS TAGS (CORREÇÃO E DESTAQUE) === */}
                <div className="position-absolute top-0 end-0 p-2 d-flex flex-column gap-1" style={{zIndex: 10, alignItems: 'flex-end'}}>
                    
                    {/* Tag KIT (Visual Amarelo) - Mantém compatibilidade com isKit antigo ou nova tag */}
                    {(prod.isKit || prod.tags?.includes('KIT')) && (
                        <span className="badge bg-warning text-dark shadow-sm">KIT</span>
                    )}

                    {/* Outras Tags (Lançamento, Promoção, etc) */}
                    {prod.tags?.filter(t => t !== 'KIT').map(tag => (
                        <span key={tag} className={`badge ${getTagColor(tag)} shadow-sm`}>
                            {tag}
                        </span>
                    ))}
                </div>

                <div style={{height: '220px', marginBottom: '10px', overflow: 'hidden'}}>
                  {/* Se tiver a tag KIT ou for isKit, mostra o mashup de imagens */}
                  {(prod.isKit || prod.tags?.includes('KIT')) && prod.imagens.length >= 2 ? (
                      <div className="kit-mashup-container">
                          <img src={prod.imagens[0]} className="kit-mashup-item" alt="" />
                          <img src={prod.imagens[1]} className="kit-mashup-item" alt="" />
                      </div>
                  ) : (
                      <div style={{width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                          <img src={prod.imagens[0]} alt={prod.nome} style={{maxHeight: '100%', maxWidth: '100%', objectFit: 'contain'}} />
                      </div>
                  )}
                </div>
                
                <small className="text-muted" style={{fontSize: '0.8rem', textTransform: 'uppercase'}}>{prod.tipo}</small>
                <h6 className="card-title text-truncate mb-2" title={prod.nome} style={{fontWeight: '600'}}>{prod.nome}</h6>
                
                <div className="mt-auto">
                  <h4 className="mb-0" style={{fontWeight: '700', color: '#333'}}>
                    R$ {Math.floor(prod.preco)}<sup style={{fontSize: '0.6em'}}>,{(prod.preco % 1).toFixed(2).substring(2)}</sup>
                  </h4>
                  <small className="text-success fw-bold" style={{fontSize: '0.75rem'}}>
                    {(prod.isKit || prod.tags?.includes('KIT')) ? 'Frete Grátis' : '6x sem juros'}
                  </small>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}