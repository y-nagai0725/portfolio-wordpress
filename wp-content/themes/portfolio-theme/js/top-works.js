import { GSAP_CONFIG } from "./constants.js";

/**
 * トップページ: WORKSセクション用JS
 * GSAPとScrollTriggerを使用した作品のスクロール連動アニメーション、
 * ページャーの追従、およびサークルテキストの速度連動回転を制御します。
 */
document.addEventListener('DOMContentLoaded', () => {

  // =========================================================
  // クラス定義：WorksItem
  // =========================================================
  /**
   * 作品アイテムを管理するクラス
   * 各作品のDOM要素と表示・非表示のアニメーションを管理します。
   */
  class WorksItem {
    /**
     * アニメーションの基本時間
     * @type {number}
     */
    animDuration = GSAP_CONFIG.durationBase;

    /**
     * アニメーションの基本イージング
     * @type {string}
     */
    animEase = GSAP_CONFIG.easeBase;

    /**
     * コンストラクタ
     * @param {HTMLElement} element - 作品のDOM要素
     * @param {number} index - 作品のインデックス番号
     */
    constructor(element, index) {
      /** @type {HTMLElement} */
      this.el = element;

      /** @type {number} */
      this.index = index;

      // アニメーション対象の内部要素を取得
      /** @type {HTMLElement | null} */
      this.ttl = this.el.querySelector('.p-top__works-item-ttl');

      /** @type {HTMLElement | null} */
      this.txt = this.el.querySelector('.p-top__works-item-txt');

      /** @type {HTMLElement | null} */
      this.imgWrap = this.el.querySelector('.p-top__works-item-img-wrap');

      // 最初の作品以外は初期状態で非表示にする
      if (this.index !== 0) {
        gsap.set(this.el, { autoAlpha: 0 });
      }
    }

    /**
     * 作品を非表示にするメソッド
     * 進行中のアニメーションを上書き(overwrite)し、競合を防ぎます。
     */
    hide() {
      gsap.to(this.el, {
        autoAlpha: 0,
        duration: this.animDuration,
        ease: this.animEase,
        overwrite: true
      });
    }

    /**
     * 作品を表示し、内部要素をそれぞれ個別にアニメーションさせるメソッド
     * 進行中のアニメーションを上書き(overwrite)し、高速スクロール時の表示バグを防ぎます。
     */
    show() {
      // コンテナを表示
      gsap.set(this.el, { autoAlpha: 1, overwrite: true });

      // タイトル：左から右へスライドしながらフェードイン
      gsap.fromTo(this.ttl,
        { x: -40, autoAlpha: 0 },
        { x: 0, autoAlpha: 1, duration: this.animDuration, ease: this.animEase, overwrite: true }
      );

      // テキスト：左から右へスライドしながらフェードイン
      gsap.fromTo(this.txt,
        { x: -40, autoAlpha: 0 },
        { x: 0, autoAlpha: 1, duration: this.animDuration, ease: this.animEase, overwrite: true }
      );

      // 画像：移動させず、その場でフェードイン
      gsap.fromTo(this.imgWrap,
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: this.animDuration, ease: this.animEase, overwrite: true }
      );
    }
  }


  // =========================================================
  // グローバル変数と初期設定
  // =========================================================
  /**
   * ピン留めするエリアの要素
   * @type {HTMLElement | null}
   */
  const pinnedArea = document.querySelector('.p-top__works-pinned-area');

  /**
   * 取得したNodeListを配列に変換し、WorksItemクラスのインスタンスを生成した配列
   * @type {Array<WorksItem>}
   */
  const worksItems = [...document.querySelectorAll('.p-top__works-item')].map((el, index) => new WorksItem(el, index));

  /**
   * ナビゲーションボタンの要素群
   * @type {NodeListOf<HTMLElement>}
   */
  const navButtons = document.querySelectorAll('.p-top__works-nav-btn');

  /**
   * ページャー（現在位置を示す背景）要素
   * @type {HTMLElement | null}
   */
  const pager = document.querySelector('.p-top__works-nav-pager');

  // 対象要素が存在しないページでは処理を中断
  if (!pinnedArea || worksItems.length === 0) return;

  /**
   * 作品の総数
   * @type {number}
   */
  const itemsCount = worksItems.length;

  // --- 状態管理用変数 ---

  /**
   * アンカーリンクによる強制スクロール中かどうかのフラグ
   * @type {boolean}
   */
  let isJumping = false;

  /**
   * 現在表示されている作品のインデックス
   * @type {number}
   */
  let currentIndex = 0;


  // =========================================================
  // ページャー（ナビゲーション背景）の制御
  // =========================================================
  // ページャーの初期位置を0番目のボタンにセット
  if (pager && navButtons[0]) {
    gsap.set(pager, {
      x: navButtons[0].offsetLeft,
      y: navButtons[0].offsetTop,
      width: navButtons[0].offsetWidth,
      height: navButtons[0].offsetHeight
    });
  }

  /**
   * ページャーを移動先のボタンに合わせてアニメーションさせる関数
   * 移動方向に向かって幅が伸びる表現を実装しています。
   * @param {number} newIndex - 移動先のインデックス番号
   */
  const animatePager = (newIndex) => {
    // ターゲットとなるボタン要素
    const targetBtn = navButtons[newIndex];
    if (!pager || !targetBtn) return;

    const targetX = targetBtn.offsetLeft;
    const targetY = targetBtn.offsetTop;
    const targetWidth = targetBtn.offsetWidth;
    const targetHeight = targetBtn.offsetHeight;

    const currentX = gsap.getProperty(pager, "x") || 0;
    const isMovingRight = targetX > currentX;
    const tl = gsap.timeline();

    // 縦方向のズレと高さは先に合わせる
    gsap.to(pager, { y: targetY, height: targetHeight, duration: 0.1 });

    if (isMovingRight) {
      // 右方向への移動：右に幅を伸ばしてから左を追いつかせる
      tl.to(pager, {
        width: (targetX - currentX) + targetWidth,
        duration: GSAP_CONFIG.durationBase / 2,
        ease: GSAP_CONFIG.easeInOut
      }).to(pager, {
        x: targetX,
        width: targetWidth,
        duration: GSAP_CONFIG.durationBase / 2,
        ease: GSAP_CONFIG.easeBase
      });
    } else {
      // 左方向への移動：左に移動しつつ幅を残し、後から右を追いつかせる
      tl.to(pager, {
        x: targetX,
        width: (currentX - targetX) + targetWidth,
        duration: GSAP_CONFIG.durationBase / 2,
        ease: GSAP_CONFIG.easeInOut
      }).to(pager, {
        width: targetWidth,
        duration: GSAP_CONFIG.durationBase / 2,
        ease: GSAP_CONFIG.easeBase
      });
    }
  };

  /**
   * リサイズ時のページャー位置更新用タイマー
   * @type {number | undefined}
   */
  let resizeTimer;

  // パフォーマンス低下を防ぐため、リサイズ完了後 200ms 後に再計算を実行します。
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      if (pager && navButtons[currentIndex]) {
        gsap.set(pager, {
          x: navButtons[currentIndex].offsetLeft,
          y: navButtons[currentIndex].offsetTop,
          width: navButtons[currentIndex].offsetWidth,
          height: navButtons[currentIndex].offsetHeight
        });
      }
    }, 200);
  });


  // =========================================================
  // スクロールトリガー（ピン留めと作品切り替え）
  // =========================================================
  /**
   * レスポンシブ対応のためのGSAP MatchMediaインスタンス
   * @type {gsap.MatchMedia}
   */
  let mm = gsap.matchMedia();

  mm.add({
    isPc: "(min-width: 1024px)",
    isTab: "(min-width: 768px) and (max-width: 1023px)",
    isSp: "(max-width: 767px)"
  }, (context) => {
    // デバイス幅に応じたスクロール量の調整
    let { isPc, isTab, isSp } = context.conditions;
    let scrollCoefficient = isPc ? 1.2 : isTab ? 1.0 : 0.8;

    ScrollTrigger.create({
      id: "works-pin",
      trigger: pinnedArea,
      start: "top top",
      end: () => "+=" + (window.innerHeight * scrollCoefficient * itemsCount),
      pin: true,

      onUpdate: (self) => {
        // アンカーリンクでの強制ジャンプ中はスクロール判定をスキップ
        if (isJumping) return;

        // 進行度から表示すべき作品のインデックスを計算
        const newIndex = Math.round(self.progress * (itemsCount - 1));

        if (newIndex !== currentIndex) {
          // 現在の作品を非表示
          if (worksItems[currentIndex]) {
            worksItems[currentIndex].hide();
          }

          // 対象indexの作品を表示
          if (worksItems[newIndex]) {
            worksItems[newIndex].show();
          }

          // ページャー更新
          animatePager(newIndex);

          // インデックス更新
          currentIndex = newIndex;
        }
      }
    });

    return () => { };
  });


  // =========================================================
  // アンカーリンク（ページネーション）のクリック処理
  // =========================================================
  navButtons.forEach((btn, index) => {
    btn.addEventListener('click', () => {
      const st = ScrollTrigger.getById("works-pin");
      if (!st) return;

      const startY = st.start;
      const endY = st.end;
      const distance = endY - startY;
      const progress = index / (itemsCount - 1);
      const targetY = startY + (distance * progress);

      // ジャンプ処理開始
      isJumping = true;

      // サークルテキストが存在する場合は、移動方向に応じて回転を加速させる
      if (typeof rotateTween !== "undefined") {
        if (currentIndex < index) {
          gsap.to(rotateTween, { timeScale: 50, duration: 0.1, overwrite: true });
        } else if (currentIndex > index) {
          gsap.to(rotateTween, { timeScale: -50, duration: 0.1, overwrite: true });
        }
      }

      // インデックスが異なる場合のみ、直接対象の作品へ移動する（作品表示とページャー更新）
      if (currentIndex !== index) {
        if (worksItems[currentIndex]) {
          worksItems[currentIndex].hide();
        }
        if (worksItems[index]) {
          worksItems[index].show();
        }
        animatePager(index);
        currentIndex = index;
      }

      // ScrollToPluginを使用して滑らかにスクロール
      gsap.to(window, {
        scrollTo: {
          y: targetY,
        },
        duration: GSAP_CONFIG.durationBase,
        ease: GSAP_CONFIG.easeInOut,
        overwrite: "auto",
        onComplete: () => {
          // 移動完了後にフラグを解除し、サークルテキストの回転速度を元に戻す
          isJumping = false;
          if (typeof rotateTween !== "undefined") {
            gsap.to(rotateTween, { timeScale: 1, duration: GSAP_CONFIG.durationBase, ease: GSAP_CONFIG.easeBase, overwrite: true });
          }
        }
      });
    });
  });


  // =========================================================
  // サークルテキストのスクロール連動回転処理
  // =========================================================
  /**
   * サークルテキストのSVGラッパー要素
   * @type {HTMLElement | null}
   */
  const circleText = document.querySelector('.p-top__works-svg-wrap');

  /**
   * 回転アニメーションを管理するTweenインスタンス
   * @type {gsap.core.Tween | undefined}
   */
  let rotateTween;

  if (circleText) {
    // 常に一定速度で回転するベースアニメーションを作成
    rotateTween = gsap.to(circleText, {
      rotation: 360,
      duration: 16, // 1周にかかる秒数
      ease: "none",
      repeat: -1
    });

    // ページ全体のスクロール速度を監視
    ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => {
        const velocity = self.getVelocity();
        const timeScale = 1 + (velocity / 500); // 500: スクロール速度をtimeScaleに変換するための感度調整係数

        gsap.to(rotateTween, {
          timeScale: timeScale,
          duration: 0.1,
          ease: GSAP_CONFIG.easeBase,
          overwrite: true
        });
      }
    });

    // スクロール停止時に回転速度を自然に元(1)に戻す
    ScrollTrigger.addEventListener("scrollEnd", () => {
      gsap.to(rotateTween, {
        timeScale: 1,
        duration: GSAP_CONFIG.durationBase,
        ease: GSAP_CONFIG.easeBase,
        overwrite: true
      });
    });
  }

  // =========================================================
  // エリア全体の表示アニメーション（is-active付与）
  // =========================================================
  /**
   * フェードインさせる対象の要素群
   * @type {NodeListOf<HTMLElement>}
   */
  const fadeElements = document.querySelectorAll('.p-top__works-ttl, .p-top__works-list, .p-top__works-nav-wrap');

  ScrollTrigger.create({
    trigger: '.p-top__works',
    start: GSAP_CONFIG.fadeTrigger,
    onEnter: () => {
      fadeElements.forEach(el => el.classList.add('is-active'));
    },
    once: true
  });

});