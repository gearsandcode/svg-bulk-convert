# SVG Bulk Converter

Script to quickly convert all SVGs in a folder.

## This is a work in progress
Lots of credit to [kynatro](https://github.com/kynatro/svg-bulk-outliner) for about 99% of the work here.
I was having trouble finding an easy way to loop over files in a dir with Inscape and their project helped a lot.
I hope you find this useful. Leave a comment and maybe I'll publish it once it's cleaned up... or maybe kynatro wants to create a whole set of Inkscape utils.

## Pre-requisites
This script uses Inkscape to process the SVG files, so it must be installed first. Download Inkscape at:

https://inkscape.org/pt-br/release/inkscape-1.0/

## Installation and usage
Install this package as a global module:

```sh
npm install -g svg-bulk-outliner
```

Once you have completed installation, simply run the command below from the folder containing SVG files you wish to convert:

```sh
svg-bulk-outline
```

The script will recursively parse through the folder and convert text to outlines on any SVG files it finds. By default the files will be overwritten with the outlined version. See [Parameters](#parameters) for additional configuration options if you want to save a copy instead of overwriting.

## Parameters

Optional parameters to customize the conversion. All example output assumes the following input files:

```sh
input-file1.svg
input-file2.svg
input-file3.svg
```

### `--cwd`
Specify the working directory to recurse through. By default, `svg-bulk-convert` will process through the current working directory.

```sh
svg-bulk-convert --cwd="~/Desktop"
```

### `--dry-run`
Don't actually modify the files, but show an output of what the results should look like on the set. Will not actually run `inkscape` against the files, but its useful to check that all the files you want processed are renamed properly and included in your run.

```sh
svg-bulk-convert --dry-run
```

#### Expected output:

```sh
foo-input-file1.svg
foo-input-file2.svg
foo-input-file3.svg
```
