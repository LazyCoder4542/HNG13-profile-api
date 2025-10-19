import fs from "fs";
import http from "http";
import https from "https";

import app from "@/app";

const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;

if (process.env.NODE_ENV === "production") {
  // In production, prefer TLS termination at a reverse proxy (nginx, cloud load balancer)
  http.createServer(app).listen(PORT, () => {
    console.log(`Server (HTTP) running on port ${PORT.toString()}`);
  });
} else {
  // Development HTTPS with self-signed certs (certs/server.crt, certs/server.key)
  const key = fs.readFileSync("./.certs/server.key");
  const cert = fs.readFileSync("./.certs/server.crt");
  https.createServer({ cert, key }, app).listen(PORT, () => {
    console.log(`Server (HTTPS dev) running on port ${PORT.toString()}`);
  });
}
