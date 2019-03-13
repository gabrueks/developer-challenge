<h1>Hello!</h1>

<h4> Site deployed on netlify: https://cocky-bohr-227205.netlify.com/</h4>
<h4> Backend deployed on heroku: https://blooming-taiga-15572.herokuapp.com </h4>

<h3>To run the project (Docker way)</h3>

Clone this repo and have docker installed on your machine.

```
git clone https://github.com/gabrueks/developer-challenge.git
```
On Unix systems run the command:
```
make
```
All systems:
```
docker-compose build
docker-compose up
```

<h3>To run the project (Machine way)</h3>

Clone this repo and you must have MongoDB running in your machine on the port 27017.

And run
```
git clone https://github.com/gabrueks/developer-challenge.git
```
```
cd ./back-end
npm i
npm run dev
```
```
cd ./front-end
npm i
npm start
```

In both ways, access http://localhost:3000 and be happy!
