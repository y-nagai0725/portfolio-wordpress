// 全ページ共通のJS
document.addEventListener('DOMContentLoaded', function () {

  // クラス付与のスクロール位置調整用
  const adjustmentNumber = 0.65;

  // wrapper
  const wrapper = document.getElementById('wrapper');

  // ヘッダー
  const header = document.getElementById('l-header');

  // ヘッダーロゴ
  const headerLogo = document.getElementById('l-header__logo-link');

  // グローバルナビゲーション
  const gnav = document.getElementById('l-header__nav');

  // グローバルナビゲーションリスト
  const gnavList = document.querySelectorAll('.l-header__nav-item');

  // ハンバーガーボタン
  const hamburgerBtn = document.getElementById('l-header__hamburger');

  // トップへ戻るボタン
  const backBtn = document.getElementById('footer__back-btn');

  // クラス付与対象リスト
  const jsTargetList = document.querySelectorAll('.js-fadeIn, .js-fadeUp, .js-fadeUpLarge, .js-fadeRight');

  // スクロールイベント時処理
  window.addEventListener('scroll', function () {
    if (window.scrollY === 0) {
      headerLogo.classList.remove('is-hidden');
    } else {
      headerLogo.classList.add('is-hidden');
    }

    headerInit();
    setJsTargetActive();
  });

  // ハンバーガーボタンクリック時処理
  hamburgerBtn.addEventListener('click', function () {
    if (this.classList.contains('is-open')) {
      headerInit();
    } else {
      this.classList.add('is-open');
      gnav.classList.add('is-open');
      headerLogo.classList.add('is-inverted');
      gnavList.forEach(li => {
        li.classList.add('is-active');
      });

      // メニューが開かれているときはスクロール禁止
      document.addEventListener('touchmove', noScroll, { passive: false });
      document.addEventListener('wheel', noScroll, { passive: false });
    }
  });

  // トップへ戻るボタンクリック時処理
  backBtn.addEventListener('click', function () {
    window.scroll({
      top: 0,
      behavior: 'smooth'
    });
  });

  // ヘッダー初期化
  function headerInit() {
    hamburgerBtn.classList.remove('is-open');
    gnav.classList.remove('is-open');
    headerLogo.classList.remove('is-inverted');
    gnavList.forEach(li => {
      li.classList.remove('is-active');
    });

    // スクロール禁止を解除
    document.removeEventListener('touchmove', noScroll);
    document.removeEventListener('wheel', noScroll);
  }

  // イベント処理禁止用
  function noScroll(e) {
    e.preventDefault();
  }

  // ヘッダー表示
  function showHeader() {
    header.classList.add('is-active');
  }

  // 対象にクラス付与
  function setJsTargetActive() {
    const windowHeight = window.innerHeight;
    const st = window.scrollY;
    jsTargetList.forEach((e) => {
      const position = e.getBoundingClientRect().top + st;
      if (st > position - windowHeight * adjustmentNumber) {
        e.classList.add('is-active');
      }
    });
  }

  // ページ表示時アニメーション設定
  function startPageAnimation() {
    wrapper.classList.add('is-active');
  }

  // 初期実行処理
  function init() {
    startPageAnimation();
    showHeader();
  }

  // 初期処理
  init();

}, false);