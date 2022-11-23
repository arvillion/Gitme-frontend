import { faCircleDot, faCode, faCodeBranch, faCodeFork, faCodePullRequest, faPaperclip, faStar, faWarehouse, faCodeCommit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, Outlet, useLoaderData, useParams } from "react-router-dom";
import Alert from "../../components/Alert";
import Badge from "../../components/Badge";
import Button from "../../components/Button";
import RepoMenu from "../../components/RepoMenu";

export default function RepoLayout() {
	const { userName, repoName } = useParams()
	const baseUrl = `/${userName}/${repoName}`
	const { repoInfo, branches } = useLoaderData()
	const isPublic = repoInfo.state.toUpperCase() == "PUBLIC"
	return <>

	<div className="space-y-4 mb-4">
		<div className="flex justify-between flex-wrap items-center">
			<h3 className="text-xl text-gray-300 flex items-center">
				<FontAwesomeIcon icon={faWarehouse}/>
				<Link className="text-blue-600 px-2.5 hover:underline" to={`/${userName}`}>{userName}</Link>
				/
				<Link className="text-blue-600 px-2.5 hover:underline font-bold" to={baseUrl}>{repoName}</Link>
				<Badge>{isPublic ? 'Public' : 'Private'}</Badge>
			</h3>
			<div className="space-x-2 hidden md:block">
				<Button><FontAwesomeIcon icon={faStar}/><span className="px-1.5">Star</span><Badge type="gray full">{repoInfo.star}</Badge></Button>
				<Button><FontAwesomeIcon icon={faCodeFork}/><span className="px-1.5">Fork</span><Badge type="gray full">{repoInfo.fork}</Badge></Button>	
			</div>
		</div>
		<div className="space-y-4 md:hidden">
			<p className="text-md font-light">{repoInfo.desc}</p>

			<div className="text-sm space-y-2 flex flex-col text-gray-500">
				{/* <a className="" href="reactrouter.com">
					<FontAwesomeIcon icon={faPaperclip}/>
					<span className="px-2">reactrouter.com</span>
				</a> */}
				<div className="space-x-3 flex">
					<div><FontAwesomeIcon icon={faStar}/><strong className="px-2">{repoInfo.star}</strong>stars</div>
					<div><FontAwesomeIcon icon={faCodeFork}/><strong className="px-2">{repoInfo.fork}</strong>forks</div>
				</div>
			</div>

			<div className="flex space-x-2">
				<Button className="flex-1"><FontAwesomeIcon icon={faStar}/><span className="px-2">Star</span></Button>
				<Button className="flex-1"><FontAwesomeIcon icon={faCodeFork}/><span className="px-2">Fork</span></Button>
			</div>
		</div>
	</div>

	<RepoMenu>
		<RepoMenu.Item to={`${baseUrl}/source`}>
			<FontAwesomeIcon icon={faCode} fixedWidth/>
			<span className="ml-3">Code</span>
		</RepoMenu.Item>
		<RepoMenu.Item to={`${baseUrl}/issues`}>
			<FontAwesomeIcon icon={faCircleDot} fixedWidth/>
			<span className="ml-3">Issues</span>
		</RepoMenu.Item>
		<RepoMenu.Item to={`${baseUrl}/pulls`}>
			<FontAwesomeIcon icon={faCodePullRequest} fixedWidth/>
			<span className="ml-3">Pull requests</span>
		</RepoMenu.Item>
		<RepoMenu.Item to={`${baseUrl}/commits`}>
			<FontAwesomeIcon icon={faCodeCommit} fixedWidth/>
			<span className="ml-3">Commits</span>
		</RepoMenu.Item>
		<RepoMenu.Item to={`${baseUrl}/branches`}>
			<FontAwesomeIcon icon={faCodeBranch} fixedWidth/>
			<span className="ml-3">Branches</span>
		</RepoMenu.Item>
	</RepoMenu>
	<div className="pt-4">
		{branches.length ? <Outlet/> : <Alert variant="red">No branches</Alert>}
	</div>
	</>
}