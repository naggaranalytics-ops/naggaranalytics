import React, { createContext, useContext, useState } from 'react';
import { TASK_PRICES } from '../types/database';

export type DegreeType = 'Masters' | 'PhD' | 'Other' | '';

export interface OnboardingState {
  step: number;
  academicDetails: {
    degree: DegreeType;
    thesisTitle: string;
  };
  files: Array<{
    uri: string;
    name: string;
    size?: number;
    mimeType?: string;
  }>;
  tasks: {
    cleaning: boolean;
    descriptive: boolean;
    inferential: boolean;
    writing: boolean;
  };
  receipt: {
    uri: string;
    name: string;
    mimeType?: string;
  } | null;
  paymentPhase: 'Deposit 70%' | 'Final 30%' | 'Paid in Full';
}

interface OnboardingContextType extends OnboardingState {
  setStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  updateAcademicDetails: (details: Partial<OnboardingState['academicDetails']>) => void;
  setFiles: (files: OnboardingState['files']) => void;
  updateTasks: (tasks: Partial<OnboardingState['tasks']>) => void;
  setReceipt: (receipt: OnboardingState['receipt']) => void;
  setPaymentPhase: (phase: OnboardingState['paymentPhase']) => void;
  calculateTotal: () => number;
  reset: () => void;
}

const initialState: OnboardingState = {
  step: 1,
  academicDetails: {
    degree: '',
    thesisTitle: '',
  },
  files: [],
  tasks: {
    cleaning: false,
    descriptive: false,
    inferential: false,
    writing: false,
  },
  receipt: null,
  paymentPhase: 'Deposit 70%',
};

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

export const OnboardingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<OnboardingState>(initialState);

  const setStep = (step: number) => setState((prev) => ({ ...prev, step }));
  const nextStep = () => setState((prev) => ({ ...prev, step: Math.min(prev.step + 1, 4) }));
  const prevStep = () => setState((prev) => ({ ...prev, step: Math.max(prev.step - 1, 1) }));

  const updateAcademicDetails = (details: Partial<OnboardingState['academicDetails']>) =>
    setState((prev) => ({
      ...prev,
      academicDetails: { ...prev.academicDetails, ...details },
    }));

  const setFiles = (files: OnboardingState['files']) =>
    setState((prev) => ({ ...prev, files }));

  const updateTasks = (tasks: Partial<OnboardingState['tasks']>) =>
    setState((prev) => ({
      ...prev,
      tasks: { ...prev.tasks, ...tasks },
    }));

  const setReceipt = (receipt: OnboardingState['receipt']) =>
    setState((prev) => ({ ...prev, receipt }));

  const setPaymentPhase = (phase: OnboardingState['paymentPhase']) =>
    setState((prev) => ({ ...prev, paymentPhase: phase }));

  const calculateTotal = () => {
    let total = 0;
    if (state.tasks.cleaning) total += TASK_PRICES.cleaning;
    if (state.tasks.descriptive) total += TASK_PRICES.descriptive;
    if (state.tasks.inferential) total += TASK_PRICES.inferential;
    if (state.tasks.writing) total += TASK_PRICES.writing;
    return total;
  };

  const reset = () => setState(initialState);

  return (
    <OnboardingContext.Provider
      value={{
        ...state,
        setStep,
        nextStep,
        prevStep,
        updateAcademicDetails,
        setFiles,
        updateTasks,
        setReceipt,
        setPaymentPhase,
        calculateTotal,
        reset,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
};

export const useOnboarding = () => {
  const context = useContext(OnboardingContext);
  if (!context) throw new Error('useOnboarding must be used within OnboardingProvider');
  return context;
};
