// Format number as Indian Currency (e.g., ₹1,25,000)
export function formatINR(amount) {
  if (amount === undefined || amount === null) return '₹0';
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
}

// Format date into Indian standard format (e.g., 18 Aug 2026)
export function formatDate(dateString) {
  if (!dateString) return 'N/A';
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    return date.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  } catch (e) {
    return dateString;
  }
}

// Calculate CBSE letter grade from total marks percentage
export function getCBSEGrade(percentage) {
  if (percentage >= 91) return { grade: 'A1', points: 10, remark: 'Top 1/8th of Passed Candidates (Outstanding)' };
  if (percentage >= 81) return { grade: 'A2', points: 9, remark: 'Next 1/8th (Excellent)' };
  if (percentage >= 71) return { grade: 'B1', points: 8, remark: 'Next 1/8th (Very Good)' };
  if (percentage >= 61) return { grade: 'B2', points: 7, remark: 'Next 1/8th (Good)' };
  if (percentage >= 51) return { grade: 'C1', points: 6, remark: 'Next 1/8th (Fair)' };
  if (percentage >= 41) return { grade: 'C2', points: 5, remark: 'Next 1/8th (Average)' };
  if (percentage >= 33) return { grade: 'D', points: 4, remark: 'Marginal Pass' };
  return { grade: 'E', points: 0, remark: 'Essential Repeat' };
}

// Status badge CSS helper
export function getStatusBadgeClass(status) {
  const s = (status || '').toLowerCase();
  if (s.includes('paid') || s.includes('approved') || s.includes('verified') || s.includes('passed') || s.includes('active') || s.includes('confirmed')) {
    return 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800';
  }
  if (s.includes('pending') || s.includes('review') || s.includes('current')) {
    return 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800';
  }
  if (s.includes('absent') || s.includes('overdue') || s.includes('rejected') || s.includes('expired')) {
    return 'bg-rose-100 text-rose-800 border-rose-300 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-800';
  }
  return 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800';
}
