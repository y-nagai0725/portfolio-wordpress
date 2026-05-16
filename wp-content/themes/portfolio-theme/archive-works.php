<?php get_header(); ?>

<main>
  <div class="p-works-archive">
    <div class="p-works-archive__head">
      <h2 class="p-works-archive__ttl c-ttl c-ttl--page">WORKS</h2>
      <div class="p-works-archive__filter-wrap">
        <button class="p-works-archive__filter-btn is-active" data-filter="all">ALL</button>
        <button class="p-works-archive__filter-btn" data-filter="vue-js">Vue.js</button>
        <button class="p-works-archive__filter-btn" data-filter="wordpress">WordPress</button>
        <button class="p-works-archive__filter-btn" data-filter="gsap">GSAP</button>
      </div>
    </div>
    <ul class="p-works-archive__works-list">
      <?php
      // ACFの「list_order」で並び替えるための条件を指定
      $args = array(
        'post_type'      => 'works',
        'posts_per_page' => -1, // 「-1」は全件表示
        'meta_key'       => 'list_order',
        'orderby'        => 'meta_value_num',
        'order'          => 'DESC'
      );

      // 指定した条件で、新しいクエリを作る
      $works_query = new WP_Query($args);

      // データがあるかチェックしてループ開始
      if ($works_query->have_posts()) :
        while ($works_query->have_posts()) : $works_query->the_post();

          // タイトルへの欧文フォント適用
          $en_class = get_field('use_en_font') ? 'c-card__ttl--en' : '';

          // 職業訓練作品表示用クラス
          $training_class = get_field('is_training_work') ? 'c-card--training' : '';

          // この作品に設定された「使用技術（タクソノミー）」を取得
          $skills = get_the_terms(get_the_ID(), 'skill');

          // フィルター用skillスラッグ文字列作成
          $skill_slugs = '';
          if ($skills && ! is_wp_error($skills)) {
            foreach ($skills as $skill) {
              // スラッグを半角スペース空けで繋げる
              $skill_slugs .= esc_attr($skill->slug) . ' ';
            }
          }
      ?>
          <li class="c-card <?php echo $training_class; ?>" data-skills="<?php echo trim($skill_slugs); ?>">
            <a href="<?php the_permalink(); ?>" class="c-card__link">
              <?php
              if (has_post_thumbnail()) {
                the_post_thumbnail('large', array('class' => 'c-card__img', 'alt' => get_the_title() . 'サムネイル画像'));
              }
              ?>
            </a>
            <h3 class="c-card__ttl <?php echo $en_class; ?>"><?php the_title(); ?></h3>
            <?php if ($skills && ! is_wp_error($skills)): ?>
              <ul class="c-card__tag-list">
                <?php foreach ($skills as $skill) : ?>
                  <li class="c-card__tag-item">
                    <span class="c-tag"><?php echo esc_html($skill->name); ?></span>
                  </li>
                <?php endforeach; ?>
              </ul>
            <?php endif; ?>
          </li>
      <?php
        endwhile;
        // リセット処理
        wp_reset_postdata();
      endif;
      ?>
    </ul>
  </div>
</main>

<?php
get_template_part('template-parts/breadcrumb', null, array(
  'items' => array(
    array('text' => 'WORKS', 'url' => '', 'is_en' => true)
  )
));
?>

<?php get_footer(); ?>