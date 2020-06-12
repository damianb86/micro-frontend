import { defaultMemoize } from 'reselect';
import html2pdf from 'html2pdf.js';

import { getFileTimestamp } from './time';
import { getTimestampedUrl } from './project';
import { ALL_CANDIDATE_FIELDS, DEFAULT_SELECTED_FIELDS, ALL_DASHBOARD_CHARTS, PROJECT_SUMMARY, IN_LIST, IN_VISUALIZATION, OUT_LIST, OUT_VISUALIZATION } from './../components/project/StatusReport/constant';

export const getCandidateFields = defaultMemoize((setting, statusId) => {
  let selectedFields = DEFAULT_SELECTED_FIELDS;
  const status = setting && setting.statuses && setting.statuses[statusId];

  if (setting && status !== undefined) {
    selectedFields = status && status.visibleFields;
  }

  return {
    type: (status && status.noteType) || null,
    candidateFields: ALL_CANDIDATE_FIELDS.map(field => ({ ...field, checked: selectedFields.indexOf(field.id) !== -1 }))
  };
});

export const getAllCandidateFields = defaultMemoize((setting, projectTypeStatusesIds) => {
  const types = {};
  const candidateFields = {};
  ['all'].concat(projectTypeStatusesIds).forEach((id) => {
    const statusFields = getCandidateFields(setting, id);
    types[id] = statusFields.type;
    candidateFields[id] = statusFields.candidateFields;
  });

  return { types, candidateFields };
});

export const downloadReport = () => {
  const filename = `${getFileTimestamp()}_status_report.pdf`;
  const reportView = document.querySelector('.status-report-download');

  const opt = {
    margin: 0.2,
    filename,
    image: { type: 'jpeg', quality: 0.98 },
    pagebreak: { avoid: ['.status-report-card__item'] },
    html2canvas: { useCORS: true, scale: 2 },
    jsPDF: { unit: 'in', format: 'letter', orientation: 'landscape' }
  };

  return html2pdf().set(opt).from(reportView).save();
};

export const candidatesWithTimeStampImageUrl = candidates => candidates.map((candidate) => {
  if (candidate.avatar) {
    return { ...candidate, avatar: getTimestampedUrl(candidate.avatar) };
  }

  return candidate;
});

export const reformatSelectedFieldsForSaving = (fieldsSettings, noteTypes, isApplyToAllChecked) => {
  const updatedFieldsSettings = {};
  if (isApplyToAllChecked) {
    const fieldsSelectedForApplyToAll = (fieldsSettings.all && fieldsSettings.all.filter(field => field.checked === true).map(field => field.id));

    Object.keys(fieldsSettings).forEach((statusId) => {
      updatedFieldsSettings[statusId] = { noteType: noteTypes.all, visibleFields: fieldsSelectedForApplyToAll };
    });

    updatedFieldsSettings.all.applyAll = true;
  } else {
    Object.keys(fieldsSettings).forEach((statusId) => {
      updatedFieldsSettings[statusId] = { noteType: noteTypes[statusId], visibleFields: fieldsSettings[statusId].filter(field => field.checked === true).map(field => field.id) };
    });

    updatedFieldsSettings.all.applyAll = false;
  }

  return updatedFieldsSettings;
};


export const getChartKeysToDownload = defaultMemoize((showProjectDataByVisibility, dashboardSettings) => {
  if (showProjectDataByVisibility) {
    const { isInProcessChartVisible, isProjectSummaryChartVisible, isOutChartVisible } = dashboardSettings;
    const classes = { [PROJECT_SUMMARY]: isProjectSummaryChartVisible, [IN_LIST]: isInProcessChartVisible, [IN_VISUALIZATION]: isInProcessChartVisible, [OUT_LIST]: isOutChartVisible, [OUT_VISUALIZATION]: isOutChartVisible };
    return ALL_DASHBOARD_CHARTS.filter(i => classes[i]);
  }

  return ALL_DASHBOARD_CHARTS;
});
