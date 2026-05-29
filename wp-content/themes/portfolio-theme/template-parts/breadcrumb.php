<?php
// =========================================================================
// パンくずリスト用テンプレートパーツ (breadcrumb.php)
// 各下層ページで共通して呼び出されるパンくずリストを出力します。
// get_template_part() の引数からナビゲーション項目（$args['items']）を受け取ります。
// =========================================================================

// 呼び出し元から 'items' という配列が渡されていなければ、空の配列として初期化
$items = isset($args['items']) ? $args['items'] : array();
?>
<nav aria-label="パンくずリスト">
  <ul class="c-breadcrumb">
    <li class="c-breadcrumb__list">
      <a href="<?php echo esc_url(home_url('/')); ?>" class="c-breadcrumb__link c-breadcrumb__link--en">HOME</a>
    </li>

    <?php foreach ($items as $item) : ?>
      <li class="c-breadcrumb__list">

        <?php if (!empty($item['url'])) : ?>
          <?php
          $class = 'c-breadcrumb__link';

          // 'is_en' が true に設定されている場合、欧文フォント用のクラスを付与
          if (!empty($item['is_en'])) {
            $class .= ' c-breadcrumb__link--en';
          }
          ?>
          <a href="<?php echo esc_url($item['url']); ?>" class="<?php echo esc_attr($class); ?>">
            <?php echo esc_html($item['text']); ?>
          </a>

        <?php else : ?>
          <?php
          $class = 'c-breadcrumb__txt';

          // 'is_en' が true に設定されている場合、欧文フォント用のクラスを付与
          if (!empty($item['is_en'])) {
            $class .= ' c-breadcrumb__txt--en';
          }
          ?>
          <p class="<?php echo esc_attr($class); ?>">
            <?php echo esc_html($item['text']); ?>
          </p>
        <?php endif; ?>

      </li>
    <?php endforeach; ?>
  </ul>
</nav>