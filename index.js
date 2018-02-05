var Metalsmith      = require('metalsmith')
var collections     = require('metalsmith-collections')
var layouts         = require('metalsmith-layouts')
var markdown        = require('metalsmith-markdown')
var excerpt         = require('metalsmith-better-excerpts')
var ignore          = require('metalsmith-ignore')
var htmlMinifier    = require("metalsmith-html-minifier")

Metalsmith(__dirname)
  .metadata({
    sitename: 'bukkitoks.lt',
    siteurl: 'https://modest-nightingale-b38d67.netlify.com/',
    // siteurl: 'http://localhost:3000/',
    description: 'It\'s about saying »Hello« to the world.',
    phone: '+370 620 60 620',
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
      sortBy: 'eiliskumas'
    },
    lektorius: {
      pattern: 'lektorius/ignore/*.html',
      sortBy: 'eiliskumas'
    },
    seminaras: {
      pattern: 'seminaras/*.html'
    }
  }))
  // .use(function (files, ms, done) {
  //   // console.log(ms._metadata.collections.lektorius[0].contents.toString())
  //   console.log('files', files)
  //   done()
  // })
  .use(layouts({ // https://github.com/ismay/metalsmith-layouts
    engine: 'pug',
    directory: 'pug',
    pretty: false // 'false' minifies HTML
    // partials: '' //directory for the partials (optional)
  }))
  .use(ignore([
    'lektorius/ignore/*'
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
