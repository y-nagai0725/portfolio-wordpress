<!DOCTYPE html>
<html lang="ja">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="format-detection" content="telephone=no">
  <meta name="description" content="">
  <meta name="keywords" content="">
  <meta name="robots" content="noindex, nofollow">
  <link rel="icon" href="images/common/favicon.ico">
  <link rel="apple-touch-icon" sizes="180x180" href="images/common/apple-touch-icon.png">
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
  <div id="wrapper" class="wrapper">
    <header id="header" class="header">
      <div class="header__inner">
        <h1 class="header__logo">
          <a href="index.html" id="header__logo-link" class="header__logo-link">NAGAI YOSHITAKA</a>
        </h1>
        <div id="menu-btn" class="menu-btn">
          <span class="menu-btn__top"></span>
          <span class="menu-btn__middle"></span>
          <span class="menu-btn__bottom"></span>
        </div>
        <nav id="gnav" class="gnav">
          <ul class="gnav__wrap">
            <li class="gnav__list"><a href="index.html" class="gnav__link">HOME</a></li>
            <li class="gnav__list"><a href="works/index.html" class="gnav__link">WORKS</a></li>
            <li class="gnav__list"><a href="contact/index.html" class="gnav__link">CONTACT</a></li>
            <li class="gnav__list"><a href="https://github.com/y-nagai0725" class="gnav__link github"
                target="_blank">GITHUB</a></li>
          </ul>
        </nav>
      </div>
    </header>