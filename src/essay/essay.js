/**
 * 文章数据列表
 * 包含网站所有文章的基本信息和元数据
 */
const articles = [
    // 新文章将通过脚本自动添加到这里
    {
        title: "首篇文章",
        description: "随便弄点什么",
        filename: "20250627-1.md",
        date: "2025-06-27",
        colorClass: "linear-gradient(135deg, rgba(171, 195, 255, 0.98), rgba(171, 195, 255, 0.85))"
    }];

// 导出数据
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        articles
    }; // Node.js环境
} else {
    window.articles = articles; // 浏览器环境
}
