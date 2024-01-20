import { useUserStore } from "../stores/authStore"

export default function HomePage() {
    const { currentUser } = useUserStore();
    
  return (
    <div className='w-2/5'>
        <h1 className='text-3xl font-bold text-green-600 lg:text-4xl mb-5'>Welcome to KONTAKT</h1>
        <p>A revolutionary contact directory app designed to streamline your connections and enhance your communication experience.</p>
        <a href={currentUser ? "/contacts" : "/signup"} className='block mx-auto py-2 w-4/5 bg-green-100 hover:bg-green-200 mt-5'>Get Started</a>
    </div>
  )
}

