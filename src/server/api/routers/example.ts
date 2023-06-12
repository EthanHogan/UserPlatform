import { z } from "zod";

import {
  createTRPCRouter,
  privateProcedure,
  publicProcedure,
} from "~/server/api/trpc";

import { example } from "drizzle/schema";
import { desc, eq } from "drizzle-orm";

// import { Ratelimit } from "@upstash/ratelimit"; // for deno: see above
// import { Redis } from "@upstash/redis";
// import { TRPCError } from "@trpc/server";

// Create a new ratelimiter, that allows 3 requests per 1 minute
// const createExampleRateLimit = new Ratelimit({
//   redis: Redis.fromEnv(),
//   limiter: Ratelimit.slidingWindow(3, "1 m"),
//   analytics: true,
//   /**
//    * Optional prefix for the keys used in redis. This is useful if you want to share a redis
//    * instance with other applications and want to avoid key collisions. The default prefix is
//    * "@upstash/ratelimit"
//    */
//   prefix: "@upstash/ratelimit",
// });

export const exampleRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),
  helloPrivateAndRateLimitedExample: privateProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),
  getAll: publicProcedure.query(async ({ ctx }) => {
    const data = await ctx.dbPool.select().from(example);
    return data;
  }),
  getRecentRecords: publicProcedure
    .input(z.object({ n: z.number() }))
    .query(async ({ ctx, input }) => {
      const data = await ctx.dbPool
        .select()
        .from(example)
        .orderBy(desc(example.createdAt))
        .limit(input.n);
      return data;
    }),
  create: privateProcedure
    .input(
      z.object({
        content: z.string().min(1).max(280),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.userId;

      // const { success } = await createExampleRateLimit.limit(userId);

      // if (!success) throw new TRPCError({ code: "TOO_MANY_REQUESTS" });

      const insertResult = await ctx.dbPool
        .insert(example)
        .values({ message: input.content, userId: userId });

      const newExampleId = insertResult[0].insertId;

      const newExample = await ctx.db.query.example.findFirst({
        where: eq(example.id, newExampleId),
      });

      return newExample;
    }),
});
