import axios from 'axios'
import { Alert } from 'react-native';

const EXPO_SERVER_URL = 'https://exp.host/--/api/v2/push/send'
const TOKEN_SERVER_URL = 'https://gau-server.glitch.me/notifications'

export interface Token {
    id: number;
    token: string;
}

export const submitToken = async (token: string) => {
    const response = await axios.post(TOKEN_SERVER_URL, {token})
    const result = response.data as Token
    return result
}

export const getToken = async (id: number | string) => {
    const response = await axios.get(`${TOKEN_SERVER_URL}/${id}`)
    const result = response.data as Token
    return result
} 

export const sendPushNotification = async(token: string, title: string, body: string) =>{
    const message = {
        to: token,
        sound: 'default',
        title,
        body,
    }

    await axios.post(EXPO_SERVER_URL, message)
    Alert.alert('Thông báo','Triệu hồi gấu 👦🏻 thành công', 
        [
            {
              text: 'Ok',
              onPress: () => {

               console.log("Ok Pressed");
            }
              
            },
          ],
    )
}