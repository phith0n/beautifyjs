const { program } = require('commander');
const fs = require('fs');
const esprima = require('esprima');
const escodegen = require('escodegen');
const { beautify } = require('./beautify');

program
    .version('0.1.0')
    .usage('<input> [output] [options]')
    .description(`Example: 
 - node beautifyjs input.js
 - node beautifyjs input.js output.js
 - node beautifyjs input.js --minify`)
    .arguments('<input> [output]')
    .option('-m, --minify', 'make the output file minifier')
    .action((input, output, options, command) => {
        if (!fs.existsSync(input)) {
            command.help();
        }

        let code = fs.readFileSync(input).toString();
        let tree = esprima.parseScript(code);
        tree = beautify(tree);
        code = escodegen.generate(tree, {
            format: options.minify ? escodegen.FORMAT_MINIFY : escodegen.FORMAT_DEFAULTS,
        });
        if (output) {
            fs.writeFileSync(output, code);
        } else {
            console.log(code);
        }
    })

program.parse();
