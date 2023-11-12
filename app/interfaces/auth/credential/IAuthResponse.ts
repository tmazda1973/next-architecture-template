import { IAppUser } from "@interfaces/auth";

/**
 * レスポンスデータ
 * @interface
 */
export interface IAuthResponse {
  id?: number;
  user: IAppUser;
}
