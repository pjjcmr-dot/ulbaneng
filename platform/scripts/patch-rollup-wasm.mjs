// Windows Application Control 정책이 OneDrive 내 네이티브 .node 바이너리 실행을
// 차단하는 문제를 우회하기 위해, rollup의 native.js를 @rollup/wasm-node의 WASM
// 버전으로 자동 교체한다. npm install 후 postinstall 훅에서 실행된다.
//
// 필요 조건: devDependencies에 @rollup/wasm-node 포함.
// 효과: rollup이 네이티브 .node 대신 WASM 바인딩을 로드하여 dev 서버 기동 가능.

import { copyFileSync, cpSync, existsSync, rmSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, '..');
const rollupDist = join(projectRoot, 'node_modules', 'rollup', 'dist');
const wasmDist = join(projectRoot, 'node_modules', '@rollup', 'wasm-node', 'dist');

if (!existsSync(rollupDist) || !existsSync(wasmDist)) {
  console.log('[patch-rollup-wasm] rollup 또는 @rollup/wasm-node 미설치 — 스킵');
  process.exit(0);
}

try {
  // 1) native.js 교체 (.node → WASM 바인딩 로드)
  copyFileSync(join(wasmDist, 'native.js'), join(rollupDist, 'native.js'));

  // 2) wasm-node/ 폴더 복사 (bindings_wasm.js + .wasm)
  const targetWasmDir = join(rollupDist, 'wasm-node');
  if (existsSync(targetWasmDir)) rmSync(targetWasmDir, { recursive: true, force: true });
  cpSync(join(wasmDist, 'wasm-node'), targetWasmDir, { recursive: true });

  console.log('[patch-rollup-wasm] rollup을 WASM 모드로 패치 완료');
} catch (error) {
  console.error('[patch-rollup-wasm] 패치 실패:', error.message);
  process.exit(1);
}
