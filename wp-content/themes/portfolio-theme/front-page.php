<?php get_header(); ?>

<main>
  <div class="p-top__ray-canvas-wrap">
    <canvas id="ray-canvas"></canvas>
  </div>
  <div class="p-top__mv-canvas-wrap">
    <canvas id="mv-canvas"></canvas>
  </div>
  <section class="p-top__mv">
    <div class="p-top__catchcopy-ja-wrap">
      <p class="p-top__catchcopy-ja p-top__catchcopy-ja--large">
        未来へ<br class="p-top__catchcopy-br">突き進め
      </p>
      <p class="p-top__catchcopy-ja p-top__catchcopy-ja--small">
        前進することでしか、<br class="p-top__catchcopy-br">未来は変わらない
      </p>
    </div>
    <picture class="p-top__catchcopy-en-wrap">
      <source media="(min-width: 1024px)" srcset="<?php echo get_template_directory_uri(); ?>/images/top/mv/mv-catchcopy-en-pc.png">
      <source media="(min-width: 768px)" srcset="<?php echo get_template_directory_uri(); ?>/images/top/mv/mv-catchcopy-en-tab.png">
      <img class="p-top__catchcopy-en-img" src="<?php echo get_template_directory_uri(); ?>/images/top/mv/mv-catchcopy-en-sp.png"
        alt="ADVANCE TO THE NEXT LEVEL">
    </picture>
    <div class="p-top__scroll-btn-wrap">
      <a href="#message" class="p-top__scroll-btn">
        <span class="p-top__scroll-btn-txt">SCROLL<br>DOWN</span>
      </a>
    </div>
  </section>
  <section class="p-top__message" id="message">
    <div class="p-top__message-inner">
      <div class="p-top__message-txt-wrap js-scroll">
        <p class="p-top__message-txt">
          前進あるのみ。
        </p>
        <p class="p-top__message-txt">
          未知なる道を進むことが怖くても、<br class="p-top__message-br">
          チャレンジし続ける。<br>
          失敗や困難は必ずあるが、<br class="p-top__message-br">
          それらを乗り越える。
        </p>
      </div>
      <div class="p-top__message-txt-wrap js-scroll">
        <p class="p-top__message-txt">
          日々前進。
        </p>
        <p class="p-top__message-txt">
          過去の自分を振り返っても、<br class="p-top__message-br">
          過去を変えることはできない。<br>
          だからこそ、未来へ向けて、<br class="p-top__message-br">
          今を生きることが大切だ。
        </p>
      </div>
      <div class="p-top__message-txt-wrap js-scroll">
        <p class="p-top__message-txt">
          Advance to the next level.
        </p>
        <p class="p-top__message-txt">
          常に自分自身を高めていく。<br>
          自分の弱点や課題を見つけ、<br class="p-top__message-br">
          克服するために努力する。<br>
          より良い未来に向けて、<br class="p-top__message-br">
          進むことができると信じている。
        </p>
      </div>
    </div>
  </section>
  <section class="p-top__about">
    <div class="p-top__about-inner">
      <h2 class="p-top__about-ttl c-ttl c-ttl--center c-ttl--section js-scroll">ABOUT</h2>
      <div class="p-top__about-profile js-scroll">
        <div class="p-top__about-img-wrap">
          <img src="<?php echo get_template_directory_uri(); ?>/images/top/about/about-profile.jpg" alt="永井善孝 プロフィール写真" class="p-top__about-img">
        </div>
        <div class="p-top__about-info">
          <p class="p-top__about-name">永井 善孝（ながい よしたか）</p>
          <div class="p-top__about-link-wrap">
            <a href="https://github.com/y-nagai0725" class="p-top__about-link p-top__about-link--github" target="_blank">GitHub</a>
            <a href="https://blog.mikanbako.jp" class="p-top__about-link p-top__about-link--blog" target="_blank">技術ブログ</a>
          </div>
          <p class="p-top__about-txt">
            北海道札幌市出身、大学生から函館へ、前職は病院の事務員として勤めていました。<br>
            趣味はランニング。ダイエットと健康維持の為、週に3日程5kmをゆっくりと走っています。
          </p>
          <p class="p-top__about-txt">
            職業訓練校にて、WEBデザイン、HTML/CSS、JavaScriptを学び、コーダー・フロントエンドエンジニアを目指して日々勉強、作品制作をしています。<br>
            最近はJavaScript（Node.jsやVue.jsなど）を用いたWebアプリケーション開発に力を入れており、タイピングアプリなどをフルスクラッチで制作しました。また、本サイトのようにWordPressを用いたオリジナルテーマの構築も行っています。<br>
            現在はGSAPやThree.jsなど、よりリッチでインタラクティブなUI/UXを実現するためのフロントエンド技術を積極的に学んでいます。
          </p>
        </div>
      </div>
    </div>
  </section>
  <section class="p-top__skill">
    <div class="p-top__skill-inner">
      <h2 class="p-top__skill-ttl c-ttl c-ttl--left c-ttl--section js-scroll">SKILL</h2>
      <ul class="p-top__skill-list">
        <li class="p-top__skill-item">
          <h3 class="p-top__skill-name">HTML / CSS</h3>
          <div class="p-top__skill-txt-wrap">
            <p class="p-top__skill-txt">
              TODO 出来ること、やったこと、アピールすること等を記載するサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプル
            </p>
            <div class="p-top__skill-icon-wrap">
              <?php echo file_get_contents(get_template_directory() . '/images/top/skill/skill-html.svg'); ?>
            </div>
          </div>
        </li>
        <li class="p-top__skill-item">
          <h3 class="p-top__skill-name">JavaScript</h3>
          <div class="p-top__skill-txt-wrap">
            <p class="p-top__skill-txt">
              TODO 出来ること、やったこと、アピールすること等を記載するサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプル
            </p>
            <div class="p-top__skill-icon-wrap">
              <?php echo file_get_contents(get_template_directory() . '/images/top/skill/skill-javascript.svg'); ?>
            </div>
          </div>
        </li>
        <li class="p-top__skill-item">
          <h3 class="p-top__skill-name">WordPress</h3>
          <div class="p-top__skill-txt-wrap">
            <p class="p-top__skill-txt">
              TODO 出来ること、やったこと、アピールすること等を記載するサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプル
            </p>
            <div class="p-top__skill-icon-wrap">
              <?php echo file_get_contents(get_template_directory() . '/images/top/skill/skill-wordpress.svg'); ?>
            </div>
          </div>
        </li>
        <li class="p-top__skill-item">
          <h3 class="p-top__skill-name">Photoshop</h3>
          <div class="p-top__skill-txt-wrap">
            <p class="p-top__skill-txt">
              TODO 出来ること、やったこと、アピールすること等を記載するサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプル
            </p>
            <div class="p-top__skill-icon-wrap">
              <?php echo file_get_contents(get_template_directory() . '/images/top/skill/skill-photoshop.svg'); ?>
            </div>
          </div>
        </li>
        <li class="p-top__skill-item">
          <h3 class="p-top__skill-name">XD / Figma</h3>
          <div class="p-top__skill-txt-wrap">
            <p class="p-top__skill-txt">
              TODO 出来ること、やったこと、アピールすること等を記載するサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプル
            </p>
            <div class="p-top__skill-icon-wrap">
              <?php echo file_get_contents(get_template_directory() . '/images/top/skill/skill-figma.svg'); ?>
            </div>
          </div>
        </li>
        <li class="p-top__skill-item">
          <h3 class="p-top__skill-name">Git</h3>
          <div class="p-top__skill-txt-wrap">
            <p class="p-top__skill-txt">
              TODO 出来ること、やったこと、アピールすること等を記載するサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプル
            </p>
            <div class="p-top__skill-icon-wrap">
              <?php echo file_get_contents(get_template_directory() . '/images/top/skill/skill-git.svg'); ?>
            </div>
          </div>
        </li>
        <li class="p-top__skill-item">
          <h3 class="p-top__skill-name">Visual Studio Code</h3>
          <div class="p-top__skill-txt-wrap">
            <p class="p-top__skill-txt">
              TODO 出来ること、やったこと、アピールすること等を記載するサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプル
            </p>
            <div class="p-top__skill-icon-wrap">
              <?php echo file_get_contents(get_template_directory() . '/images/top/skill/skill-vscode.svg'); ?>
            </div>
          </div>
        </li>
        <li class="p-top__skill-item">
          <h3 class="p-top__skill-name">Word / Excel</h3>
          <div class="p-top__skill-txt-wrap">
            <p class="p-top__skill-txt">
              TODO 出来ること、やったこと、アピールすること等を記載するサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプル
            </p>
            <div class="p-top__skill-icon-wrap">
              <?php echo file_get_contents(get_template_directory() . '/images/top/skill/skill-excel.svg'); ?>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </section>
  <section class="p-top__works">
    <div class="p-top__works-inner">
      <div class="p-top__works-pinned-area">
        <h2 class="p-top__works-ttl c-ttl c-ttl--left c-ttl--section">WORKS</h2>
        <ul class="p-top__works-list">
          <?php
          // 表示する作品の条件を指定（'show_on_top' が true の7件）
          $top_works_args = array(
            'post_type'      => 'works',
            'posts_per_page' => 7, // 7件表示
            'meta_key'       => 'top_order', // 並び替えの基準は「トップ表示順」
            'orderby'        => 'meta_value_num',
            'order'          => 'ASC',
            'meta_query'     => array(
              array(
                'key'     => 'show_on_top',
                'value'   => '1', // ACFの「真偽値（True / False）」は 1 / 0(または空) で保存される為
                'compare' => '=='
              )
            )
          );

          // クエリを作成
          $top_works_query = new WP_Query($top_works_args);

          // ループ開始
          if ($top_works_query->have_posts()) :
            while ($top_works_query->have_posts()) : $top_works_query->the_post();
              // タイトル
              $title = get_the_title();

              // タイトルへの欧文フォント適用
              $en_class = get_field('use_en_font') ? 'p-top__works-item-ttl--en' : '';

              // 紹介文取得
              $short_desc_1 = get_field('short_desc_1');
              $short_desc_2 = get_field('short_desc_2');
          ?>
              <li class="p-top__works-item">
                <div class="p-top__works-item-txt-wrap">
                  <h3 class="p-top__works-item-ttl <?php echo $en_class; ?>"><?php echo $title; ?></h3>
                  <p class="p-top__works-item-txt">
                    <?php echo $short_desc_1; ?><br>
                    <?php echo $short_desc_2; ?>
                  </p>
                </div>
                <div class="p-top__works-item-img-wrap">
                  <?php
                  if (has_post_thumbnail()) {
                    the_post_thumbnail('large', array('class' => 'p-top__works-item-img', 'alt' => $title . 'サムネイル画像'));
                  }
                  ?>
                  <a href="<?php echo esc_url(get_the_permalink()); ?>" class="p-top__works-item-link c-btn c-btn--medium">MORE</a>
                </div>
              </li>
          <?php
            endwhile;
            // リセット処理
            wp_reset_postdata();
          endif; ?>
        </ul>
        <div class="p-top__works-nav-wrap">
          <div class="p-top__works-icon-wrap">
            <div class="p-top__works-svg-wrap">
              <?php echo file_get_contents(get_template_directory() . '/images/top/works/works-circle-txt.svg'); ?>
            </div>
          </div>
          <nav class="p-top__works-nav">
            <?php
            // ループで取得した実際の作品数（最大7件）を取得
            $post_count = $top_works_query->post_count;

            // アクティブ状態表示用要素
            if ($post_count > 0) {
              echo '<span class="p-top__works-nav-pager"></span>';
            }

            // 作品の数だけボタンを自動生成する
            for ($i = 1; $i <= $post_count; $i++) {
              // 1, 2 ではなく 01, 02 とゼロ埋めする
              $num = sprintf('%02d', $i);
              echo '<button class="p-top__works-nav-btn">' . $num . '</button>';
            }
            ?>
          </nav>
          <a href="<?php echo esc_url(get_post_type_archive_link('works')); ?>" class="p-top__works-archive-link" data-txt="VIEW ALL">VIEW ALL</a>
        </div>
      </div>
    </div>
  </section>
  <section class="p-top__contact js-scroll">
    <div class="p-top__contact-inner">
      <h2 class="p-top__contact-ttl c-ttl c-ttl--center c-ttl--section js-scroll">CONTACT</h2>
      <div class="p-top__contact-info js-scroll">
        <p class="p-top__contact-txt">
          お問い合わせは下のボタンから<br class="p-top__contact-br">
          入力フォームへお進みください。
        </p>
        <a href="<?php echo esc_url(home_url('/contact/')); ?>" class="p-top__contact-link c-btn c-btn--small">CONTACT<br>FORM</a>
      </div>
    </div>
  </section>
</main>

<?php get_footer(); ?>