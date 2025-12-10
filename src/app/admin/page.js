'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { FaTrash, FaBoxOpen, FaTshirt, FaMoneyBillWave, FaTags, FaEdit, FaTimes, FaLock, FaKey, FaSignOutAlt } from 'react-icons/fa';

// Função auxiliar para cores das tags
const getTagColor = (tag) => {
    switch(tag) {
        case 'LANÇAMENTO': return 'bg-primary';      
        case 'PROMOÇÃO': return 'bg-danger';         
        case 'KIT': return 'bg-warning text-dark';   
        case 'EXCLUSIVO KITSPOT': return 'bg-success'; 
        default: return 'bg-secondary';
    }
};

export default function Admin() {
  // === ESTADOS DE AUTENTICAÇÃO ===
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [authLoading, setAuthLoading] = useState(true);

  // Verifica se já está logado ao carregar a página
  useEffect(() => {
    const token = sessionStorage.getItem('kitspot-admin-token');
    if (token === 'logado-com-sucesso') {
        setIsAuthenticated(true);
    }
    setAuthLoading(false);
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (passwordInput === 'lukecheetos') {
        sessionStorage.setItem('kitspot-admin-token', 'logado-com-sucesso');
        setIsAuthenticated(true);
    } else {
        alert("Senha incorreta! Tente novamente.");
        setPasswordInput('');
    }
  };

  const handleLogout = () => {
      sessionStorage.removeItem('kitspot-admin-token');
      setIsAuthenticated(false);
  };

  // === ESTADOS DO ADMIN ===
  const [abaAtiva, setAbaAtiva] = useState('cadastrar');
  const [produtos, setProdutos] = useState([]); 
  const [compras, setCompras] = useState([]);
  const [ligas, setLigas] = useState([]);
  const [times, setTimes] = useState([]);

  // Estados de Edição
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  // Estado do Formulário
  const [form, setForm] = useState({
    nome: '', preco: '', descricao: '', imagens: [], 
    cores: [], tamanhos: [], tipo: 'Camisa', isKit: false,
    ligaId: '', timeId: '', itensDoKit: [], tags: [] 
  });
  
  const [previews, setPreviews] = useState([]);

  const opcoesCores = ["Preto", "Branco", "Vermelho", "Azul", "Verde", "Amarelo", "Cinza", "Roxo", "Laranja", "Listrado", "Vinho"];
  const opcoesTamanhos = ["P", "M", "G", "GG", "XG", "38", "40", "42"];
  const tiposProduto = ["Camisa", "Calção", "Boné", "Meião", "Agasalho"];
  const tagsDisponiveis = ["LANÇAMENTO", "PROMOÇÃO", "KIT", "EXCLUSIVO KITSPOT"];

  useEffect(() => {
    if (isAuthenticated) {
        carregarDados();
    }
  }, [isAuthenticated]);

  const carregarDados = () => {
    axios.get('/api/produtos').then(res => setProdutos(res.data));
    axios.get('/api/compras').then(res => setCompras(res.data));
    axios.get('/api/ligas').then(res => setLigas(res.data));
    axios.get('/api/times').then(res => setTimes(res.data));
  };

  const handleImageChange = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newPreviews = [...previews];
        newPreviews[index] = reader.result;
        setPreviews(newPreviews);
        const newImagens = [...form.imagens];
        newImagens[index] = `/produtos/${file.name}`; 
        setForm({ ...form, imagens: newImagens });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleItemKitSelection = (produtoId) => {
    const jaSelecionado = form.itensDoKit.includes(produtoId);
    let novosItens = jaSelecionado 
        ? form.itensDoKit.filter(id => id !== produtoId)
        : [...form.itensDoKit, produtoId];
    setForm({...form, itensDoKit: novosItens});
  };

  const handleTagChange = (tag) => {
    const novasTags = form.tags.includes(tag)
      ? form.tags.filter(t => t !== tag) 
      : [...form.tags, tag];
    setForm({ ...form, tags: novasTags });
  };

  const handleEdit = (produto) => {
    setEditMode(true);
    setEditId(produto.id);
    setForm({
        nome: produto.nome, preco: produto.preco, descricao: produto.descricao,
        imagens: produto.imagens || [], cores: produto.cores || [], tamanhos: produto.tamanhos || [],
        tipo: produto.tipo, isKit: produto.isKit, ligaId: produto.ligaId || '', timeId: produto.timeId || '',
        itensDoKit: produto.itensDoKit || [], tags: produto.tags || []
    });
    setAbaAtiva('cadastrar');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancelarEdicao = () => {
    setEditMode(false);
    setEditId(null);
    setForm({
      nome: '', preco: '', descricao: '', imagens: [], cores: [], tamanhos: [],
      tipo: 'Camisa', isKit: false, ligaId: '', timeId: '', itensDoKit: [], tags: []
    });
    setPreviews([]);
  };

  const salvarProduto = async (e) => {
    e.preventDefault();
    let imagensFinais = form.imagens;

    if (form.isKit) {
        const produtosSelecionados = produtos.filter(p => form.itensDoKit.includes(p.id));
        imagensFinais = produtosSelecionados.map(p => p.imagens[0]);
        if (imagensFinais.length < 2) return alert("Selecione pelo menos 2 produtos para formar um kit!");
    }

    if (editMode) {
        const itemAtualizado = { ...form, id: editId, preco: Number(form.preco), imagens: imagensFinais };
        try {
            await axios.put(`/api/produtos/${editId}`, itemAtualizado);
            alert("Produto atualizado com sucesso!");
        } catch (error) {
            console.error("Erro ao atualizar", error);
            alert("Erro ao atualizar produto.");
        }
    } else {
        const novoItem = { ...form, id: uuidv4(), preco: Number(form.preco), imagens: imagensFinais };
        await axios.post('/api/produtos', novoItem);
        alert(form.isKit ? "Kit Montado com Sucesso!" : "Produto Cadastrado!");
    }
    
    cancelarEdicao(); 
    carregarDados();
  };

  const deletarProduto = async (id) => {
    if (window.confirm("Tem certeza que deseja remover este item?")) {
      await axios.delete(`/api/produtos/${id}`);
      carregarDados();
    }
  };

  const timesFiltrados = times.filter(t => t.ligaId === form.ligaId);

  // === RENDERIZAÇÃO CONDICIONAL ===
  
  if (authLoading) return null;

  // 1. TELA DE LOGIN (SE NÃO ESTIVER AUTENTICADO)
  if (!isAuthenticated) {
      return (
          <div className="container d-flex align-items-center justify-content-center" style={{minHeight: '70vh'}}>
              <div className="card shadow-lg p-5 border-0 text-center" style={{maxWidth: '400px', width: '100%'}}>
                  <div className="mb-4">
                      <div className="bg-light rounded-circle d-inline-flex p-4 mb-3">
                        <FaLock size={40} className="text-secondary" />
                      </div>
                      <h3 className="fw-bold">Área Restrita</h3>
                      <p className="text-muted small">Acesso exclusivo para administradores.</p>
                  </div>
                  <form onSubmit={handleLogin}>
                      <div className="input-group mb-3">
                          <span className="input-group-text bg-white"><FaKey className="text-muted"/></span>
                          <input 
                              type="password" 
                              className="form-control form-control-lg" 
                              placeholder="Senha de acesso" 
                              value={passwordInput}
                              onChange={(e) => setPasswordInput(e.target.value)}
                              autoFocus
                          />
                      </div>
                      <button type="submit" className="btn btn-primary w-100 btn-lg fw-bold">Entrar no Sistema</button>
                  </form>
              </div>
          </div>
      );
  }

  // 2. PAINEL ADMINISTRATIVO
  return (
    <div className="container mt-5 mb-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
            <h2 className="fw-bold text-dark m-0">Painel Administrativo</h2>
            <small className="text-muted">Bem-vindo, Administrador.</small>
        </div>
        <button className="btn btn-outline-danger btn-sm" onClick={handleLogout}>
            <FaSignOutAlt className="me-2"/> Sair
        </button>
      </div>

      {/* Navegação de Abas */}
      <div className="card shadow-sm border-0 mb-4 overflow-hidden">
        <div className="d-flex border-bottom">
            <button 
                className={`btn flex-fill rounded-0 py-3 fw-bold ${abaAtiva === 'cadastrar' ? 'btn-primary' : 'btn-light text-muted'}`} 
                onClick={() => setAbaAtiva('cadastrar')}
            >
                <FaBoxOpen className="me-2" /> {editMode ? 'Editando Produto' : 'Novo Produto/Kit'}
            </button>
            <button 
                className={`btn flex-fill rounded-0 py-3 fw-bold ${abaAtiva === 'produtos' ? 'btn-primary' : 'btn-light text-muted'}`} 
                onClick={() => setAbaAtiva('produtos')}
            >
                <FaTshirt className="me-2" /> Gerenciar Produtos
            </button>
            <button 
                className={`btn flex-fill rounded-0 py-3 fw-bold ${abaAtiva === 'vendas' ? 'btn-primary' : 'btn-light text-muted'}`} 
                onClick={() => setAbaAtiva('vendas')}
            >
                <FaMoneyBillWave className="me-2" /> Vendas
            </button>
        </div>
      </div>

      {/* === ABA: CADASTRAR / EDITAR === */}
      {abaAtiva === 'cadastrar' && (
        <div className="card p-4 shadow-sm border-0 bg-white">
          <div className="d-flex justify-content-between align-items-center mb-4">
             <h4 className="mb-0 text-dark">
                {editMode ? `Editando: ${form.nome}` : 'Cadastrar Novo Item'}
             </h4>
             {editMode && (
                 <button className="btn btn-sm btn-outline-secondary" onClick={cancelarEdicao}>
                    <FaTimes className="me-1"/> Cancelar Edição
                 </button>
             )}
          </div>

          <form onSubmit={salvarProduto}>
            <div className={`form-check form-switch mb-4 p-3 rounded border ${editMode ? 'bg-warning bg-opacity-10' : 'bg-light'}`}>
                <input className="form-check-input" type="checkbox" id="isKitSwitch" 
                    checked={form.isKit} 
                    onChange={e => setForm({...form, isKit: e.target.checked})} 
                    style={{cursor: 'pointer'}}
                    disabled={editMode} 
                />
                <label className="form-check-label fw-bold ms-2" htmlFor="isKitSwitch" style={{cursor: 'pointer'}}>
                    {form.isKit ? "📦 MODO: CRIAR KIT (COMBO)" : "👕 MODO: PRODUTO ÚNICO"}
                </label>
                {editMode && <div className="small text-muted mt-1">(O tipo não pode ser alterado durante a edição)</div>}
            </div>

            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label fw-bold">Nome do Item</label>
                <input className="form-control" value={form.nome} onChange={e => setForm({...form, nome: e.target.value})} required />
              </div>
              <div className="col-md-3">
                <label className="form-label fw-bold">Preço (R$)</label>
                <input type="number" className="form-control" value={form.preco} onChange={e => setForm({...form, preco: e.target.value})} required />
              </div>
              <div className="col-md-3">
                 <label className="form-label fw-bold">Tipo</label>
                 <select className="form-select" value={form.tipo} onChange={e => setForm({...form, tipo: e.target.value})}>
                    {form.isKit ? <option>Kit</option> : tiposProduto.map(t => <option key={t}>{t}</option>)}
                 </select>
              </div>

              <div className="col-12">
                 <label className="form-label fw-bold mb-2"><FaTags className="me-2"/>Etiquetas de Destaque</label>
                 <div className="d-flex flex-wrap gap-3 p-3 bg-light rounded border">
                    {tagsDisponiveis.map(tag => (
                       <div key={tag} className="form-check form-switch">
                          <input 
                             className="form-check-input" 
                             type="checkbox" 
                             id={`tag-${tag}`}
                             checked={form.tags.includes(tag)}
                             onChange={() => handleTagChange(tag)}
                             style={{cursor: 'pointer'}}
                          />
                          <label className="form-check-label fw-bold small" htmlFor={`tag-${tag}`} style={{cursor: 'pointer'}}>
                             <span className={`badge ${getTagColor(tag)}`}>{tag}</span>
                          </label>
                       </div>
                    ))}
                 </div>
              </div>

              <div className="col-md-6">
                 <label className="form-label fw-bold">Liga</label>
                 <select className="form-select" value={form.ligaId} onChange={e => setForm({...form, ligaId: e.target.value})} required>
                    <option value="">Selecione...</option>
                    {ligas.map(l => <option key={l.id} value={l.id}>{l.nome}</option>)}
                 </select>
              </div>
              <div className="col-md-6">
                 <label className="form-label fw-bold">Time</label>
                 <select className="form-select" value={form.timeId} onChange={e => setForm({...form, timeId: e.target.value})} required disabled={!form.ligaId}>
                    <option value="">Selecione...</option>
                    {timesFiltrados.map(t => <option key={t.id} value={t.id}>{t.nome}</option>)}
                 </select>
              </div>

              <div className="col-12">
                <label className="form-label fw-bold">Descrição</label>
                <textarea className="form-control" rows="3" value={form.descricao} onChange={e => setForm({...form, descricao: e.target.value})} />
              </div>

              {form.isKit ? (
                  <div className="col-12 mt-4">
                      <h5 className="mb-3">Selecione os produtos deste Kit:</h5>
                      <div className="card p-3 border bg-light" style={{maxHeight: '300px', overflowY: 'auto'}}>
                        {produtos.filter(p => !p.isKit).map(prod => (
                            <div key={prod.id} className="form-check d-flex align-items-center gap-2 mb-2 p-2 border-bottom bg-white rounded">
                                <input className="form-check-input mt-0" type="checkbox" 
                                    checked={form.itensDoKit.includes(prod.id)}
                                    onChange={() => handleItemKitSelection(prod.id)}
                                    style={{cursor: 'pointer'}}
                                />
                                <img src={prod.imagens[0]} alt="" style={{width:'40px', height:'40px', objectFit:'contain'}} />
                                <label className="form-check-label w-100 cursor-pointer">
                                    <span className="fw-bold">{prod.nome}</span> <span className="text-muted ms-2">(R$ {prod.preco})</span>
                                </label>
                            </div>
                        ))}
                      </div>
                  </div>
              ) : (
                  <div className="col-12">
                    <label className="form-label fw-bold">Imagens do Produto</label>
                    <div className="d-flex gap-3 mt-2">
                        {[0, 1, 2, 3].map(idx => (
                        <div key={idx} className="border rounded d-flex align-items-center justify-content-center overflow-hidden position-relative bg-light" 
                            style={{width: '100px', height: '100px', borderStyle: 'dashed'}}>
                            {previews[idx] ? (
                                <img src={previews[idx]} alt="Preview" style={{width: '100%', height: '100%', objectFit: 'contain'}} />
                            ) : form.imagens[idx] ? (
                                <img src={form.imagens[idx]} alt="Existente" style={{width: '100%', height: '100%', objectFit: 'contain'}} />
                            ) : (
                                <span className="text-muted fs-4">+</span>
                            )}
                            <input type="file" className="position-absolute w-100 h-100 opacity-0" style={{cursor: 'pointer'}}
                                onChange={(e) => handleImageChange(e, idx)} />
                        </div>
                        ))}
                    </div>
                    <small className="text-muted">* Clique nos quadrados para alterar ou adicionar fotos.</small>
                  </div>
              )}

              <div className="col-md-12">
                 <label className="form-label fw-bold mb-2">Tamanhos Disponíveis</label>
                 <div className="d-flex gap-2 flex-wrap">
                    {opcoesTamanhos.map(tam => (
                        <button key={tam} type="button" 
                            className={`btn btn-sm ${form.tamanhos.includes(tam) ? 'btn-dark' : 'btn-outline-secondary'}`}
                            onClick={() => {
                                const newTams = form.tamanhos.includes(tam) 
                                    ? form.tamanhos.filter(t => t !== tam) 
                                    : [...form.tamanhos, tam];
                                setForm({...form, tamanhos: newTams});
                            }}>
                            {tam}
                        </button>
                    ))}
                 </div>
              </div>
            </div>

            <div className="d-grid gap-2 mt-4">
                <button type="submit" className={`btn btn-lg fw-bold shadow-sm ${editMode ? 'btn-warning text-dark' : 'btn-success'}`}>
                    {editMode ? "Atualizar Produto" : (form.isKit ? "Criar Kit" : "Cadastrar Produto")}
                </button>
                {editMode && (
                    <button type="button" className="btn btn-outline-secondary" onClick={cancelarEdicao}>
                        Cancelar Edição
                    </button>
                )}
            </div>
          </form>
        </div>
      )}
      
      {/* === ABA: GERENCIAR PRODUTOS === */}
      {abaAtiva === 'produtos' && (
        <div className="list-group shadow-sm">
          {produtos.map(p => (
             <div key={p.id} className="list-group-item d-flex justify-content-between align-items-center p-3 bg-white">
                <div className="d-flex align-items-center gap-3">
                  {p.isKit ? (
                      <div className="d-flex" style={{width: '60px'}}>
                         <img src={p.imagens[0]} style={{width:'30px', height:'30px', objectFit:'contain'}} alt="" />
                         {p.imagens[1] && <img src={p.imagens[1]} style={{width:'30px', height:'30px', objectFit:'contain'}} alt="" />}
                      </div>
                  ) : (
                      <img src={p.imagens[0]} alt={p.nome} style={{width:'50px', height:'50px', objectFit:'contain'}} onError={(e)=>{e.target.src='https://via.placeholder.com/50'}} />
                  )}
                  
                  <div>
                    <h6 className="m-0 fw-bold">
                        {p.nome} 
                        {p.tags?.map(tag => (
                            <span key={tag} className={`badge ${getTagColor(tag)} ms-2 small`} style={{fontSize: '0.6rem'}}>{tag}</span>
                        ))}
                    </h6>
                    <small className="text-muted">{p.tipo} - R$ {p.preco.toFixed(2)}</small>
                  </div>
                </div>
                
                <div className="d-flex gap-2">
                    <button className="btn btn-outline-primary btn-sm" onClick={() => handleEdit(p)} title="Editar">
                        <FaEdit />
                    </button>
                    <button className="btn btn-outline-danger btn-sm" onClick={() => deletarProduto(p.id)} title="Excluir">
                        <FaTrash />
                    </button>
                </div>
             </div>
          ))}
          {produtos.length === 0 && <div className="p-4 text-center text-muted">Nenhum produto cadastrado.</div>}
        </div>
      )}
      
      {/* === ABA: VENDAS === */}
      {abaAtiva === 'vendas' && (
        <div>
           {compras.length === 0 && <div className="alert alert-info">Nenhuma venda registrada ainda.</div>}
           {compras.map(c => (
              <div key={c.id} className="card p-3 mb-3 border-start border-success border-4 shadow-sm bg-white">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <h6 className="m-0 fw-bold">Pedido #{c.id.substring(0, 8)}</h6>
                  <span className="badge bg-success">{c.status}</span>
                </div>
                <div className="text-muted small mb-2">{c.data} • {c.pagamento.toUpperCase()}</div>
                
                <div className="mb-2">
                    {c.itens.map((item, idx) => (
                        <span key={idx} className="badge bg-light text-dark border me-1">
                            {item.nome} ({item.tamanhoEscolhido || 'U'})
                        </span>
                    ))}
                </div>

                <div className="d-flex justify-content-between align-items-center pt-2 border-top">
                    <span>Total Pago:</span>
                    <strong className="fs-5 text-success">
                        {c.totalPago ? `R$ ${c.totalPago.toLocaleString('pt-BR', {minimumFractionDigits: 2})}` : `R$ ${c.totalOriginal}`}
                    </strong>
                </div>
              </div>
           ))}
        </div>
      )}
    </div>
  );
}