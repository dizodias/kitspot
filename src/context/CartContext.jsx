'use client';

import { createContext, useState, useContext, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [carrinho, setCarrinho] = useState([]);
  const [inicializado, setInicializado] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
        const dadosSalvos = localStorage.getItem('kitspot-carrinho');
        if (dadosSalvos) {
          try {
            setCarrinho(JSON.parse(dadosSalvos));
          } catch (error) {
            console.error("Erro ao ler carrinho:", error);
          }
        }
        setInicializado(true);
    }
  }, []);

  useEffect(() => {
    if (inicializado) {
        localStorage.setItem('kitspot-carrinho', JSON.stringify(carrinho));
    }
  }, [carrinho, inicializado]);

  const adicionarAoCarrinho = (produto, tamanho, cor) => {
    const itemParaCarrinho = {
        ...produto,
        cartId: uuidv4(),
        tamanhoEscolhido: tamanho,
        corEscolhida: cor
    };
    
    setCarrinho((prevCarrinho) => [...prevCarrinho, itemParaCarrinho]);
    
  };

  const removerDoCarrinho = (cartId) => {
    const novoCarrinho = carrinho.filter(item => item.cartId !== cartId);
    setCarrinho(novoCarrinho);
  };

  const limparCarrinho = () => {
    setCarrinho([]);
    if (typeof window !== 'undefined') {
        localStorage.removeItem('kitspot-carrinho');
    }
  };

  const total = carrinho.reduce((acc, item) => acc + Number(item.preco), 0);

  return (
    <CartContext.Provider value={{ carrinho, adicionarAoCarrinho, removerDoCarrinho, limparCarrinho, total }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);