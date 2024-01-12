import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import monthNames from './monthNames';
import './App.css';

function App() {
  const [name, setName] = useState('');
  const [cpf, setCpf] = useState('');
  const [price, setPrice] = useState('');
  const [service, setService] = useState('');
  const [cityPay, setCityPay] = useState('');
  const [city, setCity] = useState('');
  const [date, setDate] = useState(new Date().toJSON().substring(0, 10));
  const [emitter, setEmitter] = useState('');
  const [emitterCpf, setEmitterCpf] = useState('');

  const dateObj = new Date(date);

  // Função para determinar se é CPF ou CNPJ
  const determineCpfCnpjLabel = () => {
    return cpf.length === 11 ? 'CPF' : 'CNPJ';
  };

  // Função para formatar CPF/CNPJ pagador
  const formatCpfCnpj = () => {
    const value = cpf.length === 11 ? cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4') : cpf.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
    return value;
  };

  // Função para formatar CPF/CNPJ beneficiario
  const formatCpfCnpjbenef = () => {
    const value = emitterCpf.length === 11 ? emitterCpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4') : emitterCpf.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
    return value;
  };

  const handleServiceChange = (value) => {
    setService(value);
  };

  const createMarkup = (html) => {
    return { __html: html };
  };

  return (
    <div className="App">
      <div className="data">
        <h1 className='h1Padrao'>Emissor de recibo</h1>
        <h3>Dados do pagador</h3>
        <div className="field">
          <span>Nome do Pagador:</span>
          <input type="text" value={name} onChange={({ target: { value } }) => setName(value)} placeholder='Digite o nome do pagador' />
        </div>
        <div className="field">
          <span>CPF/CNPJ do Pagador:</span>
          <input type="text" value={cpf} maxLength={14} onChange={({ target: { value } }) => setCpf(value)} placeholder='Digite o CPF ou CNPJ do pagador' />
        </div>
        <div className="field">
          <span>Cidade do pagador:</span>
          <input type="text" value={cityPay} onChange={({ target: { value } }) => setCityPay(value)} placeholder='Digite a cidade do pagador' />
        </div>

        <h3>Dados do beneficiário</h3>
        <div className="field">
          <span>Nome do Beneficiário:</span>
          <input type="text" value={emitter} onChange={({ target: { value } }) => setEmitter(value)} placeholder='Digite o nome do beneficiário' />
        </div>
        <div className="field">
          <span>CPF/CNPJ do Beneficiário:</span>
          <input type="text" value={emitterCpf} maxLength={14} onChange={({ target: { value } }) => setEmitterCpf(value)} placeholder='Digite o CPF ou CNPJ do beneficiário' />
        </div>
        <div className="field">
          <span>Cidade do Beneficiário:</span>
          <input type="text" value={city} onChange={({ target: { value } }) => setCity(value)} placeholder='Digite a cidade do beneficiário' />
        </div>

        <h3>Dados do produto</h3>
        <div className="field">
          <span>Valor:</span>
          <input type="string" step="0.01" min="0" value={price} onChange={({ target: { value } }) => setPrice(value)} placeholder='Insira o valor, ex: 89,90' />
        </div>
        <div className="field">
          <span>Descrição:</span>
          <ReactQuill
            theme="snow"
            value={service}
            onChange={handleServiceChange}
            modules={{
              toolbar: [
                ['bold', 'italic', 'underline', 'strike'],
                [{ 'list': 'ordered' }, { 'list': 'bullet' }]
              ],
            }}
            formats={[
              'bold', 'italic', 'underline', 'strike',
              'list', 'bullet',
            ]}
            placeholder='Descreva sobre o que se refere o recibo...'
          />
        </div>
        <div className="field">
          <span>Data:</span>
          <input type="date" value={date} onChange={({ target: { value } }) => setDate(value)} />
        </div>
        <div className='divDoBtn'>
          <button className='btnDoDiv' type="button" onClick={() => window.print()}>Imprimir recibo</button>
        </div>
        <hr />
      </div>

      {/* Impressao */}
      <div className="receipt">
        <h1>Recibo</h1>
        <h3>Dados do recibo</h3>
        <div className='data-receip'>
          <p>Data de emissão:</p>
          <p>{dateObj.getUTCDate()}/{monthNames[dateObj.getUTCMonth()]}/{dateObj.getUTCFullYear()}</p>
        </div>

        {/* Pagador */}
        <h3>Dados do pagador</h3>
        <div className='data-receip'>
          <p>Nome</p>
          <p>{name}</p>
        </div>
        <div className='data-receip'>
          <p>CPF/CNPJ</p>
          <p>{formatCpfCnpj()}</p>
        </div>
        <div className='data-receip'>
          <p>Cidade</p>
          <p>{cityPay}</p>
        </div>

        {/* Beneficiário */}
        <h3>Dados do beneficiário</h3>
        <div className='data-receip'>
          <p>Nome</p>
          <p>{emitter}</p>
        </div>
        <div className='data-receip'>
          <p>CPF/CNPJ</p>
          <p>{formatCpfCnpjbenef()}</p>
        </div>
        <div className='data-receip'>
          <p>Cidade</p>
          <p>{city}</p>
        </div>

        {/* Serviço/Produto */}
        <h3>Serviço/Produto</h3>
        <h4>Descrição:</h4>
        <div className='data-receip'>
          <div dangerouslySetInnerHTML={createMarkup(service)} />
        </div>
        <div className='valor-receip'>
          <p><strong>Valor total:</strong> R$ {price}</p>
        </div>

        <div className='footEnd'>
          <p className='footEndP'>Este recibo serve como comprovante do pagamento realizado e recebido, não restando mais nada em aberto, referente ao que está descrito no documento.</p>
          <p className="footerP"></p>
          <div className="footer">
            {emitter}<br />
            {determineCpfCnpjLabel()} {formatCpfCnpjbenef()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
