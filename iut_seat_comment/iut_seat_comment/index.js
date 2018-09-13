const express = require('express'); //require가 모듈을 불러오는 함수 
const app = express(); //express 모듈 app은 그냥 지은 명칭 express타입인 변수
const axios = require('axios'); //axios는 페이지 링크를 긁어오는 모듈
const cheerio = require('cheerio'); //html에서 원하는 것을 뽑아주는게 cheerio역할
//const 상수를 정의 변경이 되지x 변수와 반대

app.get('/seats', async (req, res) => { //비동기적 함수 async 
	let result = [];
	let raws = await Promise.all([ //await 가 Promise가 all 은 3개를 다 불러오게 하는 역할 awiat가 3개 다 출력될때까지 기다려주는 역할  
		axios.get('http://14.33.168.82:8800/seatmate/Seatmate.php?classInfo=1'),
		axios.get('http://14.33.168.82:8800/seatmate/Seatmate.php?classInfo=2'),
		axios.get('http://14.33.168.82:8800/seatmate/Seatmate.php?classInfo=3')
	]);// txt2가 전체자리 4가 빈자리
	raws.forEach((data) => { //foreach 자바스크립트 기본 함수 앞에 있는 링크 불러옴
		let $ = cheerio.load(data.data); //cheerio를 이용해서 원하는 거 가져오고 foreach가 앞에 있는 링크들을 하나하나 집어넣는 역할
		result.push(Number($('#location_box1 .txt2').text()), Number($('#location_box1 .txt4').text())); //샾은 아이디 .은 class
	}); //number가 문자열을 숫자로 바꿔주는 역할 97이 전체자리를 의미 소스보기로 아알수 있음 , html로 봤을때는 97로 된 분자열
	res.json(result); //앞에 let result 에 있는 괄호에 있는 숫자를 json 형태로, 앞에 let은 변수 정의 ,seats에 접속했을 때 json형태로 6자리 숫자들을 뿌려준다.
});
app.use(express.static(__dirname)); //idex.html , 한백고 로고도 불러오는 역할 웹서버에 주소로 들어가면

app.listen(6943); //6943포트의 접속을 받아들임
//만약 이름을 바꾸면 node index.js가 아니라 server라고 지었을때 node server.js http://localhost:6943/seats 앞에 적은 8123 바꾸면 localhost도 8123 바꿔야하고 다른 열려 있는 포트랑 겹치지 않게 임의의 숫자 적음