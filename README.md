# Ignore dependency post/pre install scripts

[![License MIT](https://img.shields.io/badge/licence-MIT-blue.svg)](https://github.com/douglasjunior/ignore-dependency-scripts/blob/master/LICENSE)
[![npm version](https://img.shields.io/npm/v/ignore-dependency-scripts.svg)](https://www.npmjs.com/package/ignore-dependency-scripts)
[![npm downloads](https://img.shields.io/npm/dt/ignore-dependency-scripts.svg)](#usage)

Script to prevent dependencies to execute post/pre install scripts when installed directly from git.

## Why?

Sometimes when working with private projects, we have the need to reuse some parts of our code in many projects. But, we know that maintaining a private `npm registry` is a pain and requires a lot of attention.

So, the easiest way, is to install our private repo as a dependency directly from git. But, this comes with some caveats like the inability to use `.npmignore` and the **lack of an option to "prevent pre/post scripts" when installed as a dependency.**

Some examples of scripts that we might want to prevent from running when installed as a dependency is:

- husky install
- npx pod-install

## Usage

```json
  "postinstall/preinstall/prepare/etc": "npx ignore-dependency-scripts \"your && scripts && here\""
```

TODO: complete

## How it works

Check if exists `.git` folders.

TODO: complete

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
