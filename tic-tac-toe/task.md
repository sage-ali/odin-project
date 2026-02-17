# Project: Tic Tac Toe

## [Introduction](#introduction)

We’re making a Tic Tac Toe game you can play in your browser!

## [Assignment](#assignment)

1. Set up your project with HTML, CSS and JavaScript files and get the Git repo all set up.
2. You’re going to store the gameboard as an array inside of a Gameboard object, so start there! Your players are also going to be stored in objects, and you’re probably going to want an object to control the flow of the game itself.
    1. Your main goal here is to have as little global code as possible. Try tucking as much as you can inside factories. If you only need a single instance of something (e.g. the gameboard, the displayController etc.) then wrap the factory inside an IIFE (module pattern) so it cannot be reused to create additional instances.
    2. In this project, think carefully about where each bit of logic should reside. Each little piece of functionality should be able to fit in the game, player or gameboard objects. Take care to put them in “logical” places. Spending a little time brainstorming here can make your life much easier later!
    3. If you’re having trouble, [Building a house from the inside out](https://www.ayweb.dev/blog/building-a-house-from-the-inside-out) is a great article that lays out a highly applicable example both of how you might approach tackling this project as well as how you might organize and structure your code.
3. Focus on getting a working game in the console first. Make sure you include logic that checks for when the game is over! You should be checking for all winning 3-in-a-rows and ties. Try to avoid thinking about the DOM and your HTML/CSS until your game is working. Don’t worry about taking user input at this point either. You can call your functions and pass arguments to them to play the game yourself and check if everything is working as intended.
4. Once you have a working console game, create an object that will handle the display/DOM logic. Write a function that will render the contents of the gameboard array to the webpage (for now, you can always just fill the gameboard array with `"X"`s and `"O"`s just to see what’s going on).
5. Write the functions that allow players to add marks to a specific spot on the board by interacting with the appropriate DOM elements (e.g. letting players click on a board square to place their marker). Don’t forget the logic that keeps players from playing in spots that are already taken!
6. Clean up the interface to allow players to put in their names, include a button to start/restart the game and add a display element that shows the results upon game end!

---

### [Visual Design Breakdown](#visual-design-breakdown)

#### **1. The Macro Layout (The Arena)**

* **Concept:** A "Clean Slate" aesthetic. The focus is entirely on the board.
* **The Container:** Use a centered layout with a **responsive constraint** using the CSS `min()` function (e.g., `width: min(95vw, 450px)`). This ensures the board is huge on mobile but doesn't get ridiculously large on desktop.
* **The Header:** Minimalist. Just the title "Tic Tac Toe" and a **Theme Toggle** (Sun/Moon icon) in the corner.
* *New Challenge:* Use **CSS Variables (Custom Properties)** to handle the colors. Define `--bg-color`, `--text-color`, and `--board-color` on the `:root`, and swap them via a generic class on the `<body>`.

#### **2. The Game Board (The Grid)**

* **Structure:** Use **CSS Grid** with `grid-template-columns: repeat(3, 1fr)`.
* **The Look:** Instead of drawing borders around the cells, try a **"floating tile"** look or a **"neumorphic"** (soft shadow) style where the cells appear to be pressed into the background.
* **Hover Effects (The "Ghost" Move):**
* *New Challenge:* When it's Player X's turn, hovering over an empty cell should show a faint, semi-transparent "X". When it's O's turn, show a faint "O".
* *Implementation:* You can achieve this by toggling a class on the *board container* (e.g., `.board.x-turn`) and using complex CSS selectors to style the empty cells inside it.

#### **3. The Marks (SVG Animation)**

* **The Icons:** Don't use the letter "X" or "O" from a font. Use **inline SVGs**.
* **X:** Two paths crossing.
* **O:** A circle path.

* **The Animation:** This is the "wow" factor. When a player clicks:
* **X Animation:** The two lines should draw themselves from center to outside or corner to corner.
* **O Animation:** The circle should draw itself comfortably around the center.
* *New Concept to Learn:* **SVG Stroke Animation**. You will use the CSS properties `stroke-dasharray` and `stroke-dashoffset` to make the lines look like they are being drawn in real-time.

#### **4. The HUD (Heads Up Display)**

* **Turn Indicator:** A pill-shaped element above the board that says "Player X's Turn".
* *Accessibility (Crucial):* This element must be an **ARIA Live Region** (`aria-live="polite"`). This ensures that every time the text changes, screen readers immediately announce it to the user without them having to navigate to find the text.

* **Scoreboard:** Small counters at the bottom for "Player X Wins", "Ties", and "Player O Wins".

#### **5. Game Over & Settings (Dialogs)**

* **Start Screen:** Use a `<dialog>` modal that opens immediately on load. It asks for Player names and lets them pick their symbol.
* **Game Over:** Re-use the `<dialog>` element.
* **Backdrop:** Use a heavily blurred backdrop (`backdrop-filter: blur(5px)`) to obscure the finished game state while keeping it visible.
* **Result:** Large, celebratory text ("X Wins!") with a "Play Again" button that pulses (`transform: scale()`) to invite a click.

---

### [New Concepts Checklist](#new-concepts-checklist)

To achieve this design, you will need to research and apply these new concepts:

1. **SVG Stroke Animation:** How to use CSS to animate the `stroke-dashoffset` of an SVG path.
2. **CSS Custom Properties (Variables):** How to use variables like `--hue: 200;` to control your entire color palette and easily switch themes.
3. **ARIA Live Regions:** Understanding how `role="status"` or `aria-live` works for dynamic updates in turn-based games.
4. **CSS `min()` and `clamp()`:** For fluid, math-based responsiveness without needing a dozen `@media` queries.
