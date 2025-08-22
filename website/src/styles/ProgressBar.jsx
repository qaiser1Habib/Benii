import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css"; // Import default styles

const ProgressBar = ({ percentage, barWidth, content, statusProgress, statusText, statusMargin, statusWeight,circleMarginTop }) => {
   return (
      <div
         style={{
            position: "relative",
            width: barWidth ? barWidth : "100px",
            height: "100px",
            marginTop: `${circleMarginTop}px` 
         }}
      >
         <CircularProgressbar
            value={percentage}
            text={`${percentage}%`}
            styles={{
               // Customize the root svg element
               root: {},
               // Customize the path, i.e. the "completed progress"
               // Customize the background
               path: {
                  // Path color
                  stroke: "#6F688D",
                  strokeLinecap: "butt",
                  strokeWidth: "8px",
                  // Customize transition animation
                  transition: "stroke-dashoffset 0.5s ease 0s",
                  transform: "rotate(0turn)",
                  transformOrigin: "center center",
               },
               trail: {
                  // Trail color
                  stroke: "#d6d6d6",
                  strokeLinecap: "butt",
                  strokeWidth: "8px",
                  transform: "rotate(0.25turn)",
                  transformOrigin: "center center",
               },
               text: {
                  // Text color
                  fill: "yellow",
                  // Text size
                  fontSize: "0px",
               },
            }}
         />
         {/* Overlay your JSX */}
         {content && (
            <div
               style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
               }}
            >
               <div className={`text-center ${statusMargin ? statusMargin : ""} ${statusWeight ? statusWeight : ""} `}>
                  <p className="mb-1 text-secondary">{statusText ? statusText : ""}</p>
                  <p className="mb-0 text-secondary">{statusProgress}</p>
               </div>
            </div>
         )}
      </div>
   );
};

export default ProgressBar;
