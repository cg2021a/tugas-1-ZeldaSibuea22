function main() {
    var canvas = document.getElementById("myCanvas");
    var gl = canvas.getContext("webgl");

    // Kubus sebelah kiri (depan atas) 
    const kubus1 = {
        // warna kubus hitam
        colorHitam : [0.00, 0.00, 0.00], 
        // warna kubus Putih
        colorPutih : [0.920, 0.920, 0.920],
       
        //warna kubus Abu
        colorAbu : [0.120, 0.0996, 0.0996],

        // titik-titik penyusun gambar kiri
        A : [-0.75, 0.21],
        B : [-0.10, 0.21],
        C : [-0.75, -0.59],
        D : [-0.10, -0.59],
        E : [-0.68, 0.54],
        F : [-0.15, 0.54],
        G : [-0.12, 0.41],
        H : [-0.71, 0.41],
        I : [-0.47, 0.41],
        J : [-0.72, 0.33],
        K : [-0.29, 0.33],
        L : [-0.11, 0.33],
     
    }

    // Kubus sebelah kanan (kiri atas) 
    const kubus2 = {
        // warna Hitam pada gambar kanan
        colorHitam : [0.00, 0.00, 0.00], 
        // warna Putih pada gambar kanan
        colorPutih : [0.920, 0.920, 0.920],
        //warna kubus Abu
        colorAbu : [0.120, 0.0996, 0.0996],

        // titik-titik penyusun gambar kanan
        A : [0.20, 0.21],
        B : [0.85, 0.21],
        C : [0.20, -0.59],
        D : [0.85, -0.59],
        E : [0.26, 0.54],
        F : [0.8, 0.54],
        G : [0.82, 0.41],
        H : [0.24, 0.41],
        I : [0.47, 0.41],
        J : [0.22, 0.33],
        K : [0.84, 0.33],
        L : [0.64, 0.33],
      
    }

    // kumpulan vertex pada gambar kiri dan kanan
    const vertices = [
        // Depan
        ...kubus1.A, ...kubus1.colorHitam,
        ...kubus1.B, ...kubus1.colorHitam,
        ...kubus1.C, ...kubus1.colorHitam,
        ...kubus1.B, ...kubus1.colorHitam,
        ...kubus1.C, ...kubus1.colorHitam,
        ...kubus1.D, ...kubus1.colorHitam, // 6
        
        //atas 
        ...kubus1.E, ...kubus1.colorAbu,
        ...kubus1.A, ...kubus1.colorAbu,
        ...kubus1.B, ...kubus1.colorAbu,
        ...kubus1.B, ...kubus1.colorAbu,
        ...kubus1.E, ...kubus1.colorAbu,
        ...kubus1.F, ...kubus1.colorAbu, // 6
        
        //garis
        ...kubus1.H, ...kubus1.colorPutih,
        ...kubus1.I, ...kubus1.colorPutih,
        ...kubus1.J, ...kubus1.colorPutih,
        ...kubus1.J, ...kubus1.colorPutih,
        ...kubus1.I, ...kubus1.colorPutih,
        ...kubus1.L, ...kubus1.colorPutih,
        ...kubus1.L, ...kubus1.colorPutih,
        ...kubus1.I, ...kubus1.colorPutih,
        ...kubus1.K, ...kubus1.colorPutih,
        ...kubus1.K, ...kubus1.colorPutih,
        ...kubus1.I, ...kubus1.colorPutih,
        ...kubus1.G, ...kubus1.colorPutih, // 12
        

        //Kubus 2 Kanan
        // Depan
        ...kubus2.A, ...kubus2.colorHitam,
        ...kubus2.B, ...kubus2.colorHitam,
        ...kubus2.C, ...kubus2.colorHitam,
        ...kubus2.B, ...kubus2.colorHitam,
        ...kubus2.C, ...kubus2.colorHitam,
        ...kubus2.D, ...kubus2.colorHitam, // 6
        
        //atas
        ...kubus2.E, ...kubus2.colorAbu,
        ...kubus2.A, ...kubus2.colorAbu,
        ...kubus2.B, ...kubus2.colorAbu,
        ...kubus2.B, ...kubus2.colorAbu,
        ...kubus2.E, ...kubus2.colorAbu,
        ...kubus2.F, ...kubus2.colorAbu, // 6
        
        //garis
        ...kubus2.H, ...kubus2.colorPutih,
        ...kubus2.I, ...kubus2.colorPutih,
        ...kubus2.J, ...kubus2.colorPutih,
        ...kubus2.J, ...kubus2.colorPutih,
        ...kubus2.I, ...kubus2.colorPutih,
        ...kubus2.L, ...kubus2.colorPutih,
        ...kubus2.I, ...kubus2.colorPutih,
        ...kubus2.L, ...kubus2.colorPutih,
        ...kubus2.K, ...kubus2.colorPutih,
        ...kubus2.K, ...kubus2.colorPutih,
        ...kubus2.I, ...kubus2.colorPutih,
        ...kubus2.G, ...kubus2.colorPutih, // 12
        


    ]
    var vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);

    var vertexShaderCode = `
        attribute vec2 aPosition;
        attribute vec3 aColor;
        varying vec3 vColor;
        uniform float uChange;
        void main() {
            gl_Position = vec4(aPosition.x, aPosition.y, 1.0, 1.0);
            vColor = aColor;
        }
    `;

    var buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);


    var vertexShaderSource = `
        attribute vec2 aPosition;
        attribute vec3 aColor;
        varying vec3 vColor;
        uniform float uChange;
        void main() {
            gl_Position = vec4(aPosition.x, aPosition.y, 1.0, 1.0);
            vColor = aColor;
        }
    `;

    var fragmentShaderSource = `
        precision mediump float;
        varying vec3 vColor;
        void main() {
            gl_FragColor = vec4(vColor, 1.0);
        }
    `;

    var vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader, vertexShaderSource);
    var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader, fragmentShaderSource);


    gl.compileShader(vertexShader);
    gl.compileShader(fragmentShader);


    var shaderProgram = gl.createProgram();


    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);


    gl.linkProgram(shaderProgram);


    gl.useProgram(shaderProgram);


    var aPosition = gl.getAttribLocation(shaderProgram, "aPosition");
    gl.vertexAttribPointer(
        aPosition,
        2,
        gl.FLOAT,
        false,
        5 * Float32Array.BYTES_PER_ELEMENT,
        0
    );
    gl.enableVertexAttribArray(aPosition);
    var aColor = gl.getAttribLocation(shaderProgram, "aColor");
    gl.vertexAttribPointer(
        aColor,
        3,
        gl.FLOAT,
        false,
        5 * Float32Array.BYTES_PER_ELEMENT,
        2 * Float32Array.BYTES_PER_ELEMENT
    );
    gl.enableVertexAttribArray(aColor);

    var freeze = false;
    // Interactive graphics with mouse
    function onMouseClick(event) {
        freeze = !freeze;
    }
    document.addEventListener("click", onMouseClick);
    // Interactive graphics with keyboard
    function onKeydown(event) {
        if (event.keyCode == 32) freeze = true;
    }

    function onKeyup(event) {
        if (event.keyCode == 32) freeze = false;
    }
    document.addEventListener("keydown", onKeydown);
    document.addEventListener("keyup", onKeyup);

    // kecepatan sesuai nrp (0038)
    var speed = 0.0038;
    var change = 0;
    var uChange = gl.getUniformLocation(shaderProgram, "uChange");

    function moveVertices() {
        if (vertices[206] < -1.0 || vertices[176] > 1.0) {
            speed = speed * -1;
        }

        for (let i = 121 ; i < vertices.length; i += 5) {
            vertices[i] = vertices[i] + speed;
        }
    }


    function render() {
        moveVertices();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
        change = change + speed;
        gl.uniform1f(uChange, change);

        gl.clearColor(0.730, 0.451, 0.131, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT);
        var primitive = gl.TRIANGLES;
        var offset = 0;
        var nVertex = 48;
        gl.drawArrays(primitive, offset, nVertex);
        requestAnimationFrame(render);
    }
    requestAnimationFrame(render);
}