/**
 * @workspace 全局设置模块
 * 包含项目级别的配置和共享设置
 */

// 基础配置
const baseConfig = {
  // 项目元数据
  meta: {
    title: '我的网站',
    description: '个人网站项目',
    version: '1.0.0'
  },

  // API配置
  api: {
    baseUrl: process.env.API_BASE_URL || '/api',
    timeout: 10000
  },

  // 路由配置
  routing: {
    mode: 'history', // 'hash' 或 'history'
    basePath: '/'
  },

  // UI主题配置
  theme: {
    primaryColor: '#3498db', // 蓝色
    secondaryColor: '#2ecc71', // 绿色
    coolColors: ['#3498db', '#2980b9', '#34495e', '#16a085', '#27ae60'], // 冷色调系列
    darkMode: false
  },

  // 开发工具配置
  devTools: {
    debug: process.env.NODE_ENV === 'development',
    logger: true
  }
};

// 环境相关配置
const envConfig = {
  development: {
    api: {
      baseUrl: 'http://localhost:3000/api'
    },
    devTools: {
      debug: true
    }
  },
  production: {
    api: {
      baseUrl: 'https://api.example.com'
    }
  }
};

// 合并配置
const config = {
  ...baseConfig,
  ...(envConfig[process.env.NODE_ENV] || {})
};

// 导出配置
export default config;

// 浏览器环境全局注册
if (typeof window !== 'undefined') {
  window.__workspace = config;
}
