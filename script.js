function preencherTabela(id, dados) {
    const tabela = document.getElementById(id);
    tabela.innerHTML = "";

    for (const [rotulo, valor] of Object.entries(dados)) {
        const linha = tabela.insertRow();
        linha.insertCell().textContent = rotulo;
        linha.insertCell().textContent = valor;
    }
}


function mostrarSistema() {
    preencherTabela("sistema", {
        "Navegador": navigator.userAgent,
        "Idioma": navigator.language,
        "Núcleos de CPU": navigator.hardwareConcurrency || "indisponível",
        "Memória (GB)": navigator.deviceMemory || "indisponível neste navegador",
        "Fuso horário": Intl.DateTimeFormat().resolvedOptions().timeZone,
        "Online": navigator.onLine ? "sim" : "não"
    });
}


function mostrarTela() {
    preencherTabela("tela", {
        "Resolução da tela": screen.width + " x " + screen.height,
        "Janela do navegador": window.innerWidth + " x " + window.innerHeight,
        "Modo escuro": window.matchMedia("(prefers-color-scheme: dark)").matches
            ? "sim"
            : "não"
    });
}


mostrarSistema();
mostrarTela();


window.addEventListener("resize", mostrarTela);
document.getElementById("btn-local").addEventListener("click", function () {
    const saida = document.getElementById("local");
    saida.textContent = "Buscando...";

    if (!navigator.geolocation) {
        saida.textContent = "A geolocalização não é suportada por este navegador.";
        return;
    }

    navigator.geolocation.getCurrentPosition(
        function (pos) {
            saida.textContent =
                "Latitude: " + pos.coords.latitude.toFixed(4) +
                ", Longitude: " + pos.coords.longitude.toFixed(4);
        },
        function (erro) {
            saida.textContent =
                "Não foi possível obter a localização: " + erro.message;
        }
    );
});
document.getElementById("arquivos").addEventListener("change", function (evento) {
    const dados = {};

    for (const arq of evento.target.files) {
        dados[arq.name] =
            (arq.size / 1024).toFixed(1) + " KB";
    }

    preencherTabela("lista-arquivos", dados);
});