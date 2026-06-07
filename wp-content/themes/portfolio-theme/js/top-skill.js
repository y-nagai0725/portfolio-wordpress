import { GSAP_CONFIG } from "./constants.js";

/**
 * トップページ: SKILLセクション用JS
 * SVGのパス（線）の長さを動的に取得・初期化し、
 * ScrollTriggerと連携して画面に入ったタイミングで一筆書きアニメーションと要素のフェードインを同時に制御する。
 */
document.addEventListener('DOMContentLoaded', () => {
  /**
   * アニメーション対象のSVG要素（各スキルのアイコン）
   * @type {NodeListOf<SVGElement>}
   */
  const svgElements = document.querySelectorAll('.p-top__skill-icon-wrap svg');

  // 要素が存在しないページ（下層ページなど）でのエラーを防ぐ
  if (svgElements.length === 0) return;

  /**
   * パス（線）が描き終わるまでのアニメーション時間
   * @type {number}
   */
  const PATH_ANIMATION_DURATION = 2;

  /**
  * 基準の1/3のアニメーション時間
  * @type {number}
  */
  const SHORT_DURATION = PATH_ANIMATION_DURATION / 3;

  /**
   * SVGの初期設定
   * 各path要素の長さを動的に計算し、stroke-dashoffset, stroke-dasharrayプロパティを設定して最初は線が見えない状態にする。
   */
  const setupSvgPathLengths = () => {
    svgElements.forEach(svg => {
      // SVG内のすべてのパス要素
      const pathElements = svg.querySelectorAll("path");
      pathElements.forEach(path => {
        // パス全体の長さ
        const pathLength = path.getTotalLength();

        // 線の間隔とズレの数値を同じにして、線が見えない状態にする
        path.style.strokeDashoffset = pathLength.toString();
        path.style.strokeDasharray = pathLength.toString();
      });
    });
  };

  /**
   * SVGのパス描画アニメーションを実行する
   * @param {SVGElement} svg - アニメーションを開始する対象のSVG要素
   */
  const animateSvgPaths = (svg) => {
    // SVG内のすべてのパス要素
    const pathElements = svg.querySelectorAll("path");

    pathElements.forEach(path => {
      // ベースの設定値
      let animConfig = {
        duration: PATH_ANIMATION_DURATION,
        delay: 0,
        hasFadeOut: false,
        fadeOutDelay: 0
      };

      // クラス名に応じて、設定値を上書きする
      if (path.classList.contains('js-draw-fade-out')) {
        animConfig.hasFadeOut = true;
      } else if (path.classList.contains('js-draw-fade-out-delay')) {
        animConfig.hasFadeOut = true;
        animConfig.fadeOutDelay = SHORT_DURATION;
      } else if (path.classList.contains('js-draw-delay')) {
        animConfig.duration = SHORT_DURATION;
        animConfig.delay = PATH_ANIMATION_DURATION;
      } else if (path.classList.contains('js-draw-delay-long')) {
        animConfig.duration = SHORT_DURATION;
        animConfig.delay = PATH_ANIMATION_DURATION + SHORT_DURATION;
      } else if (path.classList.contains('js-draw-delay-fade-out')) {
        animConfig.duration = SHORT_DURATION;
        animConfig.delay = PATH_ANIMATION_DURATION;
        animConfig.hasFadeOut = true;
      }

      // GSAPに渡すパラメータ
      const tweenParams = {
        strokeDashoffset: 0,
        duration: animConfig.duration,
        delay: animConfig.delay,
        ease: GSAP_CONFIG.easeInOut
      };

      // フェードアウトが必要な場合のみ onComplete の処理を追加
      if (animConfig.hasFadeOut) {
        tweenParams.onComplete = () => {
          gsap.to(path, {
            autoAlpha: 0,
            duration: SHORT_DURATION,
            delay: animConfig.fadeOutDelay,
            ease: GSAP_CONFIG.easeInOut
          });
        };
      }

      // アニメーション処理実行
      gsap.to(path, tweenParams);
    });
  };

  /**
   * ScrollTriggerを使用した発火設定
   * 各SVGが画面の指定位置に入った瞬間を検知し、親要素のフェードインとSVGの描画を同時実行する。
   */
  const initAnimations = () => {
    svgElements.forEach(svg => {
      ScrollTrigger.create({
        trigger: svg,
        start: GSAP_CONFIG.fadeTrigger,
        once: true,
        onEnter: () => {
          // SVGの先祖要素（li）
          const parentItem = svg.closest('.p-top__skill-item');
          if (parentItem) {
            parentItem.classList.add('is-active');
          }

          // SVGのパス描画アニメーション実行
          animateSvgPaths(svg);
        },
      });
    });
  };

  // 初期化とアニメーションの登録を実行
  setupSvgPathLengths();
  initAnimations();
});