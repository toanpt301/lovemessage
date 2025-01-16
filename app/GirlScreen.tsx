import * as React from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Header, Input } from "react-native-elements";
import { getToken, sendPushNotification, Token } from "./services/api";

const GirlScreen: React.FC = () => {
    const [tokenInput, setTokenInput] = React.useState("");
    const [token, setToken] = React.useState<Token | undefined>();

    const handleGetToken = async () => {
        try {
            const storedToken = await getToken(tokenInput);
            setToken(storedToken);
        } catch (error) {
            console.error("Error fetching token:", error);
            
            Alert.alert('Không tìm thấy mã số gấu đực. Vui lòng kiểm tra lại.')   
        }
    };

    const handleSendNotification = async (title: string, body: string) => {
        try {
            if (!token) return;
            await sendPushNotification(token.token, title, body);
        } catch (error) {
            console.error("Error sending notification:", error);
            Alert.alert('Không tìm thấy mã số gấu đực. Vui lòng kiểm tra lại.')
        }
    };

    return (
        <View>
            <Header centerComponent={{ text: "Cho bạn nữ 👧🏻", style: { color: "#fff" } }} />
            <View style={styles.container}>
                {token ? (
                    <View>
                        <Text style={styles.infoText}>Mã số của gấu đực là: {token.id}</Text>
                        <Text style={styles.infoText}>Có thể triệu hồi gấu đực 👦🏻!</Text>
                    </View>
                ) : (
                    <>
                        <Input
                            value={tokenInput}
                            onChangeText={setTokenInput}
                            label="Mã số gấu đực 👦🏻"
                            placeholder="Nhập mã số của gấu đực vào đây:"
                        />
                        <TouchableOpacity onPress={handleGetToken} style={styles.button}>
                            <Text>Xác nhận mã số</Text>
                        </TouchableOpacity>
                    </>
                )}
            </View>

            {token && (
                <>
                    <Text style={styles.summonText}>Triệu hồi gấu đực</Text>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            onPress={() => handleSendNotification("🍔 Em đói quá", "Qua chở em đi ăn điiiii")}
                            style={[styles.summonButton, { backgroundColor: "#FF5733" }]}
                        >
                            <Text>🍔 Em đói quá</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() =>
                                handleSendNotification("🧋 Thèm trà sữa", "Mua em ly Thoại Tea socola full topping")
                            }
                            style={[styles.summonButton, { backgroundColor: "#33FF57" }]}
                        >
                            <Text>🧋 Thèm trà sữa</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => handleSendNotification("😢 Nhớ anh quá", "Qua chở em đi chơi")}
                            style={[styles.summonButton, { backgroundColor: "#3357FF" }]}
                        >
                            <Text>😢 Nhớ anh quá</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => handleSendNotification("📱 Gọi em nha", "Em muốn nói chuyện với anh")}
                            style={[styles.summonButton, { backgroundColor: "#FF33A1" }]}
                        >
                            <Text>📱 Gọi em nha</Text>
                        </TouchableOpacity>
                    </View>
                </>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    button: {
        alignItems: "center",
        backgroundColor: "#DDDDDD",
        padding: 10,
        marginTop: 10,
    },
    infoText: {
        fontSize: 16,
        textAlign: "center",
        marginBottom: 10,
    },
    summonText: {
        fontWeight: "bold",
        fontSize: 25,
        textAlign: "center",
    },
    buttonContainer: {
        padding: 10,
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        gap: 10, // Khoảng cách giữa các nút
    },
    summonButton: {
        width: "48%", // Đảm bảo mỗi nút chiếm 48% chiều ngang để có khoảng cách đều
        height: "48%",
        aspectRatio: 1, // Tạo nút hình vuông
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10, // Bo góc
    },
});

export default GirlScreen;
