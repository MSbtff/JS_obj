const movieList = document.getElementById('movie-list');

movieList.style['backgroundColor'] = 'red';//대괄호 프로퍼티 접근법 키 이름 자유로움이 장점
movieList.style.display = 'block';

const userChosenKeyName = 'level'; // 완성된 키 말고 추가할때 이렇게 사용

let person = {
    'first Name': 'Max', // 키는 문자열로 감싸야함 객체에서만 가능
    age: 30,
    hoobies: ['Sports', 'Cooking'],
    [userChosenKeyName]: '...', // 완성된 키 말고 추가할때 이렇게 사용
    greet: function () {
        alert('Hi there!')
    },
    1.5: 'hello' // 0이거나 양수여야함
};
// person = {
//     name: 'Max',
//     age: 30,
//     hoobies: ['Sports', 'Cooking'],
//     greet: function () {
//         alert('Hi there!')
//     },
//     //isAdmin: true 별로 사용안함 객체 추가법
// }


delete person.age; // 객체 삭제법 프로퍼티까지 삭제할때 사용
person.age = null // 객체 삭제법 리셋을 하고 싶을때 사용
person.age = 31; // 객체 수정법
person.isAdmin = true; // 객체 추가법


const keyName = 'first Name';


console.log(person[keyName]);// 이렇게 하면 따옴표가 필요 없음
// keyname에 속해있는 프로퍼티의 값을 찾고 있음


console.log(person['first Name']);// 대괄호를 이용해 키를 액세스함
console.log(person[1.5]);// 숫자형은 따옴표가 필요 없음

// 키는 변수보다 유연한 특성을 갖음