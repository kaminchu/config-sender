## なにこれ
各ノードに対してconfigファイルを送信するためのツール

## 説明
configファイルを送信できるようにすることでファイルの形で一括管理できるようにし、そのことによってgitを使った管理及びciによるデプロイなどを可能にする

## インストール
まだ無理  
```
npm install -g config-sender
```
## usage
そのうち

## plugins
configの送信先機器によって送信方法が異なるので、各機器に合わせたpluginをインストールする

- YAMAHA RTXシリーズ
```
npm install -g send-config-plugin-rtx
```

