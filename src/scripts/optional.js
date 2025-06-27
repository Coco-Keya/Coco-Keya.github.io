// 使用全局配置，变量名为__workspace
const workspaceConfig = typeof window !== 'undefined' 
  ? window.__workspace || { theme: { primaryColor: '#3498db' } }
  : { theme: { primaryColor: '#3498db' } };

/**
 * 打字机动画效果模块
 * @module Typewriter
 * @description 提供文字逐个显示的打字机动画效果
 * 
 * @example
 * // HTML中使用
 * <div data-typewriter data-speed="60" data-delay="500">要显示的文字</div>
 * 
 * // JavaScript中使用
 * typewriter.animate(element, speed, delay, showCursor, showBlink);
 */

// 打字机动画效果
function typeWriter(element, speed = 60, delay = 0, showCursor = true, showBlink = false) {
  const originalText = element.textContent;
  let currentText = '';
  let i = 0;
  
  // 保存原始样式以便恢复
  const originalStyles = {
    overflow: element.style.overflow,
    borderRight: element.style.borderRight,
    whiteSpace: element.style.whiteSpace
  };
  
  // 初始化样式
  if (showCursor) {
    element.style.overflow = 'hidden';
    element.style.borderRight = `3px solid ${workspaceConfig.theme.primaryColor}`;
    element.style.whiteSpace = 'nowrap';
  }
  
  // 清空元素内容
  element.textContent = '';
  
  // 延迟执行
  setTimeout(() => {
    const timer = setInterval(() => {
      if (i < originalText.length) {
        currentText += originalText.charAt(i);
        element.textContent = currentText;
        i++;
      } else {
        clearInterval(timer);
        // 动画完成移除光标
        if (showCursor) {
          element.style.borderRight = 'none';
        }
        // 可选添加闪烁效果
        if (showBlink) {
          element.classList.add('blink-after-typing');
        }
      }
    }, speed);
  }, delay);
  
  // 返回销毁函数
  return () => {
    clearInterval(timer);
    element.textContent = originalText;
    Object.assign(element.style, originalStyles);
    element.classList.remove('blink-after-typing');
  };
}

// 初始化所有打字机动画元素
function initTypewriters() {
  const typewriterElements = document.querySelectorAll('[data-typewriter]');
  const destroyFunctions = [];
  
  typewriterElements.forEach(el => {
    const speed = parseInt(el.dataset.speed) || 100;
    const delay = parseInt(el.dataset.delay) || 0;
    const cursor = el.dataset.cursor !== 'false';
    const blink = el.dataset.blink === 'true';
    
    const destroyFn = typeWriter(el, speed, delay, cursor, blink);
    destroyFunctions.push(destroyFn);
  });
  
  // 返回销毁所有动画的函数
  return () => {
    destroyFunctions.forEach(fn => fn());
  };
}

/**
 * 生成带有透明度变化的渐变色
 * 返回CSS渐变字符串
 */
function generateLightPastelColor() {
    // 生成基准色 (80-255)
    const base = Math.floor(Math.random() * 176) + 80;
    
    // 生成两个差值 (0-199)
    const diff1 = Math.floor(Math.random() * 200);
    const diff2 = Math.floor(Math.random() * 200);
    
    // 生成RGB值
    const [r, g, b] = [
      base,
      base + diff1,
      base + diff2
    ].map(val => Math.min(255, Math.max(80, val)));
    
    // 生成透明度变化 (0.5-1.0)
    const alpha1 = (Math.random() * 0.5 + 0.5).toFixed(2);
    const alpha2 = (Math.random() * 0.5 + 0.5).toFixed(2);
    
    return `linear-gradient(135deg, rgba(${r}, ${g}, ${b}, ${alpha1}), rgba(${r}, ${g}, ${b}, ${alpha2}))`;
}

// 浏览器环境初始化
if (typeof window !== 'undefined' && typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    // 导出初始化函数以便手动调用
    window.typewriter = {
      init: initTypewriters,
      animate: typeWriter
    };
    window.generateLightPastelColor = generateLightPastelColor;
    
    // 自动初始化
    initTypewriters();
  });
}

// Node.js模块导出
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    generateLightPastelColor,
    typeWriter,
    initTypewriters
  };
}
