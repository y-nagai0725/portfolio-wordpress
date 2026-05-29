<?php
// =========================================================================
// フッターテンプレート (footer.php)
// サイトの全ページで共通して読み込まれるフッターUIと、閉じタグを出力します。
// =========================================================================
?>
<footer class="l-footer">
  <div class="l-footer__inner">
    <p class="l-footer__logo">
      <a href="<?php echo esc_url(home_url('/')); ?>" class="l-footer__logo-link js-clip" data-txt="NAGAI YOSHITAKA">NAGAI YOSHITAKA</a>
    </p>
    <p class="l-footer__copyright"><small class="l-footer__small">&copy; 2026 NAGAI YOSHITAKA PORTFOLIO.</small></p>

    <button class="l-footer__back-btn"></button>
  </div>
</footer>
</div><?php wp_footer(); ?>
</body>

</html>