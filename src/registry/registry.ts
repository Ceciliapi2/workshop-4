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

const registeredNodes: Node[] = [];

export async function launchRegistry() {
  const _registry = express();
  _registry.use(express.json());
  _registry.use(bodyParser.json());
  const getNodeRegistryBody: GetNodeRegistryBody = { nodes: [] };


  // TODO implement the status route
  // _registry.get("/status", (req, res) => {});
  _registry.get("/status", (req, res) => {
    res.send("live");
  });

  // Question 3
  _registry.post("/registerNode", (req: Request, res: Response) => {
    const registerNodeBody = req.body as RegisterNodeBody;
    getNodeRegistryBody.nodes.push(registerNodeBody);
    res.status(200).json({result: "node registered"});
  });

  _registry.get("/getNodeRegistry", (req, res) => {
    res.status(200).json(getNodeRegistryBody);
  });


  const server = _registry.listen(REGISTRY_PORT, () => {
    console.log(`registry is listening on port ${REGISTRY_PORT}`);
  });

  return server;
}