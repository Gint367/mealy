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

export function formatDate(date: Date) {
    return date.toISOString().split('T')[0];
}