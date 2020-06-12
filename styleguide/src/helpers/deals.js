import { defaultMemoize } from 'reselect';
import flatten from 'lodash/flatten';
import isEmpty from 'lodash/isEmpty';
import HeaderFields from '../components/deals/HeaderFields';

export const headerWithSelectedFields = defaultMemoize((selectedFields, columnWidthValues, dealFirmFields = []) => {
  let headers = HeaderFields.filter(f => f.required);

  if (selectedFields) {
    const dealFirmFieldsHeader = dealFirmFields.map(dff => ({ key: `firm-field-${dff.id}`, title: dff.fieldName, minWidth: 100, width: 200, resizable: true, draggable: true }));
    const allFields = HeaderFields.concat(dealFirmFieldsHeader);

    headers = headers.concat(selectedFields.map(k => allFields.find(f => f.key === k)).filter(h => h));
  }

  if (isEmpty(columnWidthValues)) {
    return headers;
  }

  return headers.map(h => ({ ...h, width: columnWidthValues[h.key] || h.width }));
});

export const allKeys = defaultMemoize(fields => flatten(fields.map(fieldSection => fieldSection.values.map(f => f.key))));

export default headerWithSelectedFields;
