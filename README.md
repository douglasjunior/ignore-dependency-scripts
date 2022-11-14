# Ignore dependency post/pre install scripts

[![License MIT](https://img.shields.io/badge/licence-MIT-blue.svg)](https://github.com/douglasjunior/ignore-dependency-scripts/blob/master/LICENSE)
[![npm version](https://img.shields.io/npm/v/ignore-dependency-scripts.svg)](https://www.npmjs.com/package/ignore-dependency-scripts)
[![npm downloads](https://img.shields.io/npm/dt/ignore-dependency-scripts.svg)](#usage)

Script to prevent dependencies to execute post/pre install scripts when installed directly from git.

*Alternative to [typicode/pinst](https://github.com/typicode/pinst) and [bahmutov/am-i-a-dependency](https://github.com/bahmutov/am-i-a-dependency).*

## Why?

Sometimes when working with private projects, we have the need to reuse some parts of our code in many projects. But, we know that maintaining a private `npm registry` is a pain and requires a lot of attention.

So, the easiest way, is to install our private repo as a dependency directly from git. But, this comes with some caveats like the inability to use `.npmignore` and the **lack of an option to "prevent pre/post scripts" when installed as a dependency.**

Some examples of scripts that we might want to prevent from running when installed as a dependency is:

- husky install
- npx pod-install

## Usage

Replace this:

```json
  // package.json

  "name": "my-library",
  "scripts:" { 
    // "start", "test", "build", etc
    "postinstall/preinstall/prepare/etc": "your && scripts && here"
  },
```

To this:

```json
  // package.json

  "name": "my-library",
  "scripts:" { 
    // "start", "test", "build", etc
    "postinstall/preinstall/prepare/etc": "npx --yes ignore-dependency-scripts \"your && scripts && here\""
  },
```

> Replace `your && scripts && here` by any post/pre install script that you want, like `husky install`, `npx pod-install` or both.

Now, when you run `yarn install` or `npm install` in `./my-library` the `your && scripts && here` will run normally. 

But, when you install `my-library` as a dependency (aka `yarn add url/to/my-library.git`) in another repository, the `your && scripts && here` will be ignored.

## How it works

Considering the [usage](#usage) example.

When `npx --yes ignore-dependency-scripts` is executed, it will check if exists a `.git` folder inside the root directory.

If `.git` folder exists, then you are installing the dependencies of `./my-library` directly.

If `.git` folder DOES NOT exists, then you are installing `my-library` as a dependency in another repository.

> I think that in future we can extend this package to use another strategies too. PRs will be welcome.

## Contribute

New features, bug fixes and improvements are welcome! For questions and suggestions, use the [issues](https://github.com/douglasjunior/ignore-dependency-scripts/issues).

<a href="https://www.patreon.com/douglasjunior"><img src="http://i.imgur.com/xEO164Z.png" alt="Become a Patron!" width="200" /></a>
[![Donate](https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=E32BUP77SVBA2)

## License

```
The MIT License (MIT)

Copyright (c) 2022 Douglas Nassif Roma Junior
```

See the full [license file](https://github.com/douglasjunior/ignore-dependency-scripts/blob/master/LICENSE).
