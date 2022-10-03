import styles from '../styles/Register.module.css'
import { useRouter } from 'next/router';

export default function Login() {

    const router = useRouter()

    async function onSubmitHandler(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const form = event.target as HTMLFormElement;
        console.log(form.username.value);
        console.log(form.password.value);

        const response = await fetch("/api/check-user", {
            method: "Post",
            body: JSON.stringify({ username: form.username.value, password: form.password.value }),
            headers: {
                "Content-Type": "application/json"
            }
        });

        const data = await response.json();

        window.alert(data.msg);

        if (response.status === 200) {
            router.push("/upload");
        }
    }

    return (
        <div className="flex justify-center w-full h-screen items-center">
            <div className="w-full max-w-xs">
                <label className="text-xl" >Login</label>
                <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={onSubmitHandler}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                            Username
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username" />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************" />
                    </div>
                    <div className="flex items-center justify-center">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
