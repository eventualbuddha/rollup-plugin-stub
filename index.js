import MagicString from 'magic-string';
import { attachScopes, createFilter } from 'rollup-pluginutils';
import { parse } from 'acorn';

export default function stub(options={}) {
  const filter = createFilter(options.include, options.exclude);

  return {
    transform(code, id) {
      if (!filter(id)) return null;

      let ast;

      try {
        ast = parse(code, {
          ecmaVersion: 6,
          sourceType: 'module'
        });
      } catch ( err ) {
        err.message += ` in ${id}`;
        throw err;
      }

      const sourceMap = options.sourceMap !== false;
      const magicString = new MagicString(code);
      const bindings = [];

      ast.body.forEach(node => {
        if (node.type === 'ExportNamedDeclaration') {
          // Handle null declarations
          // Example: `export { varName as default };`
          if (node.declaration == null) {
          	return;
          }
          // Collect binding names and ensure we can reassign them.
          if (node.declaration.type === 'VariableDeclaration') {
            if (node.declaration.kind === 'const') {
              magicString.overwrite(
                node.declaration.start,
                node.declaration.start + node.declaration.kind.length,
                'var'
              );
            }
            node.declaration.declarations.forEach(declaration => {
              bindings.push(declaration.id.name);
            });
          } else if (node.declaration.type === 'FunctionDeclaration') {
            bindings.push(node.declaration.id.name);
          }
        }
      });

      bindings.forEach(binding => {
        magicString.append(
          `\nvar __original_${binding}, ${binding}_stubbed;` +
          `\nexport function stub_${binding}(__stubValue__) { if (!${binding}_stubbed) { __original_${binding} = ${binding}; ${binding}_stubbed = true; } ${binding} = __stubValue__; }` +
          `\nexport function reset_${binding}() { if (${binding}_stubbed) { ${binding}_stubbed = false; ${binding} = __original_${binding}; } }`
        );
      });

      code = magicString.toString();
      const map = sourceMap ? magicString.generateMap() : null;

      return { code, map };
    }
  }
}


