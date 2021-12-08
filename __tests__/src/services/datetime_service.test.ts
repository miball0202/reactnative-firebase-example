import { timestampToDateLocaleString } from 'src/services/datetime_service';
import { Timestamp } from 'firebase/firestore';

describe('timestampToDateLocaleString()', () => {
  it('converts timestamp to dateLocaleString', () => {
    const timestamp = {
      seconds: 0,
      nanoseconds: 0,
    } as Timestamp;

    expect(timestampToDateLocaleString(timestamp)).toBe('1/1/1970, 9:00:00 AM');
  });

  it('converts undefined to blank string', () => {
    expect(timestampToDateLocaleString(undefined)).toBe('');
  });
});
