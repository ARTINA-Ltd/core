import React, { useState } from "react";
import ReactFlow, { Controls, Handle } from "reactflow";
import "reactflow/dist/style.css";
import CustomEdge from "./CustomEdge";
import "./style.css";

const initialNodes = [
  { id: "1", position: { x: 0, y: 300 }, data: { label: "Whats NFT?" }, type: "circleNode" },
  { id: "2", position: { x: 100, y: 50 }, data: { label: "Create an NFT" }, type: "circleNode" },
  { id: "3", position: { x: 220, y: 75 }, data: { label: "Artina's Nft Minting" }, type: "circleNode" },
  { id: "4", position: { x: 400, y: 200 }, data: { label: "Monetization with NFT" }, type: "circleNode" },
  { id: "5", position: { x: 500, y: 400 }, data: { label: "Advertise your NFT" }, type: "circleNode" },
  { id: "6", position: { x: 600, y: 50 }, data: { label: "Sell NFT" }, type: "circleNode" },
  { id: "7", position: { x: 700, y: 450 }, data: { label: "Gain Money" }, type: "circleNode" },
];

const initialEdges = [
  { id: "e1-2", source: "1", target: "2", type: "customEdge" },
  { id: "e2-3", source: "2", target: "3", type: "customEdge" },
  { id: "e3-4", source: "3", target: "4", type: "customEdge" },
  { id: "e4-5", source: "4", target: "5", type: "customEdge" },
  { id: "e5-6", source: "5", target: "6", type: "customEdge" },
  { id: "e6-7", source: "6", target: "7", type: "customEdge" },
];

const CircleNode = ({ id, data }) => (
  <div
    className="bg-primary text-primary-content rounded-full p-5 text-center relative box"
    style={{
      width: "50px",
      height: "50px",
      fontSize: "6px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: "50%",
    }}
  >
    {" "}
    {data.label}
    {id !== "1" && <Handle type="target" position="left" id="left" className="absolute left-0 top-1/2 transform -translate-y-1/2" style={{ width: "10px", height: "10px", background: "#000" }} />}
    {id !== "7" && <Handle type="source" position="right" id="right" className="absolute right-0 top-1/2 transform -translate-y-1/2" style={{ width: "10px", height: "10px", background: "#000" }} />}
  </div>
);

const nodeTypes = {
  circleNode: CircleNode,
};

const edgeTypes = {
  customEdge: CustomEdge,
};

const FlowComponent = () => {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  return (
    <div className=" w-[80vw] mx-auto my-12" style={{ height: "80vh" }}>
      <h1 className="mx-auto text-6xl text-center w-full">کاوش</h1>
      <ReactFlow nodes={nodes} edges={edges} nodeTypes={nodeTypes} edgeTypes={edgeTypes} zoomOnScroll={false} zoomOnPinch={false} zoomOnDoubleClick={false} fitView>
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default FlowComponent;
