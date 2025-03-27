/*document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault();
    alert('Cadastro realizado com sucesso!');
});*/



document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("formaCadastro").addEventListener("submit", async function (event) {
        event.preventDefault();

        const nome = document.getElementById("usuario").value; // Alterado de 'usuario' para 'nome'
        const email = document.getElementById("email").value;
        const senha = document.getElementById("senha").value;
        const premium = document.getElementById("plano").value || "0"; // Alterado para 'premium' e mantendo string
        const imagemPerfil = document.getElementById("imagem").value; // Alterado de 'imagem' para 'imagemPerfil'
        const senhaRecuperacao = document.getElementById("senhaRecuperacao").value

        const dados = {
            nome: nome,
            email: email,
            senha: senha,
            premium: premium,
            imagemPerfil: imagemPerfil,
            senhaRecuperacao: senhaRecuperacao
        };

        console.log("🔍 Dados enviados:", JSON.stringify(dados, null, 2));

        try {
            const resposta = await fetch("https://back-spider.vercel.app/user/cadastrarUser", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(dados)
            });

            const resultado = await resposta.json();
            console.log("🔍 Resposta da API:", resultado);

            if (resposta.ok) {
                alert("✅ Cadastro realizado com sucesso!");
            } else {
                alert("❌ Erro ao cadastrar: " + (resultado.mensagem || "Erro desconhecido"));
            }
        } catch (erro) {
            console.error("❌ Erro na requisição:", erro);
            alert("Erro ao conectar com o servidor.");
        }
    });
});


