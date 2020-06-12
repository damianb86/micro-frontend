export function getTimestampedUrl(url) {
  const currentTime = new Date().getTime();
  if (url && url.includes('?')) {
    return `${url}&v=${currentTime}`;
  } else if (url) {
    return `${url}?v=${currentTime}`;
  }
  return null;
}

export const reformatProjectProfileUpdateParams = (itemsSelected) => {
  const project = { projectMetadataAttributes: {} };
  const projectIndustries = {};
  const projectSpecialties = {};
  const projectInvestors = {};

  // Project Metadata Params
  ['seniorityId', 'fundingStageId', 'revenueRangeId', 'employeeRangeId'].forEach((attribute) => {
    if (itemsSelected[attribute]) {
      project.projectMetadataAttributes[attribute] = itemsSelected[attribute];
    }
  });

  // Project Industry Params
  if (itemsSelected.industryIds) {
    projectIndustries.industryIds = itemsSelected.industryIds;
  }

  if (itemsSelected.preferredIndustryId) {
    projectIndustries.preferredIndustryId = itemsSelected.preferredIndustryId;
  }

  // Project Specialty Params
  if (itemsSelected.specialtyIds) {
    projectSpecialties.specialtyIds = itemsSelected.specialtyIds;
  }

  if (itemsSelected.preferredSpecialtyId) {
    projectSpecialties.preferredSpecialtyId = itemsSelected.preferredSpecialtyId;
  }

  // Project Investor Params
  if (itemsSelected.investorIds) {
    projectInvestors.investorIds = itemsSelected.investorIds;
  }

  return { project, projectIndustries, projectSpecialties, projectInvestors };
};
