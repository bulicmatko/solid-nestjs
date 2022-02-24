import { createUnionType } from "@nestjs/graphql";

import { Forbidden } from "../../../../user-interface/outputs/forbidden.output";
import { NotFound } from "../../../../user-interface/outputs/not-found.output";
import { BadRequest } from "../../../../user-interface/outputs/bad-request.output";

import { Company } from "./company.output";

export const CompanyUpdateOneResult = createUnionType({
  name: "CompanyUpdateOneResult",
  types: () => [Forbidden, NotFound, BadRequest, Company],
});
