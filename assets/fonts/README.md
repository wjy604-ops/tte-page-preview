# TTE 字体资源包

## 状态

DIN 的 Regular、Medium、Bold 三档已经放入本目录，并在 `tokens/typography-tokens.css` 中注册。界面字体 Helvetica Neue、Inter、PingFang SC、Microsoft YaHei 仍只有命名约定，二进制文件待授权后补充。

层级由字体文件决定，不通过 CSS `font-weight` 切换。文件内部的 OS/2 字重标记不作为选用依据。

## 已入库

```text
assets/fonts/
├─ DIN-Regular-2.otf          Regular，注册名 TTE DIN Regular
├─ DIN-Medium-2.otf           Medium，注册名 TTE DIN Medium
├─ din-bold-2.ttf             Bold，注册名 TTE DIN Bold
└─ DIN-RegularAlternate-2.otf 备用字形，不进入三档
```

来源为 FontFont DIN，Albert-Jan Pool，1995。`DIN-RegularAlternate-2.otf` 只作备用字形保留，组件不得把它当作 Regular、Medium 或 Bold。

使用约定：

- 次要强调数字使用 DIN Regular。
- 默认重点数字使用 DIN Medium，Token 为 `--font-family-numeric`。
- 核心大数字使用 DIN Bold。
- 使用 DIN 的数字同时启用 `tabular-nums`。

## 待补充

```text
assets/fonts/
├─ Inter/
│  ├─ Inter-Regular.woff2
│  ├─ Inter-Medium.woff2
│  └─ Inter-Bold.woff2
├─ HelveticaNeue/
│  ├─ HelveticaNeue-Regular.woff2
│  ├─ HelveticaNeue-Medium.woff2
│  └─ HelveticaNeue-Bold.woff2
├─ PingFangSC/
│  ├─ PingFangSC-Regular.woff2
│  ├─ PingFangSC-Medium.woff2
│  └─ PingFangSC-Semibold.woff2
└─ MicrosoftYaHei/
   ├─ MicrosoftYaHei-Regular.woff2
   └─ MicrosoftYaHei-Bold.woff2
```

## 交付要求

- Web 组件库优先使用 `.woff2`。DIN 当前使用已入库的 `.otf` 和 `.ttf`。
- 每个字体文件需要记录版本、来源、档位（Regular、Medium 或 Bold）和许可证。
- 苹方没有 Bold 文件，Bold 档使用 `PingFangSC-Semibold.woff2`。微软雅黑没有 Medium 文件，回退 Regular。
- Helvetica Neue、PingFang SC、Microsoft YaHei 是否可以随产品分发，需要先完成授权确认；未确认前不得从系统或网络复制字体文件。
- `@font-face` 只在 `tokens/typography-tokens.css` 注册一次，业务组件不重复注册。

对应规范：

- [docs/typography.md](../../docs/typography.md)
- [typography.tokens.json](../../tokens/typography.tokens.json)
- [typography-tokens.css](../../tokens/typography-tokens.css)
