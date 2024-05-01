import "./backdrop.css";

export default function Backdrop({style = "dark"}) {
    switch (style.toLowerCase()) {
        case "light":
            console.log("light");
            return (
                <div className={"lightbackdrop w-screen h-screen fixed"}>
                    <div className={"h-screen w-screen fixed top-0 left-0 opacity-25 bg-white z-0"}
                    ></div>
                </div>
            );
        case "dark":
            console.log("dark");
            return (
                <div className={"darkbackdrop w-screen h-screen fixed"}>
                    <div
                        className={
                            "h-screen w-screen fixed top-0 left-0 opacity-80 bg-black z-0"
                        }
                    ></div>
                </div>
            );
    }
}
