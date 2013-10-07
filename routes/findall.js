/**
 * Created with JetBrains WebStorm.
 * User: rakeshkumar
 * Date: 10/5/13
 * Time: 9:09 PM
 * To change this template use File | Settings | File Templates.
 */
exports.findall=function(req,res) {
    articleProvider.findAll(function(error,docs) {
        res.send(docs);
    });
};