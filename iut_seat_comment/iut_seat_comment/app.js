var app = new Vue({ //var 변수정의 할때 c로 따지면 int와 같다 
	el: '#vue-root', //vue root는 명칭이고  el 어디다 적용해야할지 불러오는 역할
	data: {ds: [0, 0, 0, 0, 0, 0]}, //ds는 그냥 명칭 
	methods: {
		refresh() {
			this.ds = [0, 0, 0, 0, 0, 0]; //6자리 각각 채워진 자리 빈자리 나타내는 변수 this는 자바스크립트 기존에 있는 것 refresh가 초기화 methods도 그냥 정한 명칭
			jQuery.getJSON('/seats', (data) => { //jQuery는 jquery라는 라이브러리에서 getjson함수가 있는데 json형태의 데이터를 가져오는 함수 data는 명칭이므로 d로 바꿔도됨
				this.ds = data; //이 데이터도 앞에 적은 data와 같음
			});
		}
	}, //computed 에서 data는 일반적 속성 computed가 데이터가 계산된 속성
	computed: {
		defaultText() {
			return this.ds[0] ? (this.ds[1] + ' / ' + this.ds[0]) : '로딩중'; //ds0이 일반열람실 전체자리 1이 빈자리 ?앞이 조건을 말하는데 ds1이상이면 참일 때 콜롱 앞 물음표 뒤에걸 불러오고 거짓일때 즉0일때는 로딩중이라고 뜸
		},    //resfresh일때 다 0으로 바뀌니까 거짓인 로딩중이라고 뜨느 것임.
		studentText() {
			return this.ds[2] ? (this.ds[3] + ' / ' + this.ds[2]) : '로딩중'; //0이 첫번째 1이 두번째를2가 세번째의미 ds안쪽에 있는 숫자가
		},
		notebookText() {
			return this.ds[4] ? (this.ds[5] + ' / ' + this.ds[4]) : '로딩중';
		},
	}
});
app.refresh(); //app 안에 있는 refresh 함수 호출하고 접속하자 마자refresh가 됨, 새로고침



//http://localhost:6943 , 오른쪽 마우스 검사