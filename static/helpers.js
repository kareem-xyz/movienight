// initialise variables for efficiency
var highlighted = [2]; // for css highlighting, stores button
const col_0 = document.getElementById("col_0");   // References html element of list 0
const col_1 = document.getElementById("col_1");   // References html element of list 1

// Initialise Arrays
for (let i = 0; i < 2; i++)
{
    highlighted[i] = ""
}

// Run whenever a choose movie button is pressed to note the movie and makes sure to not conflict lists.
function choose(button)
{
    var movie = button;
    movie_list = movie.getAttribute("data-list");

    if (highlighted[movie_list])
    {
        // If same movie do nothing and return.
        if (highlighted[movie_list] == movie)
        {
            return
        };

        // Else, Remove highlight from the movie chosen before 
        highlighted[movie_list].classList.add("btn-outline-primary");
        highlighted[movie_list].classList.remove("btn-primary");
        highlighted[movie_list].innerHTML = "Choose";
    };
    
    // Highlight new chosen movie
    movie.innerHTML = "Chosen!";
    movie.classList.add("btn-primary");
    movie.classList.remove("btn-outline-primary");

    // Save
    highlighted[movie_list] = movie;

    // Update input field for search form
    document.getElementById(`movie${movie_list}`).value = movie.getAttribute("data-title");
    
    // Save the new movie's data for later form submission
    movie_index = movie.getAttribute("data-index");
    if (movie_list == '0'){
        sessionStorage.setItem('choice_0', JSON.stringify(datalist_0[Number(movie_index)]));
    }
    else {
        sessionStorage.setItem('choice_1', JSON.stringify(datalist_1[Number(movie_index)]));
    }
    return true;
}

function InputAndSubmit(event) {

    // Prevent the default form submission

    // Create a hidden input field to add choices
    var hiddenInput_0 = document.createElement('input');
    var hiddenInput_1 = document.createElement('input');

    hiddenInput_0.type = 'hidden';
    hiddenInput_1.type = 'hidden';

    hiddenInput_0.name = 'choice_0';
    hiddenInput_1.name = 'choice_1';

    // Currently sends the whole choice data (later on will refine to save data)
    hiddenInput_0.value = sessionStorage.getItem('choice_0');
    hiddenInput_1.value = sessionStorage.getItem('choice_1');

    // Check if choice_0 and choice_1 exist
    if (hiddenInput_0 =='null' || hiddenInput_1 =='null')
    {
        return false;
    }

    // Append the hidden input field to the form
    event.target.appendChild(hiddenInput_0);
    event.target.appendChild(hiddenInput_1);

    // Continue with the form submission
    return true; // Returning true allows the form submission to proceed
}

