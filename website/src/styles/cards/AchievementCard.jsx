const AchievementCard = (props) => {
   return (
      <div className="col-12 col-md-6 col-lg-4  h-100">
         <div className="d-flex align-items-center justify-content-end flex-column mb-4 mb-xl-0 h-100">
            <img src={props.imageSrc} alt="" className="img-fluid mb-3 " style={{ height: "81px" }} />
            <span className="fw-medium fs-3 text-secondary mb-0  ">{props.title}</span>
            <span className="fs-1 fw-medium mb-3 ">{props.countNumber}</span>
         </div>
      </div>
   );
};

export default AchievementCard;
