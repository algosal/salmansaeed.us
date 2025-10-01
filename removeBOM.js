const fs = require("fs");
const path = require("path");

const removeBOM = (filePath) => {
  let content = fs.readFileSync(filePath, "utf8");
  if (content.charCodeAt(0) === 0xfeff) {
    content = content.slice(1);
    fs.writeFileSync(filePath, content, "utf8");
    console.log("Removed BOM:", filePath);
  }
};

const walkDir = (dir) => {
  fs.readdirSync(dir).forEach((file) => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walkDir(fullPath);
    } else if (fullPath.endsWith(".js") || fullPath.endsWith(".jsx")) {
      removeBOM(fullPath);
    }
  });
};

walkDir("./src");
