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

// cattura degli span con numero incrementale
let firstSpan = document.querySelector('#firstSpan');
let secondSpan = document.querySelector('#secondSpan');
let thirdSpan = document.querySelector('#thirdSpan');

// cattura dell'h2 "un pò di numeri"
let h2Obs = document.querySelector('#h2Obs');

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
        navLinks.forEach((link)=>{
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
         navLinks.forEach((link)=>{
            link.classList.add('text-accent');
            link.classList.remove('text-secondaryCus');
        });

        // il bottoncino deve scomparire
        scroller.classList.add('d-none');

    }

})




function createInterval(finalNumber, incrementNumberSpan){

    // contatore
    let counter = 0;

    let interval = setInterval(()=>{
        

        // voglio che il counter si fermi a 100
        if(counter < finalNumber){

            counter++
            incrementNumberSpan.innerHTML = counter;
            
        } else {
            clearInterval(interval);
        }
    }, 1);

}





let intersectionConfirm = true;

let observer = new IntersectionObserver(

    (entries)=>{
        entries.forEach((entry)=>{
            if(entry.isIntersecting && intersectionConfirm){
                createInterval(1000, firstSpan);
                createInterval(1500, secondSpan);
                createInterval(2000, thirdSpan);

                intersectionConfirm = false;
            }
        });
    }
)

observer.observe(h2Obs);


// sezione mouse enter camioncini

let trucks = document.querySelectorAll('.fa-truck');

let columns = document.querySelectorAll('.col-custom');



columns.forEach((colonna, i)=>{

    // variabile d'appoggio
    let columnsConfirm = false;

    colonna.addEventListener('mouseenter', ()=>{

        if(columnsConfirm == false){
            trucks[i].classList.remove('text-accent');
            trucks[i].classList.add('text-greyCus');
            trucks[i].style.transform = 'translatex(200px)'
        } else {
            trucks[i].classList.remove('text-secondaryCus');
            trucks[i].classList.add('text-blackCus');

        }
        
    });

    colonna.addEventListener('mouseleave', ()=>{

        if(columnsConfirm == false){

            trucks[i].classList.remove('text-greyCus');
            trucks[i].classList.add('text-secondaryCus');
            columnsConfirm = true;
       
        } else {
            trucks[i].classList.remove('text-blackCus');
            trucks[i].classList.add('text-accent');
            trucks[i].style.transform = 'translatex(0px)'
            columnsConfirm = false;
        }
       

    });
 
});




