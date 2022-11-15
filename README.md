# Pixels

[Live Demo](https://cheerful-malabi-43f624.netlify.app/)

This sketch started off as an experiment with pixel manipulation and evolved into me recreating the painful migraine aura attacks that I get every so often. I wanted to keep every single step that I took towards the aura itself. The first step was to load the video and get the pixel values and display them in a grid, with a slider to change each grid block's size, then I changed all the rect functions to objects of a class that I made for further manipulation of the shapes of my grid blocks, I used quad instead of rect to be able to change the shape beyond just a rectangle, then used Perlin noise because I love Perlin noise, and to have a random smooth moving point, finally added the aura effect by setting the p5 blend mode to ADD, I played with the structure of show function inside the class to make the chaos mode, it just sets the coordinates of the quad randomly instead of a typical square or rectangle-like shape. The aura effect is closer to real life migraine aura if the grid size is set to a lower value;
