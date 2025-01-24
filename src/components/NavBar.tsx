import {Link} from "react-router-dom";

const NavBar = () => {
    return <div className="bg-gray-800 w-full p-4 fixed flex items-center justify-center text-white">
        <ul className="flex items-center justify-center gap-4">
            <li>
                <Link to="/">
                    Home
                </Link>
            </li>
            <li>
                <Link to="/okrForm">
                    OkrForm
                </Link>
            </li>
            <li>
                <Link to="/displayOkrs">
                    displayOkrs
                </Link>
            </li>
        </ul>
    </div>
}
export default NavBar;