# A simple JavaScript beautify tool

This tool will do the following things:

- Beautify the JavaScript code
- Convert hexadecimal number to decimal number, such as `0x04d2` to `1234`
- Merge simple expressions, such as `1 + 2 + 3 + 4` to `10`
- Make complex string simpler, such as `"\150\145\154\154\157"` to `"hello"`  
- Convert computed property getting to uncomputed property getting, such as `console['log']` to `console.log`

## Usage

```
λ node beautifyjs -h
Usage: beautifyjs <input> [output] [options]

Example:
 - node beautifyjs input.js
 - node beautifyjs input.js output.js
 - node beautifyjs input.js --minify

Options:
  -V, --version  output the version number
  -m, --minify   make the output file minifier
  -h, --help     display help for command
```
