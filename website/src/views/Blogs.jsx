import { useEffect } from "react";
import BlogCard from "../styles/cards/BlogCard";
import { getBlogs } from "../actions/blogs";
import useToast from "../store/hooks/useToast";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
const Blogs = () => {
	const dispatch = useDispatch();
	const { notify } = useToast();
	const blogs = useSelector((state) => state.blogs?.all || []);
	const location = useLocation();

	const page = 1;
	const limit = 100;

	useEffect(() => {
		dispatch(getBlogs({ formData: { page: page, limit: limit }, notify }));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return (
		<div className="container py-5">
			{blogs?.length > 0 ? (
				<>
					<p className="text-primary fw-medium fs-lg-4">Blogs</p>
					<h1 className="fw-medium">Read Blogs Written By Our Medics</h1>
					<div className="row">
						{blogs.map((blog, index) => blog?.isActive && <BlogCard blog={blog} key={index} />)}
						{location.pathname === "/" && (
							<div className="text-center my-3">
								<Link to="/resources" className="btn btn-primary py-2 ">
									See More
								</Link>
							</div>
						)}
					</div>
				</>
			) : (
				<>No Blogs Found</>
			)}
		</div>
	);
};

export default Blogs;
