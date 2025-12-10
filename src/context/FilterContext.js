'use client';

import { createContext, useState, useContext } from 'react';

const FilterContext = createContext();

export function FilterProvider({ children }) {
  const [termoBusca, setTermoBusca] = useState('');
  const [timeSelecionado, setTimeSelecionado] = useState(null);

  return (
    <FilterContext.Provider value={{ termoBusca, setTermoBusca, timeSelecionado, setTimeSelecionado }}>
      {children}
    </FilterContext.Provider>
  );
}

export const useFilter = () => useContext(FilterContext);