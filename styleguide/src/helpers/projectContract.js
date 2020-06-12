import html2canvas from 'html2canvas';
import * as JSPDF from 'jspdf';

import { getFileTimestamp } from './time';

/* eslint-disable import/prefer-default-export */
export function downloadAsPdf(payment) {
  const filename = `${getFileTimestamp()}_scheduled_payment.pdf`;
  const paymentView = document.querySelector('.payment-download');
  paymentView.querySelector('.payment-title').textContent = payment.title;
  paymentView.querySelector('.payment-amount').textContent = formattedNumber(payment.amount, payment.currencyCode);
  paymentView.querySelector('.payment-duedate').textContent = formattedDate(payment.dueDate);
  paymentView.querySelector('.payment-paiddate').textContent = formattedDate(payment.paymentDate);
  const ratio = paymentView.offsetHeight / paymentView.offsetWidth;
  const windowHeight = paymentView.getBoundingClientRect().height;

  return html2canvas(paymentView, { useCORS: true, windowHeight, scale: 2 }).then((canvas) => {
    const imgData = canvas.toDataURL('image/png');
    const pdf = new JSPDF();
    const width = pdf.internal.pageSize.getWidth();
    const height = ratio * width;
    pdf.addImage(imgData, 5, 5, width - 10, height);
    pdf.save(filename);
  });
}

function formattedDate(date) {
  return date && new Intl.DateTimeFormat('en-US').format(new Date(date));
}

function formattedNumber(number, currencyCode) {
  return number && new Intl.NumberFormat('en-US', { style: 'currency', currency: currencyCode, minimumFractionDigits: 0 }).format(number);
}
