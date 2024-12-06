import { Button, Text } from "react-native-web";

export default function Aluguel({ navigation }) {
    return (
        <>
            <Text>Testando</Text>
            <Button title="Home" onPress={() => navigation.navigate("Home")} />  
        </>
    );
}