// 动态加载组件
document.addEventListener('DOMContentLoaded', () => {
    // 加载页头
    fetch('/src/components/header.html')
      .then(res => res.text())
      .then(html => {
        document.getElementById('header').innerHTML = html;
        setActiveNav();
        initMobileMenu();
      })
      .catch(err => {
        console.error('加载页头失败:', err);
        document.getElementById('header').innerHTML = '<div class="error">导航加载失败</div>';
      });
  
    // 加载页脚
    fetch('/src/components/footer.html')
      .then(res => res.text())
      .then(html => {
        document.getElementById('footer').innerHTML = html;
      })
      .catch(err => {
        console.error('加载页脚失败:', err);
        document.getElementById('footer').innerHTML = '<div class="error">页脚加载失败</div>';
      });
  });
  
  // 设置当前导航激活状态
  function setActiveNav() {
    const currentPage = location.pathname.split('/').pop();
    document.querySelectorAll('nav a').forEach(link => {
      if (link.getAttribute('href') === currentPage) {
        link.classList.add('active');
      }
    });
  }

  // 初始化移动端菜单功能
  function initMobileMenu() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('.main-nav');
    
    if (menuBtn && nav) {
      menuBtn.addEventListener('click', () => {
        nav.classList.toggle('show');
        menuBtn.querySelector('i').classList.toggle('fa-times');
        menuBtn.querySelector('i').classList.toggle('fa-bars');
      });
      
      // 点击菜单项后自动关闭菜单
      document.querySelectorAll('.main-nav a').forEach(link => {
        link.addEventListener('click', () => {
          nav.classList.remove('show');
          menuBtn.querySelector('i').classList.add('fa-bars');
          menuBtn.querySelector('i').classList.remove('fa-times');
        });
      });
    }
  }

  // 链接窗口管理功能
  function manageLinkWindows() {
    document.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', function(e) {
        if (this.hostname === window.location.hostname && 
            !this.hasAttribute('target') && 
            this.getAttribute('href') !== '#') {
          e.preventDefault();
          const url = this.href;
          const windowName = 'window_' + encodeURIComponent(url);
          
          // 尝试聚焦已有窗口或打开新窗口
          const existingWindow = window.open('', windowName);
          if (existingWindow && existingWindow.location.href === url) {
            existingWindow.focus();
          } else {
            window.open(url, windowName);
          }
        }
      });
    });
  }

  // 在DOM加载完成后初始化链接管理
  document.addEventListener('DOMContentLoaded', () => {
    manageLinkWindows();
  });