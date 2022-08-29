const { ConcatSource } = require('webpack-sources')

class FooterPlugin {
    constructor(options){
        this.options = options
    }

    apply(compiler){
        compiler.hooks.compilation.tap("FooterPlugin", compilation => {
            compilation.hooks.processAssets.tap("FooterPlugin", 
            () => {
                for (const chunks of compilation.chunks) {
                    console.log("chunks.files",chunks.files);
                    for (const file of chunks.files) {
                        const comment = `/* ${this.options.banner} */`;
    
                        compilation.updateAsset(file, old => new ConcatSource(old, '\n', comment))
                    }
                }
            })
        })
    }
}

module.exports = FooterPlugin;
