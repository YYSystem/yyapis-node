# Node サンプル

**事前準備**

- [git](https://git-scm.com/downloads) - ソースコード管理システム
- [Node.js](https://nodejs.org/ja/) (推奨バージョン 22, Volta で管理されています) - Volta を使用する場合、事前インストールは不要です。
- [<u>開発者コンソール</u>](https://api-web.yysystem2021.com) の `yysystem.proto`、 `API キー`
- **\[Mac の場合のみ\]** [Homebrew](https://brew.sh/) - Mac 用パッケージマネージャー
- **\[Windows の場合のみ\]** WSL Linux(Ubuntu)開発環境

**SoX 14.4.1**をインストールする

\[Macの場合\]

```bash
$ brew install sox
```

\[Windowsの場合\]

[<u>Sox
14.4.1</u>](https://sourceforge.net/projects/sox/files/sox/14.4.1/)からsox-14.4.1-win32.exeをダウンロードする。

sox-14.4.1-win32.exeを実行してインストールする。

システム環境変数のPathにC:\Program Files (x86)\sox-14-4-1を追加する。

## サンプルコードのダウンロード

1. git を使用して、任意のディレクトリにサンプルコードをダウンロードします。

```bash
git clone https://github.com/YYSystem/yyapis-node.git
```

2. clone したプロジェクトのディレクトリを移動します。

```bash
cd yyapis-node/quickstarts/speech-to-text/mic-stream-sample
```

3. YYAPIs 開発者コンソールから音響認識 API の proto ファイル(`yysystem.proto`)をダウンロードして、 `protos` ディレクトリに配置します。

```bash
yyapis-node/quickstarts/speech-to-text/mic-stream-sample/protos/yysystem.proto # ← ここに配置する
```

## [任意] Volta を使用して Node.js のバージョンを管理する

1. [Volta](https://volta.sh/) をインストールします。

```bash
curl https://get.volta.sh | bash
export VOLTA_HOME=$HOME/.volta
export PATH="$VOLTA_HOME/bin:$PATH"
```

2. Volta を有効化して、Node.js のバージョンをインストールします。

```bash
volta install node@22
```

## npm パッケージのインストール

1. corepack を確認します。

```bash
corepack --version
```

2. corepack がなければインストールします。

```bash
npm -g install corepack
```

3. corepack を有効化して、必要な npm パッケージをインストールします。

```bash
corepack enable
pnpm install
```

4. pnpmのバージョンを確認する

```bash
pnpm --version
```

バージョンが確認できない場合:

```bash
export VOLTA_FEATURE_PNPM=1
source ~/. zshrc
volta pin pnpm@latest
```

## protoファイルのコンパイル

```bash
pnpm proto:gen
```

実行権限エラーが発生する場合:

```bash
chmod +x proto-gen.sh
```

で実行権限を変更してから再度 `pnpm proto:gen` を実行してください。

## サンプルアプリの実行

[<u>開発者コンソール</u>](https://api-web.yysystem2021.com)
にログインして、APIキーを取得します。

node-sampleディレクトリの直下に.envファイルを作成します。

**.envファイル**

```
# grpc settings
YYAPIS_API_KEY=YOUR_API_KEY
YYAPIS_ENDPOINT=api-grpc-2.yysystem2021.com
YYAPIS_PORT=443
YYAPIS_SSL=true
```

\*1
YOUR_API_KEYに開発者コンソールから取得したAPIキーの値を使用してください。

下記コマンドを実行して、サンプルアプリを開始します。

```bash
$ pnpm start
```

## サンプルアプリの操作

**音声認識の開始**

キーボードから‘start’を入力してからEnterキーを押すと、音声認識が開始します。

**音声認識の終了**

キーボードから‘end’を入力してからEnterキーを押すと、音声認識が終了します。

## サンプルアプリの終了

キーボードから‘Ctrl + c’を押すと、サンプルアプリが終了します。
