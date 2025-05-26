# Frontend Mentor - Mood tracking app solution

This is a solution to the [Mood tracking app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/mood-tracking-app-E2XeKhDF0B). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)

## Overview

### The challenge

Users should be able to:

- Log their mood, feelings, reflections, and sleep each day
- See today's mood, feelings, reflection, and sleep, once logged
- See a relevant mood quote based on today's mood (found in the `data.json` file)
- See a graph showing the most recent eleven records to identify mood and sleep trends
- Interact with each bar on the mood and sleep trends chart to see all information about that day
- See their average mood and sleep from the past five check-ins and see how they compare with the previous five
- Update their name or avatar through settings
- View the optimal layout for the interface depending on their device's screen size
- See hover and focus states for all interactive elements on the page
- **Bonus**: Save details to a database (build the project as a full-stack app)
- **Bonus**: Create an account and log in (add user authentication to the full-stack app)
- **Bonus**: Integrate with a third-party image-hosting service for the avatar upload

### Screenshot

![](./preview.jpg)

### Links

- Solution URL: [Github](https://github.com/DmytroVoitovych/mood-app)
- Live Site URL: [Live page](https://mood-app-set-your-mood.web.app/)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- Mobile-first workflow
- [Element-plus](https://element-plus.org/en-US/) - UI library
- [Vue.js](https://vuejs.org/) - Vue framework
- [VueUse](https://vueuse.org/) - Composition Utilities
- [Unplugin Vue Router](https://uvr.esm.is) - Typed, file-based routing for Vue 3

### What I learned

Actually, each project like this teaches me a lot. I want to highlight that I improved my knowledge of using the Element Plus UI library. I used the Unplugin Vue Router for the first time and it is really amazing. I also became more confident with Firebase configuration.
There was a CSS challenge in the diagram section. I learned about the limitations of the Date object, that it works and handles arguments depending on the host environment, so I had to be careful with that.
I also learned about median statistics and implemented it in code.
Overall, this was a very useful project for improving my skills.

My implementation for diagram date list , see below:

```ts
/**
 * Generates a list of date mappings for the past N days including today.
 * Each item is an object where the key is a short date format (e.g., "26 May")
 * and the value is a full date string (e.g., "Monday, 26 May 2025").
 *
 * @param days - Number of days to include in the list (must be >= 1).
 * @returns A readonly array of date mappings in chronological order (oldest to newest).
 */
const createDateList = (days: number): readonly Record<string, string>[] => {
  const shortFormat: Intl.DateTimeFormatOptions = { day: "numeric", month: "long" };
  const fullFormat: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const getDayAgo = (num: number): number => new Date().getTime() - num * 24 * 60 * 60 * 1000;

  const dateList: Record<string, string>[] = [];

  for (let i = days - 1; i >= 0; i--) {
    const timestamp = getDayAgo(i);
    const date = new Date(timestamp);

    const shortLabel = date.toLocaleDateString("en-US", shortFormat);
    const fullLabel = date.toLocaleDateString("en-US", fullFormat);

    dateList.push({ [shortLabel]: fullLabel });
  }

  return dateList;
};

console.log(createDateList(3));
/*
[
  { '24 May': 'Saturday, 24 May 2025' },
  { '25 May': 'Sunday, 25 May 2025' },
  { '26 May': 'Monday, 26 May 2025' }
]
*/
```

### Continued development

I plan to develop something like this next time using React, to refresh my knowledge of React and not become too dependent on Vue.

### Useful resources

- [Median formula](https://en.wikipedia.org/wiki/Median) - This helped me for calculating statistics.
- [New HTML attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/inert) - New attribute that makes our life simpler

## Author

- Website - [My website](https://portfolio-dmytrovoitovych.vercel.app/)
- Frontend Mentor - [@DmytroVoitovych](https://www.frontendmentor.io/profile/DmytroVoitovych/solutions)
