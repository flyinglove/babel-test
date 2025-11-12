import { readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const currentDir = dirname(fileURLToPath(import.meta.url));
const dataFile = join(currentDir, '../../data/default-page.json');

type SchemaNode = Record<string, unknown>;

export default defineEventHandler(async () => {
  const fileContent = await readFile(dataFile, 'utf-8');
  const schema = JSON.parse(fileContent) as SchemaNode[];
  return schema;
});
