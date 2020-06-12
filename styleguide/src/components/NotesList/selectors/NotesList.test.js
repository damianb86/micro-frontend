import React from 'react';

import ReadMore from '../../ReadMore';
import reselectAggregateNotes, { getAuthor, getTags, getAttachments, getThread } from './NotesList';
import { aggregateNotes, entities, noteCategories, users, personNoteAttachments } from './../../../../../__test__/fixtures/common/NotesList';

const aggregatedEntities = { ...entities, users, noteCategories, personNoteAttachments };
describe('reselectAggregateNotes fn', () => {
  const aggregateNotesEntities = reselectAggregateNotes(aggregateNotes.ids, aggregatedEntities);

  describe('fn return', () => {
    it('should return array of 6 values', () => {
      expect(aggregateNotesEntities).toHaveLength(6);
    });

    it('should a note without author value have shape', () => {
      const withoutAuthor = aggregateNotesEntities[0];
      expect(withoutAuthor).toEqual({
        id: '420203_personNotes',
        title: 'Sukanta Mangal',
        author: {
          id: 2112027,
          name: 'Sukanta Mangal',
          type: 'person'
        },
        avatar: undefined,
        labels: ['Sukanta Mangal', '06/25/2018  10:20 AM'],
        attachedToId: '2112027',
        attachedToType: 'person',
        tags: [],
        thread: [],
        visible: false,
        pinned: false,
        attachments: [],
        type: 'personNotes',
        candidacyId: undefined,
        categoryId: null,
        content: 'Content test',
        projectId: undefined,
        body: <ReadMore attachment="" content="Content test" lessText="Read less" showLessTextIcon={false} limitLines={7} moreText="Read more" showMoreTextIcon={false} formatText={false} />,
        parentId: null
      });
    });

    it('should a note with author value have shape', () => {
      const withAuthor = aggregateNotesEntities[1];
      expect(withAuthor).toEqual({
        id: '70403_candidacyNotes',
        title: 'test person 1',
        author: {
          id: '1',
          name: 'test person 1',
          profilePicture: {
            id: 1,
            urls: { icon: 'http://url1.com' }
          }
        },
        avatar: 'http://url1.com',
        labels: ['Kreeti Technologies Pvt. Ltd. / Century Dictionary', '05/09/2018  07:00 AM'],
        attachedToId: '146633',
        attachedToType: 'candidacy',
        tags: [{ color: '#45AF72', id: '1783', name: 'Email' }],
        thread: [],
        visible: false,
        pinned: false,
        attachments: [],
        type: 'candidacyNotes',
        candidacyId: 146633,
        categoryId: 1783,
        content: 'Subject: <br />Hi, how are you?',
        projectId: 1611,
        body: <ReadMore attachment="" content="Subject: <br />Hi, how are you?" lessText="Read less" showLessTextIcon={false} limitLines={7} moreText="Read more" showMoreTextIcon={false} formatText={false} />,
        parentId: '74130_candidacyNotes'
      });
    });

    it('note label should match deal label when note is of deal type', () => {
      const dealNote = aggregateNotesEntities[4];
      expect(dealNote.labels[0]).toEqual(entities.dealNotes[2].notable.name);
    });

    it("comment note label should match it's parent note label", () => {
      const parentNote = aggregateNotesEntities[4];
      const commentNote = aggregateNotesEntities[5];
      expect(commentNote.labels).toEqual(parentNote.labels);
    });
  });
});

describe('helpers functions', () => {
  it('getAuthor fn', () => {
    const entity = entities.candidacyNotes[70403];
    const author = getAuthor(entity, aggregatedEntities);
    expect(author.name).toEqual('test person 1');
  });

  it('getTags fn', () => {
    const entity = entities.candidacyNotes[74128];
    const tags = getTags(entity, aggregatedEntities);
    expect(tags).toEqual([{ color: '#45AF72', id: '1782', name: 'Other' }]);
  });

  it('getAttachments fn', () => {
    const entity = entities.candidacyNotes[74128];
    const attachments = getAttachments(entity, aggregatedEntities);
    expect(attachments).toEqual([{
      attachmentType: 'NoteAttachmentType',
      downloadUrl: '/clkwkdev-attachments/file.png',
      fileContentType: 'image/png',
      fileFileName: 'file.png',
      fileFileSize: 146606,
      fileUpdatedAt: '2019-02-12T13:26:15Z',
      klass: 'PersonNoteAttachments'
    }]);
  });

  it('getThread fn', () => {
    const entity = entities.candidacyNotes[74130];

    // entity.labels get updated before it is passed to getThread fn
    entity.labels = ['Kreeti Technologies Pvt. Ltd. / Century Dictionary', '08/03/2018  02:23 PM'];
    entity.attachedToId = '146633';
    entity.attachedToType = 'candidacy';

    const thread = getThread(entity, aggregatedEntities);
    expect(thread).toEqual([{
      attachments: [],
      author: {
        id: '2',
        name: 'test person 2',
        profilePicture: {
          id: 2,
          urls: { icon: 'http://url2.com' }
        }
      },
      candidacyId: 146633,
      categoryId: 1783,
      content: 'Response test',
      createdAt: '2018-08-03 14:23:51',
      id: '74130',
      labels: ['Kreeti Technologies Pvt. Ltd. / Century Dictionary', '08/03/2018  02:23 PM'],
      attachedToId: '146633',
      attachedToType: 'candidacy',
      mimeType: 'text/html',
      notable: {
        id: 146633,
        personName: 'Sukanta Mangal',
        projectId: 1611,
        projectName: 'Kreeti Technologies Pvt. Ltd. / Century Dictionary',
        type: 'candidacy'
      },
      parentId: null,
      stoplightStatus: 'red'
    }]);
  });
});
