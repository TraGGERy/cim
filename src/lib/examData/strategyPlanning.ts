import { ExamQuestion } from '../../types/cim';

export interface StrategyCaseStudy {
  id: string;
  title: string;
  industry: string;
  organizationType: 'SME' | 'Multinational' | 'B2B Enterprise' | 'D2C Retailer' | 'Tech Startup & Logistics Platform';
  background: string;
  currentSituation: {
    financials: string;
    marketShare: string;
    competitivePressure: string;
    internalResources: string;
  };
  examTasks: {
    sectionId: string;
    loId: string;
    commandVerb: string;
    marks: number;
    recommendedTimeMinutes: number;
    taskPrompt: string;
    requiredFrameworks: string[];
    modelAnswerStructure: {
      keyPoints: string[];
      commandVerbApplication: string;
      level6DistinctionCriteria: string[];
    };
  }[];
}

export const STRATEGY_PLANNING_CASES: StrategyCaseStudy[] = [
  {
    id: 'case-nyika-app',
    title: 'Nyika.app Mobility & Logistics – Scaling Motorcycle Fare Bidding & Express Parcel Delivery across Southern Africa',
    industry: 'Urban Mobility, Motorcycle Ride-Hailing & Express Parcel Logistics',
    organizationType: 'Tech Startup & Logistics Platform',
    background: 'Nyika (nyika.app) is Southern Africa’s premier motorcycle ride-hailing and express bike parcel delivery platform built on a transparent, peer-to-peer price bidding model ("inDrive for bikes"). Founded in Harare, Zimbabwe, Nyika allows passengers and SMEs to set their own pickup and dropoff points, describe package dimensions, and propose a fair fare. Verified motorcycle couriers either accept the offer or counter-bid in real time. The platform operates across four specialized 2-wheeler tiers: Standard Motorcycle Taxi (daily commuting), Executive Comfort Bike (longer inter-suburb rides), Express Document Moped (under 20-minute CBD courier delivery), and Heavy Cargo Freight Bike (SME retail boxes & bulk package dispatch). Nyika natively integrates multi-currency mobile wallets—EcoCash (Zimbabwe), M-Pesa (Mozambique), Airtel Money (Zambia), and cash/MasterCard across South Africa (Johannesburg, Pretoria), Zimbabwe (Harare, Bulawayo), Zambia (Lusaka), and Mozambique (Maputo). The board has mandated an aggressive 3-year strategic growth plan to scale both B2C urban transport and high-margin B2B commercial parcel delivery while defending against deep-pocketed 4-wheel ride-hailing incumbents.',
    currentSituation: {
      financials: 'Monthly Gross Merchandise Value (GMV) has reached $185,000 with an average platform take-rate (commission) of 12%. Gross margin on parcel delivery stands at 32%, compared to 14% on passenger rides. Operating profitability is compressed due to customer acquisition costs in Johannesburg and ongoing multi-country driver onboarding subsidies.',
      marketShare: 'Nyika holds a dominant 62% market share of on-demand motorcycle transport in Harare, but holds less than 4% share in Johannesburg/Gauteng where 4-wheel ride-hailing apps (Uber, Bolt) and informal minibus kombis dominate.',
      competitivePressure: 'Global ride-hailing giants are testing 2-wheeler courier pilots in South Africa and Zambia. Meanwhile, informal unregulated motorcycle operators in Harare and Maputo compete on untaxed cash fares without insurance, driver vetting, or helmet safety standards.',
      internalResources: 'Proprietary lightweight PWA and offline-first dispatch architecture (including USSD fallback and Telegram bot integration) optimized for low-bandwidth environments. Strong local brand affinity in Zimbabwe, but marketing communications and driver safety compliance infrastructure are stretched across multi-country expansion territories.'
    },
    examTasks: [
      {
        sectionId: 'Task 1',
        loId: 'LO2',
        commandVerb: 'Critically Evaluate',
        marks: 25,
        recommendedTimeMinutes: 30,
        taskPrompt: 'Prepare a comprehensive external environmental audit for Nyika.app across its Southern African operating markets (Zimbabwe, South Africa, Zambia, Mozambique) using PESTEL and Porter’s Five Forces. Synthesise your audit findings into a strategic TOWS Matrix to identify distinct strategic options for scaling both passenger rides and express parcel delivery.',
        requiredFrameworks: ['PESTEL', "Porter's 5 Forces", 'TOWS Matrix'],
        modelAnswerStructure: {
          keyPoints: [
            'Political/Legal: Municipal transport bylaws, licensing of two-wheelers, road safety mandates (helmets/reflective gear), and cross-border digital financial regulations (Reserve Bank of Zimbabwe, SARB).',
            'Economic: Currency volatility and inflation (USD vs ZWG in Zimbabwe, ZAR in South Africa); high fuel prices driving commuters and businesses toward fuel-efficient motorcycle alternatives; heavy mobile money penetration (EcoCash, M-Pesa).',
            'Societal: Severe urban traffic gridlock in Harare CBD and Johannesburg (Sandton/CBD); booming informal SME retail and e-commerce requiring rapid same-day intra-city delivery (Mbare Musika to Avondale in <20 mins).',
            'Technological: Smartphone and mobile data constraints; demand for lightweight PWAs, offline landmark routing, and automated Telegram/WhatsApp dispatch bots.',
            'Porter’s 5 Forces: Threat of Substitutes (High - minibus kombis, walking, 4-wheel ride-shares); Rivalry (High in South Africa, Moderate in Zimbabwe); Buyer Power (High - riders price-sensitive, mitigated by bidding model); Supplier Power (Moderate - driver retention and motorcycle financing).',
            'TOWS Maxi-Maxi (SO): Leverage proprietary PWA and EcoCash/M-Pesa integration to dominate hyper-local SME parcel logistics in congested commercial corridors.',
            'TOWS Mini-Maxi (WO): Overcome low brand awareness in South Africa by partnering with local e-commerce and dark-store retail chains for guaranteed B2B delivery volume.'
          ],
          commandVerbApplication: 'Critically evaluate by balancing contradictory market forces (e.g. currency instability vs high mobile money adoption; traffic congestion benefits vs road safety risks), avoiding purely descriptive lists.',
          level6DistinctionCriteria: [
            'Explicitly connects multi-country macroeconomic variables (EcoCash, M-Pesa, ZAR currency) to actionable quadrant strategies in the TOWS matrix.',
            'Demonstrates deep understanding of two-wheeler unit economics versus traditional four-wheel passenger fleets.'
          ]
        }
      },
      {
        sectionId: 'Task 2',
        loId: 'LO3',
        commandVerb: 'Justify',
        marks: 35,
        recommendedTimeMinutes: 40,
        taskPrompt: 'Using Johnson, Scholes & Whittington’s SFA (Suitability, Feasibility, Acceptability) framework, evaluate Ansoff’s Market Penetration (deepening Harare/Bulawayo share) versus Market Development (scaling Johannesburg & Lusaka) versus Product Development (launching B2B Heavy Cargo & Enterprise Courier subscriptions). Justify your chosen strategic option for Nyika.app and formulate three quantifiable SMART marketing objectives for Year 1.',
        requiredFrameworks: ['Ansoff Growth Matrix', 'SFA Framework (Suitability, Feasibility, Acceptability)', 'SMART Objectives'],
        modelAnswerStructure: {
          keyPoints: [
            'Option Appraisal via SFA:',
            '1. Market Penetration (Harare B2C): High Suitability, High Feasibility, but limited upside due to existing 62% market share and economic constraints.',
            '2. Market Development (Johannesburg B2C): High upside, but Low Feasibility and High Risk due to massive marketing spend required to compete against Uber/Bolt.',
            '3. Product Development (B2B Heavy Cargo & Enterprise Courier across Harare & Lusaka): High Suitability (taps into 32% gross margin parcel market), High Feasibility (utilizes existing tech stack and verified driver fleet), High Acceptability (predictable recurring revenue and fast payback).',
            'Strategic Justification: Prioritize Product Development (Enterprise B2B Cargo & Express Parcel Subscriptions) combined with targeted Market Penetration, yielding higher ROMI and insulating against consumer price-sensitivity.',
            'SMART Objective 1: Achieve $450,000 in monthly B2B parcel Gross Merchandise Value (GMV) with an average gross margin of 30% by Q4 Year 1.',
            'SMART Objective 2: Reduce Customer Acquisition Cost (CAC) for active business dispatchers from $28.00 to $16.50 within 9 months through automated referral loops and API integrations.',
            'SMART Objective 3: Attain an active driver Net Promoter Score (NPS) of +55 and a 90-day driver retention rate of 82% across Harare and Lusaka by Year 1 end.'
          ],
          commandVerbApplication: 'Justify by presenting evidence-backed trade-offs, comparing financial returns (margins, payback, ROMI) across all three Ansoff options using SFA criteria.',
          level6DistinctionCriteria: [
            'Provides concrete financial rationale contrasting B2C ride margin (14%) with B2B parcel margin (32%).',
            'Ensures all three objectives strictly adhere to SMART criteria and cascade directly to overall corporate strategy.'
          ]
        }
      },
      {
        sectionId: 'Task 3',
        loId: 'LO4 & LO5',
        commandVerb: 'Develop',
        marks: 25,
        recommendedTimeMinutes: 30,
        taskPrompt: 'Develop an integrated marketing plan using the SOSTAC® framework to launch Nyika’s B2B Enterprise Parcel & Express Courier solution. Include a 7Ps marketing mix configuration, an evaluation of required operational resources using the 5Ms framework, and a timed 6-month Gantt milestone schedule.',
        requiredFrameworks: ['SOSTAC® Framework', '7Ps Marketing Mix', '5Ms Resource Framework', 'Gantt Milestone Schedule'],
        modelAnswerStructure: {
          keyPoints: [
            'Product: 4-tier dedicated fleet: Express Document Moped (<20 min CBD dispatch), Standard Bike, Executive Bike, Heavy Cargo Freight Bike (up to 60kg load capacity) with real-time GPS tracking and Proof of Delivery (POD).',
            'Price: Dynamic Fair-Price Bidding with guaranteed minimum floor fares; corporate prepaid credit accounts and volume-tiered monthly invoicing.',
            'Place: Omnichannel ordering via Nyika Web PWA, WhatsApp Business Bot, Telegram Dispatch Bot, and direct API plugins for Shopify/WooCommerce merchants.',
            'Promotion: Hyper-local guerrilla marketing at key wholesale hubs (Mbare Musika, Sandton CBD, Cairo Road Lusaka); targeted LinkedIn & Facebook campaigns for SME retailers; driver referral bonuses.',
            'People & Process: Strict 5-point driver vetting (license check, police clearance, safety road test, customer service training); automated escrow payments via EcoCash/M-Pesa.',
            'Physical Evidence: Nyika branded high-visibility safety jackets, insulated thermal delivery boxes, certified safety helmets, digital SMS tracking links with driver photo and vehicle plate.',
            '5Ms Resource Plan: Men (recruit 3 B2B account managers, onboard 350 vetted bike couriers), Money ($120,000 launch budget), Materials (branded delivery boxes, telemetry tracking API), Minutes (6-month phased rollout), Measurements (CAC, On-Time Delivery Rate, Churn).',
            'Gantt Schedule: Month 1-2 (Tech API & driver recruitment); Month 3-4 (Harare/Bulawayo pilot launch); Month 5-6 (Lusaka expansion and regional B2B scaling).'
          ],
          commandVerbApplication: 'Develop a comprehensive, practitioner-grade implementation blueprint showing logical progression from strategy to operational tactical mix.',
          level6DistinctionCriteria: [
            'Seamlessly coordinates all 7Ps elements into a coherent B2B value proposition.',
            'Provides detailed risk-mitigated milestone schedule with designated operational accountability.'
          ]
        }
      },
      {
        sectionId: 'Task 4',
        loId: 'LO6',
        commandVerb: 'Recommend',
        marks: 15,
        recommendedTimeMinutes: 20,
        taskPrompt: 'Recommend a marketing measurement, control, and governance system using the PDCA (Plan-Do-Check-Act) cycle to monitor commercial performance, track ROMI, and prevent strategic drift across Nyika’s multi-country operations.',
        requiredFrameworks: ['PDCA Cycle', 'Marketing Dashboards & Leading/Lagging KPIs', 'Strategic Drift Governance'],
        modelAnswerStructure: {
          keyPoints: [
            'Plan: Establish quarterly ROMI benchmarks (minimum 4:1 LTV:CAC target for B2B; 15% platform take-rate; 95% on-time delivery rate).',
            'Do: Deploy unified marketing and telemetry dashboards tracking real-time booking velocity, counter-bid acceptance rates, and digital ad channel spend.',
            'Check: Weekly variance analysis comparing budgeted vs actual CAC across paid social, guerrilla activation, and merchant partner channels; bi-weekly driver satisfaction reviews.',
            'Act: Implement agile corrective interventions (e.g. if driver churn spikes in a territory, adjust minimum floor bidding rates; if B2B CAC exceeds $25, pause paid ads and boost merchant referral incentives).',
            'Strategic Drift Safeguard: Continuous monitoring of municipal regulatory changes (e.g. motorcycle city centre access restrictions in Harare/Johannesburg) and mobile money fee restructuring to adapt operational channels proactively.'
          ],
          commandVerbApplication: 'Recommend specific, enforceable governance mechanisms, control ratios, and escalation thresholds.',
          level6DistinctionCriteria: [
            'Distinguishes clearly between leading indicators (bid response time, app installs) and lagging commercial results (MRR, ROMI, gross contribution).',
            'Incorporates explicit contingency responses for emerging market regulatory shifts.'
          ]
        }
      }
    ]
  }
];

// 25+ Strategic Diagnostic Multiple-Choice Questions strictly mapped to the 2024 V1.1 Strategy & Planning Syllabus
export const STRATEGY_PLANNING_MCQ_QUESTIONS: ExamQuestion[] = [
  // --- LO1: Priorities, Purpose & Direction (Questions 1 to 4) ---
  {
    id: 101,
    loId: 'LO1',
    criterionId: '1.1',
    commandVerb: 'Explain',
    difficulty: 'intermediate',
    scenario: 'An international logistics startup is revising its corporate identity to balance social impact with rapid commercial expansion.',
    question: 'In the context of the CIM Strategy & Planning syllabus, which statement best distinguishes an organisation’s "Vision" from its "Mission"?',
    options: [
      { id: 'A', text: 'Mission defines the current core purpose and business scope, whereas Vision describes the aspirational future state the organisation seeks to achieve.' },
      { id: 'B', text: 'Mission sets the annual tactical marketing budget, whereas Vision outlines the daily operational KPIs.' },
      { id: 'C', text: 'Mission is solely for external shareholders, whereas Vision is exclusively an internal human resources document.' },
      { id: 'D', text: 'Mission must remain identical across all subsidiaries, whereas Vision changes quarterly with ad campaigns.' }
    ],
    correctAnswer: 'A',
    explanation: {
      rationale: 'Under LO 1.1, the Mission articulates the fundamental reason for existence and core value proposition today, while the Vision defines the long-term desired future destination.',
      distractorAnalysis: {
        'B': 'Confuses high-level strategic purpose with tactical budgeting and daily operational metrics.',
        'C': 'Mission and Vision both serve internal and external stakeholders.',
        'D': 'Vision is a long-term anchor, not a quarterly advertising slogan.'
      },
      syllabusReference: 'CIM Strategy and Planning Specification LO 1.1 (Mission, Vision and Purpose Statements)'
    }
  },
  {
    id: 102,
    loId: 'LO1',
    criterionId: '1.2',
    commandVerb: 'Analyse',
    difficulty: 'advanced',
    scenario: 'Nyika.app operates in high-inflation environments where currency volatility and sudden fuel price spikes occur frequently.',
    question: 'When analysing factors that drive strategic direction under LO 1.2, how should management align operational objectives to commercial imperatives?',
    options: [
      { id: 'A', text: 'By dynamically linking pricing algorithms to live fuel indices and mobile money wallets, ensuring driver retention and positive unit contribution margins.' },
      { id: 'B', text: 'By locking fares in a single depreciating local currency for a 5-year fixed period.' },
      { id: 'C', text: 'By eliminating all driver incentives to reduce overheads regardless of fleet churn.' },
      { id: 'D', text: 'By ignoring macroeconomic indicators and focusing solely on social media follower growth.' }
    ],
    correctAnswer: 'A',
    explanation: {
      rationale: 'LO 1.2 emphasizes aligning operational mechanisms with commercial imperatives and macro-environmental drivers (currency/inflation/fuel).',
      distractorAnalysis: {
        'B': 'Fixed depreciating currency pricing leads to severe margin erosion.',
        'C': 'Cutting driver incentives causes supply-side collapse.',
        'D': 'Ignores macro drivers essential for commercial viability.'
      },
      syllabusReference: 'CIM Strategy and Planning Specification LO 1.2 (Commercial Imperatives & Macro Drivers)'
    }
  },
  {
    id: 103,
    loId: 'LO1',
    criterionId: '1.3',
    commandVerb: 'Explain',
    difficulty: 'intermediate',
    scenario: 'A multinational retailer wants to ensure that its sustainability objectives do not contradict its commercial expansion plans.',
    question: 'How does an "Objective Cascade" ensure horizontal and vertical strategic alignment across supporting functional plans?',
    options: [
      { id: 'A', text: 'Corporate vision cascades down to strategic marketing goals, which then directly inform integrated functional plans (Brand, Digital, MarComms, CX, Sustainability).' },
      { id: 'B', text: 'Each department creates independent, uncoordinated goals to encourage internal rivalry.' },
      { id: 'C', text: 'Operational teams dictate overall corporate vision without executive governance.' },
      { id: 'D', text: 'The cascade eliminates the need for measurement and marketing control dashboards.' }
    ],
    correctAnswer: 'A',
    explanation: {
      rationale: 'An objective cascade ensures strategic coherence: corporate goals flow down to marketing objectives, which guide supporting functional sub-plans.',
      distractorAnalysis: {
        'B': 'Siloed, conflicting goals create strategic dissonance.',
        'C': 'Inverts strategic governance.',
        'D': 'Measurement is an indispensable component of the planning cascade.'
      },
      syllabusReference: 'CIM Strategy and Planning Specification LO 1.3 (Objective Cascade & Supporting Plans)'
    }
  },

  // --- LO2: Marketing Audits & Environmental Insights (Questions 4 to 8) ---
  {
    id: 104,
    loId: 'LO2',
    criterionId: '2.2',
    commandVerb: 'Apply',
    difficulty: 'advanced',
    scenario: 'An urban mobility platform is conducting a Porter’s 5 Forces audit in a city with thousands of informal minibus kombis, dense walking corridors, and dominant 4-wheel ride apps.',
    question: 'Which competitive force represents the most critical immediate threat to passenger market share?',
    options: [
      { id: 'A', text: 'High Threat of Substitutes (informal kombis and walking offer cheap alternatives for budget-constrained commuters).' },
      { id: 'B', text: 'Low Threat of New Entrants due to impossible tech requirements.' },
      { id: 'C', text: 'Zero Buyer Power as riders have no fare choices.' },
      { id: 'D', text: 'Zero Supplier Power because motorcycles require no maintenance.' }
    ],
    correctAnswer: 'A',
    explanation: {
      rationale: 'In Southern African urban transit, informal kombis, walking, and shared taxis represent massive, readily accessible substitute solutions for commuters.',
      distractorAnalysis: {
        'B': 'App cloning and lightweight software lower the barrier to entry.',
        'C': 'Buyers are highly price-sensitive and hold high bargaining power.',
        'D': 'Drivers (suppliers of vehicle labor) hold power and can switch platforms.'
      },
      syllabusReference: 'CIM Strategy and Planning Specification LO 2.2 (Porter’s 5 Forces & Analytical Models)'
    }
  },
  {
    id: 105,
    loId: 'LO2',
    criterionId: '2.2',
    commandVerb: 'Apply',
    difficulty: 'intermediate',
    scenario: 'A company maps its product lines on the Boston Consulting Group (BCG) Growth-Share Matrix. Product X has a 45% relative market share in a market growing at only 2% annually.',
    question: 'How should Product X be classified, and what is the prescribed strategic cash flow strategy?',
    options: [
      { id: 'A', text: 'Cash Cow: Harvest/Hold cash flows to fund high-growth "Stars" and promising "Question Marks".' },
      { id: 'B', text: 'Dog: Divest immediately to avoid cash burn.' },
      { id: 'C', text: 'Star: Reinvest 100% of profits back into aggressive capacity expansion.' },
      { id: 'D', text: 'Question Mark: Inject venture debt to gain market share.' }
    ],
    correctAnswer: 'A',
    explanation: {
      rationale: 'High market share in a low-growth mature market defines a Cash Cow, which generates surplus liquidity to support other strategic business units.',
      distractorAnalysis: {
        'B': 'Dogs have low market share in low-growth markets.',
        'C': 'Stars exist in high-growth markets.',
        'D': 'Question Marks have low share in high-growth markets.'
      },
      syllabusReference: 'CIM Strategy and Planning Specification LO 2.2 (BCG Matrix & Portfolio Analysis)'
    }
  },
  {
    id: 106,
    loId: 'LO2',
    criterionId: '2.3',
    commandVerb: 'Summarise',
    difficulty: 'advanced',
    scenario: 'Following an exhaustive PESTEL audit and internal 5Ms resource review, a marketing strategist synthesises the findings into a TOWS Matrix.',
    question: 'What is the specific strategic focus of a "Mini-Maxi" (WO) strategy within the TOWS Matrix?',
    options: [
      { id: 'A', text: 'Overcoming internal weaknesses by seizing external market opportunities.' },
      { id: 'B', text: 'Using internal strengths to exploit external market opportunities (Maxi-Maxi).' },
      { id: 'C', text: 'Using internal strengths to neutralize external threats (Maxi-Mini).' },
      { id: 'D', text: 'Minimizing internal weaknesses to avoid catastrophic external threats (Mini-Mini).' }
    ],
    correctAnswer: 'A',
    explanation: {
      rationale: 'TOWS WO (Weaknesses-Opportunities / Mini-Maxi) strategies focus on mitigating internal organizational vulnerabilities by taking advantage of emerging external market trends.',
      distractorAnalysis: {
        'B': 'Describes Maxi-Maxi (SO).',
        'C': 'Describes Maxi-Mini (ST).',
        'D': 'Describes Mini-Mini (WT).'
      },
      syllabusReference: 'CIM Strategy and Planning Specification LO 2.3 (SWOT & TOWS Matrix Synthesis)'
    }
  },
  {
    id: 107,
    loId: 'LO2',
    criterionId: '2.2',
    commandVerb: 'Apply',
    difficulty: 'intermediate',
    scenario: 'Nyika.app is mapping stakeholders for a proposed expansion into municipal parcel delivery zones.',
    question: 'According to Mendelow’s Power/Interest Matrix, how should "Key Players" (High Power / High Interest) be managed?',
    options: [
      { id: 'A', text: 'Manage Closely with continuous active consultation and direct executive alignment.' },
      { id: 'B', text: 'Keep Informed with occasional broadcast email newsletters.' },
      { id: 'C', text: 'Minimal Effort with passive observation.' },
      { id: 'D', text: 'Keep Satisfied without sharing strategic roadmap plans.' }
    ],
    correctAnswer: 'A',
    explanation: {
      rationale: 'High Power / High Interest stakeholders are Key Players and must be managed closely through direct, proactive engagement.',
      distractorAnalysis: {
        'B': 'Applies to Low Power / High Interest (Keep Informed).',
        'C': 'Applies to Low Power / Low Interest (Minimal Effort).',
        'D': 'Applies to High Power / Low Interest (Keep Satisfied).'
      },
      syllabusReference: 'CIM Strategy and Planning Specification LO 2.2 (Mendelow Power/Interest Matrix)'
    }
  },

  // --- LO3: Strategic Option Appraisal & SMART Objectives (Questions 8 to 14) ---
  {
    id: 108,
    loId: 'LO3',
    criterionId: '3.1',
    commandVerb: 'Evaluate',
    difficulty: 'advanced',
    scenario: 'Nyika.app is deciding whether to offer its existing motorcycle courier network to brand-new B2B corporate pharmacy and supermarket chains.',
    question: 'Under Ansoff’s Growth Matrix, which growth vector does this strategic initiative represent?',
    options: [
      { id: 'A', text: 'Market Development (taking existing service capabilities into a new B2B customer segment).' },
      { id: 'B', text: 'Market Penetration (selling more passenger rides to existing daily commuters).' },
      { id: 'C', text: 'Diversification (launching commercial airline services in Europe).' },
      { id: 'D', text: 'Product Development (selling electric cars to existing individual motorcycle passengers).' }
    ],
    correctAnswer: 'A',
    explanation: {
      rationale: 'Market Development involves targeting new customer markets/segments (B2B corporate retailers) with the existing core service offering (express motorcycle courier logistics).',
      distractorAnalysis: {
        'B': 'Market Penetration targets existing segments with existing offerings.',
        'C': 'Diversification involves new products in completely unrelated new markets.',
        'D': 'Product Development involves new products for existing customer segments.'
      },
      syllabusReference: 'CIM Strategy and Planning Specification LO 3.1 (Ansoff Matrix & Strategic Options)'
    }
  },
  {
    id: 109,
    loId: 'LO3',
    criterionId: '3.2',
    commandVerb: 'Justify',
    difficulty: 'advanced',
    scenario: 'A board evaluates three competing growth strategies using Johnson, Scholes & Whittington’s SFA framework.',
    question: 'What core analytical question must be answered when testing the "Suitability" of a proposed marketing strategy?',
    options: [
      { id: 'A', text: 'Does the strategy address key opportunities and threats identified in the environmental audit, and build on core organizational capabilities?' },
      { id: 'B', text: 'Do we currently have the physical cash in the bank to fund all 5 years upfront (Feasibility)?' },
      { id: 'C', text: 'Will shareholders receive a guaranteed 20% dividend within 30 days (Acceptability)?' },
      { id: 'D', text: 'Does the strategy strictly avoid all forms of digital marketing?' }
    ],
    correctAnswer: 'A',
    explanation: {
      rationale: 'Suitability assesses whether the strategic option addresses the strategic circumstances (audit findings, TOWS, strategic fit) in which the organisation operates.',
      distractorAnalysis: {
        'B': 'Assesses Feasibility (resources, capital, capability).',
        'C': 'Relates to Acceptability (stakeholder risk and financial return).',
        'D': 'Irrelevant criterion.'
      },
      syllabusReference: 'CIM Strategy and Planning Specification LO 3.2 (SFA Framework: Suitability, Feasibility, Acceptability)'
    }
  },
  {
    id: 110,
    loId: 'LO3',
    criterionId: '3.3',
    commandVerb: 'Develop',
    difficulty: 'intermediate',
    scenario: 'A marketing manager drafts the following objective: "Significantly increase brand awareness in Southern Africa next year."',
    question: 'Under CIM Level 6 standards, why does this statement fail the SMART criteria, and how must it be rectified?',
    options: [
      { id: 'A', text: 'It lacks Specificity, Measurability, and a clear Timeframe. It must state: "Increase prompted brand awareness among SME retailers in Harare from 35% to 58% by 31 December 2025."' },
      { id: 'B', text: 'It is already fully SMART because "significantly" is a standard marketing measurement unit.' },
      { id: 'C', text: 'Marketing objectives should never contain numbers to avoid accountability.' },
      { id: 'D', text: 'It should only focus on cost reductions rather than brand awareness.' }
    ],
    correctAnswer: 'A',
    explanation: {
      rationale: 'SMART requires Specific, Measurable, Achievable, Relevant, and Time-bound parameters. "Significantly" is ambiguous and unmeasurable.',
      distractorAnalysis: {
        'B': '"Significantly" is subjective and unquantifiable.',
        'C': 'CIM Level 6 mandates numerical quantification for marketing objectives.',
        'D': 'Brand awareness is a valid strategic objective when properly quantified.'
      },
      syllabusReference: 'CIM Strategy and Planning Specification LO 3.3 (SMART Marketing Objectives)'
    }
  },
  {
    id: 111,
    loId: 'LO3',
    criterionId: '3.4',
    commandVerb: 'Prepare',
    difficulty: 'intermediate',
    scenario: 'Nyika.app introduces an Express Legal Document courier tier promising guaranteed under-20-minute delivery in Harare CBD.',
    question: 'In configuring the "Physical Evidence" element of the 7Ps marketing mix, what tangible cues reinforce trust for high-value legal document dispatch?',
    options: [
      { id: 'A', text: 'Tamper-evident waterproof security pouches, digital OTP delivery verification codes, and branded high-visibility rider uniforms with ID badges.' },
      { id: 'B', text: 'Verbal promises made over an unrecorded phone call.' },
      { id: 'C', text: 'Using unmarked generic motorcycles without GPS tracking.' },
      { id: 'D', text: 'Offering discounts on unrelated passenger rides.' }
    ],
    correctAnswer: 'A',
    explanation: {
      rationale: 'Physical Evidence in service marketing provides tangible proof of quality, security, and professional standards (security pouches, OTP codes, uniforms, ID).',
      distractorAnalysis: {
        'B': 'Lacks physical proof and security verification.',
        'C': 'Increases customer anxiety regarding package safety.',
        'D': 'Irrelevant promotional tactic.'
      },
      syllabusReference: 'CIM Strategy and Planning Specification LO 3.4 (7Ps Marketing Mix: Physical Evidence)'
    }
  },

  // --- LO4: Supporting Plans & Planning Frameworks (Questions 12 to 16) ---
  {
    id: 112,
    loId: 'LO4',
    criterionId: '4.2',
    commandVerb: 'Justify',
    difficulty: 'advanced',
    scenario: 'A marketing team is structuring an omnichannel campaign using PR Smith’s SOSTAC® framework.',
    question: 'Which sequence correctly illustrates the logical progression of the six SOSTAC® components?',
    options: [
      { id: 'A', text: 'Situation analysis -> Objectives -> Strategy -> Tactics -> Action -> Control.' },
      { id: 'B', text: 'Strategy -> Objectives -> Situation analysis -> Tactics -> Control -> Action.' },
      { id: 'C', text: 'Tactics -> Action -> Control -> Situation analysis -> Objectives -> Strategy.' },
      { id: 'D', text: 'Situation analysis -> Tactics -> Strategy -> Objectives -> Action -> Control.' }
    ],
    correctAnswer: 'A',
    explanation: {
      rationale: 'SOSTAC® follows: Situation (Where are we now?), Objectives (Where do we want to go?), Strategy (How do we get there?), Tactics (Details of strategy), Action (Execution details), Control (Measurement).',
      distractorAnalysis: {
        'B': 'Strategy cannot precede Situation audit or Objectives.',
        'C': 'Tactics without Situation analysis leads to strategic failure.',
        'D': 'Objectives and Strategy must precede tactical execution.'
      },
      syllabusReference: 'CIM Strategy and Planning Specification LO 4.2 (Planning Frameworks: SOSTAC®)'
    }
  },
  {
    id: 113,
    loId: 'LO4',
    criterionId: '4.2',
    commandVerb: 'Justify',
    difficulty: 'intermediate',
    scenario: 'A digital marketing lead applies the Smart Insights RACE (or PRACE) planning framework to acquire corporate delivery accounts.',
    question: 'What is the primary operational objective of the "Act" phase within the RACE framework?',
    options: [
      { id: 'A', text: 'Encourage prospects to interact with digital touchpoints and generate qualified commercial leads (e.g. download API docs or request a demo).' },
      { id: 'B', text: 'Drive broad top-of-funnel brand reach on television (Reach phase).' },
      { id: 'C', text: 'Process the final invoice payment transaction (Convert phase).' },
      { id: 'D', text: 'Turn existing clients into long-term brand advocates (Engage phase).' }
    ],
    correctAnswer: 'A',
    explanation: {
      rationale: 'In RACE (Plan, Reach, Act, Convert, Engage), "Act" focuses on persuasion and customer interaction to generate leads before final conversion.',
      distractorAnalysis: {
        'B': 'Describes Reach.',
        'C': 'Describes Convert.',
        'D': 'Describes Engage.'
      },
      syllabusReference: 'CIM Strategy and Planning Specification LO 4.2 (Planning Frameworks: RACE/PRACE)'
    }
  },

  // --- LO5: Implementation & 5Ms Resources (Questions 14 to 20) ---
  {
    id: 114,
    loId: 'LO5',
    criterionId: '5.1',
    commandVerb: 'Analyse',
    difficulty: 'advanced',
    scenario: 'A logistics company plans a multi-country rollout. A 5Ms resource audit highlights that while marketing budget ("Money") is £200k, the operations team lacks bilingual customer support agents and local API telemetry specialists.',
    question: 'Under LO 5.1, what resource remediation strategy is required to ensure smooth execution?',
    options: [
      { id: 'A', text: 'Reallocate a portion of the "Money" budget into "Men" (human talent) to hire/outsource bilingual support and MarTech telemetry integration contractors.' },
      { id: 'B', text: 'Ignore human skills and spend 100% of the budget on Google Search ads.' },
      { id: 'C', text: 'Delay the rollout for 3 years without addressing the talent deficit.' },
      { id: 'D', text: 'Eliminate customer support completely to save costs.' }
    ],
    correctAnswer: 'A',
    explanation: {
      rationale: '5Ms resource management requires balancing Men, Money, Materials, Minutes, and Measurements. A talent deficit in "Men" undermines marketing ROI unless rectified through budget reallocation.',
      distractorAnalysis: {
        'B': 'Advertising without operational support leads to high churn and negative reviews.',
        'C': 'Passive delay misses market windows.',
        'D': 'Removing support damages customer experience and retention.'
      },
      syllabusReference: 'CIM Strategy and Planning Specification LO 5.1 (5Ms Resource Management & Balancing)'
    }
  },
  {
    id: 115,
    loId: 'LO5',
    criterionId: '5.4',
    commandVerb: 'Develop',
    difficulty: 'intermediate',
    scenario: 'In building a 6-month marketing implementation plan, the project manager constructs a Gantt chart.',
    question: 'Why is identifying the "Critical Path" on a Gantt chart essential for marketing governance under LO 5.4?',
    options: [
      { id: 'A', text: 'It highlights the longest sequence of dependent tasks that directly determines the minimum completion time of the entire marketing project.' },
      { id: 'B', text: 'It lists all non-essential social media posts that can be skipped.' },
      { id: 'C', text: 'It automatically calculates the marketing director’s annual bonus.' },
      { id: 'D', text: 'It replaces the need for financial budget tracking.' }
    ],
    correctAnswer: 'A',
    explanation: {
      rationale: 'The Critical Path identifies sequential activities where any delay will postpone the final project launch date, allowing managers to allocate priority oversight.',
      distractorAnalysis: {
        'B': 'Critical path identifies essential non-delayable dependencies.',
        'C': 'Unrelated to executive remuneration.',
        'D': 'Complements, but does not replace, financial budgeting.'
      },
      syllabusReference: 'CIM Strategy and Planning Specification LO 5.4 (Timed Action Plans & Gantt Charts)'
    }
  },

  // --- LO6: Control, Dashboards & PDCA Cycle (Questions 16 to 25) ---
  {
    id: 116,
    loId: 'LO6',
    criterionId: '6.1',
    commandVerb: 'Recommend',
    difficulty: 'advanced',
    scenario: 'A ride-hailing company is experiencing "Strategic Drift"—its business strategy is gradually falling behind rapid shifts in municipal road regulations and competing super-apps.',
    question: 'What governance mechanism should be deployed in marketing dashboards to detect strategic drift before commercial crisis occurs?',
    options: [
      { id: 'A', text: 'Tracking leading indicators (e.g. rider churn velocity, regulatory change alerts, app uninstall rate, bid rejection frequency) alongside lagging financial KPIs.' },
      { id: 'B', text: 'Reviewing only historical annual audited revenue statements once a year.' },
      { id: 'C', text: 'Discontinuing all customer feedback surveys to avoid negative sentiment.' },
      { id: 'D', text: 'Relying exclusively on vanity metrics like cumulative registered app downloads.' }
    ],
    correctAnswer: 'A',
    explanation: {
      rationale: 'Preventing strategic drift requires leading environmental and customer behaviour metrics that signal disconnects between organizational strategy and external market changes.',
      distractorAnalysis: {
        'B': 'Annual lagging metrics detect drift only after market share is lost.',
        'C': 'Ignoring feedback accelerates strategic drift.',
        'D': 'Vanity metrics mask underlying churn and user dissatisfaction.'
      },
      syllabusReference: 'CIM Strategy and Planning Specification LO 6.1 (Control Mechanisms & Strategic Drift)'
    }
  },
  {
    id: 117,
    loId: 'LO6',
    criterionId: '6.2',
    commandVerb: 'Explain',
    difficulty: 'intermediate',
    scenario: 'A B2B marketing director implements the Deming PDCA (Plan-Do-Check-Act) continuous improvement cycle.',
    question: 'Which activity occurs during the "Check" phase of the PDCA cycle?',
    options: [
      { id: 'A', text: 'Evaluating campaign performance metrics, dashboards, and variances against predefined SMART objectives and ROMI targets.' },
      { id: 'B', text: 'Drafting initial marketing mix hypotheses (Plan phase).' },
      { id: 'C', text: 'Deploying digital advertising creatives across social media channels (Do phase).' },
      { id: 'D', text: 'Institutionalizing successful campaign processes across all global regions (Act phase).' }
    ],
    correctAnswer: 'A',
    explanation: {
      rationale: 'The "Check" phase of PDCA involves measuring performance, analyzing variance between planned benchmarks and actual outcomes, and diagnosing root causes.',
      distractorAnalysis: {
        'B': 'Describes Plan.',
        'C': 'Describes Do.',
        'D': 'Describes Act.'
      },
      syllabusReference: 'CIM Strategy and Planning Specification LO 6.2 (PDCA Continuous Improvement)'
    }
  },
  {
    id: 118,
    loId: 'LO3',
    criterionId: '3.1',
    commandVerb: 'Evaluate',
    difficulty: 'advanced',
    scenario: 'Porter defines three Generic Strategies: Cost Leadership, Differentiation, and Focus.',
    question: 'What strategic danger does Michael Porter warn against when an organisation fails to clearly choose between Cost Leadership and Differentiation?',
    options: [
      { id: 'A', text: 'Becoming "Stuck in the Middle" with no sustainable competitive advantage and sub-par profitability.' },
      { id: 'B', text: 'Achieving an accidental global monopoly.' },
      { id: 'C', text: 'Paying zero corporate income taxes.' },
      { id: 'D', text: 'Being forced to eliminate all human employees.' }
    ],
    correctAnswer: 'A',
    explanation: {
      rationale: 'Porter warns that firms attempting to pursue cost leadership and differentiation simultaneously without distinct strategic focus end up "Stuck in the Middle".',
      distractorAnalysis: {
        'B': 'Ambiguity destroys market share rather than creating monopolies.',
        'C': 'Irrelevant tax distractor.',
        'D': 'Nonsensical distractor.'
      },
      syllabusReference: 'CIM Strategy and Planning Specification LO 3.1 (Porter’s Generic Strategies)'
    }
  },
  {
    id: 119,
    loId: 'LO1',
    criterionId: '1.2',
    commandVerb: 'Analyse',
    difficulty: 'advanced',
    scenario: 'A traditional B2B equipment distributor transitions from a linear value chain (pipeline business model) to a digital two-sided marketplace platform connecting independent equipment operators with construction project managers.',
    question: 'Which economic dynamic represents the primary source of enterprise value creation in this two-sided platform model?',
    options: [
      { id: 'A', text: 'Indirect network effects, where an increasing supply of verified equipment operators attracts more project managers, which in turn attracts more operators.' },
      { id: 'B', text: 'Linear inventory markups on depreciating heavy machinery stored in physical warehouses.' },
      { id: 'C', text: 'Elimination of all digital transaction logging to speed up manual paperwork.' },
      { id: 'D', text: 'Relying exclusively on printed yellow pages directories for vendor discovery.' }
    ],
    correctAnswer: 'A',
    explanation: {
      rationale: 'Platform business models create value by facilitating exchanges between two interdependent user groups. Cross-side (indirect) network effects create self-reinforcing liquidity and switching barriers that linear pipeline models cannot replicate.',
      distractorAnalysis: {
        'B': 'Describes traditional linear pipeline inventory models.',
        'C': 'Platforms rely fundamentally on digital data logs, matching algorithms, and automated trust architectures.',
        'D': 'Paper directories are obsolete legacy mechanisms.'
      },
      syllabusReference: 'CIM Strategy and Planning Specification LO 1.2 (Business Models: Platform vs Pipeline & Value Ecosystems)'
    }
  },
  {
    id: 120,
    loId: 'LO1',
    criterionId: '1.1',
    commandVerb: 'Appraise',
    difficulty: 'intermediate',
    scenario: 'A jet engine manufacturer stops selling engines as one-off capital hardware units and instead offers an operational contract: "Power by the Hour," charging airlines per engine operating hour flown, inclusive of all predictive maintenance and sensor telematics.',
    question: 'Identify the strategic marketing concept illustrated by this business model shift.',
    options: [
      { id: 'A', text: 'Servitization and Product-Service Systems (PSS)' },
      { id: 'B', text: 'Unrelated Conglomerate Diversification' },
      { id: 'C', text: 'Loss-Leader Retailing' },
      { id: 'D', text: 'Predatory Dumping' }
    ],
    correctAnswer: 'A',
    explanation: {
      rationale: 'Servitization involves transitioning from selling standalone physical products to delivering integrated solutions and performance outcomes (Product-Service Systems), transforming volatile one-off revenues into high-margin recurring relationships.',
      distractorAnalysis: {
        'B': 'The firm is still delivering aero-engine propulsion; it is not entering an unrelated industry.',
        'C': 'Loss-leader pricing involves selling a product below cost to stimulate footfall, which does not apply to aviation contracts.',
        'D': 'Predatory dumping involves selling goods abroad below fair value to destroy competitors.'
      },
      syllabusReference: 'CIM Strategy and Planning Specification LO 1.1 (Strategic concepts: Servitization, Value Proposition & Outcome Selling)'
    }
  },
  {
    id: 121,
    loId: 'LO2',
    criterionId: '2.1',
    commandVerb: 'Critically Evaluate',
    difficulty: 'advanced',
    scenario: 'An organisation evaluates whether its proprietary proprietary algorithm and AI model provide a Sustainable Competitive Advantage using Barney’s VRIO framework.',
    question: 'Under the VRIO framework, what condition must be met for a resource to confer a Sustained (Long-Term) Competitive Advantage?',
    options: [
      { id: 'A', text: 'The resource must be Valuable, Rare, Inimitable (difficult/costly to substitute or copy), and the Organisation must be structured to exploit it.' },
      { id: 'B', text: 'The resource must be purchased at a discount from an external commercial agency.' },
      { id: 'C', text: 'The resource must be shared openly with all direct market rivals.' },
      { id: 'D', text: 'The resource must be temporary and depreciated to zero within 30 days.' }
    ],
    correctAnswer: 'A',
    explanation: {
      rationale: 'Under the Resource-Based View (RBV) and Barney’s VRIO framework, resources that are merely Valuable provide competitive parity; Rare adds temporary advantage; but only Inimitable resources embedded in an Organised firm deliver sustained competitive advantage.',
      distractorAnalysis: {
        'B': 'Easily purchased market assets cannot provide sustainable advantage because competitors can buy them too.',
        'C': 'Sharing with rivals eliminates rarity and distinctiveness.',
        'D': 'Short-lived resources cannot support long-term advantage.'
      },
      syllabusReference: 'CIM Strategy and Planning Specification LO 2.1 (Resource-Based View RBV & VRIO Framework)'
    }
  },
  {
    id: 122,
    loId: 'LO2',
    criterionId: '2.3',
    commandVerb: 'Recommend',
    difficulty: 'intermediate',
    scenario: 'In Mendelow’s Power/Interest Matrix, municipal regulatory bodies responsible for issuing urban operating licenses possess High Power but currently display Low Interest in a ride-hailing company’s internal branding campaign.',
    question: 'What is the recommended stakeholder management strategy for this quadrant according to Mendelow?',
    options: [
      { id: 'A', text: 'Keep Satisfied (anticipate legal requirements and avoid provocative actions that could increase their active interest).' },
      { id: 'B', text: 'Manage Closely (bombard with daily promotional emails).' },
      { id: 'C', text: 'Monitor / Minimal Effort (ignore completely).' },
      { id: 'D', text: 'Keep Informed (treat identically to general consumer newsletter subscribers).' }
    ],
    correctAnswer: 'A',
    explanation: {
      rationale: 'In Mendelow’s Matrix, High Power / Low Interest stakeholders must be "Kept Satisfied". Their latent power can disrupt operations if antagonized, but unnecessary promotional noise risks provoking unwanted regulatory intervention.',
      distractorAnalysis: {
        'B': 'Manage Closely is reserved for High Power / High Interest stakeholders.',
        'C': 'Minimal Effort applies to Low Power / Low Interest stakeholders.',
        'D': 'Keep Informed applies to Low Power / High Interest stakeholders (e.g. community interest groups).'
      },
      syllabusReference: 'CIM Strategy and Planning Specification LO 2.3 (Stakeholder Management: Mendelow’s Power/Interest Matrix)'
    }
  },
  {
    id: 123,
    loId: 'LO2',
    criterionId: '2.2',
    commandVerb: 'Appraise',
    difficulty: 'advanced',
    scenario: 'A diversified conglomerate’s BCG Matrix reveals that its core industrial chemicals division is a "Cash Cow" generating £15M in annual surplus cash flows with minimal market growth (1.5% YoY), while its green hydrogen division is a high-growth "Question Mark" requiring capital.',
    question: 'What strategic capital reallocation does the BCG Growth-Share model prescribe?',
    options: [
      { id: 'A', text: 'Milk the Cash Cow’s operating cash flows to fund research, scaling, and market share capture in the Question Mark division to transform it into a future Star.' },
      { id: 'B', text: 'Reinvest 100% of cash flows back into the Cash Cow to artificially accelerate market growth rate.' },
      { id: 'C', text: 'Immediately liquidate the Cash Cow at fire-sale prices.' },
      { id: 'D', text: 'Starve both divisions of capital and distribute all funds as executive holiday bonuses.' }
    ],
    correctAnswer: 'A',
    explanation: {
      rationale: 'The fundamental logic of the BCG Portfolio Matrix is capital recycling: mature Cash Cows generate surplus cash that must be harvested to finance the heavy R&D and marketing expenditures needed to turn Question Marks into dominant Stars.',
      distractorAnalysis: {
        'B': 'Mature markets have low market growth; over-investing in Cash Cows destroys capital.',
        'C': 'Liquidating cash-generative assets destroys the firm’s funding engine.',
        'D': 'Non-commercial distractor.'
      },
      syllabusReference: 'CIM Strategy and Planning Specification LO 2.2 (Portfolio analysis: BCG Growth-Share Matrix)'
    }
  },
  {
    id: 124,
    loId: 'LO3',
    criterionId: '3.1',
    commandVerb: 'Evaluate',
    difficulty: 'intermediate',
    scenario: 'A consumer electronics maker decides to pursue Ansoff’s "Diversification" quadrant by developing and marketing commercial agricultural drone software in a foreign geographic territory where it has never operated.',
    question: 'How should the Chief Marketing Officer evaluate the strategic risk profile of this option compared to Market Penetration?',
    options: [
      { id: 'A', text: 'Diversification carries the highest risk profile because the firm operates simultaneously with unfamiliar products and unfamiliar markets, lacking established capabilities in both.' },
      { id: 'B', text: 'Diversification carries zero operational risk because farming markets never experience competition.' },
      { id: 'C', text: 'Market Penetration carries significantly higher risk than Diversification.' },
      { id: 'D', text: 'Both options have identical zero-risk profiles under modern corporate law.' }
    ],
    correctAnswer: 'A',
    explanation: {
      rationale: 'In Ansoff’s Matrix, Diversification involves both new products and new markets, requiring unfamiliar capabilities and customer knowledge, creating the highest commercial failure rate compared to Market Penetration (existing products in existing markets).',
      distractorAnalysis: {
        'B': 'Agricultural tech is highly competitive and volatile.',
        'C': 'Market Penetration carries the lowest risk profile in Ansoff’s matrix.',
        'D': 'All strategic moves carry risk; Diversification is the highest.'
      },
      syllabusReference: 'CIM Strategy and Planning Specification LO 3.1 (Ansoff Growth Matrix risk evaluation)'
    }
  },
  {
    id: 125,
    loId: 'LO3',
    criterionId: '3.1',
    commandVerb: 'Explain',
    difficulty: 'intermediate',
    scenario: 'Kim and Mauborgne’s "Blue Ocean Strategy" contrasts Red Oceans (crowded market space where rivals fight for share) with Blue Oceans.',
    question: 'What is the cornerstone concept of Blue Ocean Strategy that allows a firm to break the traditional cost-value trade-off?',
    options: [
      { id: 'A', text: 'Value Innovation: simultaneously pursuing differentiation and low cost by eliminating and reducing industry factors while raising and creating new buyer values.' },
      { id: 'B', text: 'Aggressive price undercutting below marginal cost until all rivals enter bankruptcy.' },
      { id: 'C', text: 'Doubling television advertising budgets on major national channels.' },
      { id: 'D', text: 'Restricting product availability to only 10 customers worldwide.' }
    ],
    correctAnswer: 'A',
    explanation: {
      rationale: 'Value Innovation rejects the conventional compromise between low cost and high differentiation. Through the Four Actions Framework (Eliminate, Reduce, Raise, Create), a firm unlocks uncontested market space (Blue Ocean) and renders competition irrelevant.',
      distractorAnalysis: {
        'B': 'Predatory price cutting leads to bloody Red Ocean price wars.',
        'C': 'Increasing advertising spend within existing boundaries is a classic Red Ocean tactic.',
        'D': 'Artificial extreme scarcity is a luxury niche tactic, not Value Innovation.'
      },
      syllabusReference: 'CIM Strategy and Planning Specification LO 3.1 (Strategic options: Blue Ocean Strategy & Value Innovation)'
    }
  },
  {
    id: 126,
    loId: 'LO3',
    criterionId: '3.2',
    commandVerb: 'Justify',
    difficulty: 'advanced',
    scenario: 'An executive board evaluates three competing market expansion proposals using Johnson, Scholes & Whittington’s SFA framework (Suitability, Feasibility, Acceptability).',
    question: 'Which evaluation criterion specifically investigates whether the organisation possesses the operational skills, technology, working capital, and supply chain capacity to execute the strategy?',
    options: [
      { id: 'A', text: 'Feasibility' },
      { id: 'B', text: 'Suitability' },
      { id: 'C', text: 'Acceptability' },
      { id: 'D', text: 'Desirability' }
    ],
    correctAnswer: 'A',
    explanation: {
      rationale: 'In the SFA model: Suitability assesses whether the option addresses strategic drivers (PESTEL, SWOT, objectives); Feasibility evaluates practical capability (resources, funding, skills, time); Acceptability measures expected outcomes for stakeholders (ROMI, risk, payback).',
      distractorAnalysis: {
        'B': 'Suitability assesses strategic fit with environmental opportunities.',
        'C': 'Acceptability evaluates financial return and stakeholder risk tolerance.',
        'D': 'Desirability is not an official pillar of the SFA framework.'
      },
      syllabusReference: 'CIM Strategy and Planning Specification LO 3.2 (Evaluating strategic options: SFA Framework)'
    }
  },
  {
    id: 127,
    loId: 'LO4',
    criterionId: '4.1',
    commandVerb: 'Analyse',
    difficulty: 'advanced',
    scenario: 'According to Kevin Lane Keller’s Customer-Based Brand Equity (CBBE) pyramid, brand building progresses through four ascending tiers: Identity (Salience), Meaning (Performance & Imagery), Response (Judgments & Feelings), and Relationships.',
    question: 'What is the pinnacle tier of Keller’s CBBE pyramid that represents intense, active loyalty and community advocacy?',
    options: [
      { id: 'A', text: 'Brand Resonance' },
      { id: 'B', text: 'Brand Salience' },
      { id: 'C', text: 'Brand Imagery' },
      { id: 'D', text: 'Brand Recall' }
    ],
    correctAnswer: 'A',
    explanation: {
      rationale: 'Brand Resonance sits at the apex of Keller’s CBBE model, characterized by deep psychological bonding, repeat transactional commitment, active brand community attachment, and evangelism.',
      distractorAnalysis: {
        'B': 'Brand Salience is the foundational bottom tier (awareness/identity).',
        'C': 'Brand Imagery is a second-tier element of Brand Meaning.',
        'D': 'Brand Recall is a subset of Salience.'
      },
      syllabusReference: 'CIM Strategy and Planning Specification LO 4.1 (Brand positioning & Keller’s Brand Equity CBBE Pyramid)'
    }
  },
  {
    id: 128,
    loId: 'LO4',
    criterionId: '4.2',
    commandVerb: 'Assess',
    difficulty: 'intermediate',
    scenario: 'A marketing team constructs a 2-dimensional Perceptual Brand Positioning Map plotting competitors on axes of "Price Point" (Budget vs Premium) and "Delivery Speed" (Standard 3-day vs Same-Day Express). They spot an empty cluster in the "Budget Price + Same-Day Express" quadrant.',
    question: 'How should the marketing strategist assess this unoccupied space (market whitespace)?',
    options: [
      { id: 'A', text: 'Evaluate whether the whitespace represents a genuine unfulfilled customer demand with viable unit economics, or an economically unfeasible service proposition that rivals intentionally avoided.' },
      { id: 'B', text: 'Assume automatically that whitespace guarantees instant profitability without checking operational delivery costs.' },
      { id: 'C', text: 'Reposition the brand to match the most crowded cluster on the map.' },
      { id: 'D', text: 'Discontinue perceptual mapping because spatial plots have no commercial relevance.' }
    ],
    correctAnswer: 'A',
    explanation: {
      rationale: 'Whitespace on a perceptual map can indicate an attractive blue ocean or an economically unsustainable proposition (e.g. delivering same-day express at rock-bottom prices may destroy margins). A strategist must validate operational viability and unit economics before positioning.',
      distractorAnalysis: {
        'B': 'Unexamined whitespace often masks structural unprofitability.',
        'C': 'Clustering in crowded space maximizes red ocean rivalry.',
        'D': 'Perceptual mapping is a core Level 6 positioning framework.'
      },
      syllabusReference: 'CIM Strategy and Planning Specification LO 4.2 (Positioning strategies & Perceptual Mapping whitespace)'
    }
  },
  {
    id: 129,
    loId: 'LO4',
    criterionId: '4.3',
    commandVerb: 'Formulate',
    difficulty: 'intermediate',
    scenario: 'A CEO instructs the marketing lead: "We need to dramatically improve our social media presence this year."',
    question: 'Which reformulated objective best satisfies the Level 6 SMART criteria required by CIM examiners?',
    options: [
      { id: 'A', text: 'Increase qualified B2B website demo requests from LinkedIn by 35% (from 400 to 540 per month) at a CPL below £45 by December 31, 2026.' },
      { id: 'B', text: 'Post interesting content on social media whenever the marketing intern has spare time.' },
      { id: 'C', text: 'Become the greatest social media company in the history of the world as quickly as possible.' },
      { id: 'D', text: 'Gain 10 million followers on TikTok regardless of relevance to commercial products.' }
    ],
    correctAnswer: 'A',
    explanation: {
      rationale: 'A SMART objective must be Specific (LinkedIn demo requests), Measurable (+35%, 400 to 540/mo), Achievable/Realistic (CPL < £45), Relevant (tied to commercial pipeline), and Time-bound (by Dec 31, 2026).',
      distractorAnalysis: {
        'B': 'Vague, unmeasured, and lacks time boundaries.',
        'C': 'Hyperbolic aspiration with zero SMART parameters.',
        'D': 'Vanity follower metric detached from commercial B2B revenue and timeline.'
      },
      syllabusReference: 'CIM Strategy and Planning Specification LO 4.3 (SMART Marketing Objectives & Performance Alignment)'
    }
  },
  {
    id: 130,
    loId: 'LO5',
    criterionId: '5.1',
    commandVerb: 'Distinguish',
    difficulty: 'intermediate',
    scenario: 'PR Smith’s SOSTAC® model comprises: Situation Analysis, Objectives, Strategy, Tactics, Action, and Control.',
    question: 'How do CIM examiners distinguish between "Strategy" and "Tactics" within SOSTAC®?',
    options: [
      { id: 'A', text: 'Strategy defines the overarching direction and long-term pathway to achieve objectives (e.g. target segment, positioning, Ansoff focus), whereas Tactics define the specific, short-term operational marketing mix tools (ePs).' },
      { id: 'B', text: 'Strategy and Tactics are identical interchangeable synonyms.' },
      { id: 'C', text: 'Strategy is executed by junior copywriters, whereas Tactics are determined by the board of directors.' },
      { id: 'D', text: 'Tactics are formulated first, and strategy is written afterward to justify the expenses.' }
    ],
    correctAnswer: 'A',
    explanation: {
      rationale: 'In SOSTAC®, Strategy provides the "big picture" guiding framework (STP, competitive advantage, directional choices), while Tactics represent the operational execution (7Ps details, campaigns, channels).',
      distractorAnalysis: {
        'B': 'Confusing strategy with tactics is an automatic deduction in CIM assessments.',
        'C': 'Inverts organizational hierarchy.',
        'D': 'Tactics must cascade from strategy, never the reverse.'
      },
      syllabusReference: 'CIM Strategy and Planning Specification LO 5.1 (SOSTAC® Framework: Strategy vs Tactics)'
    }
  },
  {
    id: 131,
    loId: 'LO5',
    criterionId: '5.2',
    commandVerb: 'Assess',
    difficulty: 'intermediate',
    scenario: 'In Booms & Bitner’s extended 7Ps marketing mix for service organisations (Product, Price, Place, Promotion, People, Process, Physical Evidence), a digital banking startup reviews customer abandonment during onboarding.',
    question: 'Which of the 7Ps elements directly encompasses the digital KYC identity verification flow, form steps, and account approval latency?',
    options: [
      { id: 'A', text: 'Process' },
      { id: 'B', text: 'Price' },
      { id: 'C', text: 'Promotion' },
      { id: 'D', text: 'Place' }
    ],
    correctAnswer: 'A',
    explanation: {
      rationale: 'In the 7Ps, "Process" encompasses the systems, procedures, steps, and flow of activities by which a service is delivered to the customer. Onboarding friction and KYC verification speeds are core Process determinants.',
      distractorAnalysis: {
        'B': 'Price relates to interest rates, subscription fees, and fee schedules.',
        'C': 'Promotion covers advertising, PR, and lead acquisition.',
        'D': 'Place relates to distribution channels and accessibility.'
      },
      syllabusReference: 'CIM Strategy and Planning Specification LO 5.2 (The 7Ps Marketing Mix for Services & Digital Customer Journeys)'
    }
  },
  {
    id: 132,
    loId: 'LO5',
    criterionId: '5.1',
    commandVerb: 'Appraise',
    difficulty: 'advanced',
    scenario: 'A strategy team creates a 6-month marketing plan allocating £250,000 to launch an enterprise software product. However, the plan fails to allocate time or budget for sales engineer training and customer onboarding specialists.',
    question: 'Under the 5Ms resource framework, what operational failure is imminent?',
    options: [
      { id: 'A', text: 'A critical deficit in "Men" (human talent and specialized technical capability), causing customer onboarding bottlenecks despite adequate "Money".' },
      { id: 'B', text: 'An immediate breach of international trademark treaties.' },
      { id: 'C', text: 'A failure of statutory corporate accounting filing deadlines.' },
      { id: 'D', text: 'An unavoidable collapse of internet service providers.' }
    ],
    correctAnswer: 'A',
    explanation: {
      rationale: 'A successful marketing plan requires equilibrium across the 5Ms (Men, Money, Materials, Minutes, Measurements). Investing capital (Money) without ensuring trained personnel (Men) leads to operational bottlenecks and implementation failure.',
      distractorAnalysis: {
        'B': 'Internal staffing imbalances do not violate trademark treaties.',
        'C': 'Accounting filings are corporate administrative tasks, not the direct risk here.',
        'D': 'Irrelevant infrastructure distractor.'
      },
      syllabusReference: 'CIM Strategy and Planning Specification LO 5.1 (5Ms Resource Allocation & Implementation Equilibrium)'
    }
  },
  {
    id: 133,
    loId: 'LO5',
    criterionId: '5.3',
    commandVerb: 'Recommend',
    difficulty: 'advanced',
    scenario: 'A legacy manufacturing corporation struggles with severe internal department resistance when shifting toward an agile digital customer-first marketing strategy.',
    question: 'Which change management framework provides an 8-step process beginning with "Creating a Sense of Urgency" and building a "Guiding Coalition"?',
    options: [
      { id: 'A', text: 'John Kotter’s 8-Step Change Model' },
      { id: 'B', text: 'Porter’s Generic Value Chain' },
      { id: 'C', text: 'Ansoff’s Matrix' },
      { id: 'D', text: 'Boston Consulting Group Matrix' }
    ],
    correctAnswer: 'A',
    explanation: {
      rationale: 'Kotter’s 8-Step Process is the established change management framework for marketing strategy implementation, progressing from creating urgency and guiding coalitions to generating short-term wins and anchoring changes in corporate culture.',
      distractorAnalysis: {
        'B': 'Porter’s Value Chain maps primary and support activities for margin creation.',
        'C': 'Ansoff’s Matrix analyzes product-market growth directions.',
        'D': 'BCG Matrix categorizes business unit portfolio cash flows.'
      },
      syllabusReference: 'CIM Strategy and Planning Specification LO 5.3 (Managing Change & Kotter’s 8-Step Change Framework)'
    }
  },
  {
    id: 134,
    loId: 'LO6',
    criterionId: '6.1',
    commandVerb: 'Evaluate',
    difficulty: 'intermediate',
    scenario: 'Kaplan & Norton’s Balanced Scorecard translates strategic marketing goals into comprehensive performance metrics across four balanced perspectives.',
    question: 'Which four perspectives constitute the Balanced Scorecard?',
    options: [
      { id: 'A', text: 'Financial, Customer, Internal Business Processes, and Learning & Growth' },
      { id: 'B', text: 'Political, Economic, Social, and Technological' },
      { id: 'C', text: 'Strengths, Weaknesses, Opportunities, and Threats' },
      { id: 'D', text: 'Product, Price, Place, and Promotion' }
    ],
    correctAnswer: 'A',
    explanation: {
      rationale: 'The Balanced Scorecard balances lagging Financial metrics with forward-looking indicators across Customer satisfaction, Internal operational efficiency, and Learning/Growth capabilities.',
      distractorAnalysis: {
        'B': 'Describes PEST macro-environmental analysis.',
        'C': 'Describes SWOT analysis.',
        'D': 'Describes the traditional 4Ps marketing mix.'
      },
      syllabusReference: 'CIM Strategy and Planning Specification LO 6.1 (Balanced Scorecard & Marketing Governance)'
    }
  },
  {
    id: 135,
    loId: 'LO6',
    criterionId: '6.1',
    commandVerb: 'Distinguish',
    difficulty: 'intermediate',
    scenario: 'A marketing dashboard tracks: Metric X (Monthly Recurring Revenue and Gross Profit) and Metric Y (Website Content Engagement Depth and Product Demo Booking Velocity).',
    question: 'How should the marketing director categorize Metric X and Metric Y regarding performance lead-time?',
    options: [
      { id: 'A', text: 'Metric X is a Lagging Indicator (reports historical financial results); Metric Y is a Leading Indicator (predicts future revenue pipeline).' },
      { id: 'B', text: 'Metric X is a Leading Indicator; Metric Y is a Lagging Indicator.' },
      { id: 'C', text: 'Both Metric X and Y are identical vanity metrics with zero commercial value.' },
      { id: 'D', text: 'Neither metric can be measured in digital marketing.' }
    ],
    correctAnswer: 'A',
    explanation: {
      rationale: 'Lagging indicators (revenue, profit) measure past outcomes that have already occurred. Leading indicators (engagement, demo bookings) measure early customer activity that directly forecasts future pipeline and revenue realization.',
      distractorAnalysis: {
        'B': 'Inverts the core definitions of leading and lagging metrics.',
        'C': 'Revenue and demo velocity are mission-critical commercial metrics, not vanity metrics.',
        'D': 'Both metrics are routinely tracked in modern analytics platforms.'
      },
      syllabusReference: 'CIM Strategy and Planning Specification LO 6.1 (Leading vs Lagging Performance Indicators & Metric Dashboards)'
    }
  },
  {
    id: 136,
    loId: 'LO6',
    criterionId: '6.2',
    commandVerb: 'Critically Evaluate',
    difficulty: 'advanced',
    scenario: 'A traditional corporate strategy document was locked for 3 years without revision. Despite rapidly emerging competitors and shifting consumer preferences, the marketing team continued spending on original campaign tactics.',
    question: 'What organizational failure has occurred, and how does Agile Marketing Governance prevent it?',
    options: [
      { id: 'A', text: 'Strategic Drift has occurred; Agile Marketing prevents this by deploying rapid quarterly review sprints, continuous customer feedback loops, and dynamic resource reallocation.' },
      { id: 'B', text: 'The organization has achieved optimal strategic consistency by ignoring customer trends.' },
      { id: 'C', text: 'An unavoidable macroeconomic collapse that no marketing control system could ever influence.' },
      { id: 'D', text: 'A failure caused solely by not having an official TikTok account.' }
    ],
    correctAnswer: 'A',
    explanation: {
      rationale: 'Strategic Drift occurs when organizational strategy fails to adapt to gradual or rapid environmental changes, leading to declining competitiveness. Agile marketing governance counters drift via continuous monitoring, flexible budgeting, and iterative campaign adjustment.',
      distractorAnalysis: {
        'B': 'Rigid adherence to outdated strategy is the definition of drift, not optimal consistency.',
        'C': 'Market monitoring and adaptive control are designed specifically to anticipate such changes.',
        'D': 'Trivial distractor ignoring strategic governance.'
      },
      syllabusReference: 'CIM Strategy and Planning Specification LO 6.2 (Preventing Strategic Drift & Agile Strategic Governance)'
    }
  }
];
