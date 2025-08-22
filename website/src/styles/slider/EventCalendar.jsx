import  { useState } from "react";
import { Calendar } from "primereact/calendar";

const EventCalendar = () => {
   const [date, setDate] = useState(null);
   return (
      <div className="card slider-calender pt-2 flex justify-content-center mt-2 bg-transparent border-0">
         <Calendar value={date} onChange={(e) => setDate(e.value)} inline selectionMode="multiple"  />
      </div>
   );
};

export default EventCalendar;
