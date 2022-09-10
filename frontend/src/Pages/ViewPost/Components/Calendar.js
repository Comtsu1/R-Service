import '@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css';
import {Calendar, utils} from '@hassanmojab/react-modern-calendar-datepicker';


const Calendar1 = (selectedDay, setSelectedDay, setDetails, details, MakeReservation) => {
    return (
      <Calendar
        value={selectedDay}
        onChange={setSelectedDay}
        shouldHighlightWeekends
        minimumDate={utils().getToday()}
        renderFooter={() =>(
          <div className="CalendarFooter">
              <button type="button" id="cancel" onClick={
              (e) =>{
                  setSelectedDay(null);
                  setDetails({...details, calendarOpened: false});
              }
              }>
                  Cancel
              </button>
  
              <button type="button" onClick={(e) =>
                  {
                      console.log(selectedDay.day, selectedDay.month, selectedDay.year)
                      MakeReservation(selectedDay);
                      setDetails({...details, calendarOpened: false})
                  }
              }>
                  Make Reservation!
              </button>
          </div>
        )
          
      }
      />
    );
  };

export {Calendar1}