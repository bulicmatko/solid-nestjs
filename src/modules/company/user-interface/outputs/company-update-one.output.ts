import { createUnionType } from "@nestjs/graphql";

import { Forbidden } from "../../../../user-interface/outputs/forbidden.output";
import { Unprocessable } from "../../../../user-interface/outputs/unprocessable.output";
import { NotFound } from "../../../../user-interface/outputs/not-found.output";

import { Company } from "./company.output";

export const CompanyUpdateOneResult = createUnionType({
  name: "CompanyUpdateOneResult",
  types: () => [Forbidden, NotFound, Unprocessable, Company],
});
