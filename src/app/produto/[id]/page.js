'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import { useCart } from '../../../context/CartContext';
import { FaHeart, FaShareAlt } from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

// Estilos customizados para o Swiper (bolinhas azuis)
const swiperStyles = `
  .swiper-pagination-bullet-active {
    background-color: #0071e3 !important;
  }
  .swiper-pagination-bullet {
    width: 8px;
    height: 8px;
  }
`;

// Função auxiliar para cores das tags
const getTagColor = (tag) => {
    switch(tag) {
        case 'LANÇAMENTO': return 'bg-primary';      // Azul
        case 'PROMOÇÃO': return 'bg-danger';         // Vermelho
        case 'KIT': return 'bg-warning text-dark';   // Amarelo
        case 'EXCLUSIVO KITSPOT': return 'bg-success'; // Verde
        default: return 'bg-secondary';
    }
};

export default function ProdutoDetalhes() {
    const params = useParams();
    const id = params.id;
    const [produto, setProduto] = useState(null);
    const [imagemAtiva, setImagemAtiva] = useState('');
    
    // Estados de seleção
    const [tamanhoSelecionado, setTamanhoSelecionado] = useState('');
    const [corSelecionada, setCorSelecionada] = useState('');
    
    const { adicionarAoCarrinho } = useCart();

    // Função segura para adicionar ao carrinho
    const handleAddToCart = () => {
        // Validação: Se o produto tem tamanhos, o usuário TEM que escolher
        if (produto.tamanhos && produto.tamanhos.length > 0 && !tamanhoSelecionado) {
            alert("⚠️ Por favor, selecione um tamanho antes de continuar.");
            return;
        }
        
        // Se passou, adiciona com os detalhes
        adicionarAoCarrinho(produto, tamanhoSelecionado, corSelecionada);
    }; 

    useEffect(() => {
        if (id) {
            axios.get(`/api/produtos/${id}`)
                .then(res => {
                    setProduto(res.data);
                    // Define a primeira imagem como ativa ao carregar
                    if (res.data.imagens && res.data.imagens.length > 0) {
                        setImagemAtiva(res.data.imagens[0]);
                    }
                })
                .catch(() => console.error("Produto não encontrado"));
        }
    }, [id]);

    if (!produto) return <div className="container mt-5 text-center pt-5">Carregando detalhes...</div>;

    return (
        <div className="container mt-4 bg-white p-0 p-md-4 rounded shadow-sm" style={{ minHeight: '80vh' }}>
            <style>{swiperStyles}</style>

            <div className="row g-0 g-md-4">
                {/* === MOBILE: CAROUSEL SWIPER === */}
                <div className="col-12 d-md-none position-relative mb-3">
                    <div className="position-absolute top-0 start-0 p-3 w-100 d-flex justify-content-between" style={{ zIndex: 10 }}>
                        {/* Se for lançamento, mostra badge novo */}
                        {produto.tags?.includes('LANÇAMENTO') && <span className="badge bg-primary shadow-sm">Novo</span>}
                        
                        <div className="d-flex gap-3 ms-auto">
                            <button className="btn btn-light btn-sm rounded-circle shadow-sm"><FaHeart color="#ccc" /></button>
                            <button className="btn btn-light btn-sm rounded-circle shadow-sm"><FaShareAlt color="#ccc" /></button>
                        </div>
                    </div>

                    <Swiper
                        modules={[Pagination]}
                        pagination={{ clickable: true, dynamicBullets: true }}
                        spaceBetween={0}
                        slidesPerView={1}
                        style={{ width: '100%', height: '380px', paddingBottom: '30px' }}
                    >
                        {produto.imagens.map((img, idx) => (
                            <SwiperSlide key={idx} className="d-flex align-items-center justify-content-center bg-light">
                                <img
                                    src={img}
                                    alt={`Foto ${idx}`}
                                    style={{ width: '100%', height: '100%', objectFit: 'contain', mixBlendMode: 'multiply' }}
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>

                {/* === DESKTOP: GALERIA VERTICAL === */}
                <div className="col-md-1 d-none d-md-flex flex-column gap-2">
                    {produto.imagens.map((img, idx) => (
                        <img
                            key={idx}
                            src={img}
                            className={`img-thumbnail ${imagemAtiva === img ? 'border-primary' : ''}`}
                            style={{ cursor: 'pointer', opacity: imagemAtiva === img ? 1 : 0.6, transition: 'all 0.2s' }}
                            onMouseEnter={() => setImagemAtiva(img)}
                            alt="Miniatura"
                        />
                    ))}
                </div>

                <div className="col-md-5 d-none d-md-flex justify-content-center align-items-center border-end position-relative bg-white">
                    <img src={imagemAtiva} className="img-fluid" style={{ maxHeight: '500px', objectFit: 'contain' }} alt={produto.nome} />
                </div>

                {/* === INFO DO PRODUTO (LADO DIREITO) === */}
                <div className="col-md-5 ps-md-4 p-4">
                    
                    {/* ÁREA DE TAGS/ETIQUETAS */}
                    <div className="d-flex flex-wrap gap-2 mb-2">
                        {/* Compatibilidade: Se for kit antigo ou tiver a tag KIT */}
                        {(produto.isKit || produto.tags?.includes('KIT')) && (
                             <span className="badge bg-warning text-dark">KIT</span>
                        )}
                        
                        {/* Renderiza as outras tags (removendo KIT duplicado se houver) */}
                        {produto.tags?.filter(t => t !== 'KIT').map(tag => (
                            <span key={tag} className={`badge ${getTagColor(tag)}`}>
                                {tag}
                            </span>
                        ))}
                    </div>

                    <small className="text-muted d-none d-md-block text-uppercase" style={{ fontSize: '0.75rem', letterSpacing: '1px' }}>
                        {produto.tipo} | +100 vendidos
                    </small>

                    <h1 className="fw-bold mb-2 mt-1" style={{ fontSize: 'clamp(1.5rem, 2.5vw, 1.8rem)', color: '#1d1d1f' }}>
                        {produto.nome}
                    </h1>

                    <div className="mb-3">
                        <h2 className="d-inline fw-light" style={{ fontSize: '2.5rem', color: '#1d1d1f' }}>
                            R$ {Math.floor(produto.preco)}
                        </h2>
                        <sup style={{ fontSize: '1rem', top: '-0.8em' }}>,{(produto.preco % 1).toFixed(2).substring(2)}</sup>
                        <p className="text-success fw-bold small mb-0">em até 12x sem juros</p>
                    </div>

                    {/* Seleção de Cor */}
                    {produto.cores && produto.cores.length > 0 && (
                        <div className="mb-4">
                            <label className="fw-bold small mb-2 text-uppercase text-muted">Cor: {corSelecionada}</label>
                            <div className="d-flex flex-wrap gap-2">
                                {produto.cores.map(cor => (
                                    <button key={cor}
                                        className={`btn btn-sm ${corSelecionada === cor ? 'btn-dark' : 'btn-outline-secondary'}`}
                                        style={{ minWidth: '40px', borderRadius: '8px' }}
                                        onClick={() => setCorSelecionada(cor)}>
                                        {cor}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Seleção de Tamanho */}
                    {produto.tamanhos && produto.tamanhos.length > 0 && (
                        <div className="mb-4">
                            <label className="fw-bold small mb-2 text-uppercase text-muted">Tamanho: {tamanhoSelecionado}</label>
                            <div className="d-flex flex-wrap gap-2">
                                {produto.tamanhos.map(tam => (
                                    <button key={tam}
                                        className={`btn btn-sm ${tamanhoSelecionado === tam ? 'btn-primary' : 'btn-outline-secondary'}`}
                                        style={{ minWidth: '45px', borderRadius: '8px' }}
                                        onClick={() => setTamanhoSelecionado(tam)}>
                                        {tam}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="d-grid gap-3 mt-5">
                        <button
                            className="btn btn-primary btn-lg py-3 rounded-pill fw-bold shadow-sm"
                            style={{ fontSize: '1.1rem' }}
                            onClick={handleAddToCart} 
                        >
                            Comprar Agora
                        </button>
                        <button
                            className="btn btn-outline-primary btn-lg py-3 rounded-pill fw-bold"
                            onClick={handleAddToCart} 
                        >
                            Adicionar à Sacola
                        </button>
                    </div>

                    <div className="mt-5 pt-4 border-top">
                        <h6 className="fw-bold mb-3">Descrição do Produto</h6>
                        <p className="text-muted" style={{ whiteSpace: 'pre-wrap', fontSize: '0.9rem', lineHeight: '1.6' }}>
                            {produto.descricao}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}