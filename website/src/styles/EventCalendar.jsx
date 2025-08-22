import  { useState } from "react";
import { Calendar } from "primereact/calendar";

const EventCalendar = () => {
   const [date, setDate] = useState(null);
   return (
      <div className="card p-3 main-event-calendar flex justify-content-center">
         <Calendar value={date} onChange={(e) => setDate(e.value)} inline selectionMode="multiple"  />
      </div>
   );
};

export default EventCalendar;
