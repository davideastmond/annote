import { serverSupabaseUser } from "#supabase/server";
import { AnnoteDocumentDbClient } from "~/server/utils/database/annote-document-db-client/annote-document-db-client";
import type { AnnoteDocument } from "~/types/annote-document/annote-document";
import type { ApiResponse } from "~/types/api-response/api-response";

export default defineEventHandler<Promise<ApiResponse<AnnoteDocument>>>(
  async (event) => {
    // `/api/annote_documents/:document_id`; GET an annote document by ID
    // TODO: the route parameter should be validated

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
    const document_id = getRouterParam(event, "document_id");

    const dbClient = new AnnoteDocumentDbClient();
    const apiResponse = {} as ApiResponse<AnnoteDocument>;
    const annoteDocument = await dbClient.getDocumentById(
      user.id,
      document_id!
    );
    if (!annoteDocument) {
      // If no document is found, return a 404
      setResponseStatus(event, 404);
      apiResponse.status = "fail";
      apiResponse.error = createError({
        statusCode: 404,
        statusMessage: `Document with ID ${document_id} not found`,
      });
      return apiResponse;
    }

    // Calculate privacy
    if (
      annoteDocument.visibility === "private" &&
      annoteDocument.user_id !== user.id
    ) {
      setResponseStatus(event, 403);
      apiResponse.status = "fail";
      apiResponse.error = createError({
        statusCode: 403,
        statusMessage: "Forbidden",
      });
      return apiResponse;
    }
    return { status: "ok", data: annoteDocument };
  }
);
