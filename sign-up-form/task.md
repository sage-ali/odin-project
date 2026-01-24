# [Introduction](#introduction)

This project is intended to give you a chance to flex some of the new items you’ve been absorbing over the past few lessons. This time it’s a sign-up form for an imaginary service.

## [Assignment](#assignment)

### [Step 1: Set up and planning](#step-1-set-up-and-planning)

1. Set up your git repository (refer to past projects if you need a refresher).
2. Set up your HTML and CSS files with some dummy content, just to make sure you have everything linked correctly.
3. Download a full-resolution copy of [the design file](https://cdn.statically.io/gh/TheOdinProject/curriculum/afdbabfab03fbc34783c6b6f3920aba4a4d3b935/intermediate_html_css/forms/project_sign_up_form/imgs/sign-up-form.png), and get a general idea for how you’re going to need to lay things out in your HTML document.

### [Step 2: Gather assets](#step-2-gather-assets)

1. The design has a large background-image, so go find and download an image you want to use for that section. The one in the design can be found on [unsplash.com](https://unsplash.com/photos/25xggax4bSA), but feel free to select your own. Be sure to credit the creator of your image!
2. Pick an external font for the ‘logo’ section. We’ve used [Norse Bold](https://cdn.statically.io/gh/TheOdinProject/theodinproject/efdc2888072f409e687d31dc580595dbe4fe0ff4/app/assets/fonts/Norse-Bold.otf), but you can use any font you like.
3. For the image-sidebar, we’ve used this [Odin logo](https://cdn.statically.io/gh/TheOdinProject/curriculum/5f37d43908ef92499e95a9b90fc3cc291a95014c/html_css/project-sign-up-form/odin-lined.png).

#### [Visual Design Breakdown](#visual-design-breakdown)

To help you visualize the end goal, here is a breakdown of the layout shown in the reference image:

**1. The Layout**
The page utilizes a **split-screen layout**:

* **Left Panel (approx. 1/3 width):** A decorative sidebar that spans the full height of the viewport.
* **Right Panel (approx. 2/3 width):** A clean, light-colored content area containing the text and form.

**2. The Left Sidebar (Decorative)**

* **Background:** A high-quality vertical image of green fern leaves.
* **Logo Overlay:** A semi-transparent dark strip appears vertically centered over the background image. Inside this strip is the ODIN logo (icon and text) in white/light gray.
* **Footer:** A small photo credit text is positioned at the absolute bottom of the image ("Photo by Halie West on Unsplash").

**3. The Right Content Area (Functional)**
This side is divided into three distinct vertical sections:

* **Header Section:** Contains the disclaimer text ("This is not a real online service...") and a call to action. The background is a very light gray or off-white.
* **Form Section:** A white container that visually pops out against the background (likely using a box-shadow). It contains:
* A header: "Let's do this!"
* **The Form Grid:** The six input fields (First Name, Last Name, Email, Phone Number, Password, Confirm Password) are arranged in two columns.
* **Input Styling:** The labels are small, uppercase, and bold.

* **Footer Section:** Contains the submit button and the "Already have an account?" link.

**4. UI States Shown**
The design mockup specifically demonstrates two CSS states you need to implement:

* **Focus State:** The "Last Name" input has a blue glow/border, indicating the user is currently clicking in it.
* **Error/Invalid State:** The "Password" and "Confirm Password" fields have red borders, indicating the passwords do not match or are invalid.

### [Step 3: Some tips!](#step-3-some-tips)

1. How you attack this project is mostly up to you, but it is wise to begin by scaffolding out the structure of the page, and then tackle the various sections one by one.
2. The area behind the “ODIN” logo is a div that has a dark, but semi-transparent background color. This enhances the readability of the text against the busy background image.
3. The color we’ve chosen for the ‘Create Account’ button is similar to tones found in the background image. Specifically, it is `#596D48`.
4. The inputs, by default have a very light border (`#E5E7EB`), but we’ve included 2 variations. For starters, the password inputs should have a red border if they contain an invalid password. This can be handled with the `:invalid` pseudo-class you’ve learned in the previous lesson.
5. The other variation is the selected input, which should have a blue border and subtle box-shadow. This can be done with the `:focus` pseudo-class you’ve learned about in an earlier lesson.
6. Do not worry about making your project look nice on mobile. Responsive design isn’t covered until later in the curriculum.
7. Validating that the password fields match each other requires JavaScript. Using JavaScript to validate forms is covered in a future lesson. For now, just validate each field separately.
