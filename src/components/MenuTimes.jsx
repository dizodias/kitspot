'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaTimes, FaGlobe } from 'react-icons/fa';

export default function MenuTimes({ isOpen, onClose, onSelectTeam }) {
  const [ligas, setLigas] = useState([]);
  const [times, setTimes] = useState([]);

  useEffect(() => {
    if (isOpen) {
      axios.get('/api/ligas')
        .then(res => setLigas(res.data))
        .catch(err => console.error("Erro ao buscar ligas", err));
        
      axios.get('/api/times')
        .then(res => setTimes(res.data))
        .catch(err => console.error("Erro ao buscar times", err));
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSelection = (time) => {
    onSelectTeam(time);
    onClose();
  };

  return (
    <div className="team-menu-overlay" onMouseLeave={onClose}>
      <div className="container position-relative">
        <button className="btn btn-sm btn-light position-absolute top-0 end-0" onClick={onClose}>
          <FaTimes />
        </button>
        
        <div className="row">
          {ligas.map(liga => (
            <div key={liga.id} className="col-12 liga-section">
              <div className="liga-title">{liga.nome}</div>
              <div className="team-grid">
                {times.filter(t => t.ligaId === liga.id).map(time => (
                  <div key={time.id} className="team-item" onClick={() => handleSelection(time)}>
                    <img src={time.escudo} alt={time.nome} onError={(e) => e.target.src='https://via.placeholder.com/40'} />
                    <span>{time.nome}</span>
                  </div>
                ))}

                <div className="team-item" onClick={() => handleSelection(null)}>
                   <div style={{
                      width: '40px', height: '40px', borderRadius: '50%', background: '#eee',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '8px'
                    }}>
                      <FaGlobe color="#333" size={20} />
                   </div>
                   <span>TODOS</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}