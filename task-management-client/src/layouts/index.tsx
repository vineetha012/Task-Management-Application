import { Outlet } from "react-router-dom"
import AppNavbar from "./navBar"

const Layout: React.FC = ()=>{
    return (
        <>
            <AppNavbar />
            <Outlet />
        </>
        
    )
    
}
export default Layout