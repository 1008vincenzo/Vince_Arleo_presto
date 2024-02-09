// cattura icona dito navbar
let fingerIcon = document.querySelector('#fingerIcon');

// cattura navbar
let mainNavbar = document.querySelector('#mainNavbar');

// cattura loghi navbar
let brownLogo = document.querySelector('#brownLogo');
let beigeLogo = document.querySelector('#beigeLogo');

// cattura link navbar
let navLinks = document.querySelectorAll('.nav-link');
// console.log(navLinks);

// cattura del bottoncino
let scroller = document.querySelector('#scroller');

// variabile d'appoggio per il dito icona navbar

let confirm = false;

fingerIcon.addEventListener('click', () => {


    if (confirm == false) {

        fingerIcon.style.transform = 'rotate(180deg)';
        confirm = true;

    } else {

        fingerIcon.style.transform = 'rotate(0deg)';
        confirm = false;
    }


});

// evento su navbar

window.addEventListener('scroll', () => {

    if (window.scrollY > 0) {

        mainNavbar.style.backgroundColor = "var(--accent)";
        beigeLogo.classList.remove('d-none');
        brownLogo.classList.add('d-none');

        fingerIcon.classList.remove('text-accent');
        fingerIcon.classList.add('text-secondaryCus');

        // cambiamo il colore dei link
        navLinks.forEach((link) => {
            link.classList.add('text-secondaryCus');
            link.classList.remove('text-accent');
        });

        // il bottoncino deve comparire
        scroller.classList.remove('d-none');



    } else {

        mainNavbar.style.backgroundColor = "transparent";
        beigeLogo.classList.add('d-none');
        brownLogo.classList.remove('d-none');

        fingerIcon.classList.add('text-accent');
        fingerIcon.classList.remove('text-secondaryCus');

        // cambiamo il colore dei link
        navLinks.forEach((link) => {
            link.classList.add('text-accent');
            link.classList.remove('text-secondaryCus');
        });

        // il bottoncino deve scomparire
        scroller.classList.add('d-none');

    }

})


// evento docenti circle

let opener = document.querySelector('.opener');

let movedDivs = document.querySelectorAll('.moved');

// variabile d'appoggio
let conferma = false;

// array docenti

let teachers = [

    { nome: 'Valerio', url: './media/images (1).jpeg' },
    { nome: 'Donaaato', url: "./media/download (1).jpeg" },
    { nome: 'Mattia Perfido', url: './media/images.jpeg' },
    { nome: 'Mr Karl', url: './media/download.jpeg' },

];

// evento per inserire le immagini dei docenti nei singoli moved
movedDivs.forEach((moved, i) => {

    moved.style.backgroundImage = `url('${teachers[i].url}')`;

});




// evento click su moved
movedDivs.forEach((moved, i) => {

    let verifica = false;

    moved.addEventListener('click', () => {
        
        let angle = (360 * i) / movedDivs.length;

        if (verifica == false) {
            moved.style.transform = `rotate(${angle}deg) translate(200px) rotate(-${angle}deg) scale(1.2)`;
            verifica = true;
        } else {
            moved.style.transform= `rotate(${angle}deg) translate(200px) rotate(-${angle}deg)`;
            verifica = false;
        }
    });

});


// evento click per far uscire i docenti da dietro il più e farli tornare dietro
opener.addEventListener('click', () => {


    if (conferma == false) {

        conferma = true;

        opener.style.transform = `rotate(360deg)`;

        movedDivs.forEach((moved, i) => {

            let angle = (360 * i) / movedDivs.length;

            moved.style.transform = `rotate(${angle}deg) translate(200px) rotate(-${angle}deg)`;

        })

    } else {


        opener.style.transform = `rotate(720deg)`;

        movedDivs.forEach((moved, i) => {

            let angle = (360 * i) / movedDivs.length;

            moved.style.transform = `rotate(${360 + angle}deg) translate(0px)`;

            conferma = false;

        })

    }



});