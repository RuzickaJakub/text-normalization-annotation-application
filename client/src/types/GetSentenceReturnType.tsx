import { Sentence } from "./Sentence";

export type GetSentenceReturnType = {
  /**
   * Single annotation data.
   */
  success: boolean;
  errors: string[];
  sentence: Sentence;
};
