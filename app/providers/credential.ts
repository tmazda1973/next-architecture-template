import CredentialProvider from "next-auth/providers/credentials";
import { CredentialsConfig } from 'next-auth/providers';
import axios from "axios";
import process from "process";
import { IAuthRequest, IAuthResponse } from "@interfaces/auth/credential";
import _ from "lodash";

/**
 * 環境変数定義
 */
const {
  API_BASE_URI,
} = process.env;

/**
 * コンフィグ定義
 * @type
 */
type CustomCredentialsConfig = Pick<CredentialsConfig<any>, 'id'>;

/**
 * 独自クレデンシャル認証プロバイダーを生成します。
 *
 * @param config コンフィグ定義
 * @constructor
 */
const CustomCredentialProvider = (config: CustomCredentialsConfig) => {
  return CredentialProvider({
    type: "credentials",
    credentials: {},
    /**
     * 認証を行います。
     *
     * @param credentials クレデンシャルデータ
     * @param _request リクエストデータ（未使用）
     */
    async authorize(credentials, _request) {
      const { userId, password } = credentials as {
        userId: string;
        password: string;
      };
      try {
        const url = `${API_BASE_URI}/features/auth`;
        const request: IAuthRequest = {
          user_id: userId,
          password: password,
        };
        const response = await axios.post<IAuthResponse>(url, request, { timeout: 3000 });
        const user = response?.data?.user;
        if (!_.isNil(user)) return user;
        return null;
      }
      catch (e: unknown) {
        throw e;
      }
    },
    ...config,
  });
};

export default CustomCredentialProvider;
