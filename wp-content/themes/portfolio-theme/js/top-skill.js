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
   * @type {string}
   */
  const PATH_ANIMATION_DURATION = "2.8s";

  /**
   * パス（線）描画のイージング
   * @type {string}
   */
  const PATH_ANIMATION_TIMING_FUNCTION = "ease-in-out";

  /**
   * SVGの初期設定
   * 各path要素の長さを動的に計算し、stroke-dashoffet, stroke-dasharrayプロパティを設定して最初は線が見えない状態にする。
   */
  const setupSvgPathLengths = () => {
    svgElements.forEach(svg => {
      const pathElements = svg.querySelectorAll("path");
      pathElements.forEach(path => {
        // パス全体の長さを取得
        const pathLength = path.getTotalLength();

        // 線の間隔とズレの数値を同じにして、線が見えない状態にする
        path.style.strokeDashoffset = pathLength;
        path.style.strokeDasharray = pathLength;
      });
    });
  };

  /**
   * SVGのパス描画アニメーションを実行する
   * @param {SVGElement} svg - アニメーションを開始する対象のSVG要素
   */
  const animateSvgPaths = (svg) => {
    const pathElements = svg.querySelectorAll("path");
    pathElements.forEach(path => {
      // transitionを設定して、隠していたstroke-dashoffsetを0に向かって滑らかに動かす
      path.style.transitionProperty = 'stroke-dashoffset';
      path.style.transitionDuration = PATH_ANIMATION_DURATION;
      path.style.transitionTimingFunction = PATH_ANIMATION_TIMING_FUNCTION;
      path.style.strokeDashoffset = 0;
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
        start: 'top 65%', // ビューポートの上から65%の位置に来たら発火
        once: true,
        onEnter: () => {
          // SVGの先祖要素（li）を取得して同時に is-active を付与
          const parentItem = svg.closest('.p-top__skill-item');
          if (parentItem) {
            parentItem.classList.add('is-active');
          }

          // SVGの一筆書きアニメーションを開始
          animateSvgPaths(svg);
        },
      });
    });
  };

  // 初期化とアニメーションの登録を実行
  setupSvgPathLengths();
  initAnimations();
});