<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";

const email = "congxiaobai1233@gmail.com";
const contactOpen = ref(false);
const coffeeOpen = ref(false);
/* 二维码图片就位前,@error 自动降级为占位提示;文件路径约定:
   public/images/wechat-qr.png(微信) / public/images/coffee-qr.png(收款码) */
const wechatOk = ref(true);
const coffeeOk = ref(true);
/* 动态绑定避免构建期资源解析;图片缺失时浏览器 404 → @error 降级为占位提示 */
const wechatSrc = "/images/wechat-qr.png";
const coffeeSrc = "/images/coffee-qr.png";

function closeAll() {
  contactOpen.value = false;
  coffeeOpen.value = false;
}
function toggleContact() {
  const next = !contactOpen.value;
  closeAll();
  contactOpen.value = next;
}
function toggleCoffee() {
  const next = !coffeeOpen.value;
  closeAll();
  coffeeOpen.value = next;
}
function onDocClick() {
  closeAll();
}
function onKey(e) {
  if (e.key === "Escape") closeAll();
}
onMounted(() => {
  document.addEventListener("click", onDocClick);
  document.addEventListener("keydown", onKey);
});
onBeforeUnmount(() => {
  document.removeEventListener("click", onDocClick);
  document.removeEventListener("keydown", onKey);
});
</script>

<template>
  <div class="nav-extras" @click.stop>
    <button
      class="ne-btn"
      :class="{ active: contactOpen }"
      @click="toggleContact"
    >
      联系作者
    </button>
    <Transition name="ne-fade">
      <div v-if="contactOpen" class="ne-pop">
        <div class="ne-row">
          <span class="ne-label">邮箱</span>
          <span class="ne-email">{{ email }}</span>
        </div>
        <div class="ne-qr">
          <img
            v-if="wechatOk"
            :src="wechatSrc"
            alt="作者微信二维码"
            @error="wechatOk = false"
          />
          <p v-else class="ne-hint">微信二维码整理中,可先通过邮箱联系</p>
        </div>
      </div>
    </Transition>

    <button
      class="ne-btn"
      :class="{ active: coffeeOpen }"
      @click="toggleCoffee"
    >
      请作者喝咖啡
    </button>
    <Transition name="ne-fade">
      <div v-if="coffeeOpen" class="ne-pop ne-pop-coffee">
        <div class="ne-qr">
          <img
            v-if="coffeeOk"
            :src="coffeeSrc"
            alt="赞赏收款码"
            @error="coffeeOk = false"
          />
          <p v-else class="ne-hint">收款码整理中,敬请期待</p>
        </div>
        <p class="ne-sub">如果这本小册帮到了你,请作者喝杯咖啡 ☕</p>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.nav-extras {
  display: flex;
  align-items: center;
  position: relative; /* 弹层定位锚点 */
}
.ne-btn {
  display: inline-flex;
  align-items: center;
  border: none;
  background: transparent;
  cursor: pointer;
  /* 关键:<button> 默认不继承页面字体,必须显式继承才能与导航链接一致 */
  font-family: inherit;
  font-size: 14px;
  font-weight: 500;
  line-height: var(--vp-nav-height, 56px);
  letter-spacing: 0.02em;
  padding: 0;
  margin: 0 10px;
  white-space: nowrap;
  color: var(--vp-c-text-1);
  transition: color 0.25s;
}
.ne-btn:hover,
.ne-btn.active {
  color: var(--vp-c-brand-1);
}
.ne-pop {
  position: absolute;
  top: calc(var(--vp-nav-height, 56px) - 8px);
  right: 0;
  z-index: 60;
  width: 300px;
  max-width: calc(100vw - 24px);
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-border);
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.12);
  padding: 14px 16px;
  cursor: default;
}
.ne-row {
  display: flex;
  align-items: center;
  gap: 8px;
}
.ne-label {
  flex-shrink: 0;
  font-size: 13px;
  color: var(--vp-c-text-2);
}
.ne-email {
  font-size: 13px;
  color: var(--vp-c-text-1);
  word-break: break-all;
}
.ne-qr {
  margin-top: 10px;
  /* flex 居中,不依赖 text-align(博客主题可能改写 img 的 display) */
  display: flex;
  justify-content: center;
}
.ne-qr img {
  display: block;
  max-width: 220px;
  max-height: 220px;
  width: auto;
  height: auto;
  object-fit: contain;
  border-radius: 8px;
  border: 1px solid var(--vp-c-border);
}
.ne-hint {
  margin: 6px 0 2px;
  font-size: 12.5px;
  color: var(--vp-c-text-3);
}
.ne-sub {
  margin: 10px 0 0;
  font-size: 12.5px;
  color: var(--vp-c-text-2);
  text-align: center;
}
.ne-fade-enter-active,
.ne-fade-leave-active {
  transition: opacity 0.18s ease, transform 0.18s ease;
}
.ne-fade-enter-from,
.ne-fade-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}
</style>
