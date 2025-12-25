// 학년별 기록을 저장할 바구니
let recordsData = { 1: [], 2: [], 3: [] };
let activeYear = 0;

// 페이지 전환 함수
function goToPage(year) {
    activeYear = year;
    document.getElementById('main-menu').classList.add('hidden');
    document.getElementById('header-area').classList.add('hidden');
    
    const detailView = document.getElementById('detail-view');
    detailView.classList.remove('hidden');
    document.getElementById('year-title').innerText = year + "학년의 자몽 기록";
    
    renderRecords();
}

// 메인으로 돌아가기
function goBack() {
    document.getElementById('main-menu').classList.remove('hidden');
    document.getElementById('header-area').classList.remove('hidden');
    document.getElementById('detail-view').classList.add('hidden');
}

// 기록 추가하기
function addRecord() {
    const input = document.getElementById('record-input');
    const text = input.value.trim();
    
    if (text !== "") {
        recordsData[activeYear].push(text);
        input.value = "";
        renderRecords();
    } else {
        alert("내용을 입력해주세요! 🍊");
    }
}

// 화면에 리스트 그려주기
function renderRecords() {
    const list = document.getElementById('record-list');
    list.innerHTML = ""; 
    
    recordsData[activeYear].forEach((item) => {
        const li = document.createElement('li');
        li.innerText = "🍊 " + item;
        list.appendChild(li);
    });
}