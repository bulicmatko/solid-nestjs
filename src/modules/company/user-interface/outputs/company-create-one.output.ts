import { createUnionType } from "@nestjs/graphql";

import { Forbidden } from "../../../../user-interface/outputs/forbidden.output";
import { BadRequest } from "../../../../user-interface/outputs/bad-request.output";

import { Company } from "./company.output";

export const CompanyCreateOneResult = createUnionType({
  name: "CompanyCreateOneResult",
  types: () => [Forbidden, BadRequest, Company],
});
