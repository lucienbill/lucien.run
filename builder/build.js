const YAML = require('yaml')
const fs = require('fs')
const path = require('path')

const file = fs.readFileSync('redirects.yml', 'utf8')
const yamlData = YAML.parse(file)

const defaultLang = yamlData['default-lang']
const redirects = yamlData.redirects
const shortPaths = Object.keys(redirects)
const rootPath = path.join(process.cwd(), 'redirects');

// write all redirections (for is faster than foreach)
for (let index = 0; index < shortPaths.length; index++) {
    const shortPath = shortPaths[index]
    const redirect = redirects[shortPath];
    const lang = (!!redirect.lang ? redirect.lang : defaultLang)
    const filedir = `${rootPath}/${shortPath}`
    const filePath = `${filedir}/index.html`

    if (!fs.existsSync(filedir)){
        fs.mkdirSync(filedir, { recursive: true });
    }
    
    const fileContent = `<!DOCTYPE html>
<html lang="${lang}">
    <head>
    <meta charset="utf-8">
    <title>${redirect.title}</title>
    <meta property="title" content="${redirect.title}">
    <meta name="description" content="${redirect.description}">
    
    <meta property="og:title" content="${redirect.title}">
    <meta property="og:description" content="${redirect.description}">
    <meta http-equiv="Refresh" content="0; url='${redirect.url}" />
    <meta name="robots" content="noindex">
    </head>
</html>
`
    fs.writeFileSync(filePath, fileContent);
}

// write the index to the lucien.run/index.html
fs.copyFile(path.join(process.cwd(), 'index.html'), `${rootPath}/index.html`, (err) => {
    if (err) throw err;
    console.log('index.html was copied to redirects/index.html');
});