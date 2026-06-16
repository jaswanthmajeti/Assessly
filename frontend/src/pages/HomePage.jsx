import { Show,SignInButton,SignUpButton,SignOutButton,UserButton} from "@clerk/react";
import toast from "react-hot-toast";
export default function HomePage(){
    return (
       <div>
            <Show when="signed-out">
                <SignInButton mode='modal'/>
                <SignUpButton mode='modal'/>
            </Show> 
            <Show when="signed-in">
                <SignOutButton />
                <UserButton />
            </Show>
            <br />
            <br />
            <button onClick={() => toast.success("It works")}>  Click Me </button>
       </div>
    )
}