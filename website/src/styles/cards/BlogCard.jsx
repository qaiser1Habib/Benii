import { Link } from "react-router-dom";
import { convertToDate } from "../../utils/helpers";
import ImageLoader from "../loaders/ImageLoader";

const BlogCard = (props) => {
	return (
		<div className=" col-md-6 col-xl-4 px-3  my-3 d-flex">
			<div className="position-relative d-flex flex-column w-100 min-h-400px blog-card">
				<div className="position-absolute fw-semibold card-date rounded-4 shadow-sm z-3">
					{convertToDate(props?.blog?.updatedAt, "dd-MM-yyyy")}
				</div>

				<ImageLoader
					src={`${import.meta.env.VITE_APP_API_URL}/v1/guests/media?filename=${props?.blog?.media?.filename}&mimetype=${
						props?.blog?.media?.mimetype
					}&width=500`}
					placeholderSrc={`${import.meta.env.VITE_APP_API_URL}/v1/guests/media?filename=${
						props?.blog?.media?.filename
					}&mimetype=${props?.blog?.media?.mimetype}&width=100`}
					className="w-100 mb-1 round-10px object-fit-cover"
				/>
				<div
					className="position-absolute w-100 bg-white round-10px bottom-0 start-0 p-3 card-shadow"
					style={{ height: "130px" }}
				>
					<div>
						<p className="card-para  fw-medium cursor-pointer mb-1 text-capitalize truncate">{props.blog?.title}</p>
					</div>
					{/* <div style={{fontSize:"12px"}} dangerouslySetInnerHTML={{ __html: props?.blog?.description?.slice(0, 20) }} /> */}
					<div className="d-flex justify-content-between align-items-center px-2 py-0 py-sm-3 ">
						<Link
							to="/blog-detail"
							state={{ payload: props.blog }}
							className="text-primary text-decoration-none fw-semibold "
						>
							Read Blog
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default BlogCard;
