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

* `oj-bundle.include`: List of libraries to include in the bundle. You can add multiple libraries by separating them with a comma.
* `oj-bundle.executable`: Executable path to the `oj-bundle` tool.
