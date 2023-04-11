import React, { RefObject } from "react";

import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CustomInput = (props: {
  icon: IconDefinition;
  name: string;
  type: string;
  label?: string;
  placeholder: string;
  arabLabel?: string;
  className?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {

  return (
    <div className="custom-input-group">
      <label className="input-label">{props.label || props.name}</label>
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
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => props.onChange(e)}
        />
      </div>
    </div>
  );
};

export default CustomInput;
