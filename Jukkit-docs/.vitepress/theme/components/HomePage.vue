<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { BoltIcon, ClipboardIcon, CubeIcon } from '@heroicons/vue/24/solid'
import { Notyf } from 'notyf';
//@ts-ignore
import 'notyf/notyf.min.css';

const notyf = new Notyf();

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

const copyAllCommands = async () => {
  const commands = `git clone https://github.com/iYeXin/Jukkit.git\ncd Jukkit\nnpm install`;
  try {
    await navigator.clipboard.writeText(commands);
    notyf.success({
      message: '复制成功',
      duration: 5000,
      position: { x: 'center', y: 'top' },
      background: 'var(--vp-c-brand-1)',
    });
  } catch (err) {
    console.error('复制失败', err);
  }
};

const h1Prefix = ref('');
const h1Top = ref('');
const h1Bottom = ref('');
const pTextPart1 = ref('');
const pTextPart2 = ref('');
const isTypingFinished = ref(false);
const mouseX = ref(0);
const mouseY = ref(0);

const updateMousePosition = (e: MouseEvent) => {
  mouseX.value = e.clientX;
  mouseY.value = e.clientY;
};

const startTypingEffect = async () => {
  const prefixStr = "THE";
  const topStr = "JUKKIT";
  const bottomStr = "FRAMEWORK";
  const p1 = "Jukkit 框架可以让你使用 Javascript 或 Typescript 语言来开发基于 Bukkit 的 Minecraft Java 版服务器插件。产出标准 Jar 文件，";
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
  window.addEventListener('mousemove', updateMousePosition);

  setupScrollReveal();
  await startTypingEffect();
});

onUnmounted(() => {
  if (mediaQuery) mediaQuery.removeEventListener('change', handleSystemThemeChange);
  window.removeEventListener('storage', handleStorageChange);
  window.removeEventListener('mousemove', updateMousePosition);
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

    <div class="pointer-events-none absolute inset-0 z-0 transition-opacity duration-500" :style="{
      background: `radial-gradient(600px circle at ${mouseX}px ${mouseY}px, rgba(156, 77, 255,0.08), transparent 80%)`
    }"></div>
  </div>

  <div
    class="relative min-h-screen px-6 py-12 md:px-12 lg:px-24 flex flex-col items-start overflow-x-hidden selection:bg-blue-600/10!">

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
            Jukkit 框架可以让你使用 Javascript 或 Typescript 语言来开发基于 Bukkit 的 Minecraft Java 版服务器插件。
          </span>
          <span class="absolute top-0 left-0 w-full text-inherit pl-3!">
            {{ pTextPart1 }}
            <br>
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
    <section class="w-full overflow-hidden reveal marquee-section mt-20 py-4 select-none">
      <div class="transform -rotate-3 scale-110 py-10 transition-all duration-1000">
        <div class="w-full h-[1px] bg-linear-to-r from-transparent via-(--border-base) to-transparent mb-8"></div>
        <div class="flex overflow-hidden">
          <div class="animate-marquee flex flex-none whitespace-nowrap text-[3rem] font-black! leading-none">
            <div class="flex items-center px-4">
              🚀 高性能 ⚡ 无需 JAVA 开发环境 🛠️ 易于上手 💎 使用你最喜欢的 JS 和 TS！
            </div>
            <div class="flex items-center px-4">
              🚀 高性能 ⚡ 无需 JAVA 开发环境 🛠️ 易于上手 💎 使用你最喜欢的 JS 和 TS！
            </div>
          </div>
        </div>
        <div class="w-full h-[1px] bg-linear-to-r from-transparent via-(--border-base) to-transparent mt-8"></div>
      </div>
    </section>


    <!-- Bento Grid -->
    <section class="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 mt-20">
      <!-- 大卡片 -->
      <div
        class="md:col-span-2 md:row-span-2 group relative overflow-hidden rounded-[2.5rem] p-8 bg-(--bg-card) border border-(--border-card) backdrop-blur-md hover:scale-[1.02] transition-all duration-500 reveal">
        <div class="h-full flex flex-col justify-between">
          <div
            class="h-[5rem] w-[5rem] rounded-2xl bg-(--accent-blue) flex items-center justify-center text-white shadow-lg shadow-blue-500/30">
            <BoltIcon class="size-10"></BoltIcon>
          </div>
          <div>
            <h3 class="text-[clamp(1.5rem,4vw,3rem)]! font-bold text-(--text-primary) mt-5! mb-5!">高效率核心</h3>
            <p class="text-xl max-md:text-lg leading-relaxed text-(--text-secondary)">与原生 Java 插件近乎相同的性能</p>
          </div>
        </div>
      </div>

      <!-- 中卡片 -->
      <div
        class="md:col-span-2 group flex items-center justify-center rounded-[2.5rem] p-8 bg-(--bg-card) border border-(--border-card) backdrop-blur-md hover:scale-[1.02] transition-all duration-500 reveal">
        <div class="flex items-center gap-6">
          <div class="h-15 w-15 rounded-3xl bg-(--accent-purple) flex items-center justify-center text-white shrink-0">
            <CubeIcon class="size-8"></CubeIcon>
          </div>
          <h3 class="font-bolder text-(--text-primary) text-[2rem]!">模块化设计</h3>
        </div>
      </div>

      <!-- 小卡片 1 (反色卡片) -->
      <div
        class="group rounded-[2.5rem] flex flex-col p-8 h-[200px] justify-center bg-(--bg-card) border border-(--border-card) backdrop-blur-md hover:-rotate-3 transition-all duration-500 reveal">
        <h3 class="text-lg font-bold mb-2">易于上手</h3>
        <p class="text-sm opacity-70 m-0!">简介易懂的开发逻辑</p>
      </div>

      <!-- 小卡片 2 -->
      <div
        class="group rounded-[2.5rem] flex flex-col p-8 h-[200px] justify-center bg-(--bg-card) border border-(--border-card) backdrop-blur-md hover:-rotate-3 transition-all duration-500 reveal">
        <h3 class="text-lg font-bold text-(--text-primary) mb-2">低环境依赖</h3>
        <p class="text-sm text-(--text-secondary) m-0! ">只需 NPM 就完事了</p>
      </div>
    </section>

    <!-- 分隔线 -->
    <div class="w-full h-[1px] bg-gradient-to-r from-transparent via-(--border-base) to-transparent my-12">
    </div>

    <section class="w-full max-w-5xl mx-auto mt-5 mb-20 reveal">
      <div class="text-center mb-5">
        <h2
          class="text-[clamp(2rem,4vw,3rem)]! md:text-5xl font-black! text-(--text-primary) mb-8 border-0! m-0! p-0! leading-normal!">
          快速开始
        </h2>
        <p class="text-(--text-secondary) text-lg">只需几步，即可开启你的插件开发之旅</p>
      </div>

      <!-- Terminal Window -->
      <div
        class="relative group rounded-2xl overflow-hidden border border-(--border-card) bg-zinc-800/20 backdrop-blur-2xl shadow-2xl transition-all duration-500">
        <!-- Terminal Header -->
        <div class="flex items-center gap-2 px-4 py-3 bg-(--terminal-title) border-b border-white/10">
          <div class="flex gap-1.5">
            <div class="w-3 h-3 rounded-full bg-red-500"></div>
            <div class="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div class="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <div class="mx-auto text-xs text-(--text-primary) font-mono opacity-60">bash — jukkit-setup</div>
        </div>

        <!-- Terminal Body -->
        <div class="p-6 md:p-10 font-mono text-sm md:text-base leading-relaxed overflow-x-auto">
          <div class="flex gap-3 group/line">
            <span class="text-green-400 shrink-0">$</span>
            <code class="text-[#6872a9]! opacity-90">git clone https://github.com/iYeXin/Jukkit.git</code>
          </div>
          <div class="flex gap-3 group/line mt-3">
            <span class="text-green-400 shrink-0">$</span>
            <code class="text-[#6872a9]! opacity-90">cd Jukkit</code>
          </div>
          <div class="flex gap-3 group/line mt-3">
            <span class="text-green-400 shrink-0">$</span>
            <code class="text-[#6872a9]! opacity-90">npm install</code>
          </div>
        </div>

        <!-- Copy Button (Optional Decor) -->
        <div
          class="absolute top-14 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
          <button @click="copyAllCommands"
            class="py-1.5 grid place-items-center size-10 rounded-lg bg-purple-800 text-white text-xs font-bold! hover:bg-purple-900 transition-colors shadow-lg">
            <ClipboardIcon class="size-5"></ClipboardIcon>
          </button>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer
      class="w-full mt-auto pb-12 pt-12 border-t border-(--border-base) flex justify-between items-center text-(--text-secondary) font-medium reveal">
      <div>© {{ new Date().getFullYear() }} Jukkit Project.</div>
      <div class="flex gap-6 text-sm">
        <a href="#" class="hover:text-(--accent-link) transition-colors">Docs</a>
        <a href="https://github.com/iYeXin/Jukkit" target="_blank"
          class="hover:text-(--accent-link) transition-colors">GitHub</a>
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

  --terminal-title: var(--color-zinc-300)
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

  --terminal-title: var(--color-zinc-800)
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

h3 {
  margin-top: 0 !important;
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