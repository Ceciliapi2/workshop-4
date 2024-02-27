export const REGISTRY_PORT = 8080;
export const BASE_ONION_ROUTER_PORT = 4000;
export const BASE_USER_PORT = 3000;

import express from "express";
import bodyParser from "body-parser";

export async function registry() {
  const registry = express();
  registry.use(express.json());
  registry.use(bodyParser.json());

  registry.get("/status", (req, res) => {
    res.send("live");
  });

  const server = registry.listen(BASE_ONION_ROUTER_PORT, () => {
    console.log(`Registry is listening on port ${BASE_ONION_ROUTER_PORT}`);
  });

  return server;
}