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
