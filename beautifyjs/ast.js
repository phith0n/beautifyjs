
const walk = function (ast, stopOnModify, fn) {
    for (let i in ast) {
        let child = ast[i];
        if (child && typeof child.type === 'string') {
            let newNode = fn(child);
            if (newNode) {
                ast[i] = newNode;
                if (!stopOnModify) {
                    walk(ast[i], stopOnModify, fn);
                }

            } else {
                walk(child, stopOnModify, fn);
            }

        } else if (child instanceof Array) {
            for (let j in child) {
                let childchild = child[j];
                let newNode = fn(childchild);
                if (newNode) {
                    child[j] = newNode;
                    if (!stopOnModify) {
                        walk(child[j], stopOnModify, fn);
                    }

                } else {
                    walk(childchild, stopOnModify, fn);
                }
            }
            ast[i] = child;
        }
    }

    return ast;
}

const canEval = function (node) {
    let queue = [node];
    while (queue.length > 0) {
        let node = queue.shift();
        if (node.type === 'Literal') {
            // do nothing
        } else if (node.type === 'UnaryExpression') {
            queue.push(node.argument);
        } else if (node.type === 'BinaryExpression') {
            queue.push(node.left);
            queue.push(node.right);
        } else {
            return false;
        }
    }
    return true;
}

module.exports = {
    walk,
    canEval
};
