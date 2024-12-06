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