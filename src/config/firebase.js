import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, sendPasswordResetEmail, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { collection, doc, getDocs, getFirestore, query, setDoc, where } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyDkaOwFVHOMrb1zaSwR4RFUXv_gzCtUKLo",
  authDomain: "chat-app-9930a.firebaseapp.com",
  projectId: "chat-app-9930a",
  storageBucket: "chat-app-9930a.firebasestorage.app",
  messagingSenderId: "1049455286153",
  appId: "1:1049455286153:web:fd8cbb9c4593401e887358"
};

// const firebaseConfig = {
//   apiKey: "AIzaSyDmaQyu6sZHep38z8L_eWYgjEXfJxMnjLc",
//   authDomain: "chat-app-gs-57437.firebaseapp.com",
//   projectId: "chat-app-gs-57437",
//   storageBucket: "chat-app-gs-57437.appspot.com",
//   messagingSenderId: "832124750687",
//   appId: "1:832124750687:web:54d2483a0fac54633834ea"
// };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (username,email,password)=>{
  try{
    const response = await createUserWithEmailAndPassword(auth,email,password);
    const user = response.user;
    await setDoc(doc(db,"users",user.uid),{
      id:user.uid,
      username:username.toLowerCase(),
      email,
      name:"",
      avatar:"",
      bio:"Hey There I am using chat app",
      lastSeen:Date.now()
    })
    await setDoc(doc(db,"chats",user.uid),{
      chatsData:[],
    })
  }catch(error){
    console.error(error);
    toast.error(error.code.split('/')[1].split('-').join(" "));
  }
}

const login = async (email,password)=>{
  try{
    await signInWithEmailAndPassword(auth,email,password);
  }catch(error){
    console.error(error);
    toast.error(error.code.split('/')[1].split('-').join(" "));
  }
}

const logout = async ()=>{
  try {
    await signOut(auth);
  } catch (error) {
    console.error(error);
    toast.error(error.code.split('/')[1].split('-').join(" "));
  }
}

const resetPass = async (email)=>{
  if(!email){
    toast.error("Enter your Email");
    return null;
  }
  try {
    const userRef = collection(db,'users');
    const q = query(userRef,where("email","==",email));
    const querySnap = await getDocs(q);
    if(!querySnap.empty){
      await sendPasswordResetEmail(auth,email);
      toast.success("Reset Email Sent")
    }
    else{
      toast.error("Email doesn't Exist");
    }
  } catch (error) {
    toast.error(error.message);
    console.error(error);
  }
}

export { signup , login , logout , auth , db ,resetPass }