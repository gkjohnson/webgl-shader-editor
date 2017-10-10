# webgl-shader-editor
Realtime editor for creating webgl shaders with debugging tools to allow for inspecting local variable definitions in a fragment shader.

[Demo](https://gkjohnson.github.io/webgl-shader-editor/dist/index.bundle.html)

## Goal
After lot of frustration with developing shaders and not being able to easily track the calculations within a shader, I wanted explore what the possibilities for enabling a rich shader debugger might be light while still affording the direct shader code editing.

## Features
#### Real Time Compilation and Render
As the vertex and fragment shader are updated, the render display is updated and errors are displayed as annotations.

#### Pixel Zoom
Zooming in on the image zooms in to a pixel view of the image.

#### Local Variable Value Inspection
Hovering over a pixel in the preview pane will display the values of all the local variables used for that pixel.

#### Local Variable Color Display
Every local variable will be displayed as a rendered image in the preview bar as though that variable were used to output the color for that fragment.

#### LocalStorage Saving
The vertex and fragment shader being written are saved and reloaded on refresh

## Caveats
- Because colors are stored as 4 8bit values, there is a severe loss of precision when reading out floating point values.
- The debug views of local variable values are only relevant after their initial declararation. Further modifications to the variable are not output:
```glsl
vec4 val = vec4(1,1,1,1);

// auto inserted variable output
gl_Position = val;
return;

// not accounted for!
val.r = 0;
```

## TODO
- [ ] Update UI so it's easier to inspect (local variables not persistent, etc)
- [ ] Add the fragment output after the last modification of a variable so we can see the result after the full shader has run
- [ ] Provide non-varying local vertex-shader variables as rendered out frames
- [ ] Add pause button for animated variables

- [ ] Texture upload
- [ ] Uniform variable edit UI
- [ ] Multi-pass shaders, stencil buffer, and screen post-effects
- [ ] Add mouse position into shader uniforms
