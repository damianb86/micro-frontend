import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import FormattedPlural from '../../FormattedPlural';

import useToggle from '../../../../hooks/useToggle';
import CollapsibleCard from '../../CollapsibleCard';
import Avatar from '../../Avatar';
import { StatusReportCardItemInfo, StatusReportCardItemNote, StatusReportCardItemDates } from '../index';

import '../index.scss';
import './index.scss';

const StatusReportCardMobile = ({ items, title, isOpen: startOpen, toggleNoteVisibility, lastUpdatedNoteId, showCandidateSidePanel }) => {
  const [isOpen, setOpen, setClose] = useToggle(startOpen);

  return (
    <div className="status-report-card-mobile">
      <CollapsibleCard
        className="status-report-card"
        title={title}
        subtitle={<FormattedPlural number={items.length} options={{ one: 'Candidate', other: 'Candidates' }} />}
        isOpen={isOpen}
        onOpen={setOpen}
        onClose={setClose}
      >
        {items.map(item => (
          <StatusReportCardItemMobile
            key={item.id}
            toggleNoteVisibility={toggleNoteVisibility}
            showCandidateSidePanel={showCandidateSidePanel}
            lastUpdatedNoteId={lastUpdatedNoteId}
            {...item}
          />
        ))}
      </CollapsibleCard>
    </div>
  );
};

StatusReportCardMobile.defaultProps = { isOpen: true };

StatusReportCardMobile.propTypes = {
  title: PropTypes.string,
  isOpen: PropTypes.bool,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      name: PropTypes.string,
      nameInitials: PropTypes.string,
      company: PropTypes.string,
      phone: PropTypes.object,
      email: PropTypes.string,
      position: PropTypes.string,
      avatar: PropTypes.string,
      linkedin: PropTypes.string,
      resume: PropTypes.string,
      rating: PropTypes.number,
      dateAdded: PropTypes.string,
      datePresented: PropTypes.string,
      dateUpdated: PropTypes.string,
      note: PropTypes.shape({
        content: PropTypes.string,
        type: PropTypes.string,
        dateUpdated: PropTypes.string,
        dateCreated: PropTypes.string
      })
    })
  )
};

export default StatusReportCardMobile;

const StatusReportCardItemMobile = ({
  toggleNoteVisibility,
  showCandidateSidePanel,
  lastUpdatedNoteId,
  avatar,
  name,
  nameInitials,
  note,
  dateAdded,
  datePresented,
  dateUpdated,
  id,
  ...info
}) => {
  const onCandidatePhotoClick = e => showCandidateSidePanel(e.currentTarget.dataset.id);

  return (
    <div className="status-report-card__item" >
      {avatar !== undefined && (
        <div className="status-report-card__item__avatar" data-id={id} role="button" onClick={onCandidatePhotoClick} tabIndex={-1}>
          <Avatar size="large" type="circle" src={avatar} name={name || ''} nameInitials={nameInitials} />
        </div>
      )}
      <div className={classNames('status-report-card__item__info', { 'with-avatar': avatar !== undefined })}>
        <StatusReportCardItemInfo name={name} id={id} {...info} showCandidateSidePanel={showCandidateSidePanel} />
      </div>
      <div className="status-report-card__item__note">
        {note && <StatusReportCardItemNote candidacyId={id} note={note} toggleNoteVisibility={toggleNoteVisibility} lastUpdatedNoteId={lastUpdatedNoteId} />}
      </div>
      <div className="status-report-card__item__info__dates">
        {dateAdded && <StatusReportCardItemDates date={dateAdded} label="Date Added" className="status-report-card__item__info__dates__added" />}
        {datePresented && <StatusReportCardItemDates date={datePresented} label="Date Presented" className="status-report-card__item__info__dates__presented" />}
        {dateUpdated && <StatusReportCardItemDates date={dateUpdated} label="Date Last Updated" className="status-report-card__item__info__dates__updated" />}
      </div>
    </div>
  );
};
