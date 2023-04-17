import { TSnow } from "@/pages";
import React, { Dispatch, SetStateAction } from "react";
import { debounce } from "lodash";

const SnowTools = (props: {
  snow: TSnow;
  setSnow: Dispatch<SetStateAction<TSnow>>;
}) => {
  const debouncedSetColor = debounce((colorValue: string) => {
    props.setSnow((prev) => ({ ...prev, color: colorValue }));
  }, 300);

  const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSetColor(event.target.value);
  };

  return (
    <div className="d-flex justify-content-center align-items-center">
      <span>Snow color:</span>
      <input
        type="color"
        onChange={(e) => handleColorChange(e)}
        className="snow-color-input"
        value={props.snow.color}
      />
      <button
        className="btn btn-sm btn-primary little-snow"
        onClick={() =>
          props.setSnow((prev) => ({ ...prev, snowflakeCount: 30 }))
        }
      >
        Little snow
      </button>
      <button
        className="btn btn-sm btn-danger heavy-snow"
        onClick={() =>
          props.setSnow((prev) => ({ ...prev, snowflakeCount: 150 }))
        }
      >
        Heavy snow
      </button>
      <div className="wind-setting">
        <label>Min wind: </label>
        <input
          className="min-wind-input"
          type="range"
          name="wind"
          min={0}
          max={10}
          onChange={(e) =>
            props.setSnow((prev) => ({
              ...prev,
              wind: [Number(e.target.value), prev.wind[1]],
            }))
          }
        />
        <label>Max wind: </label>
        <input
          className="max-wind-input"
          type="range"
          name="wind"
          min={0}
          max={10}
          onChange={(e) =>
            props.setSnow((prev) => ({
              ...prev,
              wind: [prev.wind[0], Number(e.target.value)],
            }))
          }
        />
      </div>
    </div>
  );
};

export default SnowTools;
