let listArray = [];     // 할일을 저장할 배열
let idx = localStorage.length;
const todoList = document.querySelector('.todo_list');
const todoInput = document.querySelector('.todo_input');    // 할일 내용 입력 input
const btnAdd = document.querySelector('.btn_add');  //입력완료후 추가하기 버튼
const btnClear = document.querySelector('.btn_clear');  // 전체 삭제

const TODOLIST = 'toDoList';    //로컬 스토리지 key 값 상수 ["toDoList", "입력한 일"]

// 페이지 로드 시 localStorage에서 listArray 로드
window.onload = () => {
    const loadedTodos = localStorage.getItem(TODOLIST);
    if (loadedTodos !== null){
        listArray = JSON.parse(loadedTodos);
    }
    showList();
}


// add list 
const addTodo = () => {
    // 할일을 listArray 배열에 추가함
    const inputValue = todoInput.value;
    
    // 아무것도 입력되지 않으면 alert 띄우기
    if(inputValue === ""){
        alert("할일을 입력해주세요!");
        todoInput.focus();
        return false;   // 뒤에꺼 멈춤
    }
    
    // 입력 되었다면 배열에 값 저장
    const newTodoObj = {
        text: inputValue,
        idx: idx,
    };

    listArray.push(newTodoObj);
    //로컬스토리지 저장, value(text, index)값 string 타입으로 변환
    localStorage.setItem(TODOLIST, JSON.stringify(listArray));
    

    // input 비워줌
    todoInput.value = "";
    showList();
}

// delete todo - 하나만 삭제
const deleteTodo = (idx) =>{
    listArray.splice(idx, 1);   //배열중 idx번쨰부터 1개 잘라냄
    localStorage.setItem(TODOLIST, JSON.stringify(listArray));  
    showList(); // 바뀐값 출력
}


// 전체 삭제 기능 구현
const clearAll = () => {
    // 배열 초기화
    listArray = [];
    localStorage.clear();   // 로컮스토리지 삭제
    showList();     // 바뀐 배열로 html 그려줌 
}

// 수정하기 
const activeEdit = (idx) => {
    const items = document.querySelectorAll('.todo_item');
    const item = items[idx];

    // edit_input 박스, btn_edit 보이게 하기
    const btnEdit = item.querySelector('.btn_edit');
    const edit_input = item.querySelector('.edit_input');

    btnEdit.style.display = 'block';
    edit_input.style.display = 'block';

    item.classList.add('edit_active');  // 클래스 추가
}

// 수정하는 함수
const amendTodo = (idx) => {
    const items = document.querySelectorAll('.todo_item');
    const item = items[idx];
    const newInput = item.querySelector('.edit_input');
    const newValue = newInput.value;

    if (newValue === ""){   // 빈 값 인경우 체크
        alert("값을 입력해주세요");
        newInput.focus();
    }else{
        listArray.splice(idx, 1, newValue);     // idx번째 1개값을 newValue로 바꾸기
        localStorage.setItem(TODOLIST, JSON.stringify(listArray));  
        item.classList.remove('.edit_active');   // 자동으로 edit화면 종료
        console.log(item);
        showList();
    }
}

const showList = () => {
    // html 출력

    // 배열에 데이터가 있는 경우
    if (listArray.length > 0){
        todoList.innerHTML = "";    // 기존데이터를 모두 삭제 초기화
        listArray.forEach(function(todoObj, idx){
            const itemTag = '<li class="todo_item ">' + 
                                '<div class="edit_wrap">' + 
                                    '<input style="display:none" type="text" class="edit_input" value="'+todoObj.text+'" />' +
                                    '<button style="display:none" class="button btn_edit" onClick="amendTodo('+idx+')">EDIT</button>' +
                                '</div>' +
                                '<p class="text">'+ todoObj.text +'</p>' +
                                '<button class="button btn_amend" onClick="activeEdit('+idx+')">수정하기</button>' +
                                '<button class="button btn_delete" onClick="deleteTodo('+idx+')">삭제하기</button>' +
                            '</li>'
            todoList.innerHTML += itemTag
        });
    } else{//데이터가 없으면
        todoList.innerHTML = "<li>할일을 입력해주세요 예시) 밥먹기</li>";
    }
}

btnAdd.addEventListener("click", addTodo);
btnClear.addEventListener("click", clearAll);
showList()