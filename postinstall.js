const fse = require("fs-extra");
const path = require("path");
const topDir = __dirname;
fse.emptyDirSync(path.join(topDir, "public", "tinymce"));
fse.copySync(
  path.join(topDir, "node_modules", "tinymce"),
  path.join(topDir, "public", "tinymce"),
  { overwrite: true }
);

fse.emptyDirSync(path.join(topDir, "public", "geo-image"));
fse.copySync(
  path.join(topDir, "node_modules", "@tjernstad-utvikling"),
  path.join(topDir, "public", "geo-image"),
  {
    overwrite: true,
  }
);
