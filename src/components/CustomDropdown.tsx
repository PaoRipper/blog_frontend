import { IconDefinition, SizeProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

enum EDropdown {
  DROPDOWN = "dropdown",
  DROPUP = "dropup",
  DROPSTART = "dropstart",
  DROPEND = "dropend",
}

const CustomDropdown = (props: {
  dropdownItems: string[];
  currentValue?: string;
  arrow?: boolean;
  onClick?: (...params: any) => void;
  type?: keyof typeof EDropdown;
  btnClassName?: string;
  icon?: {
    icon: IconDefinition;
    className?: string;
    size?: SizeProp;
  };
  className?: string;
}) => {
  return (
    <div
      className={`${props.type ? EDropdown[props.type] : EDropdown.DROPDOWN} ${
        props.className ? props.className : ""
      }`}
    >
      <button
        className={`${props.btnClassName ? props.btnClassName : ""} ${
          props.arrow ? "btn btn-md dropdown-toggle" : ""
        }`}
        type="button"
        id="drop-toggle"
        data-bs-toggle="dropdown"
        aria-expanded="true"
      >
        {props.currentValue ? props.currentValue : ""}{" "}
        {props.icon ? (
          <FontAwesomeIcon
            icon={props.icon.icon}
            size={props.icon.size || "lg"}
            className={`${props.icon.className ? props.icon.className : ""}`}
            onClick={(e: any) => e.preventDefault()}
          />
        ) : (
          ""
        )}
      </button>
      <ul className="dropdown-menu" aria-labelledby="drop-toggle">
        {props.dropdownItems.map((item) => (
          <li key={item}>
            <a className="dropdown-item" href="#" onClick={props.onClick && props.onClick}>
              {item}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CustomDropdown;
