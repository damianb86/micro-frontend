import { getAttachedTo, getNoteProjectId } from './aggregateNotes';
import filedInOptions from '../../__test__/fixtures/notes/FiledInOptions';

describe('getAttachedTo fn', () => {
  describe('when note is present', () => {
    it('should return attachedToId and attachedToType from note', () => {
      const note = { attachedToId: 1, attachedToType: 'candidacy' };
      expect(getAttachedTo(null, null, null, note)).toEqual([note.attachedToId, note.attachedToType]);
    });
  });

  describe('when attachedToId and attachedToType is present in the filter', () => {
    it('should return attachedToId and attachedToType value from filter', () => {
      const filter = { attachedToId: '1', attachedToType: 'candidacy' };
      expect(getAttachedTo(filter, null, 786)).toEqual([filter.attachedToId, filter.attachedToType]);
    });
  });

  describe('when attachedToId and attachedToType is not present in the filter', () => {
    const filter = { attachedToId: null, attachedToType: null };

    describe('when candidacy is present', () => {
      it('should return attachedToId and attachedToType value corresponding to candidacy', () => {
        const candidacy = { id: 1 };
        expect(getAttachedTo(filter, candidacy, 786)).toEqual([candidacy.id, 'candidacy']);
      });
    });

    describe('when candidacy is not present', () => {
      it('should return attachedToId and attachedToType value corresponding to person', () => {
        const personId = '786';
        expect(getAttachedTo(filter, null, personId)).toEqual([personId, 'person']);
      });
    });
  });
});

// returns projectId for candidacy note
describe('getNoteProjectId fn', () => {
  describe('when filedInOptions is not present', () => {
    it('should return null', () => {
      expect(getNoteProjectId(null, '1', 'candidacy')).toBeNull();
    });
  });

  describe('when filedInOptions is present', () => {
    describe('when attachedToType is not candidacy', () => {
      const attachedToType = 'person';

      it('should return null', () => {
        expect(getNoteProjectId({}, '1', attachedToType)).toBeNull();
      });
    });

    describe('when attachedToType is candidacy', () => {
      it('should return projectId', () => {
        expect(getNoteProjectId(filedInOptions, '2', 'candidacy')).toBe(filedInOptions[2].attributes.metaId);
      });
    });
  });
});
