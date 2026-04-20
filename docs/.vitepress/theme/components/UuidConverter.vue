<script setup lang="ts">
import { ref, computed } from 'vue'

const playerName = ref('')

const nameToOfflineUuid = (name: string): string => {
  function md5(str: string): string {
    function rotateLeft(n: number, s: number): number {
      return (n << s) | (n >>> (32 - s))
    }
    function cmn(q: number, a: number, b: number, x: number, s: number, t: number): number {
      return rotateLeft(a + q + x + t, s) + b
    }
    function ff(a: number, b: number, c: number, d: number, x: number, s: number, t: number): number {
      return cmn((b & c) | ((~b) & d), a, b, x, s, t)
    }
    function gg(a: number, b: number, c: number, d: number, x: number, s: number, t: number): number {
      return cmn((b & d) | (c & (~d)), a, b, x, s, t)
    }
    function hh(a: number, b: number, c: number, d: number, x: number, s: number, t: number): number {
      return cmn(b ^ c ^ d, a, b, x, s, t)
    }
    function ii(a: number, b: number, c: number, d: number, x: number, s: number, t: number): number {
      return cmn(c ^ (b | (~d)), a, b, x, s, t)
    }

    const utf8 = unescape(encodeURIComponent(str))
    const words: number[] = []
    for (let i = 0; i < utf8.length; i++) {
      words[i >>> 2] |= utf8.charCodeAt(i) << ((i % 4) * 8)
    }
    const oldLen = utf8.length * 8
    words[oldLen >>> 5] |= 0x80 << ((oldLen) % 32)
    words[(((oldLen + 64) >>> 9) << 4) + 14] = oldLen

    let a = 1732584193
    let b = -271733879
    let c = -1732584194
    let d = 271733878

    for (let i = 0; i < words.length; i += 16) {
      const olda = a
      const oldb = b
      const oldc = c
      const oldd = d

      a = ff(a, b, c, d, words[i + 0], 7, -680876936)
      d = ff(d, a, b, c, words[i + 1], 12, -389564586)
      c = ff(c, d, a, b, words[i + 2], 17, 606105819)
      b = ff(b, c, d, a, words[i + 3], 22, -1044525330)
      a = ff(a, b, c, d, words[i + 4], 7, -176418897)
      d = ff(d, a, b, c, words[i + 5], 12, 1200080426)
      c = ff(c, d, a, b, words[i + 6], 17, -1473231341)
      b = ff(b, c, d, a, words[i + 7], 22, -45705983)
      a = ff(a, b, c, d, words[i + 8], 7, 1770035416)
      d = ff(d, a, b, c, words[i + 9], 12, -1958414417)
      c = ff(c, d, a, b, words[i + 10], 17, -42063)
      b = ff(b, c, d, a, words[i + 11], 22, -1990404162)
      a = ff(a, b, c, d, words[i + 12], 7, 1804603682)
      d = ff(d, a, b, c, words[i + 13], 12, -40341101)
      c = ff(c, d, a, b, words[i + 14], 17, -1502002290)
      b = ff(b, c, d, a, words[i + 15], 22, 1236535329)

      a = gg(a, b, c, d, words[i + 1], 5, -165796510)
      d = gg(d, a, b, c, words[i + 6], 9, -1069501632)
      c = gg(c, d, a, b, words[i + 11], 14, 643717713)
      b = gg(b, c, d, a, words[i + 0], 20, -373897302)
      a = gg(a, b, c, d, words[i + 5], 5, -701558691)
      d = gg(d, a, b, c, words[i + 10], 9, 38016083)
      c = gg(c, d, a, b, words[i + 15], 14, -660478335)
      b = gg(b, c, d, a, words[i + 4], 20, -405537848)
      a = gg(a, b, c, d, words[i + 9], 5, 568446438)
      d = gg(d, a, b, c, words[i + 14], 9, -1019803690)
      c = gg(c, d, a, b, words[i + 3], 14, -187363961)
      b = gg(b, c, d, a, words[i + 8], 20, 1163531501)
      a = gg(a, b, c, d, words[i + 13], 5, -1444681467)
      d = gg(d, a, b, c, words[i + 2], 9, -51403784)
      c = gg(c, d, a, b, words[i + 7], 14, 1735328473)
      b = gg(b, c, d, a, words[i + 12], 20, -1926607734)

      a = hh(a, b, c, d, words[i + 5], 4, -378558)
      d = hh(d, a, b, c, words[i + 8], 11, -2022574463)
      c = hh(c, d, a, b, words[i + 11], 16, 1839030562)
      b = hh(b, c, d, a, words[i + 14], 23, -35309556)
      a = hh(a, b, c, d, words[i + 1], 4, -1530992060)
      d = hh(d, a, b, c, words[i + 4], 11, 1272893353)
      c = hh(c, d, a, b, words[i + 7], 16, -155497632)
      b = hh(b, c, d, a, words[i + 10], 23, -1094730640)
      a = hh(a, b, c, d, words[i + 13], 4, 681279174)
      d = hh(d, a, b, c, words[i + 0], 11, -358537222)
      c = hh(c, d, a, b, words[i + 3], 16, -722521979)
      b = hh(b, c, d, a, words[i + 6], 23, 76029189)
      a = hh(a, b, c, d, words[i + 9], 4, -640364487)
      d = hh(d, a, b, c, words[i + 12], 11, -421815835)
      c = hh(c, d, a, b, words[i + 15], 16, 530742520)
      b = hh(b, c, d, a, words[i + 2], 23, -995338651)

      a = ii(a, b, c, d, words[i + 0], 6, -198630844)
      d = ii(d, a, b, c, words[i + 7], 10, 1126891415)
      c = ii(c, d, a, b, words[i + 14], 15, -1416354905)
      b = ii(b, c, d, a, words[i + 5], 21, -57434055)
      a = ii(a, b, c, d, words[i + 12], 6, 1700485571)
      d = ii(d, a, b, c, words[i + 3], 10, -1894986606)
      c = ii(c, d, a, b, words[i + 10], 15, -1051523)
      b = ii(b, c, d, a, words[i + 1], 21, -2054922799)
      a = ii(a, b, c, d, words[i + 8], 6, 1873313359)
      d = ii(d, a, b, c, words[i + 15], 10, -30611744)
      c = ii(c, d, a, b, words[i + 6], 15, -1560198380)
      b = ii(b, c, d, a, words[i + 13], 21, 1309151649)
      a = ii(a, b, c, d, words[i + 4], 6, -145523070)
      d = ii(d, a, b, c, words[i + 11], 10, -1120210379)
      c = ii(c, d, a, b, words[i + 2], 15, 718787259)
      b = ii(b, c, d, a, words[i + 9], 21, -343485551)

      a = a + olda | 0
      b = b + oldb | 0
      c = c + oldc | 0
      d = d + oldd | 0
    }

    const hex = (n: number) => {
      let result = ''
      for (let i = 0; i < 4; i++) {
        result += ((n >> (i * 8 + 4)) & 15).toString(16) + ((n >> (i * 8)) & 15).toString(16)
      }
      return result
    }

    return hex(a) + hex(b) + hex(c) + hex(d)
  }

  const hash = md5('OfflinePlayer:' + name)
  const bytes = new Uint8Array(16)
  for (let i = 0; i < 16; i++) {
    bytes[i] = parseInt(hash.substr(i * 2, 2), 16)
  }
  bytes[8] = bytes[8] & 0x7f
  let result = ''
  for (let i = 0; i < 16; i++) {
    result += bytes[i].toString(16).padStart(2, '0')
  }
  return result.substr(0, 8) + '-' + result.substr(8, 4) + '-' + result.substr(12, 4) + '-' + result.substr(16, 4) + '-' + result.substr(20)
}

const result = computed(() => {
  if (playerName.value.trim()) {
    return nameToOfflineUuid(playerName.value.trim())
  }
  return ''
})

const copyResult = () => {
  navigator.clipboard.writeText(result.value)
}
</script>

<template>
  <div class="uuid-converter">
    <div class="component-header">
      <span class="header-icon">🆔</span>
      <span class="header-text">UUID 转换器</span>
    </div>

    <div class="component-content">
      <div class="converter-section">
        <div class="section-title">
          <span class="title-icon">👤</span>
          <span>输入玩家名称</span>
        </div>

        <div class="input-grid cols-1">
          <div class="input-item">
            <div class="input-label">名</div>
            <input
              v-model="playerName"
              type="text"
              placeholder="输入玩家名称..."
            >
          </div>
        </div>

        <div class="divider">
          <span class="divider-icon">⚡</span>
        </div>

        <div class="section-title">
          <span class="title-icon">🔑</span>
          <span>离线 UUID</span>
        </div>

        <div v-if="result" class="result-display">
          <div class="result-box highlight">
            <div class="result-icon">✅</div>
            <div class="result-value">{{ result }}</div>
            <button class="copy-btn" @click="copyResult">📋</button>
          </div>
        </div>

        <div v-else class="empty-hint">
          <span class="hint-icon">💡</span>
          <span>输入玩家名后自动生成离线 UUID</span>
        </div>
      </div>

      <div class="tips-section">
        <div class="tips-header">
          <span class="tips-icon">ℹ️</span>
          <span class="tips-title">使用说明</span>
        </div>
        <div class="tips-list">
          <div class="tip-item">
            <span class="tip-num">1</span>
            <span class="tip-text">本工具计算的是离线模式 UUID，用于非正版服务器</span>
          </div>
          <div class="tip-item">
            <span class="tip-num">2</span>
            <span class="tip-text">正版 UUID 需要通过 Mojang API 查询</span>
          </div>
          <div class="tip-item">
            <span class="tip-num">3</span>
            <span class="tip-text">UUID 可用于修改玩家数据文件、设置权限等</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.uuid-converter {
  max-width: 720px;
  margin: 0 auto;
  background: var(--fur-bg-card);
  border: 4px solid var(--fur-border);
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;

  &:hover {
    border-color: var(--fur-primary);
    box-shadow: 0 12px 48px rgba(139, 92, 246, 0.25);
  }
}

.component-header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 28px 32px;
  background: linear-gradient(135deg, #8b5cf6, #3b82f6);
  color: white;

  .header-icon {
    font-size: 40px;
  }

  .header-text {
    font-size: 28px;
    font-weight: 900;
    letter-spacing: 2px;
  }
}

.component-content {
  padding: 32px;
}

.converter-section {
  background: var(--fur-bg-muted);
  border: 4px solid var(--fur-border);
  border-radius: 20px;
  padding: 24px;
  margin-bottom: 24px;
}

.section-title {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;

  .title-icon {
    font-size: 28px;
  }

  span:nth-child(2) {
    font-size: 18px;
    font-weight: 800;
    color: var(--fur-text);
  }
}

.input-grid {
  display: grid;
  gap: 16px;
  margin-bottom: 24px;

  &.cols-1 {
    grid-template-columns: 1fr;
    max-width: 400px;
    margin-left: auto;
    margin-right: auto;
  }
}

.input-item {
  position: relative;
  min-width: 0;

  .input-label {
    position: absolute;
    left: -4px;
    top: -4px;
    width: 52px;
    height: 52px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #8b5cf6, #3b82f6);
    border-radius: 14px 0 14px 0;
    font-size: 18px;
    font-weight: 900;
    color: white;
    z-index: 2;
    box-shadow: 0 4px 12px rgba(139, 92, 246, 0.4);
  }

  input {
    width: 100%;
    box-sizing: border-box;
    padding: 20px 16px 20px 68px;
    border: 4px solid var(--fur-border);
    border-radius: 16px;
    background: var(--fur-bg-card);
    color: var(--fur-text);
    font-size: 20px;
    font-weight: 700;
    text-align: left;
    transition: all 0.3s ease;

    &:focus {
      outline: none;
      border-color: var(--fur-primary);
      box-shadow: 0 8px 24px rgba(139, 92, 246, 0.25);
      transform: translateY(-2px);
    }

    &::placeholder {
      font-weight: 500;
      opacity: 0.5;
    }
  }
}

.divider {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  margin: 8px 0 24px 0;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    height: 4px;
    background: var(--fur-border);
    border-radius: 2px;
  }

  .divider-icon {
    background: var(--fur-bg-muted);
    padding: 0 12px;
    font-size: 20px;
    position: relative;
    z-index: 1;
  }
}

.result-display {
  max-width: 520px;
  margin: 0 auto;
}

.result-box {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 20px 24px;
  background: var(--fur-bg-card);
  border-radius: 16px;
  border: 4px solid var(--fur-border);
  transition: all 0.2s ease;
  min-width: 0;

  &.highlight {
    background: linear-gradient(135deg, rgba(139, 92, 246, 0.15), rgba(59, 130, 246, 0.15));
    border-color: var(--fur-primary);
  }

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 8px 24px rgba(139, 92, 246, 0.2);
  }

  .result-icon {
    flex-shrink: 0;
    font-size: 28px;
  }

  .result-value {
    flex: 1;
    min-width: 0;
    font-size: 17px;
    font-weight: 800;
    color: var(--fur-primary);
    font-family: 'Fira Code', monospace;
    word-break: break-all;
    line-height: 1.6;
  }

  .copy-btn {
    flex-shrink: 0;
    padding: 10px 14px;
    border: none;
    border-radius: 12px;
    background: linear-gradient(135deg, #8b5cf6, #3b82f6);
    cursor: pointer;
    font-size: 18px;
    transition: all 0.2s;
    color: white;
    box-shadow: 0 4px 12px rgba(139, 92, 246, 0.3);

    &:hover {
      transform: scale(1.05) translateY(-2px);
      box-shadow: 0 8px 20px rgba(139, 92, 246, 0.4);
    }

    &:active {
      transform: scale(0.95);
    }
  }
}

.empty-hint {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 24px;
  background: var(--fur-bg-card);
  border-radius: 16px;
  border: 3px dashed var(--fur-border);
  max-width: 400px;
  margin: 0 auto;

  .hint-icon {
    font-size: 24px;
  }

  span:nth-child(2) {
    font-size: 15px;
    font-weight: 600;
    color: var(--fur-text-secondary);
  }
}

.tips-section {
  background: var(--fur-bg-muted);
  border: 4px solid var(--fur-border);
  border-radius: 20px;
  overflow: hidden;
}

.tips-header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 18px 24px;
  background: linear-gradient(135deg, rgba(236, 72, 153, 0.1), rgba(139, 92, 246, 0.1));
  border-bottom: 4px solid var(--fur-border);

  .tips-icon {
    font-size: 26px;
  }

  .tips-title {
    font-size: 17px;
    font-weight: 800;
    color: var(--fur-text);
  }
}

.tips-list {
  padding: 20px 24px;
}

.tip-item {
  display: flex;
  gap: 16px;
  padding: 12px 0;
  align-items: flex-start;

  &:not(:last-child) {
    border-bottom: 2px solid var(--fur-border);
  }

  .tip-num {
    flex-shrink: 0;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #8b5cf6, #3b82f6);
    border-radius: 50%;
    color: white;
    font-size: 13px;
    font-weight: 800;
    margin-top: 2px;
  }

  .tip-text {
    flex: 1;
    min-width: 0;
    font-size: 14px;
    color: var(--fur-text-secondary);
    line-height: 1.7;
    font-weight: 600;
    word-break: break-word;
  }
}

@media (max-width: 768px) {
  .component-header {
    padding: 20px 24px;

    .header-icon {
      font-size: 32px;
    }

    .header-text {
      font-size: 22px;
    }
  }

  .component-content {
    padding: 24px 20px;
  }

  .converter-section {
    padding: 20px;
  }

  .result-box {
    flex-wrap: wrap;

    .result-value {
      width: 100%;
      order: 3;
      text-align: center;
    }
  }
}

@media (max-width: 560px) {
  .component-content {
    padding: 20px 16px;
  }

  .converter-section {
    padding: 16px;
  }

  .input-grid.cols-1 {
    max-width: 100%;
  }

  .result-display {
    max-width: 100%;
  }

  .empty-hint {
    flex-direction: column;
    text-align: center;
  }
}
</style>
