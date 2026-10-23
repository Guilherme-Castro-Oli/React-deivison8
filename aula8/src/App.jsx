import { useState } from "react";

const trilhas = [
  { id: "jsx", numero: "01", titulo: "JSX", descricao: "Escreva interfaces com uma sintaxe familiar e expressiva.", icone: "✦", alvo: "exemplo-jsx" },
  { id: "componentes", numero: "02", titulo: "Componentes", descricao: "Divida a interface em partes pequenas e reutilizáveis.", icone: "▧", alvo: "exemplo-componentes" },
  { id: "props", numero: "03", titulo: "Props", descricao: "Passe dados de um componente para outro com clareza.", icone: "↗", alvo: "exemplo-props" },
  { id: "listas", numero: "04", titulo: "Listas e keys", descricao: "Transforme coleções de dados em elementos da interface.", icone: "☷", alvo: "exemplo-listas" },
  { id: "condicional", numero: "05", titulo: "Renderização condicional", descricao: "Mostre o conteúdo certo conforme cada situação.", icone: "◐", alvo: "exemplo-condicional" },
];

const codigos = {
  jsx: `// JSX descreve a estrutura visual do hero.
<div className="hero-copy">
  <span className="eyebrow">UM GUIA PRÁTICO DE REACT</span>
  <h1>Ideias simples.<br /><span>Interfaces incríveis.</span></h1>
  <p className="hero-description">
    Aprenda os fundamentos do React construindo uma interface de verdade.
  </p>
</div>`,
  componentes: `// Header é um componente reutilizável.
function Header({ code, closeCode }) {
  return (
    <>
      <header className="topbar">
        {/* marca, navegação e botão */}
      </header>
      <CodeExample
        concept={code?.id === "componentes" ? code : null}
        onClose={closeCode}
      />
    </>
  );
}

// O App renderiza o Header:
<Header code={conceitoAberto} closeCode={fecharCodigo} />`,
  props: `// TrilhaCard recebe os dados e a ação pelas props.
function TrilhaCard({ numero, titulo, descricao, icone, onExplore }) {
  return (
    <article className="trilha-card">
      <span>{icone}</span>
      <span>{numero}</span>
      <h3>{titulo}</h3>
      <p>{descricao}</p>
      <button onClick={onExplore}>Explorar conceito</button>
    </article>
  );
}

// O componente pai fornece as props:
<TrilhaCard {...trilha} onExplore={() => explorar(trilha)} />`,
  listas: `{trilhas.map((trilha) => (
  <TrilhaCard
    key={trilha.id}
    {...trilha}
    onExplore={() => explorar(trilha)}
  />
))}`,
  condicional: `// O estado muda quando a pessoa clica.
const [inscrito, setInscrito] = useState(false);

// O ternário escolhe o conteúdo a renderizar.
{inscrito ? (
  <p className="success-message" role="status">
    Sua jornada já começou!
  </p>
) : (
  <button onClick={() => setInscrito(true)}>
    Começar a aprender
  </button>
)}`,
};

const explicacoes = {
  jsx: "O JSX mistura marcação e JavaScript para descrever a interface. Componentes e expressões também podem ser inseridos nessa estrutura.",
  componentes: "Header é uma função que retorna uma parte da página. O App a reutiliza como uma tag JSX e fornece valores por props.",
  props: "Props são informações recebidas pelo componente. Aqui, dados da trilha e uma função de clique chegam ao TrilhaCard.",
  listas: "map percorre o array trilhas e cria um card para cada item. A key usa um identificador estável para React acompanhar cada card.",
  condicional: "inscrito começa como false. Ao clicar, setInscrito atualiza o estado e o ternário troca o botão pela mensagem de sucesso.",
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

export default function App() {
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
          <div className="section-heading"><div><span className="eyebrow">A BASE DE TUDO</span><h2>Aprenda fazendo.</h2></div><p>Cinco conceitos essenciais para sair da teoria e começar a criar.</p></div>
          <div className="trilha-grid" id="exemplo-listas">
            {trilhas.map((trilha) => <TrilhaCard key={trilha.id} {...trilha} onExplore={() => explorar(trilha)} />)}
          </div>
          {codigoAqui("listas")}
          {codigoAqui("props")}
        </section>

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


