import { getCandidateFields, getAllCandidateFields, reformatSelectedFieldsForSaving } from './statusReport';
import { parseJSON } from '../helpers/common';

import projectDisplayEntities from '../../__test__/fixtures/project/ProjectDisplay';

describe('getCandidateFields', () => {
  describe('when settings not present', () => {
    it('should return default fields checked', () => {
      const result = getCandidateFields();
      expect(Object.keys(result)).toEqual(['type', 'candidateFields']);
      expect(result.candidateFields.filter(f => f.checked)).toHaveLength(6);
    });
  });

  describe('when settings present', () => {
    it('should return default fields checked', () => {
      const result = getCandidateFields({ statuses: { 1: { noteType: null, visibleFields: ['name', 'photo'] } } }, 1);
      expect(Object.keys(result)).toEqual(['type', 'candidateFields']);
      expect(result.candidateFields.filter(f => f.checked)).toHaveLength(2);
    });
  });
});

describe('reformatSelectedFieldsForSaving fn', () => {
  const statusReportSettings = parseJSON(projectDisplayEntities[121].statusReportSettings);
  const { _, candidateFields } = getAllCandidateFields(statusReportSettings, [600, 700]);

  describe('when apply to all is checked', () => {
    const fieldsSelectedForApplyToAll = statusReportSettings.statuses.all.visibleFields;
    const result = reformatSelectedFieldsForSaving(candidateFields, { 600: 10, 700: 20, all: 30 }, true);

    it('should copy the fields settings of Apply to All field setting to all other statuses', () => {
      expect(result.all.visibleFields).toEqual(fieldsSelectedForApplyToAll);
      expect(result[600].visibleFields).toEqual(fieldsSelectedForApplyToAll);
      expect(result[700].visibleFields).toEqual(fieldsSelectedForApplyToAll);
    });

    it('should copy the note type setting of Apply to All to all other statuses', () => {
      expect(result.all.noteType).toEqual(30);
      expect(result[600].noteType).toEqual(30);
      expect(result[700].noteType).toEqual(30);
    });
  });

  describe('when apply to all is not checked', () => {
    const result = reformatSelectedFieldsForSaving(candidateFields, { 600: 50, 700: 100, all: 150 }, false);

    it('should not copy the fields settings of Apply to All field setting to all other statuses', () => {
      expect(result.all.visibleFields).toEqual(statusReportSettings.statuses.all.visibleFields);
      expect(result[600].visibleFields).toEqual(statusReportSettings.statuses[600].visibleFields);
      expect(result[700].visibleFields).toEqual(statusReportSettings.statuses[700].visibleFields);
    });

    it('should not copy the note type setting of Apply to All to all other statuses', () => {
      expect(result.all.noteType).toEqual(150);
      expect(result[600].noteType).toEqual(50);
      expect(result[700].noteType).toEqual(100);
    });
  });
});
