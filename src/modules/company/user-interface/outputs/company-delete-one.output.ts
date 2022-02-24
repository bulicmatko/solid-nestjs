import { createUnionType } from "@nestjs/graphql";

import { Forbidden } from "../../../../user-interface/outputs/forbidden.output";
import { NotFound } from "../../../../user-interface/outputs/not-found.output";

import { Company } from "./company.output";

export const CompanyDeleteOneResult = createUnionType({
  name: "CompanyDeleteOneResult",
  types: () => [Forbidden, NotFound, Company],
});
