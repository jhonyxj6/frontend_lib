import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { Button, Modal, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native-web";
import { getBooks, postAlugueis } from "../services/api";

export default function Home({ navigation }) {
    const [books, setBooks] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [error, setError] = useState("");

    const [name, setName] = useState("");
    const [ano, setAno] = useState();
    const [bookId, setBookId] = useState();

    const aluguelLivro = async () => {

        if (!name.trim() || !ano) {
            setError("Por favor, preencha todos os campos obrigatórios.");
            return;
        }

        if (!/^\d{4}$/.test(ano)) {
            setError("O ano deve conter exatamente 4 dígitos.");
            return;
        }

        try {
            let newAluguel = await postAlugueis(bookId, name, ano);

            if (newAluguel) {
                setModalVisible(false);
                
                setName("");
                setAno();
                setBookId();
                getBooksAll();

                navigation.navigate('Aluguel');
            } else {
                const errorMsg = newAluguel || 'Erro desconhecido ao alugar o livro.';
                setError(errorMsg);
                console.error('Erro ao alugar o livro:', errorMsg);
            }
        } catch (error) {
            const errorMsg = 'Ocorreu um erro ao tentar alugar o livro. Tente novamente.';
            setError(errorMsg);
            console.error('Erro ao realizar o aluguel:', error);
        }
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
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Biblioteca</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Aluguel')}>
                    <Text style={styles.headerLink}>Ver Aluguéis</Text>
                </TouchableOpacity>
            </View>

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
                        <Text style={styles.text}>Registro de Empréstimo de Livro</Text>
                        
                        {error ? (
                            <Text style={styles.errorText}>{error}</Text>
                        ) : null}

                        <TextInput 
                            style={styles.input}
                            placeholder="Digite o nome completo do locatário"
                            value={name}
                            onChangeText={setName}
                        />
                        
                        <TextInput 
                            style={styles.input}
                            placeholder="Ano de nascimento (YYYY)"
                            value={ano}
                            onChangeText={setAno}
                            keyboardType="numeric"
                        />
                        
                        <View style={styles.modalButtons}>
                            <TouchableOpacity 
                                style={styles.modalButton} 
                                onPress={() => aluguelLivro()}
                            >
                                <Text style={styles.modalButtonText}>Confirmar Empréstimo</Text>
                            </TouchableOpacity>
                            
                            <TouchableOpacity 
                                style={styles.modalButtonCancel} 
                                onPress={() => [setModalVisible(false), setError("")]}
                            >
                                <Text style={styles.modalButtonText}>Cancelar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f1f3f5', 
    },
    scroll: {
        maxHeight: '80vh',
    },
    card: {
        padding: 15,
        backgroundColor: '#ffffff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#e0e0e0',
        transform: [{ scale: 1 }],
        transition: 'transform 0.2s',
    },
    cardHovered: {
        transform: [{ scale: 1.02 }],
        shadowOpacity: 0.2,
    },
    textContainer: {
        marginBottom: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: '700',
        color: '#212529',
        marginBottom: 6,
    },
    author: {
        fontSize: 14,
        color: '#6c757d',
        marginBottom: 4,
    },
    year: {
        fontSize: 14,
        color: '#6c757d',
        marginBottom: 4,
    },
    qtd: {
        fontSize: 14,
        fontWeight: '600',
        color: '#495057',
    },
    buttonContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        backgroundColor: '#007bff',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 6,
        marginTop: 10,
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center',
    },
    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modal: {
        width: '90%',
        maxWidth: 350,
        padding: 20,
        backgroundColor: '#ffffff',
        borderRadius: 12,
        alignItems: 'center',
        elevation: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 10,
    },
    text: {
        marginBottom: 20,
        fontSize: 18,
        fontWeight: '600',
        color: '#212529',
        textAlign: 'center',
    },
    input: {
        width: '100%',
        padding: 12,
        borderWidth: 1,
        borderColor: '#ced4da',
        borderRadius: 6,
        fontSize: 16,
        marginBottom: 14,
        backgroundColor: '#f8f9fa',
        transition: 'border-color 0.2s',
    },
    inputFocus: {
        borderColor: '#007bff',
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 20,
    },
    modalButton: {
        flex: 1,
        marginHorizontal: 5,
        paddingVertical: 10,
        backgroundColor: '#007bff',
        borderRadius: 6,
        alignItems: 'center',
    },
    modalButtonText: {
        color: '#ffffff',
        fontSize: 14,
        fontWeight: '600',
    },
    
    modalButtonCancel: {
        flex: 1,
        marginHorizontal: 5,
        paddingVertical: 10,
        backgroundColor: '#dc3545',
        borderRadius: 6,
        alignItems: 'center',
        shadowColor: '#000', 
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2, 
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 16,
        backgroundColor: '#ffffff',
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
        marginBottom: 15
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#212529',
    },
    headerLink: {
        fontSize: 16,
        color: '#007bff',
        fontWeight: '600',
    },

    errorText: {
        color: '#dc3545',
        fontSize: 14,
        marginBottom: 10,
        textAlign: 'center',
    },
});
