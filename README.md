<p align="center"><img src="https://s33.postimg.cc/6rpo5rnlr/LOGO_THREADS_Readme_1.jpg"></p>

## [Visit The App!](https://thread-spinner.firebaseapp.com/#/)
>Logo courtesy of **@Area55** [GitHub](https://github.com/area55git), [Instagram](www.instagram.com/area55_ib)

## Overview
Threads is an application that gives users a fun way of drawing in 3D. Weild a *magic thread* into infinite shapes and patterns. This oddly satisfying drawing toy will keep you mesmerized for ages. Share your creations with the world! 

## Basic Mechanics
While *Threads* is pretty easy to mess around with and make fun drawings, if you ever want to try to make something more precise it would be to your advantage to understand a little about how the drawing engine actually works!

### How are threads made?
When you draw on the screen your stroke is extruded into 3D space following the motion of the *spindle.* You can imagine it as if you are painting on a transparent sphere that is rotating around, when you hold your brush (mouse) still, the ball would still be spinning relative to the brush, leaving a mark across the ball.

### At what depth am I drawing?
The depth at which you are drawing may seem arbitrary, especially since when drawing on a screen it seems as if you only have x and y coordinates (which is true). However, the way <i>Threads</i> works is that the position of the spindle determines the depth. But it is not just the spindle, it also depends on the orientation of the camera. Your drawings are made on the plane parallel to the camera, at the depth of the spindle. So looking top down, you'd be drawing on the xz plane, where looking straight ahead, you are drawing on the xy plane.

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

```
<p align="center"><img src="https://s33.postimg.cc/5co3h51z3/LOGO_THREADS_Readme_2.jpg"></p>
