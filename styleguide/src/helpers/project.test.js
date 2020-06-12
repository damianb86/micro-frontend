import { getTimestampedUrl, reformatProjectProfileUpdateParams } from './project';

describe('getTimestampedUrl', () => {
  it('should return URL with ?v=timestamp', () => {
    const url = 'https://s3-us-west-2.amazonaws.com/clkwkdev-images/qa/f85/company_image/000/000/002/106/c633573/CW_Search_Logo.png?1551296103';
    const result = getTimestampedUrl(url);
    expect(result).toContain('&v=');
  });

  it('should return URL with &v=timestamp', () => {
    const url = 'https://s3-us-west-2.amazonaws.com/clkwkdev-images/qa/f85/company_image/000/000/002/106/c633573/CW_Search_Logo.png';
    const result = getTimestampedUrl(url);
    expect(result).toContain('?v=');
  });

  it('should return null for an undefined input', () => {
    const url = undefined;
    const result = getTimestampedUrl(url);
    expect(result).toEqual(null);
  });

  it('should return null for a null input', () => {
    const url = null;
    const result = getTimestampedUrl(url);
    expect(result).toEqual(null);
  });
});

describe('reformatProjectProfileUpdateParams', () => {
  it('should return formatted data and not contain the keys for which value is null', () => {
    const itemsSelected = {
      preferredIndustryId: '1',
      preferredSpecialtyId: undefined,
      seniorityId: undefined,
      revenueRangeId: undefined,
      fundingStageId: '5',
      employeeRangeId: '6',
      industryIds: ['1', '2'],
      specialtyIds: ['1', '2', '3'],
      investorIds: []
    };

    const expectedResult = {
      project: {
        projectMetadataAttributes: {
          fundingStageId: '5',
          employeeRangeId: '6'
        }
      },
      projectIndustries: { industryIds: ['1', '2'], preferredIndustryId: '1' },
      projectSpecialties: { specialtyIds: ['1', '2', '3'] },
      projectInvestors: { investorIds: [] }
    };

    const result = reformatProjectProfileUpdateParams(itemsSelected);
    expect(result).toEqual(expectedResult);
  });

  it('should return correct value for all the keys when all the keys are present in the itemsSelected variable', () => {
    const itemsSelected = {
      preferredIndustryId: '1',
      preferredSpecialtyId: '2',
      seniorityId: '3',
      revenueRangeId: '4',
      fundingStageId: '5',
      employeeRangeId: '6',
      industryIds: ['1', '2'],
      specialtyIds: ['1', '2', '3'],
      investorIds: []
    };


    const expectedResult = {
      project: {
        projectMetadataAttributes: {
          seniorityId: '3',
          fundingStageId: '5',
          revenueRangeId: '4',
          employeeRangeId: '6'
        }
      },
      projectIndustries: { industryIds: ['1', '2'], preferredIndustryId: '1' },
      projectSpecialties: { specialtyIds: ['1', '2', '3'], preferredSpecialtyId: '2' },
      projectInvestors: { investorIds: [] }
    };

    const result = reformatProjectProfileUpdateParams(itemsSelected);
    expect(result).toEqual(expectedResult);
  });
});
