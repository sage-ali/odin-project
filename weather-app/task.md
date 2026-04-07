# Project: Weather app

## [JavaScript Course](#javascript-course)

### [Introduction](#introduction)

Use everything we’ve been discussing to create a weather forecast site using the Visual Crossing API from previous lessons. You should be able to search for a specific location and toggle displaying the data in Fahrenheit or Celsius.

You should change the look of the page based on the data, maybe by changing the color of the background or by adding images that describe the weather. (You could even use the Giphy API to find appropriate weather-related gifs and display them). Feel free to use promises or async/await in your code, though you should try to become comfortable with both.

### [API keys, secrets, and security](#api-keys-secrets-and-security)

Not all APIs are free, and depending on how they’re set up, they can cost money per use. This makes them a prime target for people looking to use the API without paying by using **your** API key. They can also be rate-limited, and if someone has access to your API key they can use up all of your uses. One way to prevent this issue is to store your API keys on the server and never send them to the frontend in the first place, this is often done using environment variables and it makes the key available only on the server the code is deployed to.

When talking about API keys and security you’ll often hear “Never trust the client” (client meaning the frontend). Often this means not to trust that data coming _from_ the client is valid, but it also means that you cannot trust anything we send _to_ the client. Because of this, when you leak an API key, GitHub will alert you that you have committed an API key publicly. After following this project, and indeed exposing the API key, you may notice that GitHub will send you this alert. This is totally OK for this project as this API key is publicly available and there is no consequence for exposing it.

### [Assignment](#assignment)

1. Set up a blank HTML document with the appropriate links to your JavaScript and CSS files.
2. Write the functions that hit the API. You’re going to want functions that can take a location and return the weather data for that location. For now, just `console.log()` the information.
3. Write the functions that _process_ the JSON data you’re getting from the API and return an object with only the data you require for your app.
4. Set up a form that will let users input their location and will fetch the weather info (still just `console.log()` it).
5. Display the information on your webpage!
    * While you don’t have to, if you wish to display weather icons then there can be a lot of them to import, so have a look at [dynamic imports](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/import). Unlike plain template strings without an import, [Webpack can read dynamic imports](https://webpack.js.org/api/module-methods/#dynamic-expressions-in-import) and still bundle all the relevant assets.
6. Add any styling you like!
7. Optional: add a ‘loading’ component that displays from the time the form is submitted until the information comes back from the API. Use DevTools to simulate network speeds.
8. Push that baby to GitHub and share your solution below!

-----

### [Visual Design Breakdown (Mobile-First)](#visual-design-breakdown-mobile-first)

#### **1. The Macro Layout (The "Glassmorphism" Dashboard)**

* **Concept:** Since the background needs to change based on the weather, a great modern design trend is "Glassmorphism." You place a full-screen, high-quality background image (or gradient) representing the current weather, and your UI sits on top of it inside semi-transparent, blurred cards.
* **The Background:** An absolute-positioned background that covers the viewport (`min-height: 100vh`). If it's raining, a dark, moody rain image; if sunny, a bright blue sky.
* **The Main Container:** A central column (max-width around `500px` for desktop scaling) with a little padding so the UI doesn't touch the very edges of the screen.

#### **2. Search & Controls (The Header)**

* **Layout:** A flexible row at the very top.
* **Search Bar:** A semi-transparent input field. Include a `search` **Material Icon** inside the input field on the left.
* **Unit Toggle:** A clean toggle button or switch on the top right to swap between °C and °F. You can use the `thermostat` **Material Icon** next to it.
* **Interaction:** When the user types and hits enter (or a submit arrow), the loading state triggers.

#### **3. Current Weather (The Hero Section)**

* **Layout:** A large, prominent section directly below the search.
* **Location & Date:** City name in a large, clean font (e.g., `<h1>`). The current date formatted nicely below it.
* **The Main Display:** \* A massive temperature reading (e.g., **72°**).
  * A large **Material Icon** representing the condition right next to it (`sunny`, `cloud`, `rainy`, `thunderstorm`, `ac_unit` for snow).
  * A short text description of the condition (e.g., "Partly Cloudy").

#### **4. Weather Details (The Grid)**

* **Layout:** A frosted glass card (`background: rgba(255, 255, 255, 0.2); backdrop-filter: blur(10px);`) containing a 2x2 or 3x2 CSS Grid.
* **Metrics:** Use smaller **Material Icons** to represent specific data points to keep the UI clean and readable without too much text.
  * `water_drop` for **Humidity** (e.g., 45%)
  * `air` for **Wind Speed** (e.g., 12 mph)
  * `visibility` for **Visibility** (e.g., 10 miles)
  * `compress` or `speed` for **Pressure**
  * `wb_twilight` for **Sunrise/Sunset**

#### **5. Animations & States**

* **The Loading State:** When fetching data, replace the "Hero Section" with a spinning `sync` **Material Icon** or a skeleton loader. Do not leave the old weather data on the screen while the new data is fetching.
* **Background Transitions:** When the city changes (e.g., moving from sunny Miami to snowy Denver), use a CSS `transition` on the background image or color so it cross-fades smoothly rather than snapping instantly.
* **Error State:** If the user searches for a city that doesn't exist, show an `error_outline` Material Icon and a polite message ("We couldn't find that location").

-----

### [New Concepts Checklist](#new-concepts-checklist)

To make this app robust and beautiful, here are the new concepts you should research and apply:

#### **JavaScript Concepts**

1. **`async` / `await` and `try...catch`:** The assignment mentions Promises, but `async/await` is the modern standard for fetching data. You need to learn how to wrap your API calls in a `try...catch` block so your app doesn't crash if the API is down or the city is mistyped.
2. **Object Destructuring:** Weather APIs return _massive_ JSON objects full of data you don't need. Learn how to use destructuring to pluck out only the specific variables you want (like `temp`, `conditions`, `humidity`) immediately upon receiving the data.
3. **Debouncing (Optional but Pro):** If you decide to make the search fetch data _as the user types_ (rather than waiting for a submit button), you must learn "debouncing." This prevents your app from making 10 API calls if the user types a 10-letter city quickly.

#### **CSS Concepts**

1. **`backdrop-filter: blur()`:** This is the CSS property that creates the "Frosted Glass" (Glassmorphism) effect. It blurs the background image _behind_ the element, making text highly readable even on complex backgrounds.
2. **CSS Custom Properties for Themes:** Instead of writing complex JavaScript to change every element's color when the weather changes, use JS to update a few CSS variables on the `:root` (like `--text-color` or `--glass-bg`).
3. **CSS Scroll Snapping (For Forecasts):** If you add a 7-day forecast row at the bottom, don't stack them vertically. Put them in a horizontal flexbox with `overflow-x: auto` and use CSS `scroll-snap-type` so the user can smoothly swipe through the days like a native mobile app.
4. Tailwind Glassmorphism (`backdrop-blur`): Instead of custom CSS, use Tailwind’s native backdrop utility classes. Combine `bg-opacity` with `backdrop-blur` to create the frosted effect.
   * **Instruction:** Use `bg-white/10 backdrop-blur-md border border-white/20` for glass panels. This ensures the background blurs while maintaining a subtle "sheen" on the surface.
5. Semantic Color Variables (Arbitrary Values): To handle dynamic weather themes (e.g., Sunny vs. Stormy) within Tailwind's framework, use CSS variables mapped to Tailwind classes or arbitrary value syntax.
   * **Instruction:** Define theme variables in your global CSS (e.g., `--weather-accent`) and reference them in Tailwind using the square bracket notation, like `text-[var(--weather-accent)]` or `bg-[var(--weather-glass)]`. This allows you to swap the entire UI color palette by changing one variable on the `<body>` tag.
6. Tailwind Scroll Snapping: For the horizontal 7-day forecast, leverage Tailwind’s layout and snap utilities to create a "native app" feel.
   * **Instruction:** Use `flex overflow-x-auto snap-x snap-mandatory` on the container. Each daily forecast card should have the `snap-center` or `snap-start` class. This ensures that when a user swipes on mobile, the cards "lock" into place perfectly rather than stopping awkwardly between days.
7. Mobile-First Utility Pattern: Since this is for mobile web browsers, prioritize the mobile layout as the default.
   * **Instruction:** Write utility classes for mobile first (e.g., `w-full`), and use the `md:` prefix only to "undo" mobile styles for desktop (e.g., `md:w-64`). This keeps the mobile CSS footprint smaller and more performant.

-----
