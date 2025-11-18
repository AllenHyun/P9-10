# Práctica Semana 9 IG

## Autora

María Cabrera Vérgez

### Realizado en The Book of Shaders

## Tareas a realizar

Como entrega, se plantean dos posibles alternativas:

* Integración de shaders para su integración en alguna de las tareas anteriores: S6-7 Sistema planetario o/y S8 Visualización de datos.
  
* Desarrollo de un shader de fragmentos con patrones generativo, asegurando que sea ejecutable de editor de The Book of Shaders. Se hará entrega de una versión tiny code aceptando propuestas de hasta 512 bytes. Todas aquellas que cumplan ambas condiciones, se utilizarán para componer un reel conjunto a mostrar en RRSS.
  
En ambos casos, la documentación explicativa del shader debe incluir la motivación, y una detallada descripción de su desarrollo, con especial énfasis en el desarrollo y citando a las fuentes utilizada

## Índice de contenidos

- [Motivación](#motivación)
- [Desarrollo](#desarrollo)
  * [Normalización](#normalización)
  * [Coordenadas polares](#coordenadas-polares)
  * [Ruido](#ruido)
  * [Ondas](#ondas)
  * [Líneas radiales](#líneas-radiales)
  * [Color](#color)
  * [Animación](#animación)
  * [Resultado](#resultado)
- [Webgrafía](#webgrafía)

## Motivación

El trabajo comenzó inspirado en un shader más grande y en 3D que generaba ondas desplazándose en varias direcciones. Durante las pruebas se consiguió replicar una versión simplificada en 3D que mantenía parte del comportamiento ondulante. Sin embargo, no era posible eso para el trabajo. Al seguir trabajando con la figura conseguida, se notó que adoptaba una forma donde parecía que eran círculos que se van haciendo más grandes gradualmente, cambiando progresivamente el color.

<img width="280" height="263" alt="image" src="images/ejemplo.png" />

El código original era mucho más largo, pero para adaptarlo a los requisitos fue necesario simplificar y modificar partes del shader. Aunque el resultado final no es idéntico a la idea inicial, sí conserva parte del estilo y movimiento del original. Además, cumple el tamaño establecido, que era de 512 bytes (pesa 511 bytes).

## Desarrollo

Lo primero es declarar las variables que controlan el tiempo de la animación (u_time) y la resolución (u_resolution):

```glsl
#ifdef GL_ES
precision mediump float;
#endif
uniform float u_time;
uniform vec2 u_resolution;
```

### Normalización

Se normalizan las coordenadas de los píxeles para que queden en el rango [-1, 1], tomando el centro de la pantalla como origen. Esto facilita la generación de figuras circulares.

```glsl
vec2 p = gl_FragCoord.xy / u_resolution * 2. - 1.;
```

### Coordenadas polares

A partir de las coordenadas normalizadas, se calculan el ángulo (a) y el radio (r). Las coordenadas polares son más adecuadas para trabajar con las estructuras que harán falta para plasmar la idea tal cual.

```glsl
float a = atan(p.y, p.x), r = length(p);
```

### Ruido

La variable n introduce una distorsión (ruido) basada en una función que depende del ángulo, el radio y el tiempo. Esto genera un movimiento progresivo en el patrón.

```glsl
float n = fract(sin(dot(vec2(a*4. + u_time*.3, r*5.), vec2(.7, .6))) * 4e4);
```

### Ondas

Aquí se define una onda circular que se repite alrededor del centro. Está afectada por el ruido anterior para evitar uniformidad excesiva.

```glsl
float w = sin(a*11. + n*6. + u_time*2.);
```

### Líneas radiales

Se crean líneas repetidas que rodean el centro. smoothstep() suaviza los bordes y la onda w hace que vibren ligeramente, puesto que el movimiento debe ser lento.

```glsl
float m = smoothstep(.8, -.05, abs(fract((r - w*.07)*26.) - .5));
```

### Color

t define una fase dependiente del ángulo, del radio y del tiempo. Controla el desplazamiento de los colores.

```glsl
float t = fract(a*.4 - r*.35 - u_time*.7) * 7.;
```

### Animación

c calcula el color final usando tres cosenos. Esto produce un flujo continuo de colores que van fluyendo en la figura, cambiándose entre ellos.

```glsl
vec3 c = vec3(.6 + 1.1*cos(t), .7 + .5*cos(t + 1.7), .7 + cos(t + 3.2));
```

### Resultado

Finalmente, se mezcla el color con la máscara de líneas y se escribe el color del fragmento:

```glsl
gl_FragColor = vec4(c * (.3 + m), 1.);
```
<img width="280" height="263" alt="image" src="images/Captura de pantalla 2025-11-17 162122.png" />
<img width="280" height="263" alt="image" src="images/IG gif.gif" />


## Webgrafía


