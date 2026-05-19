<?php get_header(); ?>

<main>
  <div class="p-contact">
    <h2 class="p-contact__ttl c-ttl c-ttl--center c-ttl--page">CONTACT</h2>
    <div class="p-contact__contents-wrap">
      <p class="p-contact__txt">
        入力フォームよりお気軽にお問い合わせ下さい。<br>
        必須項目を入力後、送信ボタンを押して下さい。
      </p>
      <div class="p-contact__form-wrap">
        <p class="p-contact__form-notice">必須項目</p>
        <?php echo do_shortcode('[contact-form-7 id="cad877c" title="お問い合わせフォーム"]'); ?>
      </div>
    </div>
  </div>
</main>

<?php
get_template_part('template-parts/breadcrumb', null, array(
  'items' => array(
    array('text' => 'CONTACT', 'url' => '', 'is_en' => true)
  )
));
?>

<?php get_footer(); ?>