var express=require('express');
var app=express();
var bodyparser=require('body-parser');
var request=require('request');



app.use(express.static("public"));

app.set("view engine","ejs");

app.get("/",function(req,res){
	res.render("search");
});


app.get("/results",function(req,res){
	
	var query=req.query.search;
	request("http://www.omdbapi.com/?apikey=abf86467&s="+query,function(error,response,body){
	if(!error && response.statusCode==200){
	var data=JSON.parse(body);
		if (data.Response.toLowerCase() === "false") {
        res.render("not-found");
      }
		else
		{
			console.log(data);
		res.render("results",{data:data});
		}
	}
	
	
	});
});


app.get("/details/:title",function(req,res){
	
	var query2=req.params.title;
	
	request("http://www.omdbapi.com/?apikey=abf86467&t="+query2,function(error,response,body){
	if(!error && response.statusCode==200){
	var data2=JSON.parse(body);
		console.log(data2);
		res.render("movie-detail",{data2:data2});
	}
	
	});
	
});



app.listen(process.env.PORT,process.env.IP,function(){
	console.log("movie search engine started!!");
});