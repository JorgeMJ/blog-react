import React from "react";
import {useParams} from "react-router-dom";
import { QuillDeltaToHtmlConverter } from "quill-delta-to-html";
import NotFound from "./NotFound";


const Post = ({ posts }) => {

	const params = useParams();
	const post = posts.find((post)=>{
		return post.slug === params.postSlug;
	});
	const converter = new QuillDeltaToHtmlConverter( post.content.ops, {} );
	const contentHTML = converter.convert();
	let template;
	let content = null;

	if(post && typeof(post.content)==='string') {
		content = <div>{post.content}</div>
	} else if(post) {
		content = <div className="content" dangerouslySetInnerHTML={{ __html: contentHTML }} />
	} 

	if(post){
		template = <article className="post container">
			<h1>{post.title}</h1>
			{content}
		</article>
	}else{
		template = <NotFound />
	}

	return template;
};

export default Post;

	