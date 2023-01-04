import { TokenType } from "../types/TokenTypes";

export function getTokenTypeColor(token_type: keyof typeof TokenType) {
  /**
   * Function for assigning color based on the Token Type.
   * The intended usecase is hightlighting different Token Type
   * while presenting.
   */
  let color: string;
  let value: TokenType = TokenType[token_type];
  switch (value) {
    case TokenType.Cardinal:
      color = "DodgerBlue";
      break;
    case TokenType.Ordinal:
      color = "Red";
      break;
    case TokenType.Decimal:
      color = "ForestGreen";
      break;
    case TokenType.DigitSequence:
      color = "Bisque";
      break;
    case TokenType.Date:
      color = "BlueViolet";
      break;
    case TokenType.Time:
      color = "Brown";
      break;
    case TokenType.Measure:
      color = "BurlyWood";
      break;
    case TokenType.Money:
      color = "CadetBlue";
      break;
    case TokenType.Roman:
      color = "Chartreuse";
      break;
    case TokenType.Telephone:
      color = "CornflowerBlue";
      break;
    case TokenType.Score:
      color = "DarkOrange";
      break;
    case TokenType.WithSuffix:
      color = "DarkSalmon";
      break;
    case TokenType.Identifier:
      color = "DeepSkyBlue";
      break;
    case TokenType.Mixed:
      color = "Fuchsia";
      break;
    case TokenType.Range:
      color = "FireBrick";
      break;
    case TokenType.Math:
      color = "Gold";
      break;
    case TokenType.Chemistry:
      color = "GreenYellow";
      break;
    case TokenType.Abbreviation:
      color = "Indigo";
      break;
    case TokenType.Acronym:
      color = "Lime";
      break;
    case TokenType.URL:
      color = "MediumSlateBlue";
      break;
    case TokenType.Email:
      color = "Orange";
      break;
    case TokenType.Pathname:
      color = "OrangeRed";
      break;
    case TokenType.Ignored:
      color = "Olive";
      break;
    case TokenType.Verbatim:
      color = "Tan";
      break;
    case TokenType.Other:
      color = "Plum";
      break;
    // Parts of numbers
    // case TokenType.Day:
    //   color = "Violet";
    //   break;
    // case TokenType.Month:
    //   color = "Tomato";
    //   break;
    // case TokenType.Year:
    //   color = "Turquoise";
    //   break;
    // case TokenType.Second:
    //   color = "Silver";
    //   break;
    // case TokenType.Minute:
    //   color = "Aqua";
    //   break;
    // case TokenType.Hour:
    //   color = "Teal";
    //   break;
    // case TokenType.Unit:
    //   color = "SlateGrey";
    //   break;
    // case TokenType.Currency:
    //   color = "SteelBlue";
    //   break;
    default:
      color = "Black";
  }
  return color;
}
