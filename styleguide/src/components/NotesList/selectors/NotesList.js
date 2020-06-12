import React from 'react';
import moment from 'moment';

import { defaultMemoize } from 'reselect';
import ReadMore from '../../ReadMore';

const tagsColors = { outreach_notes: '#45AF72', info_notes: '#4589BF', other_notes: '#FA8C5A', client: '#000000' };

// Map note entity in a shape accepted by the StackedListWithThreads component
export const mapNote = entity => ({
  id: `${entity.id}_${entity.type}`,
  title: entity.author && (entity.author.name || entity.author.personName),
  author: entity.author,
  avatar: entity.author && entity.author.profilePicture && entity.author.profilePicture.urls.icon,
  pinned: false,
  visible: entity.stoplightStatus && entity.stoplightStatus === 'green',
  body: <ReadMore formatText={false} limitLines={7} lessText="Read less" moreText="Read more" content={entity.content} />,
  content: entity.content,
  categoryId: entity.categoryId,
  projectId: entity.notable && entity.notable.projectId,
  type: entity.type,
  attachedToId: entity.attachedToId, // TODO refactor: candidacyId, dealId, dealTargetId, and personId variable can be removed, attachedToId will be enough
  attachedToType: entity.attachedToType,
  candidacyId: entity.candidacyId,
  dealId: entity.dealId,
  dealTargetId: entity.dealTargetId,
  thread: entity.thread,
  tags: entity.tags,
  labels: entity.labels,
  attachments: entity.attachments,
  parentId: entity.parentId && `${entity.parentId}_${entity.type}`
});

export const getAuthor = (entity, entities) =>
  entity.author && (entities.users[entity.author.id] || entity.notable);

export const getTags = (entity, entities) => {
  const category = entities.noteCategories[entity.categoryId];
  return category ? [{ id: category.id, name: category.name, color: tagsColors[category.categoryType] }] : [];
};

export const getAttachments = (entity, entities) => {
  const attachments = [];
  (entity.attachments || []).forEach((attachment) => {
    if (entities[attachment.type] && entities[attachment.type][attachment.id]) {
      attachments.push(entities[attachment.type][attachment.id]);
    }
  });
  return attachments;
};

const entityLabels = (entity, entityType) => {
  let labels = [];
  const { notable } = entity;
  const name = notable && notable.name;
  const projectName = notable && notable.projectName;

  if (['personNotes', 'dealNotes', 'dealTargetNotes'].includes(entityType)) {
    labels = name && [name];
  } else if (entityType === 'candidacyNotes') {
    labels = projectName && [projectName];
  }

  labels.push(moment(entity.createdAt).format('MM/DD/YYYY  hh:mm A'));

  return labels;
};

// Look at entity comments and return the entities in an array
export const getThread = (entity, entities) => {
  const thread = [];
  if (entity.comments && entity.comments.length > 0) {
    entity.comments.forEach((comment) => {
      const commentEntity = entities[comment.type] && entities[comment.type][comment.id];
      if (commentEntity) {
        commentEntity.type = entity.type;
        commentEntity.author = getAuthor(commentEntity, entities);
        commentEntity.labels = entity.labels;
        commentEntity.attachedToId = entity.attachedToId;
        commentEntity.attachedToType = entity.attachedToType;

        thread.push(commentEntity);
      }
    });
  }
  return thread;
};

export const reselectAggregateNotes = defaultMemoize((ids, entities, pinnedNoteId = null) => {
  const aggregateNotes = [];

  let updatedIds = ids;

  if (pinnedNoteId) {
    updatedIds = ids.filter(item => `${item[0]}_${item[1]}` !== pinnedNoteId);
    updatedIds.unshift(pinnedNoteId.split('_'));
  }

  updatedIds.forEach((id) => {
    const [entityId, entityType] = id;
    const entity = entities[entityType] ? { ...entities[entityType][entityId] } : null;
    const labels = entityLabels(entity, entityType);

    if (entity) {
      const attachedToType = entityType.replace('Notes', '');
      const attachedToId = `${entity[`${attachedToType}Id`]}`;

      entity.attachedToType = attachedToType;
      entity.attachedToId = attachedToId;
      entity.type = entityType;
      entity.labels = labels;
      entity.thread = getThread(entity, entities);
      entity.author = getAuthor(entity, entities);
      entity.tags = getTags(entity, entities);
      entity.attachments = getAttachments(entity, entities);

      if ((entity.author && entity.author.role === 'Client') || entity.thread.some(commentEntity => commentEntity.author && commentEntity.author.role === 'Client')) {
        entity.tags.push({ id: 'client', name: 'Client', color: tagsColors.client });
      }

      // Map all the thread comments
      entity.thread = entity.thread.map(commentEntity => mapNote(commentEntity));

      aggregateNotes.push(mapNote(entity));
    }
  });

  return aggregateNotes;
});

export default reselectAggregateNotes;
