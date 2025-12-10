'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaCircle } from 'react-icons/fa';

// --- ESTILOS ESTILO GE ---
const tableStyles = `
  .tabela-container {
    background: white;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 10px rgba(0,0,0,0.05);
    border: 1px solid #e0e0e0;
  }
  
  .table-ge {
    width: 100%;
    border-collapse: collapse;
    font-family: 'Inter', sans-serif;
  }

  .table-ge th {
    background-color: #f7f7f7;
    color: #999;
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
    padding: 12px 8px;
    text-align: center;
    border-bottom: 1px solid #ddd;
  }
  
  .table-ge th.text-left { text-align: left; padding-left: 20px; }

  .table-ge td {
    padding: 12px 8px;
    border-bottom: 1px solid #eee;
    font-size: 0.9rem;
    color: #333;
    vertical-align: middle;
  }

  /* Linhas zebradas suaves */
  .table-ge tbody tr:hover {
    background-color: #fafafa;
  }

  /* BOLINHAS DE POSIÇÃO */
  .pos-number {
    display: inline-block;
    width: 24px;
    height: 24px;
    line-height: 24px;
    text-align: center;
    border-radius: 4px; /* Levemente quadrado como no GE */
    font-weight: bold;
    font-size: 0.85rem;
    color: #333;
  }

  /* CORES DAS ZONAS */
  .zone-libertadores { color: #00a0e4; }        /* Azul GE */
  .zone-pre-libertadores { color: #00d4ff; }    /* Azul Claro */
  .zone-sulamericana { color: #1f8e25; }        /* Verde */
  .zone-rebaixamento { color: #e30613; }        /* Vermelho */
  .zone-neutra { color: #999; }

  /* Destaque para o nome do time */
  .team-name {
    font-weight: 600;
    color: #1d1d1f;
  }

  /* LEGENDA */
  .legenda-box {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 0.75rem;
    color: #666;
    margin-right: 15px;
    margin-bottom: 5px;
  }
  .legenda-dot {
    width: 10px;
    height: 10px;
    display: inline-block;
    border-radius: 2px;
  }
`;

export default function Tabela() {
  const [times, setTimes] = useState([]);

  useEffect(() => {
    // Busca a tabela do json-server
    axios.get('/api/tabela')
      .then(res => setTimes(res.data))
      .catch(err => console.error("Erro ao carregar tabela:", err));
  }, []);

  // Função para definir a classe da cor baseada na posição
  const getZoneClass = (pos) => {
    if (pos <= 4) return 'zone-libertadores';
    if (pos <= 6) return 'zone-pre-libertadores';
    if (pos <= 12) return 'zone-sulamericana';
    if (pos >= 17) return 'zone-rebaixamento';
    return 'zone-neutra';
  };

  return (
    <div className="container mt-5 mb-5">
      <style>{tableStyles}</style>
      
      <h2 className="mb-4 fw-bold text-dark">Tabela Brasileirão Série A</h2>
      
      <div className="tabela-container mb-4">
        <div className="table-responsive">
            <table className="table-ge">
            <thead>
                <tr>
                <th className="text-left">Classificação</th>
                <th>P</th>
                <th>J</th>
                <th>V</th>
                <th>E</th>
                <th>D</th>
                <th className="d-none d-md-table-cell">GP</th>
                <th className="d-none d-md-table-cell">GC</th>
                <th className="d-none d-md-table-cell">SG</th>
                <th className="d-none d-md-table-cell">%</th>
                </tr>
            </thead>
            <tbody>
                {times.map((time) => (
                <tr key={time.time}>
                    <td className="text-left" style={{minWidth: '200px'}}>
                        <strong className={`pos-number ${getZoneClass(time.posicao)} me-2`}>
                            {time.posicao}
                        </strong>
                        <span className="team-name">{time.time}</span>
                    </td>
                    <td className="text-center fw-bold bg-light">{time.pontos}</td>
                    <td className="text-center">{time.jogos}</td>
                    <td className="text-center bg-light">{time.vitorias}</td>
                    <td className="text-center">{time.empates}</td>
                    <td className="text-center bg-light">{time.derrotas}</td>
                    {/* Colunas extras calculadas ou fictícias para completar o visual GE */}
                    <td className="text-center d-none d-md-table-cell">{time.vitorias * 2 + 5}</td> {/* GP Fake */}
                    <td className="text-center d-none d-md-table-cell bg-light">{time.derrotas * 1 + 10}</td> {/* GC Fake */}
                    <td className="text-center d-none d-md-table-cell">{(time.vitorias * 2 + 5) - (time.derrotas * 1 + 10)}</td> {/* SG */}
                    <td className="text-center d-none d-md-table-cell bg-light">{Math.round((time.pontos / (time.jogos * 3)) * 100)}</td> {/* % */}
                </tr>
                ))}
            </tbody>
            </table>
        </div>
      </div>

      {/* LEGENDA NO RODAPÉ */}
      <div className="d-flex flex-wrap border-top pt-3">
          <div className="legenda-box">
              <span className="legenda-dot" style={{background: '#00a0e4'}}></span> Libertadores
          </div>
          <div className="legenda-box">
              <span className="legenda-dot" style={{background: '#00d4ff'}}></span> Pré-Libertadores
          </div>
          <div className="legenda-box">
              <span className="legenda-dot" style={{background: '#1f8e25'}}></span> Sul-Americana
          </div>
          <div className="legenda-box">
              <span className="legenda-dot" style={{background: '#e30613'}}></span> Rebaixamento
          </div>
          <div className="legenda-box">
              <span className="legenda-dot" style={{background: '#999'}}></span> Mantém
          </div>
      </div>
    </div>
  );
}