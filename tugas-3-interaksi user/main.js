let scene, camera, renderer, controls;
        let rayCast, mouse;
        let selected, highscore, score;
        let starCount = 0;
        let speed = 10000; 
        
        const speedAccel = 500;
        const minSpeed = 1000;
        const maxCube = 200;
        const colors = [
            0xC2D854,
            0x54A6D8,
            0x4EE095,
            0xE04E95,
            0xB24EE0,
            0xE0A14E,
            0x0A8278

        ];

       //Membuat bintang
       const generateStar = function () {
            const colorsRandom = colors[Math.floor(randomInt(0, 7))];
            const material = new THREE.MeshPhongMaterial({color: colorsRandom, 
                shininess: 100, side: THREE.DoubleSide}); 
                                         
            const geometry =  new THREE.OctahedronGeometry(2);;
            const star = new THREE.Mesh(geometry, material);
            star.position.set(randomInt(-20, 20), randomInt(-20, 20), randomInt(-20, 20));
            scene.add(star);

            starCount += 1;
            return star;
        };

        const randomInt = (from, until) => {
            return from + Math.random() * (until - from);
        };

        const generateCubeLoop = (num = 5) => {
            if (starCount <= maxCube - num) {
                Array(num).fill(0).forEach(generateStar);

                if (speed >= minSpeed + speedAccel) {
                    speed -= speedAccel;
                }
            }

            setTimeout(generateCubeLoop, speed);
        };

        
        
        const deselect = () => {
            if (selected == null) {
                return;
            }

            selected.obj.material.color.setHex(selected.init_color);
            selected = null;
        };

        const dispose = (object) => {
            object.geometry.dispose();
            object.material.dispose();
            scene.remove(object);
            renderer.renderLists.dispose();
        };

        const toggleColor = (once = false) => {
            if (selected) {
                const currentColor = selected.obj.material.color.getHex();

                selected.obj.material.color.setHex(
                    (currentColor === 0xffffff) ? selected.init_color : 0xffffff
                );
            }

            if (once) {
                return;
            }
        };

       //Raycast
        document.addEventListener("click", (e) => {
            mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
            mouse.y = - (e.clientY / window.innerHeight) * 2 + 1;
            rayCast.setFromCamera(mouse, camera);

            let intersects = rayCast.intersectObjects(scene.children, false);

            if (!intersects[0]) {
                deselect();
                return;
            }

            let firstObject = intersects[0].object;

            if (selected != null) {
                compareCube(firstObject);
                return;
            }

            selected = ({
                obj: firstObject,
                init_color: firstObject.material.color.getHex(),
            });

            toggleColor(true);
        });

        const compareCube = (objectCube) => {
            if (selected.obj.uuid === objectCube.uuid) {
                return;
            }

            const first = selected.init_color;
            const second = objectCube.material.color.getHex();

            const currentScore = parseInt(score.textContent);
            const highScore = parseInt(highscore.textContent);

            let newScore;

            if (first === second) {
                dispose(selected.obj);
                dispose(objectCube);
                
                starCount -= 2;
                newScore = currentScore + 10;
            }

            else {
                newScore = currentScore - 10;
            }

            score.textContent = '' + ((newScore >= 0) ? newScore : 0);
            highscore.textContent = '' + ((newScore > highScore) ? newScore : highScore);
            deselect();
        };

        
        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize( window.innerWidth, window.innerHeight );
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        }, false);
        
     
        const init = () => {
            
            score = document.querySelector('#score_value');
            highscore = document.querySelector('#highscore_value');

            // Create the scene
            scene = new THREE.Scene();
            const Texture = new THREE.TextureLoader().load('./img/latar belakang.jfif');
            scene.background = Texture;

            // Create an locate the camera
            camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
            camera.position.y = 5;
            camera.position.z = 50;

            // Generate object
            generateCubeLoop(69);

            // Add lighting
            const pLight = new THREE.PointLight(0xffffff, 3, 200);
            pLight.position.set(20, 10, 100);
            pLight.castShadow = true;
            scene.add(pLight);

            // Create the renderer
            renderer = new THREE.WebGLRenderer();
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
            
            document.body.appendChild(renderer.domElement);
            
            // Create the controller
            controls = new THREE.OrbitControls(camera, renderer.domElement);
            controls.enableDamping = true;

            // Create the raycaster
            rayCast = new THREE.Raycaster();
            mouse = new THREE.Vector2();
            mouse.setX(-1); mouse.setY(-1);

           
            toggleColor();
        };

        const animate = () => {
            renderer.render(scene, camera);
            controls.update();
            requestAnimationFrame(animate);
        };
        
        init();
        animate();