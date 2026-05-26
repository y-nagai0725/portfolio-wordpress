import * as THREE from "./three.module.js";

/**
 * トップページ: 背景アニメーション用JS (Three.js)
 * MV〜MESSAGEセクションにかけて、GSAPと連動して空間の動きを変化させる
 */
document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.querySelector('#bg-canvas');
  if (!canvas) return;

  // 💡 スマホ・タブレット（1023px以下）かどうかの判定
  const isSp = window.innerWidth <= 1023;

  // =========================================================
  // 1. Three.jsの基本セットアップ
  // =========================================================
  // 3D空間（シーン）の作成
  const scene = new THREE.Scene();

  // 🌟 空間の奥行きを表現する「霧（フォグ）」の設定
  // 第2引数の数値(0.0008)を大きくすると霧が濃くなり、小さくすると遠くまでクッキリ見える
  scene.fog = new THREE.FogExp2(0x000000, 0.0008);

  // カメラの設定（視野角, アスペクト比, 描画開始距離, 描画終了距離）
  // 🌟 SP表示時は視野角(fov)を広く(105)して、画面が狭くても空間の広がりを保つ
  const initialFov = isSp ? 105 : 75;
  const camera = new THREE.PerspectiveCamera(initialFov, window.innerWidth / window.innerHeight, 0.1, 2000);
  camera.position.z = 1000;

  // レンダラー（描画機）の設定
  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,      // 背景を透過させて、CSSの背景色（黒）と馴染ませる
    antialias: true   // 輪郭のギザギザを滑らかにする
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  // 高解像度ディスプレイでも重くなりすぎないよう、ピクセル比の上限を2に制限
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // =========================================================
  // 2. 光の線（ラインセグメント）の生成
  // =========================================================
  // 🌟 パーティクルの数。SP時は重くならないよう＆密集しすぎないよう半分に！
  const particleCount = isSp ? 1000 : 2000;

  const geometry = new THREE.BufferGeometry();
  // 1本の線につき「頭」と「尻尾」の2つの頂点(x,y,z)が必要なため、数は * 6 になる
  const positions = new Float32Array(particleCount * 6);
  const colors = new Float32Array(particleCount * 6);
  const speeds = new Float32Array(particleCount);

  // 🌟 線の色設定（変更したい時はここのカラーコードをいじる！）
  const colorBlue = new THREE.Color(0x4488ff);
  const colorWhite = new THREE.Color(0xffffff);
  const colorTail = new THREE.Color(0x1d1d1d); // 尻尾の色。少しグレーがかった黒

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

    // 🌟 色の割合設定（ここでは30%を青、70%を白に設定）
    const isBlue = Math.random() < 0.3;
    const mixedColor = isBlue ? colorBlue : colorWhite;

    // 頭の色
    colors[i * 6] = mixedColor.r;
    colors[i * 6 + 1] = mixedColor.g;
    colors[i * 6 + 2] = mixedColor.b;
    // 尻尾の色（黒っぽくフェードアウトさせる）
    colors[i * 6 + 3] = colorTail.r;
    colors[i * 6 + 4] = colorTail.g;
    colors[i * 6 + 5] = colorTail.b;

    // 🌟 各粒のベーススピード（3 〜 12 の間でランダムにバラけさせる）
    speeds[i] = Math.random() * 9 + 3;
  }

  // 座標と色のデータをジオメトリに登録
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  // 線の質感（マテリアル）設定
  const material = new THREE.LineBasicMaterial({
    vertexColors: true,
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending, // 🌟 光が重なった時にピカッと白く発光させる（加算合成）
    depthWrite: false                 // 🌟 手前の黒い尻尾が、奥の光を隠してしまうバグを防ぐ必須設定
  });

  // 点(Points)ではなく、線(LineSegments)としてシーンに追加
  const lines = new THREE.LineSegments(geometry, material);
  scene.add(lines);

  // =========================================================
  // 3. アニメーションの状態管理（GSAPで操作する対象）
  // =========================================================
  const bgState = {
    progress: 0,        // 0 = A(奥から手前へ), 1 = B(下から上へ)
    speedMultiplier: 1, // スクロール時の加速倍率
    isVisible: true     // Canvasが表示されているか（エコモード用フラグ）
  };

  // =========================================================
  // 4. GSAP ScrollTriggerの連携
  // =========================================================

  // ① MESSAGEセクションで、進む方向(progress)をAからBへ滑らかに変化
  ScrollTrigger.create({
    trigger: '.p-top__message',
    start: 'top bottom',
    end: 'top top',
    scrub: true,
    onUpdate: (self) => {
      bgState.progress = self.progress;
    }
  });

  // ② スクロール速度に合わせて、光のスピード加速する
  ScrollTrigger.create({
    start: 0,
    end: "max",
    onUpdate: (self) => {
      const velocity = self.getVelocity();
      // 500で割ることで加速の感度を調整
      const newMultiplier = 1 + Math.abs(velocity / 500);
      gsap.to(bgState, {
        speedMultiplier: newMultiplier,
        duration: 0.1,
        overwrite: true
      });
    }
  });

  // ③ ABOUTセクションが見えたらCanvasをフェードアウト＆描画を完全ストップ
  ScrollTrigger.create({
    trigger: '.p-top__about',
    start: 'top 80%',
    end: 'top 30%',
    scrub: true,
    onUpdate: (self) => {
      canvas.style.opacity = 1 - self.progress;
      bgState.isVisible = self.progress < 1; // 完全に消えたら false にする
    }
  });

  // ④ スクロールが止まったら、加速を元の速度(1)にス〜ッと戻す
  ScrollTrigger.addEventListener("scrollEnd", () => {
    gsap.to(bgState, {
      speedMultiplier: 1,
      duration: 0.5,
      ease: "power2.out",
      overwrite: true
    });
  });

  // =========================================================
  // 5. アニメーションループ（毎フレームの計算）
  // =========================================================
  const animate = () => {
    requestAnimationFrame(animate);

    // 🌟 究極のエコモード：Canvasが見えない時は無駄な計算をサボる！
    if (!bgState.isVisible) return;

    // 🌟 カメラの「ease-in」イージング！
    // 3乗することで、「最初はゆっくり、後半一気に」正面を向く自然な動きを作る
    const cameraEase = 1 - Math.pow(bgState.progress, 3);
    camera.position.x = 300 * cameraEase;
    camera.rotation.y = -0.55 * cameraEase;

    const positionsAttribute = geometry.attributes.position;
    const positionsArray = positionsAttribute.array;

    // 🌟 光の残像（線）の長さ。数字を大きくするとビヨ〜ンと長く伸びる！
    const trailLength = 14;

    for (let i = 0; i < particleCount; i++) {
      const headIndex = i * 6;
      const tailIndex = i * 6 + 3;

      // 現在の最終スピード ＝ ベーススピード × スクロール加速
      const currentSpeed = speeds[i] * bgState.speedMultiplier;

      // progress(0〜1) に応じて、進む方向を振り分ける
      const moveZ = currentSpeed * (1 - bgState.progress); // A: 奥から手前
      const moveY = currentSpeed * bgState.progress;       // B: 下から上

      // ① 頭（先頭）の座標を先に進める
      positionsArray[headIndex + 1] += moveY;
      positionsArray[headIndex + 2] += moveZ;

      // ② 尻尾の座標を、進んだ方向の「逆」に引き伸ばす（これが残像になる！）
      positionsArray[tailIndex] = positionsArray[headIndex];
      positionsArray[tailIndex + 1] = positionsArray[headIndex + 1] - (moveY * trailLength);
      positionsArray[tailIndex + 2] = positionsArray[headIndex + 2] - (moveZ * trailLength);

      // ③ 画面外(手前や上)に消えた光を、反対側(奥や下)に戻して無限ループさせる
      if (positionsArray[headIndex + 1] > 1000) {
        positionsArray[headIndex + 1] = -1000;
        positionsArray[tailIndex + 1] = -1000;
      }
      if (positionsArray[headIndex + 2] > 1000) {
        positionsArray[headIndex + 2] = -1000;
        positionsArray[tailIndex + 2] = -1000;
      }
    }

    // 座標データを書き換えた後は、Three.jsに「更新したよ！」と伝える必須処理
    positionsAttribute.needsUpdate = true;

    // MESSAGEセクションの終盤で、全体の透明度をス〜ッと下げて儚く消す演出
    if (bgState.progress > 0.8) {
      material.opacity = 0.8 - ((bgState.progress - 0.8) * 3);
    } else {
      material.opacity = 0.8;
    }

    // 最後にシーンとカメラをレンダリング（描画）
    renderer.render(scene, camera);
  };

  animate(); // アニメーション開始！

  // =========================================================
  // 6. リサイズ対応
  // =========================================================
  window.addEventListener('resize', () => {
    // 画面幅が変わった時、スマホ幅なら視野角を広げて見切れを防ぐ
    const currentIsSp = window.innerWidth <= 1023;
    camera.fov = currentIsSp ? 105 : 75;

    // カメラのレンズの形（縦横比）を新しい画面サイズに合わせる
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
});