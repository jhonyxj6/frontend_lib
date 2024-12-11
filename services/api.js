const BASE_URL = "http://localhost:5169"

export const getBooks = async () => {
    try {
        const response = await fetch(`${BASE_URL}/api/Book`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        if (!response.ok) {
            throw new Error("Não foi possível processar sua solicitação.")
        }

        const textData = await response.text();
        const data = JSON.parse(textData);

        return data;
    } catch (err) {
        console.error(err);
    }
}

export const getAlugueis = async () => {
    try {
        const response = await fetch(`${BASE_URL}/api/Book/alugados`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        if (!response.ok) {
            throw new Error("Não foi possível processar sua solicitação.")
        }

        const textData = await response.text();
        const data = JSON.parse(textData);

        return data;
    } catch (err) {
        console.error(err);
    }
}

export const postAlugueis = async (livroId, nome, anoNascimento) => {
    try{
        let body = {
            nome: nome,
            anoNascimento: anoNascimento
        };

        const response = await fetch(`${BASE_URL}/Api/Book/alugar/${livroId}`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body),
        });

        console.log(response)
        
        if(response.status != 204){
            throw new Error("Post resquest failed.");
        }

        return true;

    } catch(error) {
        console.error(error);
        throw error;
    }
};

export const devolverLivro = async (aluguelId) => {
    try {
        const response = await fetch(`${BASE_URL}/api/Book/devolver/${aluguelId}`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            throw new Error("Erro ao tentar devolver o livro.");
        }

        console.log("Livro devolvido com sucesso.");
        return true;
    } catch (err) {
        console.error(err);
        throw err;
    }
};