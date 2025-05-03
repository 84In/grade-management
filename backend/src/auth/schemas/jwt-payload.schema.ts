import { z } from 'zod';

export const JwtPayloadSchema = z.object({
  exp: z.number(),
});

export type JwtPayload = z.infer<typeof JwtPayloadSchema>;
