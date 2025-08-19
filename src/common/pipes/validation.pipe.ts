import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from "@nestjs/common";
import { validate } from "class-validator";
import { plainToClass } from "class-transformer";

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToClass(metatype, value);
    const errors = await validate(object);
    if (errors.length > 0) {
      const errorsObj = this.formatErrors(errors);
      throw new BadRequestException({
        statusCode: 400,
        message: "Validation failed",
        errors: errorsObj,
      });
    }
    return value;
  }

  private toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }

  private formatErrors(errors: any[]): Record<string, string> {
    const result: Record<string, string> = {};
    errors.forEach((error) => {
      const constraints = error.constraints;
      if (constraints) {
        const property = error.property;
        result[property] = Object.values(constraints)[0] as string;
      }

      // Handle nested errors
      if (error.children && error.children.length > 0) {
        const nestedErrors = this.formatErrors(error.children);
        Object.keys(nestedErrors).forEach((key) => {
          result[`${error.property}.${key}`] = nestedErrors[key];
        });
      }
    });
    return result;
  }
}
