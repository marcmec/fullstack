import { LoginForm } from "@/features/auth/components/LoginForm"

 
const LoginPage = () => {
    return (

        <div className="h-screen flex flex-col items-center justify-center p-4">
            <div>
                <h1 className="text-2xl font-bold">Monitoramento</h1>
            </div>
               <LoginForm />

           
        </div>
    )

}

export default LoginPage