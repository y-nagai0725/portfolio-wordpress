# ポートフォリオサイト -WordPress ver-<!-- omit in toc -->
![ポートフォリオサイトFV画像](https://github.com/user-attachments/assets/38cbe5b2-06ee-499e-b18e-4b69f5acc058)

## 目次<!-- omit in toc -->
- [概要](#概要)
- [公開URL](#公開url)
- [目的](#目的)
- [こだわったポイント](#こだわったポイント)
- [使用技術](#使用技術)
- [使用フォント](#使用フォント)
- [デザインカンプ](#デザインカンプ)
- [各画面・機能紹介](#各画面機能紹介)
- [WordPressプラグイン使用による実装](#wordpressプラグイン使用による実装)
  - [Custom Post Type UI (CPT UI)](#custom-post-type-ui-cpt-ui)
  - [Advanced Custom Fields (ACF)](#advanced-custom-fields-acf)
  - [SEO SIMPLE PACK](#seo-simple-pack)
  - [SiteGuard WP Plugin \& WP Mail SMTP](#siteguard-wp-plugin--wp-mail-smtp)
  - [Contact Form 7](#contact-form-7)

## 概要
[既存のポートフォリオサイト](https://github.com/y-nagai0725/portfolio)をWordPressにて管理・運用できるようにしました。

既存の静的サイト（HTML/CSS/JS/GSAP）が持つデザインやスクロールアニメーションを一切崩すことなく、実務を見据えた保守性の高い動的サイト（CMS）へと移行を行っています。

## 公開URL
[https://portfolio.mikanbako.jp/](https://portfolio.mikanbako.jp/)

## 目的
フロントエンド技術とバックエンド技術（WordPress、PHP）を連携させる実装力をアピールするため。また、今後の継続的な作品追加やコンテンツの拡充を、コードを直接編集することなく管理画面から容易に行える運用基盤を構築することを目的としています。

## こだわったポイント
* **静的サイトからCMSへの完全移行（CPT UI × ACF）**

  既存の静的ポートフォリオサイトのデザインやレイアウトを一切崩すことなく、WordPressによる動的なコンテンツ管理システムへと移行しました。「Custom Post Type UI」で独自の投稿タイプを作成し、「Advanced Custom Fields (ACF)」を用いてフォントの制御や表示順、トップページでの表示可否など、多様な入力フィールドを構築。これにより、コードを直接編集することなく、管理画面からの直感的な操作だけで実績の追加・更新が可能な、保守性の高いサイトを実現しています。

* **本番環境におけるモダンなデプロイ・運用環境の構築**

  さくらVPS（Ubuntu / Apache）上で、Webサーバー権限を用いた安全なGit連携（`git pull`によるデプロイ）を構築。また、プラグインを利用した確実なSMTPメール送信環境を整えるなど、インフラ・バックエンド領域までこだわって構築しています。

## 使用技術
**フロントエンド**
* GSAP (アニメーション)
* Three.js (FV～次セクションへの背景描画に使用)
* JavaScript
* Sass (SCSS)
* HTML

**バックエンド**
* WordPress
* PHP

**データベース**
* MySQL

**インフラ・その他**
* さくらVPS
* Apache (Webサーバー)
* Git / GitHub (バージョン管理・デプロイ)

## 使用フォント
* 和文フォント
  * [Noto Sans JP](https://fonts.google.com/noto/specimen/Noto+Sans+JP)
* 欧文フォント
  * [Oswald](https://fonts.google.com/specimen/Oswald)

## デザインカンプ
[Figmaページ](https://www.figma.com/design/oxv9pQ7REeRA8bIJeLAS96/%E3%83%9D%E3%83%BC%E3%83%88%E3%83%95%E3%82%A9%E3%83%AA%E3%82%AA%E3%82%B5%E3%82%A4%E3%83%88?node-id=0-1&t=BzG1GcLpfhDDp16S-1)（Figmaページへのリンクです。閲覧のみ可能です。）

## 各画面・機能紹介
[既存のポートフォリオサイトのリポジトリ](https://github.com/y-nagai0725/portfolio)をご参照ください。

## WordPressプラグイン使用による実装
単にプラグインを導入するだけでなく、サイト全体のパフォーマンスやセキュリティ、既存デザインとの融合を意識した選定とカスタマイズを行っています。

### Custom Post Type UI (CPT UI)
「Works（作品）」という独自のカスタム投稿タイプを作成するために使用しました。標準の「投稿」とは完全に独立させることで、実績データ専用のクリーンな管理画面を構築しています。

### Advanced Custom Fields (ACF)
作品詳細ページの多様な情報（概要、使用技術、特長、FigmaやGitHubリンクなど）を管理画面からノーコードで入力できるように実装しました。また、「一覧表示順序（数値を基準とした取得）」や「トップページに表示する作品の選択、表示順序」など、テーマ側のPHPと連携した制御を行っています。

### SEO SIMPLE PACK
ページごとの `<title>` や `description`、OGP画像などのメタデータを管理するために導入しました。各作品に合わせた最適なSEO・SNSシェア対策を管理画面から個別に設定できるようにしています。

### SiteGuard WP Plugin & WP Mail SMTP
実務レベルの運用・セキュリティ対策として導入。ログインURLの変更や画像認証による不正アクセス防止に加え、お問い合わせフォームのメール送信をWordPress標準機能から「WP Mail SMTP」経由に切り替えることで、スパム判定リスクを抑えた確実なメール送信環境を実現しています。

### Contact Form 7
お問い合わせフォームの実装に使用しています。導入にあたり、デフォルトで出力される不要なCSSや自動整形機能（pタグやbrタグの挿入）を [`functions.php`](/wp-content/themes/portfolio-theme/functions.php) のフックを用いて完全に無効化しました。既存サイトに合わせたオリジナルデザインをSCSSで一から当て直し、送信成功時にはJavaScriptと連動してサンクスページへシームレスにリダイレクトさせるなど、ユーザー体験を損なわない細やかなカスタマイズを行っています。
