// 데이터를 체계적으로 관리 (3개 학년 x 4개 카테고리)
let storage = {
    1: { 1: [], 2: [], 3: [], 4: [] },
    2: { 1: [], 2: [], 3: [], 4: [] },
    3: { 1: [], 2: [], 3: [], 4: [] }
};
let currentYear = 0;

function goToPage(year) {
    currentYear = year;
    document.getElementById('main-menu').classList.add('hidden');
    document.getElementById('header-area').classList.add('hidden');
    document.getElementById('detail-view').classList.remove('hidden');
    document.getElementById('year-title').innerText = year + "학년의 자몽 저장소";
    renderAll();
}

function addFullRecord() {
    const cat = document.getElementById('cat-select').value;
    const title = document.getElementById('record-title').value;
    const desc = document.getElementById('record-desc').value;

    if (title && desc) {
        storage[currentYear][cat].push({ title, desc });
        document.getElementById('record-title').value = "";
        document.getElementById('record-desc').value = "";
        renderAll();
    } else {
        alert("제목과 내용을 모두 적어주세요! 🍹");
    }
}

function renderAll() {
    for (let i = 1; i <= 4; i++) {
        const display = document.getElementById('display-' + i);
        display.innerHTML = "";
        storage[currentYear][i].forEach(item => {
            const div = document.createElement('div');
            div.className = "record-item";
            div.innerHTML = `<b>🍊 ${item.title}</b><span>${item.desc}</span>`;
            display.appendChild(div);
        });
    }
}

function goBack() {
    document.getElementById('main-menu').classList.remove('hidden');
    document.getElementById('header-area').classList.remove('hidden');
    document.getElementById('detail-view').classList.add('hidden');
}