import { createUnionType } from "@nestjs/graphql";

import { Forbidden } from "../../../../user-interface/outputs/forbidden.output";
import { NotFound } from "../../../../user-interface/outputs/not-found.output";

import { Company } from "./company.output";

export const CompanyRecoverOneResult = createUnionType({
  name: "CompanyRecoverOneResult",
  types: () => [Forbidden, NotFound, Company],
});
