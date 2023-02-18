import { createContext,useState,useEffect } from "react";
import { onAuthStateChangeListener,createUserDocumentFromAuth } from "../utils/firebase/firebase.utils";

//! DEFAULT VALUES THAT WE TRY TO ACCESS

export const UserContext = createContext({
currentUser:null,
setCurrentUser :() =>null
});


//! THIS METHOD IS ACTUALLY CALLED OR IS USED AS A WRAPPER TO APP.JS INSIDE INDEX.JS 
//! value VARIABLE IS USED AS A PROP TO SET AND GET THE currentUser VALUE AT SIGN IN/SIGN UP
//! THEN currentUser(value VARIABLE) WILL BE CALLED WHERE THIS VARIABLE IS REQUIRED.

export const UserProvider = ({children})=>{

const [currentUser, setCurrentUser] = useState(null);
const value ={currentUser,setCurrentUser};


useEffect(()=>{
   const unsubscribe= onAuthStateChangeListener((user)=>{
    if(user){
        createUserDocumentFromAuth(user);
    }
    setCurrentUser(user);
   });
   return unsubscribe;
},[]);

return <UserContext.Provider value={value}>{children}</UserContext.Provider>

} 