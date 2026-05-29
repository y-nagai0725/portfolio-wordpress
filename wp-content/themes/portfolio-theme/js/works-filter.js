/**
 * 作品一覧ページ: 絞り込みフィルター用JS
 * 選択された技術（タクソノミー）に応じて、該当する作品カードの表示/非表示を切り替える
 */
document.addEventListener('DOMContentLoaded', () => {
  /**
   * 絞り込み用のフィルターボタン群
   * @type {NodeListOf<HTMLElement>}
   */
  const filterButtons = document.querySelectorAll('.p-works-archive__filter-btn');

  /**
   * フィルタリング対象となる作品カード群
   * @type {NodeListOf<HTMLElement>}
   */
  const worksCards = document.querySelectorAll('.p-works-archive__works-item');

  // 要素が存在しないページでのエラーを防ぐ安全対策
  if (filterButtons.length === 0 || worksCards.length === 0) return;

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