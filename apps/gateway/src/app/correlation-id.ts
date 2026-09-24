import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import type { NextFunction, Request, Response } from "express";
import { randomUUID } from 'node:crypto';

export const CORRELATION_HEADER = 'x-correlation-id';
const SAFE_ID = /^[\w-]{8,64}$/;

declare module 'express-serve-static-core' {
  interface Request {
    correlationId?: string;
  }
}

export const correlationId = (req: Request, res: Response, next: NextFunction) => {
  const incoming = req.header(CORRELATION_HEADER);
  const id = incoming && SAFE_ID.test(incoming) ? incoming : randomUUID();

  req.correlationId = id;
  res.setHeader(CORRELATION_HEADER, id);
  next();
}

export const CorrelationId = createParamDecorator(
  (_: unknown, ctx: ExecutionContext): string => ctx.switchToHttp().getRequest<Request>().correlationId ?? 'missing'
)
