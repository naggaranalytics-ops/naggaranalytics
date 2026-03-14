"use client";

import { useEffect } from "react";
import { client } from "@/lib/appwrite";

export default function AppwriteInitializer() {
    useEffect(() => {
        // Ping Appwrite backend server to verify setup
        client
            .ping()
            .then(() => {
                console.log("✓ Appwrite connection successful");
            })
            .catch((error) => {
                console.error("✗ Appwrite connection failed:", error);
            });
    }, []);

    return null;
}
