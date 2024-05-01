import "./backdrop.css";

export default function Backdrop() {
    return (
        <div className={"lightbackdrop w-screen h-screen fixed"}>
            <div className={"h-screen w-screen fixed top-0 left-0 opacity-25 bg-white z-0"}
            ></div>
        </div>
    );
}
