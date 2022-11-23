import { Form, useActionData, useFetcher, useRouteLoaderData } from "react-router-dom";
import Input from "../../components/Input";
import { Tab as Ta } from "@headlessui/react";
import Tabb from "../../components/Tabb";
import Textarea from "../../components/Textarea";
import { useState } from "react";
import Button from "../../components/Button";
import MarkdownViewer from "../../components/MarkdownViewer";
import Alert from "../../components/Alert";

export default function NewIssue() {
	const [issueBody, setIssueBody] = useState('')
	const fetcher = useFetcher()
	const { repoId } = useRouteLoaderData("repoRoot")
	const err = fetcher.data?.err

	return <>
		<div className="text-3xl py-4 border-gray-300">New Issue</div>
		{(err && fetcher.state === 'idle') && <Alert variant="red">{err}</Alert>}
		<div className="py-2 border border-gray-300 rounded overflow-hidden">
			<fetcher.Form method="post" action={"?repoId=" + repoId}>
				<div className="px-2">
					<Input type="text" placeholder="Title" size="lg" required name='title'/>
				</div>
				<div className="mt-3">
					<Tabb.Group>
						<Tabb.List>
							<Tabb>Write</Tabb>
							<Tabb>Preview</Tabb>
						
						</Tabb.List>
							<Tabb.Panels>
							<Tabb.Panel>
								<Textarea name="body" style={{height: '200px'}} placeholder="Styling with Markdown is supported" 
									value={issueBody}
									onChange={(e) => setIssueBody(e.target.value)}
									required
								></Textarea>
							</Tabb.Panel>
							<Tabb.Panel>
								<MarkdownViewer md={issueBody} className="px-3 py-1.5"/>
							</Tabb.Panel>
						</Tabb.Panels>
					</Tabb.Group>
					<div className="mt-2 px-2 flex flex-row-reverse">
						<Button variant="blue" type="submit">Submit new issue</Button>
					</div>
				</div>
				
			</fetcher.Form>
		</div>
	</>
}