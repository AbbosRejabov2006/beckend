import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

export interface Response<T> {
  data: T;
}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    return next.handle().pipe(
      map((data) => {
        // Skip transformation for specific response types
        if (
          data &&
          data.hasOwnProperty("statusCode") &&
          data.hasOwnProperty("message")
        ) {
          return data;
        }

        // Skip transformation for FileInterceptor responses
        const request = context.switchToHttp().getRequest();
        if (request && request.file) {
          return data;
        }

        // Handle BigInt serialization
        return this.replaceBigInts(data);
      }),
    );
  }

  /**
   * Recursively replace BigInt values with their number representation
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
