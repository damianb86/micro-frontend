export const formatAutoCompleteResponseData = data => data.map(record => ({ id: record.id, name: record.attributes.name }));

export const formatProjectAutoCompleteResponseData = data =>
  data.map(p => ({ id: p.id, name: `${p.attributes.clientCompanyName} / ${p.attributes.name}` }));
