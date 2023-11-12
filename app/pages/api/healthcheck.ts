import type { NextApiRequest, NextApiResponse } from "next";

/**
 * ヘルスチェックAPIです。
 *
 * @param req リクエストデータ
 * @param res レスポンスデータ
 */
export default function healthcheck(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).send({status: "OK"});
}
