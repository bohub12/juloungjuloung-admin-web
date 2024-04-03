import { UpdateProductRequestProductTypeEnum } from "@/apis";

// TODO : server에서 내려주도록 바꿀 것
export function resolveProductTypeName(productType: string): string {
  switch (productType) {
    case "BRACELET":
      return "팔찌";
    case "RING":
      return "반지";
    case "NECKLACE":
      return "목걸이";
    case "EARRING":
      return "귀걸이";
    default:
      throw new Error("Not supported productType");
  }
}

export function resolveProductTypeToUpdateProductTypeEnum(
  productType: string
): UpdateProductRequestProductTypeEnum {
  switch (productType) {
    case "BRACELET":
      return UpdateProductRequestProductTypeEnum.Bracelet;
    case "RING":
      return UpdateProductRequestProductTypeEnum.Ring;
    case "NECKLACE":
      return UpdateProductRequestProductTypeEnum.Necklace;
    case "EARRING":
      return UpdateProductRequestProductTypeEnum.Earring;
    default:
      throw new Error("Not supported productType");
  }
}
