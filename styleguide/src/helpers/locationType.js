// eslint-disable-next-line import/prefer-default-export
export const getLocationTypeArray = locationTypeEntities =>
  Object.keys(locationTypeEntities).map(key => ({
    id: key,
    value: locationTypeEntities[key].name
  }));
