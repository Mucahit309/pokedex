# Vanilla JavaScript Pokédex 🔴⚪

A responsive, interactive Pokédex web application built with pure Vanilla JavaScript, HTML, and CSS. This project fetches and displays data from the official [PokéAPI](https://pokeapi.co/), focusing on the original 151 Pokémon (Generation 1).

## 🌟 Features

* **Dynamic Data Fetching**: Retrieves Pokémon data asynchronously from the PokéAPI.
* **Batch Loading**: Loads 20 Pokémon at a time with a "Load More" button to ensure optimal performance and avoid API rate limits.
* **Custom UI & Styling**: 
  * Beautiful card layout with hover effects.
  * Dynamic background colors based on a Pokémon's primary type.
* **Detailed Modal View**: Clicking a Pokémon opens a native HTML `<dialog>` modal featuring:
  * Image, ID, Name, and Type badges.
  * Tab navigation between **Main Info** (Height, Weight, Base Experience, Abilities) and **Stats** (HP, Attack, Defense, etc. visualized with progress bars).
  * Left/Right arrows to easily navigate to the previous or next Pokémon without closing the modal.
* **Search Functionality**: Allows users to find specific Pokémon by name.
* **Responsive Design**: Fully optimized for both desktop and mobile devices (down to 320px width).
* **Clean Code Architecture**: Strict separation of concerns (Logic is kept in `script.js`, while HTML structures are isolated in `templates.js`).


## 🚀 Tech Stack

* **HTML5**: Semantic markup, utilizing the modern `<dialog>` element for modals.
* **CSS3**: Custom styling, CSS Grid/Flexbox for layouts, and CSS variables for theming.
* **Vanilla JavaScript (ES6+)**: Asynchronous JavaScript (`async`/`await`), DOM manipulation, and event handling without any external libraries like React or jQuery.
* **PokéAPI**: RESTful API used as the data source.
