import { faUser } from '@fortawesome/free-regular-svg-icons'
import { faBookOpen, faMagnifyingGlass, faWarehouse } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import logoImg from '../../images/logo.png'

export default function Navbar() {
	const { token, handleLogout } = useAuth()
	return (
		<header className="shadow-sm">
			<div
			className="mx-auto flex h-16 max-w-screen-xl items-center justify-between px-4"
			>
				<div className="flex w-0 flex-1 lg:hidden">
					<button className="rounded-full bg-gray-100 p-2 text-gray-600" type="button">
						<FontAwesomeIcon icon={faUser} className="h-5 w-5"/>	
					</button>
				</div>

				<div className="flex items-center gap-4">
					
					<span className="h-10 rounded-lg bg-gray-800 overflow-hidden">
						<img src={logoImg} className="h-10"/>
					</span>
					
					<form className="mb-0 hidden lg:flex">
						<div className="relative">
							<input
								className="h-10 rounded-lg border-gray-200 pr-10 text-sm placeholder-gray-300 focus:z-10"
								placeholder="Search..."
								type="text"
							/>

							<button
								className="absolute inset-y-0 right-0 mr-px rounded-r-lg p-2 text-gray-600"
								type="submit"
							>
								<FontAwesomeIcon icon={faMagnifyingGlass} className="h-5 w-5"/>	
							</button>
						</div>
					</form>
				</div>

				<div className="flex w-0 flex-1 justify-end lg:hidden">
					<button className="rounded-full bg-gray-100 p-2 text-gray-500" type="button">
						<FontAwesomeIcon icon={faMagnifyingGlass} className="h-5 w-5"/>
					</button>
				</div>

				<nav
					className="hidden items-center justify-center gap-8 text-sm font-medium lg:flex lg:w-0 lg:flex-1"
				>
					<a className="text-gray-900" href=""><FontAwesomeIcon icon={faBookOpen} className="mr-1"/>Overview</a>
					<a className="text-gray-900" href=""><FontAwesomeIcon icon={faWarehouse} className="mr-1"/>Repositories</a>
					{/* <a className="text-gray-900" href="">Projects</a>
					<a className="text-gray-900" href="">Contact</a> */}
				</nav>

				<div className="hidden items-center gap-4 lg:flex">
					{ token ? 
						<button className="rounded-lg bg-gray-100 px-5 py-2 text-sm font-medium text-gray-600" onClick={() => handleLogout()}>Logout</button>
					: <>
						<Link to='/signin' className="rounded-lg bg-gray-100 px-5 py-2 text-sm font-medium text-gray-600">Log in</Link>
						<Link to='/signup' className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-medium text-white">Sign up</Link>
					</>}
				</div>
			</div>

			<div className="border-t border-gray-100 lg:hidden">
				<nav
					className="flex items-center justify-center overflow-x-auto p-4 text-sm font-medium"
				>
					<a className="flex-shrink-0 pl-4 text-gray-900" href="">Overview</a>
					<a className="flex-shrink-0 pl-4 text-gray-900" href="">Repositories</a>
					{/* <a className="flex-shrink-0 pl-4 text-gray-900" href="">Projects</a>
					<a className="flex-shrink-0 pl-4 text-gray-900" href="">Contact</a> */}
				</nav>
			</div>
		</header>
	)
}