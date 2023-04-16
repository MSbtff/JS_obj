const addMovieBtn = document.getElementById('add-movie-btn');
const searchBtn = document.getElementById('search-btn');

const addMovieHandler = () => {
    const title = document.getElementById('title').value; //해당 dom의 노드의 값만
    const extraNmae = document.getElementById('extra-name').value;
    const extraValue = document.getElementById('extra-value').value;

    if (title.trim() === '' ||
        extraNmae.trim() === '' ||
        extraValue.trim() === '') {

    } {
        return;
    }

    const newMovie = {
        info: {
            title //key와 value가 같으면 생략가능

        }

    };
}