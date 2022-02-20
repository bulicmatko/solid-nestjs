import { createUnionType } from "@nestjs/graphql";

import { Forbidden } from "../../../../user-interface/outputs/forbidden.contract";
import { NotFound } from "../../../../user-interface/outputs/not-found.contract";
import { BadRequest } from "../../../../user-interface/outputs/bad-request.contract";

import { Company } from "./company.output";

export const CompanyUpdateOneResult = createUnionType({
  name: "CompanyUpdateOneResult",
  types: () => [Forbidden, NotFound, BadRequest, Company],
});
