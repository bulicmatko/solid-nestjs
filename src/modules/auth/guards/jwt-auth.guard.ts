import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { getRequest } from '../../../utils/execution-context.util';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  getRequest = getRequest;
}
