import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import useToggle from '../../../hooks/useToggle';
import CollapsibleCard from '../CollapsibleCard';
import Avatar from '../Avatar';
import RatingStars from '../RatingStars';
import ReadMore from '../ReadMore';
import FormattedPlural from '../FormattedPlural';
import PersonPhoneAndEmail from '../PersonPhoneAndEmail';

import './index.scss';
import LinkedinIcon from '../../../icons/icon-16-linkedin.svg';
import ResumeIcon from '../../../icons/icon-16-resume-blue.svg';
import { filterAndJoin } from '../../../helpers';

const StatusReportCard = ({
  items,
  title,
  isOpen: startOpen,
  printMode,
  toggleNoteVisibility,
  lastUpdatedNoteId,
  isClient,
  pendulumEmail,
  showCandidateSidePanel,
  emailTarget
}) => {
  const [isOpen, setOpen, setClose] = useToggle(startOpen);

  return (
    <CollapsibleCard
      printMode={printMode}
      className="status-report-card"
      title={title}
      subtitle={<FormattedPlural number={items.length} options={{ one: 'Candidate', other: 'Candidates' }} />}
      isOpen={isOpen}
      onOpen={setOpen}
      onClose={setClose}
    >
      {items.map(item => (
        <StatusReportCardItem
          printMode={printMode}
          key={item.id}
          toggleNoteVisibility={toggleNoteVisibility}
          showCandidateSidePanel={showCandidateSidePanel}
          lastUpdatedNoteId={lastUpdatedNoteId}
          isClient={isClient}
          pendulumEmail={pendulumEmail}
          emailTarget={emailTarget}
          {...item}
        />
      ))}
    </CollapsibleCard>
  );
};

StatusReportCard.defaultProps = { isOpen: true, printMode: false };

StatusReportCard.propTypes = {
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
        dateCreated: PropTypes.string,
        stoplightStatus: PropTypes.string
      })
    })
  ),
  printMode: PropTypes.bool,
  toggleNoteVisibility: PropTypes.func,
  lastUpdatedNoteId: PropTypes.string
};

export default StatusReportCard;

const StatusReportCardItem = ({
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
  isClient,
  printMode,
  emailTarget,
  ...info
}) => {
  const onCandidatePhotoClick = () => showCandidateSidePanel(id);

  return (
    <div className="status-report-card__item">
      {avatar !== undefined && (
        <div className="status-report-card__item__avatar" role="button" onClick={onCandidatePhotoClick} tabIndex={-1}>
          <Avatar size="large" type="circle" src={avatar} name={name || ''} nameInitials={nameInitials} crossOrigin={printMode ? 'anonymous' : null} />
        </div>
      )}
      <div className="status-report-card__item__info">
        <StatusReportCardItemInfo
          {...info}
          id={id}
          name={name}
          printMode={printMode}
          emailTarget={emailTarget}
          showCandidateSidePanel={showCandidateSidePanel}
        />
        <div className="status-report-card__item__info__dates">
          {dateAdded && <StatusReportCardItemDates date={dateAdded} label="Date Added" className="status-report-card__item__info__dates__added" />}
          {datePresented && <StatusReportCardItemDates date={datePresented} label="Date Presented" className="status-report-card__item__info__dates__presented" />}
          {dateUpdated && <StatusReportCardItemDates date={dateUpdated} label="Date Last Updated" className="status-report-card__item__info__dates__updated" />}
        </div>
      </div>
      <div className="status-report-card__item__note">
        {note && <StatusReportCardItemNote candidacyId={id} note={note} toggleNoteVisibility={toggleNoteVisibility} lastUpdatedNoteId={lastUpdatedNoteId} isClient={isClient} printMode={printMode} />}
      </div>
    </div>
  );
};

export const StatusReportCardItemInfo = ({
  id,
  name,
  linkedin,
  resume,
  rating,
  company,
  position,
  phone,
  email,
  emailTarget,
  pendulumEmail,
  showCandidateSidePanel,
  printMode
}) => {
  const onCandidateNameClick = () => showCandidateSidePanel(id);

  return (
    <Fragment>
      <div className="status-report-card__item__info__name">
        {name && (
          <a className="row-name" role="button" tabIndex={0} onClick={onCandidateNameClick}>
            {name}
          </a>
        )}
        {!printMode &&
          <div className="status-report-card__item__info__icons">
            {linkedin && <a target="_blank" href={linkedin}><LinkedinIcon className="icon-blue" /></a>}
            {resume && <a target="_blank" href={resume}><ResumeIcon /></a>}
            {rating !== null && rating !== undefined && (
              <div className="status-report-card__item__info__icons__rating">
                <RatingStars numberOfStars={1} starDimension="13" ratingNumber={rating} rating={rating * 0.2} />
              </div>
            )}
          </div>}
      </div>
      <div className="status-report-card__item__info__company-position">
        {filterAndJoin([company, position], ', ')}
      </div>
      <div className="status-report-card__item__info__phone-email">
        <PersonPhoneAndEmail
          phoneNumber={phone}
          emailAddress={{ address: email }}
          pendulumEmail={pendulumEmail}
          emailTarget={emailTarget}
        />
      </div>
    </Fragment>
  );
};


export const StatusReportCardItemDates = ({ date, label, className }) => (
  <div className={className}>
    <span>{label}</span>
    <span>{date}</span>
  </div>
);

export const StatusReportCardItemNote = ({ note, toggleNoteVisibility, lastUpdatedNoteId, candidacyId, isClient, printMode }) => {
  const handleNoteVisibility = () => toggleNoteVisibility(candidacyId, note);

  return (
    <div>
      {!isClient && note.stoplightStatus !== 'green' &&
        <div className="status-report-card__item__note__visibility status-report-card__item__note__make_visible">
          <span>Note is not visible.</span>
          {!printMode && <a role="presentation" onClick={handleNoteVisibility}>Make it visible</a>}
        </div>
      }
      {!isClient && lastUpdatedNoteId === note.id && note.stoplightStatus === 'green' &&
        <div className="status-report-card__item__note__visibility status-report-card__item__note__undo_visibility">
          <span>Note is visible.</span>
          <a role="presentation" onClick={handleNoteVisibility}>Undo</a>
        </div>
      }
      {printMode ?
        (<div dangerouslySetInnerHTML={{ __html: note.content }} />) :
        (<ReadMore
          lessText="Show less"
          moreText="Show more"
          limitLines={4}
          content={note.content}
        />)}
      <div className="status-report-card__item__note__info">
        {filterAndJoin([note.type, note.author, note.dateCreated], ' · ')}
      </div>
    </div>
  );
};
