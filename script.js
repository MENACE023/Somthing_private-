// ========================
// ELEMENTS
// ========================

const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const message = document.getElementById("message");

const result = document.getElementById("result");
const buttonArea = document.querySelector(".buttonArea");

const gifPlayer = document.getElementById("gifPlayer");
const music = document.getElementById("music");

const heartsContainer = document.querySelector(".hearts");

const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");

// ========================
// GIF SLIDESHOW
// ========================

const gifs = [
    "Assets/bears-hugging-i-love-you-rybi46bujxb2ki7c.gif",
    "Assets/cartoon-cat-blowing-kiss-hearts-rbdwxn0fdc0vsuno.gif",
    "Assets/happy-birthday.gif",
    "Assets/kiss.gif"
];

let currentGif = 0;
let slideshowStarted = false;

function startGifSlideshow(){

    if(slideshowStarted) return;

    slideshowStarted = true;

    setInterval(()=>{

        currentGif++;

        if(currentGif >= gifs.length){
            currentGif = 0;
        }

        gifPlayer.src = gifs[currentGif];

    },3000);

}

// ========================
// FUNNY MESSAGES
// ========================

const funnyMessages = [

    "Are you sure? 🥺",
    "Think again 😭",
    "Don't break my heart 💔",
    "Wrong answer detected 🚨",
    "My lawyer advised against NO 😎",
    "Developer removed NO 🤣"

];

// ========================
// NO BUTTON POSITIONS
// ========================

const positions = [

    {left:"15%", top:"100px"},
    {left:"65%", top:"100px"},
    {left:"25%", top:"150px"},
    {left:"60%", top:"150px"},
    {left:"40%", top:"70px"},
    {left:"75%", top:"120px"}

];

let attempts = 0;
let yesScale = 1;

// ========================
// MOVE NO BUTTON
// ========================

function moveNoButton(){

    if(attempts < positions.length){

        noBtn.style.left =
            positions[attempts].left;

        noBtn.style.top =
            positions[attempts].top;

        message.innerText =
            funnyMessages[attempts];

    }else{

        noBtn.style.display = "none";

        message.innerText =
            "😂 NO option has been removed";

    }

    // Restart popup animation

    message.classList.remove(
        "popupText"
    );

    void message.offsetWidth;

    message.classList.add(
        "popupText"
    );

    // Grow YES button

    yesScale += 0.15;

    yesBtn.style.transform =
        `translateX(-50%) scale(${yesScale})`;

    attempts++;
}

// Desktop

noBtn.addEventListener(
    "mouseover",
    moveNoButton
);

noBtn.addEventListener(
    "click",
    function(e){

        e.preventDefault();

        moveNoButton();

    }
);

// ========================
// YES BUTTON
// ========================

yesBtn.addEventListener(
    "click",
    function(){

        buttonArea.style.display =
            "none";

        result.style.display =
            "block";

        music.play().catch(err => {
            console.log(err);
        });

        startGifSlideshow();

        startConfetti();

    }
);

// ========================
// FLOATING HEARTS
// ========================

setInterval(()=>{

    const heart =
        document.createElement("div");

    heart.className =
        "heart";

    heart.innerHTML =
        "❤️";

    heart.style.left =
        Math.random()*100 + "%";

    heart.style.fontSize =
        (15 + Math.random()*25)
        + "px";

    heart.style.animationDuration =
        (4 + Math.random()*4)
        + "s";

    heartsContainer.appendChild(
        heart
    );

    setTimeout(()=>{

        heart.remove();

    },8000);

},300);

// ========================
// CONFETTI
// ========================

canvas.width =
    window.innerWidth;

canvas.height =
    window.innerHeight;

let confetti = [];

function startConfetti(){

    confetti = [];

    for(let i=0;i<250;i++){

        confetti.push({

            x:
            Math.random()*canvas.width,

            y:
            Math.random()*canvas.height,

            r:
            Math.random()*6+2,

            dx:
            (Math.random()-0.5)*4,

            dy:
            Math.random()*3+2,

            color:
            `hsl(${Math.random()*360},
            100%,50%)`

        });

    }

    animateConfetti();

}

function animateConfetti(){

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    confetti.forEach(c=>{

        ctx.beginPath();

        ctx.arc(
            c.x,
            c.y,
            c.r,
            0,
            Math.PI*2
        );

        ctx.fillStyle =
            c.color;

        ctx.fill();

        c.x += c.dx;
        c.y += c.dy;

        if(c.y > canvas.height){

            c.y = -10;

        }

    });

    requestAnimationFrame(
        animateConfetti
    );

}

// ========================
// RESIZE
// ========================

window.addEventListener(
    "resize",
    ()=>{

        canvas.width =
            window.innerWidth;

        canvas.height =
            window.innerHeight;

    }
);