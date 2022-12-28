let musicas = [
    {
        titulo: "24K MAGIC",
        artista: "Bruno Mars",
        src: "music/24K Magic.m4a",
        img: "img/magic.jpg",
    },
    {
        titulo: "See You Again",
        artista: "Charlie Puth",
        src: "music/See You Again.mp3",
        img: "img/luz.jpg",
    },
    {
        titulo: "One Call Away",
        artista: "Charlie Puth",
        src: "music/One Call Away.mp3",
        img: "img/piano.jpg",
    },
];

let musica = document.querySelector("audio");
let indexMusica = 0;

let duracaoMusica = document.querySelector(".fim");
let imagem = document.querySelector("img");
let nomeMusica = document.querySelector(".descricao h2");
let nomeArtista = document.querySelector(".descricao i");

renderizarMusica(indexMusica)

// Eventos
document.querySelector(".button-play").addEventListener("click", tocarMusica);

document.querySelector(".button-pause").addEventListener("click", pausarMusica);

musica.addEventListener("timeupdate", atualizarBarra);

document.querySelector(".anterior").addEventListener("click", () => {
    indexMusica--;
    if (indexMusica < 0) {
        indexMusica = 2
    }
    renderizarMusica(indexMusica);
    musica.play()
});

document.querySelector(".proxima").addEventListener("click", () => {
    indexMusica++;
    if (indexMusica > 2) {
        indexMusica = 0
    }
    renderizarMusica(indexMusica);
    musica.play()
});

// Funções
function renderizarMusica(index) {
    musica.setAttribute("src", musicas[index].src);
    musica.addEventListener("loadeddata", () => {
        nomeMusica.textContent = musicas[index].titulo;
        nomeArtista.textContent = musicas[index].artista;
        imagem.src = musicas[index].img;
        duracaoMusica.textContent = segundosParaMinutos(
            Math.floor(musica.duration)
        );
    });
}

function tocarMusica() {
    musica.play();
    document.querySelector(".button-pause").style.display = "block";
    document.querySelector(".button-play").style.display = "none";
}

function pausarMusica() {
    musica.pause();
    document.querySelector(".button-pause").style.display = "none";
    document.querySelector(".button-play").style.display = "block";
}

function atualizarBarra() {
    let barra = document.querySelector("progress");
    barra.style.width =
        Math.floor((musica.currentTime / musica.duration) * 100) + "%";
    let tempoDecorrido = document.querySelector(".inicio");
    tempoDecorrido.textContent = segundosParaMinutos(
        Math.floor(musica.currentTime)
    );
}

function segundosParaMinutos(segundos) {
    let campoMinutos = Math.floor(segundos / 60);
    let campoSegundos = segundos % 60;
    if (campoSegundos < 10) {
        campoSegundos = "0" + campoSegundos;
    }

    return campoMinutos + ":" + campoSegundos;
}
