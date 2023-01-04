import { TokenType } from "./TokenTypes";

export type Token = {
  /**
   * Single specific token - part of text - which can be normalized.
   */
  text: string;
  normalized_text: string;
  type: keyof typeof TokenType;
  children: TokenArray;
  begin: number;
  end: number;
};

export type TokenArray = {
  /**
   * Workaround for creation of recursive type used in FieldArray.
   * Solution based on the following issue discussion:
   * https://github.com/react-hook-form/react-hook-form/issues/4055
   */
  [key: number]: Omit<Token, "">;
};
