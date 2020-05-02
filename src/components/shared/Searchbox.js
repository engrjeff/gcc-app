import React from "react";

const Searchbox = () => {
  return (
    <div className="search-box__container">
      <div className="search-box__input-group">
        <input type="text" placeholder="Search" className="search-box__input" />
        <span className="search-box__icon fas fa-search"></span>
        <button className="btn btn-primary btn-search">Search</button>
      </div>
    </div>
  );
};

export default Searchbox;
