import { Router } from "express";
import { catalogoModels, listCatalogo, getCatalogoById, type CatalogoKey } from "./catalogos.service";

export const catalogosRouter = Router();

const allowed: CatalogoKey[] = Object.keys(catalogoModels) as CatalogoKey[];

// GET /api/catalogos/:tipo?q=
// :tipo ∈ zonas | localidades | tiposIdentificacion | tiposParentesco | tiposGenero | tiposEstadoCivil | tiposEscolaridad | tiposProfesion
catalogosRouter.get("/:tipo", async (req, res) => {
  const tipo = req.params.tipo as CatalogoKey;
  if (!allowed.includes(tipo)) {
    return res.status(400).json({ error: `tipo inválido. Permitidos: ${allowed.join(", ")}` });
  }
  try {
    const q = typeof req.query.q === "string" ? req.query.q : undefined;
    const data = await listCatalogo(tipo, q);
    res.json({ data, tipo });
  } catch (e) {
    console.error(`[catalogos] list ${tipo} error`, e);
    res.status(500).json({ error: `Error al listar ${tipo}` });
  }
});

catalogosRouter.get("/:tipo/:id", async (req, res) => {
  const tipo = req.params.tipo as CatalogoKey;
  if (!allowed.includes(tipo)) return res.status(400).json({ error: "tipo inválido" });
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) return res.status(400).json({ error: "id inválido" });
  const item = await getCatalogoById(tipo, id);
  if (!item) return res.status(404).json({ error: "No encontrado" });
  res.json(item);
});
