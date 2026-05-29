/**
 * CONTACTページ用JS
 * Contact Form 7 の送信イベントをフックし、
 * 二重送信の防止とサンクスページへのリダイレクト処理を行う。
 */
document.addEventListener('DOMContentLoaded', () => {
  /**
   * 送信ボタン要素
   * @type {HTMLElement | null}
   */
  const submitBtn = document.querySelector(".p-contact__form-submit.wpcf7-submit");

  // 要素が存在しないページ（お問い合わせページ以外）でのエラーを防ぐ安全対策
  if (!submitBtn) return;

  // 送信ボタンクリック時の処理（二重送信防止）
  submitBtn.addEventListener('click', () => {
    // pointer-eventsをnoneにして、連続クリックを無効化する
    submitBtn.style.pointerEvents = "none";
  });

  /**
   * エラー等で送信が中断された時に発動する処理
   * 再入力できるようにボタンのクリック判定を復活させる
   */
  const resetSubmitButton = () => {
    submitBtn.style.pointerEvents = "auto";
  };

  // 入力エラー、スパム判定、サーバーエラーのいずれかが起きた場合はボタンを復活させる
  document.addEventListener('wpcf7invalid', resetSubmitButton);
  document.addEventListener('wpcf7spam', resetSubmitButton);
  document.addEventListener('wpcf7mailfailed', resetSubmitButton);

  // CF7の送信が成功した時（wpcf7mailsent）に発動する処理
  document.addEventListener('wpcf7mailsent', () => {
    // functions.phpで定義した myGlobalData からURLを取得し、Thanksページへリダイレクトさせる
    if (typeof myGlobalData !== 'undefined' && myGlobalData.thanksUrl) {
      window.location.href = myGlobalData.thanksUrl;
    }
  });
});