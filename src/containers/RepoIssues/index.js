import { faCircleCheck, faCircleDot, faCommentDots } from "@fortawesome/free-regular-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { Link, useRouteLoaderData } from "react-router-dom";
import Button from "../../components/Button";
import Spinner from "../../components/Spinner";
import { getIssues } from "../../utils/api";

export default function RepoIssues() {
	const { repoId } = useRouteLoaderData("repoRoot")

	const [issues, setIssues] = useState([])

	useEffect(() => {
		getIssues({
			repoId,
			token: localStorage.getItem('token')
		}).then(({ data }) => setIssues(data))
	}, [repoId])

	return <>
		<div className="mb-4 flex flex-row-reverse">
			<Button variant="green" className="inline-block" as="a" to="new">New Issue</Button>
		</div>
		<div className="border border-gray-300 rounded overflow-hidden divide-y divide-gray-300">
			<div className="p-4 bg-gray-100 flex items-center text-sm">
				<strong>
					<FontAwesomeIcon icon={faCircleDot}  className="mr-1.5" size="lg"/> 20 Open
				</strong>
				<span className="text-gray-500 ml-6">
					<FontAwesomeIcon icon={faCheck} className="mr-1.5" size="lg"/> 207 Closed
				</span>
			</div>
			
				{issues.map(({
					title,
					idWithinRepo: id,
					commentNum,
					authorName,
					state,
					date,
				}) => <div className="py-3 px-4 flex hover:bg-gray-50"
					key={id}
				>
					{state ? <div className="text-green-600 mr-3 mt-0.5">
						<FontAwesomeIcon icon={faCircleDot}/>	
					</div>
					: <div className="text-purple-600 mr-3 mt-0.5">
						<FontAwesomeIcon icon={faCircleCheck}/>	
					</div>}
					
					<div className="flex flex-col justify-between">
						<div>
							<Link to={id} className="font-semibold text-lg hover:text-blue-600">
								{title}
							</Link>
						</div>
						<div className="text-sm text-gray-400">
							#{id} created on {dayjs(date).format("MMM D")} by <Link to={`/${authorName}`} className="hover:text-blue-600">{authorName}</Link>
						</div>
					</div>
					<div className="ml-auto text-gray-600">
					<FontAwesomeIcon icon={faCommentDots} size="lg" className="mt-1 mr-1.5"></FontAwesomeIcon>
					{commentNum}
				</div>
			</div>)}
				
		</div>
	</>
}