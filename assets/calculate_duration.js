// Calculate duration between two dates automatically
// Usage: Add data-start-date and data-end-date attributes to elements with [duration] placeholder

function calculateDuration(startDate, endDate = null) {
    const start = new Date(startDate);
    const end = endDate === 'present' || !endDate ? new Date() : new Date(endDate);
    
    let years = 0;
    let months = 0;
    let days = 0;
    
    // Check if end date is last day of month
    const lastDayOfMonth = new Date(end.getFullYear(), end.getMonth() + 1, 0).getDate();
    const isEndOfMonth = end.getDate() === lastDayOfMonth;
    
    // Calculate years
    years = end.getFullYear() - start.getFullYear();
    
    // Calculate months
    let monthDiff = end.getMonth() - start.getMonth();
    if (monthDiff < 0) {
        years--;
        monthDiff += 12;
    }
    months = monthDiff;
    
    // Calculate days
    let dayDiff = end.getDate() - start.getDate();
    if (dayDiff < 0) {
        months--;
        if (months < 0) {
            years--;
            months += 12;
        }
        // Get days in previous month
        const prevMonth = new Date(end.getFullYear(), end.getMonth(), 0);
        dayDiff += prevMonth.getDate();
    }
    
    // If end date is last day of month and there are remaining days, count as full month
    if (isEndOfMonth && dayDiff > 0) {
        months++;
        days = 0;
    } else {
        days = dayDiff;
    }
    
    // Format output
    let result = [];
    if (years > 0) result.push(`${years} yr${years > 1 ? 's' : ''}`);
    if (months > 0) result.push(`${months} mo${months > 1 ? 's' : ''}`);
    if (days > 0 && years === 0 && months === 0) result.push(`${days} day${days > 1 ? 's' : ''}`);
    
    return result.join(' ') || '0 days';
}

// Initialize: Apply duration ke semua elemen dengan data-start-date
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('[data-start-date]').forEach(el => {
        const startDate = el.getAttribute('data-start-date');
        const endDate = el.getAttribute('data-end-date') || 'present';
        const duration = calculateDuration(startDate, endDate);
        el.setAttribute('data-duration', duration);
        el.textContent = el.textContent.replace(/\[duration\]/, duration);
    });
});