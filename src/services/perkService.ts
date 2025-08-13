import type {PerkCreationInterface} from "../models/perk-models/perkCreationInterface.ts";

const API_URL = import.meta.env.VITE_API_URL;

export const createPerk = async (newPerkData: PerkCreationInterface, startupId: number) => {
    try {
        const response = await fetch(
            `${API_URL}/startups/${startupId}/perks`,
            {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newPerkData),
                credentials: 'include'
            }
        )

        if (!response.ok) {

            const errorData = await response.json().catch(() => ({message: 'Failed to create startup.'}));
            throw new Error(errorData.message);
        }
        return await response.json();
    } catch (error) {
        console.error("API Error - createNewPerk:", error);
        throw error;
    }
}