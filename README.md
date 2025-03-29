# oj-bundle

This project is a vscode extension that integrates the `oj-bundle` tool from [verification-helper](https://github.com/online-judge-tools/verification-helper) and a typescript version of [CppCodeCompressor](https://github.com/Ruakker/CppCodeCompresser/). It aims to help competitive programmers to compress their code and generate a bundle for submission.

## Features

This extension provides a command `oj-bundle.bundle-and-paste` that compresses the code and generates a bundle for submission. The bundle is then copied to the clipboard.

You can invoke the command by pressing `Ctrl+Shift+P` and typing `oj-bundle.bundle-and-paste`. Or you can use the shortcut `Ctrl+Alt+S` or `Cmd+Alt+S` (on macOS) to invoke the command directly.

## Requirements

Install `verification-helper`:

```bash
pip3 install online-judge-verify-helper
```

## Extension Settings

This extension contributes the following settings:

* `oj-bundle.args`: Space seperated additional flags passed to oj-bundle. Example '-I path/to/your/library1 -I path/to/your/library2'
* `oj-bundle.executable`: Executable path to the `oj-bundle` tool.
