// https://github.com/lerna/lerna/issues/1663#issuecomment-559010254

const fs = require("fs");

try {
  const lernaPkgNames = process.argv.slice(2);
  const packageJson = JSON.parse(fs.readFileSync("package.json", "utf-8"));
  let numPruned = 0;

  if (packageJson.dependencies != null) {
    for (const pkgName in packageJson.dependencies) {
      if (lernaPkgNames.includes(pkgName)) {
        delete packageJson.dependencies[pkgName];
        numPruned++;
      }
    }
  }

  if (packageJson.devDependencies != null) {
    for (const pkgName in packageJson.devDependencies) {
      if (lernaPkgNames.includes(pkgName)) {
        delete packageJson.devDependencies[pkgName];
        numPruned++;
      }
    }
  }

  if (numPruned > 0) {
    fs.writeFileSync("package.json", JSON.stringify(packageJson, null, 2));
  }
} catch (error) {
  console.error(error);
}
