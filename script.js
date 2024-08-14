const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const author = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');


// loading
function loading(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}
// complete
function completing(){
    quoteContainer.hidden = false;
    loader.hidden = true;
}

let apiQuotes = [];
// show new Quote
function newQuote(){
    loading();
    // pick up a quote from api array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    
    // check the length of text to determine style
    if (quote.text.length > 40){
        quoteText.classList.add('long-quote');
    }else{
        quoteText.classList.remove('long-quote');
    }
    quoteText.textContent = quote.text;
    author.textContent = quote.author.split(",")[0];
    completing();
}



// get quotes from api
async function getQuotes(){
    loading();
    const apiUrl = 'https://type.fit/api/quotes';
    try{
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    }catch(error){

    }
}

// twitter 
function tweetQuote(){
    const twitterUrl = `https://x.com/intent/tweet?text=${quoteText.textContent} - ${author.textContent}`;
    window.open(twitterUrl,"_blank");
}

newQuoteBtn.addEventListener('click',newQuote);
twitterBtn.addEventListener('click', tweetQuote);

// on load
getQuotes();