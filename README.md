# MovieNight

#### Video Demo: [Watch Here](https://youtu.be/RSV2H2RpJKY)
#### Description: A Flask app to find the best of two movies by asking the user indirect questions. The idea is to find which movie would work best for a given audience, by inferring from simple and deeper questions.

## Idea
- I have often found myself spending hours and hours looking for the best movies of the night, sometimes between multiple movies, and ending up losing time and energy in this way.
- The idea of this website is to aid you in choosing a movie based on questions and assessments about a given 2 movies that you want to decide between. The entire philosophy is to understand which movie will work out best for you, without actually asking you this dreadful question.
- I started this in late 2023, but got carried away by life and now school, so I could not complete it. However, I plan to finish it now before December.
- The December version will only be a preliminary version. Simple preloaded questions based on what info I can gather about the two movies. Future versions could include stuff like the opinion of multiple users, a random movie recommendation wheel, a browsing page, and so on. But before that, the initial version needs to be finalized with modular functions and consistent flow.

## Functionality
- **Search Page**: Allows users to search for two movies to compare.
- **Fight Page**: Presents a quiz to the user to determine which movie is better based on their preferences.
- **Winner Page**: Displays the winning movie based on the user's answers to the quiz.

## Versions
### V0.1 Log:
Version 0.1 is officially complete.
MovieNight has the basic functionality to compare two movies based on simple questions with pre-coded and dynamic answers.
The files themselves are messy, inefficient, and probably won't scale well to smaller devices.
However, for now, it is good enough.

### Future Versions
Future versions will include:
- Better efficiency by reducing API calls and image sizes.
- More questions to better understand the user.
- Better optimized scoring functions.
- More modularity in HTML design.
- Better responsiveness in HTML design.
- Animations and transitions for winner.html and fight.html.
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

## Contributing
1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a pull request.

## License
This project is licensed under the MIT License - see the LICENSE file for details.

## Contact
- **Author**: Kareem Rashad
- **Email**: [kareemrashad.sd@gmail.com](mailto:kareemrashad.sd@gmail.com)
- **Discord**: [Discord Channel](https://discord.com/channels/711320935365345281)
