// WORKS一覧ページ用JS
document.addEventListener('DOMContentLoaded', () => {
  // ボタンと作品カードを全部取得する
  const filterButtons = document.querySelectorAll('.works-view__filter-btn');
  const worksCards = document.querySelectorAll('.works-view__list');

  // 各ボタンにクリックイベントを追加
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {

      // ボタンのデザイン（is-active）を切り替える
      filterButtons.forEach(btn => btn.classList.remove('is-active'));
      button.classList.add('is-active');

      // クリックしたボタンの「data-filter」の値を取得
      const targetFilter = button.getAttribute('data-filter');

      // 作品カードをチェック
      worksCards.forEach(card => {
        // カードが持っている技術「data-skills」を取得
        const cardSkills = card.getAttribute('data-skills');

        // 「ALL」が選ばれた時、またはカードの技術に選んだ技術が含まれている時
        if (targetFilter === 'all' || cardSkills.includes(targetFilter)) {
          // 表示する
          card.classList.remove('is-hidden');
        } else {
          // 隠す
          card.classList.add('is-hidden');
        }
      });
    });
  });
});