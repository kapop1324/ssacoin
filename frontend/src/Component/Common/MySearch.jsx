import React, { useState } from 'react';
import './scss/MySearch.scss';
import { FcSearch } from 'react-icons/fc';

export default function MySearch(props) {
  const [value, setValue] = useState('');

  function change(e) {
    setValue(e.target.value);
  }

  const getSearch = async () => {
    // console.log(1);
    props.searchFunc(value);
  };
  return (
    <div className="search">
      <input type="text" placeholder="Search" value={value} onChange={change} />
      <FcSearch size="1.8rem" className="searchIcon" onClick={() => getSearch()} />
    </div>
  );
}
