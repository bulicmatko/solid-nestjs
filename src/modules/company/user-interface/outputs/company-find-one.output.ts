import { createUnionType } from "@nestjs/graphql";

import { Forbidden } from "../../../../user-interface/outputs/forbidden.output";
import { BadRequest } from "../../../../user-interface/outputs/bad-request.output";
import { NotFound } from "../../../../user-interface/outputs/not-found.output";

import { Company } from "./company.output";

export const CompanyFindOneResult = createUnionType({
  name: "CompanyFindOneResult",
  types: () => [Forbidden, BadRequest, NotFound, Company],
});
