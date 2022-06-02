import { createUnionType } from "@nestjs/graphql";

import { Forbidden } from "../../../core/user-interface/outputs/forbidden.output";
import { Unprocessable } from "../../../core/user-interface/outputs/unprocessable.output";

import { Company } from "../../company/user-interface/company.output";

export const CompanyCreateOneResult = createUnionType({
  name: "CompanyCreateOneResult",
  types: () => [Forbidden, Unprocessable, Company],
});
