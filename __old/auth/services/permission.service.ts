import { Injectable } from "@nestjs/common";

@Injectable()
export class PermissionService {
  getDefault(): string[] {
    return [
      // Profile
      "Profile:read:own",
      "Profile:update:own",

      // Activities
      "Activities:read:own",

      // Company
      "Company:create",
      "Company:read:own",
      "Company:update:own",
      "Company:delete:own",
    ];
  }
}
