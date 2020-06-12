import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';

import { ASC, DESC } from '../../../constants/common';
import ListView from '../ListView';
import NotificationBadge from '../Badge/NotificationBadge';
import Avatar from '../Avatar';

import './index.scss';
import LinkedinIcon from '../../../icons/icon-16-linkedin.svg';
import ResumeIcon from '../../../icons/icon-16-resume.svg';
import ResumeBlueIcon from '../../../icons/icon-16-resume-blue.svg';
import RatingStars from '../RatingStars';

const LongListTable = ({
  header,
  rows,
  showCandidateSidePanel,
  emptyMessage,
  storeSortedHeader,
  changeSortBy,
  handleWidthChange,
  handleLoadMore,
  candidacyList,
  loading
}) => {
  const [currentHeader, setCurrentHeader] = useState([]);
  const { sortField, sortOrder, currentPage, pagesCount, total: totalRowCount } = candidacyList;

  useEffect(() => {
    const filteredHeader = header.map(head => (head.key !== 'name' ? head : { ...head, title: `${head.title} (${totalRowCount})` }));
    setCurrentHeader(filteredHeader);
  }, [rows.length, header]);

  const handleSort = (sortBy, ascending) => changeSortBy(sortBy, ascending ? ASC : DESC);
  const headerSortColumns = sortedHeaders => storeSortedHeader(sortedHeaders);
  const onCandidateNameClick = e => showCandidateSidePanel(e.target.getAttribute('data-id'));
  const onCandidatePhotoClick = e => showCandidateSidePanel(e.target.parentElement.getAttribute('data-id'));

  const renderCell = (row, cellKey) => {
    switch (cellKey) {
      case 'name':
        return (
          <a className="row-name" role="button" tabIndex={0} data-id={row.id} onClick={onCandidateNameClick}>
            {row.name} {row.showBadge && <NotificationBadge />}
          </a>
        );
      case 'avatar':
        return (
          <span className="avatar" onClick={onCandidatePhotoClick} data-id={row.id} role="button" tabIndex={-1}>
            <Avatar type="circle" size="large" src={row.avatar} name={row.name} nameInitials={row.nameInitials} />
          </span>
        );
      case 'linkedin':
        return row.linkedin ? (
          <a href={row.linkedin} target="_blank"><LinkedinIcon className="long-list-table__icon" /></a>
        ) : <LinkedinIcon className="long-list-table__icon__off" />;
      case 'resume':
        return row.resume ? <a href={row.resume} target="_blank"><ResumeBlueIcon /></a> : <ResumeIcon />;
      case 'rating':
        return typeof row.rating === 'number' ? (
          <RatingStars numberOfStars={1} ratingNumber={row.rating} rating={row.rating / 5} />
        ) : '';
      default:
        return row[cellKey];
    }
  };

  return (
    <ListView
      className={classNames('long-list-table', { 'long-list-table-no-border': isEmpty(currentHeader) })}
      sort="status"
      header={currentHeader}
      rows={rows}
      handleSort={handleSort}
      sortAscending={sortOrder === ASC}
      sortField={sortField}
      renderCell={renderCell}
      loading={loading}
      emptyMessage={emptyMessage}
      onHeaderSortEnd={headerSortColumns}
      loadMore={pagesCount > currentPage}
      handleLoadMore={handleLoadMore}
      headerSortable
      handleWidthChange={handleWidthChange}
    />
  );
};

LongListTable.defaultProps = { candidacyList: {} };

LongListTable.propTypes = {
  header: PropTypes.array.isRequired,
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
  emptyMessage: PropTypes.string,
  showCandidateSidePanel: PropTypes.func,
  storeSortedHeader: PropTypes.func,
  changeSortBy: PropTypes.func,
  handleWidthChange: PropTypes.func,
  candidacyList: PropTypes.shape({
    sortField: PropTypes.string,
    sortOrder: PropTypes.string,
    currentPage: PropTypes.number,
    pagesCount: PropTypes.number,
    total: PropTypes.number
  }),
  handleLoadMore: PropTypes.func
};

export default LongListTable;
