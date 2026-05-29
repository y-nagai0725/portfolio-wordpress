/**
 * サイト全体のJavaScript共通定数
 * 各モジュール（JSファイル）でimportして使用する
 */
export const GSAP_CONFIG = {
  /**
   * 基本のアニメーション時間 (秒)
   * @type {number}
   */
  durationBase: 0.4,

  /**
   * ゆっくりめのアニメーション時間 (秒)
   * @type {number}
   */
  durationSlow: 0.8,

  /**
   * 基本のイージング
   * @type {string}
   */
  easeBase: "power2.out",

  /**
   * 行って帰るような動きのイージング
   * @type {string}
   */
  easeInOut: "power2.inOut",

  /**
   * ScrollTriggerの基本発火位置
   * @type {string}
   */
  fadeTrigger: "top 65%"
};