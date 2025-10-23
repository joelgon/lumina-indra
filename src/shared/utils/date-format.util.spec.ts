import { DateFormatUtil } from './date-format.util';

describe('DateFormatUtil', () => {
  describe('format', () => {
    it('should format date in en-CA with Sao Paulo timezone', () => {
      const date = new Date(Date.UTC(2025, 9, 24, 15, 30, 0));
      const formatted = DateFormatUtil.format(date);

      expect(formatted).toMatch(/\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}/);
    });
  });

  describe('createDate', () => {
    it('should return undefined for undefined input', () => {
      expect(DateFormatUtil.createDate(undefined, '00:00:00')).toBeUndefined();
    });

    it('should create date from string with T separator and provided hours', () => {
      const dateStr = '2025-10-25';
      const result = DateFormatUtil.createDate(dateStr, '00:00:00');

      expect(result).toBeInstanceOf(Date);
      expect(result?.getFullYear()).toBe(2025);
      expect(result?.getMonth()).toBe(9);
      expect(result?.getDate()).toBe(25);
      expect(result?.getHours()).toBe(0);
      expect(result?.getMinutes()).toBe(0);
      expect(result?.getSeconds()).toBe(0);
    });

    it('should create date from string with T and time included', () => {
      const dateStr = '2025-10-25T15:45:30';
      const result = DateFormatUtil.createDate(dateStr, '00:00:00');

      expect(result?.getFullYear()).toBe(2025);
      expect(result?.getMonth()).toBe(9);
      expect(result?.getDate()).toBe(25);
      expect(result?.getHours()).toBe(15);
      expect(result?.getMinutes()).toBe(45);
      expect(result?.getSeconds()).toBe(30);
    });

    it('should create date from timestamp number', () => {
      const timestamp = new Date(2025, 9, 25, 12, 0, 0).getTime();
      const result = DateFormatUtil.createDate(timestamp, '00:00:00');

      expect(result?.getTime()).toBe(timestamp);
    });

    it('should create date from Date object', () => {
      const dateObj = new Date(2025, 9, 25, 12, 0, 0);
      const result = DateFormatUtil.createDate(dateObj, '00:00:00');

      expect(result).toEqual(dateObj);
    });
  });
});
