import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import ListView from '../../ListView';
import { HEADER_MOBILE, HEADER } from '../../../project/LongListView/constants';
import Avatar from '../../Avatar';
import { reselectRowsForMobile } from '../selectors';
import { getNormalizedDigits } from '../../../../helpers/phoneNumber';

import LinkedinIcon from '../../../../icons/icon-16-linkedin.svg';
import ResumeIcon from '../../../../icons/icon-16-resume.svg';
import ResumeBlueIcon from '../../../../icons/icon-16-resume-blue.svg';
import './index.scss';

const LongListTableMobile = ({
  header,
  rows,
  emptyMessage,
  showCandidateSidePanel,
  candidacyList,
  handleLoadMore,
  loading
}) => {
  const [currentHeader, setCurrentHeader] = useState([]);
  const [headerVisible, setHeaderVisible] = useState([]);
  const { currentPage, pagesCount, total: totalRowCount } = candidacyList;

  useEffect(() => {
    const headerVisibleWithData = header.map(head => head.key).concat('data');
    const filteredHeader = HEADER_MOBILE.filter(head => headerVisibleWithData.includes(head.key));
    setHeaderVisible(headerVisibleWithData);
    setCurrentHeader(filteredHeader);
  }, [header]);

  const onCandidateDataClick = ({ target }) => showCandidateSidePanel(target.parentNode.getAttribute('data-id'));

  const renderCell = (row, cellKey) => {
    switch (cellKey) {
      case 'data':
        const phoneEmail = [];
        if (headerVisible.includes('phone') && row.data.phone) {
          phoneEmail.push(getNormalizedDigits(row.data.phone));
        }
        if (headerVisible.includes('email') && row.data.email) {
          phoneEmail.push(row.data.email);
        }

        return (
          <div className="long-list-table-mobile__cell__data">
            {(headerVisible.includes('avatar') || headerVisible.includes('name')) && (
              <div className="long-list-table-mobile__cell__data__top" role="button" tabIndex={0} data-id={row.id} onClick={onCandidateDataClick}>
                {headerVisible.includes('avatar') && (
                  <div className="long-list-table-mobile__cell__data__avatar">
                    <Avatar type="circle" size="large" src={row.avatar} name={row.data.name} nameInitials={row.nameInitials} />
                  </div>
                )}
                {headerVisible.includes('name') && <p className="long-list-table-mobile__cell__data__name">{row.data.name}</p>}
              </div>
            )}
            {headerVisible.includes('position') && <p className="long-list-table-mobile__cell__data__position">{row.data.position}</p>}
            {headerVisible.includes('company') && <p className="long-list-table-mobile__cell__data__company">{row.data.company}</p>}
            {phoneEmail.length ? (
              <div className="long-list-table-mobile__cell__data__phone-email" title={phoneEmail.join(' / ')} >{phoneEmail.join(' / ')}</div>
             ) : ''}
            {headerVisible.includes('dateAdded') && <p className="long-list-table-mobile__cell__data__date">Date Added: {row.data.dateAdded}</p>}
            {headerVisible.includes('dateUpdated') && <p className="long-list-table-mobile__cell__data__date">Last Updated: {row.data.dateUpdated}</p>}
            {headerVisible.includes('datePresented') && <p className="long-list-table-mobile__cell__data__date">Date Presented: {row.data.datePresented}</p>}
            <div className="long-list-table-mobile__cell__data__icons">
              {headerVisible.includes('linkedin') && (
                row.data.linkedin ? (
                  <a href={row.data.linkedin} target="_blank"><LinkedinIcon className="icon icon-on" /></a>
                ) : (
                  <LinkedinIcon className="icon icon-off" />
                )
              )}
              {headerVisible.includes('resume') && (
                row.data.resume ? (
                  <a href={row.data.resume} target="_blank"><ResumeBlueIcon className="icon" /></a>
                ) : (
                  <ResumeIcon className="icon" />
                )
              )}
            </div>
          </div>
        );
      default:
        return (
          <div className={classNames('long-list-table-mobile__cell__status', { 'padding-top': headerVisible.includes('avatar') })}>
            {row[cellKey]}
          </div>
        );
    }
  };

  return (
    <div className="long-list-table-mobile">
      <div className="long-list-table-mobile__count">
        <p className="long-list-table-mobile__count__number">{totalRowCount}</p>
        <p>Candidates</p>
      </div>
      <ListView
        header={currentHeader}
        rows={reselectRowsForMobile(rows)}
        renderCell={renderCell}
        emptyMessage={emptyMessage}
        loadMore={pagesCount > currentPage}
        handleLoadMore={handleLoadMore}
        loading={loading}
      />
    </div>
  );
};

LongListTableMobile.defaultProps = {
  header: HEADER,
  showCandidateSidePanel: () => null,
  candidacyList: {}
};

LongListTableMobile.propTypes = {
  header: PropTypes.array,
  rows: PropTypes.arrayOf(
    PropTypes.shape({
      avatar: PropTypes.string,
      name: PropTypes.string,
      position: PropTypes.string,
      company: PropTypes.string,
      phone: PropTypes.string,
      email: PropTypes.string,
      dateAdded: PropTypes.string,
      dateUpdated: PropTypes.string,
      linkedin: PropTypes.string,
      resume: PropTypes.string,
      rating: PropTypes.number,
      showBadge: PropTypes.bool
    })
  ).isRequired,
  candidacyList: PropTypes.shape({
    currentPage: PropTypes.number,
    pagesCount: PropTypes.number,
    total: PropTypes.number
  }),
  emptyMessage: PropTypes.string,
  handleLoadMore: PropTypes.func,
  showCandidateSidePanel: PropTypes.func
};

export default LongListTableMobile;
