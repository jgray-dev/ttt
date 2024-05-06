export default function Account() {
  return (
    <div className="fixed w-full h-full bg-black/30`" onClick={() => console.log("Outside")}>
      <div className="mt-12 h-[80%] w-[80%] bg-black mx-auto" onClick={(event) => {
        event.stopPropagation();
        console.log("Inside");
      }}>
        meow
      </div>
    </div>
  )
}