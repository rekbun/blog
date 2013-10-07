/**
 * Created with JetBrains WebStorm.
 * User: rakeshkumar
 * Date: 10/5/13
 * Time: 4:57 PM
 * To change this template use File | Settings | File Templates.
 */
var articleCounter=1;
ArticleProvider=function(){};
ArticleProvider.prototype.dummyData=[];
ArticleProvider.prototype.findAll=function(callback){
  callback(null,this.dummyData);
};
ArticleProvider.prototype.findById=function(id,callback) {
    var result=null;
    for(var i=0;i<this.dummyData.length;i++) {
        if(this.dummyData[i]._id==id) {
            result=this.dummyData[i];
            break;
        }
    }
    callback(null,result);
};

ArticleProvider.prototype.save = function(articles,callback) {
    var article=null;
    if(typeof(articles.length)=="undefined") {
        articles=[articles];
    }
    for(var i=0;i<articles.length;i++) {
        article=articles[i];
        article._id=articleCounter++;
        article.created_at=new Date();

        if(article.comments==undefined) {
            article.comments=[];
        }

        for(var j=0;j<article.comments.length;j++) {
            article.comments[j].created_at=new Date();
        }
        this.dummyData[this.dummyData.length]=article;
    }
    callback(null,articles);
};

new ArticleProvider().save([{title:'post one ',body:'body one',comments:[{author:'bob',comment:'i like it'},{author:'lucas',comment:'i don\'t'}]},
    {title:'post two',body:'body two'},
    {title:'post three',body:'body three'}
   ],function(error,articles){});

exports.ArticleProvider=ArticleProvider;