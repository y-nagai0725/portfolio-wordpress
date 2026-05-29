<?php
// =========================================================================
// お問い合わせページテンプレート (page-contact.php)
// 固定ページ「お問い合わせ」のレイアウトと、Contact Form 7のフォームを出力します。
// =========================================================================
get_header(); ?>

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

        <?php
        // Contact Form 7 のショートコードを実行し、動的にフォームを出力します
        // ※ functions.php にて wpcf7_autop_or_not を無効化しているため、
        //    余計な p タグや br タグは挿入されず、設定通りのHTMLが出力されます。
        echo do_shortcode('[contact-form-7 id="cad877c" title="お問い合わせフォーム"]');
        ?>
      </div>
    </div>
  </div>
</main>

<?php
// =========================================================================
// パンくずリストの呼び出し
// =========================================================================
get_template_part('template-parts/breadcrumb', null, array(
  'items' => array(
    array('text' => 'CONTACT', 'url' => '', 'is_en' => true)
  )
));
?>

<?php get_footer(); ?>