import { Outlet } from "react-router-dom"
import AppNavbar from "./navBar"

const Layout: React.FC = ()=>{
    return (
        <div>
            <AppNavbar />
            <Outlet />
        </div>
        
    )
    
}
export default Layout