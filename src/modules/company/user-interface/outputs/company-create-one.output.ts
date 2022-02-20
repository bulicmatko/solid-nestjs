import { createUnionType } from "@nestjs/graphql";

import { Forbidden } from "../../../../user-interface/outputs/forbidden.contract";
import { BadRequest } from "../../../../user-interface/outputs/bad-request.contract";

import { Company } from "./company.output";

export const CompanyCreateOneResult = createUnionType({
  name: "CompanyCreateOneResult",
  types: () => [Forbidden, BadRequest, Company],
});
