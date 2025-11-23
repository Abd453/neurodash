export type ModelType = 'Closed API' | 'Open-weight' | 'Mixed';

export interface ModelData {
  id: number;
  name: string;
  company: string;
  color: string; // For charts
  mmlu: number;
  humanEval: number;
  context: string; // Display string (e.g., "128k")
  contextVal: number; // Numeric for sorting/charts (e.g., 128000)
  type: ModelType;
  audited: boolean;
  description: string;
  tags: string[];

  // Detailed Metrics for Tabs
  safety: {
    refusalRate: number;
    jailbreakRes: number;
  };
  governance: {
    auditStatus: string;
    frequency: string;
  };
  performance: {
    mmlu: number;
    humaneval: number;
    context: number;
    governance: number; // For Radar chart
    safety: number; // For Radar chart
    performance: number; // For Radar chart
  };
}

export const mockModels: ModelData[] = [
  {
    id: 1,
    name: 'GPT-4o',
    company: 'OpenAI',
    color: '#06B6D4', // Cyan
    mmlu: 88.7,
    humanEval: 90.2,
    context: '128k',
    contextVal: 128000,
    type: 'Closed API',
    audited: true,
    description:
      "GPT-4o is OpenAI's latest flagship multimodal model with enhanced reasoning capabilities. It achieves state-of-the-art performance across audio, vision, and text benchmarks.",
    tags: [
      'Closed API',
      'System Card (PDF)',
      'Third-Party Audited',
      'Cutoff: Oct 2024',
    ],
    safety: { refusalRate: 98.1, jailbreakRes: 2.3 },
    governance: { auditStatus: 'Completed', frequency: 'Monthly' },
    performance: {
      mmlu: 88.7,
      humaneval: 90.2,
      context: 128000,
      governance: 85,
      safety: 95,
      performance: 98,
    },
  },
  {
    id: 2,
    name: 'Claude 3.5 Sonnet',
    company: 'Anthropic',
    color: '#F97316', // Orange
    mmlu: 88.3,
    humanEval: 92.0,
    context: '200k',
    contextVal: 200000,
    type: 'Closed API',
    audited: true,
    description:
      "Claude 3.5 Sonnet represents Anthropic's most capable model, excelling at complex reasoning, coding, and nuanced conversation. Built with Constitutional AI.",
    tags: ['Closed API', 'Audited', 'Constitutional AI'],
    safety: { refusalRate: 99.0, jailbreakRes: 1.5 },
    governance: { auditStatus: 'In Progress', frequency: 'Weekly' },
    performance: {
      mmlu: 88.3,
      humaneval: 92.0,
      context: 200000,
      governance: 92,
      safety: 98,
      performance: 96,
    },
  },
  {
    id: 3,
    name: 'Gemini 1.5 Pro',
    company: 'Google',
    color: '#8B5CF6', // Purple
    mmlu: 85.9,
    humanEval: 84.1,
    context: '1M',
    contextVal: 1000000,
    type: 'Closed API',
    audited: false,
    description:
      "Google's mid-size multimodal model with a massive context window, optimized for scaling across a wide variety of tasks.",
    tags: ['Closed API', 'Multimodal', 'Long Context'],
    safety: { refusalRate: 94.5, jailbreakRes: 3.1 },
    governance: { auditStatus: 'Internal', frequency: 'Quarterly' },
    performance: {
      mmlu: 85.9,
      humaneval: 84.1,
      context: 1000000,
      governance: 80,
      safety: 88,
      performance: 89,
    },
  },
  {
    id: 4,
    name: 'Llama 3.1 (405B)',
    company: 'Meta',
    color: '#10B981', // Green
    mmlu: 87.3,
    humanEval: 85.0,
    context: '128k',
    contextVal: 128000,
    type: 'Open-weight',
    audited: true,
    description:
      'The largest open-weights model to date, bringing frontier-level intelligence to the open community. Optimized for distillation and synthetic data generation.',
    tags: ['Open-weight', 'Audited', 'Distillation Ready'],
    safety: { refusalRate: 92.0, jailbreakRes: 4.5 },
    governance: { auditStatus: 'Completed', frequency: 'Per Release' },
    performance: {
      mmlu: 87.3,
      humaneval: 85.0,
      context: 128000,
      governance: 70,
      safety: 80,
      performance: 92,
    },
  },
  {
    id: 5,
    name: 'Mistral Large 2',
    company: 'Mistral',
    color: '#EAB308', // Yellow
    mmlu: 84.0,
    humanEval: 82.0,
    context: '32k',
    contextVal: 32000,
    type: 'Open-weight',
    audited: false,
    description:
      'A code-centric model from Mistral AI, designed for efficiency and high reasoning capabilities in a smaller parameter footprint.',
    tags: ['Open-weight', 'Code Specialized'],
    safety: { refusalRate: 89.0, jailbreakRes: 5.2 },
    governance: { auditStatus: 'None', frequency: 'Unknown' },
    performance: {
      mmlu: 84.0,
      humaneval: 82.0,
      context: 32000,
      governance: 60,
      safety: 75,
      performance: 88,
    },
  },
  {
    id: 6,
    name: 'Grok-1.5',
    company: 'xAI',
    color: '#EC4899', // Pink
    mmlu: 81.3,
    humanEval: 78.0,
    context: '128k',
    contextVal: 128000,
    type: 'Open-weight',
    audited: false,
    description:
      "xAI's latest model with improved reasoning and mathematics capabilities, integrated with real-time knowledge access.",
    tags: ['Open-weight', 'Real-time'],
    safety: { refusalRate: 85.0, jailbreakRes: 6.0 },
    governance: { auditStatus: 'None', frequency: 'Unknown' },
    performance: {
      mmlu: 81.3,
      humaneval: 78.0,
      context: 128000,
      governance: 50,
      safety: 65,
      performance: 82,
    },
  },
];
