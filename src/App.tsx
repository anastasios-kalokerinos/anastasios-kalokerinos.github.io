import { useEffect, useMemo, useRef, useState } from 'react'
import {
  Activity,
  ArrowDown,
  Award,
  BookOpen,
  BriefcaseBusiness,
  CheckCircle2,
  ChevronRight,
  Code2,
  ExternalLink,
  Globe2,
  Network,
  Radio,
  Server,
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

type CaseTab = 'overview' | 'timeline' | 'evidence' | 'resolution'

const caseFileDetails: Record<string, {
  timeline: string[]
  evidence: string[]
  lessons: string[]
}> = {
  'CASE-2026-001': {
    timeline: [
      'Incident history reviewed and current vessel state confirmed',
      'On-site intervention initiated at Piraeus anchorage',
      'Active processing unit and communication path validated',
      'Incorrect recovery target isolated',
      'Correct path restored and end-to-end service verified',
      'Customer stakeholders informed and case closed',
    ],
    evidence: [
      'Linux service and connectivity checks',
      'Router and direct VSAT path validation',
      'Processing unit state comparison',
      'Network reachability and endpoint verification',
      'Onboard functional validation',
    ],
    lessons: [
      'Validate the active target before repeating historical recovery steps',
      'Field intervention can remove uncertainty faster than prolonged remote assumptions',
      'Operational ownership must continue through final customer confirmation',
    ],
  },
  'CASE-2026-002': {
    timeline: [
      'Historical support activity reconstructed',
      'Current environment compared against expected deployment state',
      'System and network dependencies validated',
      'Blocking condition isolated',
      'Configuration aligned and services restarted',
      'Operational recovery confirmed',
    ],
    evidence: [
      'Linux system state',
      'Service availability',
      'Network reachability',
      'Deployment configuration comparison',
      'Customer IT validation',
    ],
    lessons: [
      'Long-running cases require a clean reconstruction of assumptions',
      'Configuration drift should be checked early',
      'A complete recovery includes verification, documentation and stakeholder closure',
    ],
  },
  'CASE-2026-003': {
    timeline: [
      'Previous six months of troubleshooting reviewed',
      'Monitoring and database evidence correlated',
      'Linux logs and service behaviour analysed',
      'Implementation state checked in GitLab',
      'Root cause hypothesis tested',
      'Corrective action implemented and validated',
    ],
    evidence: [
      'Grafana observations',
      'PostgreSQL data',
      'Linux logs',
      'GitLab implementation history',
      'Live environment validation',
    ],
    lessons: [
      'Fragmented evidence becomes useful when correlated across systems',
      'A fresh review can challenge inherited assumptions',
      'Resolution speed improves when one owner connects the complete technical story',
    ],
  },
  'CASE-2025-004': {
    timeline: [
      'Last valid telemetry reviewed',
      'Movement history and device behaviour compared',
      'Indirect signals and contextual evidence analysed',
      'Likely search areas narrowed',
      'Actionable findings shared',
      'Both vehicles located',
    ],
    evidence: [
      'Historical telemetry',
      'Last known positions',
      'Device communication behaviour',
      'Movement patterns',
      'Operational context',
    ],
    lessons: [
      'Loss of live GPS does not eliminate all investigative value',
      'Historical data can remain operationally decisive',
      'Technical findings must be translated into clear actions for non-technical stakeholders',
    ],
  },
  'CASE-2026-005': {
    timeline: [
      'Field procedures and hardware variations mapped',
      'GRUB access workflow documented',
      'ASUS and NUC differences captured',
      'Teltonika bypass and direct VSAT procedure defined',
      'Guides structured in Confluence',
      'Operational use validated',
    ],
    evidence: [
      'Hardware-specific steps',
      'Linux GRUB procedure',
      'Router bypass workflow',
      'Direct VSAT connectivity checks',
      'Confluence documentation structure',
    ],
    lessons: [
      'Good documentation reduces dependence on individual memory',
      'Field guides must be usable under time pressure',
      'Hardware differences should be explicit, not implied',
    ],
  },
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

const stackGroups = [
  {
    title: 'Infrastructure & Systems',
    icon: Server,
    items: ['Linux', 'Windows Server', 'AWS', 'Docker', 'GitLab', 'Grafana', 'PostgreSQL', 'SQL'],
  },
  {
    title: 'Networking',
    icon: Network,
    items: ['TCP/IP', 'DNS', 'DHCP', 'NAT', 'Firewalls', 'Switches', 'VPN', 'SSH', 'Routing', 'VLAN', 'Port Forwarding', 'tcpdump', 'Network Diagnostics'],
  },
  {
    title: 'IoT, Fleet & Maritime',
    icon: Radio,
    items: ['CANBus', 'GNSS', 'BLE Sensors', 'FOTA', 'Teltonika', 'Ruptela', 'IoT Devices', 'Firmware Management', 'VSAT', 'Serial Communications'],
  },
  {
    title: 'APIs & Automation',
    icon: Code2,
    items: ['REST APIs', 'JSON', 'XML', 'Postman', 'PowerShell', 'Python', 'Git'],
  },
  {
    title: 'Platforms & Delivery',
    icon: BriefcaseBusiness,
    items: ['Jira', 'Salesforce', 'Zendesk', 'Confluence', 'Excel', 'Incident Management', 'Implementations', 'Customer Solutions'],
  },
]

const experience = [
  {
    period: 'MAR 2026 - PRESENT',
    company: 'Orca AI',
    role: 'Customer Support Specialist / Technical Solutions & Operations Scope',
    detail:
      'Owns mission-critical maritime incidents across a portfolio of 150+ vessels. Daily work includes Linux and SSH troubleshooting, PostgreSQL and SQL investigation, Grafana monitoring, GitLab collaboration, AWS and Docker environments, implementations, field visits, customer coordination and production service restoration. Notable outcomes include restoring vessels after outages lasting 240+ days and more than one year.',
  },
  {
    period: 'APR 2021 - MAR 2026',
    company: 'PowerFleet / Fleet Complete',
    role: 'Technical Support Engineer L2 / Data Analyst - EMEA',
    detail:
      'Delivered L2/L3 telematics support across Greece, DACH, Benelux and Baltic markets. Investigated CANBus, GNSS, firmware, hardware, BLE sensors, integrations and historical telemetry; created technical playbooks and internal tools; and helped locate two stolen vehicles despite the loss of live GPS transmissions.',
  },
  {
    period: 'SEP 2019 - MAR 2021',
    company: 'IBI Parts',
    role: 'Project Manager',
    detail:
      'Coordinated projects, customer requirements, suppliers and operational delivery while supporting commercial, technical and administrative workflows.',
  },
  {
    period: 'SEP 2018 - SEP 2019',
    company: 'Webhelp',
    role: 'Amazon Customer Support Representative',
    detail:
      'Handled high-volume customer cases in an international environment, resolving complex order, account and service issues while maintaining quality and customer satisfaction targets.',
  },
  {
    period: 'SEP 2016 - SEP 2018',
    company: 'Teleperformance',
    role: 'Microsoft Technical Support Agent',
    detail:
      'Provided technical support for Microsoft products and services, translated technical findings into clear customer actions and escalated complex issues through structured support processes.',
  },
  {
    period: 'NOV 2014 - MAR 2016',
    company: 'Stelpet',
    role: 'E-Shop & Digital Marketing Manager',
    detail:
      'Managed e-commerce operations, digital marketing, product content and customer workflows. Increased daily online orders by approximately 450% within six months.',
  },
  {
    period: 'MAR 2010 - OCT 2013',
    company: 'Istos Business Interface Ltd.',
    role: 'IT & Networks Manager',
    detail:
      'Supported business IT, networks, systems, users and technical operations while coordinating external providers and maintaining day-to-day service continuity.',
  },
  {
    period: 'MAY 2009 - FEB 2010',
    company: 'Hellenic Army',
    role: 'Communications Center Specialist',
    detail:
      'Supported communications-center operations, controlled access to information flows and worked in a structured environment where accuracy, availability and responsibility were critical.',
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
    { type: 'system', text: 'AK Operations Terminal v3.0' },
    { type: 'system', text: 'Type "help" for the complete command list.' },
  ])
  const terminalBodyRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    terminalBodyRef.current?.scrollTo({
      top: terminalBodyRef.current.scrollHeight,
      behavior: 'smooth',
    })
  }, [lines])

  const appendOutput = (text: string, type: TerminalLine['type'] = 'output') => {
    setLines((current) => [...current, { type, text }])
  }

  const runCommand = (rawCommand: string) => {
    const command = rawCommand.trim().toLowerCase()
    if (!command) return

    setLines((current) => [...current, { type: 'input', text: command }])
    setInput('')

    if (command === 'help') {
      appendOutput(
        [
          'AVAILABLE COMMANDS',
          'about       executive profile',
          'career      complete career history',
          'technical   technical toolkit',
          'expertise   core expertise',
          'impact      selected achievements',
          'languages   language proficiency',
          'education   education and professional development',
          'incidents   operational case files',
          'case 001    open case file 001',
          'case 002    open case file 002',
          'case 003    open case file 003',
          'case 004    open case file 004',
          'case 005    open case file 005',
          'contact     secure contact information',
          'linkedin    open LinkedIn',
          'operations  show operations center summary',
          'incident    show an anonymised production incident',
          'status      portfolio status',
          'clear       clear terminal',
        ].join('\n'),
      )
      return
    }

    if (command === 'about') {
      appendOutput(
        [
          'EXECUTIVE PROFILE',
          'Senior Technical Solutions & Operations Engineer with 15+ years across technical, customer-facing, and operational roles, including 5+ years in enterprise SaaS, IoT, telematics, and maritime AI.',
          'Trusted with mission-critical incidents, complex implementations, L3 escalations, and customer-facing field interventions.',
          'Hands-on with Linux servers, PostgreSQL, Grafana, GitLab, AWS, Docker, SSH, SQL, APIs, and network diagnostics.',
          'Known for restoring long-failing production environments, translating complex technical findings into clear actions, and collaborating effectively with Engineering, Product, Customer Success, vessel crews, and enterprise IT teams.',
        ].join('\n'),
      )
      return
    }

    if (command === 'career' || command === 'experience') {
      appendOutput(
        [
          'CAREER HISTORY',
          'Orca AI | Customer Support Specialist (Technical Solutions & Operations) | Mar 23, 2026 - Present',
          'PowerFleet / Fleet Complete | Technical Support Engineer L2 / Data Analyst (EMEA) | Apr 19, 2021 - Mar 23, 2026',
          'IBI Parts | Project Manager | Sep 2019 - Mar 2021',
          'Webhelp | Amazon Customer Support Representative | Sep 2018 - Sep 2019',
          'Teleperformance | Microsoft Technical Support Agent | Sep 2016 - Sep 2018',
          'Stelpet | E-Shop & Digital Marketing Manager | Nov 2014 - Mar 2016',
          'Istos Business Interface Ltd. | IT & Networks Manager | Mar 2010 - Oct 2013',
          'Hellenic Army | Communications Center Specialist | May 2009 - Feb 2010',
          'Technical & Customer-Facing Roles | Greece & Germany | 2001 - 2009',
        ].join('\n'),
      )
      return
    }

    if (command === 'technical' || command === 'skills' || command === 'stack') {
      appendOutput(
        [
          'TECHNICAL TOOLKIT',
'Infrastructure: Linux • Windows Server • AWS • Docker • SSH • TCP/IP • DNS • DHCP • NAT • Firewalls • Switches • VPN • Routing • VLAN • VSAT • Remote Diagnostics',
'Networking: TCP/IP • DNS • DHCP • NAT • Firewalls • Switches • VPN • SSH • Routing • VLAN',
'Diagnostics: tcpdump • Port Forwarding • Network Diagnostics • Log Analysis',
'IoT & Maritime: Teltonika • Ruptela • CANBus • GNSS • BLE Sensors • VSAT',
'APIs & Automation: REST APIs • JSON/XML • Postman • Python • PowerShell • Git',
'Platforms: Jira • Salesforce • Zendesk • Confluence • Excel • FOTA Web',
'Firmware & Device Management',
        ].join('\n'),
      )
      return
    }

    if (command === 'expertise') {
      appendOutput(
        [
          'CORE EXPERTISE',
          'Solutions & Operations: L3 Escalations • Incident Management • RCA • Implementations • Go-Lives',
          'Infrastructure: Linux • Windows Server • AWS • Docker • SSH • TCP/IP • DNS • DHCP • NAT • Firewalls • Switches • VPN • Routing • VLAN • VSAT • Remote Diagnostics',
          'Data & Observability: PostgreSQL • SQL • Grafana • Log Analysis • tcpdump',
          'Workflow: GitLab • Jira • Bug Reports • Fix Validation • Technical Documentation',
          'IoT & Telematics: GPS • CANBus • FOTA • Teltonika • Ruptela • Sensors • Firmware',
          'Customer Leadership: Enterprise Customers • Field Visits • Captains • Fleet & IT Managers • EMEA',
        ].join('\n'),
      )
      return
    }

    if (command === 'impact') {
      appendOutput(
        [
          'SELECTED IMPACT',
          '240-day vessel outage restored through onboard intervention',
          '1+ year vessel outage restored and returned to service',
          '6-month escalation solved within one week',
          '2 stolen vehicles recovered without live GPS transmission',
          '150+ vessel portfolio supported across international shipping groups',
          'Confluence operational guides created for GRUB access and VSAT connectivity',
          'Daily online orders increased by 450% within six months in an earlier digital operations role',
        ].join('\n'),
      )
      return
    }

    if (command === 'languages') {
      appendOutput(
        [
          'LANGUAGES',
          'Greek: Native',
          'German: Native',
          'English: Fluent',
        ].join('\n'),
      )
      return
    }

    if (command === 'education') {
      appendOutput(
        [
          'EDUCATION & PROFESSIONAL DEVELOPMENT',
          'American College of Greece | BSc studies in Computer Information Systems | 2002 - 2009',
          'Kaiserslautern Technical University | Computer Science studies | 1999 - 2002',
          'University of Toronto | Learn to Program in Python | 90.1% | 2016',
        ].join('\n'),
      )
      return
    }

    if (command === 'incidents' || command === 'cases') {
      appendOutput(
        [
          'OPERATIONAL CASE FILES',
          '001  Critical vessel communications restored after 240+ days',
          '002  Long-term vessel failure recovered after more than one year',
          '003  Six-month escalation resolved within one week',
          '004  Two stolen vehicles located without live GPS',
          '005  Complex field procedures standardised in Confluence',
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
        appendOutput(`Opening secure case file ${match}...`, 'system')
        onOpenCase(match)
      } else {
        appendOutput('Unknown case. Valid values: 001, 002, 003, 004, 005', 'system')
      }
      return
    }

    if (command === 'contact') {
      appendOutput(
        [
          'SECURE CONTACT',
          'Preferred channel: LinkedIn',
          'No personal phone number, home address, or direct email is published on this portfolio.',
          'Run: linkedin',
        ].join('\n'),
      )
      return
    }

    if (command === 'linkedin') {
      appendOutput('Opening LinkedIn in a new tab...', 'system')
      window.open('https://www.linkedin.com/in/anastasios-kalokerinos/', '_blank', 'noopener,noreferrer')
      return
    }
    if (command === 'operations') {
      appendOutput(
        [
          'GLOBAL OPERATIONS CENTER',
          'Status: Systems operational',
          'Regions: Europe / Middle East / APAC / North America',
          'Core areas: Networking / Linux / Data / Monitoring / IoT / Maritime',
          'Delivery: Incident response / Implementations / Field support / Customer coordination',
          'Privacy: All displayed scenarios are anonymised',
          'Use the Operations navigation item to open the interactive map.',
        ].join('\n'),
      )
      return
    }

    if (command === 'incident') {
      appendOutput(
        [
          'EXAMPLE PRODUCTION INCIDENT',
          'Symptoms: Production connectivity unavailable',
          'Investigation: SSH verification / Database validation / Network diagnostics / Log analysis',
          'Root cause: Configuration mismatch',
          'Outcome: Production service restored',
          'Status: Resolved',
        ].join('\n'),
      )
      return
    }


    if (command === 'status') {
      appendOutput(
        [
          'PORTFOLIO STATUS: ONLINE',
          'CONTACT MODE: LINKEDIN ONLY',
          'PUBLIC PERSONAL DATA: MINIMISED',
          'CUSTOMER DATA: REDACTED',
          'INCIDENT SUMMARIES: ANONYMISED',
        ].join('\n'),
      )
      return
    }

    if (command === 'clear') {
      setLines([])
      return
    }

    appendOutput(`Command not found: ${command}. Type "help".`, 'system')
  }

  return (
    <section className="content-section terminal-section" id="terminal">
      <div className="section-heading">
        <div>
          <div className="section-label">06 / OPERATIONS TERMINAL</div>
          <h2>Explore the full professional profile.</h2>
        </div>
        <p>Compact command output with career, education, technical skills and case files.</p>
      </div>

      <div className="interactive-terminal">
        <div className="terminal-window-bar">
          <div>
            <span />
            <span />
            <span />
          </div>
          <strong>AK-OPS / PROFESSIONAL PROFILE</strong>
          <small>CONNECTED</small>
        </div>

        <div className="terminal-output" ref={terminalBodyRef}>
          {lines.map((line, index) => (
            <pre className={`terminal-line terminal-${line.type}`} key={`${line.text}-${index}`}>
              {line.type === 'input' ? `ak@operations:~$ ${line.text}` : line.text}
            </pre>
          ))}
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
          />
          <button type="submit">RUN</button>
        </form>
      </div>
    </section>
  )
}
function RotatingStatus() {
  const messages = [
    'SYSTEMS OPERATIONAL',
    'OPERATIONS ACTIVE',
    'GLOBAL SUPPORT',
    'INCIDENT RESPONSE',
    'NETWORK READY',
    'PRODUCTION READY',
  ]
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % messages.length)
    }, 16000)

    return () => window.clearInterval(timer)
  }, [])

  return <span className="rotating-status-text" key={messages[index]}>{messages[index]}</span>
}

function GlobalOperationsCenter() {
  const nodes = [
    {
      id: 'athens',
      label: 'Athens',
      x: 52,
      y: 55,
      region: 'Southern Europe',
      focus: 'Primary operations hub',
      details: ['Customer coordination', 'Incident ownership', 'Field interventions', 'Greek / English / German'],
    },
    {
      id: 'rotterdam',
      label: 'Rotterdam',
      x: 46,
      y: 34,
      region: 'Western Europe',
      focus: 'Fleet and enterprise operations',
      details: ['Remote diagnostics', 'Implementations', 'Networking', 'Customer IT coordination'],
    },
    {
      id: 'hamburg',
      label: 'Hamburg',
      x: 50,
      y: 30,
      region: 'DACH',
      focus: 'German-speaking technical support',
      details: ['L2/L3 escalations', 'Telematics', 'Customer operations', 'Technical documentation'],
    },
    {
      id: 'oslo',
      label: 'Oslo',
      x: 49,
      y: 22,
      region: 'Nordic',
      focus: 'International operational support',
      details: ['Enterprise SaaS', 'Service recovery', 'Cross-team coordination', 'Production support'],
    },
    {
      id: 'dubai',
      label: 'Dubai',
      x: 62,
      y: 55,
      region: 'Middle East',
      focus: 'Regional customer operations',
      details: ['Remote troubleshooting', 'Deployments', 'Connectivity', 'Stakeholder communication'],
    },
    {
      id: 'singapore',
      label: 'Singapore',
      x: 78,
      y: 68,
      region: 'APAC',
      focus: 'Global fleet coverage',
      details: ['Maritime operations', 'Linux systems', 'VSAT connectivity', 'Operational handover'],
    },
    {
      id: 'newyork',
      label: 'New York',
      x: 25,
      y: 38,
      region: 'North America',
      focus: 'International SaaS support',
      details: ['Incident response', 'Platform support', 'Data investigation', 'Customer communication'],
    },
  ]

  const feed = [
    {
      state: 'RECOVERED',
      tone: 'recovered',
      title: 'Fleet Unit #147',
      detail: 'EMEA / Communications / Long-term outage',
    },
    {
      state: 'RESOLVED',
      tone: 'resolved',
      title: 'Fleet Unit #082',
      detail: 'Baltic Region / GNSS / Positioning',
    },
    {
      state: 'OPERATIONAL',
      tone: 'operational',
      title: 'Fleet Unit #214',
      detail: 'Mediterranean / Telemetry / Service restored',
    },
    {
      state: 'MONITORING',
      tone: 'monitoring',
      title: 'Fleet Unit #055',
      detail: 'North Atlantic / Connectivity / Stable',
    },
  ]

  const [selectedNode, setSelectedNode] = useState(nodes[0])
  const [feedIndex, setFeedIndex] = useState(0)

  useEffect(() => {
    const timer = window.setInterval(() => {
      setFeedIndex((current) => (current + 1) % feed.length)
    }, 9000)

    return () => window.clearInterval(timer)
  }, [feed.length])

  const selectedFeed = feed[feedIndex]

  return (
    <section className="content-section operations-center-section" id="operations">
      <div className="section-heading">
        <div>
          <div className="section-label">05 / GLOBAL OPERATIONS CENTER</div>
          <h2>Interactive international operations.</h2>
        </div>
        <p>Select a regional node to inspect the type of technical and customer-facing work supported across international environments.</p>
      </div>

      <div className="operations-v8-layout">
        <div className="operations-v8-map">
          <div className="map-topbar">
            <div>
              <span>AK GLOBAL OPERATIONS</span>
              <strong>SELECT A REGIONAL NODE</strong>
            </div>
            <small>ACTIVE ROUTE: {selectedNode.label.toUpperCase()}</small>
          </div>

          <div className="interactive-map-stage">
            <svg className="operations-map-svg operations-map-svg-v8" viewBox="0 0 100 70" role="img" aria-label="Abstract global operations map">
              <path className="landmass landmass-americas" d="M8 18 L18 10 L28 14 L31 25 L25 34 L28 45 L21 58 L15 50 L13 37 L7 30 Z" />
              <path className="landmass landmass-europe" d="M39 15 L49 10 L58 15 L57 27 L49 31 L42 26 Z" />
              <path className="landmass landmass-africa" d="M43 31 L57 31 L61 42 L55 58 L46 56 L40 44 Z" />
              <path className="landmass landmass-asia" d="M57 16 L72 10 L92 18 L94 33 L84 41 L69 35 L58 27 Z" />
              <path className="landmass landmass-australia" d="M78 50 L91 49 L96 58 L88 65 L78 61 Z" />

              <line
                className="selected-route-line"
                x1="52"
                y1="55"
                x2={selectedNode.x}
                y2={selectedNode.y}
              />

              <circle className="selected-route-packet" r="0.9">
                <animateMotion
                  dur="3.2s"
                  repeatCount="indefinite"
                  path={`M 52 55 L ${selectedNode.x} ${selectedNode.y}`}
                />
              </circle>
            </svg>

            {nodes.map((node) => (
              <button
                className={`map-node-button ${selectedNode.id === node.id ? 'is-selected' : ''}`}
                key={node.id}
                style={{ left: `${node.x}%`, top: `${(node.y / 70) * 100}%` }}
                onClick={() => setSelectedNode(node)}
                type="button"
                aria-label={`Open ${node.label} operations node`}
              >
                <span className="map-node-dot" />
                <strong>{node.label}</strong>
              </button>
            ))}
          </div>

          <div className="selected-node-panel">
            <div className="selected-node-heading">
              <div>
                <span>SELECTED NODE</span>
                <h3>{selectedNode.label}</h3>
              </div>
              <strong>{selectedNode.region}</strong>
            </div>

            <p>{selectedNode.focus}</p>

            <div className="selected-node-tags">
              {selectedNode.details.map((detail) => <span key={detail}>{detail}</span>)}
            </div>
          </div>
        </div>

        <aside className="operations-v8-side">
          <div className="operations-feed-v8">
            <div className="feed-header">
              <div>
                <span>ANONYMISED INCIDENT FEED</span>
                <strong>ROTATING OPERATIONAL SCENARIOS</strong>
              </div>
              <Activity size={22} />
            </div>

            <div className="featured-feed-item" key={`${selectedFeed.title}-${feedIndex}`}>
              <span className={`feed-state ${selectedFeed.tone}`}>{selectedFeed.state}</span>
              <strong>{selectedFeed.title}</strong>
              <small>{selectedFeed.detail}</small>
              <div className="feed-progress"><span /></div>
            </div>

            <div className="feed-queue">
              {feed.map((item, index) => (
                <button
                  type="button"
                  key={item.title}
                  className={index === feedIndex ? 'active' : ''}
                  onClick={() => setFeedIndex(index)}
                >
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <div>
                    <strong>{item.state}</strong>
                    <small>{item.detail}</small>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="operations-privacy-note">
            <ShieldCheck size={18} />
            <p>All nodes and incident scenarios are anonymised portfolio demonstrations. No customer names, vessel names, coordinates, system identifiers or confidential implementation details are displayed.</p>
          </div>
        </aside>
      </div>
    </section>
  )
}
function InteractiveCaseDossier({
  caseItem,
  onClose,
}: {
  caseItem: CaseStudy
  onClose: () => void
}) {
  const tabs: { id: CaseTab; label: string }[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'timeline', label: 'Timeline' },
    { id: 'evidence', label: 'Evidence' },
    { id: 'resolution', label: 'Resolution' },
  ]

  const [activeTab, setActiveTab] = useState<CaseTab>('overview')
  const [revealedCount, setRevealedCount] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const activeIndex = tabs.findIndex((tab) => tab.id === activeTab)

  const panelItems = useMemo(() => {
    if (activeTab === 'overview') {
      return [
        { label: '01 / SITUATION', body: caseItem.situation },
        { label: '02 / CHALLENGE', body: caseItem.challenge },
        { label: '03 / INVESTIGATION', body: caseItem.investigation.join('\n') },
      ]
    }

    if (activeTab === 'timeline') {
      return (caseFileDetails[caseItem.id]?.timeline ?? []).map((item, index) => ({
        label: `STEP ${String(index + 1).padStart(2, '0')}`,
        body: item,
      }))
    }

    if (activeTab === 'evidence') {
      return (caseFileDetails[caseItem.id]?.evidence ?? []).map((item, index) => ({
        label: `EVIDENCE ${String(index + 1).padStart(2, '0')}`,
        body: item,
      }))
    }

    return [
      { label: 'RESOLUTION', body: caseItem.resolution },
      { label: 'OUTCOME', body: caseItem.outcome },
      {
        label: 'LESSONS LEARNED',
        body: (caseFileDetails[caseItem.id]?.lessons ?? []).join('\n'),
      },
    ]
  }, [activeTab, caseItem])

  useEffect(() => {
    setActiveTab('overview')
  }, [caseItem.id])

  useEffect(() => {
    setRevealedCount(0)
    setIsPlaying(true)
  }, [activeTab, caseItem.id])

  useEffect(() => {
    if (!isPlaying || revealedCount >= panelItems.length) return

    const delay = revealedCount === 0 ? 420 : 760
    const timer = window.setTimeout(() => {
      setRevealedCount((current) => Math.min(current + 1, panelItems.length))
    }, delay)

    return () => window.clearTimeout(timer)
  }, [isPlaying, panelItems.length, revealedCount])

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
        return
      }

      if (event.key === 'ArrowRight') {
        event.preventDefault()
        setActiveTab(tabs[Math.min(activeIndex + 1, tabs.length - 1)].id)
      }

      if (event.key === 'ArrowLeft') {
        event.preventDefault()
        setActiveTab(tabs[Math.max(activeIndex - 1, 0)].id)
      }

      if (event.key === ' ') {
        event.preventDefault()
        setIsPlaying((current) => !current)
      }
    }

    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [activeIndex, onClose])

  const replay = () => {
    setRevealedCount(0)
    setIsPlaying(true)
  }

  const revealAll = () => {
    setRevealedCount(panelItems.length)
    setIsPlaying(false)
  }

  const goPrevious = () => {
    setActiveTab(tabs[Math.max(activeIndex - 1, 0)].id)
  }

  const goNext = () => {
    setActiveTab(tabs[Math.min(activeIndex + 1, tabs.length - 1)].id)
  }

  return (
    <div className="case-dossier-overlay" onClick={onClose}>
      <section className="case-dossier-shell cinematic-dossier" onClick={(event) => event.stopPropagation()}>
        <header className="case-dossier-top">
          <div>
            <span>DECLASSIFIED OPERATIONAL DOSSIER</span>
            <strong>{caseItem.id}</strong>
          </div>

          <div className="dossier-top-actions">
            <button type="button" onClick={replay}>REPLAY</button>
            <button type="button" onClick={revealAll}>SHOW ALL</button>
            <button type="button" onClick={onClose} aria-label="Close case file">
              <X size={22} />
            </button>
          </div>
        </header>

        <div className="case-dossier-meta">
          <div><span>STATUS</span><strong>{caseItem.status}</strong></div>
          <div><span>PRIORITY</span><strong>{caseItem.priority}</strong></div>
          <div><span>CATEGORY</span><strong>{caseItem.category}</strong></div>
          <div><span>DURATION</span><strong>{caseItem.duration}</strong></div>
        </div>

        <div className="case-dossier-title">
          <div className="case-dossier-icon"><CaseIcon type={caseItem.icon} /></div>
          <div>
            <h2>{caseItem.title}</h2>
            <p>{caseItem.summary}</p>
          </div>
        </div>

        <nav className="case-dossier-tabs" role="tablist" aria-label="Case file sections">
          {tabs.map((tab, index) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={activeTab === tab.id}
              className={activeTab === tab.id ? 'active' : ''}
              onClick={() => setActiveTab(tab.id)}
            >
              <span>{String(index + 1).padStart(2, '0')}</span>
              {tab.label}
            </button>
          ))}
        </nav>

        <div className="case-dossier-scroll">
          <div className="cinematic-console-status">
            <div>
              <span>SEQUENCE</span>
              <strong>{isPlaying ? 'PLAYING' : revealedCount >= panelItems.length ? 'COMPLETE' : 'PAUSED'}</strong>
            </div>
            <div className="cinematic-progress">
              <span style={{ width: `${panelItems.length ? (revealedCount / panelItems.length) * 100 : 0}%` }} />
            </div>
            <button type="button" onClick={() => setIsPlaying((current) => !current)}>
              {isPlaying ? 'PAUSE' : 'PLAY'}
            </button>
          </div>

          <div className="cinematic-case-stage" key={`${caseItem.id}-${activeTab}`}>
            {panelItems.map((item, index) => {
              const isVisible = index < revealedCount
              const isCurrent = index === revealedCount - 1

              return (
                <article
                  className={`cinematic-case-block ${isVisible ? 'is-visible' : ''} ${isCurrent ? 'is-current' : ''}`}
                  key={`${item.label}-${item.body}`}
                >
                  <div className="cinematic-block-label">
                    <span>{item.label}</span>
                    {isCurrent && isPlaying && <i className="cinematic-cursor">_</i>}
                  </div>

                  <div className="cinematic-block-body">
                    {item.body.split('\n').map((line) => (
                      <p key={line}>{line}</p>
                    ))}
                  </div>
                </article>
              )
            })}

            {revealedCount === 0 && (
              <div className="cinematic-loading">
                <span>INITIALISING CASE FILE</span>
                <i />
                <i />
                <i />
              </div>
            )}
          </div>

          <div className="case-dossier-controls">
            <button type="button" onClick={goPrevious} disabled={activeIndex === 0}>
              ← Previous
            </button>
            <div>
              <span>{String(activeIndex + 1).padStart(2, '0')} / 04</span>
              <small>Arrows navigate • Space pauses • Esc closes</small>
            </div>
            <button type="button" onClick={goNext} disabled={activeIndex === tabs.length - 1}>
              Next →
            </button>
          </div>

          <div className="case-dossier-confidentiality">
            <ShieldCheck size={18} />
            Customer names, vessel names, system identifiers and confidential implementation details have been removed.
          </div>

          <div className="case-dossier-tags">
            {caseItem.tags.map((tag) => <span key={tag}>{tag}</span>)}
          </div>
        </div>
      </section>
    </div>
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
          <a href="#operations" onClick={() => setMenuOpen(false)}>Operations</a>
          <a href="#terminal" onClick={() => setMenuOpen(false)}>Terminal</a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
        </nav>

        <div className="system-status">
          <span className="status-dot" /><RotatingStatus /></div>
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
              I work at the intersection of customers, technical systems, networking and business operations - taking ownership of complex production incidents and turning uncertainty into stable, measurable outcomes.
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
              <button className="incident-card" key={item.id} onClick={() => { setSelectedCase(item) }}>
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
                    <div className="capability-grid">
            {stackGroups.map(({ title, icon: Icon, items }) => (
              <article className="capability-card" key={title}>
                <div className="capability-card-header">
                  <span className="capability-icon"><Icon size={24} /></span>
                  <h3>{title}</h3>
                </div>
                <div className="capability-items">
                  {items.map((item) => <span className="capability-pill" key={item}>{item}</span>)}
                </div>
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
        <GlobalOperationsCenter />


        <OperationsTerminal
          onOpenCase={(caseId) => {
            const match = caseStudies.find((item) => item.id === caseId)
            if (match) { setSelectedCase(match) }
          }}
        />


        <section className="contact-section" id="contact">
          <div>
            <div className="section-label">07 / SECURE CONTACT</div>
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
        <InteractiveCaseDossier
          caseItem={selectedCase}
          onClose={() => setSelectedCase(null)}
        />
      )}
    </div>
  )
}

export default App


