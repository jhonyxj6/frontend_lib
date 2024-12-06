import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { Button, Modal, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native-web";
import { getBooks } from "../services/api";

export default function Home({ navigation }) {
    const [books, setBooks] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    
    const [name, setName] = useState("");
    const [ano, setAno] = useState();
    const [bookId, setBookId] = useState();

    const aluguelLivro = () => {
        console.log(bookId)
    }

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
                            <TouchableOpacity style={styles.button} onPress={() => [setModalVisible(true), setBookId(item.id)]}>
                                <Text style={styles.buttonText}>Emprestar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ))}
            </ScrollView>

            <Modal
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.overlay}>
                <View style={styles.modal}>
                    <Text style={styles.text}>Painel de aluguel para Bibliotecas!</Text>
                    <TextInput 
                        style={styles.input}
                        placeholder="Nome do locatário:"
                    />
                    <TextInput 
                        style={styles.input}
                        placeholder="Ano de nascimento:"
                    />
                    <Button
                        title="Emprestar"
                        onPress={() => () => aluguelLivro()}
                    />
                    <Button
                        title="Fechar"
                        onPress={() => () => setModalVisible(false)}
                    />
                    <Button
                        title="Emprestar"
                        onPress={() => () => aluguelLivro()}
                    />
                </View>
                </View>
            </Modal>
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
    },
    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      },
      modal: {
        width: 300,
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
        elevation: 5, 
      },
      text: {
        marginBottom: 20,
      },
      input: {
        width: '100%',
        padding: 10,
        borderWidth: 2,
        borderColor: '#999',
        borderRadius: 5, 
        fontSize: 16,
        marginBottom: 10,
      },
      inputFocus: {
        borderColor: '#999', 
      },
});

