<?php
// テーマのセットアップ
function my_portfolio_setup()
{
  // テーマにサムネイル画像（アイキャッチ）の機能を有効化する
  add_theme_support('post-thumbnails');
}
add_action('after_setup_theme', 'my_portfolio_setup');

// CSSとJSファイルの読み込み
function my_portfolio_enqueue_scripts()
{
  // ----------------------------------------
  // CSSの読み込み
  // ----------------------------------------
  wp_enqueue_style(
    'my-portfolio-style',
    get_template_directory_uri() . '/css/style.css',
    array(),
    filemtime(get_theme_file_path('/css/style.css')) // キャッシュ対策
  );

  // ----------------------------------------
  // JSの読み込み
  // ----------------------------------------
  // GSAP本体
  wp_enqueue_script('gsap', get_template_directory_uri() . '/js/gsap.min.js', array(), null, true);
  // GSAPプラグイン (GSAP本体の後に読み込む)
  wp_enqueue_script('scroll-trigger', get_template_directory_uri() . '/js/ScrollTrigger.min.js', array('gsap'), null, true);
  wp_enqueue_script('scroll-to', get_template_directory_uri() . '/js/ScrollToPlugin.min.js', array('gsap'), null, true);

  // 共通JS (GSAPとプラグインの後に読み込む)
  wp_enqueue_script('common-script', get_template_directory_uri() . '/js/common.js', array('gsap', 'scroll-trigger', 'scroll-to'), filemtime(get_theme_file_path('/js/common.js')), true);

  // トップページのみで読み込むJS
  if (is_front_page() || is_home()) {
    // top.js
    wp_enqueue_script('top-script', get_template_directory_uri() . '/js/top.js', array('gsap', 'scroll-trigger', 'common-script'), filemtime(get_theme_file_path('/js/top.js')), true);

    // Three.js関連の読み込み
    wp_enqueue_script('three-js', get_template_directory_uri() . '/js/three.module.js', array(), null, true);
    wp_enqueue_script('top-mv-canvas', get_template_directory_uri() . '/js/top-mv-canvas.js', array('three-js'), filemtime(get_theme_file_path('/js/top-mv-canvas.js')), true);
    wp_enqueue_script('top-ray-canvas', get_template_directory_uri() . '/js/top-ray-canvas.js', array('three-js'), filemtime(get_theme_file_path('/js/top-ray-canvas.js')), true);

    // ★JSへWordPressの画像パスを渡す処理★
    wp_localize_script('top-mv-canvas', 'myThemeData', array(
      'themeUrl' => get_template_directory_uri()
    ));
  }

  // 作品一覧ページのみで読み込むJS (アーカイブページやカスタム投稿タイプアーカイブなど)
  if (is_post_type_archive('works') || is_page('works')) {
    wp_enqueue_script('works-script', get_template_directory_uri() . '/js/works.js', array('gsap', 'scroll-trigger', 'common-script'), filemtime(get_theme_file_path('/js/works.js')), true);
  }

  // 作品詳細ページのみで読み込むJS
  if (is_singular('works')) {
    wp_enqueue_script('works-intro-script', get_template_directory_uri() . '/js/worksIntroduction.js', array('gsap', 'scroll-trigger', 'common-script'), filemtime(get_theme_file_path('/js/worksIntroduction.js')), true);
    wp_enqueue_script('works-intro-horizontal-script', get_template_directory_uri() . '/js/worksIntroduction_horizontalScroll.js', array('gsap', 'scroll-trigger', 'common-script'), filemtime(get_theme_file_path('/js/worksIntroduction_horizontalScroll.js')), true);
  }
}
add_action('wp_enqueue_scripts', 'my_portfolio_enqueue_scripts');

// Three.js関連のscriptタグに type="module" を付与する
function add_type_attribute($tag, $handle, $src)
{
  // type="module" を付与したいJSのハンドル名を配列で指定
  $module_handles = array('three-js', 'top-mv-canvas', 'top-ray-canvas');

  if (in_array($handle, $module_handles)) {
    $tag = '<script type="module" src="' . esc_url($src) . '"></script>' . "\n";
  }
  return $tag;
}
add_filter('script_loader_tag', 'add_type_attribute', 10, 3);
