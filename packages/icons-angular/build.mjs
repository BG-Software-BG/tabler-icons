import { buildJsIcons } from '../../.build/build-icons.mjs';
import prettier from '@prettier/sync';

const componentTemplate = ({ type, __, namePascal, children }) => {
  const nodes = JSON.stringify(Array.isArray(children) ? children : [children]);

  return prettier.format(
    `import { TablerIcon } from '../types';

    const ${namePascal}: TablerIcon = {
      type: '${type}',
      nodes: ${nodes}
    };`, { singleQuote: true, printWidth: 120, parser: 'typescript' });
};

const indexItemTemplate = ({
                             name,
                             namePascal
                           }) => `export * as ${namePascal} from './${namePascal}';`;

const aliasTemplate = ({ fromPascal, toPascal }) => `export * as Icon${fromPascal} from './icons/Icon${toPascal}';\n`;

buildJsIcons({
  name: 'icons-angular',
  componentTemplate,
  indexItemTemplate,
  aliasTemplate,
  indexFile: 'index.ts',
  pascalCase: true,
  extension: 'ts',
  pretty: false
});
