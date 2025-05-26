import { addHedgehog, getAllHedgehogs, getHedgehogById } from "@server/application/hedgehog";
import { logger } from "@server/logging";
import { Hedgehog } from "@shared/hedgehog";
import { FastifyInstance, FastifyPluginOptions, FastifyRequest, FastifyReply } from "fastify";

export function hedgehogRouter(
  fastify: FastifyInstance,
  _opts: FastifyPluginOptions,
  done: () => void
) {
  fastify.get("/", async function (_request: FastifyRequest, reply: FastifyReply) {
    const hedgehogs = await getAllHedgehogs();

    return reply.code(200).send({
      hedgehogs,
    });
  });

  // TODO: Yksittäisen siilin hakeminen tietokannasta ID:llä
  fastify.get('/:id', async (req: FastifyRequest<{ Params: {id: string} }>, res) => {
    const id = Number(req.params.id);

  if (isNaN(id)) {
    return res.status(400).send({ error: 'Invalid ID' });
  }

  try {
    const hedgehog = await getHedgehogById(id);

    if (!hedgehog) {
      return res.status(404).send({ error: 'Hedgehog not found' });
    }

    return res.send(hedgehog);
  } catch (error) {
    // req.log.error(error);
    return res.status(500).send({ error: 'Server error' });
  }
  });

  
  // TODO: Yksittäisen siilin lisäämisen sovelluslogiikka
  fastify.post('/', async (req: FastifyRequest<{ Body: Hedgehog }>, res: FastifyReply) => {
    const id = await addHedgehog(req.body)
    return res.code(201).send({id})
  });

  done();
}
