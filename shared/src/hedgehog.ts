import { z } from "zod";

/**
 * Hedgehog interface shared between server and client
 */

export const hedgehogSchema = z.object({
  id: z.number(), // TODO: loput siilin tietomallista. Zod:lta löytyy esimerkiksi tällaisia tyyppejä: z.enum(), z.string(), z.number() jne. joita voi olla tarpeen hyödyntää
  name: z.string(),
  age: z.number(),
  gender: z.string(),
  coordinates: z.tuple([z.number(), z.number()])
});

export type Hedgehog = z.infer<typeof hedgehogSchema>;
