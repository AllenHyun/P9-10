# Práctica Semana 9 IG

## Autora

María Cabrera Vérgez

## Enlaces

[- Vídeo de muestra](link)

### Realizado en The Book Of Shaders

## Tareas a realizar

Como entrega, se plantean dos posibles alternativas:

Integración de shaders para su integración en alguna de las tareas anteriores: S6-7 Sistema planetario o/y S8 Visualización de datos.
Desarrollo de un shader de fragmentos con patrones generativo, asegurando que sea ejecutable de editor de The Book of Shaders. Se hará entrega de una versión tiny code aceptando propuestas de hasta 512 bytes. Todas aquellas que cumplan ambas condiciones, se utilizarán para componer un reel conjunto a mostrar en RRSS.
En ambos casos, la documentación explicativa del shader debe incluir la motivación, y una detallada descripción de su desarrollo, con especial énfasis en el desarrollo y citando a las fuentes utilizadas.

## Índice de contenidos

- [Motivación](#motivación)
- [Desarrollo](#desarrollo)
- [Webgrafía](#webgrafía)
  

## Tareas

## Motivación

El trabajo empezó por motivado por un shader más grande y en 3D. Tenía la aparencia de ondas que se movían en varias direcciones. Se consiguió replicar, mientras se probaba, una versión del mismo shader. Como la tarea pedía tiny code, se hizo una versión para The Book of Shaders. Si el shader se colocaba en una posición, tenía la aparencia de círculos que salían de un punto y que iban cambiando de color.

## Desarrollo

Lo primero que se hace es declarar la variable que va a ocuparse del tiempo, que se encuentra involucrado en la animación, y la variable para el tamaño de la pantalla.

``` glsl
#ifdef GL_ES
precision mediump float;
#endif
uniform float u_time;
uniform vec2 u_resolution;
```
### Normalización de coordenadas

Posteriormente, se normalizan las coordenadas de los píxeles (gl_FragCoord.xy) y se convierten para entrar en un rango que va de -1 a 1, usando el medio de la pantalla como el centro del origen. Esto es necesario para cuando luego se deba de dibujar los círculos que se van a ir viendo pon pantalla.

``` glsl
    vec2 p=gl_FragCoord.xy/u_resolution*2.-1.;
```

### Coordenadas polares

Con esto ya hecho, se cogen las coordenadas obtenidas y se hallan las polares. Esto se hizo porque era más sencillo para trabajar con figuras circulares. Además, se guarda el radio de la figura para más adelante.

``` glsl
    float a=atan(p.y,p.x),r=length(p);
```

### Ruido

La figura va a tener cierto ruido, así que se calcula n. Esta variable lo que hace es distorsionar la imagen. Para ello se pueden hacer varias cosas. Se trata el ángulo de la figura. Se define una animacoón tranquila, multiplicando u_time por 0.3. Se mezclan el ángulo y el radio, se le da la aparencia de estar girando.

``` glsl
    float n=fract(sin(dot(vec2(a*4.+u_time*.3,r*5.),vec2(.7,.6)))*4e4);
```

### Ondas 

Se van a definir varios rayos que estarán alrededor del círculo. La onda se mueve con el tiempo, distorsionada.

``` glsl
    float w=sin(a*11.+n*6.+u_time*2.);
```

# Líneas radiales

Una vez con las ondas, se crear líneas repetidas, líneas que son suavizadas con el eso de smoothsteep(). Gracias a w, da la sensación de que estas líneas están vibrando.

``` glsl
    float m=smoothstep(.8,-.05,abs(fract((r-w*.07)*26.)-.5));
```

### Color

Se genera una fase que va a depender del ángulo, del radio y del tiempo. Esta parte es la que simula que el color se mueve a lo largo de la pantalla, dando vueltas.

``` glsl
    float t=fract(a*.4-r*.35-u_time*.7)*7.;

```

### Animación del color

Para que los colores giren, hace falta que estén. La variable 'c' calcula un coseno con diferentes amplitud y desfase. Los diversos colores van cambiaron entre sí, fluyendo por la pantalla.

``` glsl
    vec3 c=vec3(.6+1.1*cos(t),.7+.5*cos(t+1.7),.7+cos(t+3.2));
```

Para finalizar, gl_FragColor añade un brillo fase y es quien terminar de crear el efecto circular con ruido que da vueltas. Se combina el color y las franjas para poder generar el fragmento realizado.

### Resultado final

``` glsl
    gl_FragColor=vec4(c*(.3+m),1.);
```
