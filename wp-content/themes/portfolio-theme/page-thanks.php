<?php get_header(); ?>

<main>
  <div class="thanks-area">
    <h2 class="thanks-area__ttl">THANKS</h2>
    <p class="thanks-area__txt">
      お問い合わせありがとうございました。<br>
      内容を確認し折り返しご連絡致します。
    </p>
    <div class="thanks-area__link-wrap">
      <a href="<?php echo esc_url(home_url('/')); ?>" class="thanks-area__link">HOME</a>
      <a href="<?php echo esc_url(get_post_type_archive_link('works')); ?>" class="thanks-area__link">WORKS</a>
      <a href="<?php echo esc_url( home_url('/contact/') ); ?>" class="thanks-area__link">CONTACT</a>
    </div>
  </div>
  <ul class="breadcrumb">
    <li class="breadcrumb__list">
      <a href="<?php echo esc_url(home_url('/')); ?>" class="breadcrumb__link">HOME</a>
    </li>
    <li class="breadcrumb__list">
      <a href="<?php echo esc_url( home_url('/contact/') ); ?>" class="breadcrumb__link">CONTACT</a>
    </li>
    <li class="breadcrumb__list">
      <p class="breadcrumb__txt en">THANKS</p>
    </li>
  </ul>
</main>

<?php get_footer(); ?>