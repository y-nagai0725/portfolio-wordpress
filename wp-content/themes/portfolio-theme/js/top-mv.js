/**
 * トップページ: MVセクション用JS
 * ページ読み込み時のスクロール位置を判定し、
 * MVセクションの表示アニメーション（is-active / is-complete）を制御する。
 * リンクに次セクションへのスムーススクロール処理を設定。
 */
document.addEventListener('DOMContentLoaded', () => {
  /**
   * 日本語テキストラッパー要素
   */
  const jaWrap = document.querySelector('.p-top__catchcopy-ja-wrap');

  /**
   * 英語ロゴ画像ラッパー要素
   */
  const enWrap = document.querySelector('.p-top__catchcopy-en-wrap');

  /**
   * スクロールボタンラッパー要素
   */
  const scrollBtnWrap = document.querySelector('.p-top__scroll-btn-wrap');

  /// 要素が存在しないページでのエラーを防ぐ安全対策
  if (!jaWrap || !enWrap || !scrollBtnWrap) return;

  /**
   * 複数の要素に同じ処理をするため、配列にまとめておく
   */
  const mvElements = [jaWrap, enWrap, scrollBtnWrap];

  /**
   * 現在のスクロール量
   */
  const currentScrollY = window.scrollY;

  /**
   * 判定の基準（画面の高さの半分）
   */
  const threshold = window.innerHeight / 2;

  // クラスの付与処理
  if (currentScrollY < threshold) {
    // MVが半分以上見えている場合: アニメーションを見せる
    setTimeout(() => {
      mvElements.forEach(el => el.classList.add('is-active'));
    }, 100); // 0.1秒だけ待ってから付与することで、アニメーションが不発になるバグを防ぐ

  } else {
    // すでにスクロールされていてMVが見えていない場合: アニメーションをスキップ
    mvElements.forEach(el => {
      el.classList.add('is-complete'); // transition: none を設定
      el.classList.add('is-active');   // 不透明度と最終位置をセット
    });
  }

  // リンクのaタグ（.p-top__scroll-btn）を取得
  const scrollBtn = scrollBtnWrap.querySelector('.p-top__scroll-btn');

  if (scrollBtn) {
    scrollBtn.addEventListener('click', (e) => {
      // デフォルトのリンクの動きをキャンセル
      e.preventDefault();

      // MESSAGEセクションへのスムーススクロール処理
      gsap.to(window, {
        duration: 0.8,
        scrollTo: {
          y: '#message',
        },
        ease: 'power2.out'
      });
    });
  }
});