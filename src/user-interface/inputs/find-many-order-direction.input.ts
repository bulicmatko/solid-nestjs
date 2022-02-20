import { registerEnumType } from "@nestjs/graphql";

export enum FindManyOrderDirection {
  ASC = "asc",
  DESC = "desc",
}

registerEnumType(FindManyOrderDirection, {
  name: "FindManyOrderDirection",
});
