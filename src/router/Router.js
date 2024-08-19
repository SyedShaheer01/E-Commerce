import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from "../components/Home"
import Not from './NotFound'
import Order from '../components/order'
function AppRouter(){


    return(
<BrowserRouter>

        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/order' element={<Order/>}/>
            {/* <Route path='*' element={<Not/>}/> */}
        </Routes>
</BrowserRouter>

    )
}
export default AppRouter