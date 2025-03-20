# oj-bundle

This project is a vscode extension that integrates the `oj-bundle` tool from [verification-helper](https://github.com/online-judge-tools/verification-helper) and a typescript version of [CppCodeCompressor](https://github.com/Ruakker/CppCodeCompresser/). It aims to help competitive programmers to compress their code and generate a bundle for submission.

## Features

## Requirements

Install `verification-helper`:

```bash
$ pip3 install online-judge-verify-helper
```

## Extension Settings

This extension contributes the following settings:

* `oj-bundle.args`: Space seperated additional flags passed to oj-bundle. Example '-I path/to/your/library1 -I path/to/your/library2'
* `oj-bundle.executable`: Executable path to the `oj-bundle` tool.
