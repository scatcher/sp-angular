// @dgeni developers: Why do we need canonical-path?
var path = require('canonical-path');
//var bower = 'app/bower_components/';
var basePath = path.resolve(__dirname, '..');

var basePackage = require('dgeni-packages/ngdoc');
var pkg = require('../package.json');

//var examplesPackage = require('dgeni-packages/examples');

module.exports = function (config) {
//    config.set('currentVersion', process.env.DOC_VERSION || 'nightly');

    // Use ngdocPackage
    config = basePackage(config);
//    config = examplesPackage(config);

    // Set logging level
    config.set('logging.level', 'debug');

    config.prepend('rendering.templateFolders', [
        path.resolve(__dirname, 'templates')
    ]);

    config.set('currentVersion', pkg.version);

    config.set('basePath', __dirname);
    config.set('source.projectPath', '.');
    config.set('rendering.outputFolder', 'docs/app');
    config.set('rendering.contentsFolder', 'docs');
    config.set('processing.stopOnError', false);


    config.set('processing.api-docs', {
        outputPath: 'api/${docType}/${name}/index.md',
        path: 'api/${docType}/${name}/',
        moduleOutputPath: 'api/module/${name}/index.md',
        modulePath: 'api/module/${name}/'
    });

    config.append('rendering.filters', [
        require('./filters/capital')
    ]);

    config.set('source.files', [
//        { pattern: 'app/scripts/services/modal_srvc.js', basePath: basePath }
        { pattern: 'app/scripts/services/*.js', basePath: basePath }
    ]);

    config.append('processing.inlineTagDefinitions', [
        require('./inline-tag-defs/link')
    ]);

    config.append('processing.tagDefinitions', require('./tag-defs'));

    //Don't conflict with the jekyll tags
//    config.set('rendering.nunjucks.config.tags', {
//        blockStart: '<@',
//        blockEnd: '@>',
//        variableStart: '<$',
//        variableEnd: '$>',
//        commentStart: '<#',
//        commentEnd: '#>'
//    });

    // Add your own templates to render docs
//    config.prepend('rendering.templateFolders', [
//        path.resolve(basePath, 'examples')
////        path.resolve(basePath, 'templates')
//    ]);

//    // You can specifiy which tempate should be used based on a pattern.
//    // Currently we just use one template and don't need a pattern
//    config.prepend('rendering.templatePatterns', [
//        'index.js'
////        'common.template.html'
//    ]);

//    // This tells dgeni where to look for stuff
//    config.set('source.projectPath', path.resolve(basePath, '..'));

//    config.set('source.files', [
//        { pattern: 'app/scripts/services/*.js', basePath: path.resolve(__dirname, '..') },
//        { pattern: '**/*.ngdoc', basePath: path.resolve(basePath, 'content') }
//    ]);
//    config.set('source.files', [
//        { pattern: 'app/scripts/services/modal_srvc.js', basePath: path.resolve(basePath,'..') }
//    ]);
//    config.set('source.files', [
//        { pattern: 'app/scripts/services/modal_srvc.js', basePath: basePath }
////        { pattern: 'app/scripts/services/*.js', basePath: path.resolve(basePath,'..') }
//    ]);

    // Our generated docs will be written here:
    // @dgeni developers: Why is both (outputFolder and contentsFolder) needed?

    config.append('processing.processors', [
        require('./processors/latest-version'),
        require('./processors/keywords'),
        require('./processors/pages-data'),
        require('./processors/index-page'),
        require('./processors/version-data'),
        require('./processors/jekyll')
    ]);

    return config;
};
