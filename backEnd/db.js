const sqlite3 = require('sqlite3').verbose();

const dbname = 'mysqlite';
// 创建并连接一个数据库
const db = new sqlite3.Database(dbname)

// 创建一个articles表
db.serialize(() => {
    const sql = `
        CREATE TABLE IF NOT EXISTS articles
        (name TEXT primary key,score integer)
    `;
    // 如果没有articles表,创建一个
    db.run(sql);
});

// Articles API
class Articles {
    // 获取所有文章
    static all(cb) {
    	// 使用sqlite3的all
        db.all('SELECT * FROM articles order by score desc;', cb);
    }
    // 添加一个条文章记录
    static create(data, cb) {
        const sql = `
                INSERT INTO 
                articles(name,score) 
                VALUES(?,?);
                DO UPDATE SET name=:name,score=:score;`;
        db.run(sql, data.name, data.score, cb);
    }
    // 更新一篇文章数据
    static update(data, cb) {
        const sql = `
        insert or replace into articles 
        ( name, score ) 
        VALUES (?, ?);
        `
        db.run(sql, data.name, data.score, cb)
    }
        // 添加一个条文章记录
    static query(data, cb) {
        const sql = `
                SELECT * FROM articles WHERE name=?;`;
        db.all(sql, data.name, cb);
    }
}
module.exports.Articles = Articles;
