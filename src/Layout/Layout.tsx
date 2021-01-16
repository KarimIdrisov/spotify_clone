import React, {ReactElement, useState} from "react";
import Navbar from "./HomeLayout/Navbar";
import Footer from "./HomeLayout/Footer";
import Sidebar from "./HomeLayout/Sidebar";
import PlayerSidebar from "./WebPlayerLayout/PlayerSidebar";
import PlayerNavbar from "./WebPlayerLayout/PlayerNavbar";
import PlayerControl from "./WebPlayerLayout/PlayerControl";

export default function Layout(props: {
    parent: string;
    children: ReactElement;
    updateData: Function | undefined;
    input: string | undefined;
}) {

    const [open, setOpen] = useState(true);

    const handleClick = () => {
        setOpen(!open)
    }

    const [isLogin, setLogin] = useState(false)
    const token = localStorage.getItem("token")
    const handleChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        if (props.updateData !== undefined) {
            props.updateData(event.target.value);
        }
    };

    if(token !== '' && !isLogin) {
        setLogin(true)
    }
    if (token === '' && isLogin) {
        setLogin(false)
    }

    if (props.parent === "player") {
        return (
            <div style={{background: "#121212"}} >
                <PlayerSidebar/>
                <PlayerNavbar input={props.input} inputChange={handleChange}/>
                {props.children}
                <PlayerControl/>
            </div>
        )
    }
    if (props.parent === "login") {
        return (
            <>
                {props.children}
            </>
        )
    }
    return (
        <div style={{background: "#121212"}}>
            <Navbar handleClick={handleClick} open={!open} login={isLogin}/>
            <Sidebar handleClick={handleClick} open={!open} login={isLogin}/>
            {props.children}
            <Footer/>
        </div>
    )
}
