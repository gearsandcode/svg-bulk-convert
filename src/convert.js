"use strict";

const glob = require("glob");
const path = require("path");
const os = require("os");
const { spawnSync } = require("child_process");
const { argv } = require("yargs");
const { isInkscapeInstalled } = require("./helpers");
const {
  DEFAULT_CWD,
  DEFAULT_PATTERN,
  FILE_EXTENSION,
  INKSCAPE_CMD,
} = require("./constants.js");

const model = {
  default: outline,
  outline,
};

/**
 * Outline text in SVG files
 *
 * Globs all SVG files in cwd and iterates through them to be converted with Inkscape.
 *
 * @requires glob
 * @requires path
 *
 * @param {Object} options
 * 	 @param {String} cwd Optional working directory to process through. Defaults to DEFAULT_CWD
 *   @param {Boolean} dryRun Optionally do a dry run to verify input and output set
 */
function outline(options = {}) {
  const {
    cwd = "../packages/svg",
    dryRun = false,
    pattern = DEFAULT_PATTERN,
    conversions = ["png", "pdf"],
    outputPath = "../packages/",
  } = options;
  let resolvedCwd = path.resolve(cwd.replace(/^~/, os.homedir()));
  let errors = [];

  if (dryRun) {
    console.log(`\x1b[33m🔬 DRY RUN! FILES WILL NOT BE CONVERTED 🔬\n\x1b[0m`);
  } else {
    console.log(`\x1b[34mConverting files in ${cwd}...\n\x1b[0m`);
  }

  console.log(cwd);

  glob(pattern, { cwd: resolvedCwd }, (err, files) => {
    console.log(cwd);
    conversions.forEach((convertTo) => {
      files.forEach((file) => {
        const input = path.join(resolvedCwd, file);
        const dirname = path.dirname(file);
        const output = path.join(
          outputPath + convertTo,
          `${path.basename(file, FILE_EXTENSION)}.${convertTo}`
        );

        const params = [`--export-type=${convertTo}`];

        params.push(`--export-filename=${output}`);

        params.push("--export-width=256");

        const msg = `${file} → ${output}`;

        process.stdout.write(msg);

        if (dryRun) {
          process.stdout.write(" 🧪\n");
        } else {
          const response = spawnSync(INKSCAPE_CMD, [...params, input]);
          process.stdout.write(" ✅\n");
        }
      });

      if (dryRun) {
        console.log(
          `\n\x1b[32m\x1b[1mSvg conversion to ${convertTo} dry-run complete! ${files.length} files would have been processed.\x1b[0m`
        );
      } else {
        console.log(
          `\n\x1b[32m\x1b[1mSvg conversion to ${convertTo} complete! ${
            files.length - errors.length
          } files processed successfully.\x1b[0m`
        );
      }

      if (errors.length) {
        console.log(
          `\n\x1b[31m\x1b[1m${errors.length} files could not be processed:\x1b[0m`
        );
        errors.forEach((error) => {
          console.log(`\n\x1b[31mFile: ${error.file}\x1b[0m`);
          console.log(error.err);
        });
      }
    });
  });
}

// Execute outline() when executed directly
if (require.main === module) {
  if (isInkscapeInstalled()) {
    outline({
      cwd: argv.cwd,
      dryRun: argv.dryRun,
      convertTo: argv.convertTo,
      outputPath: argv.outputPath,
    });
  } else {
    console.log("Inkscape could not be found!");
    console.log(
      "Please download and install Inkscape at https://inkscape.org/pt-br/release/inkscape-1.0/"
    );
  }
}

exports.module = model;
