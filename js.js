const cardsArray = [
    {
        name: "fire",
        img: "img/fire.png",
    },
    {
        name: "youtube",
        img: "img/youtube.png",
    },
    {
        name: "flash",
        img: "img/flash.png",
    },
    {
        name: "gift",
        img: "img/gift.png",
    },
    {
        name: "tron",
        img: "img/tron.png",
    },
    {
        name: "ufo",
        img: "img/ufo.png",
    },
    {
        name: "plant",
        img: "img/plant.png",
    },
    {
        name: "burger",
        img: "img/burger.png",
    },
];

let preCard;
let count = 0;
let fisrtGuess = '';
let secondGuess = '';

const grid = document.querySelector('.grid');

function generateCard() {
    // Reset HTML
    grid.innerHTML = "";

    //.sort(() => 0.5 - Math.random() // RANDOM ARRAY
    const cardsArrayMerge = cardsArray.concat(cardsArray).sort(() => 0.5 - Math.random());

    cardsArrayMerge.forEach(item => {

        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.name = item.name;

        // ==== FRONT CART ====
        const front = document.createElement('div');
        front.classList.add('front');

        // ==== BACK CART ====
        const back = document.createElement('div');
        back.classList.add('back');
        back.style.backgroundImage = `url(${item.img})`;

        card.appendChild(front);
        card.appendChild(back);
        grid.appendChild(card);
    });
}
generateCard();
grid.addEventListener('click', (e) => {
    const clicked = e.target;
    // console.log(clicked);
    // nodeName: trả về tên của một nút
    if (clicked.nodeName === 'SECTION' ||
        preCard === clicked ||
        clicked.parentNode.classList.contains('selected') ||
        clicked.parentNode.classList.contains('matched')) {
        return;
    }
    if (count < 2) {
        count++;
        if (count === 1) {
            fisrtGuess = clicked.parentNode.dataset.name;
            clicked.parentNode.classList.add('selected');
        } else {
            secondGuess = clicked.parentNode.dataset.name;
            clicked.parentNode.classList.add('selected');
        }

        if (fisrtGuess && secondGuess) {
            if (fisrtGuess === secondGuess) {
                // Handle match here
                setTimeout(matchingCard, 900)
            }
            setTimeout(resetGues, 900)

        }
        preCard = clicked;
    }
})

// Hàm lấy ra những card giống nhau (.SELECTED) để ẩn đi.
function matchingCard() {
    const selects = document.querySelectorAll('.selected');
    [...selects].forEach(item => item.classList.add('matched'));
}

// Hàm reset lại các tham số sau khi chọn
function resetGues() {
    count = 0;
    fisrtGuess = '';
    secondGuess = '';
    preCard = null;
    const selects = document.querySelectorAll('.selected');
    const matchedAll = document.querySelectorAll('.matched');
    const cardLenght = document.querySelectorAll('.card').length;

    const winGame = document.querySelector('.winGame');

    console.log(cardLenght);
    console.log(matchedAll.length);

    [...selects].forEach(item => item.classList.remove('selected'));

    if (matchedAll.length === cardLenght) {
        // DONE GAME -> RESET GAME
        matchedAll.forEach(el => el.classList.remove('matched'));
        
        winGame.classList.add('active')
        
        setTimeout(generateCard, 900);
    }
}