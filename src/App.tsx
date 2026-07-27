import { useEffect, useMemo, useRef, useState } from 'react'
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
  priority: string
  category: string
  duration: string
  title: string
  summary: string
  situation: string
  challenge: string
  investigation: string[]
  resolution: string
  outcome: string
  tags: string[]
  icon: 'ship' | 'vehicle' | 'incident' | 'document'
}

const caseStudies: CaseStudy[] = [
  {
    id: 'CASE-2026-001',
    status: 'CLOSED',
    priority: 'HIGH',
    category: 'MARITIME OPERATIONS',
    duration: '240+ DAYS OFFLINE',
    title: 'Critical vessel communications restored',
    summary:
      'An onboard intervention restored a production vessel after more than 240 days of outage.',
    situation:
      'A customer vessel had remained offline for approximately eight months following an unsuccessful hardware-related recovery path.',
    challenge:
      'Previous troubleshooting attempts had not restored service. The vessel required direct operational ownership, customer coordination and an on-site investigation.',
    investigation: [
      'Validated the active onboard processing unit',
      'Reviewed the network path and router bypass options',
      'Verified direct VSAT connectivity',
      'Confirmed the communication target and system state',
      'Tested the end-to-end service path on board',
    ],
    resolution:
      'Identified that recovery attempts were targeting the inactive processing unit and re-established the correct communication path to the active system.',
    outcome:
      'Service was restored during the onboard visit, returning the vessel to operational status after more than 240 days offline.',
    tags: ['On-site Intervention', 'Linux', 'Networking', 'Root Cause Analysis'],
    icon: 'ship',
  },
  {
    id: 'CASE-2026-002',
    status: 'CLOSED',
    priority: 'HIGH',
    category: 'MARITIME OPERATIONS',
    duration: '1+ YEAR OFFLINE',
    title: 'Long-term vessel failure recovered',
    summary:
      'A second production vessel was restored after remaining non-operational for more than one year.',
    situation:
      'A vessel installation had remained unavailable for over one year and had not returned to service through previous support activity.',
    challenge:
      'The case required reconstruction of the technical history, validation of the current onboard environment and coordination across multiple operational stakeholders.',
    investigation: [
      'Rebuilt the troubleshooting timeline',
      'Reviewed Linux system and service state',
      'Validated network reachability and dependencies',
      'Compared expected and actual deployment configuration',
      'Coordinated technical checks with customer IT personnel',
    ],
    resolution:
      'Isolated the blocking condition, aligned the active environment with the expected operational configuration and validated service recovery.',
    outcome:
      'The vessel returned to service after more than a year of failed operation.',
    tags: ['Incident Ownership', 'Infrastructure', 'Customer Coordination', 'Recovery'],
    icon: 'ship',
  },
  {
    id: 'CASE-2026-003',
    status: 'CLOSED',
    priority: 'HIGH',
    category: 'TECHNICAL ESCALATION',
    duration: 'SOLVED IN 1 WEEK',
    title: 'Six-month escalation resolved',
    summary:
      'A complex issue that had remained unresolved for six months was solved within one week.',
    situation:
      'A recurring production issue had passed through a prolonged investigation without a stable resolution.',
    challenge:
      'The available evidence was fragmented across monitoring, database information, logs and prior support activity.',
    investigation: [
      'Reviewed historical troubleshooting and previous assumptions',
      'Correlated Grafana observations with PostgreSQL data',
      'Analysed Linux logs and service behaviour',
      'Tracked the relevant implementation state through GitLab',
      'Validated the final hypothesis against the live environment',
    ],
    resolution:
      'Connected the available technical evidence, identified the actual root cause and implemented the required corrective action.',
    outcome:
      'The six-month escalation was fully resolved within one week of taking ownership.',
    tags: ['PostgreSQL', 'Grafana', 'GitLab', 'Technical Escalation'],
    icon: 'incident',
  },
  {
    id: 'CASE-2025-004',
    status: 'RECOVERED',
    priority: 'CRITICAL',
    category: 'FLEET TELEMATICS',
    duration: '2 STOLEN VEHICLES',
    title: 'Vehicles located without live GPS',
    summary:
      'Telematics evidence and historical data were used to help locate two stolen vehicles whose trackers were no longer transmitting.',
    situation:
      'Two stolen vehicles could not be located through normal live tracking because their installed devices had stopped sending GPS data.',
    challenge:
      'The investigation had to continue without current positions, relying instead on indirect telemetry and historical evidence.',
    investigation: [
      'Reviewed the last valid telemetry and movement history',
      'Compared device behaviour before communication loss',
      'Analysed available vehicle and telematics signals',
      'Narrowed the likely location using operational evidence',
      'Communicated actionable findings to the relevant stakeholders',
    ],
    resolution:
      'Combined historical telemetry, device behaviour and contextual evidence to identify the likely location of each vehicle.',
    outcome:
      'Both stolen vehicles were successfully located despite the absence of live GPS transmissions.',
    tags: ['Telematics', 'Data Analysis', 'Incident Response', 'Investigation'],
    icon: 'vehicle',
  },
  {
    id: 'CASE-2026-005',
    status: 'PUBLISHED',
    priority: 'OPERATIONAL',
    category: 'KNOWLEDGE SYSTEMS',
    duration: '2 OPERATIONAL GUIDES',
    title: 'Complex field procedures standardised',
    summary:
      'Two company Confluence guides converted difficult field procedures into repeatable operational instructions.',
    situation:
      'Critical field procedures depended heavily on individual knowledge and required clearer, reusable documentation.',
    challenge:
      'The guides had to be technically accurate, usable under operational pressure and applicable across multiple onboard computer architectures.',
    investigation: [
      'Mapped the complete GRUB access procedure',
      'Documented ASUS and NUC hardware differences',
      'Defined the Teltonika router bypass workflow',
      'Validated direct VSAT connectivity steps',
      'Converted the procedures into clear Confluence guidance',
    ],
    resolution:
      'Created two structured How-To guides covering Linux GRUB access and direct VSAT connectivity through Teltonika router bypass procedures.',
    outcome:
      'The procedures became easier to execute consistently during field visits and remote support activity.',
    tags: ['Documentation', 'Confluence', 'Linux', 'Operational Enablement'],
    icon: 'document',
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
    period: '2026 - PRESENT',
    company: 'Maritime AI Technology Company',
    role: 'Customer Support Specialist / Technical Solutions & Operations Scope',
    detail:
      'Owns mission-critical maritime incidents across a portfolio of 150+ vessels. Daily work includes Linux and SSH troubleshooting, PostgreSQL and SQL investigation, Grafana monitoring, GitLab collaboration, AWS and Docker environments, implementations, field visits, customer coordination and production service restoration.',
  },
  {
    period: '2021 - 2026',
    company: 'PowerFleet / Fleet Complete',
    role: 'Technical Support Engineer L2 / Data Analyst - EMEA',
    detail:
      'Delivered L2/L3 telematics support across Greece, DACH, Benelux and Baltic markets. Investigated CANBus, GNSS, firmware, hardware, integrations and historical telemetry; created technical playbooks and internal tools; and supported recovery of two stolen vehicles despite the loss of live GPS transmissions.',
  },
  {
    period: '2001 - 2021',
    company: 'Technical, Customer and Digital Operations',
    role: 'IT Support, Project Delivery, Microsoft Support and Digital Operations',
    detail:
      'Built a broad operational foundation across IT support, infrastructure, Microsoft technologies, project delivery, customer service, e-commerce and international business environments. This background developed the customer communication, ownership and practical troubleshooting approach used in current technical solutions work.',
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
  if (type === 'document') return <BookOpen size={24} />
  return <Wrench size={24} />
}

type TerminalLine = {
  type: 'input' | 'output' | 'system'
  text: string
}

function OperationsTerminal({
  onOpenCase,
}: {
  onOpenCase: (caseId: string) => void
}) {
  const [input, setInput] = useState('')
  const [lines, setLines] = useState<TerminalLine[]>([
    { type: 'system', text: 'AK Operations Terminal v2.0' },
    { type: 'system', text: 'Secure portfolio session established.' },
    { type: 'system', text: 'Type "help" to list available commands.' },
  ])
  const [isTyping, setIsTyping] = useState(false)
  const terminalBodyRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    terminalBodyRef.current?.scrollTo({
      top: terminalBodyRef.current.scrollHeight,
      behavior: 'smooth',
    })
  }, [lines, isTyping])

  const appendLine = (line: TerminalLine) => {
    setLines((current) => [...current, line])
  }

  const typeOutput = (text: string, type: TerminalLine['type'] = 'output') => {
    setIsTyping(true)
    const parts = text.split('\n')
    let index = 0

    const writeNext = () => {
      if (index >= parts.length) {
        setIsTyping(false)
        return
      }

      appendLine({ type, text: parts[index] })
      index += 1
      window.setTimeout(writeNext, 90)
    }

    writeNext()
  }

  const runCommand = (rawCommand: string) => {
    if (isTyping) return

    const command = rawCommand.trim().toLowerCase()
    if (!command) return

    appendLine({ type: 'input', text: command })
    setInput('')

    if (command === 'help') {
      typeOutput(
        [
          'AVAILABLE COMMANDS',
          '',
          'about       show professional profile',
          'experience  show recent career experience',
          'skills      show technical and operational capabilities',
          'incidents   list notable operational incidents',
          'case 001    open the 240-day vessel recovery',
          'case 002    open the one-year vessel recovery',
          'case 003    open the six-month escalation',
          'case 004    open the stolen vehicle investigation',
          'case 005    open the documentation case',
          'contact     show secure contact details',
          'linkedin    open LinkedIn in a new tab',
          'whoami      show current professional identity',
          'status      show current portfolio status',
          'clear       clear terminal output',
        ].join('\n'),
      )
      return
    }

    if (command === 'about') {
      typeOutput(
        [
          'PROFILE LOADED',
          '',
          'Name: Anastasios Kalokerinos',
          'Role: Senior Technical Solutions & Operations Specialist',
          'Location: Greece',
          'Experience: 15+ years',
          'Languages: Greek / English / German',
          '',
          'Focus:',
          '- Customer-facing technical solutions',
          '- Production incident ownership',
          '- Service restoration and operational delivery',
          '- Cross-functional technical coordination',
          '- Maritime AI, enterprise SaaS, IoT and telematics',
        ].join('\n'),
      )
      return
    }

    if (command === 'experience') {
      typeOutput(
        [
          'RECENT EXPERIENCE',
          '',
          '[2026 - PRESENT]',
          'Maritime AI Technology Company',
          'Customer Support Specialist / Technical Solutions & Operations Scope',
          '- Mission-critical support across 150+ vessels',
          '- Linux, SSH, PostgreSQL, Grafana, GitLab, AWS and Docker',
          '- Field visits, implementations and production recovery',
          '- Restored outages lasting 240+ days and more than one year',
          '',
          '[2021 - 2026]',
          'PowerFleet / Fleet Complete',
          'Technical Support Engineer L2 / Data Analyst - EMEA',
          '- Telematics support across Greece, DACH, Benelux and Baltics',
          '- CANBus, GNSS, firmware, hardware and historical telemetry analysis',
          '- Internal documentation, playbooks and investigation tools',
          '- Helped locate two stolen vehicles without live GPS',
          '',
          '[EARLIER CAREER]',
          '- IT support, Microsoft technologies and project delivery',
          '- Customer operations, e-commerce and international environments',
        ].join('\n'),
      )
      return
    }

    if (command === 'skills' || command === 'stack') {
      typeOutput(
        [
          'CAPABILITIES',
          '',
          'Technical Operations',
          '- Incident ownership',
          '- Service restoration',
          '- On-call operations',
          '- Field intervention',
          '',
          'Systems & Data',
          '- Linux / SSH',
          '- PostgreSQL / SQL',
          '- Grafana / logs / diagnostics',
          '- Docker / AWS / GitLab',
          '',
          'Connectivity & Platforms',
          '- TCP/IP / VSAT / routing',
          '- IoT / telematics / maritime systems',
          '- Enterprise SaaS',
          '',
          'Customer Solutions',
          '- Stakeholder communication',
          '- Root cause analysis',
          '- Cross-team coordination',
          '- Operational documentation',
        ].join('\n'),
      )
      return
    }

    if (command === 'incidents' || command === 'cases') {
      typeOutput(
        [
          'NOTABLE OPERATIONAL INCIDENTS',
          '',
          '001  Critical vessel communications restored after 240+ days',
          '002  Long-term vessel failure recovered after more than one year',
          '003  Six-month escalation resolved within one week',
          '004  Two stolen vehicles located without live GPS',
          '005  Complex field procedures standardised in Confluence',
          '',
          'Use: case 001',
        ].join('\n'),
      )
      return
    }

    if (command.startsWith('case ')) {
      const code = command.replace('case ', '').trim().padStart(3, '0')
      const match = {
        '001': 'CASE-2026-001',
        '002': 'CASE-2026-002',
        '003': 'CASE-2026-003',
        '004': 'CASE-2025-004',
        '005': 'CASE-2026-005',
      }[code]

      if (match) {
        appendLine({ type: 'system', text: `Opening secure case file ${match}...` })
        onOpenCase(match)
      } else {
        typeOutput('Unknown case. Valid values: 001, 002, 003, 004, 005', 'system')
      }
      return
    }

    if (command === 'contact') {
      typeOutput(
        [
          'SECURE CONTACT',
          '',
          'Preferred channel: LinkedIn',
          'Response time: Usually within 24 hours',
          '',
          'No personal phone number, home address or direct email',
          'is published on this portfolio.',
          '',
          'Run: linkedin',
        ].join('\n'),
      )
      return
    }

    if (command === 'linkedin') {
      appendLine({ type: 'system', text: 'Opening LinkedIn in a new tab...' })
      window.open('https://www.linkedin.com/in/anastasios-kalokerinos/', '_blank', 'noopener,noreferrer')
      return
    }

    if (command === 'whoami') {
      typeOutput(
        [
          'ANASTASIOS KALOKERINOS',
          'Senior Technical Solutions & Operations Specialist',
          '',
          'Enterprise SaaS / Maritime AI / IoT / Linux / PostgreSQL',
          'Incident ownership / customer solutions / operational recovery',
        ].join('\n'),
      )
      return
    }

    if (command === 'status') {
      typeOutput(
        [
          'PORTFOLIO STATUS: ONLINE',
          'CONTACT MODE: LINKEDIN ONLY',
          'PUBLIC PERSONAL DATA: MINIMISED',
          'CUSTOMER DATA: REDACTED',
          'INCIDENT SUMMARIES: ANONYMISED',
          'SYSTEMS OPERATIONAL',
        ].join('\n'),
      )
      return
    }

    if (command === 'clear') {
      setLines([])
      return
    }

    typeOutput(`Command not found: ${command}. Type "help".`, 'system')
  }

  return (
    <section className="content-section terminal-section" id="terminal">
      <div className="section-heading">
        <div>
          <div className="section-label">05 / OPERATIONS TERMINAL</div>
          <h2>Explore the portfolio by command.</h2>
        </div>
        <p>Commands return information inside the console. Case commands open anonymised reports.</p>
      </div>

      <div className="interactive-terminal">
        <div className="terminal-window-bar">
          <div>
            <span />
            <span />
            <span />
          </div>
          <strong>AK-OPS / SECURE SESSION</strong>
          <small>CONNECTED</small>
        </div>

        <div className="terminal-output" ref={terminalBodyRef}>
          {lines.map((line, index) => (
            <pre className={`terminal-line terminal-${line.type}`} key={`${line.text}-${index}`}>
              {line.type === 'input' ? `ak@operations:~$ ${line.text}` : line.text}
            </pre>
          ))}
          {isTyping && <div className="terminal-typing">processing<span className="terminal-cursor">_</span></div>}
        </div>

        <form
          className="terminal-input-row"
          onSubmit={(event) => {
            event.preventDefault()
            runCommand(input)
          }}
        >
          <label htmlFor="terminal-command">ak@operations:~$</label>
          <input
            id="terminal-command"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            autoComplete="off"
            spellCheck={false}
            placeholder='type "help"'
            disabled={isTyping}
          />
          <button type="submit" disabled={isTyping}>RUN</button>
        </form>
      </div>
    </section>
  )
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
          <a href="#terminal" onClick={() => setMenuOpen(false)}>Terminal</a>
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
              SENIOR TECHNICAL SOLUTIONS & OPERATIONS SPECIALIST
            </div>
            <h1>
              Restoring systems.
              <span>Solving the impossible.</span>
            </h1>
            <p>
              I work at the intersection of customers, technical systems and business operations - taking ownership of complex production incidents and turning uncertainty into stable, measurable outcomes.
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
              <span><Globe2 size={16} /> Based in Greece / International scope</span>
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
                        <div className="profile-orbit radar-console">
              <div className="radar-grid" />
              <div className="radar-sweep" />
              <div className="radar-ring radar-ring-one" />
              <div className="radar-ring radar-ring-two" />
              <div className="radar-ring radar-ring-three" />

              <div className="radar-target target-one">
                <span />
                <small>INC-001</small>
              </div>
              <div className="radar-target target-two">
                <span />
                <small>OPS-150+</small>
              </div>
              <div className="radar-target target-three">
                <span />
                <small>EMEA</small>
              </div>
              <div className="radar-target target-four">
                <span />
                <small>DB</small>
              </div>

              <div className="profile-core">
                <span>AK</span>
                <small>ONLINE</small>
              </div>

              <div className="node node-linux">LINUX</div>
              <div className="node node-data">DATA</div>
              <div className="node node-cloud">CLOUD</div>
              <div className="node node-ops">OPS</div>

              <div className="radar-readout">
                <span>SCAN MODE</span>
                <strong>ACTIVE</strong>
              </div>
            </div>
            <div className="panel-stats">
              <div><span>VESSEL PORTFOLIO</span><strong>150+</strong></div>
              <div><span>REGIONS</span><strong>EMEA</strong></div>
              <div><span>LANGUAGES</span><strong>GR / EN / DE</strong></div>
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
              <h2>Technical solutions with customer-level ownership.</h2>
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
                  <small>SOLUTIONS PRINCIPLE</small>
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
              <div className="section-label">02 / OPERATIONAL CASE STUDIES</div>
              <h2>Declassified operational case files.</h2>
            </div>
            <p>Customer names, asset identifiers and confidential implementation details are intentionally excluded.</p>
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
        <OperationsTerminal
          onOpenCase={(caseId) => {
            const match = caseStudies.find((item) => item.id === caseId)
            if (match) setSelectedCase(match)
          }}
        />


        <section className="contact-section" id="contact">
          <div>
            <div className="section-label">06 / SECURE CONTACT</div>
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


