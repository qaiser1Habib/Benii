import { useRef, useEffect } from "react";
import lottie from "lottie-web";

import cancelAnimation from "../../assets/icons/animated/cancelMinusAnimation.json";
import deleteAnimation from "../../assets/icons/animated/robotTakingOutTrash.json";
import successAnimation from "../../assets/icons/animated/successAnimation.json";
import failErrorAnimation from "../../assets/icons/animated/failErrorAnimation.json";
import sadCryFaceAnimation from "../../assets/icons/animated/sadCryFaceAnimation.json";
import happyFaceAnimation from "../../assets/icons/animated/happyFaceAnimation.json";
import processingAnimation from "../../assets/icons/animated/processingAnimation.json";
import shoppingCartCheckout from "../../assets/icons/animated/shoppingCartCheckout.json";

const animationConfigs = {
	delete: deleteAnimation,
	success: successAnimation,
	failError: failErrorAnimation,
	cancel: cancelAnimation,
	sad: sadCryFaceAnimation,
	happy: happyFaceAnimation,
	shopping: shoppingCartCheckout,
	// transfer: fileTransferAnimation,
	// upload: uploadAnimation,
	processing: processingAnimation,
};

export const LottieIcon = ({ iconType, style }) => {
	const containerRef = useRef(null);
	const animationData = animationConfigs[iconType];

	useEffect(() => {
		if (animationData) {
			const animation = lottie.loadAnimation({
				container: containerRef.current,
				animationData,
				loop: true,
				autoplay: true,
			});

			return () => {
				animation.destroy();
			};
		}
	}, [animationData]);

	return <div ref={containerRef} style={style} />;
};
