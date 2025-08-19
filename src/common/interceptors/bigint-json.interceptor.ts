import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

/**
 * This interceptor handles BigInt serialization to avoid JSON.stringify errors
 */
@Injectable()
export class BigIntJsonInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        return this.replaceBigInts(data);
      }),
    );
  }

  /**
   * Recursively replace BigInt values with their string representation
   */
  private replaceBigInts(value: any): any {
    if (value === null || value === undefined) {
      return value;
    }

    if (typeof value === "bigint") {
      return Number(value);
    }

    if (Array.isArray(value)) {
      return value.map((item) => this.replaceBigInts(item));
    }

    if (typeof value === "object") {
      const result: Record<string, any> = {};
      for (const key in value) {
        if (Object.prototype.hasOwnProperty.call(value, key)) {
          result[key] = this.replaceBigInts(value[key]);
        }
      }
      return result;
    }

    return value;
  }
}
