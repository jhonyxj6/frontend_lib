import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native-web";
import { getAlugueis, devolverLivro } from "../services/api";

import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export default function Aluguel({ navigation }) {
    const [alugueis, setAlugueis] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");

    const fetchAlugueis = async () => {
        try {
            const dadosAlugueis = await getAlugueis();
            setAlugueis(dadosAlugueis);
            setErrorMessage(""); 
        } catch (error) {
            setErrorMessage("Erro ao carregar aluguéis. Tente novamente.");
        }
    };

    useEffect(() => {
        fetchAlugueis();
    }, []);

    const handleDevolverLivro = async (id) => {
        try {
            setErrorMessage("");
            await devolverLivro(id); 
            await fetchAlugueis();
        } catch (error) {
            setErrorMessage(error.message || "Erro ao devolver o livro. Tente novamente.");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Lista de Aluguéis</Text>
            {errorMessage ? (
                <Text style={styles.errorMessage}>{errorMessage}</Text>
            ) : null}
            <ScrollView style={styles.scroll}>
                {alugueis.length > 0 ? (
                    alugueis.map((item) => (
                        <View style={styles.card} key={item.id}>
                            <Text style={styles.bookTitle}>{item.livroTitulo}</Text>
                            <Text style={styles.details}>Locatário: {item.nome}</Text>
                            <Text style={styles.details}>Data de Empréstimo: {format(new Date(item.criado_em), "dd/MM/yyyy HH:mm", { locale: ptBR })}</Text>
                            <Text style={styles.details}>Data de Devolução : {item.devolvido_em ? format(new Date(item.devolvido_em), "dd/MM/yyyy HH:mm", { locale: ptBR }) : "Sem data de devolução"}</Text>
                            <TouchableOpacity
                                style={[
                                    styles.button,
                                    item.devolvido_em ? styles.buttonDelivered : null,
                                ]}
                                onPress={() => handleDevolverLivro(item.id)}
                                disabled={!!item.devolvido_em}
                            >
                                <Text style={styles.buttonText}>
                                    {item.devolvido_em ? "Entregue" : "Devolver Livro"}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    ))
                ) : (
                    <Text style={styles.emptyMessage}>Nenhum aluguel encontrado.</Text>
                )}
            </ScrollView>
            <TouchableOpacity style={styles.goBackButton} onPress={() => navigation.navigate("Home")}>
                <Text style={styles.goBackText}>Voltar para Home</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: "#f8f9fa",
    },
    title: {
        fontSize: 24,
        fontWeight: "700",
        marginBottom: 16,
        color: "#212529",
    },
    scroll: {
        maxHeight: '80vh',
    },
    errorMessage: {
        color: 'red', 
        fontSize: 14, 
        marginTop: 10,
        textAlign: 'center',
        fontWeight: 'bold', 
        marginBottom: 15
    },
    card: {
        padding: 15,
        backgroundColor: "#ffffff",
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: "#e0e0e0",
    },
    bookTitle: {
        fontSize: 18,
        fontWeight: "700",
        color: "#343a40",
        marginBottom: 6,
    },
    details: {
        fontSize: 14,
        color: "#495057",
        marginBottom: 6,
    },
    button: {
        backgroundColor: "#dd2c00",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 6,
        alignItems: "center",
        marginTop: 10,
    },
    buttonDelivered: {
        backgroundColor: "#28a745",
    },
    buttonText: {
        color: "#ffffff",
        fontSize: 16,
        fontWeight: "600",
    },
    emptyMessage: {
        fontSize: 16,
        color: "#6c757d",
        textAlign: "center",
        marginTop: 20,
    },
    goBackButton: {
        backgroundColor: "#6c757d",
        paddingVertical: 10,
        borderRadius: 6,
        alignItems: "center",
        marginTop: 20,
    },
    goBackText: {
        color: "#ffffff",
        fontSize: 16,
        fontWeight: "600",
    },
});
