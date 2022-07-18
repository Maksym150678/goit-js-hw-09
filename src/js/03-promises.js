import Notiflix from 'notiflix';
const formEl = document.querySelector('form');
const delayEl = document.querySelector('[name="delay"]');
const stepEl = document.querySelector('[name="step"]');
const amountEl = document.querySelector('[name="amount"]');

formEl.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) {
  event.preventDefault();

  const amount = Number(amountEl.value);
  let delay = Number(delayEl.value);
  const step = Number(stepEl.value);

  for (let i = 1; i <= amount; i += 1) {
  delay += step; 
  createPromise(i, delay)
  .then(({ position, delay }) => {
    Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
  })
  .catch(({ position, delay }) => {
    Notiflix.Notify.warning(`❌ Rejected promise ${position} in ${delay}ms`);
  });  
  }
}

function createPromise(position, delay) {
  const promise = new Promise ((resolve, reject) => {
  const shouldResolve = Math.random() > 0.3;

  setTimeout(()=> {
  if (shouldResolve) {
     resolve ({
      position, delay
    });
  } else {
    reject ({position, delay});
  }  
  }, delay);  
  });
  return promise;
  
}
