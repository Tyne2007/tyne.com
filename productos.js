// Base de productos
        const productos = [
            {
                id: "1",
                name: "Polera Frank Ocean",
                price: 120,
                image: "img/Collection/Frank Ocean/T-Shirt Frank Ocean 1.png",
                images: [
                    "a",
                    "img 2/1.png",
                    "img 2/1.png",
                    "a"
                ],
                description: "Diseño urbano en blanco y negro inspirado en Frank Ocean.",
            },
            {
                id: "2",
                name: "Polera Frank Ocean Blond",
                price: 120,
                image: "img/Collection/Frank Ocean/T-Shirt Frank Ocean 2.png",
                images: [
                    "img/T-Shirt Frank Ocean 1.jpg",
                    "img/T-Shirt Frank Ocean 1.jpg",
                    "img/T-Shirt Frank Ocean 1.jpg",
                    "img/Collection/Frank Ocean/T-Shirt Frank Ocean 2.png"
                ],
                description: "Diseño elegante en tributo a la artista Sade.",
            },
            {
                id: "3",
                name: "Polera Gato SHIT",
                price: 120,
                image: "img/Poleras/T-Shirt Shit.png",
                description: "Estilo provocador con diseño gráfico de gato #SHIT.",
            },
            {
                id: "4",
                name: "Polera Sade",
                price: 120,
                image: "img/Collection/Sade/T-Shirt Sade.png",
                images: [
                    "img/T-Shirt Sade.jpg",
                    "img/T-Shirt Sade.jpg",
                    "img/T-Shirt Sade.jpg",
                    "img/T-Shirt Sade.jpg"
                ],
                description: "Diseño elegante en tributo a la artista Sade.",
            },
            {
                id: "5",
                name: "Polera Music",
                price: 120,
                image: "img/Poleras/T-Shirt Music.png",
                description: "La musica hace conexiones en el alma."
            },
            {
                id: "6",
                name: "Polera Deftones",
                price: 120,
                image: "img/Collection/Deftones/T-Shirt Deftones.png",
                images: [
                    "img/T-Shirt Deftones.jpg",
                    "img/T-Shirt Deftones.jpg",
                    "img/T-Shirt Sade.jpg",
                    "img/T-Shirt Sade.jpg"
                ],
                description: "Sextones.",
            },
            {
                id: "7",
                name: "Polera Gato",
                price: 120,
                image: "img/Poleras/T-Shirt Gato.png",
                images: [
                    "img/T-Shirt Gato.jpg",
                    "img/T-Shirt Gato.jpg",
                    "img/T-Shirt Gato.jpg",
                    "img/T-Shirt Sade.jpg"
                ],
                description: "Sextones.",
            },
            {
                id: "8",
                name: "Donnie Darko",
                price: 120,
                image: "img/Poleras/T-Shirt Donnie Darko.png",
                images: [
                    "img/T-Shirt Donnie Darko.jpg",
                    "img/T-Shirt Donnie Darko.jpg",
                    "img/T-Shirt Sade.jpg",
                    "img/T-Shirt Sade.jpg"
                ],
                description: "Sextones.",
            },
            {
                id: "9",
                name: "Vlone",
                price: 120,
                image: "img/Poleras/T-Shirt VLONE.png",
                images: [
                    "img/T-Shirt Donnie Darko.jpg",
                    "img/T-Shirt Donnie Darko.jpg",
                    "img/T-Shirt Sade.jpg",
                    "img/T-Shirt Sade.jpg"
                ],
                description: "Sextones.",
            },
            {
                id: "10",
                name: "Polera Shh",
                price: 120,
                image: "img/Poleras/T-Shirt Shh.png",
                images: [
                    "img/T-Shirt Shh 2.jpg",
                    "img/T-Shirt Donnie Darko.jpg",
                    "img/T-Shirt Sade.jpg",
                    "img/T-Shirt Shh.jpg"
                ],
                description: "Sextones.",
            },
            {
                id: "11",
                name: "Albúm / C.M.I.Y.G.L",
                price: 120,
                image: "img/Collection/Tyler the creator/3.png",
                images: [
                    "img/Collection/Tyler the creator/5.png",
                    "img/Collection/Tyler the creator/3.png",
                    "img/Collection/Tyler the creator/3.png",
                    "img/Collection/Tyler the creator/3.png"
                ],
                description: "Sextones.",
            },
            {
                id: "12",
                name: "Tyler The Creator",
                price: 120,
                image: "img/Collection/Tyler the creator/4.png",
                images: [
                    "img/Collection/Tyler the creator/2.png",
                    "img/Collection/Tyler the creator/3.png",
                    "img/Collection/Tyler the creator/3.png",
                    "img/Collection/Tyler the creator/4.png"
                ],
                description: "Sextones.",
            },
            {
                id: "13",
                name: "Drake",
                price: 120,
                image: "img/Collection/Drake/T-Shirt Drake 1 W.png",
                images: [
                    "img/Collection/Drake/T-Shirt Drake 1 B.png",
                    "img/Collection/Tyler the creator/3.png",
                    "img/Collection/Tyler the creator/3.png",
                    "img/Collection/Drake/T-Shirt Drake 1 W.png"
                ],
                description: "Sextones.",
            }
        ];



        const params = new URLSearchParams(window.location.search);
        const id = params.get("id");
        const producto = productos.find(p => p.id === id);

        if (producto) {
            document.getElementById("MainImg").src = producto.image;
            document.getElementById("product-name").textContent = producto.name;
            document.getElementById("product-price").textContent = `Bs. ${producto.price}`;
            document.getElementById("product-description").textContent = producto.description;
        } else {
            document.getElementById("product-name").textContent = "Producto no encontrado";
            document.getElementById("MainImg").src = "img/default.jpg";
        }

        //Cambio de imagenes para cada polera smallimg

        if (producto) {
            // Mostrar datos principales
            document.getElementById("MainImg").src = producto.image;
            document.getElementById("product-name").textContent = producto.name;
            document.getElementById("product-price").textContent = `Bs. ${producto.price}`;
            document.getElementById("product-description").textContent = producto.description;

            // Insertar miniaturas dinámicamente
            const smallImgContainer = document.getElementById("smallImgGroup");
            smallImgContainer.innerHTML = ''; // Limpiar por si acaso

            producto.images.forEach((imgSrc, index) => {
                const div = document.createElement('div');
                div.classList.add('small-img-col');

                const img = document.createElement('img');
                img.src = imgSrc;
                img.alt = `Miniatura ${index + 1}`;
                img.classList.add('small-img');
                img.style.width = "100%";

                div.appendChild(img);
                smallImgContainer.appendChild(div);

                // Al hacer clic, cambia la imagen principal
                img.addEventListener('click', () => {
                    document.getElementById("MainImg").src = imgSrc;
                });
            });
        }

        var MainImg = document.getElementById("MainImg");
        var smallimg = document.getElementsByClassName("small-img");

        smallimg[0].onclick = function () {
            MainImg.src = smallimg[0].src;
        }
        smallimg[1].onclick = function () {
            MainImg.src = smallimg[1].src;
        }
        smallimg[2].onclick = function () {
            MainImg.src = smallimg[2].src;
        }
        smallimg[3].onclick = function () {
            MainImg.src = smallimg[3].src;
        }





