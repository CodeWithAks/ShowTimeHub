import {createContext,useContext,useState} from "react";

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext); //custom hook to access context easily

export const ThemeProvider = ({children}) => {
    const [darkMode,setDarkMode] = useState(true); //default dark mode

    const toggleTheme = () => setDarkMode(prev => !prev); //opposite krdega of previous (dark->light,light->dark)

    return(
        <ThemeContext.Provider value={{darkMode,toggleTheme}}> 
            {children} 
        </ThemeContext.Provider>
    )
};

//context provider k through value pass kr rhe h taaki children access kr ske