#ifdef GL_ES
precision mediump float;
#endif
uniform float u_time;
uniform vec2 u_resolution;
void main(){
    vec2 p=gl_FragCoord.xy/u_resolution*2.-1.;
    float a=atan(p.y,p.x),r=length(p);
    float n=fract(sin(dot(vec2(a*4.+u_time*.3,r*5.),vec2(.7,.6)))*4e4);
    float w=sin(a*11.+n*6.+u_time*2.);
    float m=smoothstep(.8,-.05,abs(fract((r-w*.07)*26.)-.5));
    float t=fract(a*.4-r*.35-u_time*.7)*7.;
    vec3 c=vec3(.6+1.1*cos(t),.7+.5*cos(t+1.7),.7+cos(t+3.2));
    gl_FragColor=vec4(c*(.3+m),1.);
}
