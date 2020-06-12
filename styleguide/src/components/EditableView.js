import React from 'react';

function isPromise(val) {
  return val && typeof val.then === 'function';
}

export default function editableView(WrappedComponent) {
  class EditableView extends React.Component {
    state = { editMode: false, errors: null };

    componentWillReceiveProps(nextProps) {
      if (this.state.editMode && nextProps.record !== this.props.record) {
        this.setState({ editMode: false });
      }
    }

    onEdit = () => {
      this.setState({ editMode: true, errors: null });
      if (this.props.onEdit) {
        this.props.onEdit();
      }
    };

    onSubmit = (e, newRecord) => {
      e.preventDefault();
      const recordId = this.props.record ? this.props.record.id : null;
      const response = this.props.onSubmit(recordId, { id: recordId, ...newRecord });

      if (isPromise(response)) {
        return response.then(v => {
          if (!v.error) {
            this.setState({ editMode: false });
          } else {
            this.setState({ errors: v.payload.response.errors });
          }

          return v;
        });
      } else {
        this.setState({ editMode: false });
      }
    };

    onCancel = e => {
      if (e) e.preventDefault();
      this.setState({ editMode: false, errors: null });
      if (this.props.onCancel) {
        this.props.onCancel();
      }
    };

    onDelete = e => {
      e.preventDefault();
      this.setState({ editMode: false });

      if (this.props.onDelete) {
        return this.props.onDelete(this.props.record.id);
      } else {
        return this.props.onSubmit(this.props.record.id, { id: this.props.record.id, _destroy: true }, e);
      }
    };

    setErrors = errors => this.setState({ errors: errors });

    render() {
      const properties = {
        ...this.props,
        editMode: this.state.editMode,
        errors: this.state.errors,
        setErrors: this.setErrors,
        onEdit: this.onEdit,
        onSubmit: this.props.onSubmit ? this.onSubmit : null,
        onCancel: this.onCancel,
        onDelete: !this.props.record || !this.props.deletable ? null : this.onDelete
      };
      return <WrappedComponent {...properties} />;
    }
  }

  EditableView.defaultProps = {
    deletable: true
  };

  EditableView.displayName = `EditableView(${getDisplayName(WrappedComponent)})`;
  return EditableView;
}

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}
