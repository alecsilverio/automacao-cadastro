const STORAGE_KEY = 'cadastros-simples-github';

const form = document.getElementById('formCadastro');
const nome = document.getElementById('nome');
const email = document.getElementById('email');
const telefone = document.getElementById('telefone');
const lista = document.getElementById('lista');
const statusBox = document.getElementById('status');
const btnLimpar = document.getElementById('btnLimpar');
const btnExportar = document.getElementById('btnExportar');
const btnSalvar = document.getElementById('btnSalvar');

let cadastros = [];
let editandoId = null;

function carregarCadastros() {
  try {
    const dados = localStorage.getItem(STORAGE_KEY);
    cadastros = dados ? JSON.parse(dados) : [];
  } catch (erro) {
    cadastros = [];
  }
}

function salvarCadastros() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cadastros));
}

function mostrarStatus(texto, tipo) {
  statusBox.textContent = texto;
  statusBox.className = 'status ' + tipo;

  setTimeout(() => {
    statusBox.className = 'status';
    statusBox.textContent = '';
  }, 2500);
}

function limparFormulario() {
  form.reset();
  editandoId = null;
  btnSalvar.textContent = 'Cadastrar';
  nome.focus();
}

function renderizarLista() {
  if (!cadastros.length) {
    lista.innerHTML = '<div class="vazio">Nenhum cadastro salvo ainda.</div>';
    return;
  }

  lista.innerHTML = cadastros.map(usuario => `
    <div class="item">
      <h3>${usuario.nome}</h3>
      <p><strong>E-mail:</strong> ${usuario.email}</p>
      <p><strong>Telefone:</strong> ${usuario.telefone}</p>
      <div class="botoes">
        <button class="btn-secondary" onclick="editarCadastro(${usuario.id})">Editar</button>
        <button class="btn-danger" onclick="excluirCadastro(${usuario.id})">Excluir</button>
      </div>
    </div>
  `).join('');
}

function emailDuplicado(emailAtual, idAtual = null) {
  return cadastros.some(item =>
    item.email.toLowerCase() === emailAtual.toLowerCase() && item.id !== idAtual
  );
}

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const dados = {
    nome: nome.value.trim(),
    email: email.value.trim(),
    telefone: telefone.value.trim()
  };

  if (!dados.nome || !dados.email || !dados.telefone) {
    mostrarStatus('Preencha todos os campos.', 'erro');
    return;
  }

  if (emailDuplicado(dados.email, editandoId)) {
    mostrarStatus('Já existe um cadastro com este e-mail.', 'erro');
    return;
  }

  if (editandoId !== null) {
    cadastros = cadastros.map(item =>
      item.id === editandoId ? { ...item, ...dados } : item
    );
    mostrarStatus('Cadastro atualizado com sucesso.', 'ok');
  } else {
    cadastros.push({
      id: Date.now(),
      ...dados
    });
    mostrarStatus('Cadastro salvo com sucesso.', 'ok');
  }

  salvarCadastros();
  renderizarLista();
  limparFormulario();
});

btnLimpar.addEventListener('click', limparFormulario);

btnExportar.addEventListener('click', function () {
  const blob = new Blob([JSON.stringify(cadastros, null, 2)], {
    type: 'application/json'
  });

  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'cadastros.json';
  link.click();
  URL.revokeObjectURL(link.href);
});

window.editarCadastro = function (id) {
  const usuario = cadastros.find(item => item.id === id);
  if (!usuario) return;

  nome.value = usuario.nome;
  email.value = usuario.email;
  telefone.value = usuario.telefone;
  editandoId = id;
  btnSalvar.textContent = 'Salvar edição';
  mostrarStatus('Editando cadastro.', 'ok');
};

window.excluirCadastro = function (id) {
  cadastros = cadastros.filter(item => item.id !== id);
  salvarCadastros();
  renderizarLista();
  mostrarStatus('Cadastro excluído.', 'ok');

  if (editandoId === id) {
    limparFormulario();
  }
};

carregarCadastros();
renderizarLista();
