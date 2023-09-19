'use client'

import {FormEvent, useContext, useState} from 'react'
import Head from "next/head"
import styles from '../app/styles/page.module.scss'
import { Input } from "../components/ui/Input"
import { Button } from "../components/ui/Button"
import Link from "next/link"
import Router from "next/router";
import { AuthContext } from '../contexts/AuthContext'



export default function Home() {

  const {signIn} = useContext(AuthContext)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handlerLogin(event: FormEvent){
    event.preventDefault();
    let data = {email, password}
    await signIn(data)
  }


  return (
    <>
      <Head>
        <title>Meu Pedido - faça seu login</title>
      </Head>
      <div className={styles.containerCenter}>
        <h1>Meu<span>Pedido</span></h1>
        <div className={styles.login}>
          <form onSubmit={handlerLogin}>
            <Input 
              placeholder="Digite seu email" 
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            /> 
            <Input 
              placeholder="Sua senha" 
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              loading={false}
            >
              Acessar
            </Button>
          </form>
          <Link href="/signup" className={styles.text}>
             Não possui uma conta? Cadastre-se
          </Link>
          
        </div>
      </div>
    </>
  )
}
