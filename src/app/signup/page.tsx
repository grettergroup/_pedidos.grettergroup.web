
import Head from "next/head"
import styles from '../../app/styles/page.module.scss'
import { Input } from "../../components/ui/Input"
import { Button } from "../../components/ui/Button"
import Link from "next/link"

export default function Page() {
  return (
    <>
      <Head>
        <title>Meu Pedido - faça seu cadastro</title>
      </Head>
      <div className={styles.containerCenter}>
        <h1>Meu<span>Pedido</span></h1>
        <div className={styles.login}>
          <form>
            <Input 
              placeholder="Digite seu nome" 
              type="text"
            /> 
            <Input 
              placeholder="Digite seu email" 
              type="text"
            /> 
            <Input 
              placeholder="Sua senha" 
              type="password"
            />
            <Button
              type="submit"
              loading={false}
            >
              Acessar
            </Button>
          </form>
          <Link href="/" className={styles.text}>
             Já possui uma conta? Faça o login!
          </Link>
          
        </div>
      </div>
    </>
  )
}
