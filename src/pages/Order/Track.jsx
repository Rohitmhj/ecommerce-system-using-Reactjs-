/** @format */

import { Link } from "react-router";

function Track({ productId }) {
	return (
		<div className="self-start max-[800px]:col-start-2 max-[800px]:mb-[30px] max-[450px]:col-auto max-[450px]:mb-[70px]">
			<Link to={`/tracking/${productId}`}>
				<button className="button-secondary w-full text-[14px] p-[8px] max-[800px]:w-[140px] max-[450px]:w-full max-[450px]:p-[12px]">
					Track package
				</button>
			</Link>
		</div>
	);
}
export default Track;
