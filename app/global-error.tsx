"use client";

import { useEffect } from "react";

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error("Root layout error:", error);
    }, [error]);

    return (
        <html>
            <body style={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#0a0f1a",
                color: "#fff",
                fontFamily: "monospace",
                padding: "2rem",
                margin: 0,
            }}>
                <div style={{ maxWidth: "600px", textAlign: "center" }}>
                    <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem", color: "#16a085" }}>
                        Something went wrong
                    </h2>
                    <pre style={{
                        background: "#111827",
                        padding: "1rem",
                        borderRadius: "0.75rem",
                        fontSize: "0.8rem",
                        textAlign: "left",
                        overflowX: "auto",
                        whiteSpace: "pre-wrap",
                        wordBreak: "break-word",
                        color: "#f87171",
                        marginBottom: "1rem",
                    }}>
                        {error.message}
                        {error.digest && `\nDigest: ${error.digest}`}
                    </pre>
                    <button
                        onClick={reset}
                        style={{
                            padding: "0.75rem 2rem",
                            backgroundColor: "#16a085",
                            color: "#fff",
                            border: "none",
                            borderRadius: "0.75rem",
                            cursor: "pointer",
                            fontWeight: "bold",
                        }}
                    >
                        Try Again
                    </button>
                </div>
            </body>
        </html>
    );
}
