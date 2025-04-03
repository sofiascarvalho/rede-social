document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("formaRecuperacaoSenha").addEventListener("submit", async function (event) {
        event.preventDefault()

        const senha = document.getElementById("newPass").value
        //const confirmarSenha=document.getElementById("confirmarSenha").value

        const data ={
            senha: senha
        }

        try {
            const response=await fetch("https://back-spider.vercel.app/user/newPassword/:id", {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(data)
            })
            const resultado=await response.json()
            console.log("🔍 Status da resposta:", response.status)
            console.log("🔍 Resposta da API:", resultado);
        
            if (response.ok) {
                alert("✅ Senha redefinida!")
            } else {
                alert(`❌ Erro ${response.status}: ${resultado.mensagem || "Erro desconhecido"}`)
            }
        } catch (error) {
            console.error("❌ Erro na requisição:", error)
            alert("Erro ao conectar com o servidor.")
        }
    })
})