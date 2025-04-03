const API_URL = "https://back-spider.vercel.app/publicacoes/listarPublicacoes";
const userToken = localStorage.getItem("token"); // Ou obtenha do login


// Função para extrair o userId do token JWT
function obterUserIdDoToken(token) {
    try {
        const payload = JSON.parse(atob(token.split(".")[1])); // Decodifica o payload do token
        console.log("UserID extraído do token:", payload.userId);
        return payload.userId;
    } catch (error) {
        console.error("Erro ao decodificar o token:", error);
        return null;
    }
}

// Função para buscar e validar as publicações do usuário logado
async function validarPublicacoesDoUsuario() {
    try {
        // Requisição ao endpoint
        const response = await fetch(API_URL, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${userToken}`, // Envia o token se necessário
                "Content-Type": "application/json",
            },
        });

        // Verifica se a resposta foi bem-sucedida
        if (!response.ok) {
            throw new Error(`Erro ao buscar publicações: ${response.status} ${response.statusText}`);
        }

        // Converte a resposta para JSON
        const publicacoes = await response.json();
        console.log("Publicações recebidas:", publicacoes);

        // Obtém o ID do usuário logado
        const userIdLogado = obterUserIdDoToken(userToken);
        if (!userIdLogado) {
            console.error("Erro: não foi possível obter o userId do token.");
            return;
        }

        // Filtra publicações que pertencem ao usuário logado
        const minhasPublicacoes = publicacoes.filter(pub => pub.userId === userIdLogado);

        // Exibe os resultados no console
        console.log("Publicações do usuário logado:", minhasPublicacoes);
        
        // Exibe no HTML (opcional)
        mostrarPublicacoesNoHTML(minhasPublicacoes);
        
    } catch (error) {
        console.error("Erro:", error);
    }
}

// Função opcional para exibir as publicações no HTML
function mostrarPublicacoesNoHTML(publicacoes) {
    const container = document.getElementById("publicacoesContainer");
    if (!container) return;
    
    container.innerHTML = ""; // Limpa o conteúdo anterior

    if (publicacoes.length === 0) {
        container.innerHTML = "<p>Nenhuma publicação encontrada para este usuário.</p>";
        return;
    }

    publicacoes.forEach(pub => {
        const div = document.createElement("div");
        div.className = "publicacao";
        div.innerHTML = `
            <h3>${pub.titulo || "Sem título"}</h3>
            <p>${pub.conteudo || "Sem conteúdo"}</p>
            <small>ID da publicação: ${pub.id}</small>
        `;
        container.appendChild(div);
    });
}

// Chama a função para validar as publicações do usuário
validarPublicacoesDoUsuario();
