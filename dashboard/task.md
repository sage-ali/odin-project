# Dashboard project

## [Introduction](#introduction)

Now that you’ve had plenty of practice using Grid, we are going to build a full dashboard design. For this project, use whatever tools you need to get it done, but try to lean on Grid for the majority of the layout work. Go back through the lessons or practice assignments if you need a refresher.

![dashboard project](./assets/task.png)

### [Visual Design Breakdown](#visual-design-breakdown)

To help you plan your CSS Grid, here is a breakdown of the UI layout shown in the reference image:

**1. The Macro Layout**
The entire viewport is divided into two major columns and two major rows, forming an "L" shape content area:

* **Sidebar (Left Column):** A fixed-width, full-height navigation bar in blue.
* **Header (Top Row):** A white strip spanning the remaining width, containing search and user profile actions.
* **Main Content (Bottom Right):** A light gray background containing the actual dashboard widgets.

**2. The Sidebar (Navigation)**

* **Logo:** A "Dashboard" title with a large icon at the top left.
* **Navigation Links:** A list of icon+text links (Home, Profile, Messages, History, Tasks, Communities).
* **Footer Links:** A secondary group of links pushed to the bottom or separated by space (Settings, Support, Privacy).

**3. The Header (User Actions)**
The header is split into two horizontal strips:

* **Top Strip:** Contains a search bar (pill-shaped), a notification bell icon, and a small user avatar with the name.
* **Bottom Strip:** Contains a clear "Hi there," greeting with a larger avatar, and three primary action buttons (New, Upload, Share).

**4. The Main Content Grid**
This area uses a grid to manage two unequal columns (approx 3:1 ratio):

* **Left Column (Projects):**
* A section title: "Your Projects".
* **The Card Grid:** A sub-grid of 6 white cards.
* **Card Details:** Each card has a decorative colored left border (orange), a title, description text, and three action icons aligned to the bottom right (star, eye, share).

* **Right Column (Announcements & Trending):**
* **Announcements Card:** A single tall card containing a list of news items (Title + truncated text).
* **Trending Card:** A card containing a list of users, each with an avatar, handle, and short description.

---

## [Assignment](#assignment)

### [Step 1: Set up and planning](#step-1-set-up-and-planning)

1. Set up your Git repository (refer to past projects if you need a refresher).
2. Set up your HTML and CSS files with some dummy content, just to make sure you have everything linked correctly.
3. Download a full-resolution copy of the [project design file](https://cdn.statically.io/gh/TheOdinProject/curriculum/43cc6ab69fdfbef40d431a65677d2144668930ac/intermediate_html_css/grid/project_admin_dashboard/imgs/dashboard-project.png) and get a general idea for how you’re going to need to lay things out in your HTML document.

### [Step 2: Layout](#step-2-layout)

1. Start by writing out the HTML elements for the sidebar, header and main-content containers.
2. In your CSS file, apply Grid properties until you have this basic layout built.

### [Step 3: Nesting](#step-3-nesting)

1. Taking it one section at a time, begin nesting child elements under the parent elements in the HTML. Remember that you can keep making grid containers within grid containers.
2. In the sidebar, use more grids to lay out the navigation and branding sections.
3. In the header, use more grids to lay out the search bar, user info and buttons.
4. For the main-content, use more grids to lay out the projects, announcements and trending items.
5. Fill out some dummy content and placeholder images so you can position all of your grid items.

### [Step 4: Gather assets](#step-4-gather-assets)

1. Once you have your grid layout complete you can either recreate the dashboard example above or style your own design.
2. All of the icons and more can be downloaded as SVGs from [Material Design Icons](https://pictogrammers.com/library/mdi/).
3. Choose your own fonts! The design example uses `Roboto`, which is available with Google fonts. (You may want to review the [More Text Styles Lesson](https://www.theodinproject.com/lessons/intermediate-html-and-css-more-text-styles) for information about how to include external fonts in your projects).

### [Step 5: Some tips!](#step-5-some-tips)

1. When building the layout, apply background colors or borders to your containers to help you visualize your grid.
2. It’s up to you whether to use pixels, `fr` units or both for your grid tracks.
3. This project does not have to be responsive, but if you’d like to, you can expand or shrink the project cards section when resizing the browser window.
4. You don’t have to make a pixel perfect match with the design example. Consider this an opportunity to practice your CSS skills with your own designs.
5. Don’t forget to push your finished dashboard to GitHub. Use GitHub Pages to publish it to the world!
