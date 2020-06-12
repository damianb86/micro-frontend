import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { Desktop, Mobile } from '../Responsive';

const ListViewCell = ({
  row,
  title,
  cellWidth,
  cellKey,
  className,
  renderCell,
  connectDragSource,
  isMobileResponsive,
  mobileProps
}) => {
  const style = {};

  if (cellWidth) {
    style.width = `${cellWidth}px`;
  }

  return (
    <Fragment>
      <Desktop isVisible={!isMobileResponsive}>
        <div style={style} className={classNames(className, 'list-view__tbody__row__cell')}>
          {renderCell ? renderCell(row, cellKey, connectDragSource) : row[cellKey]}
        </div>
      </Desktop>
      <Mobile isHidden={!isMobileResponsive}>
        <div className={classNames(className, 'list-view__tbody__row__cell__mobile')} style={mobileProps.rowStyle}>
          <div className="label" style={mobileProps.labelStyle}><span>{mobileProps.title !== undefined ? mobileProps.title : title}</span></div>
          <div className="content" style={mobileProps.contentStyle}>
            {renderCell ? renderCell(row, cellKey, connectDragSource) : row[cellKey]}
          </div>
        </div>
      </Mobile>
    </Fragment>
  );
};

ListViewCell.defaultProps = { mobileProps: {} };

ListViewCell.propTypes = {
  cellWidth: PropTypes.number,
  className: PropTypes.string,
  renderCell: PropTypes.func,
  cellKey: PropTypes.string,
  titleMobile: PropTypes.string,
  mobileProps: PropTypes.object
};

export default ListViewCell;

export class EditableListViewCell extends React.Component {
  constructor(props) {
    super(props);
    this.state = { editMode: false };
  }

  componentWillUnmount() {
    document.body.removeEventListener('click', this.turnOffEditMode);
  }

  turnOffEditMode = (ev) => {
    if (this.state.editMode) {
      if (ev.target !== this.thElement && !this.thElement.contains(ev.target)) {
        document.body.removeEventListener('click', this.turnOffEditMode);
        this.props.updateContent(this.props.row, this.props.cellKey, this.state.editContent);
        this.setState({ editMode: false });
      }
    }
  };

  enableEditing = () => {
    if (!this.state.editMode) {
      const editContent = this.props.renderCell
        ? this.props.renderCell(this.props.row, this.props.cellKey, true)
        : this.props.row[this.props.cellKey];
      this.setState({ editMode: true, editContent });
      document.body.addEventListener('click', this.turnOffEditMode);
    }
  };

  handleChange = (ev) => {
    this.setState({ editContent: ev.target.value });
  };

  renderCellContent() {
    return this.props.renderCell
      ? this.props.renderCell(this.props.row, this.props.cellKey, this.props.connectDragSource)
      : this.props.row[this.props.cellKey];
  }

  render() {
    const { className, cellClassName, cellWidth, cellKey } = this.props;
    const { editMode, editContent } = this.state;
    const style = {};
    if (cellWidth) {
      style.width = cellWidth;
    }

    return (
      <Fragment>
        <Desktop>
          <div style={style} className={classNames(className, cellClassName, 'editable')}>
            {editMode ? <input type="text" value={editContent} onChange={this.handleChange} /> : this.renderCellContent()}
          </div>
        </Desktop>
        <Mobile>
          <div className={classNames(className, cellClassName, 'mobile')}>
            <div>{cellKey}</div>
            {this.renderCellContent()}
          </div>
        </Mobile>
      </Fragment>
    );
  }
}

EditableListViewCell.propTypes = {
  cellWidth: PropTypes.number,
  renderCell: PropTypes.func,
  cellKey: PropTypes.string,
  row: PropTypes.objectOf,
  updateContent: PropTypes.func,
  cellClassName: PropTypes.string
};
