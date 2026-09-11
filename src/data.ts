// Singapore Currency and Number Formatting Helpers

export function formatCurrency(amount: number): string {
  if (isNaN(amount) || amount === null || amount === undefined) {
    return 'S$0';
  }
  return `S$${Math.round(amount).toLocaleString('en-SG')}`;
}

export function formatCompactCurrency(amount: number): string {
  if (isNaN(amount) || amount === null || amount === undefined || amount === 0) {
    return 'S$0';
  }
  if (amount >= 1_000_000_000) {
    return `S$${(amount / 1_000_000_000).toFixed(2)}B`;
  }
  if (amount >= 1_000_000) {
    return `S$${(amount / 1_000_000).toFixed(2)}M`;
  }
  if (amount >= 1_000) {
    return `S$${(amount / 1_000).toFixed(0)}k`;
  }
  return `S$${Math.round(amount).toLocaleString('en-SG')}`;
}

export function formatPsf(psf: number): string {
  if (isNaN(psf) || psf === null || psf === undefined || psf === 0) {
    return 'S$0 psf';
  }
  return `S$${Math.round(psf).toLocaleString('en-SG')} psf`;
}
