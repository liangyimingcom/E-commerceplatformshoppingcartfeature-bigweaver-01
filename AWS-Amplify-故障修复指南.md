# AWS Amplify 故障修复指南
# AWS Amplify Troubleshooting Guide

## 概述 / Overview

本指南提供了 AWS Amplify 部署过程中常见问题的系统化解决方案。
This guide provides systematic solutions for common AWS Amplify deployment issues.

**最后更新 / Last Updated**: 2025-12-23  
**状态 / Status**: ✅ 已验证 / Verified

---

## 目录 / Table of Contents

1. [npm ci 命令失败](#1-npm-ci-命令失败)
2. [SSM Secrets 设置警告](#2-ssm-secrets-设置警告)
3. [缓存检索警告](#3-缓存检索警告)
4. [构建配置优化](#4-构建配置优化)
5. [常见部署错误](#5-常见部署错误)

---

## 1. npm ci 命令失败
## 1. npm ci Command Failure

### 问题描述 / Problem Description

AWS Amplify 使用 `npm ci` 命令安装依赖时失败：
AWS Amplify fails when installing dependencies using `npm ci`:

```
npm ERR! The package-lock.json exists but it's incomplete
npm ERR! Clean install required
```

### 根本原因 / Root Cause

- package-lock.json 文件不完整或缺失
- lockfile version 与 npm 版本不兼容
- 依赖关系未完全解析

- Incomplete or missing package-lock.json file
- Lockfile version incompatible with npm version
- Dependencies not fully resolved

### 解决方案 / Solution

#### 步骤 1: 删除旧的锁文件 / Step 1: Remove Old Lock File

```bash
rm -f package-lock.json
```

#### 步骤 2: 清理 npm 缓存 / Step 2: Clean npm Cache

```bash
npm cache clean --force
```

#### 步骤 3: 重新生成完整的 package-lock.json / Step 3: Regenerate Complete package-lock.json

```bash
npm install
```

这将创建包含所有传递依赖关系的完整锁文件。
This creates a complete lock file with all transitive dependencies.

#### 步骤 4: 验证锁文件 / Step 4: Verify Lock File

```bash
npm ci
```

如果此命令成功，说明 package-lock.json 现在是完整的。
If this command succeeds, the package-lock.json is now complete.

#### 步骤 5: 提交更改 / Step 5: Commit Changes

```bash
git add package-lock.json
git commit -m "Fix: Regenerate complete package-lock.json for AWS Amplify"
git push origin main
```

### 预防措施 / Prevention

- ✅ 始终提交 package-lock.json 到版本控制
- ✅ 使用 `npm ci` 而不是 `npm install` 进行 CI/CD
- ✅ 定期更新依赖并重新生成锁文件

- ✅ Always commit package-lock.json to version control
- ✅ Use `npm ci` instead of `npm install` for CI/CD
- ✅ Regularly update dependencies and regenerate lock file

---

## 2. SSM Secrets 设置警告
## 2. SSM Secrets Setup Warning

### 问题描述 / Problem Description

构建日志中出现警告：
Warning appears in build logs:

```
Failed to set up process.env.secrets
```

### 根本原因 / Root Cause

AWS Amplify 自动尝试从 AWS Systems Manager Parameter Store 加载密钥，但未找到配置的参数。
AWS Amplify automatically attempts to load secrets from AWS Systems Manager Parameter Store but finds no configured parameters.

### 当前状态 / Current Status

✅ **此警告可以安全忽略 / This warning is SAFE TO IGNORE**

对于此电商购物车应用，不需要任何外部密钥或 API 密钥。
For this e-commerce shopping cart application, no external secrets or API keys are required.

### 何时需要配置 SSM / When to Configure SSM

仅在添加以下功能时需要配置：
Configuration is only needed when adding features such as:

1. **支付处理 / Payment Processing**
   - Stripe API 密钥
   - PayPal 客户端密钥
   - 其他支付网关凭据

2. **后端 API 集成 / Backend API Integration**
   - 身份验证令牌
   - API 端点 URL
   - 服务器凭据

3. **第三方服务 / Third-Party Services**
   - 分析服务密钥
   - 监控工具令牌
   - 邮件服务 API 密钥

### 配置 SSM Secrets 的步骤 / Steps to Configure SSM Secrets

如果将来需要添加密钥：
If you need to add secrets in the future:

#### 步骤 1: 在 AWS Systems Manager 中创建参数 / Step 1: Create Parameter in AWS Systems Manager

1. 打开 AWS Systems Manager Console
2. 导航到 Parameter Store
3. 点击 "Create parameter"
4. 使用以下路径格式：

```
/amplify/{APP_ID}/{BRANCH_NAME}/{PARAMETER_NAME}
```

例如 / Example:
```
/amplify/d39hijjwy5dz8q/ecommerce-shopping-cart-20251221-043801/STRIPE_API_KEY
```

#### 步骤 2: 在 Amplify 中配置环境变量 / Step 2: Configure Environment Variables in Amplify

1. 打开 AWS Amplify Console
2. 选择你的应用
3. 点击 "Environment variables"
4. 添加新变量并引用 SSM 参数：

```
Key: STRIPE_API_KEY
Value: /amplify/{APP_ID}/{BRANCH_NAME}/STRIPE_API_KEY
```

#### 步骤 3: 在代码中访问密钥 / Step 3: Access Secrets in Code

```javascript
const stripeApiKey = process.env.STRIPE_API_KEY;
```

### IAM 权限要求 / IAM Permission Requirements

确保 Amplify 服务角色具有以下权限：
Ensure the Amplify service role has the following permissions:

```json
{
  "Effect": "Allow",
  "Action": [
    "ssm:GetParameter",
    "ssm:GetParameters"
  ],
  "Resource": "arn:aws:ssm:*:*:parameter/amplify/*"
}
```

---

## 3. 缓存检索警告
## 3. Cache Retrieval Warning

### 问题描述 / Problem Description

构建日志中出现缓存警告：
Cache warning appears in build logs:

```
Unable to write cache: {"code":"ERR_BAD_REQUEST","message":"Request failed with status code 404"}
```

### 根本原因 / Root Cause

首次部署时，缓存存储端点尚未创建，导致 404 错误。
During first deployment, the cache storage endpoint has not been created yet, causing a 404 error.

### 当前状态 / Current Status

✅ **此警告可以安全忽略 / This warning is SAFE TO IGNORE**

这是首次部署的正常行为，后续构建将自动使用缓存。
This is normal behavior for first deployments; subsequent builds will automatically use caching.

### 缓存工作流程 / Cache Workflow

1. **首次构建 / First Build**
   - ⚠️ 缓存写入失败（出现警告）
   - ⏱️ 构建时间较长
   - ✅ 应用成功部署

2. **AWS 自动配置 / AWS Auto-Configuration**
   - 🔧 Amplify 自动配置缓存存储
   - 📦 缓存基础设施就绪

3. **后续构建 / Subsequent Builds**
   - ✅ 缓存正常工作
   - ⚡ 构建时间减少约 50%
   - ✅ 无警告

### 缓存配置优化 / Cache Configuration Optimization

已在 `amplify.yml` 中配置缓存：
Cache is configured in `amplify.yml`:

```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - npm ci
    build:
      commands:
        - npm run build
  artifacts:
    baseDirectory: build
    files:
      - '**/*'
  cache:
    paths:
      - node_modules/**/*
```

### 验证缓存是否工作 / Verify Cache is Working

在第二次构建后，查找以下日志条目：
After the second build, look for these log entries:

```
Restoring cache...
Cache restored successfully
```

---

## 4. 构建配置优化
## 4. Build Configuration Optimization

### 当前配置 / Current Configuration

**amplify.yml** 已优化用于 React 应用：
**amplify.yml** is optimized for React applications:

```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - npm ci                    # 快速、可重现的安装
    build:
      commands:
        - npm run build            # 生产构建
  artifacts:
    baseDirectory: build           # React 输出目录
    files:
      - '**/*'                     # 包含所有文件
  cache:
    paths:
      - node_modules/**/*          # 缓存依赖
```

### 性能优化建议 / Performance Optimization Recommendations

#### 1. 构建命令优化 / Build Command Optimization

```yaml
build:
  commands:
    - npm run build
    - echo "Build completed at $(date)"
```

#### 2. 环境特定配置 / Environment-Specific Configuration

```yaml
preBuild:
  commands:
    - npm ci
    - export NODE_ENV=production
```

#### 3. 构建超时设置 / Build Timeout Settings

在 Amplify Console 中设置：
Set in Amplify Console:

- 构建超时 / Build timeout: 15 分钟 / 15 minutes（默认）
- 对于大型应用 / For large apps: 最多 60 分钟 / Up to 60 minutes

### Node.js 版本配置 / Node.js Version Configuration

指定 Node.js 版本以确保一致性：
Specify Node.js version for consistency:

在 `amplify.yml` 中添加 / Add to `amplify.yml`:

```yaml
frontend:
  phases:
    preBuild:
      commands:
        - nvm use 18              # 使用 Node.js 18
        - node --version
        - npm ci
```

或在 Amplify Console 中设置环境变量：
Or set in Amplify Console environment variables:

```
_LIVE_PACKAGE_UPDATES: [{"name":"_LIVE_UPDATES","version":"18.x"}]
```

---

## 5. 常见部署错误
## 5. Common Deployment Errors

### 5.1 构建失败：内存不足
### 5.1 Build Failure: Out of Memory

**错误信息 / Error Message:**
```
JavaScript heap out of memory
```

**解决方案 / Solution:**

在 `amplify.yml` 中增加 Node.js 堆大小：
Increase Node.js heap size in `amplify.yml`:

```yaml
build:
  commands:
    - export NODE_OPTIONS="--max-old-space-size=4096"
    - npm run build
```

### 5.2 依赖安装失败
### 5.2 Dependency Installation Failure

**错误信息 / Error Message:**
```
npm ERR! code ERESOLVE
npm ERR! ERESOLVE unable to resolve dependency tree
```

**解决方案 / Solution:**

使用 legacy peer deps 模式：
Use legacy peer deps mode:

```yaml
preBuild:
  commands:
    - npm ci --legacy-peer-deps
```

### 5.3 环境变量未定义
### 5.3 Environment Variables Undefined

**症状 / Symptoms:**
- 应用构建成功但功能不正常
- 控制台显示 undefined 错误

**解决方案 / Solution:**

1. 在 Amplify Console 中配置环境变量
2. 使用 `REACT_APP_` 前缀（React 应用）：

```
REACT_APP_API_URL=https://api.example.com
```

3. 在代码中访问：

```javascript
const apiUrl = process.env.REACT_APP_API_URL;
```

### 5.4 构建成功但页面空白
### 5.4 Build Success But Blank Page

**根本原因 / Root Cause:**
- 路由配置错误
- 基础 URL 设置不正确

**解决方案 / Solution:**

在 `package.json` 中添加 homepage：
Add homepage in `package.json`:

```json
{
  "homepage": ".",
  "name": "ecommerce-shopping-cart",
  ...
}
```

或在 Amplify Console 中配置重定向规则：
Or configure redirect rules in Amplify Console:

```json
[
  {
    "source": "/<*>",
    "target": "/index.html",
    "status": "404-200",
    "condition": null
  }
]
```

---

## 验证检查清单
## Verification Checklist

在推送到 AWS Amplify 之前，确认以下项目：
Before pushing to AWS Amplify, verify the following:

### 必需文件 / Required Files

- ✅ `package.json` - 包含所有依赖
- ✅ `package-lock.json` - 完整的锁文件
- ✅ `amplify.yml` - 构建配置
- ✅ `public/index.html` - HTML 模板
- ✅ `src/` - 源代码目录

### 配置验证 / Configuration Verification

- ✅ amplify.yml 中的构建命令正确
- ✅ artifacts baseDirectory 设置为 'build'
- ✅ 缓存路径配置为 node_modules
- ✅ package.json 中的脚本定义正确

### 本地测试 / Local Testing

```bash
# 安装依赖
npm ci

# 本地开发测试
npm start

# 生产构建测试
npm run build

# 验证构建输出
ls -la build/
```

### Git 提交检查 / Git Commit Checklist

```bash
# 检查状态
git status

# 查看更改
git diff

# 添加文件
git add .

# 提交
git commit -m "feat: Expand product catalog and fix AWS Amplify configuration"

# 推送
git push origin main
```

---

## 监控和日志
## Monitoring and Logs

### 访问构建日志 / Accessing Build Logs

1. 打开 AWS Amplify Console
2. 选择你的应用
3. 点击最近的构建
4. 查看详细日志

### 关键日志条目 / Key Log Entries

**成功的构建应包含 / Successful builds should include:**

```
✔ Downloading cache...
✔ Installing dependencies
✔ Build completed successfully
✔ Uploading artifacts
✔ Deployment completed
```

**警告（可以忽略）/ Warnings (Can be ignored):**

```
⚠ Unable to write cache (first build)
⚠ Failed to set up process.env.secrets (no secrets configured)
```

---

## 获取帮助
## Getting Help

### AWS 支持资源 / AWS Support Resources

- 📚 [AWS Amplify 文档](https://docs.aws.amazon.com/amplify/)
- 💬 [AWS 论坛](https://forums.aws.amazon.com/forum.jspa?forumID=314)
- 🎫 [AWS 支持](https://aws.amazon.com/support/)

### 社区资源 / Community Resources

- 🐙 [GitHub Issues](https://github.com/aws-amplify/amplify-cli/issues)
- 💡 [Stack Overflow](https://stackoverflow.com/questions/tagged/aws-amplify)
- 📖 [AWS Amplify Blog](https://aws.amazon.com/blogs/mobile/category/mobile-services/aws-amplify/)

---

## 总结
## Summary

本指南涵盖了 AWS Amplify 部署的所有常见问题：
This guide covers all common AWS Amplify deployment issues:

1. ✅ **npm ci 问题** - 通过重新生成完整的 package-lock.json 解决
2. ✅ **SSM Secrets 警告** - 对当前应用安全忽略
3. ✅ **缓存警告** - 首次部署正常，后续自动解决
4. ✅ **构建配置** - 已优化并经过验证
5. ✅ **常见错误** - 提供了解决方案和预防措施

1. ✅ **npm ci issues** - Resolved by regenerating complete package-lock.json
2. ✅ **SSM Secrets warning** - Safe to ignore for current application
3. ✅ **Cache warning** - Normal for first deployment, auto-resolves subsequently
4. ✅ **Build configuration** - Optimized and verified
5. ✅ **Common errors** - Solutions and preventive measures provided

**当前状态 / Current Status**: 🎉 准备部署 / Ready for Deployment

---

**文档版本 / Document Version**: 1.0  
**创建日期 / Created**: 2025-12-23  
**维护者 / Maintainer**: Development Team
