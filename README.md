### Hexlet tests and linter status:
[![Actions Status](https://github.com/Staffelhof/frontend-project-46/workflows/hexlet-check/badge.svg)](https://github.com/Staffelhof/frontend-project-46/actions)

[![Maintainability](https://api.codeclimate.com/v1/badges/125d1e945e21014bbca2/maintainability)](https://codeclimate.com/github/Staffelhof/frontend-project-46/maintainability)

[![Test Coverage](https://api.codeclimate.com/v1/badges/125d1e945e21014bbca2/test_coverage)](https://codeclimate.com/github/Staffelhof/frontend-project-46/test_coverage)

# Diff application

This is simple diff application, that takes two files and returns difference between them.
Supported:

File types:  **JSON** and **YAML**

Formats: _plain_, _stylish_ and _json_

### Here is some examples for your information:

Plain Json
[![Plain json](https://asciinema.org/a/WAV4kFcFfHGqRqcKDtsM6hGFK.png)](https://asciinema.org/a/WAV4kFcFfHGqRqcKDtsM6hGFK)

Plain yaml
[![Plain yaml](https://asciinema.org/a/vGyOpXpTbnKyi3rnXTKmaDsTo.png)](https://asciinema.org/a/vGyOpXpTbnKyi3rnXTKmaDsTo)
Nested json and yaml - stylish
[![Nested json and yaml - stylish](https://asciinema.org/a/yAR8OmonvX1JjQpxcjwjhcMHz.png)](https://asciinema.org/a/yAR8OmonvX1JjQpxcjwjhcMHz)
Nested json and yaml - plain text
[![Nested json and yaml - plain text](https://asciinema.org/a/LIUWjBoFLqxCQ28oIS3XP5QgT.png)](https://asciinema.org/a/LIUWjBoFLqxCQ28oIS3XP5QgT)
Nested json and yaml - json
[![Nested json and yaml - json](https://asciinema.org/a/zIqHZXGxxpPVPCRM188YPfJG0.png)](https://asciinema.org/a/zIqHZXGxxpPVPCRM188YPfJG0)

### Min specs:

Node.js v18.12.0. with any supported OS.

### Installing instructions:

```shell
git clone https://github.com/Staffelhof/frontend-project-46.git && cd frontend-project-46 && make install && npm link
```

and use gendiff file1 file2