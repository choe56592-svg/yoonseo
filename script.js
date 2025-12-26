let storage = { 1: {1:[], 2:[], 3:[], 4:[]}, 2: {1:[], 2:[], 3:[], 4:[]}, 3: {1:[], 2:[], 3:[], 4:[]} };
let currentYear = 0;
let editIndex = -1; // 수정 중인 인덱스

function goToPage(year) {
    currentYear = year;
    document.getElementById('home-screen').classList.add('hidden');
    document.getElementById('detail-view').classList.remove('hidden');
    document.getElementById('year-title').innerText = year + "학년 기록장";
    renderAll();
}

function addFullRecord() {
    const cat = document.getElementById('cat-select').value;
    const title = document.getElementById('record-title').value;
    const desc = document.getElementById('record-desc').value;

    if (!title || !desc) return alert("내용을 입력해주세요!");

    if (editIndex === -1) {
        storage[currentYear][cat].push({ title, desc });
    } else {
        storage[currentYear][cat][editIndex] = { title, desc };
        editIndex = -1;
        document.getElementById('submit-btn').innerText = "기록하기 🍊";
    }
    
    document.getElementById('record-title').value = "";
    document.getElementById('record-desc').value = "";
    renderAll();
}

function deleteRecord(cat, index) {
    storage[currentYear][cat].splice(index, 1);
    renderAll();
}

function editRecord(cat, index) {
    const item = storage[currentYear][cat][index];
    document.getElementById('cat-select').value = cat;
    document.getElementById('record-title').value = item.title;
    document.getElementById('record-desc').value = item.desc;
    editIndex = index;
    document.getElementById('submit-btn').innerText = "수정완료 ✨";
}

function renderAll() {
    for (let i = 1; i <= 4; i++) {
        const display = document.getElementById('display-' + i);
        display.innerHTML = "";
        storage[currentYear][i].forEach((item, idx) => {
            const div = document.createElement('div');
            div.style.marginBottom = "10px";
            div.innerHTML = `<b>🍊 ${item.title}</b><div style="font-size:0.9rem">${item.desc}</div>
                <div class="edit-btns"><span onclick="editRecord(${i}, ${idx})">수정</span><span onclick="deleteRecord(${i}, ${idx})">삭제</span></div>`;
            display.appendChild(div);
        });
    }
}

function goBack() {
    document.getElementById('home-screen').classList.remove('hidden');
    document.getElementById('detail-view').classList.add('hidden');
}
