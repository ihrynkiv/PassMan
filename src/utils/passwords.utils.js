import {encrypt, decrypt}  from "crypto-js/aes"
import CryptoJS  from "crypto-js"
import {localPrivateKey} from "../constants/vars";

export const privateKey = `${window.localStorage.getItem('username')}_${localPrivateKey}`

export const getEncryptedPassword = (password) => encrypt(password, privateKey).toString()

export const getDecryptedPassword = (encryptedPassword) => {
  const bytes = decrypt(encryptedPassword, privateKey)
  return bytes.toString(CryptoJS.enc.Utf8);
}