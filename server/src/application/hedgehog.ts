import { getPool } from "@server/db";
import { logger } from "@server/logging";
import { Hedgehog, hedgehogSchema } from "@shared/hedgehog";
import { sql } from "slonik";

export async function getAllHedgehogs() {
  try {
    const hedgehogs = await getPool().any(
      sql.type(hedgehogSchema)`SELECT id, name FROM hedgehog`
    );

    return hedgehogs;
  } catch (error) {
    logger.error(error);
  }
}

// TODO: Yksittäisen siilin hakeminen tietokannasta ID:llä
export async function getHedgehogById(id: number) {
  try {
    const hedgehog = await getPool().maybeOne(sql.type(hedgehogSchema)`
      SELECT id, name, age, gender,
      ARRAY[
        ST_X(coordinates),
        ST_Y(coordinates)
      ] AS coordinates
      FROM hedgehog
      WHERE id = ${id}
    `);

    return hedgehog;
  } catch (error) {
    throw error;
  }
}


// TODO: Yksittäisen siilin lisäämisen sovelluslogiikka
export async function addHedgehog(data: Hedgehog) {
  const { name, age, gender, coordinates } = data;
  logger.info(data)
  try {
    const result = await getPool().one(sql.type(hedgehogSchema)`
      INSERT INTO hedgehog (name, age, gender, coordinates)
      VALUES (
        ${name},
        ${age},
        ${gender},
        ST_SetSRID(ST_MakePoint(${coordinates[0]}, ${coordinates[1]}), 4326)
      )
      RETURNING id
    `);

    return result.id;
  } catch (error) {
    logger.error("Adding hedgehog failed:", error);
    throw error;
  }
}
