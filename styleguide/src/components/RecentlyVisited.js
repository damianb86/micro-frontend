import React from 'react';

import companyIcon from '../assets/images/Companies-Grey.svg';
import projectIcon from '../assets/images/Projects-Grey.svg';
import peopleIcon from '../assets/images/People-Grey.svg';
import dealIcon from '../assets/images/Deals-Grey.svg';
import RecentVistedIcon from '../icons/icon-chevron-up-down.svg';

export default class RecentlyVisited extends React.Component {
  constructor(props) {
    super(props);

    this.state = { visibility: false };
  }

  componentDidMount() {
    document.body.addEventListener('click', this.hideRecentlyVisited);
  }

  componentWillUnmount() {
    document.body.removeEventListener('click', this.hideRecentlyVisited);
  }

  getEntityDetail (entity) {
    switch (entity.klass) {
      case 'Project':
        return { imageUrl: entity.imageUrl || projectIcon, url: `/firm/projects/${entity.id}` };
      case 'Person':
        return { imageUrl: entity.imageUrl || peopleIcon, url: `/firm/people/${entity.id}` };
      case 'Company':
        return {
          imageUrl: entity.imageUrl || companyIcon,
          id: entity.id,
          url: `/firm/companies/${entity.id}`
        };
      case 'Deal':
        return { imageUrl: entity.imageUrl || dealIcon, id: entity.id, url: `/firm/deals/${entity.id}` };
      case 'School':
        return { imageUrl: entity.imageUrl || '', id: entity.id, url: `/firm/schools/${entity.id}` };
      default:
        return {};
    }
  };

  toggleRecentlyVisited() {
    if (!this.state.visibility && this.props.entities.length === 0) {
      this.props.fetchRecentVisitedEntities();
    }
    this.setState({ visibility: !this.state.visibility });
  };

  hideRecentlyVisited(e) {
    if (
      this.listDom &&
      this.listDom !== e.target &&
      !this.listDom.contains(e.target) &&
      this.selector &&
      this.selector !== e.target &&
      !this.selector.contains(e.target)
    ) {
      this.setState({ visibility: false });
    }
  };

  renderRecentlyVisited() {
    return (
      <section className="site-dropdown">
        <ul
          className="list-unstyled site-dropdown__list"
          ref={(ref) => {
            this.listDom = ref;
          }}
        >
          {this.props.entities &&
            this.props.entities.map((entity) => {
              const formattedEntity = this.getEntityDetail(entity);
              return (
                <li className="site-dropdown__list__item" key={`${entity.klass}_${entity.id}`}>
                  <a className="text-truncate" href={formattedEntity.url} title={entity.title}>
                    {entity.title}
                  </a>
                </li>
              );
            })}
        </ul>
      </section>
    );
  }

  render() {
    return (
      <section
        className="recently-visited"
        ref={(ref) => {
          this.selector = ref;
        }}
      >
        <span className="recently-visited__link" onClick={this.toggleRecentlyVisited} role="button" tabIndex="0">
          Recently Visited <RecentVistedIcon />{' '}
        </span>
        {this.state.visibility ? this.renderRecentlyVisited() : null}
      </section>
    );
  }
}
