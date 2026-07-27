import { useEffect, useMemo, useState } from 'react'
import {
  Activity,
  ArrowDown,
  Award,
  BookOpen,
  BriefcaseBusiness,
  CheckCircle2,
  ChevronRight,
  Cloud,
  Code2,
  Database,
  ExternalLink,
  Globe2,
  HardDrive,
  Network,
  Radio,
  ShieldCheck,
  Ship,
  Terminal,
  Wrench,
  X,
} from 'lucide-react'
import './App.css'

type CaseStudy = {
  id: string
  status: string
  duration: string
  title: string
  summary: string
  tags: string[]
  icon: 'ship' | 'vehicle' | 'incident'
}

const caseStudies: CaseStudy[] = [
  {
    id: 'INC-240D',
    status: 'RESOLVED',
    duration: '240+ DAYS OFFLINE',
    title: 'Critical vessel outage restored',
    summary:
      'Initiated and completed an onboard technical intervention that restored a production vessel after more than 240 days of outage.',
    tags: ['Field Engineering', 'Linux', 'Networking', 'Ownership'],
    icon: 'ship',
  },
  {
    id: 'INC-365D',
    status: 'RESTORED',
    duration: '1+ YEAR OFFLINE',
    title: 'Long-term vessel failure recovered',
    summary:
      'Diagnosed and restored a second production vessel that had remained non-operational for over one year.',
    tags: ['Root Cause Analysis', 'Infrastructure', 'Maritime AI'],
    icon: 'ship',
  },
  {
    id: 'ESC-6M',
    status: 'CLOSED',
    duration: 'SOLVED IN 1 WEEK',
    title: 'Six-month escalation resolved',
    summary:
      'Took ownership of a complex issue that had resisted resolution for six months and delivered a working solution within one week.',
    tags: ['PostgreSQL', 'Grafana', 'GitLab', 'Troubleshooting'],
    icon: 'incident',
  },
  {
    id: 'REC-2X',
    status: 'RECOVERED',
    duration: '2 STOLEN VEHICLES',
    title: 'Vehicles located without live GPS',
    summary:
      'Used telematics evidence and historical data to help locate two stolen vehicles whose tracking units were no longer transmitting GPS positions.',
    tags: ['Telematics', 'Data Analysis', 'Incident Response'],
    icon: 'vehicle',
  },
]

const stack = [
  { name: 'Linux & SSH', icon: Terminal, level: 'Daily operations' },
  { name: 'PostgreSQL & SQL', icon: Database, level: 'Investigation & analysis' },
  { name: 'Grafana', icon: Activity, level: 'Monitoring & diagnostics' },
  { name: 'GitLab', icon: Code2, level: 'Engineering collaboration' },
  { name: 'AWS', icon: Cloud, level: 'Cloud infrastructure' },
  { name: 'Docker', icon: HardDrive, level: 'Container workflows' },
  { name: 'Networking', icon: Network, level: 'TCP/IP, VSAT, routing' },
  { name: 'IoT & Telematics', icon: Radio, level: 'Fleet & maritime systems' },
]

const experience = [
  {
    period: '2026 β€” PRESENT',
    company: 'Maritime AI Technology Company',
    role: 'Customer Support Specialist Β· Technical Solutions & Operations Scope',
    detail:
      'Mission-critical maritime operations, Linux infrastructure, databases, monitoring, implementations, field interventions and customer-facing technical leadership across a portfolio of 150+ vessels.',
  },
  {
    period: '2021 β€” 2026',
    company: 'PowerFleet Β· Fleet Complete',
    role: 'Technical Support Engineer L2 / Data Analyst β€” EMEA',
    detail:
      'L2/L3 telematics diagnostics, CANBus investigations, device management, fleet integrations and technical advisory across Greece, DACH, Benelux and Baltic markets.',
  },
  {
    period: '2001 β€” 2021',
    company: 'Technical & Customer Operations',
    role: 'IT, Project Management, Microsoft Support and Digital Operations',
    detail:
      'A broad technical foundation spanning infrastructure, software support, project delivery, e-commerce, customer operations and international environments.',
  },
]

function BootSequence({ onComplete }: { onComplete: () => void }) {
  const steps = useMemo(
    () => [
      'Initializing technical operations environment',
      'Loading incident history',
      'Validating infrastructure stack',
      'Establishing secure portfolio session',
    ],
    [],
  )
  const [active, setActive] = useState(0)

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActive((current) => {
        if (current >= steps.length - 1) {
          window.clearInterval(timer)
          window.setTimeout(onComplete, 650)
          return current
        }
        return current + 1
      })
    }, 520)
    return () => window.clearInterval(timer)
  }, [onComplete, steps.length])

  return (
    <div className="boot-screen" role="status" aria-live="polite">
      <div className="boot-terminal">
        <div className="terminal-bar">
          <span />
          <span />
          <span />
          <strong>AK OPERATIONS CONSOLE</strong>
        </div>
        <div className="boot-logo">AK</div>
        <p className="boot-command">$ launch portfolio --secure</p>
        <div className="boot-list">
          {steps.map((step, index) => (
            <div className={index <= active ? 'boot-step is-ready' : 'boot-step'} key={step}>
              <span>{index < active ? '[ OK ]' : index === active ? '[ .. ]' : '[    ]'}</span>
              {step}
            </div>
          ))}
        </div>
        <div className="boot-progress">
          <div style={{ width: `${((active + 1) / steps.length) * 100}%` }} />
        </div>
      </div>
    </div>
  )
}

function CaseIcon({ type }: { type: CaseStudy['icon'] }) {
  if (type === 'ship') return <Ship size={24} />
  if (type === 'vehicle') return <Radio size={24} />
  return <Wrench size={24} />
}

function App() {
  const [booted, setBooted] = useState(false)
  const [selectedCase, setSelectedCase] = useState<CaseStudy | null>(null)
  const [menuOpen, setMenuOpen] = useState(false)

  if (!booted) {
    return <BootSequence onComplete={() => setBooted(true)} />
  }

  return (
    <div className="app-shell">
      <div className="grid-overlay" />
      <header className="topbar">
        <a className="brand" href="#top" aria-label="Back to home">
          <span className="brand-mark">AK</span>
          <span>
            <strong>AKALOKERINOS</strong>
            <small>OPERATIONS PORTFOLIO</small>
          </span>
        </a>

        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
          {menuOpen ? <X /> : <Terminal />}
        </button>

        <nav className={menuOpen ? 'nav is-open' : 'nav'}>
          <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
          <a href="#incidents" onClick={() => setMenuOpen(false)}>Case Studies</a>
          <a href="#stack" onClick={() => setMenuOpen(false)}>Stack</a>
          <a href="#experience" onClick={() => setMenuOpen(false)}>Experience</a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
        </nav>

        <div className="system-status">
          <span className="status-dot" />
          SYSTEMS OPERATIONAL
        </div>
      </header>

      <main id="top">
        <section className="hero">
          <div className="hero-copy">
            <div className="eyebrow">
              <ShieldCheck size={16} />
              SENIOR TECHNICAL SOLUTIONS & OPERATIONS ENGINEER
            </div>
            <h1>
              Restoring systems.
              <span>Solving the impossible.</span>
            </h1>
            <p>
              I work at the intersection of customers, infrastructure and engineeringβ€”taking ownership of
              complex production incidents and turning uncertainty into stable, measurable outcomes.
            </p>
            <div className="hero-actions">
              <a className="primary-action" href="#incidents">
                View resolved incidents <ChevronRight size={18} />
              </a>
              <a className="secondary-action" href="#contact">
                Contact securely
              </a>
            </div>
            <div className="hero-meta">
              <span><Globe2 size={16} /> Based in Greece Β· International scope</span>
              <span><BriefcaseBusiness size={16} /> 15+ years technical experience</span>
            </div>
          </div>

          <div className="operations-panel">
            <div className="panel-heading">
              <div>
                <span>LIVE PROFILE</span>
                <strong>OPERATIONS OVERVIEW</strong>
              </div>
              <Activity size={24} />
            </div>
            <div className="profile-orbit">
              <div className="orbit orbit-one" />
              <div className="orbit orbit-two" />
              <div className="profile-core">
                <span>AK</span>
                <small>ONLINE</small>
              </div>
              <div className="node node-linux">LINUX</div>
              <div className="node node-data">DATA</div>
              <div className="node node-cloud">CLOUD</div>
              <div className="node node-ops">OPS</div>
            </div>
            <div className="panel-stats">
              <div><span>VESSEL PORTFOLIO</span><strong>150+</strong></div>
              <div><span>REGIONS</span><strong>EMEA</strong></div>
              <div><span>LANGUAGES</span><strong>GR Β· EN Β· DE</strong></div>
              <div><span>INCIDENT MODE</span><strong className="green-text">READY</strong></div>
            </div>
          </div>

          <a className="scroll-cue" href="#about" aria-label="Scroll to content">
            <ArrowDown />
          </a>
        </section>

        <section className="metrics-strip" aria-label="Career metrics">
          <div><strong>240+</strong><span>days of outage reversed</span></div>
          <div><strong>1+</strong><span>year-long failure restored</span></div>
          <div><strong>2</strong><span>stolen vehicles recovered</span></div>
          <div><strong>1 wk</strong><span>to solve a 6-month escalation</span></div>
        </section>

        <section className="content-section about-section" id="about">
          <div className="section-label">01 / OPERATOR PROFILE</div>
          <div className="section-grid">
            <div>
              <h2>Technical depth with customer-level ownership.</h2>
            </div>
            <div className="about-copy">
              <p>
                My work goes beyond closing tickets. I investigate production environments, coordinate with
                engineering and operations teams, communicate clearly with customer stakeholders and stay
                accountable until services are restored.
              </p>
              <p>
                My background combines enterprise SaaS, maritime technology, IoT, telematics, Linux,
                PostgreSQL, observability, cloud infrastructure and field operations.
              </p>
              <div className="principle">
                <Terminal size={20} />
                <span>
                  <small>ENGINEERING PRINCIPLE</small>
                  Success is not the number of tickets closed. It is the operational confidence that remains
                  after the incident is over.
                </span>
              </div>
            </div>
          </div>
        </section>

        <section className="content-section incidents-section" id="incidents">
          <div className="section-heading">
            <div>
              <div className="section-label">02 / SELECTED INCIDENTS</div>
              <h2>Impossible problems. Documented outcomes.</h2>
            </div>
            <p>Customer and company names are intentionally excluded to protect confidentiality.</p>
          </div>
          <div className="incident-grid">
            {caseStudies.map((item) => (
              <button className="incident-card" key={item.id} onClick={() => setSelectedCase(item)}>
                <div className="incident-topline">
                  <span className="incident-icon"><CaseIcon type={item.icon} /></span>
                  <span className="incident-id">{item.id}</span>
                </div>
                <div className="incident-status">
                  <span><CheckCircle2 size={15} /> {item.status}</span>
                  <small>{item.duration}</small>
                </div>
                <h3>{item.title}</h3>
                <p>{item.summary}</p>
                <div className="tag-list">
                  {item.tags.slice(0, 3).map((tag) => <span key={tag}>{tag}</span>)}
                </div>
                <div className="open-case">OPEN CASE FILE <ExternalLink size={14} /></div>
              </button>
            ))}
          </div>
        </section>

        <section className="content-section stack-section" id="stack">
          <div className="section-heading">
            <div>
              <div className="section-label">03 / SYSTEM CAPABILITIES</div>
              <h2>Technical operations stack.</h2>
            </div>
            <p>Tools and environments used for investigations, operations and delivery.</p>
          </div>
          <div className="stack-grid">
            {stack.map(({ name, icon: Icon, level }) => (
              <article className="stack-card" key={name}>
                <Icon size={25} />
                <div>
                  <strong>{name}</strong>
                  <span>{level}</span>
                </div>
                <CheckCircle2 size={17} className="stack-check" />
              </article>
            ))}
          </div>
        </section>

        <section className="content-section experience-section" id="experience">
          <div className="section-heading">
            <div>
              <div className="section-label">04 / CAREER LOG</div>
              <h2>Experience timeline.</h2>
            </div>
          </div>
          <div className="timeline">
            {experience.map((item, index) => (
              <article className="timeline-item" key={item.period}>
                <div className="timeline-index">0{index + 1}</div>
                <div className="timeline-period">{item.period}</div>
                <div className="timeline-body">
                  <small>{item.company}</small>
                  <h3>{item.role}</h3>
                  <p>{item.detail}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="content-section knowledge-section">
          <div className="knowledge-card">
            <BookOpen size={28} />
            <div>
              <span>KNOWLEDGE & DOCUMENTATION</span>
              <h2>Turning complex operations into repeatable procedures.</h2>
              <p>
                Author of operational guides covering Linux GRUB access and direct VSAT connectivity through
                Teltonika-router bypass procedures across different onboard computer architectures.
              </p>
            </div>
            <Award size={38} className="knowledge-award" />
          </div>
        </section>

        <section className="contact-section" id="contact">
          <div>
            <div className="section-label">05 / SECURE CONTACT</div>
            <h2>Have a complex technical challenge?</h2>
            <p>
              Connect through LinkedIn. No personal phone number, home address or direct email is published
              on this portfolio.
            </p>
          </div>
          <div className="contact-actions">
            <a
              className="primary-action"
              href="https://www.linkedin.com/in/anastasios-kalokerinos/"
              target="_blank"
              rel="noreferrer"
            >
              <ExternalLink size={18} /> Open LinkedIn
            </a>
          </div>
        </section>
      </main>

      <footer>
        <span>Β© {new Date().getFullYear()} Anastasios Kalokerinos</span>
        <span>PRIVACY-FIRST TECHNICAL PORTFOLIO</span>
        <span className="footer-status"><span className="status-dot" /> ONLINE</span>
      </footer>

      {selectedCase && (
        <div className="modal-backdrop" onClick={() => setSelectedCase(null)}>
          <article className="case-modal" onClick={(event) => event.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedCase(null)} aria-label="Close">
              <X />
            </button>
            <div className="section-label">CASE FILE / {selectedCase.id}</div>
            <div className="modal-icon"><CaseIcon type={selectedCase.icon} /></div>
            <span className="modal-status"><CheckCircle2 size={16} /> {selectedCase.status}</span>
            <h2>{selectedCase.title}</h2>
            <p>{selectedCase.summary}</p>
            <div className="modal-rule" />
            <small>OPERATIONAL CONTEXT</small>
            <p>
              This summary intentionally excludes customer names, system identifiers and confidential
              implementation details. A more detailed discussion can be provided during a professional
              interview where appropriate.
            </p>
            <div className="tag-list">
              {selectedCase.tags.map((tag) => <span key={tag}>{tag}</span>)}
            </div>
          </article>
        </div>
      )}
    </div>
  )
}

export default App


