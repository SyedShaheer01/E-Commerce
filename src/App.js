import AppRouter from "./router/Router";
import cartContext from "./contex/Context";
import { useEffect, useState } from "react";
import './components/cart.css'
import { Watch } from 'react-loader-spinner'
import AOS from 'aos'
import 'aos/dist/aos.css'



function App() {
  

  const [cart,setCart]= useState([])
  const [Loader,setLoader]= useState(true)

  useEffect(()=>{
    setTimeout(() => {
      setLoader(false)
      
    }, 2000);

  },[])

  useEffect(() => {
    AOS.init({ duration: 2000 })
  }, [])

  return (
    <>
    {Loader ?
    <div className="loader-sec" data-aos="zoom-in">
      <h1>WELCOME TO SUPER STORE!</h1>


      <Watch
  visible={true}
  height="100"
  width="100"
  radius="48"
  color="#4fa94d"
  ariaLabel="watch-loading"
  wrapperStyle={{}}
  wrapperClass=""
  />

      </div>
      :
      <cartContext.Provider value={{cart,setCart}}>

      <AppRouter/>
    </cartContext.Provider>
  
}
    </>
  );
}

export default App;