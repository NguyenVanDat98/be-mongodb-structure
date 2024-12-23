const fs = require("fs");
const path = require("path");

const dir = path.join(__dirname, "dist/migrations");

// Đổi đuôi file .js thành .cjs
const renameToCJS = (folder) => {
  fs.readdirSync(folder).forEach((file) => {
    const fullPath = path.join(folder, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      renameToCJS(fullPath);
    } else if (file.endsWith(".js")) {
      fs.renameSync(fullPath, fullPath.replace(/\.js$/, ".cjs"));
    }
  });
};

renameToCJS(dir);
