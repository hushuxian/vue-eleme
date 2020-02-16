
var config = require("../config")
if(!process.env.NODE_ENV){
	process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}

var path = require("path")
var express = require("express")
var webpack = require("webpack")
var proxyMiddleware = require("htpp-proxy-middleware")
var webpackConfig = require("./webpack.dev.conf")


var port = process.env.PORT || config.env.port

var app = express()

const data = require('../src/mock/data.json')
const goods = data.goods
const ratings = data.ratings
const seller = data.seller
const router = express.Router()

router.get('/goods',function(req,res){
	res.send({
		code:0,
		data:goods
	})
})
router.get('/ratings',function(req,res){
	res.send({
		code:0,
		data:ratings
	})
})

router.get('/seller',function(req,res){
	res.send({
		code:0,
		data:seller
	})
})

app.use('/api',router)

var compiler = webpack(webpackConfig)
var devMiddleware = require('webpack-dev-middleware')(compiler,{
	publicPath:webpackConfig.output.publicPath,
	quiet:true
})

var hotMiddleware = require('webpack-hot-middleware')(compiler,{
	log:()=>{}
})


app.use(devMiddleware)

app.use(hotMiddleware)


var server = app.listen(port)