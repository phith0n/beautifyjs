const escodegen = require('escodegen');
const ast = require('./ast');

const computedUnary = ['~', '!'];
exports.beautify = function (tree) {
    tree = ast.walk(tree, true, node => {
        if (node.type === 'Literal') {
            if (node.value === null) {
                node.raw = 'null'
            } else {
                node.raw = node.value.toString();
            }
            return node;
        }
    });
    tree = ast.walk(tree, true, node => {
        if (node.type === 'BinaryExpression' && ast.canEval(node)) {
            let result = eval(escodegen.generate(node, {
                format: escodegen.FORMAT_MINIFY
            }));
            return ast.buildLiteral(result)
        }
    });
    tree = ast.walk(tree, true, node => {
        if (node.type === 'UnaryExpression' && computedUnary.indexOf(node.operator) >= 0 && ast.canEval(node)) {
            let result = eval(escodegen.generate(node, {
                format: escodegen.FORMAT_MINIFY
            }));
            return ast.buildLiteral(result)
        }
    });
    tree = ast.walk(tree, false, node => {
        if (node.type === 'BinaryExpression' && node.operator === '-') {
            if (node.right.type === 'UnaryExpression' && node.right.operator === '-' && node.right.argument.type === 'Literal') {
                node.operator = '+';
                node.right = {
                    type: 'Literal',
                    value: node.right.argument.value,
                    raw: node.right.argument.raw
                }
                return node;
            }
        }
    });
    tree = ast.walk(tree, false, node => {
        if (node.type === 'MemberExpression') {
            if (node.property.type === 'Literal'
                && typeof node.property.value == 'string'
                && /^[a-zA-Z_]/.test(node.property.value)) {
                node.computed = false;
                node.property = {
                    type: 'Identifier',
                    name: node.property.value
                }
                return node;
            }
        }
    });
    return tree;
}
