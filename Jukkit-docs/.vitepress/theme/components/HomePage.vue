<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { BoldIcon, BoltIcon } from '@heroicons/vue/24/solid'

// --- 主题逻辑 ---
type Theme = 'auto' | 'dark' | 'light';
const currentTheme = ref<Theme>('auto');
const themeKey = 'vitepress-theme-appearance';

// 获取存储的主题
const getStoredTheme = (): Theme => {
  const stored = localStorage.getItem(themeKey);
  if (stored === 'dark' || stored === 'light' || stored === 'auto') {
    return stored;
  }
  return 'auto';
};

// 应用主题到 DOM
const applyThemeToDOM = (theme: Theme) => {
  const html = document.documentElement;
  const isDark = theme === 'dark' ||
    (theme === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches);

  if (isDark) {
    html.classList.add('dark');
  } else {
    html.classList.remove('dark');
  }

  currentTheme.value = theme;
};

// 设置主题
const setTheme = (theme: Theme) => {
  localStorage.setItem(themeKey, theme);
  applyThemeToDOM(theme);
};

// 监听系统主题变化
const handleSystemThemeChange = (e: MediaQueryListEvent) => {
  if (currentTheme.value === 'auto') {
    applyThemeToDOM('auto');
  }
};

// 监听其他标签页的主题变化
const handleStorageChange = (event: StorageEvent) => {
  if (event.key === themeKey && event.newValue) {
    const newTheme = event.newValue as Theme;
    applyThemeToDOM(newTheme);
  }
};

let mediaQuery: MediaQueryList | null = null;

// --- 滚动显现逻辑 ---
let observer: IntersectionObserver | null = null;

const setupScrollReveal = () => {
  observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  const revealElements = document.querySelectorAll('.reveal');
  revealElements.forEach((el) => observer?.observe(el));
};

const h1Prefix = ref('');
const h1Top = ref('');
const h1Bottom = ref('');
const pTextPart1 = ref('');
const pTextPart2 = ref('');
const isTypingFinished = ref(false);

const startTypingEffect = async () => {
  const prefixStr = "THE";
  const topStr = "JUKKIT";
  const bottomStr = "FRAMEWORK";
  const p1 = "Jukkit 框架可以让你使用 Javascript 或 Typescript 语言来开发基于 Bukkit 的 Minecraft Java 版服务器插件。";
  const p2 = "甚至无需任何 Java 开发环境！";

  for (let i = 0; i <= prefixStr.length; i++) {
    h1Prefix.value = prefixStr.slice(0, i);
    await new Promise(r => setTimeout(r, 80));
  }

  for (let i = 0; i <= topStr.length; i++) {
    h1Top.value = topStr.slice(0, i);
    await new Promise(r => setTimeout(r, 80));
  }

  for (let i = 0; i <= bottomStr.length; i++) {
    h1Bottom.value = bottomStr.slice(0, i);
    await new Promise(r => setTimeout(r, 80));
  }
  await new Promise(r => setTimeout(r, 400));

  for (let i = 0; i <= p1.length; i++) {
    pTextPart1.value = p1.slice(0, i);
    await new Promise(r => setTimeout(r, 30));
  }

  for (let i = 0; i <= p2.length; i++) {
    pTextPart2.value = p2.slice(0, i);
    await new Promise(r => setTimeout(r, 30));
  }

  isTypingFinished.value = true;
};

const scrollToNext = () => {
  const nextSection = document.querySelector('.marquee-section');
  if (nextSection) {
    nextSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

onMounted(async () => {
  const savedTheme = getStoredTheme();
  setTheme(savedTheme);
  mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  mediaQuery.addEventListener('change', handleSystemThemeChange);
  window.addEventListener('storage', handleStorageChange);

  setupScrollReveal();
  await startTypingEffect();
});

onUnmounted(() => {
  if (mediaQuery) mediaQuery.removeEventListener('change', handleSystemThemeChange);
  window.removeEventListener('storage', handleStorageChange);
  if (observer) observer.disconnect();
});
</script>

<template>
  <!-- 背景层 -->
  <div class="fixed inset-0 -z-10 overflow-hidden bg-(--bg-body) transition-colors duration-1000">
    <!-- Blob 1 -->
    <div
      class="absolute -top-[10%] -left-[10%] h-[60%] w-[60%] rounded-full bg-(--bg-blob-1) blur-[120px] animate-blob">
    </div>
    <!-- Blob 2 -->
    <div
      class="absolute top-[20%] -right-[int] h-[50%] w-[50%] rounded-full bg-(--bg-blob-2) blur-[120px] animate-blob animation-delay-2000">
    </div>
    <div
      class="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]">
    </div>
  </div>

  <div class="relative min-h-screen px-6 py-12 md:px-12 lg:px-24 flex flex-col items-start overflow-x-hidden">

    <!-- Hero Section -->
    <section class="h-[calc(100vh-250px)] w-full flex flex-col justify-center relative reveal">
      <div class="w-full max-w-7xl">
        <h1 class="relative text-[clamp(3.5rem,10vw,10rem)]! font-black! leading-[0.85]! tracking-tight! mb-6!">
          <!-- 幽灵占位层 -->
          <span class="invisible block">
            <span class="text-[clamp(2rem,5vw,3rem)]! block opacity-50!">THE</span>
            <span class="text-[clamp(4rem,13vw,13rem)]! block leading-[0.8]!">JUKKIT</span>
            <span class="text-[clamp(2rem,6vw,4rem)]! block leading-[1]! pl-12!">FRAMEWORK</span>
          </span>

          <!-- 实际打字层 -->
          <span
            class="absolute top-0 left-0 w-full pr-[0.05em] text-transparent! bg-clip-text! bg-gradient-to-r! from-(--grad-start)! via-(--grad-mid)! to-(--grad-end)!">
            <span class="text-[clamp(2rem,8vw,5rem)]! block tracking-tight! pl-5! text-(--text-primary)">{{
              h1Prefix }}</span>
            <span class="text-[clamp(4rem,13vw,13rem)]! block leading-[0.8]! mt-3">
              {{ h1Top }}
            </span>
            <span
              class="text-[clamp(2rem,6vw,4rem)]! block leading-[1]! text-(--text-primary)! pl-5! tracking-tight! mt-3">
              {{ h1Bottom }}
            </span>
          </span>
        </h1>
      </div>

      <!-- P 标签部分 -->
      <div class="w-full max-w-2xl mt-12">
        <p class="relative text-lg md:text-xl font-medium leading-relaxed text-(--text-secondary)">
          <span class="invisible block pl-5!">
            Jukkit is a high-performance plugin ecosystem designed for modern web developers. Built with <span
              class="font-bold text-(--text-primary)">speed</span> and <span
              class="font-bold text-(--text-primary)">scalability</span>.
          </span>
          <span class="absolute top-0 left-0 w-full text-inherit pl-3!">
            {{ pTextPart1 }}
            <span class="font-bold text-(--text-primary)">{{ pTextPart2 }}</span>
          </span>
        </p>
      </div>
    </section>

    <div class="h-24 w-full flex items-center justify-center overflow-hidden">
      <button v-if="isTypingFinished" @click="scrollToNext"
        class="group flex flex-col items-center gap-3 transition-all duration-700 animate-fade-in-up">
        <span
          class="text-[15px] uppercase tracking-[0.4em] text-(--text-muted) opacity-0 group-hover:opacity-100 transition-all duration-500">
          向下探索
        </span>

        <div class="w-5 h-8 border-2 border-(--border-muted) rounded-full flex justify-center p-1">
          <div class="w-1 h-1.5 bg-(--text-muted) rounded-full animate-bounce"></div>
        </div>
      </button>
    </div>

    <!-- 跑马灯 Section -->
    <section class="w-full overflow-hidden reveal marquee-section mt-20 py-4">

      <!-- 内层容器：专门负责旋转。通过 scale-110 和 py-10 确保旋转后的角不会被切断 -->
      <div class="transform -rotate-3 scale-110 py-10 transition-all duration-1000 hover:rotate-0 hover:scale-100">

        <!-- 分隔线 1 -->
        <div class="w-full h-[1px] bg-linear-to-r from-transparent via-(--border-base) to-transparent mb-8"></div>

        <!-- 滚动轨道层 -->
        <div class="flex overflow-hidden">
          <!-- 动画层：确保 flex-none 防止挤压，leading-none 防止行高过大 -->
          <div class="animate-marquee flex flex-none whitespace-nowrap text-[3rem] font-black leading-none">

            <!-- 第一个文本块：px-4 保证左右间距对称 -->
            <div class="flex items-center px-4">
              🚀 高性能 ⚡ 无需 JAVA 开发环境 🛠️ 易于上手 💎 使用你最喜欢的 JS 和 TS！
            </div>

            <!-- 第二个文本块：必须与第一个完全一致 -->
            <div class="flex items-center px-4">
              🚀 高性能 ⚡ 无需 JAVA 开发环境 🛠️ 易于上手 💎 使用你最喜欢的 JS 和 TS！
            </div>

          </div>
        </div>

        <!-- 分隔线 2 -->
        <div class="w-full h-[1px] bg-linear-to-r from-transparent via-(--border-base) to-transparent mt-8"></div>

      </div>
    </section>


    <!-- Bento Grid -->
    <section class="w-full max-w-7xl grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 mt-20">
      <!-- 大卡片 -->
      <div
        class="md:col-span-2 md:row-span-2 group relative overflow-hidden rounded-[2.5rem] p-8 bg-(--bg-card) border border-(--border-card) backdrop-blur-md hover:border-(--accent-blue) transition-all duration-500 reveal">
        <div class="h-full flex flex-col justify-between">
          <div
            class="h-[5rem] w-[5rem] rounded-2xl bg-(--accent-blue) flex items-center justify-center text-white shadow-lg shadow-blue-500/30">
            <BoltIcon class="size-10"></BoltIcon>
          </div>
          <div>
            <h3 class="text-3xl font-bold text-(--text-primary) mb-3">Ultra Fast Core</h3>
            <p class="text-lg leading-relaxed text-(--text-secondary)">Engineered for maximum throughput with
              minimal latency overhead.</p>
          </div>
        </div>
      </div>

      <!-- 中卡片 -->
      <div
        class="md:col-span-2 group rounded-[2.5rem] p-8 bg-(--bg-card) border border-(--border-card) backdrop-blur-md hover:scale-[1.02] transition-all duration-500 reveal">
        <div class="flex items-center gap-6">
          <div class="h-12 w-12 rounded-xl bg-(--accent-purple) flex items-center justify-center text-white shrink-0">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 01-2-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <h3 class="text-xl font-bold text-(--text-primary)">Modular Architecture</h3>
        </div>
      </div>

      <!-- 小卡片 1 (反色卡片) -->
      <div
        class="group rounded-[2.5rem] p-8 bg-(--bg-card-alt) text-(--text-alt) transition-all duration-500 hover:rotate-3 reveal">
        <h3 class="text-lg font-bold mb-2">Scalable</h3>
        <p class="text-sm opacity-70">Grow effortlessly.</p>
      </div>

      <!-- 小卡片 2 -->
      <div
        class="group rounded-[2.5rem] p-8 bg-(--bg-card) border border-(--border-card) backdrop-blur-md hover:-rotate-3 transition-all duration-500 reveal">
        <h3 class="text-lg font-bold text-(--text-primary) mb-2">Secure</h3>
        <p class="text-sm text-(--text-secondary)">Enterprise grade.</p>
      </div>
    </section>

    <!-- 分隔线 -->
    <div class="w-full h-[1px] bg-gradient-to-r from-transparent via-(--border-base) to-transparent my-12">
    </div>

    <!-- Footer -->
    <footer
      class="w-full mt-auto pb-12 pt-12 border-t border-(--border-base) flex justify-between items-center text-(--text-secondary) font-medium reveal">
      <div>© {{ new Date().getFullYear() }} Jukkit Project.</div>
      <div class="flex gap-6 text-sm">
        <a href="#" class="hover:text-(--accent-link) transition-colors">Docs</a>
        <a href="#" class="hover:text-(--accent-link) transition-colors">GitHub</a>
      </div>
    </footer>
  </div>
</template>

<style lang="css">
:root {
  /* 1. 背景色 */
  --bg-body: var(--color-slate-50);
  --bg-card: color-mix(in srgb, var(--color-white), transparent 60%);
  --bg-card-alt: var(--color-zinc-900);

  /* Blob 背景 */
  --bg-blob-1: color-mix(in srgb, var(--color-blue-500), transparent 80%);
  --bg-blob-2: color-mix(in srgb, var(--color-purple-500), transparent 80%);

  /* 2. 文本色 */
  --text-primary: var(--color-black);
  --text-secondary: var(--color-zinc-600);
  --text-muted: var(--color-zinc-400);
  --text-alt: var(--color-white);

  /* 3. 边框色 */
  --border-base: var(--color-zinc-200);
  --border-muted: var(--color-zinc-300);
  --border-card: color-mix(in srgb, var(--color-white), transparent 50%);

  /* 4. 强调色 */
  --accent-blue: var(--color-blue-600);
  --accent-purple: var(--color-purple-600);
  --accent-link: var(--color-blue-500);

  /* 5. 渐变色 */
  --grad-start: var(--color-blue-600);
  --grad-mid: var(--color-purple-500);
  --grad-end: var(--color-indigo-400);
}

.dark {
  /* 1. 背景色 - Dark Mode */
  --bg-body: var(--color-zinc-950);
  --bg-card: color-mix(in srgb, var(--color-zinc-900), transparent 60%);
  --bg-card-alt: var(--color-white);

  /* Blob 背景 - Dark Mode */
  --bg-blob-1: color-mix(in srgb, var(--color-blue-500), transparent 80%);
  --bg-blob-2: color-mix(in srgb, var(--color-purple-500), transparent 80%);

  /* 2. 文本色 - Dark Mode */
  --text-primary: var(--color-white);
  --text-secondary: var(--color-zinc-400);
  --text-muted: var(--color-zinc-600);
  --text-alt: var(--color-black);

  /* 3. 边框色 - Dark Mode */
  --border-base: var(--color-zinc-800);
  --border-muted: var(--color-zinc-700);
  --border-card: color-mix(in srgb, var(--color-white), transparent 90%);

  /* 强调色和渐变通常在暗色模式下保持不变 */
}
</style>

<style lang="scss" scoped>
.reveal {
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s cubic-bezier(0.22, 1, 0.36, 1);
  will-change: transform, opacity;

  &.active {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fadeInUp 1s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}

@keyframes blob {
  0% {
    transform: translate(0px, 0px) scale(1);
  }

  33% {
    transform: translate(30px, -50px) scale(1.1);
  }

  66% {
    transform: translate(-20px, 20px) scale(0.9);
  }

  100% {
    transform: translate(0px, 0px) scale(1);
  }
}

@keyframes marquee {
  0% {
    transform: translateX(0%);
  }

  100% {
    /* 这里的 -50% 是关键：因为轨道内有两个完全一样的 div，
       移动一半宽度后，视觉上正好衔接到了第二个 div 的开头 */
    transform: translateX(-50%);
  }
}

.animate-marquee {
  /* 移除原本可能存在的 linear 以外的变换，确保匀速 */
  animation: marquee 20s linear infinite;
  /* 增加时间可以缓解视觉上的快速闪烁感 */
}

.animate-blob {
  animation: blob 7s infinite alternate;
}

.animation-delay-2000 {
  animation-delay: 2s;
}

html {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  scroll-behavior: smooth;
}
</style>