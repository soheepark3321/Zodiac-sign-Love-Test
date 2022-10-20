
const main = document.querySelector("#main"); //const : 변수 (상수로써 하나만 선언할 수 있음)
const qna = document.querySelector("#qna"); //var과는 다르게 상수로써 오직 하나만 선언 가능 (const : 변수)
const result = document.querySelector("#result"); //result부분 선택

const endPoint = 12; //총 질문이 12개 있으니까
const select = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; //사용자가 버튼을 선택할 때마다 선택한 버튼이 어떤 선택지였는지 알아야 하니까 배열 생성
//사용자가 버튼을 선택할 때마다 배열에 내용 추가해주면 됨

function calResult() { //data.js의 질문마다 type 정해져있음 (사용자가 질문 선택했을때 가장 많이 선택한 type을 결과 화면 띄우기)
    console.log(select);
    var result = select.indexOf(Math.max(...select)); //indexOf : 인덱스 반환 //인덱스에서 가지고 있는 최대값 선택
    return result; //인덱스 반환
}

function setResult(){
    let point = calResult(); //point 변수 만들어 calResult의 결과값인 resultword를 담아주기
    const resultName = document.querySelector('.resultname');
    resultName.innerHTML = infoList[point].name; 
  
    var resultImg = document.createElement('img');
    const imgDiv = document.querySelector('#resultImg');
    var imgURL = 'img/image-' + point + '.png'; //img 폴더에 image의 -에 point + .png로 주소값 만들어주기
    resultImg.src = imgURL;
    resultImg.alt = point; //공유하기 페이지 위함
    resultImg.classList.add('img-fluid');
    imgDiv.appendChild(resultImg);
  
    const resultDesc = document.querySelector('.resultDesc'); //설명부분 채워주기
    resultDesc.innerHTML = infoList[point].desc;
  }
  
function goResult() {
    qna.style.WebkitAnimation = "fadeOut 1s"; //천천히 사라지기
    qna.style.animation = "fadeOut 1s";
    setTimeout(() => { //settimeout : 만료된 후 함수나 지정한 코드 조각을 실행하는 타이머 설정
        //qna.style.display = "block"; 해당 영역에 코드 쓰면 fadein이 안나타남
        result.style.WebkitAnimation = "fadeIn 1s";
        result.style.animation = "fadeIn 1s";
        setTimeout(() => {
            qna.style.display = "none";
            result.style.display = "block"; //fadeout 효과 후 fadein 나타내기 (코드 순서 중요함)
        }, 450)
    })

    setResult(); //result가 끝나는 부분에 해당 함수 호출
}

function addAnswer(answerText, qIdx, idx) { //addanswer는 qIdx를 받아서 반복문이 끝난 이후 goNext함수에서 qIdx를 1 증가시켜서 호출해주기
    //67줄의 맨 우측 i를 idx로 받아서 사용자가 클릭했을 때 select 배여 열어줌(49번줄)
    var a = document.querySelector('.answerBox');
    var answer = document.createElement('button'); //createElement : 지정한 tagname의 html 요소를 만들어 반환함
    answer.classList.add('answerList'); //버튼을 var children에 넣으려고 하는데 button에는 class가 없어서 따로 queryseletor를 가지고 선택할 수 없음.
    //answer의 classlist에서 add로 answerlist라는 이름의 class값 넣어주기
    answer.classList.add('my-3'); //answer버튼 3개 모두 margin-y값 부여 -> 버튼 간격 띄우기
    answer.classList.add('py-3'); //answer버튼 3개 모두 padding-y값 부여 -> 버튼 간격 띄우기
    answer.classList.add('mx-auto'); //버튼들 왼쪽으로 치우쳐져 있는 현상 해결 위함

    answer.classList.add('fadeIn'); //answer 버튼 나타날때 fadeIn animation 효과 부여
    a.appendChild(answer); //answer라는 버튼이 a에게 소속될 수 있도록 관계 생성
    answer.innerHTML = answerText;

    answer.addEventListener("click", function () {
        var children = document.querySelectorAll('.answerList'); //button 3개를 사라지게 만들기 (다음 버튼, 퀴즈 나타내기 위함)
        //버튼 3개이므로 복수 선택 -> queryselectorall
        for (let i = 0; i < children.length; i++) {
            children[i].disabled = true; //true값 넣어서 버튼이 비활성화 되도록

            children[i].style.WebkitAnimation = "fadeOut 1s"; //천천히 사라지기
            children[i].style.animation = "fadeOut 1s";

            //children[i].style.display = 'none'; //user가 버튼 하나만 클릭해도 모든 버튼 사라짐 //버튼이 fadeout되어서 사라지는 순간에 display none이 되면 안되니까 삭제처리

        }
        setTimeout(() => {
            var target = qnaList[qIdx].a[idx].type; //몇번째 질문에 해당하는 건지 알아야 하니까 qIdx값 넣어주기
            //a의 배열에서 선택한 질문을 넣어야 하기 때문에 idx 넣어주기
            for (let j = 0; j < target.length; j++) {
                select[target[j]] += 1;
                //for 반복문이 다 돌고나면 사용자가 버튼을 선택했을 때 십이간지의 순서대로 해당하는 타입의 값이 1씩 증가하게 됨
            }
            for (let i = 0; i < children.length; i++) {
                children[i].style.display = 'none';
            }
            goNext(++qIdx);
        }, 450) //450초쯤 이후 다시 반복문을 돌면서 버튼에 대한 스타일의 display를 none으로 바꿔주고 반복문이 끝난 뒤에 gonext함수 호출

    }, false);
}

function goNext(qIdx) { //goNext함수에서 qIdx의 1 증가한 것들이 다음 페이지에서 나와야 함. 
    if (qIdx === endPoint) { //질문의 끝이 endpoint와 같다면 goresult함수 호출
        goResult();
        return;
    }
    var q = document.querySelector('.qBox'); //q 변수에는 문서에서 queryselector로 class값이 qBox인 요소를 선택
    q.innerHTML = qnaList[qIdx].q; //qnalist의 첫번째 요소에 q를 넣어주기 (첫번째 질문 선택)
    for (let i in qnaList[qIdx].a) { //answer 버튼 여러개 만들어야 하니까 반복문 for 사용
        //a의 배열이 총 3개 있으니까 3번 반복되어 나타나게 됨
        addAnswer(qnaList[qIdx].a[i].answer, qIdx, i); //다음 페이지에서 나와야해서 answer값에서 qIdx로 넘겨주기
        //만들어진 버튼 중에 몇번째 버튼을 클릭했는지 알기 위해 i 추가
    }
    var status = document.querySelector('.statusBar'); //id값이 statusBar인 것을 불러와줌
    status.style.width = (100 / endPoint) * (qIdx + 1) + '%'; //%으로 넣어주기 -> 질문이 진행될 때마다 statusBar가 채워짐

}


function begin() { //버튼 눌렀을 때 시작하기
    main.style.WebkitAnimation = "fadeOut 1s"; //천천히 사라지기
    main.style.animation = "fadeOut 1s";
    setTimeout(() => { //settimeout : 만료된 후 함수나 지정한 코드 조각을 실행하는 타이머 설정
        //qna.style.display = "block"; 해당 영역에 코드 쓰면 fadein이 안나타남
        qna.style.WebkitAnimation = "fadeIn 1s";
        qna.style.animation = "fadeIn 1s";
        setTimeout(() => {
            main.style.display = "none";
            qna.style.display = "block"; //fadeout 효과 후 fadein 나타내기 (코드 순서 중요함)
        }, 450)
        let qIdx = 0; //질문(q)가 0부터 시작 (처음서부터)
        goNext(qIdx); //begin 함수가 끝날 때쯤 goNext함수 호출
    }, 450); //호출되었을때 밀리초 단위 (1000밀리초 = 1초) 1초 뒤에 function함수가 실행되는 것을 만들 수 있음.

    //main.style.display = "none"; //꺼주기
    //qna.style.display = "block"; //켜주기
}
