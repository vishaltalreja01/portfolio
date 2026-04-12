import { favicons, config as faviconsConfig, FaviconFile, FaviconImage } from 'favicons';
import config from '../src/data/config';
import { mkdir, writeFile, rm, readdir } from 'fs/promises';
import { existsSync } from 'fs';

const FAVICONS_DIR = './public/favicons';
const ASTRO_FILE_PATH = './src/web/head/favicons.generated.astro';

const generateFavicons = () =>
  favicons(`.${config.meta.faviconPath}`, {
    ...faviconsConfig.defaults,
    path: '/favicons',
    appName: config.meta.title,
    appDescription: config.meta.description,
    appShortName: config.meta.title,
    lang: config.i18n.locale.code,
    start_url: '.',
    icons: {
      android: ['android-chrome-192x192.png', 'android-chrome-512x512.png'],
      windows: false,
      yandex: false,
      appleStartup: false,
      appleIcon: ['apple-touch-icon.png'],
      favicons: ['favicon-16x16.png', 'favicon-32x32.png', 'favicon.ico'],
    },
  });

const ensureFaviconsDir = () => mkdir(FAVICONS_DIR, { recursive: true });

const saveFaviconAsset = async (file: FaviconFile | FaviconImage) => {
  const filePath = `${FAVICONS_DIR}/${file.name}`;

  try {
    await writeFile(filePath, file.contents);
  } catch (error) {
    const errorCode = typeof error === 'object' && error && 'code' in error ? error.code : undefined;

    // On Windows these files can be briefly locked by Explorer, sync tools, or antivirus.
    // If the asset already exists, keep it and let the build continue.
    if ((errorCode === 'EPERM' || errorCode === 'EACCES') && existsSync(filePath)) {
      console.warn(`${file.name} is locked, keeping the existing file`);
      return;
    }

    throw error;
  }

  console.log(`${file.name} has been created successfully`);
};

const generateAstroFile = async (html: string[]) => {
  const comments = [
    '<!-- This file is auto-generated. Do not edit it manually. -->\n',
    '<!-- In order to apply changes to it, adjust configuration object in generate-favicons.ts script and run it -->\n',
  ];

  const formattedHtml = html.map((line) => line.replace('>', '/>')).join('\n');
  const fileContents = [...comments, formattedHtml, '\n'];

  try {
    await writeFile(ASTRO_FILE_PATH, fileContents);
  } catch (error) {
    const errorCode = typeof error === 'object' && error && 'code' in error ? error.code : undefined;

    // Same Windows file-lock issue can affect the generated Astro head partial.
    if ((errorCode === 'EPERM' || errorCode === 'EACCES') && existsSync(ASTRO_FILE_PATH)) {
      console.warn(`${ASTRO_FILE_PATH} is locked, keeping the existing file`);
      return;
    }

    throw error;
  }

  console.log(`${ASTRO_FILE_PATH} has been updated successfully`);
};

const cleanupStaleFavicons = async (generatedAssets: Array<FaviconFile | FaviconImage>) => {
  const generatedFileNames = new Set(generatedAssets.map((asset) => asset.name));
  const existingFileNames = await readdir(FAVICONS_DIR);

  await Promise.all(
    existingFileNames
      .filter((fileName) => !generatedFileNames.has(fileName))
      .map(async (fileName) => {
        try {
          await rm(`${FAVICONS_DIR}/${fileName}`, { force: true, maxRetries: 5, retryDelay: 200 });
        } catch (error) {
          console.warn(`Could not remove stale favicon asset: ${fileName}`, error);
        }
      })
  );
};

const main = async () => {
  const { images, files, html } = await generateFavicons();
  const generatedAssets = [...images, ...files];

  await ensureFaviconsDir();

  await Promise.all(generatedAssets.map(saveFaviconAsset));
  await cleanupStaleFavicons(generatedAssets);

  await generateAstroFile(html);
};

main();
