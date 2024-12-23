
type RequestHandler<T,T1,T2,T3,T4> = import("express-serve-static-core").RequestHandler<T,T1,T2,T3,T4>;
type RouteParameters = import("express-serve-static-core").RouteParameters<string>;
type RouterHandleParams= {
    param?: object;
    body?: object;
    query?: object;
    localsObj?: object;
    response?: any;
};
// not change name "RouterHandle"
type RouterHandle<T extends RouterHandleParams = Record<string, any> > = RequestHandler< 
    T['param'] extends undefined ? RouteParameters :T['param'] , 
    T['response'] extends undefined ? any: T['response'], 
    T['body'] extends undefined? any: T['body'] , 
    T['query'] extends undefined? any: T['query'], 
    T['localsObj'] extends Record<string, any> ?T['localsObj']: Record<string, any> 
    >


type OmitField<T extends object, K extends keyof T> = Omit<T, K>;
type PickField<T extends object, K extends keyof T> = Pick<T, K>;
type RequiredField<T> = { [P in keyof T]-?: T[P]; };
type DiscountType = "VALUE" | "PERCENT"
type StatusType = "ACTIVE" | "INACTIVE"

type PartialFiled<T extends object, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

type Paging = {
    page: number;
    limit: number;
    offset?: number;

}

declare type JwtPayload = {
    [key: string]: any;
    iss?: string | undefined;
    sub?: string | undefined;
    aud?: string | string[] | undefined;
    exp?: number | undefined;
    nbf?: number | undefined;
    iat?: number | undefined;
    jti?: string | undefined;
}
declare namespace Express {
    export interface Request {
      user?: {
        id:string,
        sessionId?: string,
        name?: string
      },
      isRoot?: boolean,
      token?: string,
      companyId?: number,
      language?: string,
      status?: boolean,
    }
  }