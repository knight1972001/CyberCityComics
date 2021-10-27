import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch'
import ejs from 'ejs';
import dotenv from 'dotenv';

const app = express();
dotenv.config();

app.use(cors());
app.use(express.static('public'));
app.engine('html', ejs.renderFile);
app.engine('html', ejs.renderFile);
app.set('view engine', 'ejs');

var numPage=0;
var maxPage=2533;

app.get("/", async (req, res) => {
    // res.sendFile(__dirname + '/public/index.html')
    let link="http://xkcd.com/info.0.json";
    const response = await fetch(link);
    const data  = await response.json();
    numPage=data.num;
    maxPage=data.num;
    let random=Math.abs(Math.floor(Math.random()* (maxPage - 1)+1));
    let prev=numPage-1;
    let next=numPage+1;

    if(prev <= 0){
        prev=1;
    }
    if(next > maxPage){
        next=maxPage;
    }
    res.render("index.html", {
        data: data,
        prev: prev,
        next: next,
        random: random,
        maxPage: maxPage
    });
});

app.get("/:id", async (req, res) => {
    numPage=req.params.id;
    if(numPage<=0){
        numPage=0;
    }
    let link;
    if(numPage > 0){
        link="https://xkcd.com/"+numPage+"/info.0.json";
    }else{
        link="http://xkcd.com/info.0.json";
    }
    const response = await fetch(link);
    if(response.status==404){
        res.status(404).redirect("/error/404");
    }else{
        const data  = await response.json();
        numPage=data.num;
        let random=Math.abs(Math.floor(Math.random()* (maxPage - 1)+1));
        let prev=parseInt(numPage) - 1;
        let next=parseInt(numPage) + 1;
        if(prev <= 0){
            prev=1;
        }
        if(next > maxPage){
            next=maxPage;
        }   

        res.render("index.html", {
            data: data,
            prev: prev,
            next: next,
            random: random,
            maxPage: maxPage
        });
    }
});

app.get("/comics/:id", async (req, res) => {
    let pageNum=req.params.id;
    let link;
    if(pageNum > 0){
        link="https://xkcd.com/"+pageNum+"/info.0.json";
    }else{
        link="http://xkcd.com/info.0.json";
    }
    const response = await fetch(link);
    const data  = await response.json();
    res.json(data);
});

app.get("/error/404", (req,res)=>{
    res.render("404.html");
})

app.get("*", (req,res)=>{
    res.render("404.html")
})

const port=process.env.PORT;
app.listen(port, ()=>{
    console.log('listening on port at '+ port);
});