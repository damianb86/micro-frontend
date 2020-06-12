import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import debounce from 'lodash/debounce';

import { peopleQuickSearch } from '../../../actions/people';
import { requestAddCandidates } from '../../../actions/candidacies';
import { candidacies } from '../../../selectors/candidacies';

import PersonImage from '../PersonImage';
import ActiveForm from '../ActiveForm';
import CheckBox from '../CheckBox';
import StaticSearchBar from '../StaticSearchBar';

import { loadNewPersonData } from '../../../helpers/gridview';

export class SearchCandidate extends Component {
  constructor(props) {
    super(props);

    this.requestPeopleData = debounce(this.requestPeopleData, 500);
  }

  state = { query: '' }

  componentDidMount() {
    this.requestPeopleData();
  }

  handlePeopleSelectChange = (input) => {
    if (this.state.query !== input) {
      this.setState({ query: input });
      this.requestPeopleData(input);
    }
  };

  requestPeopleData = (name = '') =>
    this.props.dispatch(
      peopleQuickSearch({
        filter: JSON.stringify({
          0: { field: 'name', value: [name] }
        }),
        quickSearch: true,
        include: 'current_position'
      })
    );

  handleSubmit = (e) => {
    const personId = e.target.value;
    const { projectId } = this.props;

    if (!personId) return;

    const data = { person_ids: [personId].join(','), project_ids: [projectId].join(',') };

    return this.props.dispatch(requestAddCandidates(projectId, data)).then(response => loadNewPersonData(response, this.props.dispatch));
  }

  renderPosition(person) {
    let company = '';

    if (person.currentPosition) {
      const position = this.props.positions[person.currentPosition.id];

      if (position && position.companyAlias && position.companyAlias.name) {
        company = position.companyAlias.name;
      }
    }

    return <span className="search-candidates__list__item__content__position">{company}</span>;
  }

  renderActionButton(person) {
    const personAdded = this.props.candidacyPersonIds.includes(person.id);
    const addedText = personAdded ? <span className="search-candidates__list__item__added-text">Added</span> : '';

    return (
      <Fragment>
        {addedText}
        <CheckBox onChange={this.handleSubmit} value={person.id} checked={personAdded} disabled={personAdded} />
      </Fragment>
    );
  }

  render() {
    const properties = {
      onSubmit: this.props.onClose,
      submitButton: 'Done'
    };

    return (
      <section className="search-candidates">
        <StaticSearchBar
          placeholder="Search People"
          onChange={this.handlePeopleSelectChange}
          className="search-candidates__input"
        />
        <ActiveForm {...properties}>
          <ul className="search-candidates__list">
            {this.props.peopleIds.map((id) => {
              const person = this.props.people[id];
              return person && (
                <li key={person.id} className="search-candidates__list__item">
                  <PersonImage person={person} className="search-candidates__list__item__img" size="medium" showImage={true} />
                  <div className="search-candidates__list__item__content">
                    <span className="search-candidates__list__item__content__name">{person.name}</span>
                    {this.renderPosition(person)}
                  </div>
                  {this.renderActionButton(person)}
                </li>
              );
            })}
          </ul>
        </ActiveForm>
      </section>
    );
  }
}

const mapStateToProps = state => ({
  peopleIds: state.people.quickSearchPersonIds,
  people: state.entities.people,
  positions: state.entities.positions,
  candidacyPersonIds: candidacies(state).map(c => c.person.id)
});

export default connect(mapStateToProps)(SearchCandidate);
