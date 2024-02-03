import {lazy} from "react"

const Weather = lazy(() => import("./Weather"));

function App() {

  return (
    <>
      <Weather />
    </>
  )
}

export default App
