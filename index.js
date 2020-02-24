const express = require('express'),
	bodyParser = require('body-parser'),
	OAuth2Server = require('oauth2-server'),
	Request = OAuth2Server.Request,
	Response = OAuth2Server.Response,
    port = 3000;
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.oauth = new OAuth2Server({
	model: require('./model.js'),
	accessTokenLifetime: 60 * 60,
	allowBearerTokensInQueryString: true
});

app.all('/oauth/token', obtainToken);

app.get('/', authenticateRequest, function(req, res) {

	res.send('Congratulations, you are in a secret area!');
});

app.listen(port,()=>{
    console.log(`app listening on port ${port}` )
});

function obtainToken(req, res) {

	const request = new Request(req);
	const response = new Response(res);

	return app.oauth.token(request, response)
		.then(function(token) {

			res.json(token);
		}).catch(function(err) {

			res.status(err.code || 500).json(err);
		});
}

function authenticateRequest(req, res, next) {

	const request = new Request(req);
	const response = new Response(res);

	return app.oauth.authenticate(request, response)
		.then(function(token) {

			next();
		}).catch(function(err) {

			res.status(err.code || 500).json(err);
		});
}   