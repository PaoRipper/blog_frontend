import React from "react";

import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CustomInput = (props: {
  icon: IconDefinition;
  name: string;
  type: string;
  placeholder: string;
  arabLabel?: string;
  className?: string;
}) => {
  return (
    <div className="custom-input-group">
      <label className="input-label">{props.name}</label>
      <div className="input-group mb-3">
        <div className="input-group-prepend">
          <span className="input-group-text h-100">
            <FontAwesomeIcon icon={props.icon} />
          </span>
        </div>
        <input
          type={props.type}
          name={props.name}
          className={`form-control ${props.className ? props.className : ""}`}
          placeholder={props.placeholder}
          aria-label={props.arabLabel}
        />
      </div>
    </div>
  );
};

export default CustomInput;
