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



// inizio fetch
fetch('./annunci.json').then((response)=> response.json()).then((data)=>{

    // cattura del papà di tutti i radio button
    let categoryWrapper = document.querySelector('#categoryWrapper');

    // cattura papà delle cards
    let cardsWrapper = document.querySelector('#cardsWrapper');

function setCategoryFilter(){
    // mappo per avere un array clone con le categorie
    let categories = data.map((annuncio)=> annuncio.category);

    // voglio le sole categorie che non si ripetono
    let uniqueCategories = [];

    categories.forEach((category)=>{
        // per ogni singola categoria, se la categoria non è inclusa in uniqueCategories allora pushala, altrimenti non fare niente
        if(!uniqueCategories.includes(category)){
            uniqueCategories.push(category);
        }
       
    })
    // console.log(uniqueCategories);
    // partendo da uniqueCategories mi creo i radio button in dinamica
    uniqueCategories.forEach((category)=>{

        let div = document.createElement('div');

        div.classList.add('form-check');

        div.innerHTML= `
        
        <input class="form-check-input" type="radio" name="flexRadioDefault" id="${category}">
        <label class="form-check-label" for="${category}">
          ${category}
        </label>

        `;

        categoryWrapper.appendChild(div);

    })
}
   
setCategoryFilter();

// funzione mostra cards
function showCards(array){

    // svuotare il papà
    cardsWrapper.innerHTML = '';

    // sortare le cards in ordine decrescente per prezzo
    array.sort((a, b)=> Number(b.price - a.price));

    array.forEach((annuncio, i)=>{

        let div = document.createElement('div');

        div.classList.add('col-12', 'col-lg-3', 'd-flex', 'justify-content-center');

        div.innerHTML = `
        
                <div class="announcement-card">
                    
                <div className="card-head">
                    <img src="https://picsum.photos/${200+i}" alt="" class="img-card-custom">
                </div>

                    <p class="h3 text-center">${annuncio.name}</p>
                    <p class="h3">${annuncio.category}</p>
                    <p class="h3">${annuncio.price} €</p>
                </div>
        
        `;

        cardsWrapper.appendChild(div);

    })

}

showCards(data);

// evento filtro per categoria
function filterByCategory(array){

    // calcolo interno del parametro reale che ci serve - categoria

    // trasformo la node list dei check inputs in un array
    let trasformazione = Array.from(checkInputs);

    // cerchiamo il bottone che abbia l'attributo checked al click dell'utente
    let cercaBottone = trasformazione.find((radioButton)=> radioButton.checked);

    // troviamo la categoria/parametro reale attraverso l'id del bottone checkato
    let categoria = cercaBottone.id;

    // se la categoria è diversa da All, allora filtra e mostrami solo l'array filtrato con la categoria corrispondente, altrimenti mostrami data, cioè tutti
    if(categoria != 'All'){

        let filtered = array.filter((annuncio)=> annuncio.category == categoria);
        // console.log(filtered);

        return filtered;    

    } else {
        return data;
    }
   
}



// cattura radio buttons
let checkInputs = document.querySelectorAll('.form-check-input');

// console.log(checkInputs);

checkInputs.forEach((checkInput)=>{

    checkInput.addEventListener('click', ()=>{
        // filterByCategory(checkInput.id);
        globalFilter();
    });

})

// cattura input range
let priceInput = document.querySelector('#priceInput');

// cattura numero sotto l'input range
let incrementNumber = document.querySelector('#incrementNumber');


// calcolarci il prezzo max
function setPriceInput(){

    // voglio un array clone con tutti i prezzi, convertiti in numeri
    let prices = data.map((annuncio)=> Number(annuncio.price));

    // console.log(prices);

    // recupero il prezzo maggiore
    let maxPrice = Math.ceil(Math.max(...prices));

    priceInput.max = maxPrice;

    priceInput.value = maxPrice;

    incrementNumber.innerHTML = maxPrice;

    // console.log(maxPrice);
}

setPriceInput();
 
// evento filtro per prezzo

function filterByPrice(array){

    // trovo il prezzo grazie al priceInput.value
    let prezzo = Number(priceInput.value);

    // voglio un array con solo i prodotti con prezzi inferiori al prezzo che passo

    let filtered = array.filter((annuncio)=> Number(annuncio.price <= prezzo));

    console.log(filtered);

    return filtered;

}

priceInput.addEventListener('input', ()=>{

    // filterByPrice(Number(priceInput.value));
    incrementNumber.innerHTML = priceInput.value;
    globalFilter();
})

// cattura dell'input per cercare il prodotto
let wordInput = document.querySelector('#wordInput');

// funzione filtro per parola
function filterByWord(array){

    // calcolo del nome grazie al wordInput.value
    let nome = wordInput.value;

    // voglio un array clone dell'array data, con solo i nomi dei miei prodotti
    let filtered = array.filter((annuncio)=> annuncio.name.toLowerCase().includes(nome.toLowerCase()));

    return filtered;
}
    

// evento filtro per parola
wordInput.addEventListener('input', ()=>{

    // filterByWord(wordInput.value);
    globalFilter();

});

// filtri uniti

function globalFilter(){

    let filteredByCategory = filterByCategory(data);

    let filteredByPrice = filterByPrice(filteredByCategory);

    let filteredByWord = filterByWord(filteredByPrice);

    showCards(filteredByWord);

}

})
// fine fetch



