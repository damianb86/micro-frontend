import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'react-select/dist/react-select.css';

import CheckBox from '../CheckBox';
import { requestAllActiveUsers } from '../../../actions/users';
import { requestTaskCategoryList } from '../../../actions/staticData';
import { requestAutocompletePeople } from '../../../api/autocomplete';
import { tomorrow, oneWeek, twoWeeks, oneMonth, monthDayYearFormat } from '../../../formattedDate';
import { parsePersonNameWithCompanyForAutocomplete } from '../../../formatPersonName';
import SearchSelect from '../SearchSelect';
import { activeUsersIdValue } from '../../../selectors/users';
import LabelledInput from '../LabelledInput';
import ActiveForm from '../ActiveForm';

const DUE_DATE = [
  { key: 'date', name: 'Date' },
  { key: 'dateAndTime', name: 'Date & Time' },
  { key: 'tomorrow', name: 'Tomorrow' },
  { key: 'oneWeek', name: '1 week' },
  { key: 'twoWeeks', name: '2 weeks' },
  { key: 'oneMonth', name: '1 month' }
];
const format = 'hh:mm A';

class NewTask extends Component {
  constructor(props) {
    super(props);

    this.state = this.resetState();
    this.submitData = this.submitData.bind(this);
    this.handleTaskCategoryDropdown = this.handleTaskCategoryDropdown.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(requestTaskCategoryList());
    this.props.dispatch(requestAllActiveUsers());
  }

  onChange = event => this.setState({ [event.target.name]: event.target.value });
  onCheckBoxChange = event => this.setState({ [event.target.name]: event.target.value === 'false' });
  onChangeDueTime = value => this.setState({ dueTime: value });
  handleDateChange = date => this.setState({ dueDate: date });

  resetState() {
    return {
      dueDateKey: 'dateAndTime',
      dueDate: null,
      dueTime: null,
      person: null,
      taskCategoryId: null,
      assignee: null,
      description: '',
      createIcs: false,
      query: ''
    };
  }

  handleTaskCategoryDropdown(evt) {
    this.setState({ taskCategoryId: evt });
  }

  handleDueDate = (evt) => {
    this.setState({ dueDateKey: evt });

    if (evt === 'date' || evt === 'dateAndTime') {
      this.setState({ dueDate: null, dueTime: null });
    } else if (evt === 'tomorrow') {
      this.setState({ dueDate: tomorrow(), dueTime: null });
    } else if (evt === 'oneWeek') {
      this.setState({ dueDate: oneWeek(), dueTime: null });
    } else if (evt === 'twoWeeks') {
      this.setState({ dueDate: twoWeeks(), dueTime: null });
    } else if (evt === 'oneMonth') {
      this.setState({ dueDate: oneMonth(), dueTime: null });
    }
  };

  autocompletePerson = input => requestAutocompletePeople({ filter: JSON.stringify({ name: input }) }).then(payload => ({
    options: payload.data.map(d => ({
      value: d.id,
      label: parsePersonNameWithCompanyForAutocomplete(d, payload.included)
    })),
    callback: payload.meta.total <= payload.data.length
  }));

  autocompleteUser = (query) => {
    let assignee = null;

    if (query) {
      assignee = this.props.userList.find(el => el.value.toLowerCase() === query.toLowerCase());
    }

    this.setState({ assignee, query });
  }

  getUserOptions = () => {
    const { userList } = this.props;
    const { assignee } = this.state;

    const query = assignee ? assignee.value.toLowerCase() : (this.state.query || '').toLowerCase();

    if (!userList) return [];
    return userList.filter(el => el.value.toLowerCase().includes(query));
  }

  handlePersonSelectChange = val => this.setState({ person: val });
  handleAssigneeSelectChange = val => this.setState({ assignee: val });

  submitData(e) {
    e.preventDefault();

    const task = {
      categoryId: this.state.taskCategoryId,
      dueDate: this.state.dueDate ? monthDayYearFormat(this.state.dueDate) : '',
      dueTime: this.state.dueTime ? this.state.dueTime.format(format) : '',
      assigneeId: this.state.assignee.id,
      name: this.state.description
    };

    const dueDateOptions = DUE_DATE.find(item => item.key === this.state.dueDateKey).name;

    const formData = {
      task,
      dueDateOptions
    };

    if (this.state.person) {
      formData.personId = this.state.person.value;
      formData.taskPerson = this.state.person.label;
    }

    if (this.props.projectId) {
      formData.projectId = this.props.projectId;
    }

    if (this.state.createIcs) {
      formData.createIcs = true;
    }

    return this.props.handleTaskSubmit(formData)
      .then((res) => {
        if (!res.error) this.props.onClose();
        return res;
      });
  }

  render() {
    const taskCategories = this.props.taskCategoryIds.map(id => this.props.entities[id]);
    const dueDate = DUE_DATE.find(item => item.key === this.state.dueDateKey);
    const taskCategory =
      taskCategories.length > 0 ? taskCategories.find(item => item.id === this.state.taskCategoryId) : null;

    const disabled = !taskCategory
      || !this.props.selectedPeopleName
      || !this.state.dueDate
      || (this.state.dueDateKey === 'dateAndTime' && !this.state.dueTime)
      || !this.state.assignee;

    const properties = {
      disabled,
      onCancel: this.props.onClose,
      onSubmit: this.submitData,
      submitButton: 'Create',
      className: 'new-task-modal'
    };

    return (
      <ActiveForm {...properties}>
        <section className="new-task-modal__row">
          <LabelledInput
            label="Type"
            value={taskCategory && taskCategory.id}
            id="type"
            options={taskCategories && taskCategories.map(el => ({ id: el.id, value: el.name }))}
            onSelect={this.handleTaskCategoryDropdown}
            type="select"
            prompt="Select Type"
            className="new-task-modal__row__type"
          />
          <LabelledInput
            label="Person"
            value={this.props.selectedPeopleName}
            disabled
            className="new-task-modal__row__people"
          />
        </section>
        <section className="new-task-modal__row">
          <LabelledInput
            label="Due"
            value={dueDate && dueDate.key}
            id="due"
            options={DUE_DATE.map(el => ({ id: el.key, value: el.name }))}
            onSelect={this.handleDueDate}
            type="select"
            className="new-task-modal__row__due"
          />
          <LabelledInput
            label="Date"
            date={this.state.dueDate}
            onDateChange={this.handleDateChange}
            type="date"
            className="new-task-modal__row__date"
          />
          {this.state.dueDateKey === 'dateAndTime' &&
            <LabelledInput
              label="Time"
              showSecond={false}
              defaultValue={this.state.dueTime}
              onChange={this.onChangeDueTime}
              format={format}
              use12Hours
              type="time"
              className="new-task-modal__row__time"
              placeholder="Time"
            />
          }
        </section>
        <section className="new-task-modal__row">
          <LabelledInput type="custom" label="Assign to" className="new-task-modal__row__assign-to">
            <SearchSelect
              name="assignee"
              autoload
              value={this.state.assignee ? this.state.assignee.value : ''}
              options={this.getUserOptions()}
              autoComplete={this.autocompleteUser}
              onSubmit={this.handleAssigneeSelectChange}
              placeholder="Enter Name"
            />
          </LabelledInput>
          <LabelledInput type="custom" className="new-task-modal__row__ics">
            <CheckBox
              label="Create ics"
              type="checkbox"
              name="createIcs"
              value={this.state.createIcs}
              onChange={this.onCheckBoxChange}
              checked={this.state.createIcs}
            />
          </LabelledInput>
        </section>
        <section className="new-task-modal__row">
          <LabelledInput
            label="Description"
            type="textarea"
            name="description"
            placeholder="Add a description..."
            value={this.state.description}
            onChange={this.onChange}
            className="new-task-modal__row__description"
          />
        </section>
      </ActiveForm>
    );
  }
}

function mapStateToProps(state) {
  return {
    taskCategoryIds: state.statics.taskCategoryIds || {},
    entities: state.entities.taskCategories,
    currentUser: state.currentUser,
    userList: activeUsersIdValue(state)
  };
}

export default connect(mapStateToProps)(NewTask);
