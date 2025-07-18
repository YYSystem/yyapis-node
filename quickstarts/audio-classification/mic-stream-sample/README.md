# Quickstarts > Audio Classification > MIC Stream Sample

このサンプルアプリケーションは、Node.js を使用して YYAPIs の音響分類サービス を利用する方法を示しています。

## 特長

- YYAPIs のリアルタイム音響分類を実施します
- gRPC 接続でサーバーにマイク音声ストリームを送信します
- 型安全のために `Typescript` を使用しています
- 開発ツールとして `nodemon`, `tsx`, と `eslint` を使用しています
- API キーとエンドポイント ID を `.env` ファイルに設定します
- マイク音声ストリームは `SoX` で録音します

## 事前準備

- [git](https://git-scm.com/downloads) - ソースコード管理システム
- [Node.js](https://nodejs.org/ja/) (推奨バージョン 22, Volta で管理されています) - Volta を使用する場合、事前インストールは不要です。
- [<u>開発者コンソール</u>](https://api-web.yysystem2021.com) の `yysystem.audioclassification.proto`、 `API キー` と `エンドポイント ID`
- **\[Mac の場合のみ\]** [Homebrew](https://brew.sh/) - Mac 用パッケージマネージャー
- **\[Windows の場合のみ\]** WSL Linux(Ubuntu)開発環境

### 参考記事

- [音響分類サービスの使い方](https://github.com/YYSystem/yyapis-docs/wiki/ClassifyStream)
- [Windows WSL で Linux 開発環境構築: Winget と VS Code を活用したセットアップ](https://qiita.com/natsuki3624/items/5fe96960563164db84d2)

### SoX 14.4.2 インストールする

#### Mac の場合

```bash
brew install sox
```

<!-- \[Windows の場合\]

[<u>Sox
14.4.1</u>](https://sourceforge.net/projects/sox/files/sox/14.4.1/)から sox-14.4.1-win32.exe をダウンロードする。

sox-14.4.1-win32.exe を実行してインストールする。

システム環境変数の Path に C:\Program Files (x86)\sox-14-4-1 を追加する。 -->

#### Linux(Ubuntu) の場合

```bash
sudo apt install sox libsox-fmt-all
```

## サンプルコードのダウンロード

1. git を使用して、任意のディレクトリにサンプルコードをダウンロードします。

```bash
git clone https://github.com/YYSystem/yyapis-node.git
```

2. clone したプロジェクトのディレクトリを移動します。

```bash
cd yyapis-node/quickstarts/audio-classification/mic-stream-sample
```

3. YYAPIs 開発者コンソールから音響分類 API の proto ファイル(`yysystem.audioclassification.proto`)をダウンロードして、 `protos` ディレクトリに配置します。

```bash
yyapis-node/quickstarts/audio-classification/mic-stream-sample/protos/yysystem.audioclassification.proto # ← ここに配置する
```

## [任意] Volta を使用して Node.js のバージョンを管理する

1. [Volta](https://volta.sh/) をインストールします。

```bash
curl https://get.volta.sh | bash
```

2. Volta を有効化して、Node.js のバージョンをインストールします。

```bash
volta install node@22
```

## npm パッケージのインストール

必要な npm パッケージをインストールします。

```bash
npm install
```

<!-- **\[Windows の場合\]**

```powershell
> Set-ExecutionPolicy RemoteSigned
> npm run install
``` -->

## proto ファイルのコンパイル

```bash
npm run proto:gen
```

実行権限エラーが発生する場合:

```bash
chmod +x proto-gen.sh
```

で実行権限を変更してから再度 `npm run proto:gen` を実行してください。

<!-- **\[Windows の場合\]**

```powershell
> icacls proto-gen.sh /grant Everyone:RX
> npm run proto:gen
``` -->

## サンプルアプリの実行

1. 開発者コンソールで取得した API キーとエンドポイント ID を基に .env ファイルを作成します。

```bash
yyapis-node/quickstarts/audio-classification/mic-stream-sample/.env # ← ここに配置する
```

**.env ファイル**

```bash
API_KEY=YOUR_API_KEY # 開発者コンソールで取得したAPIキー
ENDPOINT_ID=YOUR_ENDPOINT_ID # 開発者コンソールで取得したエンドポイントID
```

2. 下記コマンドを実行して、サンプルアプリを起動します。

```bash
$ npm run dev
```

## サンプルアプリの操作

### 音響分類の開始

アプリを起動後、`Enter` キーを押すと、音響分類が開始されます。

例: 音響分類結果

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
