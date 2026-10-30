import { useEffect, useState } from "react";
import { BrowserRouter, Link, useLocation, useNavigate } from "react-router-dom";

const trilhas = [
  { id: "jsx", numero: "01", titulo: "JSX", descricao: "Escreva interfaces com uma sintaxe familiar e expressiva.", icone: "✦", alvo: "exemplo-jsx" },
  { id: "componentes", numero: "02", titulo: "Componentes", descricao: "Divida a interface em partes pequenas e reutilizáveis.", icone: "▧", alvo: "exemplo-componentes" },
  { id: "props", numero: "03", titulo: "Props", descricao: "Passe dados de um componente para outro com clareza.", icone: "↗", alvo: "exemplo-props" },
  { id: "listas", numero: "04", titulo: "Listas e keys", descricao: "Transforme coleções de dados em elementos da interface.", icone: "☷", alvo: "exemplo-listas" },
  { id: "condicional", numero: "05", titulo: "Renderização condicional", descricao: "Mostre o conteúdo certo conforme cada situação.", icone: "◐", alvo: "exemplo-condicional" },
  { id: "state", numero: "06", titulo: "State e useState", descricao: "Guarde informações que mudam e atualize a interface.", icone: "↻", alvo: "exemplo-state" },
  { id: "formularios", numero: "07", titulo: "Formulários", descricao: "Capture e valide informações digitadas pela pessoa.", icone: "▤", alvo: "exemplo-formularios" },
  { id: "useeffect", numero: "08", titulo: "useEffect", descricao: "Execute efeitos e limpe recursos quando necessário.", icone: "◷", alvo: "exemplo-useeffect" },
  { id: "api", numero: "09", titulo: "Consumo de API", descricao: "Busque dados externos e trate carregamento e erros.", icone: "⇄", alvo: "exemplo-api" },
  { id: "router", numero: "10", titulo: "React Router", descricao: "Navegue entre páginas sem recarregar a aplicação.", icone: "⌘", alvo: "exemplo-router" },
];

const codigos = {
  jsx: `<div className="hero-copy">
  <span className="eyebrow">UM GUIA PRÁTICO DE REACT</span>
  <h1>Ideias simples.<br /><span>Interfaces incríveis.</span></h1>
  <p className="hero-description">Aprenda os fundamentos do React.</p>
</div>`,
  componentes: `function Header() {
  return <header className="topbar">React Lab</header>;
}

<Header />`,
  props: `function TrilhaCard({ titulo, descricao, onExplore }) {
  return (
    <article className="trilha-card">
      <h3>{titulo}</h3>
      <p>{descricao}</p>
      <button onClick={onExplore}>Explorar</button>
    </article>
  );
}

<TrilhaCard {...trilha} onExplore={() => explorar(trilha)} />`,
  listas: `{trilhas.map((trilha) => (
  <TrilhaCard
    key={trilha.id}
    {...trilha}
    onExplore={() => explorar(trilha)}
  />
))}`,
  condicional: `{inscrito ? (
  <p role="status">Sua jornada já começou!</p>
) : (
  <button onClick={() => setInscrito(true)}>Começar</button>
)}`,
  state: `const [contador, setContador] = useState(0);

<button onClick={() => setContador((valor) => valor + 1)}>
  Cliques: {contador}
</button>`,
  formularios: `function enviarFormulario(evento) {
  evento.preventDefault();
  setMensagem('Olá, ' + nome + '!');
}

<form onSubmit={enviarFormulario}>
  <input value={nome} onChange={(e) => setNome(e.target.value)} />
  <button type="submit">Enviar</button>
</form>`,
  useeffect: `useEffect(() => {
  const intervalo = window.setInterval(() => setHora(new Date()), 1000);
  return () => window.clearInterval(intervalo);
}, []);`,
  api: `async function carregarPost() {
  const resposta = await fetch("https://jsonplaceholder.typicode.com/posts/1");
  const dados = await resposta.json();
  setPost(dados);
}`, 
  router: `import { Link, useNavigate } from "react-router-dom";

<Link to="/exemplo/inicio">Início</Link>
<Link to="/exemplo/sobre">Sobre</Link>

const navegar = useNavigate();
navegar("/exemplo/contato");`,
};

const explicacoes = {
  jsx: "O JSX mistura marcação e JavaScript para descrever a interface. Componentes e expressões também podem ser inseridos nessa estrutura.",
  componentes: "Header é uma função que retorna uma parte da página. O App a reutiliza como uma tag JSX e fornece valores por props.",
  props: "Props são informações recebidas pelo componente. Aqui, dados da trilha e uma função de clique chegam ao TrilhaCard.",
  listas: "map percorre o array trilhas e cria um card para cada item. A key usa um identificador estável para React acompanhar cada card.",
  condicional: "inscrito começa como false. Ao clicar, setInscrito atualiza o estado e o ternário troca o botão pela mensagem de sucesso.",
  state: "useState guarda o contador e fornece uma função para atualizá-lo. Essa atualização faz React renderizar o valor novo.",
  formularios: "O campo é controlado pelo estado. onChange guarda o texto digitado e onSubmit processa o envio sem recarregar a página.",
  useeffect: "useEffect inicia um intervalo ao montar o componente. A função de limpeza cancela o intervalo quando ele sai da tela.",
  api: "A demonstração busca um post de uma API pública e apresenta o resultado, o carregamento ou uma mensagem de erro.",
  router: "Link navega sem recarregar a aplicação. useNavigate permite mudar de rota depois de uma ação.",
};
function CodeExample({ concept, onClose }) {
  if (!concept) return null;

  return (
    <aside className="concept-code" aria-live="polite">
      <div className="concept-code-heading">
        <div><span className="eyebrow">CÓDIGO DE EXEMPLO</span><h3>{concept.titulo} nesta página</h3></div>
        <button className="code-close" type="button" onClick={onClose} aria-label="Fechar exemplo de código">×</button>
      </div>
      <p className="concept-code-explanation">{explicacoes[concept.id]}</p>
      <pre><code>{codigos[concept.id]}</code></pre>
    </aside>
  );
}

function Header({ code, closeCode }) {
  return (
    <>
      <header className="topbar" id="exemplo-componentes">
        <a className="brand" href="#inicio"><span className="brand-mark">R</span>react<span className="brand-light">.lab</span></a>
        <nav aria-label="Navegação principal"><a href="#trilhas">Trilhas</a><a href="#sobre">Sobre</a></nav>
        <a className="nav-cta" href="#trilhas">Começar agora <span>↗</span></a>
      </header>
      <CodeExample concept={code?.id === "componentes" ? code : null} onClose={closeCode} />
    </>
  );
}

function TrilhaCard({ numero, titulo, descricao, icone, onExplore }) {
  return (
    <article className="trilha-card">
      <div className="card-top"><span className="card-icon" aria-hidden="true">{icone}</span><span className="card-number">{numero}</span></div>
      <h3>{titulo}</h3><p>{descricao}</p>
      <button type="button" className="card-link" onClick={onExplore}>Explorar conceito <span aria-hidden="true">↗</span></button>
    </article>
  );
}


function NovosExemplos({ trilhas, explorar, codigoAqui }) {
  const [contador, setContador] = useState(0);
  const [nome, setNome] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [hora, setHora] = useState(() => new Date());
  const [post, setPost] = useState(null);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState("");
  const location = useLocation();
  const navegar = useNavigate();

  useEffect(() => {
    const intervalo = window.setInterval(() => setHora(new Date()), 1000);
    return () => window.clearInterval(intervalo);
  }, []);

  async function carregarPost() {
    setCarregando(true);
    setErro("");
    try {
      const resposta = await fetch("https://jsonplaceholder.typicode.com/posts/1");
      if (!resposta.ok) throw new Error("A API respondeu com um erro.");
      setPost(await resposta.json());
    } catch {
      setErro("Não foi possível carregar os dados. Verifique sua conexão e tente novamente.");
    } finally {
      setCarregando(false);
    }
  }

  function enviarFormulario(evento) {
    evento.preventDefault();
    const nomeLimpo = nome.trim();
    setMensagem(nomeLimpo ? `Olá, ${nomeLimpo}! Formulário enviado.` : "Digite seu nome antes de enviar.");
  }

  const cards = trilhas.filter((trilha) => ["state", "formularios", "useeffect", "api", "router"].includes(trilha.id));
  return (
    <section className="demos-section" aria-labelledby="demos-title">
      <div className="section-heading"><div><span className="eyebrow">CONCEITOS EM AÇÃO</span><h2 id="demos-title">Experimente você mesmo.</h2></div><p>Interaja com cada exemplo e veja como React responde.</p></div>
      <div className="demo-grid">
        <article className="demo-card" id="exemplo-state"><DemoTitle concept={cards[0]} explorar={explorar} /><p className="demo-value">{contador}</p><button className="primary-button" onClick={() => setContador((valor) => valor + 1)}>Adicionar um clique <span>+</span></button>{codigoAqui("state")}</article>
        <article className="demo-card" id="exemplo-formularios"><DemoTitle concept={cards[1]} explorar={explorar} /><form className="demo-form" onSubmit={enviarFormulario}><label htmlFor="nome-demo">Seu nome</label><input id="nome-demo" value={nome} onChange={(evento) => setNome(evento.target.value)} placeholder="Digite seu nome" /><button className="primary-button" type="submit">Enviar formulário <span>→</span></button></form>{mensagem && <p className="demo-feedback" role="status">{mensagem}</p>}{codigoAqui("formularios")}</article>
        <article className="demo-card" id="exemplo-useeffect"><DemoTitle concept={cards[2]} explorar={explorar} /><p className="demo-value demo-clock">{hora.toLocaleTimeString("pt-BR")}</p><p className="demo-muted">Atualizado a cada segundo por um efeito.</p>{codigoAqui("useeffect")}</article>
        <article className="demo-card" id="exemplo-api"><DemoTitle concept={cards[3]} explorar={explorar} /><p className="demo-muted">Carregue um post de demonstração usando JSONPlaceholder.</p><button className="primary-button" disabled={carregando} onClick={carregarPost}>{carregando ? "Carregando…" : "Buscar dados da API"} <span>↓</span></button>{erro && <p className="demo-error" role="alert">{erro}</p>}{post && <div className="api-result"><strong>{post.title}</strong><p>{post.body}</p></div>}{codigoAqui("api")}</article>
        <article className="demo-card demo-router" id="exemplo-router"><DemoTitle concept={cards[4]} explorar={explorar} /><p className="demo-muted">Navegue entre rotas de exemplo sem recarregar a página.</p><div className="router-links"><Link to="/exemplo/inicio">Início</Link><Link to="/exemplo/sobre">Sobre</Link><button type="button" onClick={() => navegar("/exemplo/contato")}>Ir para Contato</button></div><p className="demo-feedback" aria-live="polite">Rota atual: <code>{location.pathname}</code>{location.pathname === "/exemplo/sobre" && <span> — Página Sobre de demonstração.</span>}{location.pathname === "/exemplo/contato" && <span> — Página Contato de demonstração.</span>}{location.pathname === "/exemplo/inicio" && <span> — Início de demonstração.</span>}</p>{codigoAqui("router")}</article>
      </div>
    </section>
  );
}

function DemoTitle({ concept, explorar }) {
  return <div className="demo-title"><span className="card-icon" aria-hidden="true">{concept.icone}</span><div><span className="card-number">{concept.numero} / CONCEITO</span><h3>{concept.titulo}</h3></div><button type="button" className="demo-code-link" onClick={() => explorar(concept)}>Ver código</button></div>;
}
function AppContent() {
  const [inscrito, setInscrito] = useState(false);
  const [conceitoAberto, setConceitoAberto] = useState(null);

  function explorar(conceito) {
    setConceitoAberto(conceito);
    requestAnimationFrame(() => {
      document.getElementById(conceito.alvo)?.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  }

  const fecharCodigo = () => setConceitoAberto(null);
  const codigoAqui = (id) => conceitoAberto?.id === id ? <CodeExample concept={conceitoAberto} onClose={fecharCodigo} /> : null;

  return (
    <div id="inicio" className="site-shell">
      <Header code={conceitoAberto} closeCode={fecharCodigo} />
      <main>
        <section className="hero">
          <div className="hero-copy" id="exemplo-jsx">
            <span className="eyebrow"><span className="eyebrow-dot" /> UM GUIA PRÁTICO DE REACT</span>
            <h1>Ideias simples.<br /><span>Interfaces incríveis.</span></h1>
            <p className="hero-description">Aprenda os fundamentos do React construindo uma interface de verdade. Um passo de cada vez, do JSX à renderização condicional.</p>
            {codigoAqui("jsx")}
          </div>
          <div className="hero-art" aria-label="Exemplo de código React">
            <div className="art-orbit orbit-one" /><div className="art-orbit orbit-two" />
            <div className="code-card">
              <div className="code-header"><div className="window-dots"><i /><i /><i /></div><span>App.jsx</span><span className="code-status">● ao vivo</span></div>
              <div className="code-body">
                <div><b>01</b><code><em>function</em> <strong>AprenderReact</strong>() {'{'}</code></div>
                <div><b>02</b><code>&nbsp; <em>const</em> passos = [</code></div><div><b>03</b><code>&nbsp;&nbsp; <i>"JSX"</i>, <i>"componentes"</i>,</code></div>
                <div><b>04</b><code>&nbsp;&nbsp; <i>"novas ideias"</i></code></div><div><b>05</b><code>&nbsp; ];</code></div><div className="code-gap"><code /></div>
                <div><b>06</b><code>&nbsp; <em>return</em> {'('}</code></div><div><b>07</b><code>&nbsp;&nbsp; &lt;<strong>Experiência</strong> <i>passos</i>=&#123;passos&#125; /&gt;</code></div>
                <div><b>08</b><code>&nbsp; );</code></div><div><b>09</b><code>{'}'}</code></div>
              </div>
              <div className="code-footer"><span><span className="footer-spark">✦</span> Pequenos passos, grandes projetos.</span><span>React <b>↗</b></span></div>
            </div>
            <div className="float-chip chip-top"><span>✦</span> Aprendizado prático</div><div className="float-chip chip-bottom"><span className="chip-check">✓</span> Seu próximo passo começa aqui</div>
          </div>
          <div className="hero-bottom"><span>01 — 05</span><span>FUNDAMENTOS QUE CONSTROEM</span><span>↓</span></div>
        </section>

        <section id="trilhas" className="trails-section">
          <div className="section-heading"><div><span className="eyebrow">A BASE DE TUDO</span><h2>Aprenda fazendo.</h2></div><p>Dez conceitos essenciais para sair da teoria e começar a criar.</p></div>
          <div className="trilha-grid" id="exemplo-listas">
            {trilhas.map((trilha) => <TrilhaCard key={trilha.id} {...trilha} onExplore={() => explorar(trilha)} />)}
          </div>
          {codigoAqui("listas")}
          {codigoAqui("props")}
        </section>

        <NovosExemplos trilhas={trilhas} explorar={explorar} codigoAqui={codigoAqui} />
        <section id="sobre" className="join-section">
          <div><span className="eyebrow">SUA JORNADA COMEÇA AQUI</span><h2>Pronto para criar<br />algo seu?</h2><p>Explore cada conceito no seu ritmo e descubra como as peças se conectam.</p></div>
          <div className="join-action" id="exemplo-condicional">
            {inscrito ? <p className="success-message" role="status">✦ Que bom ter você por aqui. Sua jornada já começou!</p> : <button className="primary-button" onClick={() => setInscrito(true)}>Começar a aprender <span>→</span></button>}
            <span className="join-caption">Sem pressa. No seu ritmo.</span>
            {codigoAqui("condicional")}
          </div>
        </section>
      </main>
      <footer><a className="brand" href="#inicio"><span className="brand-mark">R</span>react<span className="brand-light">.lab</span></a><span>Aprender React, uma ideia de cada vez.</span><a href="#inicio">Voltar ao topo ↑</a></footer>
    </div>
  );
}




export default function App() {
  return <BrowserRouter><AppContent /></BrowserRouter>;
}





