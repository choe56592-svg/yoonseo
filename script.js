let storage = { 1: {1:[], 2:[], 3:[], 4:[]}, 2: {1:[], 2:[], 3:[], 4:[]}, 3: {1:[], 2:[], 3:[], 4:[]} };
let currentYear = 0;
let editTarget = null; // 수정 중인지 확인하는 변수

function goToPage(year) {
    currentYear = year;
    document.getElementById('home-screen').classList.add('hidden');
    document.getElementById('detail-view').classList.remove('hidden');
    document.getElementById('year-title').innerText = year + "학년 자몽 기록";
    renderAll();
}

function saveRecord() {
    const cat = document.getElementById('cat-select').value;
    const title = document.getElementById('record-title').value;
    const desc = document.getElementById('record-desc').value;

    if (!title || !desc) return alert("내용을 채워주세요!");

    if (editTarget) {
        // 수정 모드
        storage[currentYear][editTarget.cat][editTarget.idx] = { title, desc };
        editTarget = null;
        document.getElementById('submit-btn').innerText = "기록하기 🍊";
    } else {
        // 새 기록 모드
        storage[currentYear][cat].push({ title, desc });
    }

    document.getElementById('record-title').value = "";
    document.getElementById('record-desc').value = "";
    renderAll();
}

function editItem(cat, idx) {
    const item = storage[currentYear][cat][idx];
    document.getElementById('cat-select').value = cat;
    document.getElementById('record-title').value = item.title;
    document.getElementById('record-desc').value = item.desc;
    
    editTarget = { cat, idx };
    document.getElementById('submit-btn').innerText = "수정완료 ✨";
}

function deleteItem(cat, idx) {
    if(confirm("정말 삭제할까요?")) {
        storage[currentYear][cat].splice(idx, 1);
        renderAll();
    }
}

function renderAll() {
    for (let i = 1; i <= 4; i++) {
        const display = document.getElementById('display-' + i);
        display.innerHTML = "";
        storage[currentYear][i].forEach((item, idx) => {
            const div = document.createElement('div');
            div.className = "record-card";
            div.innerHTML = `<strong>🍊 ${item.title}</strong><div style="font-size:0.9rem">${item.desc}</div>
                <div class="btn-area">
                    <span onclick="editItem(${i}, ${idx})">수정</span>
                    <span onclick="deleteItem(${i}, ${idx})">삭제</span>
                </div>`;
            display.appendChild(div);
        });
    }
}

function goBack() {
    document.getElementById('home-screen').classList.remove('hidden');
    document.getElementById('detail-view').classList.add('hidden');
}
