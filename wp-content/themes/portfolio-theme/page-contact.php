<?php get_header(); ?>

<main>
  <div class="contact-area">
    <h2 class="contact-area__ttl">CONTACT</h2>
    <p class="contact-area__txt">
      入力フォームよりお気軽にお問い合わせ下さい。<br>
      必須項目を入力後、送信ボタンを押して下さい。
    </p>
    <div id="contact-area__form" class="contact-area__form">
      <p class="contact-area__form-notice">必須項目</p>
      <?php echo do_shortcode('[contact-form-7 id="cad877c" title="お問い合わせフォーム"]'); ?>
    </div>
  </div>
  <ul class="breadcrumb">
    <li class="breadcrumb__list">
      <a href="<?php echo esc_url(home_url('/')); ?>" class="breadcrumb__link">HOME</a>
    </li>
    <li class="breadcrumb__list">
      <p class="breadcrumb__txt en">CONTACT</p>
    </li>
  </ul>
</main>

<?php get_footer(); ?>