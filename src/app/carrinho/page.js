'use client';

import { useState } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'next/navigation';
import { useCart } from '../../context/CartContext';
import Link from 'next/link';
import { FaTrash, FaArrowLeft, FaCheckCircle, FaQrcode, FaCreditCard, FaBarcode, FaShoppingCart, FaWifi } from 'react-icons/fa';

import './carrinho.css';

export default function Carrinho() {
  const { carrinho, removerDoCarrinho, total, limparCarrinho } = useCart();
  const [metodoPagamento, setMetodoPagamento] = useState('pix');
  const [parcelas, setParcelas] = useState(1);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const [cartao, setCartao] = useState({ numero: '', nome: '', validade: '', cvv: '' });
  const [isFlipped, setIsFlipped] = useState(false);

  // === CÁLCULOS ===
  const totalPix = total * 0.90;
  
  const calcularParcela = (numParcelas) => {
    if (numParcelas <= 3) {
        return total / numParcelas;
    } else {
        const taxa = 0.0199;
        const montante = total * Math.pow((1 + taxa), numParcelas);
        return montante / numParcelas;
    }
  };

  const totalFinal = metodoPagamento === 'pix' ? totalPix : (metodoPagamento === 'cartao' && parcelas > 3 ? calcularParcela(parcelas) * parcelas : total);
  const valorJuros = totalFinal - total;

  // === MÁSCARAS ===
  const handleNumeroCartao = (e) => {
    let v = e.target.value.replace(/\D/g, "").substring(0, 16);
    v = v.replace(/(\d{4})(\d)/, "$1 $2").replace(/(\d{4})(\d)/, "$1 $2").replace(/(\d{4})(\d)/, "$1 $2");
    setCartao({ ...cartao, numero: v });
  };

  const handleNome = (e) => {
    const v = e.target.value.replace(/[^a-zA-Z\s]/g, "").toUpperCase();
    setCartao({ ...cartao, nome: v });
  };

  const handleValidade = (e) => {
    let v = e.target.value.replace(/\D/g, "");
    if (v.length >= 2) v = v.substring(0, 2) + '/' + v.substring(2, 4);
    v = v.substring(0, 5);
    setCartao({ ...cartao, validade: v });
  };

  const handleCVV = (e) => {
    const v = e.target.value.replace(/\D/g, "").substring(0, 3);
    setCartao({ ...cartao, cvv: v });
  };

  const formatarMoeda = (valor) => {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  const finalizarCompra = async () => {
    if (carrinho.length === 0) return alert("Carrinho vazio!");
    
    if (metodoPagamento === 'cartao') {
        if (cartao.numero.length < 19 || !cartao.nome || cartao.validade.length < 5 || cartao.cvv.length < 3) {
            alert("⚠️ Preencha os dados do cartão corretamente.");
            return;
        }
    }

    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));

    const novaCompra = {
      id: uuidv4(),
      data: new Date().toLocaleString(),
      itens: carrinho,
      totalOriginal: total,
      totalPago: totalFinal,
      pagamento: metodoPagamento,
      parcelas: metodoPagamento === 'cartao' ? parcelas : 1,
      juros: valorJuros > 0 ? valorJuros : 0,
      status: "Pago"
    };

    try {
        await axios.post('/api/compras', novaCompra);
        alert("Compra realizada com sucesso! 🎉");
        limparCarrinho();
        router.push('/'); 
    } catch (error) {
        console.error(error);
        alert("Erro ao processar. O servidor está rodando?");
    } finally {
        setLoading(false);
    }
  };

  if (carrinho.length === 0) {
    return (
        <div className="container mt-5 text-center p-5 bg-white rounded shadow-sm" style={{minHeight: '60vh'}}>
            <div className="mb-4 text-muted"><FaShoppingCart size={60} /></div>
            <h3 className="fw-bold text-muted">Seu carrinho está vazio</h3>
            <Link href="/" className="btn btn-primary rounded-pill px-4 py-2 mt-3">Voltar para a Loja</Link>
        </div>
    );
  }

  return (
    // CONTAINER SIMPLES: O fundo branco vem do globals.css agora
    <div className="container mt-4 mb-5">
      <h2 className="mb-4 fw-bold text-dark">Seu Carrinho ({carrinho.length})</h2>
      
      <div className="row g-4">
        {/* ESQUERDA: LISTA */}
        <div className="col-lg-7">
            <div className="card border-0 shadow-sm p-0 overflow-hidden bg-white"> 
                <div className="p-3">
                    {carrinho.map((item, index) => (
                        <div key={item.cartId || index} className="d-flex align-items-center gap-3 py-3 border-bottom position-relative">
                            <img 
                                src={item.imagens[0]} 
                                alt={item.nome} 
                                style={{width: '80px', height: '80px', objectFit: 'contain', backgroundColor: '#fff', border: '1px solid #eee', borderRadius: '8px'}}
                            />
                            
                            <div className="flex-grow-1">
                                <h6 className="mb-1 fw-bold text-dark">{item.nome}</h6>
                                <div className="text-muted small">
                                    {item.tamanhoEscolhido && <span className="me-2 border px-1 rounded bg-light">Tam: {item.tamanhoEscolhido}</span>}
                                    {item.corEscolhida && <span className="border px-1 rounded bg-light">Cor: {item.corEscolhida}</span>}
                                </div>
                                <div className="text-primary fw-bold mt-2">{formatarMoeda(Number(item.preco))}</div>
                            </div>

                            <button 
                                className="btn btn-outline-danger btn-sm rounded-circle p-2 border-0 bg-light" 
                                onClick={() => removerDoCarrinho(item.cartId)}
                            >
                                <FaTrash size={14} />
                            </button>
                        </div>
                    ))}
                </div>
                <div className="p-3 bg-light border-top">
                    <Link href="/" className="btn btn-link text-decoration-none p-0 text-muted fw-bold" style={{fontSize: '0.9rem'}}>
                        <FaArrowLeft className="me-2" /> Continuar Comprando
                    </Link>
                </div>
            </div>
        </div>

        {/* DIREITA: CHECKOUT */}
        <div className="col-lg-5">
            {/* STICKY TOP AJUSTADO: zIndex baixo e topo maior para não cobrir header */}
            <div className="card border-0 shadow-sm p-4 bg-white sticky-top" style={{top: '120px', zIndex: 10}}>
                <h5 className="fw-bold mb-4 text-dark">Resumo do Pedido</h5>
                
                <div className="d-flex justify-content-between mb-2 small text-muted">
                    <span>Subtotal</span>
                    <span>{formatarMoeda(total)}</span>
                </div>

                {metodoPagamento === 'pix' && (
                    <div className="d-flex justify-content-between mb-2 small text-success fw-bold">
                        <span>Desconto PIX (10%)</span>
                        <span>- {formatarMoeda(total - totalPix)}</span>
                    </div>
                )}

                {metodoPagamento === 'cartao' && valorJuros > 0 && (
                    <div className="d-flex justify-content-between mb-2 small text-danger">
                        <span>Juros (Parcelamento)</span>
                        <span>+ {formatarMoeda(valorJuros)}</span>
                    </div>
                )}

                <div className="d-flex justify-content-between mb-4 small text-muted">
                    <span>Frete</span>
                    <span className="text-success fw-bold">Grátis</span>
                </div>
                
                <div className="d-flex justify-content-between mb-2 pt-3 border-top align-items-end">
                    <span className="text-muted">Total</span>
                    <div className="text-end">
                        <h4 className="fw-bold text-primary m-0">{formatarMoeda(totalFinal)}</h4>
                        {metodoPagamento === 'cartao' && parcelas > 1 && (
                            <small className="text-muted d-block" style={{fontSize: '0.8rem'}}>
                                em {parcelas}x de {formatarMoeda(totalFinal / parcelas)}
                            </small>
                        )}
                    </div>
                </div>

                <hr className="my-4" />

                <div className="mb-4">
                    <label className="fw-bold small mb-3 text-uppercase text-muted d-block">Forma de Pagamento</label>
                    
                    <div className="d-flex gap-2 mb-4">
                        <button 
                            className={`btn flex-fill py-2 ${metodoPagamento === 'pix' ? 'btn-primary' : 'btn-outline-secondary'}`}
                            onClick={() => setMetodoPagamento('pix')}
                        >
                            <FaQrcode className="me-1" /> PIX
                        </button>
                        <button 
                            className={`btn flex-fill py-2 ${metodoPagamento === 'cartao' ? 'btn-primary' : 'btn-outline-secondary'}`}
                            onClick={() => setMetodoPagamento('cartao')}
                        >
                            <FaCreditCard className="me-1" /> Cartão
                        </button>
                        <button 
                            className={`btn flex-fill py-2 ${metodoPagamento === 'boleto' ? 'btn-primary' : 'btn-outline-secondary'}`}
                            onClick={() => setMetodoPagamento('boleto')}
                        >
                            <FaBarcode className="me-1" /> Boleto
                        </button>
                    </div>

                    {/* PIX */}
                    {metodoPagamento === 'pix' && (
                        <div className="text-center p-4 bg-light rounded border border-success border-opacity-25 animate__animated animate__fadeIn">
                            <span className="badge bg-success mb-3 px-3 py-2">10% DE DESCONTO APLICADO</span>
                            <div className="bg-white p-2 d-inline-block rounded border mb-3">
                                <img 
                                    src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=PagamentoKitSpot123" 
                                    alt="QR Code Pix" 
                                    className="img-fluid"
                                />
                            </div>
                            <p className="small text-muted mb-0 fw-bold">Escaneie o QR Code.</p>
                        </div>
                    )}

                    {/* CARTÃO */}
                    {metodoPagamento === 'cartao' && (
                        <div className="animate__animated animate__fadeIn">
                            <div className="card-container">
                                <div className={`credit-card-3d ${isFlipped ? 'card-flipped' : ''}`}>
                                    
                                    <div className="card-face card-front">
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div className="chip"></div>
                                            <FaWifi size={24} style={{transform: 'rotate(90deg)', opacity: 0.8}}/>
                                        </div>
                                        <div className="card-number">{cartao.numero || '•••• •••• •••• ••••'}</div>
                                        <div className="d-flex justify-content-between align-items-end mt-auto">
                                            <div><div className="label-title">TITULAR</div><div className="card-holder">{cartao.nome || 'NOME IMPRESSO'}</div></div>
                                            <div><div className="label-title">VALIDADE</div><div className="card-validity">{cartao.validade || 'MM/AA'}</div></div>
                                        </div>
                                        <div className="position-absolute bottom-0 end-0 p-3">
                                            <div style={{width: '40px', height: '25px', background: 'rgba(255,255,255,0.3)', borderRadius: '4px'}}></div>
                                        </div>
                                    </div>

                                    <div className="card-face card-back">
                                        <div className="magnetic-strip"></div>
                                        <div className="cvv-strip"><div className="cvv-label">CVV</div>{cartao.cvv || '•••'}</div>
                                        <div className="ps-3 pe-3 text-end text-white-50" style={{fontSize: '0.6rem', marginTop: 'auto', marginBottom: '15px'}}>Emitido por KitSpot Bank.</div>
                                    </div>
                                </div>
                            </div>

                            <div className="row g-2">
                                <div className="col-12">
                                    <input type="text" className="form-control" placeholder="Número do Cartão" maxLength="19" value={cartao.numero} onChange={handleNumeroCartao} onFocus={() => setIsFlipped(false)}/>
                                </div>
                                <div className="col-12">
                                    <input type="text" className="form-control" placeholder="Nome Impresso" value={cartao.nome} onChange={handleNome} onFocus={() => setIsFlipped(false)}/>
                                </div>
                                <div className="col-6">
                                    <input type="text" className="form-control" placeholder="Validade (MM/AA)" maxLength="5" value={cartao.validade} onChange={handleValidade} onFocus={() => setIsFlipped(false)}/>
                                </div>
                                <div className="col-6">
                                    <input type="text" className="form-control" placeholder="CVV" maxLength="3" value={cartao.cvv} onChange={handleCVV} onFocus={() => setIsFlipped(true)} onBlur={() => setIsFlipped(false)}/>
                                </div>
                                <div className="col-12 mt-3">
                                    <label className="small fw-bold text-muted mb-1">Parcelamento</label>
                                    <select className="form-select" value={parcelas} onChange={(e) => setParcelas(Number(e.target.value))}>
                                        {[...Array(12)].map((_, i) => {
                                            const p = i + 1;
                                            const valorParcela = calcularParcela(p);
                                            const textoJuros = p <= 3 ? "Sem Juros" : "com juros - 1.99% a.m";
                                            return (
                                                <option key={p} value={p}>{p}x de {formatarMoeda(valorParcela)} ({textoJuros})</option>
                                            );
                                        })}
                                    </select>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <button 
                    className="btn btn-success w-100 py-3 rounded fw-bold shadow-sm"
                    onClick={finalizarCompra}
                    disabled={loading}
                    style={{letterSpacing: '0.5px', fontSize: '1.1rem'}}
                >
                    {loading ? 'Processando...' : `Finalizar Pedido • ${formatarMoeda(totalFinal)}`}
                </button>

                <div className="mt-3 text-center small text-muted">
                    <FaCheckCircle className="me-1 text-success" /> Ambiente 100% Seguro
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}