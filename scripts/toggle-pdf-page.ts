import { rename } from 'fs/promises';
import { existsSync } from 'fs';

const source = process.argv[2];
const destination = process.argv[3];

if (!source || !destination) {
  throw new Error('Usage: ts-node scripts/toggle-pdf-page.ts <source> <destination>');
}

const main = async () => {
  const sourceExists = existsSync(source);
  const destinationExists = existsSync(destination);

  if (sourceExists && destinationExists) {
    throw new Error(
      `Cannot move ${source} -> ${destination} because both paths exist. Remove or rename one of them and try again.`,
    );
  }
  if (sourceExists) {
    await rename(source, destination);
    console.log(`Moved ${source} -> ${destination}`);
    return;
  }

  if (destinationExists) {
    console.log(`Skipping move because ${destination} already exists`);
    return;
  }

  throw new Error(`Neither ${source} nor ${destination} exists`);
};

main();
