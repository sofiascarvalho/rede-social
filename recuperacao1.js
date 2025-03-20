document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("formaRecuperacao").addEventListener("submit", async function(event) {
        event.preventDefault();
    
        const email = document.getElementById("confirmarEmail").value;
        const wordKey = document.getElementById("wordKey").value;

        const data = {
            email: email,
            wordKey: wordKey
        };

        try {
            const response = await fetch("https://back-spider.vercel.app/user/RememberPassword", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            });
        
            const resultado = await response.json();
            console.log("🔍 Status da resposta:", response.status);
            console.log("🔍 Resposta da API:", resultado);
        
            if (response.ok) {
                alert("✅ Email e palavra-chave confirmados!");
            } else {
                alert(`❌ Erro ${response.status}: ${resultado.mensagem || "Erro desconhecido"}`);
            }
        } catch (error) {
            console.error("❌ Erro na requisição:", error);
            alert("Erro ao conectar com o servidor.");
        }
    });
});
