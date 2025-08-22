const TeamMember = (props) => {
   return (
      <div className="col-12 col-md-6 col-lg-4 col-xxl-3 my-5 ">
         <div className="d-flex flex-column align-items-center">
            <div className=" position-relative bg-primary d-flex align-items-start   justify-content-center rounded-circle team-member-img">
               <img
                  src={props.imageSrc}
                  alt=""
                  className="img-fluid position-absolute "
                  style={{ height: "366px", top: "-20%" }}
               />
            </div>
            <div className="text-center mt-2">
               <h4 className="fw-medium">{props.name}</h4>
               <p className="text-secondary fw-medium fs-6">{props.role}</p>
            </div>
         </div>
      </div>
   );
};

export default TeamMember;
