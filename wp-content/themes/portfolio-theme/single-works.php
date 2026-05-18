<?php get_header(); ?>

<main>
  <?php
  if (have_posts()) :
    while (have_posts()) : the_post();
      // 'skill' タクソノミーのデータを取得
      $skills = get_the_terms(get_the_ID(), 'skill');

      // タイトルへの欧文フォント適用
      $en_class = get_field('use_en_font') ? 'p-works-single__ttl--en' : '';

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
        'order'          => 'DESC',
        'meta_query'     => array(
          array(
            'key'     => 'list_order',
            'value'   => $current_order,
            'compare' => '<', // 今の数字より小さい（<）ものだけ探す
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
          'order'          => 'DESC'
        ));
        $next_post = !empty($first_posts) ? $first_posts[0] : null;
      }

      // 「次の作品」のタイトルへの欧文フォント適用
      $next_post_en_class = get_field('use_en_font', $next_post->ID) ? 'p-works-single__link-txt--en' : '';

      // --------------------------------------------------
      // 前の作品を取得
      // --------------------------------------------------
      $prev_posts = get_posts(array(
        'post_type'      => 'works',
        'posts_per_page' => 1,
        'meta_key'       => 'list_order',
        'orderby'        => 'meta_value_num',
        'order'          => 'ASC',
        'meta_query'     => array(
          array(
            'key'     => 'list_order',
            'value'   => $current_order,
            'compare' => '>', // 今の数字より大きい（>）ものだけ探す
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
          'order'          => 'ASC'
        ));
        $prev_post = !empty($last_posts) ? $last_posts[0] : null;
      }

      // 「前の作品」のタイトルへの欧文フォント適用
      $prev_post_en_class = get_field('use_en_font', $prev_post->ID) ? 'p-works-single__link-txt--en' : '';
  ?>
      <div class="p-works-single">
        <div class="p-works-single__site-view">
          <div class="p-works-single__scroll-area">
            <?php if (get_field('use_horizontal_scroll')): ?>
              <div class="p-works-single__scroll-img-wrap">
                <img src="<?php echo esc_url(get_field('full_image')); ?>" alt="<?php the_title(); ?>の全体画像"
                  class="p-works-single__img p-works-single__img--horizontal">
              </div>
            <?php else: ?>
              <img src="<?php echo esc_url(get_field('full_image')); ?>" alt="<?php the_title(); ?>の全体画像" class="p-works-single__img">
            <?php endif; ?>
          </div>
          <div class="p-works-single__scrollbar">
            <div class="p-works-single__scrollbar-thumb"></div>
          </div>
        </div>
        <div class="p-works-single__introduction js-scroll">
          <h2 class="p-works-single__ttl <?php echo esc_attr($en_class); ?>"><?php the_title(); ?></h2>
          <?php if ($skills && ! is_wp_error($skills)): ?>
            <ul class="p-works-single__tag-list">
              <?php
              foreach ($skills as $skill):
              ?>
                <li class="p-works-single__tag-item">
                  <span class="c-tag"><?php echo esc_html($skill->name); ?></span>
                </li>
              <?php endforeach; ?>
            </ul>
          <?php endif; ?>
          <p class="p-works-single__description">
            <?php if (get_field('description')): ?>
              <?php the_field('description'); ?>
            <?php endif; ?>
          </p>
          <div class="p-works-single__site-link-wrap">
            <a href="<?php echo esc_url(get_field('site_url')); ?>" class="p-works-single__site-link" target="_blank">WEB SITE<span
                class="p-works-single__arrow"></span></a>
            <?php if (get_field('test_password')): ?>
              <p class="p-works-single__site-notice">
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
          <dl class="p-works-single__info">
            <div class="p-works-single__info-group">
              <dt class="p-works-single__info-dt p-works-single__info-dt--en">POINT</dt>
              <dd class="p-works-single__info-dd">
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
              <div class="p-works-single__info-group">
                <dt class="p-works-single__info-dt">ページ数</dt>
                <dd class="p-works-single__info-dd">
                  <?php the_field('page_count'); ?> ページ
                </dd>
              </div>
            <?php endif; ?>
            <?php if (get_field('group_work_role')): ?>
              <div class="p-works-single__info-group">
                <dt class="p-works-single__info-dt">担当役割</dt>
                <dd class="p-works-single__info-dd">
                  <?php the_field('group_work_role'); ?>
                </dd>
              </div>
            <?php endif; ?>
            <?php if (get_field('period')): ?>
              <div class="p-works-single__info-group">
                <dt class="p-works-single__info-dt">制作期間</dt>
                <dd class="p-works-single__info-dd">
                  <?php the_field('period'); ?>
                </dd>
              </div>
            <?php endif; ?>
            <div class="p-works-single__info-group">
              <dt class="p-works-single__info-dt">使用技術</dt>
              <dd class="p-works-single__info-dd">
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
            <div class="p-works-single__info-group">
              <dt class="p-works-single__info-dt p-works-single__info-dt--en">URL</dt>
              <dd class="p-works-single__info-dd">
                <a href="<?php echo esc_url(get_field('site_url')); ?>" class="p-works-single__info-link"
                  target="_blank"><?php echo esc_html(get_field('site_url')); ?></a>
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
            <?php if (get_field('github_url')): ?>
              <div class="p-works-single__info-group">
                <dt class="p-works-single__info-dt p-works-single__info-dt--en">GitHub</dt>
                <dd class="p-works-single__info-dd">
                  <a href="<?php echo esc_url(get_field('github_url')); ?>" class="p-works-single__info-link"
                    target="_blank"><?php echo esc_html(get_field('github_url')); ?></a>
                </dd>
              </div>
            <?php endif; ?>
            <?php if (get_field('design_url')): ?>
              <div class="p-works-single__info-group">
                <dt class="p-works-single__info-dt">デザイン</dt>
                <dd class="p-works-single__info-dd">
                  <a href="<?php echo esc_url(get_field('design_url')); ?>"
                    class="p-works-single__info-link" target="_blank">Figmaページ（閲覧のみ可能です）</a>
                </dd>
              </div>
            <?php endif; ?>
            <?php if (get_field('design_file')): ?>
              <div class="p-works-single__info-group">
                <dt class="p-works-single__info-dt">デザイン</dt>
                <dd class="p-works-single__info-dd">
                  <a href="<?php echo esc_url(get_field('design_file')); ?>"
                    class="p-works-single__info-link" target="_blank">デザインファイル（XDファイル）</a>
                </dd>
              </div>
            <?php endif; ?>
          </dl>
          <nav class="p-works-single__nav">
            <?php if ($prev_post): ?>
              <a href="<?php echo esc_url(get_permalink($prev_post->ID)); ?>" class="p-works-single__link-prev">
                <div class="p-works-single__link-img-wrap">
                  <?php echo get_the_post_thumbnail($prev_post->ID, 'medium', array('class' => 'p-works-single__link-img', 'alt' => $prev_post->post_title . 'サムネイル画像')); ?>
                </div>
                <span class="p-works-single__link-txt <?php echo esc_attr($prev_post_en_class); ?>"><?php echo esc_html($prev_post->post_title); ?></span>
              </a>
            <?php endif; ?>

            <a href="<?php echo esc_url(get_post_type_archive_link('works')); ?>" class="p-works-single__link-works c-btn c-btn--medium">WORKS</a>

            <?php if ($next_post): ?>
              <a href="<?php echo esc_url(get_permalink($next_post->ID)); ?>" class="p-works-single__link-next">
                <div class="p-works-single__link-img-wrap">
                  <?php echo get_the_post_thumbnail($next_post->ID, 'medium', array('class' => 'p-works-single__link-img', 'alt' => $next_post->post_title . 'サムネイル画像')); ?>
                </div>
                <span class="p-works-single__link-txt <?php echo esc_attr($next_post_en_class); ?>"><?php echo esc_html($next_post->post_title); ?></span>
              </a>
            <?php endif; ?>
          </nav>
        </div>
      </div>
  <?php
    endwhile;
  endif;
  ?>
</main>

<?php
$post_id = get_queried_object_id();
$post_title = get_the_title($post_id);
$use_en = get_field('use_en_font', $post_id);

get_template_part('template-parts/breadcrumb', null, array(
  'items' => array(
    array('text' => 'WORKS', 'url' => get_post_type_archive_link('works'), 'is_en' => true),
    array('text' => $post_title, 'url' => '', 'is_en' => $use_en)
  )
));
?>

<?php get_footer(); ?>