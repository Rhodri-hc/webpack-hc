const semver = require("semver");

module.exports = function checkNode(minNodeVersion) {
    // 获取Node版本
    const nodeVersion = semver.valid(semver.coerce(process.version));

    return semver.satisfies(nodeVersion, '>=' + minNodeVersion);
}