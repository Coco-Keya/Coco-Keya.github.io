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

/**
 * 鼠标拖尾特效
 * @param {number} trailCount - 拖尾元素数量
 * @param {number} trailSize - 拖尾元素大小(px)
 * @param {number} trailDistance - 拖尾元素间距(px)
 */
function initMouseTrail(trailCount = 8, trailSize = 20, trailDistance = 14) {
  const trailElements = [];
  
  // 创建拖尾元素
  for (let i = 0; i < trailCount; i++) {
    const el = document.createElement('div');
    el.className = 'mouse-trail';
    el.style.width = `${trailSize}px`;
    el.style.height = `${trailSize}px`;
    el.style.position = 'fixed';
    el.style.borderRadius = '50%';
    el.style.pointerEvents = 'none';
    el.style.transform = 'translate(-50%, -50%)';
    el.style.transition = `opacity 0.3s, transform 0.3s`;
    el.style.opacity = '0';
    document.body.appendChild(el);
    trailElements.push(el);
  }
  
  let mouseX = 0;
  let mouseY = 0;
  let lastMouseX = 0;
  let lastMouseY = 0;
  let trailPositions = Array(trailCount).fill({ x: 0, y: 0 });
  let isMoving = false;
  
  // 鼠标移动事件
  document.addEventListener('mousemove', (e) => {
    // 检测鼠标是否真正移动(超过5px阈值)
    if (Math.abs(e.clientX - lastMouseX) > 5 || Math.abs(e.clientY - lastMouseY) > 5) {
      isMoving = true;
      mouseX = e.clientX;
      mouseY = e.clientY;
      lastMouseX = e.clientX;
      lastMouseY = e.clientY;
    } else {
      isMoving = false;
    }
  });
  
  // 动画循环
  function animate() {
    // 更新拖尾元素位置
    trailPositions = trailPositions.map((pos, i) => {
      const targetX = i === 0 ? mouseX : trailPositions[i - 1].x;
      const targetY = i === 0 ? mouseY : trailPositions[i - 1].y;
      
      const dx = targetX - pos.x;
      const dy = targetY - pos.y;
      
      return {
        x: pos.x + dx * 0.2,
        y: pos.y + dy * 0.2
      };
    });
    
    // 应用位置和样式
    trailElements.forEach((el, i) => {
      const pos = trailPositions[i];
      const distance = Math.sqrt(
        Math.pow(pos.x - mouseX, 2) + 
        Math.pow(pos.y - mouseY, 2)
      );
      
      el.style.left = `${pos.x}px`;
      el.style.top = `${pos.y}px`;
      // 根据鼠标移动状态设置透明度
      const baseOpacity = isMoving ? 0.8 : 0;
      el.style.opacity = `${baseOpacity - (i / trailCount) * 0.6}`;
      el.style.background = generateLightPastelColor();
      el.style.transform = `translate(-50%, -50%) scale(${1.2 - (i / trailCount) * 0.4})`;
    });
    
    requestAnimationFrame(animate);
  }
  
  animate();
}

/**
 * 鼠标点击特效
 */
function initMouseClickEffect() {
  document.addEventListener('click', (e) => {
    const el = document.createElement('div');
    el.className = 'mouse-click';
    el.style.position = 'fixed';
    el.style.left = `${e.clientX}px`;
    el.style.top = `${e.clientY}px`;
    el.style.width = '40px';
    el.style.height = '40px';
    el.style.borderRadius = '50%';
    el.style.pointerEvents = 'none';
    el.style.transform = 'translate(-50%, -50%) scale(0)';
    el.style.background = generateLightPastelColor();
    el.style.opacity = '0.8';
    el.style.transition = 'transform 0.5s, opacity 0.5s';
    document.body.appendChild(el);
    
    // 触发动画
    setTimeout(() => {
      el.style.transform = 'translate(-50%, -50%) scale(3)';
      el.style.opacity = '0';
    }, 10);
    
    // 移除元素
    setTimeout(() => {
      el.remove();
    }, 500);
  });
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
    
    // 初始化鼠标特效
    initMouseTrail();
    initMouseClickEffect();
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
