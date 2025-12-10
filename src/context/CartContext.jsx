'use client';

import { createContext, useState, useContext, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [carrinho, setCarrinho] = useState([]);

  useEffect(() => {
    const dadosSalvos = localStorage.getItem('kitspot-carrinho');
    if (dadosSalvos) {
      setCarrinho(JSON.parse(dadosSalvos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('kitspot-carrinho', JSON.stringify(carrinho));
  }, [carrinho]);

  const adicionarAoCarrinho = (produto, tamanho, cor) => {
    const itemParaCarrinho = {
        ...produto,
        cartId: uuidv4(), // ID único para este item no carrinho
        tamanhoEscolhido: tamanho,
        corEscolhida: cor
    };
    
    setCarrinho([...carrinho, itemParaCarrinho]);
    alert("Produto adicionado ao carrinho!");
  };

  const removerDoCarrinho = (cartId) => {
    const novoCarrinho = carrinho.filter(item => item.cartId !== cartId);
    setCarrinho(novoCarrinho);
  };

  const limparCarrinho = () => {
    setCarrinho([]);
    localStorage.removeItem('kitspot-carrinho');
  };

  const total = carrinho.reduce((acc, item) => acc + Number(item.preco), 0);

  return (
    <CartContext.Provider value={{ carrinho, adicionarAoCarrinho, removerDoCarrinho, limparCarrinho, total }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);