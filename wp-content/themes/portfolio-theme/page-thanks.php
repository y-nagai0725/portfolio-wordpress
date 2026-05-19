<?php get_header(); ?>

<main>
  <div class="p-thanks">
    <h2 class="p-thanks__ttl c-ttl c-ttl--center c-ttl--page">THANKS</h2>
    <div class="p-thanks__contents-wrap">
      <p class="p-thanks__txt">
        お問い合わせありがとうございました。<br><br>
        メッセージの送信が完了いたしました。<br>
        ご入力いただいたメールアドレス宛に、<br>
        自動返信メールを送信しております。<br><br>
        内容を確認次第、ご連絡いたしますので、<br>
        今しばらくお待ちくださいませ。
      </p>
      <div class="p-thanks__link-wrap">
        <a href="<?php echo esc_url(home_url('/')); ?>" class="p-thanks__link c-btn c-btn--medium">HOME</a>
        <a href="<?php echo esc_url(get_post_type_archive_link('works')); ?>" class="p-thanks__link c-btn c-btn--medium">WORKS</a>
        <a href="<?php echo esc_url(home_url('/contact/')); ?>" class="p-thanks__link c-btn c-btn--medium">CONTACT</a>
      </div>
    </div>
  </div>
</main>

<?php

get_template_part('template-parts/breadcrumb', null, array(
  'items' => array(
    array('text' => 'CONTACT', 'url' => home_url('/contact/'), 'is_en' => true),
    array('text' => 'THANKS', 'url' => '', 'is_en' => true)
  )
));
?>

<?php get_footer(); ?>