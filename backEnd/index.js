const express = require('express')
const app = express()
const port = 8124
const Articles = require('./db').Articles;

app.get('/', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    console.log(req.query)
    if (req.query.name == "") { req.query.name = "无名" }
    if (req.query.name && req.query.score) {
        Articles.query({ "name": req.query.name }, (err, data) => {
            console.log("old:" + data[0], "new:" + req.query.score)
            if (data[0] && data[0].score > req.query.score) {
                res.redirect('http://114.115.247.94:8123/')
            } else {
                Articles.update({
                    "name": req.query.name,
                    "score": req.query.score
                }, (err, data) => {
                    res.redirect('http://114.115.247.94:8123/')
                });
            }
        })

    } else {
        Articles.all((err, articles) => {
            if (err) return next(err);
            res.send({ rk: articles })
        })
    }
})
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})