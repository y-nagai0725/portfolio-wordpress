<!DOCTYPE html>
<html lang="ja">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="format-detection" content="telephone=no">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link
    href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700;900&amp;family=Oswald:wght@400;700&amp;display=swap"
    rel="stylesheet">
  <?php wp_head(); ?>
</head>

<?php
// ページごとにbodyのIDを決める
$my_body_id = '';

if (is_front_page() || is_home()) {
  $my_body_id = 'top';
} elseif (is_post_type_archive('works') || is_page('works')) {
  $my_body_id = 'works';
} elseif (is_singular('works')) {
  $my_body_id = 'works-introduction';
} elseif (is_page('contact')) {
  $my_body_id = 'contact';
} elseif (is_page('thanks')) {
  $my_body_id = 'thanks';
}
?>

<body <?php if ($my_body_id) {
        echo 'id="' . esc_attr($my_body_id) . '"';
      } ?> <?php body_class(); ?>>
  <?php wp_body_open(); ?>
  <div class="wrapper">
    <header class="l-header">
      <div class="l-header__inner">
        <h1 class="l-header__logo">
          <a href="<?php echo esc_url(home_url('/')); ?>" class="l-header__logo-link">NAGAI YOSHITAKA</a>
        </h1>
        <button class="l-header__hamburger">
          <span class="l-header__hamburger-line l-header__hamburger-line--top"></span>
          <span class="l-header__hamburger-line l-header__hamburger-line--middle"></span>
          <span class="l-header__hamburger-line l-header__hamburger-line--bottom"></span>
        </button>
        <nav class="l-header__nav">
          <ul class="l-header__nav-list">
            <li class="l-header__nav-item"><a href="<?php echo esc_url(home_url('/')); ?>" class="l-header__nav-link">HOME</a></li>
            <li class="l-header__nav-item"><a href="<?php echo esc_url(get_post_type_archive_link('works')); ?>" class="l-header__nav-link">WORKS</a></li>
            <li class="l-header__nav-item"><a href="<?php echo esc_url(home_url('/contact/')); ?>" class="l-header__nav-link">CONTACT</a></li>
            <li class="l-header__nav-item"><a href="https://github.com/y-nagai0725" class="l-header__nav-link l-header__nav-link--github"
                target="_blank">GITHUB</a></li>
          </ul>
        </nav>
      </div>
    </header>