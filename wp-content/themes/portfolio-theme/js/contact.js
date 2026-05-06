// CONTACTページ用JS
document.addEventListener('DOMContentLoaded', function () {
  // CF7の送信が成功した時（wpcf7mailsent）に発動する
  document.addEventListener('wpcf7mailsent', function (event) {
    // Thanksページへ強制的に移動（リダイレクト）させる
    location = myGlobalData.thanksUrl;
  }, false);
});