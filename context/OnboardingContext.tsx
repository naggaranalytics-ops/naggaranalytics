"use client";

import React, { createContext, useContext, useState } from "react";

export type DegreeType = "Masters" | "PhD" | "Other" | "";

export interface NDADetails {
    agreed: boolean;
    signatureName: string;
    signedAt: string | null;
}

export interface PriceRange {
    min: number;
    max: number;
}

export interface OnboardingState {
    step: number;
    academicDetails: {
        degree: DegreeType;
        thesisTitle: string;
    };
    nda: NDADetails;
    files: File[];
    googleDriveLink: string;
    tasks: {
        cleaning: boolean;
        descriptive: boolean;
        inferential: boolean;
        metaAnalysis: boolean;
        writing: boolean;
    };
}

// Price ranges per service (shown to customer as estimates)
export const SERVICE_PRICES: Record<string, { min: number; max: number }> = {
    cleaning:     { min: 50,  max: 200 },
    descriptive:  { min: 50,  max: 100 },
    inferential:  { min: 100, max: 300 },
    metaAnalysis: { min: 100, max: 300 },
    writing:      { min: 50,  max: 150 },
};

interface OnboardingContextType extends OnboardingState {
    setStep: (step: number) => void;
    nextStep: () => void;
    prevStep: () => void;
    updateAcademicDetails: (details: Partial<OnboardingState["academicDetails"]>) => void;
    updateNDA: (nda: Partial<NDADetails>) => void;
    setFiles: (files: File[]) => void;
    setGoogleDriveLink: (link: string) => void;
    updateTasks: (tasks: Partial<OnboardingState["tasks"]>) => void;
    calculateRange: () => PriceRange;
}

const initialState: OnboardingState = {
    step: 1,
    academicDetails: {
        degree: "",
        thesisTitle: "",
    },
    nda: {
        agreed: false,
        signatureName: "",
        signedAt: null,
    },
    files: [],
    googleDriveLink: "",
    tasks: {
        cleaning: false,
        descriptive: false,
        inferential: false,
        metaAnalysis: false,
        writing: false,
    },
};

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

export const OnboardingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [state, setState] = useState<OnboardingState>(initialState);

    const setStep = (step: number) => setState((prev) => ({ ...prev, step }));
    const nextStep = () => setState((prev) => ({ ...prev, step: Math.min(prev.step + 1, 5) }));
    const prevStep = () => setState((prev) => ({ ...prev, step: Math.max(prev.step - 1, 1) }));

    const updateAcademicDetails = (details: Partial<OnboardingState["academicDetails"]>) =>
        setState((prev) => ({
            ...prev,
            academicDetails: { ...prev.academicDetails, ...details },
        }));

    const updateNDA = (nda: Partial<NDADetails>) =>
        setState((prev) => ({
            ...prev,
            nda: { ...prev.nda, ...nda },
        }));

    const setFiles = (files: File[]) => setState((prev) => ({ ...prev, files }));

    const setGoogleDriveLink = (link: string) => setState((prev) => ({ ...prev, googleDriveLink: link }));

    const updateTasks = (tasks: Partial<OnboardingState["tasks"]>) =>
        setState((prev) => ({
            ...prev,
            tasks: { ...prev.tasks, ...tasks },
        }));

    const calculateRange = (): PriceRange => {
        let min = 0;
        let max = 0;
        for (const [key, selected] of Object.entries(state.tasks)) {
            if (selected && SERVICE_PRICES[key]) {
                min += SERVICE_PRICES[key].min;
                max += SERVICE_PRICES[key].max;
            }
        }
        return { min, max };
    };

    return (
        <OnboardingContext.Provider
            value={{
                ...state,
                setStep,
                nextStep,
                prevStep,
                updateAcademicDetails,
                updateNDA,
                setFiles,
                setGoogleDriveLink,
                updateTasks,
                calculateRange,
            }}
        >
            {children}
        </OnboardingContext.Provider>
    );
};

export const useOnboarding = () => {
    const context = useContext(OnboardingContext);
    if (context === undefined) {
        throw new Error("useOnboarding must be used within an OnboardingProvider");
    }
    return context;
};
