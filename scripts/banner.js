const fs = require('fs');
const path = require('path');


const filePath = path.resolve(__dirname, '../package.json');
const fileStr = fs.readFileSync(filePath, 'utf8');
const config = JSON.parse(fileStr);


exports = `
/**
 * ${config.name}
 * @version ${config.version}
 * @author ${config.author}
 */`;