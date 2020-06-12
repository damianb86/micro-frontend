import { createParams, userNameWithRoleOrId } from './analytics';
import { users as userEntities } from '../../__test__/fixtures/analytics/noteActivityReport';

describe('createParams fn', () => {
  it('should return params with selectedUserId when selectedUserId is passed', () => {
    const paramsHash = {
      usersSelected: [{ id: 1 }, { id: 2 }]
    };

    const result = createParams(paramsHash);
    expect(result.user_id).toEqual([1, 2]);
  });

  it('should return params with selectedUserId and dealValueSelected when passed', () => {
    const paramsHash = {
      usersSelected: [{ id: 1 }, { id: 2 }],
      dealValueSelected: 'count'
    };

    const result = createParams(paramsHash);
    expect(result.user_id).toEqual([1, 2]);
    expect(result.kind_of).toEqual('count');
  });

  it('should return expected params value when selectedUserId, startDate and endDate are supplied', () => {
    const paramsHash = {
      usersSelected: [{ id: 1 }, { id: 2 }],
      startDate: '18-12-2014',
      endDate: '24-12-2014'
    };

    const result = createParams(paramsHash);
    expect(result.user_id).toEqual([1, 2]);
    expect(result.timeframe).toEqual('{"begin":"18-12-2014","end":"24-12-2014"}');
  });

  it('should return expected params value when selectedUserId, startDate and endDate, and kind_of are supplied', () => {
    const paramsHash = {
      usersSelected: [{ id: 1 }, { id: 2 }],
      startDate: '18-12-2014',
      endDate: '24-12-2014',
      dealValueSelected: 'count'
    };

    const result = createParams(paramsHash);
    expect(result.user_id).toEqual([1, 2]);
    expect(result.timeframe).toEqual('{"begin":"18-12-2014","end":"24-12-2014"}');
    expect(result.kind_of).toEqual('count');
  });
});

describe('userNameWithRoleOrId fn', () => {
  it('should return name with role', () => {
    const result = userNameWithRoleOrId(userEntities, 7);
    expect(result).toEqual('Rani (Partner)');
  });
});
