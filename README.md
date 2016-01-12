# spa react study

React を用いて SPA を作る初期段階の勉強メモ

[Github](https://github.com/hiyuzawa/spa_react_study)

```
$ git clone https://github.com/hiyuzawa/spa_react_study.git
$ cd spa_react_study/
$ npm install
$ ./node_modules/.bin/gulp   # http://localhost:8000/ で確認可能

# ドキュメント内の CHECK POINT N の区切りでGit Commitし Tag v0.N を切ってあります

$ git checkout refs/tags/v0.N  # これで CHECK POINT N の状態になる
$ git checkout master # これで最終系に戻る
```


## JavaScript

* オブジェクト指向スクリプト言語
* ECMAScriptとして標準化
* Node.jsのようにサーバサイドでも利用が活発
* GoogleのV8 はJITコンパイラとして有名

## ECMAScript - JavaScript

* 現在の最新バージョンは6 (ES6)
* ES6 は ES2015とも呼ぶのが正式名称らしい
* 文法がよりモダンに.そのたさまざまは言語仕様の変更
    * [ES6時代のJavaScript - クックパット開発者ブログ](http://techlife.cookpad.com/entry/2015/02/02/094607)
    * [ES6時代のJavaScript - Yahoo! JAPAN TechBlog](http://techblog.yahoo.co.jp/javascript/nodejs/Node-es6/)
    * [ES2015(ES6)な時代だからこそ、ES5を改めて調べたJavaScript初級者のメモ - Qiita](http://qiita.com/zaru/items/d833dca52962c3f7770f)

## Hello World

そのまえに開発環境をちょっと整備
### nodebrew 

[nodebrew](https://github.com/hokaccha/nodebrew)

* node.jsを自分のマシン内でversion管理するためのtool. 
* nvm, nbenv っていうのもあるらしい

#### koko

サーバ不要のローカルHTMLを確認したい時に簡易に立ち上げることができるウエブサーバ

```
$ npm -g install koko

$ koko
document root   : /Users/hiyuzawa/...
php     : off
md      : off
[listen 65524]
```

kokoが起動されたディレクトリをDocumentRootとしてウエブサーバが立ち上がる
(Portは毎回空きポートをランダムに利用し異なる)

[_CHECK POINT 1_](https://github.com/hiyuzawa/spa_react_study/tree/5255824ac3832634ec91b13c943a9eab0fb794e5)

### Google Hosted Libraries

[Google Hosted Libraries](https://developers.google.com/speed/libraries/)

Googleが気前よくJavaScriptで有名なライブラリをCDN経由で配信をホスティングしてくれてる.
軽く利用するときには使わせてもらうと便利


[_CHECK POINT 2_](https://github.com/hiyuzawa/spa_react_study/tree/1d13b41bb42303d8f606ce67748dfea8850bf41c)

## Node

* サーバサイドJavaScript
* イベント駆動型プログラミング (callback)
* require で各種ライブラリ(自作を読み込む)

### npm

* Node Package Manager
* package管理は package.json に記述

```
$ npm init
$ npm install -save [package name]
$ npm install -save-dev [package name]  # 開発用ライブラリ
$ npm install # package.json からライブラリをインストール

$ npm install -g [package name] #グローバル環境にライブラリをインストール
```

example

```
$ npm install lodash --save-dev

# インストールされたライブラリは node_modules/ 以下にインストール
$ ls -l node_modules/lodash/

# .gitignore はこんな感じにしとく
$ cat .gitignore
node_modules/
```

※ [lodash](https://lodash.com/) は [Underscore.js](http://underscorejs.org/) と並ぶJavascriptの言語機能を拡張する人気ライブラリ


#### 自作ライブラリ

* module.exports = exports
* require("my_module")

[_CHECK POINT 3_](https://github.com/hiyuzawa/spa_react_study/tree/455d772a6abf92653d8875672ea4669f16655728)

## browserify

[browserify](http://browserify.org/)

require がブラウザ(非node環境)でも使える.
起点となるJSから呼びだされているrequireを追跡して一つのJavaScriptファイルにマージしてくれる

```
$ npm install -g browserify  # グローバル環境に入れる
$ which browserify # <-- browserify 実行ファイル
/Users/hiyuzawa/.nodebrew/current/bin/browserify
```

* Hello worldを修正 (git 参照)

```
$ browserify js/app.js --outfile bundle.js
$ ls -l bundle.js
-rw-r--r--  1 hiyuzawa  Users  412708  1 11 11:47 bundle.js
```

※ bundle.js も .gitignoreに追加

[_CHECK POINT 4_](https://github.com/hiyuzawa/spa_react_study/tree/9f0806dc889186cedef4a8b2a3ecf095cc92562d)

## gulp

browserifyは便利だけどjsを修正するためにコマンドを実行して bundle.js を作るのは面倒。nodeで書かれたビルドシステムのヘルパーである gulp を利用すると便利

[gulp](http://gulpjs.com/)

```
$ npm install gulp --save-dev
$ ls -l node_modules/.bin/gulp  # -g を付けずにインストールした実行ファイルはここに保存される

# 以下のパッケージも必要なのでインストールしとく
$ npm install browserify --save-dev 
$ npm install gulp-webserver --save-dev   # ファイルの更新を監視するgulpモジュール
$ npm install vinyl-source-stream --save-dev # ファイルに書き出すために必要?なgulpモジュール
```

### gulpfile.js

gulpタスクと定義するファイル. 以下の定義では

* 3つタスクが定義されている (browserify, watch, webserver)
* gulpを起動すると 3つのタスクとも起動される
* browserifyタスクは上述のbrowserifyを実行するタスク (js/app.js -> bundle.js)
* watchタスクは ./js/*.js を監視して更新されたら browserify タスクを自動で行う
* webserver はローカルにウエブサーバを起動するタスク. 関連ファイルの更新で自動リロード

```
var gulp = require('gulp');
var browserify = require('browserify')
var webserver = require('gulp-webserver');
var source = require('vinyl-source-stream');

gulp.task('browserify', function() {
    browserify('./js/app.js', {debug: true})
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('./'))
});

gulp.task('watch', function(){
    gulp.watch('./js/*.js', ['browserify'])
});

gulp.task('webserver', function(){
    gulp.src('./')
        .pipe(webserver({
                host: '127.0.0.1',
                livereload: true
        }));
});

gulp.task('default', ['browserify', 'watch', 'webserver']);
```

#### 実行

```
$ ./node_modules/.bin/gulp
[12:15:44] Using gulpfile ~/../gulpfile.js
[12:15:44] Starting 'browserify'...
[12:15:44] Finished 'browserify' after 19 ms
[12:15:44] Starting 'watch'...
[12:15:44] Finished 'watch' after 14 ms
[12:15:44] Starting 'webserver'...
[12:15:44] Webserver started at http://127.0.0.1:8000
[12:15:44] Finished 'webserver' after 15 ms
[12:15:44] Starting 'default'...
[12:15:44] Finished 'default' after 3.17 μs
```

http://127.0.0.1:8000 でブラウザ確認できる. jsを編集すると自動でビルド&ブラウザリロードされる

[_CHECK POINT 5_](https://github.com/hiyuzawa/spa_react_study/tree/dab20bcd26ef0d342853902ff84afb7677660472)

## ES2015(ES6) & Babel

[Babel](https://babeljs.io/) は JavaScriptコンパイラ.
ECMAScript2015 (ES6)やECMAScript7などで書かれたソースコードを一般的なブラウザがサポートしているECMAScript5の形式に出力する.
(ES2015のJavaScript文法を先取りして利用することが出来る）

React(後述)のJSX文法も同様にコンパイルすることができる.

### 準備 (gulpに適応)

```
$ npm install babelify --save-dev # babel 本体
$ npm install babel-preset-es2015 --save-dev  # babelはコンパイル方法によってplugin形式で追加インストールする
```

gulpfile.jsの編集 (babelify のタスクの編集)
```
...
var babelify = require('babelify'); # モジュールをrequire

gulp.task('browserify', function() {
    browserify('./js/app.js', {debug: true})
        .transform(babelify, {presets: ["es2015"]})  # この部分を追加
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('./'))
});
...
```

ES2015のclass構文
```
export default class MyModule2 {
    constructor(name) {
        this.name =  name
    }
    sayHello() {
        return `Hello My Name is ${this.name}`;   // template構文 (ES2015)
    }
}
```

require も import 構文が使える
```
import MyModule2 from './my_module2';
const my_module2 = new MyModule2("hoge");   // 変数宣言const, let (ES2015)
```

[_CHECK POINT 6_](https://github.com/hiyuzawa/spa_react_study/tree/ab7b106c8781fdc2be99092f614cdc0f1f73bdca)

## React による SPA

#### JavaScriptライブラリの遷移
* [script.aculo.us](http://script.aculo.us/)
* [jQuery](https://jquery.com/) 
* [backbone.js](http://backbonejs.org/)
* [vue.js](http://jp.vuejs.org/)
* [AngularJS](https://angularjs.org/)  - by Google
* [React](https://facebook.github.io/react/) - by Facebook

各ライブラリの特徴はこの辺を参照

* [今話題のReact.jsはどのようなWebアプリケーションに適しているか？](https://html5experts.jp/hokaccha/13301/)
* [Backbone.JSからAngular2まで、全9大JavaScriptフレームワークを書き比べた!](http://paiza.hatenablog.com/entry/2015/03/11/Backbone_JS%E3%81%8B%E3%82%89Angular2%E3%81%BE%E3%81%A7%E3%80%81%E5%85%A89%E5%A4%A7JavaScript%E3%83%95%E3%83%AC%E3%83%BC%E3%83%A0%E3%83%AF%E3%83%BC%E3%82%AF%E3%82%92%E6%9B%B8%E3%81%8D%E6%AF%94%E3%81%B9)


#### SPA (Single Page Application)

* Flashに変わるHTML5やWebAPIを用いたクライアントサイドにおけるアプリケーション表現技法
* ディスクトップアプリと同等の表現力(UX)

特徴 

* 単一ページのWebアプリ
* DOMの操作でページ(UI)切り替え
* サーバ(データ)のやり取りはWebAPI
 
### React

* Facebook謹製
* MVCのVに特化したライブラリ (not Framework)
* VirtualDOMを内部でサポートしてSPAのデメリットの一つ(DOMの再描画のパフォーマンス)を克服 
* MVCのMの部分は 同じくFacebookが提唱する [Flux](https://facebook.github.io/flux/docs/overview.html) という仕組みで対応(してもよい)

### Hello world of React

先に構築した browserify + babel の環境に React も使えるようにする

ReactはJSX(JavaScript syntax extension)という拡張文法で記載することを推奨されている。
さらにES2015に準拠してもよいがそこは必須ではない

```
$ npm install react --save-dev       # react 本体
$ npm install react-dom --save-dev   # reactのdom操作部分(最近より別パッケージ化されてる)
$ npm install babel-preset-react --save-dev   # babel の react(jsx) コンパイラプラグイン
```

gulpfile.js は以下のように babelコンパイル時にreact適応すればok

```
 gulp.task('browserify', function() {
     browserify('./js/app.js', {debug: true})
-        .transform(babelify, {presets: ["es2015"]})
+        .transform(babelify, {presets: ["es2015", "react"]})
```

* Hello コンポーネントを定義して id="content" にアタッチして render する
* React.createClass でコンポーネント作成 render 関数を定義. return の中身が xml (JSX)
* 親から渡された変数はコンポーネント内で this.props で取得

```
    var Hello = React.createClass({
        render: function() {
            return (
                <div className="Hello">
                    Hello React World!! by {this.props.name}
                </div>
            );
        }
    })

    ReactDOM.render(
        <Hello name="hiyuzawa"/>,
        document.getElementById('content')
    );
```

[_CHECK POINT 7_](https://github.com/hiyuzawa/spa_react_study/tree/5b617ce7202973c40fd6700869a50d691ce77f3b)

Reactで作るアプリケーションはコンポーネントを定義してルートコンポーネントにスタックしていくイメージで作成します。
イメージ的には以下な感じ。

* define of Root Component

```
require(Component-A)
require(Component-B)
<div>
    <Component-A />
    <Component-B />
</div>
ReactDOM.render(ROOT-DOM-ELEMENT)
```

* define of Component-A

```
require(Component-C)
<div>
    <Component-C />
</div>
```

コンポーネントを作成する上で重要なのは

* 親から渡された変数は this.props で渡される.
* コンポーネントは状態を持たない（ステートレス） (与えられた変数に応じて一意に定まる)
* アプリケーション全体の変数はrootコンポーネントで一元管理するのが通例
* 親から渡されるpropsが変化すると自動的にコンポーネントのDOMがリレンダリングされる
* リレンダリング時にVirtualDOMの仕組みで変化のあったDOMのみが更新される
* コンポーネント側で管理される変数は this.state が用意されている。stateを操作する関数として以下が提供されている(以下の関数を操作して始めてDOMが変化する)
    * getInitialState()
    * this.setState(...)

[_CHECK POINT 8_](https://github.com/hiyuzawa/spa_react_study/tree/a01db423c38006ab9680e682ed8f4e43cb1d80c8 )

### すこしAdvanceなReactの利用法

* React内の変数はrootコンポーネントのstateで管理する
* イベントを処理する(グローバルな変数を扱う)関数はrootコンポーネントで定義しそれを処理を行うコンポーネントまでpropsで輸送する
* rootのstateが変化すると応じてDOMが再描画される

まあ、実際に動かしてソース見た方が早い。

[_CHECK POINT 9_](https://github.com/hiyuzawa/spa_react_study/tree/4b2563cf3dd35d2de644f4144000bc64d0488151)

#### refs

コンポーネント内のDOM要素はref属性をつけるとコンポーネント側から参照可能(this.refs)になる

```
<input type="text" ref="hoge" />
↓
ReactDOM.findDOMNode(this.refs.hoge)
```

[_CHECK POINT 10_](https://github.com/hiyuzawa/spa_react_study/tree/6253d76d59a4b9ba0939d3c8215fceb3e4e1429e)


## Redux (flux)

ReactはあくまでもMVCで言うのところのVのライブラリにすぎない。FacebookはReactにおけるデータの取り扱いについて
[flux](https://github.com/facebook/flux) という設計手法を提案(推奨している). 
fluxはあくまでも手法.実装は各種ある。一番有名でFacebookも推しているのは [Redux](https://github.com/rackt/redux) である

Reduxの紹介を始めるとそうとうややこしくなるので今回は割愛する. 興味あれば以下を参照.

* [reduxを試してみた(1日目) - Reduxをざっくり理解する - Qiita](http://qiita.com/kompiro/items/7ddca41bef00444e14c7)
* [人気のFluxフレームワークReduxをさわってみた](http://amagitakayosi.hatenablog.com/entry/2015/07/30/000000)
* [ReduxとES6でReact.jsのチュートリアルの写経](http://blog.bokuweb.me/entry/redux-tutorial)

## material-ui

[material-ui](http://www.material-ui.com/) は GoogleのマテリアルデザインをReactベースで利用できるコンポーネント集.
Reactのコンポーネントはステートレスなので、自分のアプリケーションに簡単に適応できる

#### install

```
$ npm install material-ui --save-dev
$ npm install react-tap-event-plugin --save-dev  # material-ui@1.0 まではコレが必要
```

Topレベルで以下を実行しておく (これをしないとタップイベントが反応しなくハマる)
```
let injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();
```

[app-bar](http://www.material-ui.com/#/components/app-bar)
```
import AppBar from 'material-ui/lib/app-bar';

render: function() {
    return (
        <div className="Hello">
            <AppBar
                title="20160112_benkyokai"
                iconClassNameRight="muidocs-icon-navigation-expand-more"
                onLeftIconButtonTouchTap={this.menuLeftIconTapped}
            />
            ...
```

[Buttons](http://www.material-ui.com/#/components/buttons)
```
import RaisedButton from 'material-ui/lib/raised-button';

render() {
    return (
        <div className="sample_es2015">
            <RaisedButton label="count up!" onTouchTap={this.clickCounter} />
            ...
```

[_CHECK POINT 11_](https://github.com/hiyuzawa/spa_react_study/tree/ad0440273a8ed77f896f161958f7789ef01ecd5d)

おわり.


