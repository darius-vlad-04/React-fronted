import type {StartupCreationInterface} from "../models/startup-models/startupCreationInterface.ts";

const API_URL = import.meta.env.VITE_API_URL;

export const createStartup = async (newStartupData: StartupCreationInterface) => {
    try {
        const response = await fetch(
            `${API_URL}/startups`,
            {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newStartupData),
                credentials: 'include'
            }
        )
        if (!response.ok) {

            const errorData = await response.json().catch(() => ({message: 'Failed to create startup.'}));
            throw new Error(errorData.message);
        }
        return await response.json();
    } catch (error) {
        console.error("API Error - createNewStartup:", error);
        throw error;
    }
}