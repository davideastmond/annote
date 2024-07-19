import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { AnnoteDocument } from "~~/types/annote-document/annote-document";

// When we start dealing with the user table, I think we can refactor this to inherit from a base class?
export class AnnoteDocumentDbClient {
  private client: SupabaseClient;
  private readonly TABLE_NAME = "annote_document";

  constructor() {
    this.client = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_KEY!
    );
  }

  public async insertDocument(
    document: Partial<AnnoteDocument>
  ): Promise<void> {
    const { error } = await this.client.from(this.TABLE_NAME).insert(document);

    if (error) throw new Error(error.message);
  }

  public async getAllDocuments(): Promise<AnnoteDocument[]> {
    // TODO: Implement pagination
    // TODO: Once we have user authentication, we should only return documents that belong to the user

    const { data, error } = await this.client.from(this.TABLE_NAME).select("*");

    if (error) throw new Error(error.message);

    return data || [];
  }

  public async getDocumentById(id: number): Promise<AnnoteDocument | null> {
    const { data, error } = await this.client
      .from(this.TABLE_NAME)
      .select("*")
      .eq("document_id", id);

    if (error) throw new Error(error.message);

    return data?.[0] || null;
  }
}