import type {DonationCreateInterface} from "../models/donation-models/donationCreateInterface.ts";

const API_URL = import.meta.env.VITE_API_URL;

export const createDonation = async (newDonationData: DonationCreateInterface) => {

    try {
        const response = await fetch(`${API_URL}/donation`,
            {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newDonationData),
                credentials: 'include'
            })


        if (!response.ok) {

            const errorData = await response.json().catch(() => ({message: 'Failed to create donation.'}));
            throw new Error(errorData.message);
        }
        return await response.json();
    } catch (error) {
        console.error("API Error - createNewDonation:", error);
        throw error;
    }
}