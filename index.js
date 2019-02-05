var Metalsmith = require('metalsmith')
var collections = require('metalsmith-collections')
var layouts = require('metalsmith-layouts')
var markdown = require('metalsmith-markdown')
var excerpt = require('metalsmith-better-excerpts')
var ignore = require('metalsmith-ignore')
var htmlMinifier = require('metalsmith-html-minifier')

Metalsmith(__dirname)
  .metadata({
    sitename: 'bukkitoks.lt',
    siteurl: 'https://www.bukkitoks.lt/',
    // siteurl: 'http://localhost:3000/',
    description: 'It\'s about saying »Hello« to the world.',
    phone: '+370 620 10 620',
    email: 'rimvydas@bukkitoks.lt'
  })
  .source('src')
  .destination('build')
  .clean(true)
  .use(markdown())
  .use(excerpt({
    moreRegExp: /\s*<!--\s*more\s*-->/i,
    pruneLength: 40000,
    pruneString: ' '
  }))
  .use(collections({  // Used for navigation purposes
    mokymai: {
      pattern: 'mokymai/*.html',
      sortBy: 'eiliskumas',
      refer: false
    },
    lektorius: {
      pattern: 'lektorius/*.html',
      refer: false
    },
    seminaras: {
      pattern: 'seminaras/*.html',
      refer: false
    }
  }))
  .use(layouts({ // https://github.com/ismay/metalsmith-layouts
    engine: 'pug',
    directory: 'pug',
    pretty: false // 'false' minifies HTML
    // partials: '' //directory for the partials (optional)
  }))
  .use(ignore([
    'seminaras/*'
  ]))
  .use(htmlMinifier({
    minifierOptions: {
      removeComments: true,
      removeAttributeQuotes: false
    }
  }))
  .build(function (err) {
    if (err) throw err
  })
