import type UserEditInterface from "../models/user-models/userEditInterface.ts";

const API_URL = import.meta.env.VITE_API_URL;

export async function uploadProfilePicture(formData: FormData): Promise<void> {
    try {
        const response = await fetch(
            `${API_URL}/users/me/photo`,
            {
                method: 'POST',
                body: formData,
                credentials: 'include',

            }
        )

        console.log(response)
        if (!response.ok) {

            const errorData = await response.json().catch(() => ({message: 'Failed to upload image.'}));
            throw new Error(errorData.message);
        }
        return;
    } catch (error) {
        console.error("API Error - uploadProfilePicture:", error);
        throw error;
    }
}



export const editProfileInfo = async (newUserData: UserEditInterface) => {


}