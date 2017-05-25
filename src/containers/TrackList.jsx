import * as React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { push } from 'react-router-redux';
import Table from '../components/Table';
import { schema, tableSchema, formSchema } from '../models/track';
import { creators } from '../actions/track';
import { defaultPerPage } from '../config';

const { create, update, destroy } = creators;

class TrackList extends React.Component {
  static get propTypes() {
    return {
      items:   PropTypes.array.isRequired,
      total:   PropTypes.number.isRequired,
      page:    PropTypes.number.isRequired,
      perPage: PropTypes.number.isRequired,
      index:   PropTypes.func.isRequired,
      create:  PropTypes.func.isRequired,
      update:  PropTypes.func.isRequired,
      destroy: PropTypes.func.isRequired,
    };
  }
  render() {
    return (
      <Table
        schema={schema}
        tableSchema={tableSchema}
        formSchema={formSchema}
        items={this.props.items}
        page={this.props.page}
        perPage={this.props.perPage}
        pageCount={this.props.total / 10}
        onPageChange={this.props.index}
        onCreate={this.props.create}
        onUpdate={this.props.update}
        onDestroy={this.props.destroy}
      />
    );
  }
}

function mapStateToProps(state) {
  const query   = new URLSearchParams(state.router.location.search);
  const page    = parseInt(query.get('page'), 10) || 0;
  const perPage = parseInt(query.get('per_page'), 10) || defaultPerPage;
  return {
    item:  state.track.item,
    items: state.track.items,
    total: state.track.total,
    page,
    perPage,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    index: (page, perPage) => {
      const params = new URLSearchParams();
      params.append('page', page);
      params.append('per_page', perPage);
      dispatch(push({
        pathname: '/tracks',
        search:   params.toString(),
      }));
    },
    create:  item => dispatch(create.start(item)),
    update:  item => dispatch(update.start(item)),
    destroy: item => dispatch(destroy.start(item)),
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TrackList));

