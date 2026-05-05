<?php get_header(); ?>

<main>
  <?php
  if (have_posts()) :
    while (have_posts()) : the_post();
      // 'skill' タクソノミーのデータを取得
      $skills = get_the_terms(get_the_ID(), 'skill');

      // タイトルへの欧文フォント適用
      $en_class = get_field('use_en_font') ? 'en' : '';

      // 使用技術配列
      $tech_details = get_field('tech_details');

      // 現在表示している作品の「一覧表示順序」の数字を取得
      $current_order = (int) get_field('list_order');

      // --------------------------------------------------
      // 次の作品を取得
      // --------------------------------------------------
      $next_posts = get_posts(array(
        'post_type'      => 'works',
        'posts_per_page' => 1,
        'meta_key'       => 'list_order', // ACFのフィールド名を指定
        'orderby'        => 'meta_value_num', // 数字として並び替える
        'order'          => 'ASC', // 小さい順
        'meta_query'     => array(
          array(
            'key'     => 'list_order',
            'value'   => $current_order,
            'compare' => '>', // 今の数字より大きい（>）ものだけ探す
            'type'    => 'NUMERIC'
          )
        )
      ));
      $next_post = !empty($next_posts) ? $next_posts[0] : null;

      // もし「次の作品」がない場合、最初の作品を取得
      if (empty($next_post)) {
        $first_posts = get_posts(array(
          'post_type'      => 'works',
          'posts_per_page' => 1,
          'meta_key'       => 'list_order',
          'orderby'        => 'meta_value_num',
          'order'          => 'ASC' // 一番数字が小さいものを取得
        ));
        $next_post = !empty($first_posts) ? $first_posts[0] : null;
      }

      // 「次の作品」のタイトルへの欧文フォント適用
      $next_post_en_class = get_field('use_en_font', $next_post->ID) ? 'en' : '';

      // --------------------------------------------------
      // 前の作品を取得
      // --------------------------------------------------
      $prev_posts = get_posts(array(
        'post_type'      => 'works',
        'posts_per_page' => 1,
        'meta_key'       => 'list_order',
        'orderby'        => 'meta_value_num',
        'order'          => 'DESC', // 大きい順
        'meta_query'     => array(
          array(
            'key'     => 'list_order',
            'value'   => $current_order,
            'compare' => '<', // 今の数字より小さい（<）ものだけ探す
            'type'    => 'NUMERIC'
          )
        )
      ));
      $prev_post = !empty($prev_posts) ? $prev_posts[0] : null;

      // もし「前の作品」がない場合、最後の作品を取得
      if (empty($prev_post)) {
        $last_posts = get_posts(array(
          'post_type'      => 'works',
          'posts_per_page' => 1,
          'meta_key'       => 'list_order',
          'orderby'        => 'meta_value_num',
          'order'          => 'DESC' // 一番数字が大きいものを取得
        ));
        $prev_post = !empty($last_posts) ? $last_posts[0] : null;
      }

      // 「前の作品」のタイトルへの欧文フォント適用
      $prev_post_en_class = get_field('use_en_font', $prev_post->ID) ? 'en' : '';
  ?>
      <div class="works-detail-container">
        <div class="site-view">
          <div id="site-view__scroll-area" class="site-view__scroll-area">
            <?php if (get_field('use_horizontal_scroll')): ?>
              <div class="site-view__scroll-img-wrapper">
                <img src="<?php the_field('full_image'); ?>" alt="<?php the_title(); ?>の全体画像"
                  class="site-view__img site-view__img--horizontal">
              </div>
            <?php else: ?>
              <img src="<?php the_field('full_image'); ?>" alt="<?php the_title(); ?>の全体画像" class="site-view__img">
            <?php endif; ?>
          </div>
          <div id="site-view__scrollbar" class="site-view__scrollbar">
            <div id="site-view__scrollbar-thumb" class="site-view__scrollbar-thumb"></div>
          </div>
        </div>
        <div class="introduction">
          <h2 class="introduction__ttl <?php echo $en_class; ?>"><?php the_title(); ?></h2>
          <?php if ($skills && ! is_wp_error($skills)): ?>
            <div class="introduction__tag-wrap">
              <?php
              foreach ($skills as $skill):
              ?>
                <span class="introduction__tag"><?php echo esc_html($skill->name); ?></span>
              <?php endforeach; ?>
            </div>
          <?php endif; ?>
          <p class="introduction__txt">
            <?php if (get_field('description')): ?>
              <?php the_field('description'); ?>
            <?php endif; ?>
          </p>
          <div class="introduction__btn-wrap">
            <a href="<?php the_field('site_url'); ?>" class="introduction__site-link" target="_blank">WEB SITE<span
                class="arrow"></span></a>
            <?php if (get_field('test_password')): ?>
              <p class="introduction__site-notice">
                ※ゲスト用テストアカウント<br>
                <?php if (get_field('test_user')): ?>
                  ・ユーザー名: <?php the_field('test_user'); ?><br>
                <?php endif; ?>
                <?php if (get_field('test_email')): ?>
                  ・メールアドレス: <?php the_field('test_email'); ?><br>
                <?php endif; ?>
                ・パスワード: <?php the_field('test_password'); ?>
              </p>
            <?php endif; ?>
          </div>
          <dl class="introduction__table">
            <div class="introduction__table-group">
              <dt class="introduction__table-heading">POINT</dt>
              <dd class="introduction__table-description">
                <?php if (get_field('point_1_title')): ?>
                  ・<?php the_field('point_1_title'); ?><br>
                  <?php the_field('point_1_text'); ?>
                <?php endif; ?>
                <?php if (get_field('point_2_title')): ?>
                  <br><br>
                  ・<?php the_field('point_2_title'); ?><br>
                  <?php the_field('point_2_text'); ?>
                <?php endif; ?>
                <?php if (get_field('point_3_title')): ?>
                  <br><br>
                  ・<?php the_field('point_3_title'); ?><br>
                  <?php the_field('point_3_text'); ?>
                <?php endif; ?>
                <?php if (get_field('point_4_title')): ?>
                  <br><br>
                  ・<?php the_field('point_4_title'); ?><br>
                  <?php the_field('point_4_text'); ?>
                <?php endif; ?>
              </dd>
            </div>
            <?php if (get_field('page_count')): ?>
              <div class="introduction__table-group">
                <dt class="introduction__table-heading">ページ数</dt>
                <dd class="introduction__table-description">
                  <?php the_field('page_count'); ?> ページ
                </dd>
              </div>
            <?php endif; ?>
            <?php if (get_field('period')): ?>
              <div class="introduction__table-group">
                <dt class="introduction__table-heading">制作期間</dt>
                <dd class="introduction__table-description">
                  <?php the_field('period'); ?>
                </dd>
              </div>
            <?php endif; ?>
            <div class="introduction__table-group">
              <dt class="introduction__table-heading">使用技術</dt>
              <dd class="introduction__table-description">
                <?php if ($tech_details) {
                  foreach ($tech_details as $index => $tech) {
                    echo esc_html($tech);
                    if ($index !== array_key_last($tech_details)) {
                      echo " / ";
                    }
                  }
                }
                ?>
              </dd>
            </div>
            <div class="introduction__table-group">
              <dt class="introduction__table-heading">URL</dt>
              <dd class="introduction__table-description">
                <a href="<?php the_field('site_url'); ?>" class="introduction__table-link"
                  target="_blank"><?php the_field('site_url'); ?></a>
                <?php if (get_field('test_password')): ?>
                  <br><br>
                  ※ゲスト用テストアカウント<br>
                  <?php if (get_field('test_user')): ?>
                    ・ユーザー名: <?php the_field('test_user'); ?><br>
                  <?php endif; ?>
                  <?php if (get_field('test_email')): ?>
                    ・メールアドレス: <?php the_field('test_email'); ?><br>
                  <?php endif; ?>
                  ・パスワード: <?php the_field('test_password'); ?>
                <?php endif; ?>
              </dd>
            </div>
            <div class="introduction__table-group">
              <dt class="introduction__table-heading">Github</dt>
              <dd class="introduction__table-description">
                <a href="<?php the_field('github_url'); ?>" class="introduction__table-link"
                  target="_blank"><?php the_field('github_url'); ?></a>
              </dd>
            </div>
            <div class="introduction__table-group">
              <dt class="introduction__table-heading">デザイン</dt>
              <dd class="introduction__table-description">
                <?php if (get_field('design_url')): ?>
                  <a href="<?php the_field('design_url'); ?>"
                    class="introduction__table-link" target="_blank">Figmaページ（閲覧のみ可能です）</a>
                <?php else: ?>
                  デザインデータ無し
                <?php endif; ?>
              </dd>
            </div>
          </dl>
          <div class="introduction__nav-wrap">
            <?php if ($prev_post): ?>
              <a href="<?php echo get_permalink($prev_post->ID); ?>" class="introduction__link-prev">
                <div class="introduction__link-img-wrap">
                  <?php echo get_the_post_thumbnail($prev_post->ID, 'medium', 'class=introduction__link-img'); ?>
                </div>
                <span class="introduction__link-txt <?php echo $prev_post_en_class; ?>"><?php echo esc_html($prev_post->post_title); ?></span>
              </a>
            <?php endif; ?>

            <a href="<?php echo esc_url(get_post_type_archive_link('works')); ?>" class="introduction__link-works">WORKS</a>

            <?php if ($next_post): ?>
              <a href="<?php echo get_permalink($next_post->ID); ?>" class="introduction__link-next">
                <div class="introduction__link-img-wrap">
                  <?php echo get_the_post_thumbnail($next_post->ID, 'medium', 'class=introduction__link-img'); ?>
                </div>
                <span class="introduction__link-txt <?php echo $next_post_en_class; ?>"><?php echo esc_html($next_post->post_title); ?></span>
              </a>
            <?php endif; ?>
          </div>
        </div>
        <ul class="breadcrumb">
          <li class="breadcrumb__list">
            <a href="<?php echo esc_url(home_url('/')); ?>" class="breadcrumb__link">HOME</a>
          </li>
          <li class="breadcrumb__list">
            <a href="<?php echo esc_url(get_post_type_archive_link('works')); ?>" class="breadcrumb__link">WORKS</a>
          </li>
          <li class="breadcrumb__list">
            <p class="breadcrumb__txt <?php echo $en_class; ?>"><?php the_title(); ?></p>
          </li>
        </ul>
      </div>
  <?php
    endwhile;
  endif;
  ?>
</main>

<?php get_footer(); ?>