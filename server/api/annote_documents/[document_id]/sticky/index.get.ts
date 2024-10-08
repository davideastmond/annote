import { serverSupabaseUser } from "#supabase/server";
import { StickyDbClient } from "~/server/utils/database/sticky-db-client/sticky-db-client";
import type { ApiResponse } from "~/types/api-response/api-response";
import type { Sticky } from "~/types/sticky/sticky-types";

export default defineEventHandler<Promise<ApiResponse<Sticky[]>>>(
  async (event) => {
    // Endpoint to get all stickies for a document by document_id
    const document_id = getRouterParam(event, "document_id");

    const user = await serverSupabaseUser(event);
    if (!user) {
      setResponseStatus(event, 401);
      return {
        status: "fail",
        error: createError({
          statusCode: 401,
          statusMessage: "Unauthorized",
        }),
      };
    }

    try {
      const client = new StickyDbClient();
      const stickies = await client.getAllStickiesByDocumentId(document_id!);

      return {
        status: "ok",
        data: stickies,
      };
    } catch (error: any) {
      setResponseStatus(event, 500);
      return {
        status: "fail",
        error: createError({
          statusCode: 500,
          statusMessage: error.message,
        }),
      };
    }
  }
);
