let storage = { 1: {1:[], 2:[], 3:[], 4:[]}, 2: {1:[], 2:[], 3:[], 4:[]}, 3: {1:[], 2:[], 3:[], 4:[]} };
let currentYear = 0;
let currentIdx = { cat: null, idx: null };

function goToPage(year) {
    currentYear = year;
    document.getElementById('home-screen').classList.add('hidden');
    document.getElementById('detail-view').classList.remove('hidden');
    document.getElementById('year-title').innerText = year + "학년 자몽 기록장";
    renderAll();
}

function goBack() {
    document.getElementById('home-screen').classList.remove('hidden');
    document.getElementById('detail-view').classList.add('hidden');
}

function saveRecord() {
    const cat = document.getElementById('cat-select').value;
    const title = document.getElementById('record-title').value;
    const desc = document.getElementById('record-desc').value;

    if (!title || !desc) return alert("제목과 내용을 모두 입력해 주세요!");

    storage[currentYear][cat].push({ title, desc });
    document.getElementById('record-title').value = "";
    document.getElementById('record-desc').value = "";
    renderAll();
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

function openModal(cat, idx) {
    currentIdx = { cat, idx };
    const item = storage[currentYear][cat][idx];
    document.getElementById('modal-title').innerText = item.title;
    document.getElementById('modal-desc').innerText = item.desc;
    document.getElementById('modal').classList.remove('hidden');
}

function closeModal() {
    document.getElementById('modal').classList.add('hidden');
}

function confirmDelete() {
    if (confirm("정말 삭제할까요?")) {
        storage[currentYear][currentIdx.cat].splice(currentIdx.idx, 1);
        closeModal();
        renderAll();
    }
}

function startEdit() {
    const item = storage[currentYear][currentIdx.cat][currentIdx.idx];
    document.getElementById('cat-select').value = currentIdx.cat;
    document.getElementById('record-title').value = item.title;
    document.getElementById('record-desc').value = item.desc;
    
    storage[currentYear][currentIdx.cat].splice(currentIdx.idx, 1);
    closeModal();
    renderAll();
    alert("내용을 입력창에서 수정 후 다시 저장해 주세요! ✨");
}
