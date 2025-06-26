/**
 * 打字机动画功能
 * 使用方法：
 * 1. 在元素上添加data-typewriter属性启用效果
 * 2. 可选参数：
 *    - data-speed: 打字速度(毫秒)，默认100
 *    - data-delay: 动画延迟(毫秒)，默认0
 *    - data-cursor: 是否显示光标，默认true
 *    - data-blink: 是否在打字完成后闪烁，默认false
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
    element.style.borderRight = '3px solid var(--primary-color)';
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

// 自动初始化
document.addEventListener('DOMContentLoaded', () => {
  // 导出初始化函数以便手动调用
  window.typewriter = {
    init: initTypewriters,
    animate: typeWriter
  };
  
  // 自动初始化
  initTypewriters();
});
