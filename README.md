# React Pokedex

![alt screenshot of the program](/src/Resources/screenshot.jpg "Program screenshot")

## Table of contents

- [Overview](#overview)
  - [What is this?](#what-is-this)
  - [The challenge](#the-challenge)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)



## Overview

### What is this?

I've made this project to exercise using API inside a React.js app

I had made other projects using API concepts but never within React.

### The challenge

Users should be able to:

- See details of any Pokemon they clicked on
- Load more pokemon after they reach the bottom of the page
- Search for pokemon by name or number (even if they were not previously loaded on screen)


### Links

- Finished project: [Pokédex!](https://pokedex-ribeiroallison.vercel.app/)
- The API: [PokéAPI](https://pokeapi.co/)


## My process

### Built with

- [React](https://reactjs.org/) - JS library
- Route hooks (useEffect, useState, useNavigate, useParams)
- Semantic HTML5 markup
- CSS custom properties
- Flexbox

### What I learned

Well, this was a tough cookie...

- How to **unwrap data** from Promise in React.
- Manipulate state while using async functions.
- Iterate thorugh an API pages and extract specific data from it.
- Exhibit data adding to the displayed list one page at a time from the API.
- How to better choose to store data, either in a State or plain old variable. 


#### Some code I'm pride of


This function is the heart of the search engine, it `took me 3 days` to finally come up with a version that works properly. I was having a really hard time to `correctly synchronize async functions, side effects, and loops` in a way that the function calls would be made in the correct order to deliver the expected results

```js
async function catchPokemon() {
        let id = searchParam;
        let foundOnState = props.pokemonData.find(
            (pokemon) =>
            pokemon.id.toString() === id || pokemon.name === id.toLowerCase()
        );
        if (foundOnState) {
            props.setFound(foundOnState);
            goTo(foundOnState.name);
            return;
        }

        let foundOnApi = null;
        let page = props.nextPageURL;
        while (!foundOnApi && page) {
            const searchResult = await getApiInfo(page);
            foundOnApi = searchResult.find(
            (pokemon) =>
                pokemon.id.toString() === id || pokemon.name === id.toLowerCase()
            );
            if (!foundOnApi) {
            page = await getNextPageURL(page);
            }
        }

        if (foundOnApi) {
            props.setFound(foundOnApi);
            goTo(foundOnApi.name);
            page = props.nextPageURL;
        } else {
            goToError();
        }
    }
```



### Continued development

Add the advanced search feature. Making it possible for the user to search not only by name or ID but also by Pokémon type, weaknesses, strengths, etc.