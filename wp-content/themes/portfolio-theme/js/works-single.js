/**
 * WORKS個別ページ: カスタムスクロールバーと横スクロール連動用JS
 * スクロールエリアの縦スクロールに連動して、カスタムスクロールバーのつまみを動かす。
 * GSAPの横スクロールとも同期し、リサイズや画像読み込み時の高さ変更にも対応。
 */
document.addEventListener('DOMContentLoaded', () => {
  /**
   * スクロールエリア
   * @type {HTMLElement | null}
   */
  const scrollArea = document.querySelector('.p-works-single__scroll-area');

  /**
   * スクロールバーのつまみ
   * @type {HTMLElement | null}
   */
  const scrollbarThumb = document.querySelector('.p-works-single__scrollbar-thumb');

  /**
   * スクロールバー全体（トラック）
   * @type {HTMLElement | null}
   */
  const scrollbar = document.querySelector('.p-works-single__scrollbar');

  // 要素が存在しないページでのエラーを防ぐ安全対策
  if (!scrollArea || !scrollbarThumb || !scrollbar) return;

  /**
   * スクロールバーの状態と計算用数値を管理するオブジェクト
   * @type {Object}
   * @property {boolean} active - つまみをドラッグ中かどうか
   * @property {number} startY - ドラッグ開始時のポインターのY座標
   * @property {number} startScrollY - ドラッグ開始時のスクロールエリアのスクロール位置
   * @property {number} trackHeight - つまみが稼働できる最大距離（スクロールバーの高さ - つまみの高さ）
   * @property {number} thumbHeight - スクロールバーのつまみ自体の高さ
   * @property {number} maxScroll - スクロールエリアの最大スクロール可能量
   * @property {number} ratio - スクロール量に対するつまみの移動量の比率
   */
  const state = {
    active: false,
    startY: 0,
    startScrollY: 0,
    trackHeight: 0,
    thumbHeight: 0,
    maxScroll: 0,
    ratio: 0
  };

  /**
   * スクロールエリアとつまみの各種サイズ・比率を再計算する
   * （初期化時、リサイズ時、画像読み込み完了時に実行）
   */
  const updateMetrics = () => {
    // エリアの表示上の高さと、スクロール可能な全体の高さを取得
    const areaHeight = scrollArea.clientHeight;
    const totalHeight = scrollArea.scrollHeight;

    state.thumbHeight = scrollbarThumb.clientHeight;
    state.trackHeight = areaHeight - state.thumbHeight;
    state.maxScroll = totalHeight - areaHeight;

    // ゼロ除算エラーを防ぎつつ、スクロール比率を計算
    state.ratio = state.maxScroll > 0 ? state.trackHeight / state.maxScroll : 0;
  };

  /**
   * 現在のスクロール位置に基づいて、つまみのCSS(transform)を更新する
   * @param {number} scrollTop - スクロールエリアの現在のスクロール量
   */
  const updateThumbPosition = (scrollTop) => {
    // スクロール量からつまみのY座標を計算
    let y = scrollTop * state.ratio;

    // はみ出さないように稼働領域内に制限する
    y = Math.max(0, Math.min(y, state.trackHeight));

    scrollbarThumb.style.transform = `translate(-50%, ${y}px)`;
  };

  // =========================================================================
  // オブザーバーと外部ライブラリとの連携処理
  // =========================================================================

  /**
   * スクロールエリアのサイズ変更を監視（画像読み込みなどによる高さ変動を検知）
   * 初回実行も兼ねているため、個別の初期化呼び出しは不要
   * @type {ResizeObserver}
   */
  const resizeObserver = new ResizeObserver(() => {
    updateMetrics();
    updateThumbPosition(scrollArea.scrollTop);
  });
  resizeObserver.observe(scrollArea);

  // GSAP(ScrollTrigger)の再計算（横スクロール用余白の生成など）が完全に完了したタイミングをキャッチ
  // works-single-horizontal.js での refresh() 実行後に同期させる
  if (typeof ScrollTrigger !== 'undefined') {
    ScrollTrigger.addEventListener('refresh', () => {
      updateMetrics();
      updateThumbPosition(scrollArea.scrollTop);
    });
  }

  // =========================================================================
  // イベントリスナー群
  // =========================================================================

  /**
   * エリア本体をスクロールした時の処理（マウスホイールやスワイプ操作）
   */
  scrollArea.addEventListener('scroll', () => {
    // つまみをドラッグ中は二重動作を防ぐために無視
    if (state.active) return;
    updateThumbPosition(scrollArea.scrollTop);
  }, { passive: true });

  /**
   * スクロールバーのトラック（線）部分をクリックした時の処理
   * クリックした位置へつまみとスクロールを移動させる
   */
  scrollbar.addEventListener('click', (event) => {
    // つまみ自身をクリックした場合は無視
    if (event.target === scrollbarThumb) return;

    updateMetrics();

    // スクロール不要時（画像が全体表示済など）は無視
    if (state.ratio === 0) return;

    // Y座標を計算
    const rect = scrollbar.getBoundingClientRect();
    const clickY = event.clientY - rect.top;

    // クリックした位置につまみの中心が来るように計算し、はみ出しを制限
    let targetThumbY = clickY - (state.thumbHeight / 2);
    targetThumbY = Math.max(0, Math.min(targetThumbY, state.trackHeight));

    // 計算したつまみ位置から逆算して、エリア本体をスクロールさせる
    scrollArea.scrollTop = targetThumbY / state.ratio;
    updateThumbPosition(scrollArea.scrollTop);
  });

  /**
   * つまみを掴んだ（ドラッグ開始）時の処理（マウス＆タッチ対応）
   */
  scrollbarThumb.addEventListener('pointerdown', (event) => {
    updateMetrics();
    if (state.ratio === 0) return;

    state.active = true;
    state.startY = event.clientY;
    state.startScrollY = scrollArea.scrollTop;

    // マウスが要素から外れてもドラッグを追跡し続ける
    scrollbarThumb.setPointerCapture(event.pointerId);
  });

  /**
   * つまみをドラッグ中の処理
   */
  scrollbarThumb.addEventListener('pointermove', (event) => {
    if (!state.active) return;

    // 意図しないテキスト選択やスクロールの干渉をガード
    event.preventDefault();

    // ポインターの移動量からスクロール量を計算
    const deltaY = event.clientY - state.startY;
    const scrollDelta = deltaY / state.ratio;

    scrollArea.scrollTop = state.startScrollY + scrollDelta;
    updateThumbPosition(scrollArea.scrollTop);
  });

  /**
   * ドラッグ終了（指を離した時、またはシステムによって操作が中断された時）
   * @param {PointerEvent} event
   */
  const endDrag = (event) => {
    state.active = false;
    scrollbarThumb.releasePointerCapture(event.pointerId);
  };

  scrollbarThumb.addEventListener('pointerup', endDrag);
  scrollbarThumb.addEventListener('pointercancel', endDrag);

});