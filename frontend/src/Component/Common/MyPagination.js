import React, { useState } from 'react';
import './scss/MyPagination.scss';
import Pagination from 'react-js-pagination';

const MyPagination = (props) => {
  const [page, setPage] = useState(1);

  const handlePageChange = (number) => {
    setPage(number);
    props.parentsFunc(number);
  };

  return (
    <Pagination
      activePage={page}
      itemsCountPerPage={1}
      totalItemsCount={props.pageTotal / 12}
      pageRangeDisplayed={5}
      prevPageText="‹"
      nextPageText="›"
      onChange={handlePageChange}
    />
  );
};

export default MyPagination;
