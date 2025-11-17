#ifdef GL_ES
precision mediump float;
#endif

uniform float u_time;
uniform vec2 u_resolution;

float h(vec2 p){return fract(sin(dot(p,vec2(0.720,0.680)))*43757.348);}

void main(){
 vec2 st = gl_FragCoord.xy / u_resolution.xy;
 st = st*2.0 - 1.0;

 float a = atan(st.y, st.x);
 float r = length(st);

 float n = h(vec2(a*4. + u_time*.3, r*6.));
 float w = sin(a*12.064 + n*6.184 + u_time*2.0);

 float p = abs(fract((r + w*-0.080)*28.440) - 0.500);

 float m = smoothstep(0.776, -0.040, p);

 float t = fract(a*0.448 + r*-0.372 + u_time*-0.772)*7.323;

 vec3 c = vec3(
   0.7 + 1.2*cos(t),          
   0.7 + 0.568*cos(t+1.782),    
   0.7 + 1.0*cos(t+3.348)     
 );

 vec3 finalColor = c * (0.3 + m*1.2);

 gl_FragColor = vec4(finalColor, 2.448);
}
