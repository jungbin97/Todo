const TodoAdd = document.getElementById("todo_add")
const TodoList = document.getElementById("todo_list")

// TODO리스트 저장할 공간
const toDoArr = []; 

// 리스트 생성
function createTodo(){
    const li = document.createElement("li");
    const span = document.createElement("span");
    const editButton = document.createElement("button");
    const deleteButton = document.createElement("button");

    li.appendChild(span);
    li.appendChild(editButton);
    li.appendChild(deleteButton);
    TodoList.appendChild(li);


    span.innerText = "hello";   // 입력값 처리하기
    // span.setAttribute("style", "color:red");
    deleteButton.innerText = "❌";
    deleteButton.addEventListener("click", delTodo)
}

// 리스트 삭제
function delTodo(event){
    // 무엇을 삭제 해야하는지 알기 위해 부모 해당 버튼 부모 엘리먼트 찾기
    const li = event.target.parentElement;
    li.remove();
}

// 리스트 내용 입력하기



// 새로운 TODO 추가하기 버튼 클릭 시 이벤트(클릭 되면 -> createTodo() 실행)
TodoAdd.addEventListener("click", createTodo)