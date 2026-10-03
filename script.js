// ================================
// QURILISH ISHLARI
// ================================

const works = [
    {
        block: 1,
        name: "Котлован",
        percent: 100
    },
    {
        block: 1,
        name: "Бетон подгатовка",
        percent: 100
    },
    {
        block: 1,
        name: "Изоляция горизонтал",
        percent: 50
    },
    {
        block: 1,
        name: "Изоляция вертикал",
        percent: 0
    },
    {
        block: 1,
        name: "Подушка",
        percent: 70
    },

    {
        block: 2,
        name: "Котлован",
        percent: 80
    },
    {
        block: 2,
        name: "Подвал монолит бетон",
        percent: 60
    },
    {
        block: 2,
        name: "1-этаж монолит бетон",
        percent: 30
    },

    {
        block: 3,
        name: "Котлован",
        percent: 100
    },
    {
        block: 3,
        name: "Бетон подгатовка",
        percent: 90
    }
];


// ================================
// BLOKNI KO'RSATISH
// ================================

function showBlock(blockNumber) {

    const container = document.getElementById("workList");

    container.innerHTML = "";

    const blockWorks = works.filter(
        work => work.block === blockNumber
    );

    if (blockWorks.length === 0) {

        container.innerHTML = `
            <div class="empty">
                Bu blokda ishlar mavjud emas.
            </div>
        `;

        return;
    }

    blockWorks.forEach((work, index) => {

        const row = document.createElement("div");

        row.className = "work";

        row.innerHTML = `

            <div class="num">
                ${index + 1}
            </div>

            <div class="work-name">
                ${work.name}
            </div>

            <div class="progress-wrap">

                <div class="bar">

                    <div
                        class="fill"
                        style="width:${work.percent}%"
                    ></div>

                </div>

                <div class="percent">
                    ${work.percent}%
                </div>

            </div>

            <input
                class="percent-input"
                type="number"
                min="0"
                max="100"
                value="${work.percent}"
                onchange="changePercent(${works.indexOf(work)}, this.value)"
            >

            <div class="status">
                ${getStatus(work.percent)}
            </div>
        `;

        container.appendChild(row);

    });

    calculateAverage(blockWorks);
}


// ================================
// FOIZNI O'ZGARTIRISH
// ================================

function changePercent(index, value) {

    let percent = Number(value);

    // 0 dan kichik bo'lmasin
    if (percent < 0) {
        percent = 0;
    }

    // 100 dan katta bo'lmasin
    if (percent > 100) {
        percent = 100;
    }

    works[index].percent = percent;

    // Hozirgi blokni qayta chizish
    const currentBlock = works[index].block;

    showBlock(currentBlock);
}


// ================================
// HOLATNI ANIQLASH
// ================================

function getStatus(percent) {

    if (percent === 0) {
        return "Boshlanmagan";
    }

    if (percent === 100) {
        return "✓ Tugagan";
    }

    return "Jarayonda";
}


// ================================
// O'RTACHA FOIZ
// ================================

function calculateAverage(blockWorks) {

    if (blockWorks.length === 0) {
        document.getElementById("average").textContent = "0%";
        return;
    }

    let total = 0;

    blockWorks.forEach(work => {
        total += work.percent;
    });

    const average =
        Math.round(total / blockWorks.length);

    document.getElementById("average").textContent =
        average + "%";
}


// ================================
// BLOKLARNI YARATISH
// ================================

function createBlocks() {

    const blockContainer =
        document.getElementById("blocks");

    blockContainer.innerHTML = "";

    for (let i = 1; i <= 17; i++) {

        const button =
            document.createElement("button");

        button.textContent =
            i + "-blok";

        button.onclick = function () {

            showBlock(i);

            // Faol tugma
            document
                .querySelectorAll(".block-button")
                .forEach(btn =>
                    btn.classList.remove("active")
                );

            button.classList.add("active");
        };

        button.className = "block-button";

        blockContainer.appendChild(button);
    }
}


// ================================
// SAYT ISHLAGANDA
// ================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        createBlocks();

        // Dastlab 1-blok
        showBlock(1);

        const firstButton =
            document.querySelector(".block-button");

        if (firstButton) {
            firstButton.classList.add("active");
        }

    }
);