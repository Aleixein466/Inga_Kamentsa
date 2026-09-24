import { Router } from "express";
import { z } from "zod";
import { createFamiliaSchema, paginationSchema } from "../../lib/shared/validators";
import * as service from "./familias.service";

export const familiasRouter = Router();

// GET /api/familias
familiasRouter.get("/", async (req, res) => {
  try {
    const query = paginationSchema.parse(req.query);
    const result = await service.listFamilias({ q: query.q, page: query.page, pageSize: query.pageSize });
    res.json(result);
  } catch (e) {
    if (e instanceof z.ZodError) return res.status(400).json({ error: e.errors });
    console.error("[familias] list error", e);
    res.status(500).json({ error: "Error al listar familias" });
  }
});

// GET /api/familias/:id
familiasRouter.get("/:id", async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) return res.status(400).json({ error: "id inválido" });
  const familia = await service.getFamiliaById(id);
  if (!familia) return res.status(404).json({ error: "Familia no encontrada" });
  res.json(familia);
});

// POST /api/familias
familiasRouter.post("/", async (req, res) => {
  try {
    const parsed = createFamiliaSchema.parse(req.body);
    const nFamilia = (parsed.nFamilia ?? parsed.n_familia) as string;
    const created = await service.createFamilia(nFamilia);
    res.status(201).json(created);
  } catch (e) {
    if (e instanceof z.ZodError) return res.status(400).json({ error: e.errors });
    // Prisma unique constraint
    if (e && typeof e === "object" && "code" in e && (e as { code: string }).code === "P2002") {
      return res.status(409).json({ error: "n_familia ya existe" });
    }
    console.error("[familias] create error", e);
    res.status(500).json({ error: "Error al crear familia" });
  }
});

// PATCH /api/familias/:id
familiasRouter.patch("/:id", async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) return res.status(400).json({ error: "id inválido" });
  try {
    const parsed = createFamiliaSchema.partial().parse(req.body);
    const nFamilia = (parsed.nFamilia ?? parsed.n_familia) as string | undefined;
    if (!nFamilia) return res.status(400).json({ error: "n_familia requerido" });
    const updated = await service.updateFamilia(id, nFamilia);
    res.json(updated);
  } catch (e) {
    if (e instanceof z.ZodError) return res.status(400).json({ error: e.errors });
    console.error("[familias] update error", e);
    res.status(500).json({ error: "Error al actualizar familia" });
  }
});

// DELETE /api/familias/:id
familiasRouter.delete("/:id", async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) return res.status(400).json({ error: "id inválido" });
  try {
    await service.deleteFamilia(id);
    res.status(204).send();
  } catch (e) {
    console.error("[familias] delete error", e);
    res.status(500).json({ error: "Error al eliminar familia" });
  }
});
