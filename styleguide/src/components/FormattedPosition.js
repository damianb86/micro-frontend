import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default class FormattedPosition extends React.PureComponent {
  companyNameWithTitle() {
    const { position, formerLabel, className } = this.props;
    let companyDetail = '';

    if (position.companyAlias) {
      const companyAlias = position.companyAlias;
      companyDetail = this.props.linkCompany ? (
        <Link to={`/companies/${companyAlias.company_id}`} className="text-strong">
          {companyAlias.name}
        </Link>
      ) : (
        companyAlias.name
      );
    }

    return (
      <span className={className}>
        {position.title}
        {companyDetail ? ' at ' : ''}
        {companyDetail}
        {formerLabel ? this.formerText(position) : null}
      </span>
    );
  }

  companyName() {
    const { position, formerLabel } = this.props;
    let companyName = null;

    if (position.companyAlias) {
      companyName = (
        <span>
          {position.companyAlias.name} {formerLabel ? this.formerText(position) : null}
        </span>
      );
    }

    return companyName;
  }

  formerText(position) {
    return position.isFormer ? <span className="text-grey"> (former) </span> : null;
  }

  render() {
    if (!this.props.position) return null;

    if (this.props.withTitle) {
      return this.companyNameWithTitle();
    } else {
      return this.companyName();
    }
  }
}

FormattedPosition.propTypes = {
  formerLabel: PropTypes.bool,
  position: PropTypes.object,
  withTitle: PropTypes.bool,
  linkCompany: PropTypes.bool
};

FormattedPosition.defaultProps = {
  formerLabel: true,
  withTitle: false,
  linkCompany: true
};
