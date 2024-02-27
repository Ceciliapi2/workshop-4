import bodyParser from "body-parser";
import express, { Request, Response } from "express";
import { REGISTRY_PORT } from "../config";

export type Node = { nodeId: number; pubKey: string };

export type RegisterNodeBody = {
  nodeId: number;
  pubKey: string;
};

export type GetNodeRegistryBody = {
  nodes: Node[];
};

export async function launchRegistry() {
  const _registry = express();
  _registry.use(express.json());
  _registry.use(bodyParser.json());

  // TODO implement the status route
  // _registry.get("/status", (req, res) => {});
  _registry.get("/status", (req, res) => {
    res.send("live");
  });

  // In-memory registry to store registered nodes
  const registeredNodes = [];
  // Define a route for POST /registerNode

  _registry.post('/registerNode', (req, res) => {
  // Extract the necessary information from the request body
  const { nodeID, ipAddress, port } = req.body;

  // Validate the required fields
  if (!nodeID || !ipAddress || !port) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // Register the node by adding it to the registry
  const newNode = { nodeID, ipAddress, port };
  registeredNodes.push(newNode)})

  const server = _registry.listen(REGISTRY_PORT, () => {
    console.log(`registry is listening on port ${REGISTRY_PORT}`);
  });

  return server;
}