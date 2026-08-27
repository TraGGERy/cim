import { ModuleInfo, CommandVerbDefinition } from '../types/cim';

export const CIM_MODULES: Record<string, ModuleInfo> = {
  'commercial-intelligence': {
    id: 'commercial-intelligence',
    title: 'CIM Level 6 Award in Commercial Intelligence',
    code: 'CI-L6-2024',
    credits: 10,
    tqt: 100,
    glh: 80,
    assessmentType: 'Onscreen Multiple-Choice Test',
    durationMinutes: 90,
    totalQuestions: 45,
    passingScore: {
      pass: 60,
      merit: 70,
      distinction: 80
    },
    description: 'Master commercial metrics, financial frameworks, resource management (5Ms), marketing attribution, predictive forecasting, and strategic budgeting to deliver commercial effectiveness and optimize ROMI.',
    learningOutcomes: [
      {
        id: 'LO1',
        title: 'Understand the metrics used to measure marketing performance',
        criteria: [
          {
            id: '1.1',
            description: "Determine financial metrics to understand marketing's contribution to an organisation's commercial performance",
            indicativeContent: [
              'Key financial terms: Revenue, Profit, Margin, ROMI/ROI, Conversion rate, Break-even point',
              'Customer Acquisition Cost (CAC)',
              'Customer Lifetime Value (CLV/LTV)',
              'Cost of a lead & Conversion rate',
              'Customer attrition / churn rate',
              'Cost / Volume / Profit (CVP) analysis',
              'Cost benefit analysis',
              'Marketing contribution analysis'
            ]
          },
          {
            id: '1.2',
            description: 'Explain marketing performance using metrics to uncover insights',
            indicativeContent: [
              'Product portfolio analysis (sales, product performance)',
              'Year-on-year (YoY) trends',
              'Share of Voice (SOV) vs Market Share (SOM)',
              'Social analytics & Web analytics',
              'Competitor analysis & benchmarking',
              'Customer conversion, retention & acquisition funnels'
            ]
          },
          {
            id: '1.3',
            description: 'Interpret data to uncover customer behaviour across segments',
            indicativeContent: [
              'Customer perception & qualitative feedback',
              'Digital analytics & behavioral tracking',
              'Correlation in bi-variant marketing data to inform budgets & plans',
              'Predicting market trends, NPD intelligence, and CLV growth',
              'Testing methodologies: A/B testing, Multi-variant testing, Marketing attribution'
            ]
          }
        ]
      },
      {
        id: 'LO2',
        title: 'Understand how to manage marketing resources to meet marketing objectives',
        criteria: [
          {
            id: '2.1',
            description: 'Analyse data and relevant insights to support efficient use of resources',
            indicativeContent: [
              '5 Ms framework: Men, Money, Materials, Minutes, Measurements',
              'MarTech stack optimization & data flow',
              'Meaningful patterns and trends in commercial data',
              'Data-led insight across acquisition, retention, and engagement',
              'Leveraging data for growth: LTV, CAC, NPS, ROI'
            ]
          },
          {
            id: '2.2',
            description: 'Assess the management of resources required to deliver marketing objectives',
            indicativeContent: [
              'Financial feasibility of potential marketing plans',
              'Resource audit – effectiveness vs efficiency',
              'Setting measurable commercial objectives',
              'Prioritising activities & continuous improvement allocation',
              'Team training, communication, and cross-functional collaboration'
            ]
          }
        ]
      },
      {
        id: 'LO3',
        title: 'Understand how forecasting and financial techniques support the marketing budget',
        criteria: [
          {
            id: '3.1',
            description: 'Explain budgets based on financial metrics',
            indicativeContent: [
              'Aligning financial metrics to marketing objectives',
              'Tracking expenditures against budgets to maximize profit & ROMI',
              'Budgeting methods: Zero-based, Activity-based, Flexible, Priority-based, Incremental, Bottom-up / Top-down'
            ]
          },
          {
            id: '3.2',
            description: 'Recommend forecasting techniques to inform and manage future budget',
            indicativeContent: [
              'Predictive modelling: Time series analysis, Exponential smoothing, Moving averages',
              'Regression analytics & correlation modelling',
              'Descriptive, predictive, and prescriptive methodologies',
              'Budget management through variance analysis (favorable vs adverse)',
              'Reviewing requirements for structural change'
            ]
          },
          {
            id: '3.3',
            description: 'Prioritise marketing expenditure to deliver marketing objectives',
            indicativeContent: [
              'Building robust business cases: Strategy alignment, Risks & benefits, Stakeholder analysis, Financial & ROMI analysis, CSFs, Gantt milestones & accountability',
              'Sales & marketing data across customer journey stages (acquisition to won)',
              'Multi-channel marketing attribution techniques (First-touch, Last-touch, Linear, Time-decay, Data-driven)',
              'Prioritising expenditure to optimize overall ROMI'
            ]
          }
        ]
      }
    ]
  },
  'strategy-planning': {
    id: 'strategy-planning',
    title: 'CIM Level 6 Award in Strategy and Planning',
    code: 'SP-L6-2024',
    credits: 20,
    tqt: 200,
    glh: 160,
    assessmentType: 'Onscreen Plan Submission + Onscreen Short & Extended Answer Test',
    durationMinutes: 120,
    passingScore: {
      pass: 60,
      merit: 70,
      distinction: 80
    },
    description: 'Equips candidates with advanced skills in strategic audits, option appraisal (SFA), planning frameworks (SOSTAC/APIC/PRACE), 7Ps marketing mix formulation, resource allocation, and continuous improvement (PDCA).',
    learningOutcomes: [
      {
        id: 'LO1',
        title: "Understand the organisation's priorities, purpose, direction and their impact on marketing strategy",
        criteria: [
          {
            id: '1.1',
            description: "Explain the organisation's mission, vision and purpose",
            indicativeContent: ['Mission/vision/purpose statements', 'Organisational objectives & hierarchy']
          },
          {
            id: '1.2',
            description: "Analyse the factors that drive strategic direction",
            indicativeContent: ['Commercial imperatives', 'Macro/micro environmental factors', 'Societal & ethical factors', 'Resource availability']
          },
          {
            id: '1.3',
            description: "Explain how operational and supporting objectives deliver strategy",
            indicativeContent: ['Objective cascade', 'Supporting plans: Brand, Digital, Marcomms, CX, Sustainability, International entry']
          }
        ]
      },
      {
        id: 'LO2',
        title: 'Understand how insights drawn from marketing audits inform the marketing plan',
        criteria: [
          {
            id: '2.1',
            description: 'Prepare an audit of the marketing environment',
            indicativeContent: ['Micro and macro environment analysis', 'Internal capabilities', 'Stakeholder value chain & customer shifts']
          },
          {
            id: '2.2',
            description: 'Apply analytical models and frameworks to generate insights',
            indicativeContent: ['PESTEL', "Porter's 5 Forces", 'Marketing Mix (7Ps)', 'Ansoff Matrix', 'BCG Matrix', 'Mendelow Power/Interest Matrix', 'Customer Journey Mapping', 'Digital audit']
          },
          {
            id: '2.3',
            description: 'Summarise findings of marketing audit to inform plan',
            indicativeContent: ['SWOT analysis synthesis', 'TOWS strategic matrix']
          }
        ]
      },
      {
        id: 'LO3',
        title: "Develop a strategic marketing plan to deliver an organisation's objectives",
        criteria: [
          {
            id: '3.1',
            description: 'Evaluate strategic marketing options',
            indicativeContent: ['Ansoff growth strategies', "Porter's Generic Strategies", 'Digital & Brand strategy', 'Relationship vs Transactional marketing']
          },
          {
            id: '3.2',
            description: 'Justify selected strategic option',
            indicativeContent: ['Suitability, Feasibility, Acceptability (SFA)', 'STP (Segmentation, Targeting, Positioning)', 'Strategic risk & ROI']
          },
          {
            id: '3.3',
            description: 'Develop justifiable SMART marketing objectives',
            indicativeContent: ['Cascade of objectives', 'SMART criteria alignment']
          },
          {
            id: '3.4',
            description: 'Prepare marketing plan using 7Ps marketing mix',
            indicativeContent: ['Product portfolio', 'Pricing strategy', 'Promotion & communications', 'Place / distribution', 'People, Process, Physical evidence']
          }
        ]
      },
      {
        id: 'LO4',
        title: 'Understand how to align supporting plans in delivering marketing objectives',
        criteria: [
          {
            id: '4.1',
            description: 'Assess tactical activities relevant to marketing objectives',
            indicativeContent: ['SME vs Multinational contexts', 'Resource & skill constraints', 'Brand, Digital, CX, Sustainability plans']
          },
          {
            id: '4.2',
            description: 'Justify options for adapting planning frameworks',
            indicativeContent: ['SOSTAC', 'APIC', 'PRACE', 'Adaptations across functional channels']
          },
          {
            id: '4.3',
            description: 'Demonstrate alignment of supporting plans to overarching objectives',
            indicativeContent: ['Synergy and strategic consistency across functional plans', 'Continuous improvement feedback loops']
          }
        ]
      },
      {
        id: 'LO5',
        title: 'Develop an implementation plan to achieve objectives',
        criteria: [
          {
            id: '5.1',
            description: 'Analyse resources needed to implement marketing plan',
            indicativeContent: ['Human resources (in-house vs outsourced)', 'Skills', 'Financial resource & MarTech stack', 'Data compliance']
          },
          {
            id: '5.2',
            description: 'Assess options for resource improvements',
            indicativeContent: ['Gap analysis', 'Resource audit', 'Options for filling gaps']
          },
          {
            id: '5.3',
            description: 'Justify structure of persuasive business case',
            indicativeContent: ['Risks and benefits', 'Stakeholder engagement', 'Financial analysis (ROMI)', 'Critical success factors (CSFs)', 'Accountability']
          },
          {
            id: '5.4',
            description: 'Develop timed action plan',
            indicativeContent: ['Timeframes', 'Milestones', 'Gantt charts with dependencies']
          }
        ]
      },
      {
        id: 'LO6',
        title: 'Critically evaluate measurement results to recommend continuous improvements',
        criteria: [
          {
            id: '6.1',
            description: 'Recommend control mechanisms to monitor progress',
            indicativeContent: ['Financial ratios', 'Marketing dashboards', 'Strategic drift detection', 'Sentiment & web analytics', 'Post-implementation reviews']
          },
          {
            id: '6.2',
            description: 'Explain steps involved in continuous improvement',
            indicativeContent: ['Plan, Do, Check, Act (PDCA)', 'Measure progress', 'Evaluate outcomes', 'Refine and replan']
          }
        ]
      }
    ]
  }
};

export const CIM_COMMAND_VERBS: CommandVerbDefinition[] = [
  {
    verb: 'Analyse',
    definition: 'Examine a topic together with thoughts and judgements about it.',
    level6Expectation: 'Analyse new/abstract data and schools of thought and consider alternative solutions independently, using models and definitions. Compare alternative models using appropriate criteria.',
    exampleExamPrompt: 'Analyse the bi-variant marketing data to identify why the customer acquisition cost increased by 28% while conversion rates remained flat.'
  },
  {
    verb: 'Appraise',
    definition: 'Evaluate, judge or assess.',
    level6Expectation: 'Provide a comprehensive and detailed critique of the subject area demonstrating in-depth understanding and awareness.',
    exampleExamPrompt: 'Appraise the effectiveness of the current MarTech stack in delivering automated lead scoring.'
  },
  {
    verb: 'Assess',
    definition: 'Evaluate or judge the importance of something, referring to appropriate schools of thought.',
    level6Expectation: 'Synthesise and assess new and/or abstract information and data in the context of a broad range of problems using a range of techniques.',
    exampleExamPrompt: 'Assess the resource management implications of shifting 40% of the marketing budget from offline channels to paid search.'
  },
  {
    verb: 'Critically Evaluate',
    definition: 'Assess or judge the value, quality, or significance of something in a thorough, analytical, and discerning manner.',
    level6Expectation: 'Take into account multiple perspectives, evidence, and implications. Examine strengths and weaknesses, consider alternative viewpoints, and question assumptions to reach a well-founded conclusion.',
    exampleExamPrompt: 'Critically evaluate the decision to adopt Zero-Based Budgeting over Activity-Based Budgeting for a rapidly scaling SaaS enterprise.'
  },
  {
    verb: 'Determine',
    definition: 'Use research or calculation to check or establish something.',
    level6Expectation: 'Execute defined investigation to identify evidence supporting a course of action. Make judgements where data is limited.',
    exampleExamPrompt: 'Determine the break-even revenue requirement and forecasted ROMI for the Q3 customer retention campaign given the provided cost schedule.'
  },
  {
    verb: 'Justify',
    definition: 'Support recommendations, explanations or arguments with valid reasons for and against.',
    level6Expectation: 'Communicate well-structured and coherent arguments relevant to marketing objectives and financial feasibility.',
    exampleExamPrompt: 'Justify the selection of a Time-Decay attribution model over a First-Touch model for a high-involvement B2B sales cycle.'
  },
  {
    verb: 'Recommend',
    definition: 'Put forward proposals supported by a clear rationale.',
    level6Expectation: 'Produce reliable and valid conclusions and proposals based on abstract data and situation, appropriately contextualised to a marketing context.',
    exampleExamPrompt: 'Recommend forecasting techniques to manage future quarterly budget allocations based on historical seasonal variance.'
  }
];
