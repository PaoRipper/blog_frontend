import React from "react";


enum EDropdown {
  dropdown = "dropdown",
  dropup = "dropup"
}

const Dropdown = (props: {
  dropdownItems: string[];
  currentValue: string;
  onClick: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
}) => {
  return (
    <div className="dropdown profile-dropdown">
      <button
        className="btn btn-md dropdown-toggle"
        type="button"
        id="filter-post"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        {props.currentValue}
      </button>
      <ul className="dropdown-menu" aria-labelledby="filter-post">
        {props.dropdownItems.map((item) => (
          <li key={item}>
            <a className="dropdown-item" href="#" onClick={props.onClick}>
              {item}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dropdown;
