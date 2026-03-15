"use client";

import React, { createContext, useContext, useState } from "react";

export type DegreeType = "Masters" | "PhD" | "Other" | "";

export interface NDADetails {
    agreed: boolean;
    signatureName: string;
    signedAt: string | null;
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
        writing: boolean;
    };
    paymentPhase: "Deposit 70%" | "Final 30%" | "Paid in Full";
}

interface OnboardingContextType extends OnboardingState {
    setStep: (step: number) => void;
    nextStep: () => void;
    prevStep: () => void;
    updateAcademicDetails: (details: Partial<OnboardingState["academicDetails"]>) => void;
    updateNDA: (nda: Partial<NDADetails>) => void;
    setFiles: (files: File[]) => void;
    setGoogleDriveLink: (link: string) => void;
    updateTasks: (tasks: Partial<OnboardingState["tasks"]>) => void;
    calculateTotal: () => number;
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
        writing: false,
    },
    paymentPhase: "Deposit 70%",
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

    const calculateTotal = () => {
        let total = 0;
        if (state.tasks.cleaning) total += 200;
        if (state.tasks.descriptive) total += 100;
        if (state.tasks.inferential) total += 200;
        if (state.tasks.writing) total += 100;
        return total;
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
                calculateTotal,
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
