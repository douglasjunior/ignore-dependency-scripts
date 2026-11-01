<p align="center">
  <img src="docs/cover.svg" alt="ignore-dependency-scripts: Prevent pre and postinstall scripts when installed directly from Git" width="800">
</p>

<p align="center">
  Script to prevent dependencies from executing <b>preinstall</b> and <b>postinstall</b> scripts when installed directly from Git. Keep your root developer tooling while protecting consumer projects.
</p>

<p align="center">
  <a href="LICENSE"><img src="https://img.shields.io/github/license/douglasjunior/ignore-dependency-scripts?style=flat-square&color=FF4F7B" alt="MIT License"></a>
  <a href="https://www.npmjs.com/package/ignore-dependency-scripts"><img src="https://img.shields.io/npm/v/ignore-dependency-scripts?style=flat-square&color=FFB547" alt="npm version"></a>
  <a href="https://www.npmjs.com/package/ignore-dependency-scripts"><img src="https://img.shields.io/npm/dt/ignore-dependency-scripts?style=flat-square" alt="npm downloads"></a>
  <img src="https://img.shields.io/badge/node-%3E%3D12-339933?style=flat-square&logo=nodedotjs&logoColor=white" alt="Node.js >= 12">
  <img src="https://img.shields.io/badge/dependencies-0-blue?style=flat-square" alt="Zero dependencies">
  <a href="https://github.com/douglasjunior/ignore-dependency-scripts/pulls"><img src="https://img.shields.io/badge/PRs-welcome-22C55E?style=flat-square" alt="PRs welcome"></a>
</p>

<p align="center">
  <a href="#-quick-start"><b>Quick Start</b></a> ·
  <a href="#-why-ignore-dependency-scripts">Why</a> ·
  <a href="#-how-it-works">How It Works</a> ·
  <a href="#-common-use-cases">Use Cases</a> ·
  <a href="#-comparison-with-alternatives">Alternatives</a> ·
  <a href="#-contributing">Contributing</a> ·
  <a href="#-license">License</a>
</p>

---

## 🚀 Quick Start

Replace your direct lifecycle script in `package.json`:

```diff
  // package.json
  {
    "name": "my-library",
    "scripts": {
-     "postinstall": "husky install"
+     "postinstall": "npx --yes ignore-dependency-scripts \"husky install\""
    }
  }
```

> Replace `"husky install"` with any command you need, such as `npx pod-install` or multi-command chains (`"husky install && npx pod-install"`).

### How it behaves

- **When developing locally** (`npm install` or `yarn install` inside `./my-library`): the script runs normally.
- **When installed as a Git dependency** (`yarn add github:user/my-library` or `npm install git+https://...` in another project): the script is safely ignored.

### Optional: Install as a devDependency

If you prefer not to invoke `npx` dynamically, you can add it as a development dependency:

```bash
npm install --save-dev ignore-dependency-scripts
# or
yarn add -D ignore-dependency-scripts
# or
pnpm add -D ignore-dependency-scripts
```

Then reference the binary directly:

```json
{
  "scripts": {
    "postinstall": "ignore-dependency-scripts \"husky install\""
  }
}
```

## 💡 Why ignore-dependency-scripts?

- 🛡️ **Git-based dependencies without side effects.** When reusing private or internal packages directly from Git repositories, package managers execute lifecycle scripts like `postinstall` or `prepare`. This package ensures those scripts run strictly in root development.
- ⚡ **Zero runtime dependencies.** Written in lightweight pure Node.js using only standard library modules (`fs`, `path`, `child_process`). Adds zero bloat to your dependency tree.
- 📦 **No private npm registry required.** Share libraries directly via Git URLs (`git+ssh://` or `git+https://`) without managing an expensive or complex private npm registry.
- 🔧 **Seamless monorepo & submodule workflows.** Keeps root repository development fully functional without polluting consuming applications.
- 🌐 **Universal package manager support.** Works identically across npm, Yarn (Classic & Berry), pnpm, and Bun on Linux, macOS, and Windows.

## 🧠 How It Works

When `ignore-dependency-scripts` executes, it checks whether a `.git` folder exists in the current working root directory (`process.cwd()`):

| Environment | `.git` Folder | Status | Behavior |
|---|---|---|---|
| **Local Development**<br>`./my-library` | **Present** | **Executed** | Spawns the specified command with `child_process.exec()` and forwards standard output and error. |
| **Installed as Dependency**<br>`./consumer-app/node_modules/my-library` | **Absent** | **Ignored** | Prints `Ignored script: <command>` and exits cleanly (`code: 0`) without executing the command. |

```text
                                 ┌─────────────────────────┐
                                 │   Does .git folder exist │
                                 │      in process.cwd()?  │
                                 └───────────┬─────────────┘
                                             │
                       ┌─────────────────────┴─────────────────────┐
                       ▼                                           ▼
                     Yes                                          No
         [Local Repository Dev]                         [Installed as Dependency]
                   │                                               │
                   ▼                                               ▼
     Execute specified script                         Log "Ignored script" & exit 0
  (e.g., husky install, pod-install)                    (consumer project protected)
```

<details>
<summary><b>Stack Overflow references and background</b></summary>

This utility solves the long-standing limitation where package managers do not differentiate between root development and Git dependency installations:

- [Stack Overflow: Prevent git dependency postinstall script](https://stackoverflow.com/q/72092997/2826279)
- [Stack Overflow: npm install from git repo without postinstall](https://stackoverflow.com/q/54212147/2826279)
- [Stack Overflow: Ignore npm postinstall when installed as dependency](https://stackoverflow.com/q/23505318/2826279)
- [Stack Overflow: Prevent running scripts on git install](https://stackoverflow.com/q/44749524/2826279)
- [Stack Overflow: Yarn postinstall script only for root](https://stackoverflow.com/q/41015620/2826279)
- [Stack Overflow: Inspired by directory detection strategy](https://stackoverflow.com/a/68915638/2826279)

</details>

## 🛠️ Common Use Cases

### 1. Husky Git Hooks

Prevent Husky from attempting to create Git hooks inside consuming projects when your library is installed from Git:

```json
{
  "scripts": {
    "prepare": "npx --yes ignore-dependency-scripts \"husky install\""
  }
}
```

### 2. React Native CocoaPods Installation

Avoid running `pod-install` on platforms or host projects where iOS dependencies are unnecessary:

```json
{
  "scripts": {
    "postinstall": "npx --yes ignore-dependency-scripts \"npx pod-install\""
  }
}
```

### 3. Combining Multiple Commands

Chain any shell commands within the quoted argument:

```json
{
  "scripts": {
    "postinstall": "npx --yes ignore-dependency-scripts \"husky install && npm run build:local\""
  }
}
```

## 🔄 Comparison with Alternatives

| Feature / Solution | `ignore-dependency-scripts` | `typicode/pinst` | `bahmutov/am-i-a-dependency` |
|---|---|---|---|
| **Direct Git Dependencies** | ✅ **Full support** | ❌ Requires npm publish hooks | ⚠️ Requires code integration |
| **Zero Configuration** | ✅ Wrap command in CLI | ⚠️ Needs prepublish/postpublish hooks | ❌ Needs custom JS wrapper |
| **Dependencies** | ✅ **0 dependencies** | ❌ External packages | ❌ External package |
| **Package Manager Compatibility** | ✅ npm, Yarn, pnpm, Bun | ⚠️ npm/yarn publish focused | ⚠️ npm/yarn |

## 🤝 Contributing

Contributions, bug fixes, and feature suggestions are welcome!

1. Fork the repository and create your topic branch (`git checkout -b feat/my-improvement`).
2. Make your changes and test them locally.
3. Commit your changes following [Conventional Commits](https://www.conventionalcommits.org/).
4. Push to your branch and open a Pull Request.

For bugs and feature requests, please [open an issue](https://github.com/douglasjunior/ignore-dependency-scripts/issues).

## ⭐ Star History

If `ignore-dependency-scripts` solved your Git dependency lifecycle issues, consider giving it a star on GitHub.

<a href="https://star-history.com/#douglasjunior/ignore-dependency-scripts&Date">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/svg?repos=douglasjunior/ignore-dependency-scripts&type=Date&theme=dark">
    <img alt="Star History Chart" src="https://api.star-history.com/svg?repos=douglasjunior/ignore-dependency-scripts&type=Date" width="600">
  </picture>
</a>

## 📄 License

[MIT](LICENSE) © [Douglas Nassif Roma Junior](https://github.com/douglasjunior)

<p align="center">
  <a href="https://douglasjunior.work">
    <img src="docs/portfolio-banner.svg" alt="Crafted by Douglas Junior — Explore portfolio" width="800">
  </a>
</p>
