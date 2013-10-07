
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');

var app = express();
var ArticleProvider=require('./articleprovider-memory').ArticleProvider;
// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(require('stylus').middleware({src:__dirname+'/public'}));
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

var articleProvider=new ArticleProvider();

app.get('/',function(req,res) {
    articleProvider.findAll(function(error,docs) {
        res.render('index.jade',{
            title:'Blog',
            articles:docs

        });
    })
});
app.get('/users', user.list);

app.get('/blog/new',function(req,res) {
    res.render('blog_new.jade',{
        title:'new post'
        })
});

app.post('/blog/new',function(req,res){
    articleProvider.save({
       title:req.param('title'),
       body:req.param(('body'))
    },function(error,docs) {
        res.redirect('/');
    });
});
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
