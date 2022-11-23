import { faCheckCircle, faCircleDot } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { materialLight } from 'react-syntax-highlighter/dist/esm/styles/prism'
import avatar from '../../images/avatar.png'
import { mdRaw } from "./testdata";
import './style.css'
import MarkdownViewer from "../../components/MarkdownViewer";
import AdvancedDialog from "../../components/AdvancedDialog";
import Dialog from "../../components/Dialog";
import Tabb from "../../components/Tabb";
import Tab from "../../components/Tab";
import Textarea from "../../components/Textarea";
import { useState } from "react";
import Button from "../../components/Button";
import { Form, useActionData, useLoaderData, useNavigation } from "react-router-dom";
import dayjs from "dayjs";
import UserLink from "../../components/UserLink";
import Alert from "../../components/Alert";

// authorID
// : 
// 1
// authorName
// : 
// "hermitian"
// commentNum
// : 
// 0
// date
// : 
// "2022-11-23 08:46:55"
// id
// : 
// 1
// idWithinRepo
// : 
// 1
// repoID
// : 
// 1
// state
// : 
// true
// title
// : 
// "good morning"


// content
// : 
// "work everyday"
// date
// : 
// "2022-11-23 22:25:19"
// id
// : 
// 5
// likesNum
// : 
// 0
// ownerID
// : 
// 1
// replyIssueId
// : 
// 1

export default function RepoIssue() {

	const [md, setMd] = useState('')
	const { issueInfo, comments } = useLoaderData()
	const navigation = useNavigation()
	const err = useActionData()?.err

	return <>
		
		<div className="pb-3 border-b border-gray-300">
			<h1 className="text-3xl py-3">
				{issueInfo.title} <span className="text-gray-600">#{issueInfo.idWithinRepo}</span>
			</h1>
			<div className="flex space-x-3 items-center text-gray-500">
				{issueInfo.state ? <div className="rounded-full py-1.5 px-3 bg-green-600 text-white flex items-center">
					<FontAwesomeIcon icon={faCircleDot} className="w-4 h-4 mr-1.5"/>Open
				</div> : <div className="rounded-full py-1.5 px-3 bg-purple-600 text-white flex items-center">
					<FontAwesomeIcon icon={faCheckCircle} className="w-4 h-4 mr-1.5"/>Closed
				</div>}
				<div>
					<strong><UserLink userName={issueInfo.authorName}/></strong> opened this issue {dayjs(issueInfo.date).fromNow()}
				</div>
				<div>{issueInfo.commentNum} comments</div>
			</div>
		</div>
		<div className="py-4 space-y-4">
			{comments.map(({ content, date, id }) => <AdvancedDialog
				key={id}
				author="dsa"
				date={date}
			>
				<MarkdownViewer className="p-5 w-full" md={content}/>
			</AdvancedDialog>)}
			
			<Dialog>
				<Tabb.Group>
					<Tabb.List className="bg-gray-100">
						<Tabb>Write</Tabb>
						<Tabb>Preview</Tabb>
					</Tabb.List>
					<Tabb.Panels>
						<Tabb.Panel>
							<Form method="post" className="space-y-2">
								{(err && navigation.state === 'idle') && <Alert variant="red">{err}</Alert>}
								<Textarea style={{height: '200px'}} placeholder="Styling with Markdown is supported"
									onChange={(e) => setMd(e.target.value)}
									value={md}
									name="content"
								/>
								<input type="hidden" name="issueTrueId" value={issueInfo.id}/>
								<div className="flex justify-end space-x-2">
									<Button variant="purple" type="button">Close issue</Button>
									<Button variant="blue" type="submit">Comment</Button>
								</div>
							</Form>
						
						</Tabb.Panel>
						<Tabb.Panel>
							<div className="px-3 py-1.5">
								<MarkdownViewer md={md}/>
							</div>
						</Tabb.Panel>
					</Tabb.Panels>
				</Tabb.Group>
			</Dialog>

		</div>
	</>
}