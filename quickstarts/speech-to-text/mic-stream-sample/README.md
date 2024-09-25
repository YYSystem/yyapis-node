# Node サンプル

**事前準備**

**Node.js**（Node 20推奨）をインストールする
[<u>Node.js公式サイト</u>](https://nodejs.org/ja/)

**SoX 14.4.1**がインストールをインストールする

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

サンプルコードのzipファイルを運営が配布します。受け取ったサンプルコードyyapis_saples_node_speechtotext.zipファイルを解凍してください。（パスが長いファイルがあるので、Cドライブ直下など階層が浅いディレクトリに解凍することをお勧めします。）nodeディレクトリを好きなディレクトリに移動して、名前をnode-sampleにします。

yy-system-api-samples-develop-speech-to-text-kotlin-sample  
&emsp;/speech-to-text  
&emsp;&emsp;/node ←このディレクトリを移動する

## サンプルアプリのインストール

zipファイルに含まれているyysystem.protoファイルをnode-sample直下のprotoディレクトリに配置します。

node-sample  
&emsp;/proto  
&emsp;&emsp;/yysystem.proto ← ここに配置する

```bash
$ cd node-sample
```

**\[Macの場合\]**

```bash
$ npm install -g npm
$ npm install -g yarn
$ chmod +x proto-gen.sh
$ yarn proto:gen
```

**\[Windowsの場合\]**

```powershell
> Set-ExecutionPolicy RemoteSigned
> npm install -g npm
> npm install -g yarn
> yarn install
> icacls proto-gen.sh /grant Everyone:RX
> yarn proto:gen
```

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
$ yarn start
```

## サンプルアプリの操作

**音声認識の開始**

キーボードから‘start’を入力してからEnterキーを押すと、音声認識が開始します。

**音声認識の終了**

キーボードから‘end’を入力してからEnterキーを押すと、音声認識が終了します。

## サンプルアプリの終了

キーボードから‘Ctrl + c’を押すと、サンプルアプリが終了します。
