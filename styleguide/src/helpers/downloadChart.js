import html2canvas from 'html2canvas';
import * as JSPDF from 'jspdf';
import 'jspdf-autotable';

import { getFileTimestamp } from './time';

const saveAs = (uri, filename) => {
  const link = document.createElement('a');
  if (typeof link.download === 'string') {
    link.href = uri;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } else {
    const w = window.open('about:blank', 'image from canvas');
    w.document.write(`<img src='${uri}' alt='from canvas'/>`);
  }
};

const saveAsPDF = (uri, filename, imageRatio, chartType = '') => {
  const pdf = new JSPDF({ orientation: 'landscape' });
  // if chart is donut-chart set width = height and height = page height
  const width = chartType === 'donut-chart' ? pdf.internal.pageSize.getHeight() : pdf.internal.pageSize.getWidth();
  const height = chartType === 'donut-chart' ? width : imageRatio * width;
  pdf.addImage(uri, 'PNG', 0, 10, width - 10, height - 10);
  pdf.save(`${filename}.pdf`);
};

const convertChartToImage = (domClassName, documentType, filename, svgStyles) => {
  const reportPage = document.querySelector(`.${domClassName}`);
  const el = reportPage.querySelector('svg');
  const rect = el.getBoundingClientRect();
  const windowWidth = rect.width + 500;
  const timeStampedFilename = `${getFileTimestamp()}_${filename || 'reports'}`;
  const divHeight = reportPage.offsetHeight;
  const divWidth = reportPage.offsetWidth;
  const ratio = divHeight / divWidth;

  const style = document.createElementNS('http://www.w3.org/2000/svg', 'style');
  style.innerHTML = svgStyles;
  el.appendChild(style);

  // TODO: if windowWidth > 32767(canvas size of chrome and mozilla) show error message

  html2canvas(reportPage, { useCORS: true, windowWidth }).then((canvas) => {
    const imgData = canvas.toDataURL('image/png');

    if (documentType === 'PNG') {
      saveAs(imgData, timeStampedFilename);
    } else if (documentType === 'PDF') {
      saveAsPDF(imgData, timeStampedFilename, ratio, domClassName);
    }
  }).then(() => el.removeChild(style));
};

export const downloadScreeningReportPDF = (screeningQuestions, reports) => {
  const styles = {
    textColor: [119, 141, 164],
    fillColor: [254, 254, 254],
    lineWidth: 0.1,
    lineColor: [204, 204, 204]
  };

  const header = [{ content: 'Candidates', styles: { ...styles, valign: 'middle', minCellWidth: 30 } },
    { content: 'Average', styles: { ...styles, valign: 'middle', minCellWidth: 20 } }
  ];

  let newHeader = header.concat(screeningQuestions.map((sq, index) => (
    { content: `${index + 1}. ${sq.title}`, styles: { ...styles, valign: 'middle' } }
  )));

  newHeader = newHeader.concat({ content: 'Comment', styles: { ...styles, valign: 'middle', cellWidth: 50 } });

  const body = reports.map((candidate) => {
    const data = [
      { content: candidate.candidacyName, styles: { valign: 'middle' } },
      { content: candidate.averageRating, styles: { halign: 'center', valign: 'middle' } }
    ];
    candidate.ratings.map(rating => data.push({ content: rating, styles: { halign: 'center', valign: 'middle' } }));
    data.push({ content: candidate.comment, styles: { valign: 'middle', cellWidth: 50 } });
    return data;
  });

  const timeStampedFilename = `ResearchQualityReport_${getFileTimestamp()}`;
  const doc = new JSPDF({ orientation: 'landscape' });
  doc.autoTable({ head: [newHeader], body, theme: 'grid' });
  doc.save(`${timeStampedFilename}.pdf`);
};

export function downloadStackedBarChart(documentType, filename) {
  const svgStyles = '.domain,.tick line,clipPath[id$=clip-xaxis]{display:none}.c3-ygrid{stroke-dasharray:0;stroke:#DFE3E6}.c3-ygrid-lines .c3-ygrid-line{stroke-dasharray:0;stroke:#BEC9D0;stroke-width:3}.tick text{fill:$default-color;font-size:12px}';

  return convertChartToImage('stacked-bar', documentType, filename, svgStyles);
}

export function downloadMultipleLineChart(documentType, filename) {
  const svgStyles = '.domain,.tick line{display:none}.c3-line{stroke-width:3px}.c3-axis .tick tspan{color:#455565;font-family:Roboto;font-size:12px}.c3-grid line{stroke:#DFE3E8;stroke-dasharray:none}.c3-chart &-lines{fill:none}.c3-chart &-lines .c3-defocused{opacity:.4!important}';

  return convertChartToImage('multiple-line-chart', documentType, filename, svgStyles);
}


export function downloadDonutChart(documentType, filename) {
  const svgStyles = '.c3-chart .domain{display:none}';
  return convertChartToImage('donut-chart', documentType, filename, svgStyles);
}
