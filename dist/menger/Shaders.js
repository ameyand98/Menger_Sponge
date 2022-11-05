export let defaultVSText = `
    precision mediump float;

    attribute vec3 vertPosition;
    attribute vec3 vertColor;
    attribute vec4 aNorm;
    
    varying vec4 lightDir;
    varying vec4 normal;   
 
    uniform vec4 lightPosition;
    uniform mat4 mWorld;
    uniform mat4 mView;
	uniform mat4 mProj;

    void main () {
		//  Convert vertex to camera coordinates and the NDC
        gl_Position = mProj * mView * mWorld * vec4 (vertPosition, 1.0);
        
        //  Compute light direction (world coordinates)
        lightDir = lightPosition - vec4(vertPosition, 1.0);
		
        //  Pass along the vertex normal (world coordinates)
        normal = aNorm;
    }
`;
// TODO: Write the fragment shader
export let defaultFSText = `
    precision mediump float;

    varying vec4 lightDir;
    varying vec4 normal;   
    varying vec4 worldNormal; 
	
    
    void main () {
        vec4 color = abs(normalize(normal)) + vec4(0.0, 0.0, 0.0, 1.0);
        float dot_nl = dot(normalize(lightDir), normalize(normal));
        dot_nl = clamp(dot_nl, 0.0, 1.0); 
        gl_FragColor = clamp(dot_nl * color, 0.0, 1.0);
    }
`;
// TODO: floor shaders
export let floorVSText = `
    precision mediump float;

    uniform vec4 uLightPos;
    uniform mat4 uWorld;
    uniform mat4 uView;
    uniform mat4 uProj;

    attribute vec4 aVertPos;

    varying vec4 vClipPos;

    void main () {

        gl_Position = uProj * uView * uWorld * aVertPos;
        vClipPos = gl_Position;
    }
`;
export let floorFSText = `
    precision mediump float;

    uniform mat4 uViewInv;
    uniform mat4 uProjInv;
    uniform vec4 uLightPos;

    varying vec4 vClipPos;

    void main() {
        vec4 wsPos = uViewInv * uProjInv * vec4(vClipPos.xyz/vClipPos.w, 1.0);
        wsPos /= wsPos.w;
        /* Determine which color square the position is in */
        float checkerWidth = 5.0;
        float i = floor(wsPos.x / checkerWidth);
        float j = floor(wsPos.z / checkerWidth);
        vec3 color = mod(i + j, 2.0) * vec3(1.0, 1.0, 1.0);

        /* Compute light fall off */
        vec4 lightDirection = uLightPos - wsPos;
        float dot_nl = dot(normalize(lightDirection), vec4(0.0, 1.0, 0.0, 0.0));
        dot_nl = clamp(dot_nl, 0.0, 1.0);

        gl_FragColor = vec4(clamp(dot_nl * color, 0.0, 1.0), 1.0);
    }
`;
//# sourceMappingURL=Shaders.js.map