#!/usr/bin/env bash
#/**
# * .envファイルを暗号化するスクリプトです。
# */
#
# 水平線を出力します。
#
echo_hr() {
  eval printf %.1s '-{1..'"${COLUMNS:-$(tput cols)}"\}; echo
}

# パラメーターを判定する
USAGE=$(cat <<EOS
Usage: $0 [-h] [-e env] [KEY] [IV]
Args:
  [-h]  --- Print help.
  [-e]  --- Environment name. (default: prod)
  [KEY] --- Encryption key of length 32 bytes. (Hex)
  [IV]  --- Initial vector of length 16 bytes. (Hex)
EOS
)
ENV="prod" # 環境名
OPT_STRING="he:" # オプション文字列
while getopts ${OPT_STRING} OPT; do
  case ${OPT} in
    h) # -hが指定された場合
      echo_hr
      echo "${USAGE}"
      echo_hr
      exit 0
      ;;
    e) # -eが指定された場合
      ENV=${OPTARG}
      if [ -z "${ENV}" ]; then
        echo_hr
        echo "${USAGE}"
        echo_hr
        exit 1
      fi
      ;;
  esac
done

# パラメーターを取得する
shift $((OPTIND - 1))
KEY=${1} # 暗号化キー
if [ -z "${KEY}" ]; then
  KEY=$(openssl rand -hex 32)
fi
IV=${2} # 初期ベクトル
if [ -z "${IV}" ]; then
  IV=$(openssl rand -hex 16)
fi

# 暗号化処理を実行する
CURRENT=$(cd $(dirname $0);pwd)
IN="${CURRENT}/../env/env.${ENV}.js"
OUT="${CURRENT}/../env/env.${ENV}.js.encrypt"
echo "KEY:${KEY}"
echo "IV:${IV}"
openssl enc -aes-256-cbc -K ${KEY} -iv ${IV} -in ${IN} -out ${OUT}

if [ $? -eq 0 ]; then
  echo "\\033[32mファイルの暗号化に成功しました。（${IN} ---> ${OUT}）\\033[0m"
  exit 0
else
  echo "\\033[31mファイルの暗号化に失敗しました。（${IN} ---> ${OUT}）\\033[0m"
  exit 1
fi
