// export enum TokenType {
//   /**
//    * Enumeration of all supported semiotic classes.
//    * Inspiration taken from:
//    * Van Esch, D., & Sproat, R. (2017). An Expanded Taxonomy of Semiotic Classes for Text Normalization. In INTERSPEECH (pp. 4016-4020).
//    */

//   // Base
//   Cardinal = "CARDINAL",
//   Ordinal = "ORDINAL",
//   Decimal = "DECIMAL",
//   DigitSequence = "DIGIT SEQUENCE",
//   Date = "DATE",
//   Time = "TIME",
//   Measure = "MEASURE",
//   Money = "MONEY",
//   Roman = "ROMAN",
//   Telephone = "TELEPHONE",
//   Score = "SCORE",
//   WithSuffix = "WITH SUFFIX",
//   Identifier = "IDENTIFIER",
//   Mixed = "MIXED",
//   Range = "RANGE",
//   Math = "MATH",
//   Chemistry = "CHEMISTRY",
//   Abbreviation = "ABBREVIATION",
//   Acronym = "ACRONYM",
//   URL = "URL",
//   Email = "EMAIL",
//   Pathname = "PATHNAME",
//   Ignored = "IGNORED",
//   Verbatim = "VERBATIM",
//   Other = "OTHER",
//   // Parts of the above
//   Day = "DAY",
//   Month = "MONTH",
//   Year = "YEAR",
//   Second = "SECOND",
//   Minute = "MINUTE",
//   Hour = "HOUR",
//   Unit = "UNIT",
//   Currency = "CURRENCY",
// }

export enum TokenType {
  /**
   * Enumeration of all supported semiotic classes.
   * Inspiration taken from:
   * Van Esch, D., & Sproat, R. (2017). An Expanded Taxonomy of Semiotic Classes for Text Normalization. In INTERSPEECH (pp. 4016-4020).
   */

  // Base
  Cardinal = "ZÁKLADNÍ ČÍSLOVKA",
  Ordinal = "ŘADOVÁ ČÍSLOVKA",
  Decimal = "DESETINNÉ ČÍSLO",
  DigitSequence = "SEKVENCE ČÍSLIC",
  Date = "DATUM",
  Time = "ČAS",
  Measure = "MÍRA",
  Money = "PENÍZE",
  Roman = "ŘÍMSKÁ ČÍSLOVKA",
  Telephone = "TELEFONNÍ ČÍSLO",
  Score = "SKÓRE",
  WithSuffix = "S PŘÍPONOU",
  Identifier = "IDENTIFIKÁTOR",
  Mixed = "SMÍŠENÉ",
  Range = "ROZSAH",
  Math = "MATEMATICKÝ VÝRAZ",
  Chemistry = "CHEMICKÝ VÝRAZ",
  Abbreviation = "ZKRATKA",
  Acronym = "AKRONYM",
  URL = "URL",
  Email = "EMAIL",
  Pathname = "ADRESÁŘOVÁ CESTA",
  Ignored = "IGNOROVAT",
  Verbatim = "NÁZEV SYMBOLU",
  Other = "JINÝ",
  // Parts of the above
  // Day = "DEN",
  // Month = "MĚSÍC",
  // Year = "ROK",
  // Second = "SEKUNDA",
  // Minute = "MINUTA",
  // Hour = "HODINA",
  // Unit = "JEDNOTKA",
  // Currency = "MĚNA",
}
