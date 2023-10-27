'use client'

import { createContext, ReactNode, useState } from "react";
import {api} from '../services/apiClient'
import {destroyCookie, setCookie, parseCookies} from 'nookies'
import Router from "next/router";


type AuthContextData = {
    user : UserProps;
    isAuthenticated: boolean;
    signIn: (credentials: SignInProps) => Promise<void>
    signOut: () => void;
}

type UserProps = {
    id: string;
    name: string;
    email: string;
}

type SignInProps = {
    email: string;
    password: string;
}

type AuthProviderProps = {
    children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData)

export function signOut(){
  try{
    destroyCookie(undefined, '@nextauth.token')
    Router.push('/')
  }catch{
    console.log('erro ao deslogar')
  }
}

export function AuthProvider({children}: AuthProviderProps){

    const [user, setUser] = useState({} as UserProps);
    const isAuthenticated = !!user; //!! converte a variável user em booleadno se estiver vazia

    async function signIn({email, password}: SignInProps){
        try{
          const response = await api.post('/session', {email,password})

         // console.log(response.data);
         const {id, name, token} = response.data;

          setCookie(undefined, '@nextauth.token', token, {maxAge: 60 * 60 * 24 * 30, path: "/"})  // Expirar em 1 mês // Quais caminhos terão acesso aos Cookies
          setUser({
            id,
            name,
            email,
          })
          // Passar para próximas requisição o token
          api.defaults.headers['Authorization'] = `Bearer ${token}`
          //Redirecionar usuário para /Dashboard
          Router.push('/Dashboard');

        }catch(err){
          console.log("Erro ao acessar ", err);
        }
    }

    return(
        <AuthContext.Provider value={{ user, isAuthenticated, signIn, signOut}}>
            {children}
        </AuthContext.Provider>
    )
}


/*

import { createContext, ReactNode, useState } from "react";


type UserProps = {
    id: string;
    name: string;
    email: string;
  }
  
  type AuthContextData = {
    user: UserProps | null;
    signIn: () => void;
    signOut: () => void;
  }
  
  type AuthProviderProps = {
    children: ReactNode;
  }

  const AuthContext = createContext<AuthContextData>({} as AuthContextData);


  const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<UserProps | null>(null);
  
    const  signIn = () => {
      // Lógica de autenticação - exemplo simples apenas para demonstração
      setUser({ id: '1', name: 'John Doe', email: 'john@example.com' });
    }
 
  
    const signOut = () => {
      // Lógica de logout
      setUser(null);
    }
  
    return (
      <AuthContext.Provider value={{ user, signIn, signOut }}>
        {children}
      </AuthContext.Provider>
    );
  }

  export { AuthContext, AuthProvider };


  */