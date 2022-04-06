import { createUnionType } from "@nestjs/graphql";

import { Forbidden } from "../../../../user-interface/outputs/forbidden.output";
import { Unprocessable } from "../../../../user-interface/outputs/unprocessable.output";

import { Company } from "./company.output";

export const CompanyCreateOneResult = createUnionType({
  name: "CompanyCreateOneResult",
  types: () => [Forbidden, Unprocessable, Company],
});
