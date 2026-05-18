/**
 * WORKS個別ページ: スクロール画像横スクロール用JS
 * GSAP(ScrollTrigger)を使用し、縦スクロールの量に応じて画像を横方向へスライドさせる。
 * カスタムスクロールバーとの干渉（ガタつき）を防ぐため、GSAPのpin留め機能は使用せず、
 * CSSの position: sticky と JSによるダミー余白（spacer）の動的生成を組み合わせて実装。
 */
document.addEventListener('DOMContentLoaded', () => {
  /**
   * スクロールエリア
   */
  const scrollArea = document.querySelector(".p-works-single__scroll-area");

  /**
   * スクロール画像ラッパー
   */
  const scrollImgWrapper = document.querySelector(".p-works-single__scroll-img-wrap");

  /**
   * スクロール画像
   */
  const scrollImage = document.querySelector(".p-works-single__img--horizontal");

  // 対象要素が存在しないページ（横スクロール指定のない作品など）でのエラーを防ぐ安全対策
  if (!scrollArea || !scrollImgWrapper || !scrollImage) return;

  /**
   * 横スクロールアニメーションの初期構築を行う
   */
  const initHorizontalScroll = () => {
    /**
     * 画像を横にスライドさせる総距離を計算する
     * @returns {number} 画像の本来の横幅 - 見えているラッパーエリアの横幅
     */
    const getScrollAmount = () => scrollImage.scrollWidth - scrollImgWrapper.clientWidth;

    // =========================================================================
    // CSSの sticky を機能させるための縦方向のスクロール余白（spacer）を生成
    // =========================================================================
    let spacer = document.querySelector('.js-scroll-spacer');

    // シングルトンパターン：無限増殖を防ぐため、未生成の場合のみ新規作成
    if (!spacer) {
      spacer = document.createElement('div');
      spacer.classList.add('js-scroll-spacer');

      // scrollAreaに対して絶対配置し、操作の邪魔にならない要素として配置
      spacer.style.position = 'absolute';
      spacer.style.top = '0';
      spacer.style.left = '0';
      spacer.style.width = '1px';          // ブラウザの描画省略を回避するための最小幅
      spacer.style.pointerEvents = 'none'; // クリック等のマウスイベントをスルー
      spacer.style.visibility = 'hidden';  // 視覚的に非表示

      scrollArea.appendChild(spacer);
    }

    /**
     * 画像の高さと横スクロール距離を合算し、spacer の高さを更新する
     * これにより、横スクロールに必要な分だけの「縦のスクロール可能領域」が確保される
     */
    const setSpacerHeight = () => {
      spacer.style.height = `${scrollImgWrapper.clientHeight + getScrollAmount()}px`;
    };

    // 初回高さセット
    setSpacerHeight();

    // =========================================================================
    // GSAP ScrollTrigger アニメーションの設定
    // =========================================================================
    gsap.to(scrollImage, {
      x: () => -getScrollAmount(), // スクロール量に応じて左方向（マイナス）へ移動
      ease: "none",
      scrollTrigger: {
        scroller: scrollArea,
        trigger: scrollImgWrapper,
        start: "top top",
        end: () => `+=${getScrollAmount()}`, // アニメーションの終了点を横移動させる距離と同じにする
        scrub: true,
        invalidateOnRefresh: true, // リサイズ時などに x や end の関数(計算式)を再評価する
      },
    });

    // 画面リサイズ時など、GSAPが再計算（refresh）を行う直前の準備段階（refreshInit）で、
    // 自作した余白（spacer）の高さも最新の状態に更新する
    ScrollTrigger.addEventListener('refreshInit', setSpacerHeight);

    // GSAPの初期構築が完了したことを確定させ、強制的に全体をリフレッシュする
    // この発火を worksIntroduction.js がキャッチし、カスタムスクロールバーの比率を再計算する
    ScrollTrigger.refresh();
  };

  // =========================================================================
  // 初期化の実行タイミング制御
  // =========================================================================

  // 画像が完全に読み込まれて正確な横幅（scrollWidth）が確定してからGSAPを組むための分岐
  if (scrollImage.complete) {
    // すでに読み込みが完了していれば実行
    initHorizontalScroll();
  } else {
    // まだ読み込み中なら、完了（load）を待ってから実行
    scrollImage.addEventListener('load', initHorizontalScroll);
  }
});