import { useAuthStore } from "../store/useAuth.store";

const Navbar = () => {
     const {authUser} = useAuthStore();

    return (
        <div>
            Nvabr
        </div>
    )
}

export default Navbar;