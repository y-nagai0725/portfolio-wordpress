<?php
// 呼び出し元から 'items' という配列が渡されていなければ、空の配列にする
$items = isset($args['items']) ? $args['items'] : array();
?>
<nav aria-label="パンくずリスト">
  <ul class="c-breadcrumb">
    <li class="c-breadcrumb__list">
      <a href="<?php echo esc_url(home_url('/')); ?>" class="c-breadcrumb__link c-breadcrumb__link--en">HOME</a>
    </li>

    <?php foreach ($items as $item) : ?>
      <li class="c-breadcrumb__list">

        <?php if (!empty($item['url'])) : // URLがある場合（中間階層）
        ?>
          <?php
          // ベースのクラス
          $class = 'c-breadcrumb__link';

          // 'is_en' が空でない場合（1やtrueなら）クラスを追加
          if (!empty($item['is_en'])) {
            $class .= ' c-breadcrumb__link--en';
          }
          ?>
          <a href="<?php echo esc_url($item['url']); ?>" class="<?php echo esc_attr($class); ?>">
            <?php echo esc_html($item['text']); ?>
          </a>

        <?php else : // URLがない場合（現在のページ）
        ?>
          <?php
          // ベースのクラス
          $class = 'c-breadcrumb__txt';

          // 'is_en' が空でない場合（1やtrueなら）クラスを追加
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