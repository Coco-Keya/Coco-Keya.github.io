// 动态加载组件
document.addEventListener('DOMContentLoaded', () => {
    // 加载页头
    fetch('../components/header.html')
      .then(res => res.text())
      .then(html => {
        document.getElementById('header').innerHTML = html;
        setActiveNav();
      });
  
    // 加载页脚
    fetch('../components/footer.html')
      .then(res => res.text())
      .then(html => {
        document.getElementById('footer').innerHTML = html;
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