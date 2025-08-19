import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
  Logger,
} from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { Response } from "express";

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(PrismaExceptionFilter.name);

  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status: HttpStatus;
    let message: string;

    switch (exception.code) {
      // Not found
      case "P2025":
        status = HttpStatus.NOT_FOUND;
        message = "Record not found";
        break;

      // Unique constraint violation
      case "P2002":
        status = HttpStatus.CONFLICT;
        const field = (exception.meta?.target as string[]) || [];
        message = `Unique constraint failed on: ${field.join(", ")}`;
        break;

      // Foreign key constraint violation
      case "P2003":
        status = HttpStatus.BAD_REQUEST;
        message = "Related record not found";
        break;

      // Default
      default:
        this.logger.error(
          `Prisma exception: ${exception.code} - ${exception.message}`,
        );
        status = HttpStatus.INTERNAL_SERVER_ERROR;
        message = "Internal server error";
    }

    response.status(status).json({
      statusCode: status,
      message,
      error: exception.name,
    });
  }
}
