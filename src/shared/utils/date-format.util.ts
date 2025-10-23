export class DateFormatUtil {
  public static format(date: Date): string {
    return new Intl.DateTimeFormat('en-CA', {
      timeZone: 'America/Sao_Paulo',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    })
      .format(date)
      .replace(',', '');
  }

  public static createDate(value: string | Date | undefined | number, hours: string) {
    if (!value) return undefined;

    if (typeof value === 'string') {
      const [datePart, timePart] = value.split('T');
      const [year, month, day] = datePart.split('-').map(Number);
      const [hour, minute, second] = (timePart || hours).split(':').map(Number);

      return new Date(year, month - 1, day, hour, minute, second);
    }
    return new Date(value);
  }
}
