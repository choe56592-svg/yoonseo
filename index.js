const records = {
    1: ["입학식: 설레는 첫 등교", "첫 중간고사 합격점!", "미술 시간 나만의 작품 만들기"],
    2: ["여름 방학 가족 여행", "수학 여행 장기자랑 연습", "좋아하는 과목 탐색하기"],
    3: ["졸업 사진 촬영", "수능 대박 기원 선물", "미래의 나에게 편지 쓰기"]
};

function goToPage(year) {
    document.getElementById('main-menu').classList.add('hidden');
    document.getElementById('main-title').classList.add('hidden');
    document.querySelector('.accent-line').classList.add('hidden');
    
    const detailView = document.getElementById('detail-view');
    detailView.classList.remove('hidden');
    
    document.getElementById('year-title').innerText = year + "학년 상세 기록";
    
    const list = document.getElementById('record-list');
    list.innerHTML = ""; 
    records[year].forEach(item => {
        const li = document.createElement('li');
        li.innerText = "● " + item;
        list.appendChild(li);
    });
}

function goBack() {
    document.getElementById('main-menu').classList.remove('hidden');
    document.getElementById('main-title').classList.remove('hidden');
    document.querySelector('.accent-line').classList.remove('hidden');
    document.getElementById('detail-view').classList.add('hidden');
}