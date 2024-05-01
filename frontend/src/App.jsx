import './index.css'
import Backdrop from './components/Backdrop/Backdrop.jsx'

function App() {
    return (
        <div className={"h-screen w-screen"}>
            <Backdrop style={"light"}/>
            <div className="h-screen w-screen text-neutral-200 pt-16 bg-black">
                <div className="w-full fixed top-0 h-16 bg-white bg-opacity-45">
                    <img src="https://mynameisnt.kim/uploads/images/ttttttttt.png" alt="" width="400"
                         height="80"></img>
                </div>
                <div className="w-full">
                    <div className="flex flex-row justify-center w-screen">
                        <div
                            className="h-64 w-64 translate-y-1/4 mx-4 rounded-xl bg-white/65 border-2 border-white border-opacity-45">
                        </div>
                        <div
                            className="h-64 w-64 translate-y-1/4 mx-4 rounded-xl bg-white/65 border-2 border-white border-opacity-45">
                        </div>
                        <div
                            className="h-64 w-64 translate-y-1/4 mx-4 rounded-xl bg-white/65 border-2 border-white border-opacity-45">
                        </div>
                    </div>
                    <div className="bg-red-400 w-screen h-16">
                        asd
                    </div>
                </div>
                <div className="h-screen">

                </div>
            </div>
        </div>
    )
}

export default App
