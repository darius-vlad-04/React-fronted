const API_URL = import.meta.env.VITE_API_URL;

export const fetcher = async (path: string) => {
    const response = await fetch(`${API_URL}${path}`,
        {
            credentials: 'include'
        })
    ;


    if (!response.ok) {
        const errorDetails = await response.json().catch(() => ({}));
        throw new Error(errorDetails.message || 'An error occurred during the fetch.');
    }


    return response.json();
};