import "axios";

declare module "axios" {
  export interface AxiosResult<T = any> {
    code: number;
    data: T;
    msg: string | { detail: string };
  }
}
