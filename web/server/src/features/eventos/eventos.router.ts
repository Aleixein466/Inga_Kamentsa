import { Router } from "express";
import { z } from "zod";
import { createEventoSchema, updateEventoSchema, paginationSchema } from "../../lib/shared/validators";
import * as service from "./eventos.service";

export const eventosRouter = Router();

// GET /api/eventos?q=&soloFavoritos=&page=&pageSize=
eventosRouter.get("/", async (req, res) => {
  try {
    const query = paginationSchema.parse(req.query);
    const result = await service.listEventos({
      q: query.q,
      soloFavoritos: query.soloFavoritos,
      page: query.page,
      pageSize: query.pageSize,
    });
    res.json(result);
  } catch (e) {
    if (e instanceof z.ZodError) return res.status(400).json({ error: e.errors });
    console.error("[eventos] list error", e);
    res.status(500).json({ error: "Error al listar eventos" });
  }
});

// GET /api/eventos/:id
eventosRouter.get("/:id", async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) return res.status(400).json({ error: "id inválido" });
  const evento = await service.getEventoById(id);
  if (!evento) return res.status(404).json({ error: "Evento no encontrado" });
  res.json(evento);
});

// POST /api/eventos
eventosRouter.post("/", async (req, res) => {
  try {
    const parsed = createEventoSchema.parse(req.body);
    const data = {
      nombre: parsed.nombre,
      descripcion: parsed.descripcion ?? null,
      imagen: parsed.imagen ?? null,
      fechaInicio: (parsed.fechaInicio ?? parsed.fecha_inicio) as Date,
      fechaFin: (parsed.fechaFin ?? parsed.fecha_fin) as Date,
      esFavorito: parsed.esFavorito ?? parsed.es_favorito ?? false,
    };
    if (data.fechaFin < data.fechaInicio) {
      return res.status(400).json({ error: "fecha_fin debe ser >= fecha_inicio" });
    }
    const created = await service.createEvento(data);
    res.status(201).json(created);
  } catch (e) {
    if (e instanceof z.ZodError) return res.status(400).json({ error: e.errors });
    console.error("[eventos] create error", e);
    res.status(500).json({ error: "Error al crear evento" });
  }
});

// PATCH /api/eventos/:id
eventosRouter.patch("/:id", async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) return res.status(400).json({ error: "id inválido" });
  try {
    const parsed = updateEventoSchema.parse(req.body);
    const data: Record<string, unknown> = {};
    if (parsed.nombre !== undefined) data["nombre"] = parsed.nombre;
    if (parsed.descripcion !== undefined) data["descripcion"] = parsed.descripcion;
    if (parsed.imagen !== undefined) data["imagen"] = parsed.imagen;
    if (parsed.fechaInicio ?? parsed.fecha_inicio) data["fechaInicio"] = (parsed.fechaInicio ?? parsed.fecha_inicio) as Date;
    if (parsed.fechaFin ?? parsed.fecha_fin) data["fechaFin"] = (parsed.fechaFin ?? parsed.fecha_fin) as Date;
    if (parsed.esFavorito ?? parsed.es_favorito) data["esFavorito"] = parsed.esFavorito ?? parsed.es_favorito;
    const updated = await service.updateEvento(id, data as Parameters<typeof service.updateEvento>[1]);
    res.json(updated);
  } catch (e) {
    if (e instanceof z.ZodError) return res.status(400).json({ error: e.errors });
    console.error("[eventos] update error", e);
    res.status(500).json({ error: "Error al actualizar evento" });
  }
});

// DELETE /api/eventos/:id
eventosRouter.delete("/:id", async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) return res.status(400).json({ error: "id inválido" });
  try {
    await service.deleteEvento(id);
    res.status(204).send();
  } catch (e) {
    console.error("[eventos] delete error", e);
    res.status(500).json({ error: "Error al eliminar evento" });
  }
});
