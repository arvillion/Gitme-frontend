import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import { Link } from "react-router-dom"
dayjs.extend(relativeTime)
const commits = [
	{
		hash: 'b13ce34289fa92033845859ec2c0dd4b2779b3ac',
		author: 'zz',
		message: 'README.md edited online with Bitbucket',
		date: '2022-11-12T05:11:56+00:00',
	},
	{
		hash: '98a46b7878d464761f0e7a3e846ac2a19ec15d2e',
		author: 'zz',
		message: 'Initial commit',
		date: '2022-11-10T03:47:12+00:00'
	}
]
export default function RepoCommits() {
	return <>
		<table className="w-full text-gray-700">
			<thead className="text-left border-b-2 border-gray-300 font-bold text-gray-600">
				<tr>
					<th className="py-1 pl-1 hidden md:table-cell">Author</th>
					<th className="py-1 pl-1 hidden md:table-cell">Commit</th>
					<th className="py-1 pl-1 hidden md:table-cell">Message</th>
					<th className="py-1 pl-1 hidden md:table-cell">Date</th>
					<th className="py-1 pl-1 md:hidden">Summary</th>
				</tr>
			</thead>
			<tbody className="border-b-2 border-gray-300">
				{commits.map(c => <tr className="hover:bg-gray-100" key={c.hash}>
					<td className="py-3 pl-1 hidden md:table-cell">{c.author}</td>
					<td className="py-3 pl-1 hidden md:table-cell">
						<Link to={`/arvillion/tf2_course/commits/${c.hash}`} className="text-blue-600 hover:underline">
							{c.hash.substring(0, 7)}
						</Link>
					</td>
					<td className="py-3 pl-1 hidden md:table-cell">
						{c.message}
					</td>
					<td className="py-3 pl-1 hidden md:table-cell">
						{dayjs(c.date).fromNow()}
					</td>
					<td className="py-3 pl-1 md:hidden table-cell">
						<p className="pb-1 truncate">{c.message}</p>
						<p className="text-xs text-gray-600">
							{c.author}-
							<Link to={`/arvillion/tf2_course/commits/${c.hash}`} className="text-blue-600 hover:underline">
								{c.hash.substring(0, 7)}
							</Link>, {dayjs(c.date).fromNow()}
						</p>
					</td>
				</tr>)}
			</tbody>
			
		</table>
	</>
}