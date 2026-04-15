import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (!authHeader) return false;

    if (authHeader === 'Bearer customer-token') {
      request.user = { id: 1, name: 'Customer User', role: 'customer' };
      return true;
    }

    if (authHeader === 'Bearer admin-token') {
      request.user = { id: 2, name: 'Admin User', role: 'admin' };
      return true;
    }

    return false;
  }
}
