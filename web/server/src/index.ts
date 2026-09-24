import "dotenv/config";
import express from "express";
import cors from "cors";
import { prisma } from "./lib/prisma";
import { eventosRouter } from "./features/eventos/eventos.router";
import { familiasRouter } from "./features/familias/familias.router";
import { catalogosRouter } from "./features/catalogos/catalogos.router";

const app = express();
const PORT = Number(process.env.PORT) || 4000;
const CORS_ORIGIN = process.env.CORS_ORIGIN || "http://localhost:3000";

app.use(cors({ origin: CORS_ORIGIN, credentials: true }));
app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: true }));

// Health — usado por frontend y orquestadores
app.get("/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString(), uptime: process.uptime() });
});

// API routes — espejo de providers legacy (ahora MySQL via Prisma)
app.use("/api/eventos", eventosRouter);
app.use("/api/familias", familiasRouter);
app.use("/api/catalogos", catalogosRouter);

// 404
app.use((_req, res) => res.status(404).json({ error: "Not found" }));

// Error handler
app.use((err: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error("[server] unhandled error", err);
  res.status(500).json({ error: "Internal server error" });
});

async function main() {
  try {
    await prisma.$connect();
    console.log("[server] Prisma conectado a MySQL");
  } catch (e) {
    console.warn("[server] Prisma no pudo conectar (¿DATABASE_URL o MySQL no disponible?). El servidor arranca igual.", e);
  }

  app.listen(PORT, () => {
    console.log(`[server] Inga Kamentsa API escuchando en http://localhost:${PORT}`);
    console.log(`[server] CORS origin: ${CORS_ORIGIN}`);
    console.log(`[server] Health: http://localhost:${PORT}/health`);
  });
}

main().catch((e) => {
  console.error("[server] fatal", e);
  process.exit(1);
});

// Graceful shutdown
process.on("SIGINT", async () => {
  await prisma.$disconnect();
  process.exit(0);
});
process.on("SIGTERM", async () => {
  await prisma.$disconnect();
  process.exit(0);
});

export default app;
