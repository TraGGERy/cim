# CIM Level 6 Master — Commercial Intelligence & Strategy Hub

An exam-accurate, interruptive learning platform engineered specifically around the **Official CIM Level 6 (2024 V1.1) Qualification Specifications** for:
1. **CIM Level 6 Award in Commercial Intelligence** (CI-L6-2024 • 10 Credits)
2. **CIM Level 6 Award in Strategy and Planning** (SP-L6-2024 • 20 Credits)

---

## 🎯 Key Features & Exam Capabilities

### 1. Onscreen Exam Simulator (CI-L6-2024)
- **45 Questions / 90 Minutes**: Realistic timed test modeling the official onscreen Multiple Choice Examination.
- **Official Grading Thresholds**: Pass (60–69%), Merit (70–79%), Distinction (80%+).
- **Navigation & Flagging Matrix**: 45-question jump navigator, question flagging for review, and completion indicators.
- **Integrated Formula Calculator**: Interactive derivation of ROMI, CAC, CLV, Break-even units, and Budget Variance.
- **Comprehensive Diagnostic Report**: Question-by-question review, distractor rationale, and breakdown across **LO1 (Metrics)**, **LO2 (Resource Management)**, and **LO3 (Forecasting & Budgeting)**.

### 2. Strategy and Planning Exam Sandbox (SP-L6-2024)
- **2-Hour Plan Submission & Written Response Test**: Complete simulation of the CIM case study format (NovaPulse HealthTech strategic pivot).
- **CIM Level 6 Command Verbs Engine**: Evaluates responses against *Critically Evaluate, Justify, Develop, Recommend, Analyse*.
- **AI Chief Examiner Grading**: Powered by Google Gemini 2.5 Pro for line-by-line mark scheme evaluation, strength detection, and gap analysis.

### 3. "Interruptive Learning" Pedagogy (Active Recall)
- **Socratic Dilemma Interceptions**: Rapid timed challenges (45-sec clock) that break passive reading to test memory retrieval and scenario reasoning.
- **Immediate Feedback Loop**: Step-by-step math derivations and explanation of why distractor options fail.
- **Streak & Accuracy Analytics**: Tracks active-recall accuracy and knowledge XP.

### 4. Interactive 3D WebGL Learning Lab (`Three.js`)
- **3D Multi-Touch Attribution & Funnel Model**: Real-time particle stream visualizer for First-Touch, Last-Touch, Linear, and Time-Decay attribution models.
- **3D Strategic Portfolio Space**: Interactive 3D BCG Matrix, Ansoff Cube, and Mendelow Stakeholder Matrix.
- **3D 5Ms Resource Allocation Balance Sim**: Interactive 3D physics simulator for Men, Money, Materials, Minutes, and Measurements.

---

## 🚀 Getting Started

### 1. Install Dependencies & Start Local Server
```bash
npm install
npm run dev
```

Visit `http://localhost:3000` to launch the platform.

### 2. Optional: Configure Gemini AI Key
1. Obtain an API key from [Google AI Studio](https://aistudio.google.com/app/apikey).
2. Click the **API Key** button in the top navigation bar and paste your key.
3. Enjoy live AI Chief Examiner grading and adaptive Socratic tutoring.

---

## 📁 Repository Structure

```
cim/
├── src/
│   ├── app/
│   │   ├── layout.tsx                     # Root layout & meta
│   │   ├── page.tsx                       # Main Exam & Learning Hub
│   │   ├── exam/
│   │   │   ├── commercial-intelligence/   # 45-Q 90-Min Onscreen MC Exam
│   │   │   └── strategy-planning/         # 2-Hour Plan & Response Exam
│   │   ├── interrupt-trainer/             # Interruptive Active-Recall Arena
│   │   ├── visual-3d/                     # Interactive 3D WebGL Learning Lab
│   │   └── reference/                     # Formula Sheet & Command Verbs Hub
│   ├── components/
│   │   ├── 3d/                            # Three.js 3D Visualizer Canvas Components
│   │   ├── exam/                          # Timers, Navigators, Calculators & Reports
│   │   └── interrupt/                     # Socratic Dilemma Modals & Feedback Cards
│   ├── lib/
│   │   ├── examData/                      # CIM Question Banks & Case Studies
│   │   ├── formulas.ts                    # Math & Derivations (ROMI, CAC, CLV)
│   │   ├── gemini.ts                      # Gemini 2.5 Pro/Flash Integration
│   │   ├── modulesData.ts                 # 2024 V1.1 Syllabus Definitions
│   │   └── storage.ts                     # LocalStorage Records & Metrics
│   └── types/
│       └── cim.ts                         # Complete TypeScript Specifications
├── reference/                             # Printable HTML Reference Cards
├── MISSION.md                             # Student Certification Mission
├── RESOURCES.md                           # Official Grounding Resources
└── NOTES.md                               # Pedagogical Notes & Preferences
```
