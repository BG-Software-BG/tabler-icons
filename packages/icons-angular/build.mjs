import { buildJsIcons } from '../../.build/build-icons.mjs';
import prettier from '@prettier/sync';

const componentTemplate = ({
  _, __, namePascal, children
}) => {
  const nodes = JSON.stringify(Array.isArray(children) ? children : [children]);
  const prettyNodes = prettier.format(nodes, {
    singleQuote: true,
    printWidth: 120,
    parser: 'babel'
  })

  return `import { TablerIcon } from '../types';

const ${namePascal}: TablerIcon = ${prettyNodes}`;
}

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
