import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { Button, ScrollView, Text, TouchableOpacity, View } from "react-native-web";
import { getBooks } from "../services/api";

export default function Home({ navigation }) {
    const [books, setBooks] = useState([]);

    const getBooksAll = async () => {
        const booksData = await getBooks();
        setBooks(booksData);
    };

    useEffect(() => {
        getBooksAll();
    }, []);

    return (
        <View style={styles.container}>
            <ScrollView style={styles.scroll}>
                {books.map((item) => (
                    <View style={styles.card} key={item.id}>
                        <View style={styles.textContainer}>
                            <Text style={styles.title}>{item.titulo}</Text>
                            <Text style={styles.author}>Autor: {item.autor}</Text>
                            <Text style={styles.year}>Ano: {item.ano}</Text>
                            <Text style={styles.qtd}>Quantidade: {item.quantidade}</Text>
                        </View>

                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={styles.button}>
                                <Text style={styles.buttonText}>Emprestar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        margin: 10,
    },
    buttonContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        backgroundColor: '#007bff',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
    textContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 14,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    author: {
        fontSize: 14,
        color: '#555',
    },
    year: {
        fontSize: 14,
        color: '#888',
    },
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff', 
    },
    scroll: {
        maxHeight: '80vh', 
    },
    qtd: {
        fontWeight: "bold"
    }
});
