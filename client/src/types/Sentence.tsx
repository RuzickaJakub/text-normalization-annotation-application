import { SentenceState } from "./SentenceState";
import { Token } from "./Token";

export type Sentence = {
  /**
   * Single annotation data.
   */
  dataset_name: string;
  sentence_id: string;
  sentence_state: keyof typeof SentenceState;
  original_sentence: string;
  normalized_sentence: string;
  tokens: Token[];
};
