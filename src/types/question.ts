export type Subject = 'Math AA' | 'Math AI' | 'Physics' | 'Chemistry' | 'Economics';
export type Level = 'HL' | 'SL';
export type Difficulty = 'Easy' | 'Medium' | 'Hard';
export type PaperType = 'Paper 1' | 'Paper 2' | 'Paper 3';

export interface MarkschemeStep {
  code: 'M1' | 'A1' | 'R1' | 'AG' | 'FT' | string; // Method mark, Accuracy mark, Reasoning mark
  description: string;
  marks: number;
}

export interface QuestionPart {
  partLabel: string; // e.g., "(a)", "(b)(i)"
  prompt: string;    // Text with LaTeX $...$ or $$...$$
  marks: number;
  markscheme: {
    steps: MarkschemeStep[];
    totalMarks: number;
    notes?: string;
  };
}

export interface Question {
  id: string;
  code: string; // e.g. "M23/5/MATHX/HP1/ENG/TZ1/XX/Q7" (IB format reference)
  subject: Subject;
  level: Level;
  topic: string;        // e.g. "Topic 5: Calculus"
  subtopic: string;     // e.g. "5.5 Integration by Parts"
  paper: PaperType;
  difficulty: Difficulty;
  year: number;
  session: 'May' | 'Nov';
  calculatorAllowed: boolean;
  isAiRecommended?: boolean;
  recommendationReason?: string;
  variantFrom?: string; // Original past paper reference if it's a modified variant
  totalMarks: number;
  context?: string;     // Overview context if multi-part
  parts: QuestionPart[];
}
