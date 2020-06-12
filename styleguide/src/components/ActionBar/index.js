import React from 'react';
import debounce from 'lodash/debounce';
import PropTypes from 'prop-types';

import StaticSearchBar from '../StaticSearchBar';

import IconDownload from '../../../assets/images/icon-12-download.svg';
import IconMerge from '../../../icons/icon-12-merge.svg';
import IconAction from '../../../icons/icon-12-lightning.svg';
import IconExport from '../../../icons/icon-12-export.svg';

import './index.scss';

const exportIcon = <IconExport width={12} height={12} />;

export default class ActionBar extends React.Component {
  constructor(props) {
    super(props);

    this.handleSearch = debounce(this.handleSearch, 200);
  }

  handleSearch = value => this.props.handleSearch({ name: value });

  renderExtraLink() {
    const buttonsElems = [];

    if (this.props.mergeActions) {
      return (
        <React.Fragment key="merge">
          {this.props.toMerge.length >= 2 ? (
            <button onClick={this.props.showMergeModal} className="pri-button">
              <IconMerge /> <span>Merge</span>
            </button>
          ) : null}

          <button onClick={this.props.cancelMerge} className="sec-button">
            Cancel
          </button>
          {this.props.mergeActions}
        </React.Fragment>
      );
    }

    if (this.props.performActions) {
      const elm = (
        <React.Fragment key="perform">
          {this.props.isActionValuesChanged &&
            <button onClick={this.props.showActionModal} className="pri-button">
              Done
            </button>
          }
          <button onClick={this.props.cancelAction} className="sec-button">
            Cancel
          </button>
        </React.Fragment>
      );
      buttonsElems.push(elm);
    }

    if (this.props.showAddNewForm) {
      const elm = (
        <button className="pri-button" key="add" title="add" onClick={this.props.showAddNewForm}>
          {this.props.addNewLabel}
        </button>
      );
      buttonsElems.push(elm);
    }

    if (this.props.mergeHandler) {
      const elm = (
        <button className="sec-button" key="merge" title="merge" onClick={this.props.mergeHandler}>
          <IconMerge /> <span>Merge</span>
        </button>
      );
      buttonsElems.push(elm);
    }

    if (this.props.actionHandler) {
      const elm = (
        <button className="sec-button" key="action" title="action" onClick={this.props.actionHandler}>
          <IconAction /> <span>Action</span>
        </button>
      );
      buttonsElems.push(elm);
    }

    if (this.props.handleCSVDownload) {
      const elm = (
        <button className="sec-button" key="download" title="download" onClick={this.props.handleCSVDownload}>
          <img src={IconDownload} alt="Download" /> Download
        </button>
      );
      buttonsElems.push(elm);
    }

    if (this.props.handleExportClick) {
      const elm = (
        <button className="sec-button" key="export" title="download" onClick={this.props.handleExportClick}>
          {exportIcon}
          <span>Export</span>
        </button>
      );
      buttonsElems.push(elm);
    }

    if (this.props.countLabel) {
      const elm = (
        <span className="action-bar__right__total-count" key="count">
          {this.props.countLabel}
        </span>
      );
      buttonsElems.push(elm);
    }

    return <section className="action-bar__right clearfix">{buttonsElems}</section>;
  }

  render() {
    return (
      <section className="action-bar clearfix">
        {this.props.rightMenu}
        {this.renderExtraLink()}
        <section className="action-bar__left clearfix" style={this.props.flexStyle ? this.props.flexStyle : {}}>
          {this.props.leftMenu}
          {this.props.filterMenu}
          {this.props.handleSearch ? (
            <StaticSearchBar
              className={this.props.seachStyling}
              placeholder="Filter"
              handleSubmit={this.props.handleSearch}
              reloadOnClose
              onChange={this.handleSearch}
              value={this.props.handleSearchBarValue}
            />
          ) : null}
        </section>
      </section>
    );
  }
}

ActionBar.propTypes = {
  toMerge: PropTypes.array,
  isActionValuesChanged: PropTypes.bool,
  countLabel: PropTypes.string,
  flexStyle: PropTypes.object,
  seachStyling: PropTypes.string,
  performActions: PropTypes.bool,
  filterMenu: PropTypes.node,
  mergeActions: PropTypes.node,
  addNewLabel: PropTypes.node,
  handleSearch: PropTypes.func,
  showMergeModal: PropTypes.func,
  cancelMerge: PropTypes.func,
  showActionModal: PropTypes.func,
  cancelAction: PropTypes.func,
  showAddNewForm: PropTypes.func,
  mergeHandler: PropTypes.func,
  actionHandler: PropTypes.func,
  handleCSVDownload: PropTypes.func,
  handleExportClick: PropTypes.func,
  rightMenu: PropTypes.node,
  leftMenu: PropTypes.node
};
