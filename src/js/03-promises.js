import Notiflix from "notiflix";

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function onFormSubmit(event) {
  event.preventDefault();

  if (!form.delayInput || !form.stepInput || !form.amountInput) {
    return;
  }

  let firstDelayValue = Number(form.delayInput.value);
  let delayStepValue = Number(form.stepInput.value);
  let amountValue = Number(form.amountInput.value);

  for (let i = 0; i < amountValue; i++) {
    createPromise(i + 1, i * delayStepValue + firstDelayValue)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
  }
  event.target.reset();
}


const formElement = document.querySelector("form.form");
const form = {
  delayInput: formElement.querySelector('input[name="delay"]'),
  stepInput: formElement.querySelector('input[name="step"]'),
  amountInput: formElement.querySelector('input[name="amount"]'),
};

formElement.addEventListener('submit', onFormSubmit);



