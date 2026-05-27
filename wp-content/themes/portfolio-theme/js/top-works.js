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
    animDuration = 0.4;
    animEase = "power2.out";

    /**
     * @param {HTMLElement} element - 作品のDOM要素
     * @param {number} index - 作品のインデックス番号
     */
    constructor(element, index) {
      this.el = element;
      this.index = index;

      // アニメーション対象の内部要素を取得
      this.ttl = this.el.querySelector('.p-top__works-item-ttl');
      this.txt = this.el.querySelector('.p-top__works-item-txt');
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
  const pinnedArea = document.querySelector('.p-top__works-pinned-area');
  // 取得したNodeListを配列に変換し、WorksItemクラスのインスタンスを生成
  const worksItems = [...document.querySelectorAll('.p-top__works-item')].map((el, index) => new WorksItem(el, index));
  const navButtons = document.querySelectorAll('.p-top__works-nav-btn');
  const pager = document.querySelector('.p-top__works-nav-pager');

  // 対象要素が存在しないページでは処理を中断
  if (!pinnedArea || worksItems.length === 0) return;

  const itemsCount = worksItems.length;

  // 状態管理用変数
  let isJumping = false; // アンカーリンクによる強制スクロール中かどうかのフラグ
  let currentIndex = 0;  // 現在表示されている作品のインデックス


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
   * 移動方向に向かって幅が伸びる弾力的な表現（スライム風）を実装しています。
   * @param {number} newIndex - 移動先のインデックス番号
   */
  const animatePager = (newIndex) => {
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
    gsap.to(pager, { y: targetY, height: targetHeight, duration: 0.2 });

    if (isMovingRight) {
      // 右方向への移動：右に幅を伸ばしてから左を追いつかせる
      tl.to(pager, {
        width: (targetX - currentX) + targetWidth,
        duration: 0.2,
        ease: "power1.inOut"
      }).to(pager, {
        x: targetX,
        width: targetWidth,
        duration: 0.2,
        ease: "power2.out"
      });
    } else {
      // 左方向への移動：左に移動しつつ幅を残し、後から右を追いつかせる
      tl.to(pager, {
        x: targetX,
        width: (currentX - targetX) + targetWidth,
        duration: 0.2,
        ease: "power1.inOut"
      }).to(pager, {
        width: targetWidth,
        duration: 0.2,
        ease: "power2.out"
      });
    }
  };

  /**
   * リサイズ時のページャー位置更新
   * パフォーマンス低下を防ぐため、リサイズ完了後 200ms 後に再計算を実行します。
   */
  let resizeTimer;
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
          gsap.to(rotateTween, { timeScale: 50, duration: 0.2, overwrite: true });
        } else if (currentIndex > index) {
          gsap.to(rotateTween, { timeScale: -50, duration: 0.2, overwrite: true });
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
        duration: 0.4,
        ease: "power2.inOut",
        overwrite: "auto",
        onComplete: () => {
          // 移動完了後にフラグを解除し、サークルテキストの回転速度を元に戻す
          isJumping = false;
          if (typeof rotateTween !== "undefined") {
            gsap.to(rotateTween, { timeScale: 1, duration: 0.4, ease: "power2.out", overwrite: true });
          }
        }
      });
    });
  });


  // =========================================================
  // サークルテキストのスクロール連動回転処理
  // =========================================================
  const circleText = document.querySelector('.p-top__works-svg-wrap');
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
          ease: "power2.out",
          overwrite: true
        });
      }
    });

    // スクロール停止時に回転速度を自然に元(1)に戻す
    ScrollTrigger.addEventListener("scrollEnd", () => {
      gsap.to(rotateTween, {
        timeScale: 1,
        duration: 0.4,
        ease: "power2.out",
        overwrite: true
      });
    });
  }

  // =========================================================
  // エリア全体の表示アニメーション（is-active付与）
  // =========================================================
  const fadeElements = document.querySelectorAll('.p-top__works-ttl, .p-top__works-list, .p-top__works-nav-wrap');

  ScrollTrigger.create({
    trigger: '.p-top__works',
    start: "top 65%",
    onEnter: () => {
      fadeElements.forEach(el => el.classList.add('is-active'));
    },
    once: true
  });

});