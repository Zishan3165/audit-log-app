import { formatDateTime } from './formatter';

describe('Test format date time method with multiple parameters', () => {
  it('shows empty string when time parameter is 0', () => {
    expect(formatDateTime(0)).toEqual('');
  });
  it('shows empty string when time parameter is empty string', () => {
    expect(formatDateTime('')).toEqual('');
  });
  it('shows date when time is in epoch seconds', () => {
    expect(formatDateTime(1646154797)).toEqual('20/1/1970 07:15:54 AM');
  });
  it('shows date when time is in epoch seconds in string format', () => {
    expect(formatDateTime('1646154797')).toEqual('20/1/1970 07:15:54 AM');
  });
  it('shows date when time is in epoch milliseconds', () => {
    expect(formatDateTime(1646154797000)).toEqual('01/3/2022 11:13:17 PM');
  });
  it('shows date when time is in epoch milliseconds in string format', () => {
    expect(formatDateTime('1646154797000')).toEqual('01/3/2022 11:13:17 PM');
  });
  it('shows date when time is in timezone format', () => {
    expect(formatDateTime('2022-03-01T13:13:17.664Z')).toEqual('01/3/2022 07:13:17 PM');
  });
});
