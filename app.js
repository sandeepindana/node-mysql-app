const express = require('express');
const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'db_node-mysql-app'
});

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('MySql Connected....');
});



const app = express();

// MySql Insert Query
app.get('/addpost', (req, res) => {
    let postObj = {
        title: 'Fifth',
        post: 'This is fifth post using nodejs and mysql',
        uid: 1
    };
    let sql = 'INSERT INTO `tbl_posts` SET ?';
    let query = db.query(sql, postObj, (err, result) => {
        // if (err) throw err;
        if (!err) {
            console.log(result.insertId);
            res.end('Inserted Successfully');
        } else {
            console.log(err);
        }

    });
});


// MySql Select Query
app.get('/posts', (req, res) => {
    let sql = 'SELECT * FROM `tbl_posts`';
    let query = db.query(sql, (err, result) => {
        // if (err) throw err;
        if (!err) {
            console.log(result);
            res.end(JSON.stringify(result));
        } else {
            console.log(err);
        }
    });
});

// MySql Select Query
app.get('/posts/:id', (req, res) => {
    var id = req.params.id;
    let sql = 'SELECT * FROM `tbl_posts` WHERE `post_id`=' + id;
    let query = db.query(sql, (err, result) => {
        // if (err) throw err;
        if (!err) {
            console.log(result);
            res.end(JSON.stringify(result[0]));
        } else {
            console.log(err);
        }
    });
});


// MySql Update Query
app.get('/updateposts/:id', (req, res) => {
    var id = req.params.id;
    var title = 'Sixth';
    var post = 'This is sixth post using nodejs and mysql';
    let sql = 'UPDATE `tbl_posts` SET `title`= "' + title + '", `post`= "' + post + '" WHERE `post_id`=' + id;
    let query = db.query(sql, (err, result) => {
        // if (err) throw err;
        if (!err) {
            console.log(result.affectedRows);
            res.end('Updated Successfully');
        } else {
            console.log(err);
        }
    });
});

// MySql Update Query
app.get('/deleteposts/:id', (req, res) => {
    var id = req.params.id;
    let sql = 'DELETE FROM `tbl_posts` WHERE `post_id`=' + id;
    let query = db.query(sql, (err, result) => {
        // if (err) throw err;
        if (!err) {
            console.log(result.affectedRows);
            res.end('Deleted Successfully');
        } else {
            console.log(err);
        }
    });
});


app.listen(3000, () => {
    console.log('Server running on port 3000');
});