export const useFormatPrice = (value: number, currency: string, locale: string) => {
  const formatter = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  });

  return formatter.format(value);
};
