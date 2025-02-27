import { useEffect } from "react"
import { Header } from "./components/Components"
import Swal from 'sweetalert2'

function DefaultErrorPage() {
    useEffect(() => {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
            footer: '<a style="color: black; text-decoration: underline; " href="/">Back to homepage</a>'
        });
    })
    return (
        <div className="h-screen">
            <Header />
            <div className="flex flex-col justify-center items-center h-4/5 gap-3">
                <h1 className="text-4xl font-bold">404 NOT FOUND</h1>
                <p>Sorry, we are unable to find the page you are looking for</p>
                <a href='/' className="underline underline-offset-2 mt-4">Back to home page</a>
            </div>
        </div>
    )
}

export default DefaultErrorPage
