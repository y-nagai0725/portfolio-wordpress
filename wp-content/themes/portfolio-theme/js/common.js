/**
 * 全ページ共通のJavaScript
 * GSAP (ScrollTrigger / ScrollToPlugin) を使用した共通UIおよびアニメーションの制御
 */
document.addEventListener('DOMContentLoaded', () => {
  // GSAPプラグインの登録
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

  /**
   * wrapper
   */
  const wrapper = document.querySelector('.wrapper');

  /**
   * ヘッダー
   */
  const header = document.querySelector('.l-header');

  /**
   * ヘッダーロゴ
   */
  const headerLogo = document.querySelector('.l-header__logo-link');

  /**
   * ハンバーガーボタン
   */
  const hamburgerBtn = document.querySelector('.l-header__hamburger');

  /**
   * グローバルナビゲーション
   */
  const gnav = document.querySelector('.l-header__nav');

  /**
   * グローバルナビゲーションリスト
   */
  const gnavList = document.querySelectorAll('.l-header__nav-item');

  /**
   * トップへ戻るボタン
   */
  const backBtn = document.querySelector('.l-footer__back-btn');

  /**
   * ページ表示時の初期アニメーション
   */
  const startPageAnimation = () => {
    wrapper?.classList.add('is-active');
    header?.classList.add('is-active');
  };

  /**
   * ヘッダーのスクロール制御
   * ロゴの表示・非表示および反転クラスの管理を行う
   */
  const initHeaderScroll = () => {
    ScrollTrigger.create({
      start: 'top top',
      onUpdate: (self) => {
        // 1pxでもスクロールされたらロゴを隠す
        if (self.scroll() > 0) {
          headerLogo?.classList.add('is-hidden');
        } else {
          headerLogo?.classList.remove('is-hidden');
        }
      }
    });
  };

  /**
   * 各セクション要素のフェードインアニメーション設定
   * .js-fadeIn, .js-fadeUp などのクラスを持つ要素を対象とする
   */
  const initScrollFadeAnimations = () => {
    // 対象となるクラスを持つ要素を配列として取得
    const targets = gsap.utils.toArray('.js-fadeIn, .js-fadeUp, .js-fadeUpLarge, .js-fadeRight');

    targets.forEach((target) => {
      ScrollTrigger.create({
        trigger: target,
        start: 'top 65%',    // ビューポートの上から65%の位置に来たら発火
        once: true,          // 一度だけ実行
        refreshPriority: -1, // 優先度を下げて、トップページでのpin留め処理後に計算させる
        onEnter: () => target.classList.add('is-active'),
      });
    });
  };

  /**
   * ハンバーガーメニューの開閉制御
   */
  const toggleMenu = () => {
    const isOpen = hamburgerBtn.classList.contains('is-open');

    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  };

  /**
   * メニューを開く処理
   */
  const openMenu = () => {
    hamburgerBtn?.classList.add('is-open');
    gnav?.classList.add('is-open');
    headerLogo?.classList.add('is-inverted');
    gnavList.forEach((li) => li.classList.add('is-active'));

    // スクロールバーの幅を計算して、bodyの右側にpaddingとして付与する
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.paddingRight = `${scrollbarWidth}px`;
    document.body.style.overflow = 'hidden';
  };

  /**
   * メニューを閉じる処理
   */
  const closeMenu = () => {
    hamburgerBtn?.classList.remove('is-open');
    gnav?.classList.remove('is-open');
    headerLogo?.classList.remove('is-inverted');
    gnavList.forEach((li) => li.classList.remove('is-active'));

    // スクロール禁止と、付与したpaddingを解除する
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
  };

  /**
   * ハンバーガーメニューのイベントを初期化
   */
  const initMenu = () => {
    hamburgerBtn?.addEventListener('click', toggleMenu);
  };

  /**
   * トップへ戻るボタンのクリックイベント
   * ScrollToPluginを使用して滑らかにスクロールさせる
   */
  const initBackToTop = () => {
    backBtn?.addEventListener('click', () => {
      gsap.to(window, {
        duration: 0.8,
        scrollTo: 0,
        ease: 'power2.out'
      });
    });
  };

  /**
   * 全体の初期化処理
   */
  const init = () => {
    startPageAnimation();
    initHeaderScroll();
    initScrollFadeAnimations();
    initBackToTop();
    initMenu();
  };

  init();
});