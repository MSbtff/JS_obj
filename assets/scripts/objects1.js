"use strict";
const addMovieBtn = document.getElementById('add-movie-btn');
const searchBtn = document.getElementById('search-btn');

const movies = [];

const renderMovies = (filter = '') => {
    const movieList = document.getElementById('movie-list');

    if (movies.length === 0) {
        movieList.classList.remove('visible');
        return;
    } else {
        movieList.classList.add('visible');
    }

    movieList.innerHTML = ''; //기존에 있던 것을 지우고 다시 렌더링 이상적이지 않음

    const filteredMovies = !filter
        ? movies
        : movies.filter(movie => movie.info.title.includes(filter))
    //filter는 조건에 

    //배열 객체구조분해에서는 아무이름이나 사용해되 되는데 인덱스로 알아내기 때문 순서가 중요하기 때문
    //객체 배열구조분해에서는 순서는 상관이 없고 키만 중요 즉 프로퍼티 이름이 있어야 함
    // 객체에서 프로퍼티를 빼낼때는 이름을 사용 다른 변수와 충돌이 생기거나 변수이름을 달리하려면
    //빼낼 값 : 이렇게하면 키 이름과 값이 있는 새로운 객체 생성대신 추출한 프로퍼티에 새로운 이름 할당

    filteredMovies.forEach((movie) => {
        const movieEl = document.createElement('li');
        const { info, ...otherProps } = movie;

        console.log(otherProps);
        // const { title: movieTitle } = info;
        let { getFormattedTitle } = movie;
        // getFormattedTitle = getFormattedTitle.bind(movie);
        //thisarg는 bind가 참조할 대상을 가리킴
        //bind는 특정인자가 필요할때 사용하거나 this를 바인딩할때 사용 즉 참조할 사항을 미리 구성
        // call은 바로 실행할 함수를 준비 bind는 나중에 실행할 함수를 준비
        //call은 this를 바인딩하고 함수를 실행 bind는 this를 바인딩하고 함수를 리턴
        //apply는 call과 같지만 인자를 배열로 받음
        // let text = getFormattedTitle.apply(movie, [])
        // let text = getFormattedTitle.call(movie, , , ,)
        // 여기서(함수 내부가 아닌 외부) call이나 apply를 사용하면 this가 movie를 가리키게 됨 
        // 즉 전역 컨텍스트

        let text = getFormattedTitle.call(movie) + ' - '; //this 참조하는 내용을 변경할때 실행
        for (const key in info) {
            if (key !== 'title' && key !== '_title') {
                text = text + `${key}: ${movie.info[key]}`; //키에 접근할려면 []사용
            }
        }
        movieEl.textContent = text; //textContent는 텍스트만
        movieList.append(movieEl);
    })
}

const addMovieHandler = () => {
    const title = document.getElementById('title').value; //해당 dom의 노드의 값만
    const extraNmae = document.getElementById('extra-name').value;
    const extraValue = document.getElementById('extra-value').value;

    if (title.trim() === '' ||
        extraNmae.trim() === '' ||
        extraValue.trim() === '') {
        return;
    }

    //프로퍼티 설정 방식을 다르게 할때
    // getter를 생략하면 읽을 수 없는 프로퍼티가 생기고
    // setter를 생략하면 읽기 전용 속성이 생김
    const newMovie = {
        info: {
            set title(val) { //setter를 사용하면 값을 설정할때마다 유효성 검사 가능
                if (val.trim() === '') {
                    this._title = 'DEFAULT';
                    return;
                }
                this._title = val;
            },
            get title() {
                return this._title.toUpperCase();
                // 이 것을 쓰면 밑에 getformatterTitle() 메서드가 필요 없음
            },
            // title, //key와 value가 같으면 생략가능
            [extraNmae]: extraValue //동적 프로퍼티
        },
        id: Math.random().toString(), //랜덤한 id를 만들어줌  체이닝방식 흔히하는 방식
        //체이닝을 하여 헬퍼변수를 만들어서 불필요하게 구분해야할 번거로움을 줄여줌
        getFormattedTitle() { //this사용시 메서드 쓸때는 화살표 함수 쓰지마라 
            console.log(this);
            return this.info.title.toUpperCase(); //this는 객체 자신을 가리킴
            // 함수내부에서 this를 사용하면 함수를 호출한 객체를 가리킴
        }
    };

    //bind는 특정인자가 필요할때 사용하거나 this를 바인딩할때 사용 즉 참조할 사항을 미리 구성

    newMovie.info.title = title;
    console.log(newMovie.info.title); //프로퍼티에 액세스를 해 읽기를 하려할때 getter가 실행

    movies.push(newMovie);
    renderMovies();//새로운 영화가 추가되면 다시 렌더링
};

//화살표 함수 내부의 this는 화살표 함수 외부의 this와 역할이 같음
//화살표 함수는 this를 모름 엄격모드를 사용해도 this를 모름

const seacrchMovieHandler = () => {
    console.log(this); //this는 window를 가리킴
    //브라우저는 이벤트 리스너에서 이벤트를 트리거하는 DOM요소에 this를 바인딩 
    // 위에 내용은 화살표 함수를 사용하지 않을 때 적용
    const filterTerm = document.getElementById('filter-title').value;
    renderMovies(filterTerm)
};

addMovieBtn.addEventListener('click', addMovieHandler);
searchBtn.addEventListener('click', seacrchMovieHandler);