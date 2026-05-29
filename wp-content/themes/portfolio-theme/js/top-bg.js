import * as THREE from "./three.module.min.js";

/**
 * トップページ: 背景アニメーション用JS (Three.js)
 * MV〜MESSAGEセクションにかけて、GSAPと連動して空間の動きを変化させる
 */
document.addEventListener('DOMContentLoaded', () => {
  /**
   * 描画対象のCanvas要素
   * @type {HTMLCanvasElement | null}
   */
  const canvas = document.querySelector('#bg-canvas');
  if (!canvas) return;

  /**
   * スマホ・タブレット（1023px以下）かどうかの判定フラグ
   * @type {boolean}
   */
  const isSp = window.innerWidth <= 1023;

  // =========================================================
  // Three.jsの基本セットアップ
  // =========================================================
  /**
   * 3D空間（シーン）
   * @type {THREE.Scene}
   */
  const scene = new THREE.Scene();

  // 空間の奥行きを表現する「霧（フォグ）」の設定
  scene.fog = new THREE.FogExp2(0x000000, 0.00065);

  /**
   * 初期視野角（SP表示時は視野角を広くして空間の広がりを保つ）
   * @type {number}
   */
  const initialFov = isSp ? 105 : 75;

  /**
   * カメラ
   * @type {THREE.PerspectiveCamera}
   */
  const camera = new THREE.PerspectiveCamera(initialFov, window.innerWidth / window.innerHeight, 0.1, 2000);
  camera.position.z = 1000;

  /**
   * レンダラー
   * @type {THREE.WebGLRenderer}
   */
  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,      // 背景を透過
    antialias: true   // 輪郭のギザギザを滑らかにする
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  // 高解像度ディスプレイでも重くなりすぎないよう、ピクセル比の上限を2に制限
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // =========================================================
  // 光の線（ラインセグメント）の生成
  // =========================================================
  /**
   * パーティクルの数（SP時は負荷軽減と密度調整のため数を減らす）
   * @type {number}
   */
  const particleCount = isSp ? 500 : 700;

  /**
   * ジオメトリ
   * @type {THREE.BufferGeometry}
   */
  const geometry = new THREE.BufferGeometry();

  /**
   * 頂点座標の配列（1本の線につき頭と尻尾の2頂点×XYZの3座標 = 6）
   * @type {Float32Array}
   */
  const positions = new Float32Array(particleCount * 6);

  /**
   * 頂点カラーの配列
   * @type {Float32Array}
   */
  const colors = new Float32Array(particleCount * 6);

  /**
   * 各パーティクルの移動スピードの配列
   * @type {Float32Array}
   */
  const speeds = new Float32Array(particleCount);

  /**
   * CSSのルート変数（:root）を取得
   * @type {CSSStyleDeclaration}
   */
  const rootStyles = getComputedStyle(document.documentElement);

  /** @type {string} */
  const cssColorWhite = rootStyles.getPropertyValue('--color-white').trim();
  /** @type {string} */
  const cssColorGray = rootStyles.getPropertyValue('--color-gray').trim();
  /** @type {string} */
  const cssColorTail = rootStyles.getPropertyValue('--color-tail').trim();

  /** @type {THREE.Color} */
  const colorWhite = new THREE.Color(cssColorWhite);
  /** @type {THREE.Color} */
  const colorGray = new THREE.Color(cssColorGray);
  /** @type {THREE.Color} */
  const colorTail = new THREE.Color(cssColorTail);

  for (let i = 0; i < particleCount; i++) {
    // x, y, z座標を -1000 〜 1000 の範囲にランダム配置
    const x = (Math.random() - 0.5) * 2000;
    const y = (Math.random() - 0.5) * 2000;
    const z = (Math.random() - 0.5) * 2000;

    // 頭（先頭）の初期座標
    positions[i * 6] = x;
    positions[i * 6 + 1] = y;
    positions[i * 6 + 2] = z;

    // 尻尾（後方）の初期座標（最初は頭と同じ位置）
    positions[i * 6 + 3] = x;
    positions[i * 6 + 4] = y;
    positions[i * 6 + 5] = z;

    // 色の割合設定
    const isGray = Math.random() < 0.66;
    const mixedColor = isGray ? colorGray : colorWhite;

    // 頭の色
    colors[i * 6] = mixedColor.r;
    colors[i * 6 + 1] = mixedColor.g;
    colors[i * 6 + 2] = mixedColor.b;

    // 尻尾の色（黒っぽくフェードアウトさせる）
    colors[i * 6 + 3] = colorTail.r;
    colors[i * 6 + 4] = colorTail.g;
    colors[i * 6 + 5] = colorTail.b;

    // スピード（5 〜 25 の間でランダムにバラけさせる）
    speeds[i] = Math.random() * 20 + 5;
  }

  // 座標と色のデータをジオメトリに登録
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  /**
   * 線の質感（マテリアル）設定
   * @type {THREE.LineBasicMaterial}
   */
  const material = new THREE.LineBasicMaterial({
    vertexColors: true,
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending, // 光が重なった時にピカッと白く発光させる（加算合成）
    depthWrite: false                 // 手前の黒い尻尾が、奥の光を隠してしまうバグを防ぐ必須設定
  });

  /**
   * 線(LineSegments)のメッシュ
   * @type {THREE.LineSegments}
   */
  const lines = new THREE.LineSegments(geometry, material);
  scene.add(lines);

  // =========================================================
  // アニメーションの状態管理（GSAPで操作する対象）
  // =========================================================
  /**
   * 背景アニメーションの進行状態と表示フラグを管理
   * @type {{progress: number, isVisible: boolean}}
   */
  const bgState = {
    progress: 0,        // 0 = A(奥から手前へ), 1 = B(下から上へ)
    isVisible: true     // Canvasが表示されているか（エコモード用フラグ）
  };

  // =========================================================
  // GSAP ScrollTriggerの連携
  // =========================================================

  // MESSAGEセクションで、進む方向(progress)をAからBへ滑らかに変化
  ScrollTrigger.create({
    trigger: '.p-top__message',
    start: 'top bottom',
    end: 'top top',
    scrub: true,
    onUpdate: (self) => {
      bgState.progress = self.progress;
    }
  });

  // ABOUTセクションが見えたらCanvasをフェードアウト＆描画をストップさせる
  ScrollTrigger.create({
    trigger: '.p-top__about',
    start: 'top 80%',
    end: 'top 40%',
    scrub: true,
    onUpdate: (self) => {
      canvas.style.opacity = (1 - self.progress).toString();
      bgState.isVisible = self.progress < 1; // 完全に消えたら false にする
    }
  });

  // =========================================================
  // アニメーションループ（毎フレームの計算）
  // =========================================================
  /**
   * 毎フレーム実行されるアニメーションループ関数
   */
  const animate = () => {
    requestAnimationFrame(animate);

    // Canvasが見えない時は処理をストップ
    if (!bgState.isVisible) return;

    // カメラの「ease-in」イージング
    // 3乗することで、「最初はゆっくり、後半一気に」正面を向く自然な動きを作る
    const cameraEase = 1 - Math.pow(bgState.progress, 3);
    camera.position.x = 300 * cameraEase;
    camera.rotation.y = -0.55 * cameraEase;

    const positionsAttribute = geometry.attributes.position;
    const positionsArray = positionsAttribute.array;

    // 光の線（残像）の長さ
    const trailLength = 24;

    for (let i = 0; i < particleCount; i++) {
      const headIndex = i * 6;
      const tailIndex = i * 6 + 3;

      // スピード
      const currentSpeed = speeds[i];

      // progress(0〜1) に応じて、進む方向を振り分ける
      const moveZ = currentSpeed * (1 - bgState.progress); // A: 奥から手前
      const moveY = currentSpeed * bgState.progress;       // B: 下から上

      // 頭の座標を先に進める
      positionsArray[headIndex + 1] += moveY;
      positionsArray[headIndex + 2] += moveZ;

      // 尻尾の座標を、進んだ方向の「逆」に引き伸ばす（残像）
      positionsArray[tailIndex] = positionsArray[headIndex];
      positionsArray[tailIndex + 1] = positionsArray[headIndex + 1] - (moveY * trailLength);
      positionsArray[tailIndex + 2] = positionsArray[headIndex + 2] - (moveZ * trailLength);

      // 画面外(手前や上)に消えた光を、反対側(奥や下)に戻して無限ループさせる
      if (positionsArray[headIndex + 1] > 1000) {
        positionsArray[headIndex + 1] = -1000;
        positionsArray[tailIndex + 1] = -1000;
      }
      if (positionsArray[headIndex + 2] > 1000) {
        positionsArray[headIndex + 2] = -1000;
        positionsArray[tailIndex + 2] = -1000;
      }
    }

    // 座標データ書き換えを伝える
    positionsAttribute.needsUpdate = true;

    // MESSAGEセクションの終盤で、全体の透明度を下げる
    if (bgState.progress > 0.8) {
      material.opacity = 0.8 - ((bgState.progress - 0.8) * 3);
    } else {
      material.opacity = 0.8;
    }

    // シーンとカメラをレンダリング（描画）
    renderer.render(scene, camera);
  };

  // アニメーション開始
  animate();

  // =========================================================
  // リサイズ対応
  // =========================================================
  window.addEventListener('resize', () => {
    // 画面幅が変わった時、スマホ幅なら視野角を広げて見切れを防ぐ
    const currentIsSp = window.innerWidth <= 1023;
    camera.fov = currentIsSp ? 105 : 75;

    // カメラの縦横比を新しい画面サイズに合わせる
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
});