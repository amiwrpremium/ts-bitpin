/**
 * Release a new version of the package.
 *
 * Steps:
 * 1. open `./version` file and read the current version.
 * 2. validate the new version.
 * 3. update the `./version` file with the new version.
 * 4. update the `package.json` file with the new version.
 * 5. open `./src/index.ts` file and update the version in the comment.
 *
 * @Example
 * ```sh
 * $ yarn run new-version <new-version>
 *   # <new-version> - The new version to release.
 *   # e.g. yarn run version 1.0.0
 *   # This will update the version in the `./version` and `package.json` files.
 *   # This will also update the version in the comment in the `./src/index.ts` file.
 *   # This will not publish the package to npm.
 * ```
 */

import * as fs from 'fs';
import * as child_process from 'child_process';

/**
 * Validate the version.
 *
 * @param {string} version - The version to validate.
 *
 * @returns {void}
 *
 * @throws {Error} - If the version is not valid.
 */
function validateVersion(version: string): void {
  if (!version.match(/^\d+\.\d+\.\d+$/)) {
    throw new Error(`Invalid version: ${version}`);
  }
}

/**
 * Update the version in the `./version` file.
 *
 * @param {string} version - The new version to release.
 *
 * @returns {Promise<void>} - A promise that resolves when the version is updated.
 */
async function updateVersion(version: string): Promise<void> {
  await fs.promises.writeFile('./version', version);
}

/**
 * Update the version in the `package.json` file.
 *
 * @param {string} version - The new version to release.
 *
 * @returns {Promise<void>} - A promise that resolves when the version is updated.
 */
async function updatePackageJson(version: string): Promise<void> {
  const packageJson = JSON.parse(
    await fs.promises.readFile('./package.json', 'utf8'),
  );
  packageJson.version = version;
  await fs.promises.writeFile(
    './package.json',
    JSON.stringify(packageJson, null, 2) + '\n',
  );
}

/**
 * Update the version in the comment in the `./src/index.ts` file.
 * This is used to show the version in the documentation.
 *
 * @param {string} version - The new version to release.
 *
 * @returns {Promise<void>} - A promise that resolves when the version is updated.
 */
async function updateIndexTs(version: string): Promise<void> {
  const indexTs = await fs.promises.readFile('./src/index.ts', 'utf8');
  const newIndexTs = indexTs.replace(
    /@version \d+\.\d+\.\d+/,
    `@version ${version}`,
  );
  await fs.promises.writeFile('./src/index.ts', newIndexTs);
}

/**
 * Generate CHANGELOG.md.
 *
 * @returns {Promise<void>} - A promise that resolves when the changelog is generated.
 *
 * @remarks
 * This will generate the changelog for the new version.
 * This will run `yarn run changelog` to generate the changelog.
 */
async function generateChangelog(): Promise<void> {
  child_process.execSync('yarn run changelog', {
    stdio: 'inherit',
  });
}

/**
 * Prepare the commit for the new version.
 *
 * @param {string} version - The new version to release.
 * @param {string} message - The commit message.
 *
 * @returns {Promise<void>} - A promise that resolves when the commit is prepared.
 *
 * @remarks
 * This will stage the changes to the files.
 * This will also create a commit with the message "chore(release): <version>".
 */
async function commit(version: string, message?: string): Promise<void> {
  // stage the changes
  child_process.execSync(
    'git add ./version ./package.json ./yarn.lock ./src/index.ts',
    {
      stdio: 'inherit',
    },
  );

  let msg = `chore(release): ${version}`;
  if (message && message.trim() !== '') {
    msg += ` - ${message}`;
  }

  // commit the changes
  child_process.execSync(`git commit -m "${msg}"`, {
    stdio: 'inherit',
  });

  // create a tag
  child_process.execSync(`git tag v${version}`, {
    stdio: 'inherit',
  });

  // generate the changelog
  await generateChangelog();

  // delete the tag
  child_process.execSync(`git tag -d v${version}`, {
    stdio: 'inherit',
  });

  // add the changelog
  child_process.execSync('git add ./CHANGELOG.md', {
    stdio: 'inherit',
  });

  // amend the commit
  child_process.execSync('git commit --amend --no-edit', {
    stdio: 'inherit',
  });

  // create a tag
  child_process.execSync(`git tag v${version}`, {
    stdio: 'inherit',
  });
}

/**
 * Run the command.
 *
 * @returns {Promise<void>} - A promise that resolves when the command is done.
 */
async function run(): Promise<void> {
  const version = (await fs.promises.readFile('./version', 'utf8')).trim();
  validateVersion(version);

  const newVersion = process.argv[2];
  validateVersion(newVersion);

  await updateVersion(newVersion);
  await updatePackageJson(newVersion);
  await updateIndexTs(newVersion);

  const message = process.argv.slice(3).join(' ');
  await commit(newVersion, message);

  console.log(`Version updated: ${version} -> ${newVersion}`);
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
