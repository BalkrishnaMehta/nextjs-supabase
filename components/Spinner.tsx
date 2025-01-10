import React from "react";

interface SpinnerProps {
  size?: string;
  color?: string;
  borderThickness?: string;
  classes?: string;
}

const Spinner: React.FC<SpinnerProps> = ({
  size = "40px",
  color = "#3498db",
  borderThickness = "4px",
  classes,
}) => {
  return (
    <div
      className={`${classes} rounded-full animate-spin`}
      style={{
        width: size,
        height: size,
        borderWidth: borderThickness,
        borderStyle: "solid",
        borderColor: `${color} ${color} ${color} transparent`,
      }}
    />
  );
};

export default Spinner;
