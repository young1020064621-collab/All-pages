import React, { createContext, useContext, useState, ReactNode } from 'react';

interface BuyerQuestion {
  question: string;
  category: string;
  answers: string[];
  createdAt: string;
  updatedAt: string;
  frequency: number;
}

interface BuyerObjection {
  objection: string;
  category: string;
  answers: string[];
  createdAt: string;
  updatedAt: string;
  frequency: number;
}

interface SellerResource {
  title: string;
  category: string;
  type: string;
  createdAt: string;
  updatedAt: string;
  frequency: number;
}

interface KnowledgeBaseContextType {
  buyerQuestions: BuyerQuestion[];
  buyerObjections: BuyerObjection[];
  sellerResources: SellerResource[];
  addBuyerQuestion: (question: BuyerQuestion) => void;
  addBuyerObjection: (objection: BuyerObjection) => void;
  addSellerResource: (resource: SellerResource) => void;
}

const KnowledgeBaseContext = createContext<KnowledgeBaseContextType | undefined>(undefined);

const initialQuestions: BuyerQuestion[] = [
  {
    question: "What features does your product include?",
    category: "Functionalities",
    answers: [
      "Our product includes comprehensive reporting, real-time analytics, and automated workflows.",
      "Key features include customizable dashboards, API integrations, and mobile accessibility.",
      "We offer advanced security features, role-based access control, and 24/7 monitoring."
    ],
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-01-20T15:45:00Z",
    frequency: 12
  },
  {
    question: "What is the total cost of ownership?",
    category: "Economics",
    answers: [
      "The TCO includes licensing, implementation, training, and ongoing support costs.",
      "We provide transparent pricing with no hidden fees and flexible payment options.",
      "ROI typically achieved within 6-12 months based on efficiency improvements."
    ],
    createdAt: "2024-01-16T14:20:00Z",
    updatedAt: "2024-01-22T09:30:00Z",
    frequency: 8
  },
  {
    question: "How secure is your platform?",
    category: "Risks",
    answers: [
      "We implement enterprise-grade security with SOC 2 Type II compliance and ISO 27001 certification.",
      "All data is encrypted in transit and at rest using AES-256 encryption standards.",
      "Regular security audits and penetration testing ensure continuous protection."
    ],
    createdAt: "2024-01-18T09:15:00Z",
    updatedAt: "2024-01-25T11:20:00Z",
    frequency: 18
  },
  {
    question: "What kind of support do you provide?",
    category: "Authority",
    answers: [
      "24/7 technical support with guaranteed response times based on your service level.",
      "Dedicated customer success manager for enterprise accounts.",
      "Comprehensive training programs and extensive documentation library."
    ],
    createdAt: "2024-01-19T13:45:00Z",
    updatedAt: "2024-01-26T16:30:00Z",
    frequency: 14
  },
  {
    question: "Can your solution integrate with our existing systems?",
    category: "Functionalities",
    answers: [
      "Yes, we offer 200+ pre-built integrations with popular business applications.",
      "Our REST API allows custom integrations with any system that supports web services.",
      "We provide integration consulting services to ensure seamless connectivity."
    ],
    createdAt: "2024-01-20T08:30:00Z",
    updatedAt: "2024-01-27T14:15:00Z",
    frequency: 22
  },
  {
    question: "What happens if we need to scale up or down?",
    category: "Scarcity",
    answers: [
      "Our cloud-based architecture automatically scales to meet your changing needs.",
      "Flexible licensing allows you to add or remove users without long-term commitments.",
      "Pay-as-you-grow pricing ensures you only pay for what you actually use."
    ],
    createdAt: "2024-01-21T11:00:00Z",
    updatedAt: "2024-01-28T10:45:00Z",
    frequency: 9
  }
];

const initialObjections: BuyerObjection[] = [
  {
    objection: "Your solution is too expensive",
    category: "Money",
    answers: [
      "Let's discuss the value proposition and ROI calculations to show long-term benefits.",
      "We offer flexible pricing models and can customize a package to fit your budget.",
      "Consider the cost of not implementing - inefficiencies cost more over time."
    ],
    createdAt: "2024-01-17T09:15:00Z",
    updatedAt: "2024-01-21T11:20:00Z",
    frequency: 15
  },
  {
    objection: "We don't have time for implementation",
    category: "Timeframe",
    answers: [
      "Our rapid deployment methodology can have you up and running in 2-4 weeks.",
      "We provide dedicated implementation specialists to minimize your team's time investment.",
      "Phased rollout options allow you to implement gradually without disrupting operations."
    ],
    createdAt: "2024-01-18T16:45:00Z",
    updatedAt: "2024-01-23T14:10:00Z",
    frequency: 6
  },
  {
    objection: "We're happy with our current solution",
    category: "Emotion",
    answers: [
      "That's great to hear! What specific aspects of your current solution work well for you?",
      "Many of our clients felt the same way initially. Let me show you what they discovered.",
      "Even good solutions can be improved. What if I could show you a 30% efficiency gain?"
    ],
    createdAt: "2024-01-19T10:30:00Z",
    updatedAt: "2024-01-24T15:20:00Z",
    frequency: 11
  },
  {
    objection: "We need to think about it",
    category: "Money",
    answers: [
      "I understand this is an important decision. What specific concerns would you like to discuss?",
      "What additional information would help you move forward with confidence?",
      "Let's schedule a follow-up to address any remaining questions you might have."
    ],
    createdAt: "2024-01-20T14:15:00Z",
    updatedAt: "2024-01-25T09:45:00Z",
    frequency: 20
  },
  {
    objection: "Your company is too small for us",
    category: "Trust",
    answers: [
      "I understand your concern. Let me share how we've successfully served enterprise clients like yours.",
      "Our size actually allows us to provide more personalized service and faster response times.",
      "Here are some case studies from Fortune 500 companies we've helped transform their operations."
    ],
    createdAt: "2024-01-21T08:20:00Z",
    updatedAt: "2024-01-26T12:30:00Z",
    frequency: 7
  },
  {
    objection: "We've had bad experiences with similar solutions",
    category: "Emotion",
    answers: [
      "I'm sorry to hear about your past experience. What went wrong, and how can we ensure it doesn't happen again?",
      "We've learned from the industry's mistakes and built our solution to address those exact pain points.",
      "Let me show you our customer success metrics and how we ensure project success from day one."
    ],
    createdAt: "2024-01-22T11:45:00Z",
    updatedAt: "2024-01-27T16:10:00Z",
    frequency: 13
  },
  {
    objection: "We don't have the budget right now",
    category: "Money",
    answers: [
      "I understand budget constraints. When would be a better time to revisit this conversation?",
      "Let's explore financing options or a phased implementation to work within your current budget.",
      "What if I could show you how this investment pays for itself within the first quarter?"
    ],
    createdAt: "2024-01-23T13:00:00Z",
    updatedAt: "2024-01-28T11:25:00Z",
    frequency: 16
  }
];

const initialResources: SellerResource[] = [
  {
    title: "What are your current pain points with your existing solution?",
    category: "Identify NEEDS, Influencers, Issues and Implications",
    type: "needs",
    createdAt: "2024-01-10T08:00:00Z",
    updatedAt: "2024-01-19T10:15:00Z",
    frequency: 9
  },
  {
    title: "What is your budget range for this solution?",
    category: "Money, Metrics",
    type: "Budget",
    createdAt: "2024-01-12T11:30:00Z",
    updatedAt: "2024-01-24T16:45:00Z",
    frequency: 11
  },
  {
    title: "Who has the final decision-making authority?",
    category: "Access to Approvers, Champions, Coach and Decision Makers",
    type: "Decision Makers",
    createdAt: "2024-01-14T15:20:00Z",
    updatedAt: "2024-01-25T13:30:00Z",
    frequency: 7
  },
  {
    title: "What is your timeline for implementing a new solution?",
    category: "Money, Metrics",
    type: "Timeline",
    createdAt: "2024-01-15T09:45:00Z",
    updatedAt: "2024-01-26T14:20:00Z",
    frequency: 15
  },
  {
    title: "How do you currently measure success in this area?",
    category: "Money, Metrics",
    type: "KPIs",
    createdAt: "2024-01-16T12:15:00Z",
    updatedAt: "2024-01-27T11:40:00Z",
    frequency: 12
  },
  {
    title: "What would happen if you don't address this issue?",
    category: "Identify NEEDS, Influencers, Issues and Implications",
    type: "Consequences",
    createdAt: "2024-01-17T14:30:00Z",
    updatedAt: "2024-01-28T09:15:00Z",
    frequency: 18
  },
  {
    title: "Who else would be involved in evaluating this solution?",
    category: "Access to Approvers, Champions, Coach and Decision Makers",
    type: "Stakeholders",
    createdAt: "2024-01-18T10:20:00Z",
    updatedAt: "2024-01-29T15:50:00Z",
    frequency: 8
  },
  {
    title: "What criteria will you use to evaluate different vendors?",
    category: "Competition",
    type: "Evaluation",
    createdAt: "2024-01-19T16:00:00Z",
    updatedAt: "2024-01-30T12:25:00Z",
    frequency: 14
  },
  {
    title: "How important is this project compared to other initiatives?",
    category: "Identify NEEDS, Influencers, Issues and Implications",
    type: "Priority",
    createdAt: "2024-01-20T11:45:00Z",
    updatedAt: "2024-01-31T08:30:00Z",
    frequency: 10
  },
  {
    title: "What has prevented you from solving this problem before?",
    category: "Competition",
    type: "Barriers",
    createdAt: "2024-01-21T13:10:00Z",
    updatedAt: "2024-02-01T16:45:00Z",
    frequency: 13
  },
  {
    title: "How would you define success for this project?",
    category: "Money, Metrics",
    type: "Success Metrics",
    createdAt: "2024-01-22T15:35:00Z",
    updatedAt: "2024-02-02T10:20:00Z",
    frequency: 16
  },
  {
    title: "What internal resources do you have available for implementation?",
    category: "Access to Approvers, Champions, Coach and Decision Makers",
    type: "Resources",
    createdAt: "2024-01-23T09:25:00Z",
    updatedAt: "2024-02-03T14:15:00Z",
    frequency: 6
  }
];

export function KnowledgeBaseProvider({ children }: { children: ReactNode }) {
  const [buyerQuestions, setBuyerQuestions] = useState<BuyerQuestion[]>(initialQuestions);
  const [buyerObjections, setBuyerObjections] = useState<BuyerObjection[]>(initialObjections);
  const [sellerResources, setSellerResources] = useState<SellerResource[]>(initialResources);

  const addBuyerQuestion = (question: BuyerQuestion) => {
    setBuyerQuestions(prev => [question, ...prev]);
  };

  const addBuyerObjection = (objection: BuyerObjection) => {
    setBuyerObjections(prev => [objection, ...prev]);
  };

  const addSellerResource = (resource: SellerResource) => {
    setSellerResources(prev => [resource, ...prev]);
  };

  return (
    <KnowledgeBaseContext.Provider
      value={{
        buyerQuestions,
        buyerObjections,
        sellerResources,
        addBuyerQuestion,
        addBuyerObjection,
        addSellerResource
      }}
    >
      {children}
    </KnowledgeBaseContext.Provider>
  );
}

export function useKnowledgeBase() {
  const context = useContext(KnowledgeBaseContext);
  if (context === undefined) {
    throw new Error('useKnowledgeBase must be used within a KnowledgeBaseProvider');
  }
  return context;
}