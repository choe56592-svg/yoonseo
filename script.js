let storage = { 1: {1:[], 2:[], 3:[], 4:[]}, 2: {1:[], 2:[], 3:[], 4:[]}, 3: {1:[], 2:[], 3:[], 4:[]} };
let currentYear = 0;
let currentView = { cat: null, idx: null }; // 현재 보고 있는 항목 정보

function goToPage(year) {
    currentYear = year;
    document.getElementById('home-screen').classList.add('hidden');
    document.getElementById('detail-view').classList.remove('hidden');
    document.getElementById('year-title').innerText = year + "학년 자몽 아카이브";
    renderAll();
}

function saveRecord() {
    const cat = document.getElementById('cat-select').value;
    const title = document.getElementById('record-title').value;
    const desc = document.getElementById('record-desc').value;

    if (!title || !desc) return alert("내용을 채워주세요! 🍊");

    storage[currentYear][cat].push({ title, desc });
    document.getElementById('record-title').value = "";
    document.getElementById('record-desc').value = "";
    renderAll();
}

function openModal(cat, idx) {
    const item = storage[currentYear][cat][idx];
    currentView = { cat, idx };
    document.getElementById('modal-title').innerText = item.title;
    document.getElementById('modal-desc').innerText = item.desc;
    document.getElementById('modal').classList.remove('hidden');
}

function closeModal() {
    document.getElementById('modal').classList.add('hidden');
}

function confirmDelete() {
    if(confirm("정말 이 기록을 지울까요?")) {
        storage[currentYear][currentView.cat].splice(currentView.idx, 1);
        closeModal();
        renderAll();
    }
}

function startEdit() {
    const item = storage[currentYear][currentView.cat][currentView.idx];
    document.getElementById('cat-select').value = currentView.cat;
    document.getElementById('record-title').value = item.title;
    document.getElementById('record-desc').value = item.desc;
    
    // 기존 데이터 삭제 후 입력창으로 이동하는 방식 (간편 수정)
    storage[currentYear][currentView.cat].splice(currentView.idx, 1);
    closeModal();
    renderAll();
    alert("내용이 입력창으로 이동되었습니다. 수정 후 다시 기록해주세요! ✨");
}

function renderAll() {
    for (let i = 1; i <= 4; i++) {
        const display = document.getElementById('display-' + i);
        display.innerHTML = "";
        storage[currentYear][i].forEach((item, idx) => {
            const div = document.createElement('div');
            div.className = "record-title-item";
            div.innerText = "🍊 " + item.title;
            div.onclick = () => openModal(i, idx);
            display.appendChild(div);
        });
    }
}

function goBack() {
    document.getElementById('home-screen').classList.remove('hidden');
    document.getElementById('detail-view').classList.add('hidden');
}
