export type UserRole = 'user' | 'admin';
export type DegreeType = 'Masters' | 'PhD' | 'Other';
export type ProjectStatus = 'Pending' | 'Payment Verified' | 'Analysis In Progress' | 'Review' | 'Completed';
export type PaymentPhase = 'Deposit 70%' | 'Final 30%' | 'Paid in Full';
export type FileType = 'Raw Data' | 'Supporting Doc' | 'Final Result';

export interface Profile {
  id: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  role: UserRole;
  push_token?: string | null;
  created_at: string;
}

export interface Project {
  id: string;
  user_id: string;
  thesis_title: string;
  degree: DegreeType;
  status: ProjectStatus;
  selected_tasks: {
    cleaning?: boolean;
    descriptive?: boolean;
    inferential?: boolean;
    writing?: boolean;
  };
  total_price: number;
  payment_phase: PaymentPhase;
  receipt_url: string | null;
  is_verified: boolean;
  created_at: string;
  updated_at: string;
  project_files?: ProjectFile[];
  profiles?: Profile;
}

export interface ProjectFile {
  id: string;
  project_id: string;
  file_url: string;
  file_type: FileType;
  uploaded_by: string;
  created_at: string;
}

export interface CareerApplication {
  id: string;
  job_title: string;
  full_name: string;
  email: string;
  whatsapp: string;
  why_join: string;
  created_at: string;
}

export const PROJECT_STATUS_ORDER: ProjectStatus[] = [
  'Pending',
  'Payment Verified',
  'Analysis In Progress',
  'Review',
  'Completed',
];

export const TASK_PRICES = {
  cleaning: 200,
  descriptive: 100,
  inferential: 200,
  writing: 100,
} as const;
