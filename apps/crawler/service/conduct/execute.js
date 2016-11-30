/**
 * Created by Administrator on 2016/9/21.
 */
exports.select=function(o){
    var sql='select user_name from users where user_id=? and user_name =?';

    mysql.doSql(sql,['1']);
};