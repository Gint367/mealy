export function getWeekDates(weekOffset: number = 0) {
    const today = new Date();
    const dayOfWeek = today.getDay(); // 0 (Sun) - 6 (Sat)

    // Calculate the difference to get to Monday
    const distanceToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
    const monday = new Date(today);
    monday.setDate(today.getDate() + distanceToMonday + (weekOffset * 7));

    const week = [];
    for (let i = 0; i < 7; i++) {
        const date = new Date(monday);
        date.setDate(monday.getDate() + i);
        week.push(date);
    }

    return week;
}

export function formatDate(date: Date): string {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
}