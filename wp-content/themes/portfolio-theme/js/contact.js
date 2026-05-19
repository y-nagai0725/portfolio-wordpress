/**
 * CONTACTページ用JS
 * CF7の送信完了イベントを検知し、サンクスページへリダイレクトする
 */
document.addEventListener('DOMContentLoaded', () => {
  // CF7の送信が成功した時（wpcf7mailsent）に発動する
  document.addEventListener('wpcf7mailsent', (event) => {
    // Thanksページへ強制的に移動（リダイレクト）させる
    window.location.href = myGlobalData.thanksUrl;
  });
});