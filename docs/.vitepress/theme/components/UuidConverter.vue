<script setup lang="ts">
import { ref, computed } from 'vue'

const playerName = ref('')
const inputUuid = ref('')
const resultMode = ref<'name' | 'uuid'>('name')

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
  if (resultMode.value === 'name' && playerName.value.trim()) {
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
    <div class="guide-header">
      <h2 class="guide-title">
        <span class="title-icon">🔧</span>
        UUID 转换器
      </h2>
      <p class="guide-desc">玩家名转离线 UUID 工具</p>
    </div>

    <div class="converter-card">
      <div class="input-group">
        <label>玩家名称</label>
        <input
          v-model="playerName"
          type="text"
          placeholder="输入玩家名..."
          class="tool-input"
        >
      </div>

      <div v-if="result" class="result-group">
        <label>离线 UUID</label>
        <div class="result-box">
          <code class="result-text">{{ result }}</code>
          <button class="copy-btn" @click="copyResult">复制</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.uuid-converter {
  max-width: 600px;
  margin: 0 auto;
}

.guide-header {
  text-align: center;
  margin-bottom: 32px;

  .guide-title {
    font-size: 28px;
    margin-bottom: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
  }

  .guide-desc {
    color: var(--fur-text-secondary);
  }
}

.converter-card {
  background: var(--fur-bg-elevated);
  border-radius: 16px;
  padding: 32px;
  border: 1px solid var(--fur-border-light);
}

.input-group {
  margin-bottom: 24px;

  label {
    display: block;
    margin-bottom: 8px;
    font-weight: 600;
  }
}

.tool-input {
  width: 100%;
  padding: 12px 16px;
  border: 2px solid var(--fur-border-light);
  border-radius: 10px;
  background: var(--fur-bg);
  font-size: 16px;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: var(--fur-primary);
    box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.1);
  }
}

.result-group {
  label {
    display: block;
    margin-bottom: 8px;
    font-weight: 600;
  }
}

.result-box {
  display: flex;
  align-items: center;
  gap: 12px;
  background: var(--fur-bg);
  border: 1px solid var(--fur-border-light);
  border-radius: 10px;
  padding: 12px 16px;
}

.result-text {
  flex: 1;
  font-family: 'Fira Code', monospace;
  font-size: 14px;
  color: var(--fur-primary);
  word-break: break-all;
}

.copy-btn {
  padding: 6px 12px;
  background: var(--fur-gradient-primary);
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 13px;
  cursor: pointer;
  white-space: nowrap;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }
}
</style>
