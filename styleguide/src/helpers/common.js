import { defaultMemoize } from 'reselect';
import queryString from 'query-string';
import { DESC } from '../constants/common';
import { ROLES } from '../constants/userRoles';
import isEmpty from 'lodash/isEmpty';

export const setViewport = (width = 'device-width', initialScale = 1.0, maximumScale = 1.0, userScalable = 1) => {
  const metaTag = document.createElement('meta');
  metaTag.name = 'viewport';
  metaTag.content = `width=${width}, initial-scale=${initialScale}, maximum-scale=${maximumScale}, user-scalable=${userScalable}`;
  document.getElementsByTagName('head')[0].appendChild(metaTag);
};

export const isActiveFirmUser = defaultMemoize(currentUser => ![ROLES.CLIENT, ROLES.EXTERNAL_RECRUITER].includes(currentUser && currentUser.role));
export const isClient = defaultMemoize(currentUser => currentUser && currentUser.role === 'Client');

export const sortArray = (arr, order) => {
  if (order === DESC) {
    return arr ? arr.sort((b, a) => a.toLowerCase().localeCompare(b.toLowerCase())) : [];
  }
  return arr ? arr.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase())) : [];
};

export const getLinkedInSearchURL = defaultMemoize((name, companyName) => {
  const percentEncodedName = name ? name.replace(/ /g, '%20') : '';
  const percentEncodedCompanyName = companyName ? companyName.replace(/ /g, '%20') : '';

  return `https://www.linkedin.com/search/results/index/?keywords=${percentEncodedName}%20${percentEncodedCompanyName}`;
});

export const isExternalRecruiter = ({ role }) => role === ROLES.EXTERNAL_RECRUITER;

export const parseJSON = (str, defaultVal = {}) => {
  try {
    return str ? JSON.parse(str) : defaultVal;
  } catch (err) {
    return {};
  }
};

export const updateOptionsArray = (optionsArray, keyToUpdate, newCheckedValue) => optionsArray.map((option) => {
  if (option.key === keyToUpdate) {
    return { ...option, checked: newCheckedValue };
  }
  return option;
});

export const addOrRemoveArrayItem = (arr, item) =>
  (arr.includes(item) ? arr.filter(i => i !== item) : arr.concat(item));

export const isMacintosh = window.navigator.platform.indexOf('Mac') > -1;

export const featureEnabled = (features, firmId, key) => {
  const firmFeature = Object.values(features).find(ff => ff.firmId === firmId);
  return firmFeature && firmFeature[key];
};

export const recordsWithSelectionDetails = defaultMemoize((records, selectedIds) => {
  if (selectedIds && selectedIds.length) {
    return records.map(row => (selectedIds.includes(row.id) ? ({ ...row, selected: true }) : row));
  }

  return records;
});

export const isValidEmail = (email) => {
  const regexExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regexExp.test(email);
};

export const isRich = str => /<[^>]*>/.test(str);

export const getScrollParent = (node) => {
  if (node == null || node.nodeName === 'HTML') {
    return null;
  }

  if (node.nodeName === 'BODY') {
    return node;
  }

  const nodeStyles = getComputedStyle(node);

  if (((/(auto|scroll)/).test(nodeStyles.overflow + nodeStyles.overflowY + nodeStyles.overflowX))) {
    return node;
  }

  return getScrollParent(node.parentNode);
};

export const windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

export const windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

export const getEntityMappedItems = defaultMemoize((itemsArray = [], entitiesArrayOfObject = [{}]) =>
  itemsArray.map(id => entitiesArrayOfObject.find(t => `${t.id}` === `${id}`)).filter(t => t));

export const getCurrenciesSelectList = defaultMemoize(currencies =>
  Object.keys(currencies).map(a => ({ id: currencies[a].id, value: currencies[a].code })));

export const filterArray = defaultMemoize((options = [], optionsToFilter = []) =>
  options.filter(({ id }) => !optionsToFilter.some(({ id: oId }) => oId === id)));

export const filterArrayById = defaultMemoize((options = [], filterId) =>
  options.filter(({ id }) => `${id}` !== `${filterId}`));

export const findEntityById = defaultMemoize((options = [], findId) =>
  options.find(({ id }) => `${id}` === `${findId}`));

export const parseSettings = defaultMemoize((settings, DEFAULT_SETTINGS_OPTIONS) => {
  const defaultSettings = DEFAULT_SETTINGS_OPTIONS.reduce((acc, cv) => ({ ...acc, [cv.key]: cv.defaultValue }), {});
  try {
    return settings ? JSON.parse(settings) : defaultSettings;
  } catch (err) {
    return defaultSettings;
  }
});

export const calculatePercentage = (value, total) => (total > 0 ? Math.round((value / total) * 100) : 0);

export const getKeyValueFromQueryString = (key = '') => {
  if (key) {
    const obj = queryString.parse(window.location.search);
    return (obj && typeof obj === 'object') ? obj[key] : '';
  }
};

const appendCustomFields = (optionalFields, customFields) => {
  const customFieldOptions = customFields.filter(cf => cf.enabled).map(cf => ({ key: `custom_field_${cf.id}`, label: cf.fieldName }));
  return { ...optionalFields, values: [...optionalFields.values, ...customFieldOptions] };
};

export const exportFieldsWithCustomFields = (fields, customFields) => {
  if (isEmpty(customFields)) return fields;

  const optionalFields = appendCustomFields(fields[1], customFields);
  return [fields[0], optionalFields];
};
