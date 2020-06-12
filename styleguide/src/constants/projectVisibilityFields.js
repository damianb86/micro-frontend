const projectVisibilityFields = [
  {
    title: 'Project Analysis',
    key: 'project_analysis',
    values: [
      { key: 'isCandidatesStatusChartVisible', label: 'Candidate Status' },
      { key: 'isCandidatesInChartVisible', label: 'Candidates In' },
      { key: 'isCandidatesOutChartVisible', label: 'Candidate Out' },
      { key: 'isActivityFeedVisible', label: 'Project Activity' },
      { key: 'isInternalTeamVisible', label: 'Internal Team' },
      { key: 'isClientTeamVisible', label: 'Client Team' }
    ]
  },
  {
    title: 'Strategy & Position',
    key: 'strategy_position',
    values: [
      { key: 'isDescriptionVisible', label: 'Job Description' },
      { key: 'isRequirementVisible', label: 'Requirement Description' },
      { key: 'isStrategyVisible', label: 'Strategy' },
      { key: 'isTargetCompaniesVisible', label: 'Target Companies' },
      { key: 'isCompensationVisible', label: 'Compensation' },
      { key: 'isLocationVisible', label: 'Location' },
      { key: 'isPositionDocumentVisible', label: 'Position Document' }
    ]
  },
  {
    title: 'Candidate',
    key: 'candidate',
    values: [
      { key: 'isCandidateNameVisible', label: 'Name', subgroup: 'General' },
      { key: 'isCandidatePhoneNumberVisible', label: 'Phone', subgroup: 'General' },
      { key: 'isCandidateImageVisible', label: 'Photo', subgroup: 'General' },
      { key: 'isCandidateEmailAddressVisible', label: 'Email', subgroup: 'General' },
      { key: 'isBiographyVisible', label: 'Biography', subgroup: 'General' },
      { key: 'isCandidateLinkedinUrlVisible', label: 'Linkedin', subgroup: 'General' },
      { key: 'isSkypeVisible', label: 'Skype', subgroup: 'General' },
      { key: 'isCompanyVisible', label: 'Company', subgroup: 'General' },
      { key: 'isWebsiteVisible', label: 'Website', subgroup: 'General' },
      { key: 'isCandidateDateAddedVisible', label: 'Date Added', subgroup: 'General' },
      { key: 'isCandidateVisibilityDateVisible', label: 'Date Presented', subgroup: 'General' },
      { key: 'isCandidateDateUpdatedVisible', label: 'Date Updated', subgroup: 'General' },
      { key: 'isCandidateRatingVisible', label: 'Rating', subgroup: 'General' },

      { key: 'isCandidateResumeVisible', label: 'Resume', subgroup: 'Work & Education' },
      { key: 'isCandidateCompensationVisible', label: 'Compensation', subgroup: 'Work & Education' },
      { key: 'isSummaryPositionVisible', label: 'Position', subgroup: 'Work & Education' },
      { key: 'isEducationVisible', label: 'Education', subgroup: 'Work & Education' },
      { key: 'isPositionVisible', label: 'Position Detail', subgroup: 'Work & Education' },

      { key: 'isCandidateAddressVisible', label: 'Full Address', subgroup: 'Address' },
      { key: 'isAddressStreetVisible', label: 'Street', subgroup: 'Address' },
      { key: 'isAddressCityVisible', label: 'City', subgroup: 'Address' },
      { key: 'isAddressStateVisible', label: 'State', subgroup: 'Address' },
      { key: 'isAddressPostalCodeVisible', label: 'Zip Code', subgroup: 'Address' },
      { key: 'isAddressCountryVisible', label: 'Country', subgroup: 'Address' },
      { key: 'isAddressRegionVisible', label: 'Region', subgroup: 'Address' },
      { key: 'isAddressTypeVisible', label: 'Type', subgroup: 'Address' }
    ]
  }
];

export default projectVisibilityFields;
