import './App.css'
import Signup from "./pages/SignUp-Page/Signup.tsx";
import Login from "./pages/Login-Page/Login.tsx"
import Home from "./pages/Home-Page/Home.tsx"
import {BrowserRouter, Route, Routes} from "react-router-dom";
import MyProfilePage from "./pages/MyProfile-Page/MyProfile.tsx";
import UserPage from "./pages/User-Page/UserPage.tsx";
import Startup from "./pages/Startup-Page/Startup.tsx";
import CreateStartup from "./pages/CreateStartup-Page/CreateStartup.tsx";
import ExploreStartups from "./pages/ExploreStartups-Page/ExploreStartups.tsx";
import Leaderboard from './pages/Leaderboard-Page/LeaderBoard.tsx';


function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/signup" element={<Signup></Signup>}></Route>
                <Route path="/login" element={<Login></Login>}></Route>
                <Route path="/home" element={<Home></Home>}></Route>
                <Route path="/my-profile" element={<MyProfilePage></MyProfilePage>}></Route>
                <Route path="/user/:id" element={<UserPage></UserPage>}></Route>
                <Route path = "/startup/:id" element={<Startup></Startup>}></Route>
                <Route path = "/startup/create" element={<CreateStartup></CreateStartup>}></Route>
                <Route path = "/explore" element = {<ExploreStartups></ExploreStartups>}></Route>
                <Route path = "/leaderboard" element = {<Leaderboard></Leaderboard>}></Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App
