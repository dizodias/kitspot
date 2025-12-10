'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { FaWhatsapp, FaEnvelope, FaMapMarkerAlt, FaPaperPlane, FaCheckCircle } from 'react-icons/fa';

const schema = yup.object({
  nome: yup
    .string()
    .required('O nome é obrigatório')
    .min(3, 'O nome deve ter pelo menos 3 caracteres'),
  email: yup
    .string()
    .email('Digite um e-mail válido')
    .required('O e-mail é obrigatório'),
  assunto: yup
    .string()
    .required('Selecione um assunto'),
  mensagem: yup
    .string()
    .required('A mensagem é obrigatória')
    .min(10, 'Sua mensagem deve ter pelo menos 10 caracteres'),
}).required();

export default function Contato() {
  const [enviado, setEnviado] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = (data) => {
    console.log("Dados Validados:", data);
    setEnviado(true);
    reset();
  };

  return (
    <div className="container mt-5 mb-5">
      <div className="text-center mb-5">
        <h1 className="fw-bold mb-2 text-dark">Fale Conosco</h1>
        <p className="text-muted">Tem alguma dúvida ou sugestão? Estamos aqui para ajudar.</p>
      </div>
      
      <div className="row g-5">
        
        {/* LADO ESQUERDO: INFORMAÇÕES */}
        <div className="col-lg-5">
            <div className="p-4 bg-white rounded-4 h-100 border shadow-sm">
                <h4 className="mb-4 fw-bold text-dark">Canais de Atendimento</h4>
                
                <div className="d-flex align-items-center mb-4">
                    <div className="bg-light p-3 rounded-circle me-3"><FaWhatsapp className="text-success" size={24}/></div>
                    <div>
                        <h6 className="m-0 fw-bold">WhatsApp</h6>
                        <a href="#" className="text-decoration-none text-muted small">(11) 99999-9999</a>
                    </div>
                </div>

                <div className="d-flex align-items-center mb-4">
                    <div className="bg-light p-3 rounded-circle me-3"><FaEnvelope className="text-primary" size={24}/></div>
                    <div>
                        <h6 className="m-0 fw-bold">E-mail</h6>
                        <a href="mailto:suporte@kitspot.com.br" className="text-decoration-none text-muted small">suporte@kitspot.com.br</a>
                    </div>
                </div>

                <div className="d-flex align-items-center mb-4">
                    <div className="bg-light p-3 rounded-circle me-3"><FaMapMarkerAlt className="text-danger" size={24}/></div>
                    <div>
                        <h6 className="m-0 fw-bold">Escritório</h6>
                        <p className="text-muted small m-0">Av. Paulista, 1000 - SP</p>
                    </div>
                </div>

                <hr className="my-4 text-muted opacity-25" />
                
                <div className="alert alert-info border-0 d-flex align-items-center gap-2 mb-0">
                    <small>Nosso horário de atendimento é de segunda a sexta, das 09h às 18h.</small>
                </div>
            </div>
        </div>

        {/* LADO DIREITO: FORMULÁRIO */}
        <div className="col-lg-7">
            {enviado ? (
                <div className="card border-0 shadow-sm h-100 d-flex align-items-center justify-content-center text-center p-5 animate__animated animate__fadeIn">
                    <FaCheckCircle size={60} className="text-success mb-3" />
                    <h3 className="fw-bold">Mensagem Enviada!</h3>
                    <p className="text-muted">Obrigado pelo contato. Nossa equipe responderá em até 24 horas úteis.</p>
                    <button className="btn btn-outline-primary mt-3 rounded-pill px-4" onClick={() => setEnviado(false)}>
                        Enviar outra mensagem
                    </button>
                </div>
            ) : (
                <div className="card border-0 shadow-sm p-4 bg-white">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        
                        {/* Nome */}
                        <div className="mb-3">
                            <label className="form-label fw-bold small text-muted">Nome Completo</label>
                            <input 
                                type="text" 
                                className={`form-control ${errors.nome ? 'is-invalid' : ''}`} 
                                placeholder="Seu nome"
                                {...register("nome")} // Conecta ao Hook Form
                            />
                            {errors.nome && <div className="invalid-feedback">{errors.nome.message}</div>}
                        </div>

                        {/* E-mail */}
                        <div className="mb-3">
                            <label className="form-label fw-bold small text-muted">E-mail</label>
                            <input 
                                type="email" 
                                className={`form-control ${errors.email ? 'is-invalid' : ''}`} 
                                placeholder="seu@email.com"
                                {...register("email")}
                            />
                            {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
                        </div>

                        {/* Assunto */}
                        <div className="mb-3">
                            <label className="form-label fw-bold small text-muted">Assunto</label>
                            <select 
                                className={`form-select ${errors.assunto ? 'is-invalid' : ''}`}
                                {...register("assunto")}
                            >
                                <option value="">Selecione um assunto...</option>
                                <option value="pedido">Dúvida sobre Pedido</option>
                                <option value="troca">Trocas e Devoluções</option>
                                <option value="parceria">Parcerias</option>
                                <option value="outros">Outros</option>
                            </select>
                            {errors.assunto && <div className="invalid-feedback">{errors.assunto.message}</div>}
                        </div>

                        {/* Mensagem */}
                        <div className="mb-4">
                            <label className="form-label fw-bold small text-muted">Mensagem</label>
                            <textarea 
                                className={`form-control ${errors.mensagem ? 'is-invalid' : ''}`} 
                                rows="5" 
                                placeholder="Como podemos ajudar?"
                                {...register("mensagem")}
                            ></textarea>
                            {errors.mensagem && <div className="invalid-feedback">{errors.mensagem.message}</div>}
                        </div>

                        <button type="submit" className="btn btn-primary w-100 py-3 fw-bold shadow-sm d-flex align-items-center justify-content-center gap-2">
                            <FaPaperPlane /> Enviar Mensagem
                        </button>
                    </form>
                </div>
            )}
        </div>
      </div>
    </div>
  );
}