<?php get_header(); ?>

<main>
  <div class="works-archive-container">
    <div class="works-view">
      <div class="works-view__box">
        <h2 class="works-view__ttl">WORKS</h2>
        <div class="works-view__filter-wrap">
          <span class="works-view__filter-btn is-active" data-filter="all">ALL</span>
          <span class="works-view__filter-btn" data-filter="vue-js">Vue.js</span>
          <span class="works-view__filter-btn" data-filter="wordpress">WordPress</span>
          <span class="works-view__filter-btn" data-filter="gsap">GSAP</span>
        </div>
      </div>
      <ul class="works-view__ul">
        <?php
        // ACFの「list_order」で並び替えるための条件を指定
        $args = array(
          'post_type'      => 'works',
          'posts_per_page' => -1, // 「-1」は全件表示
          'meta_key'       => 'list_order',
          'orderby'        => 'meta_value_num',
          'order'          => 'ASC'
        );

        // 指定した条件で、新しいクエリを作る
        $works_query = new WP_Query($args);

        // データがあるかチェックしてループ開始
        if ($works_query->have_posts()) :
          while ($works_query->have_posts()) : $works_query->the_post();

            // タイトルへの欧文フォント適用
            $en_class = get_field('use_en_font') ? 'en' : '';

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

            // skill表示用文字列作成
            $skill_names = '';
            if ($skills && ! is_wp_error($skills)) {
              foreach ($skills as $index => $skill) {
                $skill_names .= esc_attr($skill->name);
                if ($index !== array_key_last($skills)) {
                  $skill_names .= ' / ';
                }
              }
            }
        ?>
            <li class="works-view__list" data-skills="<?php echo trim($skill_slugs); ?>">
              <a href="<?php the_permalink(); ?>" class="works-view__link">
                <?php
                if (has_post_thumbnail()) {
                  the_post_thumbnail('large', array('class' => 'works-view__img', 'alt' => get_the_title() . 'サムネイル画像'));
                }
                ?>
              </a>
              <h3 class="works-view__name <?php echo $en_class; ?>"><?php the_title(); ?></h3>
              <?php if ($skill_names): ?>
                <span class="works-view__tag">Skill: <?php echo esc_html($skill_names); ?></span>
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
    <ul class="breadcrumb">
      <li class="breadcrumb__list">
        <a href="<?php echo esc_url(home_url('/')); ?>" class="breadcrumb__link">HOME</a>
      </li>
      <li class="breadcrumb__list">
        <p class="breadcrumb__txt en">WORKS</p>
      </li>
    </ul>
  </div>
</main>

<?php get_footer(); ?>