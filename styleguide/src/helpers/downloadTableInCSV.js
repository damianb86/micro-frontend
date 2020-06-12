import { getFileTimestamp } from './time';

export default function downloadTableInCSV(report, filename) {
  if (!Array.isArray(report)) {
    throw new Error('Please pass an array of values');
  }

  const file = `${getFileTimestamp()}_${filename || 'reports'}.csv`;
  let csvContent = 'data:text/csv;charset=utf-8,';

  report.forEach((rowArray) => {
    const row = rowArray.join(',');
    csvContent += `${row}\r\n`;
  });

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', file);
  document.body.appendChild(link);
  link.click();
}
