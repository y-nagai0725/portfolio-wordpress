<?php

// =========================================================================
// テーマの初期設定
// =========================================================================

/**
 * テーマのセットアップ
 */
function my_portfolio_setup()
{
  // サムネイル画像（アイキャッチ）の有効化
  add_theme_support('post-thumbnails');

  // <title>タグの自動出力
  add_theme_support('title-tag');
}
add_action('after_setup_theme', 'my_portfolio_setup');

// =========================================================================
// CSS・JavaScriptの読み込み
// =========================================================================
/**
 * 各種ファイルのエンキュー
 */
function my_portfolio_enqueue_scripts()
{
  // ----- CSSの読み込み -----
  wp_enqueue_style(
    'my-portfolio-style',
    get_template_directory_uri() . '/css/style.css',
    array(),
    filemtime(get_theme_file_path('/css/style.css')) // キャッシュ対策
  );

  // ----- JavaScriptの読み込み -----
  // GSAP本体
  wp_enqueue_script('gsap', get_template_directory_uri() . '/js/gsap.min.js', array(), null, true);
  // GSAPプラグイン (GSAP本体の後に読み込む)
  wp_enqueue_script('scroll-trigger', get_template_directory_uri() . '/js/ScrollTrigger.min.js', array('gsap'), null, true);
  wp_enqueue_script('scroll-to', get_template_directory_uri() . '/js/ScrollToPlugin.min.js', array('gsap'), null, true);

  // 共通JS
  wp_enqueue_script('common-script', get_template_directory_uri() . '/js/common.js', array('gsap', 'scroll-trigger', 'scroll-to'), filemtime(get_theme_file_path('/js/common.js')), true);

  // トップページ専用JS
  if (is_front_page() || is_home()) {
    wp_enqueue_script('top-mv-script', get_template_directory_uri() . '/js/top-mv.js', array('gsap', 'scroll-trigger', 'common-script'), filemtime(get_theme_file_path('/js/top-mv.js')), true);
    wp_enqueue_script('top-skill-script', get_template_directory_uri() . '/js/top-skill.js', array('gsap', 'scroll-trigger', 'common-script'), filemtime(get_theme_file_path('/js/top-skill.js')), true);
    wp_enqueue_script('top-works-script', get_template_directory_uri() . '/js/top-works.js', array('gsap', 'scroll-trigger', 'common-script'), filemtime(get_theme_file_path('/js/top-works.js')), true);
    wp_enqueue_script('top-bg-script', get_template_directory_uri() . '/js/top-bg.js', array('gsap', 'scroll-trigger', 'common-script'), filemtime(get_theme_file_path('/js/top-bg.js')), true);
  }

  // 作品一覧ページ専用JS
  if (is_post_type_archive('works') || is_page('works')) {
    wp_enqueue_script('works-filter-script', get_template_directory_uri() . '/js/works-filter.js', array('gsap', 'scroll-trigger', 'common-script'), filemtime(get_theme_file_path('/js/works-filter.js')), true);
  }

  // 作品詳細ページ専用JS
  if (is_singular('works')) {
    wp_enqueue_script('works-single-script', get_template_directory_uri() . '/js/works-single.js', array('gsap', 'scroll-trigger', 'common-script'), filemtime(get_theme_file_path('/js/works-single.js')), true);

    // 現在の作品IDを取得し、横スクロール設定が有効な場合のみ専用JSを読み込む
    $post_id = get_queried_object_id();
    if (get_field('use_horizontal_scroll', $post_id)) {
      wp_enqueue_script('works-single-horizontal-script', get_template_directory_uri() . '/js/works-single-horizontal.js', array('gsap', 'scroll-trigger', 'common-script'), filemtime(get_theme_file_path('/js/works-single-horizontal.js')), true);
    }
  }

  // お問い合わせページ専用JS
  if (is_page('contact')) {
    wp_enqueue_script('contact-script', get_template_directory_uri() . '/js/contact.js', array(), filemtime(get_theme_file_path('/js/contact.js')), true);

    // PHPからJSへデータを渡す（サンクスページのURL等）
    wp_localize_script('contact-script', 'myGlobalData', array(
      'thanksUrl' => esc_url(home_url('/thanks/'))
    ));
  }
}
add_action('wp_enqueue_scripts', 'my_portfolio_enqueue_scripts');

// =========================================================================
// scriptタグの属性変更
// =========================================================================
/**
 * 特定のスクリプトに type="module" を付与する
 */
function add_type_attribute($tag, $handle, $src)
{
  $module_handles = array(
    'top-bg-script',
    'common-script',
    'top-mv-script',
    'top-skill-script',
    'top-works-script',
    'works-filter-script',
    'works-single-script',
    'works-single-horizontal-script',
    'contact-script'
  );

  // in_arrayの第3引数にtrueを指定し、厳密な型チェックを実施
  if (in_array($handle, $module_handles, true)) {
    $tag = '<script type="module" src="' . esc_url($src) . '"></script>' . "\n";
  }
  return $tag;
}
add_filter('script_loader_tag', 'add_type_attribute', 10, 3);

// =========================================================================
// その他の設定・カスタマイズ
// =========================================================================

// Contact Form 7: 自動整形（<p>や<br>の挿入）を無効化
add_filter('wpcf7_autop_or_not', '__return_false');

// Contact Form 7: デフォルトCSSの読み込みを無効化
add_filter('wpcf7_load_css', '__return_false');

// WordPress: 画像の自動縮小機能（長辺2560px制限）を無効化
add_filter('big_image_size_threshold', '__return_false');

// WordPress: 本番環境での管理画面バーを非表示化
add_filter('show_admin_bar', '__return_false');

// =========================================================================
// SVG画像のアップロード許可
// =========================================================================
/**
 * メディアライブラリへのSVGアップロードを許可する
 */
function add_svg_to_upload_mimes($mimes)
{
  $mimes['svg'] = 'image/svg+xml';
  return $mimes;
}
add_filter('upload_mimes', 'add_svg_to_upload_mimes');
