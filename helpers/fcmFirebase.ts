import axios from 'axios'


export const sendNotificationFCM = async ({
    title,
    body,
    idsFCM,
}: { body: string, idsFCM: string[], title: string }) => {
    try {
        await axios.post('https://fcm.googleapis.com/fcm/send', {
            "notification": {
                "title": title,
                "body": body,
            },
            "registration_ids": idsFCM,
            "priority": "high",
        }, { headers: { Authorization: `Bearer ${process.env.FCM_KEY}` } })
    } catch (error) {
        console.log(error)
    }
}