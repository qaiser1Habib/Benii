import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const ImageLoader = React.memo((props) => {
	return (
		<>
			<LazyLoadImage
				src={props?.src}
				placeholderSrc={props?.placeholder}
				effect="blur"
				alt="Image"
				style={props?.style}
				height={"100%"}
				width={"100%"}
				className={props?.className}
			/>
		</>
	);
});

ImageLoader.displayName = "ImageLoader";

export default ImageLoader;
