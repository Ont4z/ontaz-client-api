import admin from 'firebase-admin'
var serviceAccount: any = {
    "type": "service_account",
    "project_id": "ontaz-7a32a",
    "private_key_id": "67a43da5dac65f4ab4b5da888fcf9b2ff56fe424",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCTjRYlQCNFFldG\n0+QSCHi36N4xEg2lAGPUpwzfcHAfdEYsGeYWUy+Fj1WB9MFwyJedQJTl/KfgQY2O\n/POe0trmN0s8dBfukqaPbBGOt14YtM/SSBlycB8M98obZDCwz35D2YXwtNQzPD5t\n4UMy084IhgvMlDQFotBkTEqMq4ThMJD2Bdreiga032ZLLIH1+YfemMlb4LgqyF1q\nHavTBCj1Fjr8pVE887pE/IYa1B21SKZ4l+L3qW2LYxgOI9JHZS2FCyCyX1whuXeL\nugt+AW6pCSdtJ44DfYb4WafRWu/3NIwE9HJOOp57sHCI9ibE9F5EW0DEVAXUabIA\nyGPMi4T5AgMBAAECggEAAUYmNy1f+JZeK82D0j+KOk1LkNkm7sIreoA0QWAlSbI9\ncl9JYC848XJowrngKzcCLyCKAJffQ7WRMTdAK8KGkxcOYl/evoe74jBk0OqGqJg0\nFKzccmNjMz+W+khRzs8F2DRiPo8zJ1uZbuWzaLaROHve0XYEonlSyxDpEmCfQboA\nJEOGNGg6DjuB1W1BXW8C99xQbpaGgj55qcJUnvbLTN+KgUQPjSTMkY62TWH6hyWz\nk0YfFpuHwBbYeupFugci5KDHKV7VZJTj9Rm0HvOP25WYWDn/9pEcmRnVCEK1vb+j\nl8IW1x139ai/As1QtAmzbOoy9rVLtMVVZxYKgRTfMQKBgQDLtXlambHRnlasgBHO\nD+vxUveZqIWM3I9oI/1nxiaBGIzfZ3KG31hltkbAWaiqiAisBfN2N3rSBpl95WFD\nFB1HT5iaovqIGTFxUHP5cH72pnwc24rXWx1p5fNbSvljImpEkGrm913LAV6UeGag\nbKcGQz5VvQCdNbO/dMBB3CRJEQKBgQC5bULUyPmzm5+ZMbOYDBw45ov2Afq1VZTH\ns7jVlrcyDKztDyVqFRCTHBH0iOOPKxxAWrB5xEGsJZI1cIUyClgqLMZBdHM+C67b\nM5EReURZvw1T8BBUAUtJBx8K8SZ0eiOHkooQtDMHyPGXgTrBKpjMKVHnSCCb/lFv\n1zYt/Di9aQKBgEY2pb5prVXACsXoWrq42C1U2Iz4/hdASpmtlgF31fu3N48lO99r\nCi/8tMRF4xHsU3jfkDwWAVp09eDj+DNDspfKwqHCPTI95MHW5jJ66PghCDR2I5P5\nDtlabhfwbqcRzKkXUhGL/6MiNLReD5mJ+cP513l77MNDKFJ8bmwE8ejRAoGAWRrF\nI8WUIJgnIJG+sNEY+srm9QfMdzkx7qlRp+nuDLIEo0JFA24t8dNqWW0ylQjtYYtz\nBICn4laHpQB2MS7BYTr05l1UR7uLgjCMhK4Wh14ExJI29ndMu0Idy79IcG6FBlAH\n4rEFWLdaSSjDmDGlDW7Jue9yJCQY9DqiAYUTqwkCgYA8nivUbZhD66RAavQL8FWY\n1C1IQAqmMK21MZD8BAPr14RRGz5kHXsQC6jqwDkFS4ymc/w83h2r2CWcm8LubdRN\nGZHeo7aVaklYmAPGyy2csqyDmSYNSjkmlHNmIFFKmxGGgyCDLwnO2KmF348dLCyJ\nA4ikiP7JtKkHQBrykxeZEw==\n-----END PRIVATE KEY-----\n",
    "client_email": "firebase-adminsdk-exrnq@ontaz-7a32a.iam.gserviceaccount.com",
    "client_id": "101668188724208441553",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-exrnq%40ontaz-7a32a.iam.gserviceaccount.com",
    "universe_domain": "googleapis.com"
};

export const firebase = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});



console.log('Firebase connected')
