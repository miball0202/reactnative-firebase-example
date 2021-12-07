import { timestampToDateLocaleString } from 'src/services/datetime_service';
import { Timestamp } from 'firebase/firestore';

describe('timestampToDateLocaleString()', () => {
  test('converts timestamp to dateLocaleString', () => {
    const timestamp = {
      seconds: 0,
      nanoseconds: 0,
    } as Timestamp;
    const string = timestampToDateLocaleString(timestamp);

    expect(string).toEqual('1/1/1970, 9:00:00 AM');
  });

  test('converts undefined to blank string', () => {
    const string = timestampToDateLocaleString(undefined);
    expect(string).toEqual('');
  });
});
