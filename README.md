# MovieNight

#### Video Demo: [Watch Here](https://youtu.be/RSV2H2RpJKY)
#### Description: A Flask app to find the best of two movies by asking the user indirect questions. The idea is to find which movie will work best for a given audience, by inferring from simple and deeper questions.

## Idea
I have often found myself spending hours and hours looking for the best movies of the night, sometimes between multiple movies, and ending up losing time and energy in this way. The idea of this website is to aid you in choosing a movie based on questions and assessments about a given 2 movies that you want to decide between. The entire philosophy is to understand which movie will work out best for you, without actually asking you this dreadful question.

I started this in late 2023, but got carried away by life and now school, so I could not complete it early. The December version will only be a preliminary version. Simple preloaded questions based on what info I can gather about the two movies. Future versions could include stuff like the opinion of multiple users, a random movie recommendation wheel, a browsing page, and so on. But before that, the initial version needs to be finalized with modular functions and consistent flow.

## Functionality

### Landing Search Page
Allows users to search for two movies to compare.
- **Files**: `/`, `/search`, `templates/search.html`, `static/JS/helpers.js`
- **Description**: 
  - The website's UI is primarily built using Bootstrap and pure HTML and CSS.
  - `templates/layout.html` serves as the landing page. It includes two search boxes where users input the names of two movies. An API call is executed upon pressing the search button. The API connects to RapidAPI (credited on the website) and searches for movies containing a string matching the user input. The API returns a JSON file with a list of objects for each movie. `templates/search.html` then sorts them by popularity and outputs the resulting movies (posters, names, and data) into a Jinja template.
  - The search is done asynchronously for efficiency.
  - Upon displaying the two movies, the user can choose via interactive buttons which one they want and begin the fight.
  - **Key Functions**:
    - `get_movie_info(title, params)` in `helpers.py`: Fetches movie data from the API. This function takes the movie title and parameters as input and returns the movie information in JSON format.
    - `choose(button)` in `static/JS/helpers.js`: Handles the selection of a movie by the user. This function adds the selected movie to the session storage and updates the UI to reflect the user's choice.
  - **Design Decisions**:
    - The use of Bootstrap ensures a responsive and visually appealing layout.
    - Asynchronous API calls improve the user experience by reducing wait times.
    - Session storage is used to maintain state across different pages.

### Fight Page
Presents a quiz to the user to determine which movie is better based on their preferences.
- **Files**: `/fight`, `templates/fight.html`, `static/JS/fight_main.js`, `static/JS/fight_helpers.js`
- **Description**: 
  - Upon choosing two movies and searching for them, the website executes another API call to gather extensive data about the movies, including cast, writers, directors, and similar movies. This helps get an idea of which movies a person might have liked but did not know were made by the same people as the current movie. The search is also done asynchronously to save time.
  - The actual quiz consists of simple and complex questions. Simple questions include rating questions, while complex questions include similarity questions. The complexity of a question is determined by its answer generation and evaluation. This is done via modular functions where the calculation for the score is dependent on the quiz data from `static/assets/questions.json`.
  - Upon finishing the quiz, the function `finishQuiz()` is executed to determine the winner of the two movies.
  - **Key Functions**:
    - `helper_q2()` in `static/JS/fight_helpers.js`: Dynamically populates the quiz with options based on the keywords (genres and themes) of each movie. This function extracts and removes overlapping keywords from the movie data and populates the quiz questions with these keywords.
    - `calculateRatingScore(rating, votes)` in `static/JS/fight_helpers.js`: Calculates a score for each movie based on its variance from a base vote count value. This function ensures that the score does not scale excessively with high differences in votes by using a capped adjustment.
    - `changeQuestion(direction)` in `static/JS/fight_main.js`: Handles navigation between quiz questions. This function updates the current question index based on the direction (next or previous) and displays the corresponding question.
    - `finishQuiz(event)` in `static/JS/fight_main.js`: Calculates the winner and adds a hidden input field to the form. This function determines the winner based on the user's answers to the quiz questions and submits the form with the winner data.
  - **Design Decisions**:
    - The quiz format allows for a more engaging and interactive user experience.
    - Modular functions ensure that the code is maintainable and scalable.
    - The use of session storage allows for seamless data transfer between different stages of the quiz.

### Winner Page
Displays the winning movie based on the user's answers to the quiz and provides a button to go back to the home page.
- **Files**: `/winner`, `templates/winner.html`
- **Description**: 
  - After the quiz is completed, the winning movie is displayed on this page. The user can see the movie's title, poster, and other relevant information.
  - A "New Fight" button is provided to allow the user to start a new comparison.
  - **Key Functions**:
    - `winner` route in `app.py`: Renders the winner page with the winning movie data. This route retrieves the winner data from the session and passes it to the `winner.html` template for rendering.
  - **Design Decisions**:
    - The winner page provides a clear and concise summary of the quiz results.
    - The "New Fight" button encourages users to continue using the application and compare more movies.
    - The use of Bootstrap ensures a consistent and responsive layout.

## Versions

### V0.1 Log
Version 0.1 is officially complete. MovieNight has the basic functionality to compare two movies based on simple questions with pre-coded and dynamic answers. The files themselves are messy, inefficient, and probably won't scale well to smaller devices. However, for now, it is good enough.

### Future Versions
Future versions will include:
- Better efficiency by reducing API calls and image sizes.
- More questions to better understand the user.
- Better optimized scoring functions.
- More modularity in HTML design.
- Better responsiveness in HTML design.
- Animations and transitions for `winner.html` and `fight.html`.
- Better file organization and removal of inline CSS.
- Standardized button classes and forms.
- The use of AJAX efficiency in JS.
- Better use of Flask and Jinja2 (reducing load on the server).
- Consistent use of session storage and Flask session.
- Server-level database for movies, and additional API calls.
- User accounts and history (database).
- User feedback and comments.
- General movie fights averages (database).
- An About Me page and a donation page.
- APIs that connect to streaming servers to see movie availability.
- A better search function for movies that filters unrecognized movies (includes a 'Show more' button).

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/yourusername/movienight.git
    cd movienight
    ```

2. Create a virtual environment and activate it:
    ```sh
    python3 -m venv venv
    source venv/bin/activate
    ```

3. Install the required packages:
    ```sh
    pip install -r requirements.txt
    ```

4. Set up environment variables:
    ```sh
    export FLASK_APP=app.py
    export FLASK_ENV=development
    ```

5. Run the application:
    ```sh
    flask run
    ```

## Usage

1. Open your web browser and go to `http://127.0.0.1:5000/`.
2. Enter the names of two movies you want to compare and click "Search".
3. Answer the quiz questions to determine which movie is better for you.
4. View the winning movie on the winner page.

## Contact

- **Author**: Kareem Rashad
- **Email**: [kareemrashad.sd@gmail.com](mailto:kareemrashad.sd@gmail.com)
- **Discord**: [Discord Channel](https://discord.com/channels/711320935365345281)
- **API Provider**: Adrian Massimo from [RapidAPI](https://rapidapi.com/SAdrian/api/moviesdatabase/)
