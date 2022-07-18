import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  
    return { days, hours, minutes, seconds };
  }
const dataPickerEl = document.querySelector('#datetime-picker');
const buttonStart = document.querySelector('[data-start]');
const currentDate = new Date();
buttonStart.disabled = true;
const timer = {
  intervalId: null,
  deadline: null,
  start() {
    this.intervalId = setInterval(() => {
      const now = Date.now();
      const diff = this.deadline - now;

      if (diff <= 0) {
        this.stop();

        return;
      }

      const { days, hours, minutes, seconds } = convertMs(diff);

      document.querySelector('[data-days]').textContent = this.pad(days);
      document.querySelector('[data-hours]').textContent = this.pad(hours);
      document.querySelector('[data-minutes]').textContent = this.pad(minutes);
      document.querySelector('[data-seconds]').textContent = this.pad(seconds);
    }, 1000);
  },

  stop() {
    clearInterval(this.intervalId);
  },

  pad(value) {
    return String(value).padStart(2, 0);
  },
}
const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {

        if(selectedDates[0].getTime() <= currentDate.getTime()){
            Notiflix.Notify.failure("Please choose a date in the future");

        }else{
            buttonStart.disabled = false;
            timer.deadline = selectedDates[0].getTime();
        }
        },
    };
    flatpickr(dataPickerEl, options);

buttonStart.addEventListener('click', timer.start.bind(timer));

   








