import { createContext, useState, useEffect } from 'react'

export const AppContext = createContext();


const AppContextProvider = ({ children }) => {

    const [user, setUser] = useState(null);

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('user')));
    }, [])

    return (
        <AppContext.Provider value={{ user, setUser }}>
            {children}
        </AppContext.Provider>
    )
}

export default AppContextProvider;


//TODO: Client sayfasina girdikten sonra bir onceki sayfaya geri gelip sonrasinda tekrar ileri gittiginde client sayfasina girememesi gerekir. Bunu nasil yapacagiz