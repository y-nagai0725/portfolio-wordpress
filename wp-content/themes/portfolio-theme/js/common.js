import { GSAP_CONFIG } from "./constants.js";

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
  const wrapper = document.querySelector('.l-wrapper');

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

    // トップページかどうか（MVセクションが存在するか）を確認
    const mvSection = document.querySelector('.p-top__mv');
    const currentScrollY = window.scrollY;
    const threshold = window.innerHeight / 2;

    if (mvSection && currentScrollY < threshold) {
      // 【MVが見えている場合】
      // MVのロゴアニメーション終了際にヘッダーを表示する
      setTimeout(() => {
        header?.classList.add('is-active');
      }, 1800);
    } else {
      // 【下層ページ、または既にスクロールされている場合】
      // すぐにヘッダーを表示する
      header?.classList.add('is-active');
    }
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
   * 各要素のフェードインアニメーション設定
   * .js-scroll クラスを持つ要素が画面に入ったら .is-active を付与する
   */
  const initScrollFadeAnimations = () => {
    // 対象となるクラスを持つ要素を配列として取得
    const targets = gsap.utils.toArray('.js-scroll');

    targets.forEach((target) => {
      ScrollTrigger.create({
        trigger: target,
        start: GSAP_CONFIG.fadeTrigger,
        once: true,          // 一度だけ実行
        refreshPriority: -1, // 優先度を下げて、トップページでのpin留め処理後に計算させる
        onEnter: () => target.classList.add('is-active'),
      });
    });
  };

  /**
   * 各要素の clip-path アニメーション設定
   * .js-clip クラスを持つ要素にマウスが離れた時だけ .is-leave を付与する
   */
  const initClipAnimations = () => {
    // 対象となるクラスを持つ要素を配列として取得
    const targets = document.querySelectorAll('.js-clip');

    // マウスが要素から離れた時だけ .is-leave を付与する
    targets.forEach(target => {
      target.addEventListener('mouseleave', () => {
        target.classList.add('is-leave');
      });

      // 再度ホバーした時にクラスをリセットしておく（誤動作防止）
      target.addEventListener('mouseenter', () => {
        target.classList.remove('is-leave');
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
   * メニュー内のリンククリック時にメニューを閉じる
   */
  const initNavLinks = () => {
    const navLinks = document.querySelectorAll('.l-header a');
    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        if (hamburgerBtn?.classList.contains('is-open')) {
          closeMenu();
        }
      });
    });
  };

  /**
   * ブラウザバック（bfcache）時のメニュー初期化
   * （戻るボタンで戻ってきた時に、強制的にメニューを閉じる処理）
   */
  const initBfcache = () => {
    window.addEventListener('pageshow', (event) => {
      // event.persisted が true の場合、bfcacheから復元されたことを意味する
      if (event.persisted && hamburgerBtn?.classList.contains('is-open')) {
        closeMenu();
      }
    });
  };

  /**
   * トップへ戻るボタンのクリックイベント
   * ScrollToPluginを使用して滑らかにスクロールさせる
   */
  const initBackToTop = () => {
    backBtn?.addEventListener('click', () => {
      gsap.to(window, {
        duration: GSAP_CONFIG.durationSlow,
        scrollTo: {
          y: 0,
          autoKill: true, // 途中でユーザーの操作があればスクロール動作を止める
        },
        ease: GSAP_CONFIG.easeBase,
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
    initClipAnimations();
    initBackToTop();
    initMenu();
    initNavLinks();
    initBfcache();
  };

  init();
});