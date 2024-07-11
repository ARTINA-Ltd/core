import React, { useCallback } from "react";
import ReactFlow, { Controls, Handle } from "reactflow";

import "reactflow/dist/style.css";

const initialNodes = [
  { id: "1", position: { x: 0, y: 500 }, data: { label: "Whats NFT?" }, type: "circleNode" },
  { id: "2", position: { x: 150, y: 150 }, data: { label: "Create an NFT" }, type: "circleNode" },
  { id: "3", position: { x: 350, y: 200 }, data: { label: "Artina's Nft Minting" }, type: "circleNode" },
  { id: "4", position: { x: 500, y: 350 }, data: { label: "Monetization with NFT" }, type: "circleNode" },
  { id: "5", position: { x: 650, y: 600 }, data: { label: "Advertise your NFT" }, type: "circleNode" },
  { id: "6", position: { x: 850, y: 450 }, data: { label: "Sell NFT" }, type: "circleNode" },
  { id: "7", position: { x: 1050, y: 650 }, data: { label: "Gain Money" }, type: "circleNode" },
];

const initialEdges = [
  { type: "bezier", id: "e1-2", source: "1", target: "2" },
  { id: "e2-3", source: "2", target: "3" },
  { id: "e3-4", source: "3", target: "4" },
  { id: "e4-5", source: "4", target: "5" },
  { id: "e5-6", source: "5", target: "6" },
  { id: "e6-7", source: "6", target: "7" },
];

const CircleNode = ({ id, data }) => (
  <div
    className="bg-primary text-primary-content hover:cursor-pointer"
    style={{
      borderRadius: "50%",
      padding: "20px",
      textAlign: "center",
      width: "100px",
      height: "100px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      border: "1px solid #000",
      position: "relative",
    }}
  >
    {data.label}
    {id !== "1" && <Handle type="target" position="left" id="left" style={{ width: "0", height: "0" }} />}
    {id !== "7" && <Handle type="source" position="right" id="right" style={{}} />}
  </div>
);

const nodeTypes = {
  circleNode: CircleNode,
};

const FlowComponent = () => {
  const onNodesChange = useCallback(() => {}, []);
  const onEdgesChange = useCallback(() => {}, []);
  const onConnect = useCallback(() => {}, []);

  return (
    <div style={{ height: 500 }} className="bg-neutral w-[80vw] mx-auto rounded-md p-2 ">
      <ReactFlow className="hover:cursor-default" nodes={initialNodes} edges={initialEdges} onNodesChange={onNodesChange} onEdgesChange={onEdgesChange} onConnect={onConnect} nodeTypes={nodeTypes} fitView>
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default FlowComponent;
