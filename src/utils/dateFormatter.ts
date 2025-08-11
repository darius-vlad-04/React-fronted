export function formatDateToMonthYear(dateString: string | undefined | null): string {
    if (!dateString) {
        return "";
    }


    const date = new Date(dateString);


    if (isNaN(date.getTime())) {
        console.error("Invalid date string provided:", dateString);
        return "Invalid Date";
    }


    const options: Intl.DateTimeFormatOptions = {
        month: 'long',
        year: 'numeric'
    };

    return new Intl.DateTimeFormat('en-US', options).format(date);
}