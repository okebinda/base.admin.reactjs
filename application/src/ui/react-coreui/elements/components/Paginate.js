import React, {Component} from 'react';
import {NavLink as RRNavLink} from 'react-router-dom';
import {Pagination, PaginationItem, PaginationLink} from 'reactstrap';

import Logger from '../../../../lib/Logger';
import {pathTo} from '../../Routes';

class Paginate extends Component {

  static defaultProps = {
    page: 1,
    total: 0,
    limit: 10,
    window: null
  }

  pageButtons = () => {
    let output = [];
    const pageCount = Math.ceil(this.props.total/this.props.limit);

    const startPage = this.props.window && pageCount > this.props.window
      ? Math.min(Math.max(this.props.page - Math.floor(this.props.window / 2), 1), pageCount - this.props.window + 1)
      : 1; 
    const endPage = this.props.window && pageCount > this.props.window
      ? Math.max(Math.min(this.props.page + Math.floor(this.props.window / 2), pageCount), this.props.window)
      : pageCount; 

    // previous button
    output.push(<PaginationItem key={0} disabled={startPage === this.props.page}>
      <PaginationLink previous to={pathTo(this.props.component, {page: this.props.page - 1})} tag={RRNavLink} value={this.props.page - 1} />
    </PaginationItem>);

    // page buttons
    let k = 1;
    for (let i = startPage; i <= endPage; i++) {
      output.push(<PaginationItem key={k} active={i === this.props.page}>
        <PaginationLink to={pathTo(this.props.component, {page: i})} tag={RRNavLink} key={i} value={i}>
          {i}
        </PaginationLink>
      </PaginationItem>);
      k++;
    }

    // next button
    output.push(<PaginationItem key={output.length} disabled={endPage === this.props.page}>
      <PaginationLink next to={pathTo(this.props.component, {page: this.props.page + 1})} tag={RRNavLink} value={this.props.page + 1} />
    </PaginationItem>);

    return output;
  }

  render() {
    let output = Math.ceil(this.props.total/this.props.limit) > 1 
      ? <Pagination>
          {this.pageButtons()}
        </Pagination>
      : null;

    return (
      <div>{output}</div>
    )
  }

  /* LIFECYCLE EVENTS */

  componentDidMount() {
    Logger.log('silly', `Paginate.componentDidMount()`);
  }

  componentDidUpdate() {
    Logger.log('silly', `Paginate.componentDidUpdate()`);
  }

  componentWillUnmount() {
    Logger.log('silly', `Paginate.componentWillUnmount()`);
  }
}

export default Paginate;

Logger.log('silly', `Paginate loaded.`);
