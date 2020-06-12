export const getToSearchLink = (data, searchOption, newPeopleEnabled, isTypeIncluded = true) => {
  const { name: query, clientCompanyId } = data;
  const type = isTypeIncluded ? `&type=${searchOption}` : '';

  switch (searchOption) {
    case 'projects':
      window.location.href = isTypeIncluded ?
        `/firm/projects/search?type=projects&q=${query}` :
        `/firm/${searchOption}?q=${query}&company_id=${clientCompanyId}`;

      break;
    case 'companies':
      window.location.href = `/firm/companies?q=${query}${type}`;
      break;
    case 'schools':
      window.location.href = `/firm/schools?q=${query}${type}`;
      break;
    case 'people':
      if (newPeopleEnabled) {
        window.location.href = `/firm/people/gridview?query=${query}&quick_search=${true}`;
      } else {
        window.location.href = `/firm/people/advanced_search?q=${query}${type}`;
      }
      break;
    default:
      break;
  }
};

export default getToSearchLink;
