import { DefaultSession, Profile as BaseProfile } from "next-auth";
import { IAppUser } from "@interfaces/auth";

declare module "next-auth" {
  /**
   * セッション情報
   * @interface
   */
  interface Session {
    user: {
      accessToken?: string;
    } & DefaultSession["user"] & User;
  }
  /**
   * ユーザー情報
   * @interface
   */
  interface User extends IAppUser {
    id?: number;
  }
  /**
   * プロフィール情報
   * @interface
   */
  interface Profile extends BaseProfile {
    id?: string;
    shintoId?: string;
  }
}

declare module "next-auth/jwt" {
  /**
   * JWT情報
   * @interface
   */
  interface JWT extends IAppUser {
    id?: number;
  }
}
