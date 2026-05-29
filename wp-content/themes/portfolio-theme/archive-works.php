<?php
// =========================================================================
// 作品一覧（アーカイブ）ページテンプレート (archive-works.php)
// カスタム投稿タイプ「works」の一覧を表示し、スキルごとの絞り込み機能を実装します。
// =========================================================================
get_header(); ?>

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
      // -------------------------------------------------------------------------
      // 作品取得クエリの定義
      // ACFの「list_order（一覧表示順）」を基準に、数値の降順（DESC）で全件取得する
      // -------------------------------------------------------------------------
      $args = array(
        'post_type'      => 'works',
        'posts_per_page' => -1, // 全件表示
        'meta_key'       => 'list_order',
        'orderby'        => 'meta_value_num',
        'order'          => 'DESC'
      );

      $works_query = new WP_Query($args);

      if ($works_query->have_posts()) :
        while ($works_query->have_posts()) : $works_query->the_post();

          // -------------------------------------------------------------------------
          // 各作品のメタデータ・タクソノミー取得
          // -------------------------------------------------------------------------

          // タイトルへの欧文フォント適用判定
          $en_class = get_field('use_en_font') ? 'c-card__ttl--en' : '';

          // 職業訓練での制作物かどうかを判定（専用のスタイルを適用するため）
          $training_class = get_field('is_training_work') ? 'c-card--training' : '';

          // 該当作品に紐づく「使用技術（カスタムタクソノミー: skill）」を取得
          $skills = get_the_terms(get_the_ID(), 'skill');

          // JavaScriptでのフィルタリング用に、スキルのスラッグを半角スペース区切りで連結した文字列を生成
          $skill_slugs = '';
          if ($skills && !is_wp_error($skills)) {
            foreach ($skills as $skill) {
              $skill_slugs .= $skill->slug . ' ';
            }
          }
      ?>
          <li class="p-works-archive__works-item c-card <?php echo esc_attr($training_class); ?>" data-skills="<?php echo esc_attr(trim($skill_slugs)); ?>">
            <a href="<?php echo esc_url(get_the_permalink()); ?>" class="c-card__link">
              <?php
              if (has_post_thumbnail()) {
                the_post_thumbnail('large', array('class' => 'c-card__img', 'alt' => get_the_title() . 'のサムネイル画像'));
              }
              ?>
            </a>

            <h3 class="c-card__ttl <?php echo esc_attr($en_class); ?>"><?php the_title(); ?></h3>

            <?php if ($skills && !is_wp_error($skills)): ?>
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
        // サブクエリ使用後は必ずグローバル変数をリセットする
        wp_reset_postdata();
      endif;
      ?>
    </ul>
  </div>
</main>

<?php
// =========================================================================
// パンくずリストの呼び出し
// =========================================================================
get_template_part('template-parts/breadcrumb', null, array(
  'items' => array(
    array('text' => 'WORKS', 'url' => '', 'is_en' => true)
  )
));
?>

<?php get_footer(); ?>