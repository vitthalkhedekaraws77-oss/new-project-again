import { useEffect, useState } from 'react'
import { ArrowDown, ArrowDownRight, ArrowUpRight, Menu, X } from 'lucide-react'

const navigation = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
]

const skillGroups = [
  {
    category: 'Frontend',
    skills: ['HTML', 'CSS', 'Bootstrap', 'Angular'],
    number: '01',
  },
  {
    category: 'Programming',
    skills: ['JavaScript'],
    number: '02',
  },
  {
    category: 'Backend',
    skills: ['Node.js'],
    number: '03',
  },
]

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const updateScrollState = () => setScrolled(window.scrollY > 24)
    updateScrollState()
    window.addEventListener('scroll', updateScrollState, { passive: true })
    return () => window.removeEventListener('scroll', updateScrollState)
  }, [])

  useEffect(() => {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            revealObserver.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12 },
    )
    document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element))

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id)
        })
      },
      { rootMargin: '-25% 0px -65% 0px' },
    )
    document.querySelectorAll('main section[id]').forEach((section) => sectionObserver.observe(section))

    return () => {
      revealObserver.disconnect()
      sectionObserver.disconnect()
    }
  }, [])

  useEffect(() => {
    if (!menuOpen) return

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className={`site-header${scrolled ? ' is-scrolled' : ''}`}>
        <nav className="nav-shell" aria-label="Main navigation">
          <a className="brand" href="#home" onClick={closeMenu} aria-label="Vitthal Khedekar, home">
            <span className="brand-mark">VK<span>.</span></span>
            <span className="brand-name">Vitthal Khedekar</span>
          </a>

          <button
            className="menu-toggle"
            type="button"
            aria-expanded={menuOpen}
            aria-controls="primary-navigation"
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          <div
            className={`nav-content${menuOpen ? ' is-open' : ''}`}
            id="primary-navigation"
          >
            <div className="nav-links">
              {navigation.map((item) => (
                <a
                  className={activeSection === item.href.slice(1) ? 'nav-link active' : 'nav-link'}
                  href={item.href}
                  key={item.label}
                  onClick={closeMenu}
                >
                  {item.label}
                </a>
              ))}
            </div>
            <a className="nav-cta" href="#about" onClick={closeMenu}>
              Get to know me <ArrowUpRight size={15} aria-hidden="true" />
            </a>
          </div>
        </nav>
      </header>

      <main id="main">
        <section className="hero section-shell" id="home" aria-labelledby="hero-title">
          <div className="hero-copy">
            <div className="eyebrow hero-eyebrow">
              <span className="eyebrow-line" />
              <span>Full-stack developer</span>
            </div>
            <h1 id="hero-title">
              Building for
              <br />
              <span className="headline-muted">the</span>{' '}
              <span className="headline-accent">web.</span>
            </h1>
            <p className="hero-intro">
              Hi, I’m <strong>Vitthal Khedekar</strong> — a full-stack developer with a toolkit
              spanning frontend technologies and Node.js.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#skills">
                Explore my skills <ArrowDownRight size={17} aria-hidden="true" />
              </a>
              <a className="text-link" href="#about">
                A little about me <ArrowDown size={15} aria-hidden="true" />
              </a>
            </div>
            <div className="hero-caption">
              <span className="caption-dot" />
              <span>Frontend to backend</span>
              <span className="caption-divider" />
              <span>One connected toolkit</span>
            </div>
          </div>

          <div className="hero-art" aria-label="Abstract code-inspired illustration" role="img">
            <div className="art-orbit orbit-one" />
            <div className="art-orbit orbit-two" />
            <div className="art-glow" />
            <div className="art-index">01 / 03</div>
            <div className="code-card">
              <div className="code-card-top">
                <div className="window-dots" aria-hidden="true">
                  <span />
                  <span />
                  <span />
                </div>
                <span className="code-file">developer.js</span>
                <span className="code-language">JS</span>
              </div>
              <div className="code-content" aria-hidden="true">
                <div><span className="code-line-number">01</span><span className="code-purple">const</span> <span className="code-blue">developer</span> = {'{'}</div>
                <div><span className="code-line-number">02</span>  name: <span className="code-green">'Vitthal'</span>,</div>
                <div><span className="code-line-number">03</span>  focus: <span className="code-green">'full-stack'</span>,</div>
                <div><span className="code-line-number">04</span>  builds: <span className="code-blue">['web']</span></div>
                <div><span className="code-line-number">05</span>{'}'}<span className="code-cursor" /></div>
              </div>
              <div className="code-card-footer">
                <span className="footer-spark" />
                <span>Curious by design</span>
                <span className="footer-bracket">{'{ }'}</span>
              </div>
            </div>
            <div className="floating-tag tag-top"><span className="tag-dot violet" /> HTML / CSS</div>
            <div className="floating-tag tag-bottom"><span className="tag-dot blue" /> Node.js</div>
            <div className="art-caption">A little structure. A lot of possibility.</div>
          </div>

          <a className="scroll-cue" href="#about" aria-label="Scroll to About">
            <span>Scroll to explore</span>
            <ArrowDown size={15} aria-hidden="true" />
          </a>
          <div className="hero-side-label" aria-hidden="true">PORTFOLIO&nbsp; / &nbsp;2026</div>
        </section>

        <section className="about section-shell" id="about" aria-labelledby="about-title">
          <div className="section-heading">
            <div className="eyebrow"><span className="eyebrow-line" />01 — About</div>
            <span className="section-aside">A short introduction</span>
          </div>
          <div className="about-content reveal">
            <h2 id="about-title">
              A developer with a
              <br />
              <span className="headline-accent">full-stack</span> perspective.
            </h2>
            <div className="about-copy">
              <p>
                I’m Vitthal Khedekar, a full-stack developer. My skills span frontend
                technologies including HTML, CSS, Bootstrap, and Angular, alongside
                JavaScript and Node.js.
              </p>
              <a className="inline-link" href="#skills">
                Explore my technical toolkit <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            </div>
          </div>
        </section>

        <section className="skills section-shell" id="skills" aria-labelledby="skills-title">
          <div className="section-heading">
            <div className="eyebrow"><span className="eyebrow-line" />02 — Toolkit</div>
            <span className="section-aside">Technologies &amp; skills</span>
          </div>
          <div className="skills-intro reveal">
            <h2 id="skills-title">The tools I work with.</h2>
            <p>A focused set of technologies across the full-stack.</p>
          </div>
          <div className="skill-list">
            {skillGroups.map((group, groupIndex) => (
              <article
                className="skill-row reveal"
                key={group.category}
                style={{ '--reveal-delay': `${groupIndex * 90}ms` } as React.CSSProperties}
              >
                <span className="skill-number">{group.number}</span>
                <h3>{group.category}</h3>
                <div className="skill-chips" aria-label={`${group.category} skills`}>
                  {group.skills.map((skill) => (
                    <span className="skill-chip" key={skill}>{skill}</span>
                  ))}
                </div>
                <ArrowUpRight className="skill-arrow" size={17} aria-hidden="true" />
              </article>
            ))}
          </div>
        </section>

        <section className="closing section-shell" aria-labelledby="closing-title">
          <div className="closing-panel reveal">
            <div className="closing-mark" aria-hidden="true">VK<span>.</span></div>
            <div>
              <div className="eyebrow"><span className="eyebrow-line" />Thanks for stopping by</div>
              <h2 id="closing-title">Let’s make the web<br /><span className="headline-accent">a little better.</span></h2>
            </div>
            <a className="closing-top" href="#home" aria-label="Back to top">
              Back to top <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          </div>
        </section>
      </main>

      <footer className="site-footer section-shell">
        <a className="footer-brand" href="#home">Vitthal Khedekar<span>.</span></a>
        <p>Full-stack developer</p>
        <span className="copyright">© {new Date().getFullYear()} · Built with care</span>
      </footer>
    </>
  )
}

export default App
