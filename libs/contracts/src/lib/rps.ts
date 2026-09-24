export interface RpsMeta {
  correlationId: string;
}

export interface RpcRequest<T> {
  meta: RpsMeta;
  data: T;
}
