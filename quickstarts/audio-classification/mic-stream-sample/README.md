# Node サンプル

このサンプルアプリケーションは、Node.js を使用して YYAPIs の音響分類 API を利用する方法を示しています。

## 特長

- YYAPIs のリアルタイム音響分類を実施します
- gRPC サーバーにマイク音声ストリームを送信します
- 型安全のために `Typescript` を使用しています
- 開発ツールとして `nodemon`, `tsx`, と `eslint` を使用しています
- API キーとエンドポイント ID を `.env` ファイルに設定します
- マイク音声ストリームを `SoX` で録音します

## 事前準備

- [git](https://git-scm.com/downloads)
- [Node.js](https://nodejs.org/ja/) (推奨バージョン 22, Volta で管理されています)
- [PNPM](https://pnpm.io/) (推奨バージョン 9, Volta で管理されています)
- [Sox](https://sourceforge.net/projects/sox/files/sox/14.4.1/) (推奨バージョン 14.4.1)
- [<u>開発者コンソール</u>](https://api-web.yysystem2021.com) から `yysystem.audioclassification.proto`、API キーとエンドポイント ID を取得する

### SoX 14.4.1 インストールする

\[Mac の場合\]

```bash
$ brew install sox
```

\[Windows の場合\]

[<u>Sox
14.4.1</u>](https://sourceforge.net/projects/sox/files/sox/14.4.1/)から sox-14.4.1-win32.exe をダウンロードする。

sox-14.4.1-win32.exe を実行してインストールする。

システム環境変数の Path に C:\Program Files (x86)\sox-14-4-1 を追加する。

## サンプルコードのダウンロード

git を使用して、サンプルコードをダウンロードします。

```bash
git clone https://github.com/YYSystem/yyapis-node.git
```

ディレクトリを移動します。

```bash
cd yyapis-node/quickstarts/audio-classification/mic-stream-sample
```

YYAPIs 開発者コンソールから音響分類 API の proto ファイル(`yysystem.audioclassification.proto`)をダウンロードして、 `protos` ディレクトリに配置します。

```bash
yyapis-node/quickstarts/audio-classification/mic-stream-sample/protos/yysystem.audioclassification.proto # ← ここに配置する
```

## npm パッケージのインストール

**\[Mac の場合\]**

```bash
$ corepack enable
$ pnpm install
```

**\[Windows の場合\]**

```powershell
> Set-ExecutionPolicy RemoteSigned
> corepack enable
> pnpm install
```

## proto ファイルのコンパイル

**\[Mac の場合\]**

```bash
$ chmod +x proto-gen.sh
$ pnpm proto:gen
```

**\[Windows の場合\]**

```powershell
> icacls proto-gen.sh /grant Everyone:RX
> pnpm proto:gen
```

## サンプルアプリの実行

[<u>開発者コンソール</u>](https://api-web.yysystem2021.com)
にログインして、API キーとエンドポイント ID を取得します。

ディレクトリの直下に.env ファイルを作成します。

```bash
yyapis-node/quickstarts/audio-classification/mic-stream-sample/.env # ← ここに配置する
```

**.env ファイル**

```bash
API_KEY=YOUR_API_KEY # 開発者コンソールで取得したAPIキー
ENDPOINT_ID=YOUR_ENDPOINT_ID # 開発者コンソールで取得したエンドポイントID
```

下記コマンドを実行して、サンプルアプリを起動します。

```bash
$ pnpm dev
```

## サンプルアプリの操作

### 音響分類の開始

サンプルアプリを起動した後、‘Enter’キーを入力すると、音響分類が開始されます。

結果の例、 defaultResults に人の声(`Speech`)を検知されている場合:

```bash
Stream data:  {
  customResults: [ { className: '1', confidence: 0.38271453976631165 } ],
  defaultResults: [ { className: 'Speech', confidence: 0.944975733757019 } ]
}
Stream data:  {
  customResults: [ { className: '2', confidence: 0.38050615787506104 } ],
  defaultResults: [ { className: 'Speech', confidence: 0.7597789764404297 } ]
}
Stream data:  {
  customResults: [ { className: '1', confidence: 0.37532928586006165 } ],
  defaultResults: [ { className: 'Speech', confidence: 0.8687123656272888 } ]
}
```

### 音響分類の終了

‘ctrl + c’を入力すると、音響分類は停止され、サンプルアプリが終了します。
