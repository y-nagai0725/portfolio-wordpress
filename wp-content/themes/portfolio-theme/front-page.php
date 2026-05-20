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
      <source media="(min-width: 1024px)" srcset="<?php echo get_template_directory_uri(); ?>/images/top/mv-catchcopy-en-pc.png">
      <source media="(min-width: 768px)" srcset="<?php echo get_template_directory_uri(); ?>/images/top/mv-catchcopy-en-tab.png">
      <img class="p-top__catchcopy-en-img" src="<?php echo get_template_directory_uri(); ?>/images/top/mv-catchcopy-en-sp.png"
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

  </section>
  <section class="p-top__skill">

  </section>
  <section class="p-top__works">

  </section>
  <section class="p-top__contact">

  </section>
</main>

<?php get_footer(); ?>