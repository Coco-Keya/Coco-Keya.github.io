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
    },
    {
        title: "突发奇想",
        description: "诗兴大发！！（不是）ヾ(≧▽≦*)o",
        filename: "20250701-突发奇想.md",
        date: "2025-07-01",
        colorClass: "linear-gradient(135deg, rgba(227, 255, 255, 0.79), rgba(227, 255, 255, 0.80))"
    },
    {
        title: "关于世界观的设定",
        description: "我设想了一种奇幻世界观，不知道怎么样",
        filename: "20251004-关于世界观的设定.md",
        date: "2025-10-04",
        colorClass: "linear-gradient(135deg, rgba(236, 255, 255, 0.89), rgba(236, 255, 255, 0.97))"
    }];

// 导出数据
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        articles
    }; // Node.js环境
} else {
    window.articles = articles; // 浏览器环境
}
