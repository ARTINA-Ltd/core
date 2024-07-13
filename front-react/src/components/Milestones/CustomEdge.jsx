import React, { Fragment } from "react";
import { getBezierPath } from "reactflow";
import "./style.css";

const CustomEdge = ({ id, sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition, style = {} }) => {
  const edgePath = getBezierPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
  });

  return (
    <Fragment>
      <path id={id} className="react-flow__edge-path" d={edgePath} style={style} />
      <path id={`${id}-animated`} className="react-flow__edge-path animated-path" d={edgePath} style={style} />
    </Fragment>
  );
};

export default CustomEdge;
