// script.js

"use strict";

(function (global, document) {
  const w = global;
  const doc = document;

  // CSS class for active state
  const IS_ACTIVE = ".is-active";
  const IS_PREVIOUS = ".is-previous";

  // css custom variable
  const MAIN_ICON_POSITION = "--shift-position";
  const USER_FORM_WIDTH = "--user-form-width";

  // result value for MAIN_ICON_POSITION
  let mainIconPositionValue;

  // result value for USER_FORM_WIDTH
  let userFormWidthValue;

  // user form variables
  let userForm = doc.getElementById("userForm");
  let steps = userForm.querySelectorAll(".form__step");

  // step indicator variables
  let currentStep = doc.getElementById("currentStep");
  let currentStepValue = 1;

  // progress indicator variables
  let progressIndicator = doc.getElementById("progressIndicator");
  let progressSteps = progressIndicator.querySelectorAll(".progress-indicator__step");
  let progressStepsLength = progressSteps.length;

  // data-current-step
  let dataCurrentStepAttr = "data-current-step";

  // submit button
  let buttonSubmit = doc.getElementById("submit");

  function _initCurrentStep() {
    currentStep.innerHTML = currentStepValue;
    progressIndicator.setAttribute(dataCurrentStepAttr, currentStepValue - 1);
  }

  function _setMainIconPosition() {
    // set value for custom css variable
    mainIconPositionValue = currentStepValue - 1;

    progressIndicator.style.setProperty(MAIN_ICON_POSITION, mainIconPositionValue * 100 + "%");
  }

  function _setUserFormWidth() {
    // set value for custom css variable
    userFormWidthValue = progressStepsLength + 1;

    userForm.style.setProperty(USER_FORM_WIDTH, userFormWidthValue * 100 + "%");
  }

  function _initActiveStep() {
    let activeEl = "is-active";

    let firstProgressStep = progressIndicator.querySelector(".progress-indicator__step");
    let firstUserFormStep = userForm.querySelector(".form__step");

    firstProgressStep.classList.add(activeEl);
    firstUserFormStep.classList.add(activeEl);
  }

  function _switchStepHandler(e) {
    let event = e;
    event.preventDefault();

    let activeEl = "is-active";
    let previousEl = "is-previous";

    currentStepValue++;

    let activeStep = userForm.querySelector(".form__step" + IS_ACTIVE);
    let activeProgressStep = progressIndicator.querySelector(".progress-indicator__step" + IS_ACTIVE);

    let previousStep = userForm.querySelector(".form__step" + IS_PREVIOUS);
    let previousProgressStep = progressIndicator.querySelector(".progress-indicator__step" + IS_PREVIOUS);

    let nextFormStep = activeStep.nextElementSibling;
    let nextProgressStep = activeProgressStep.nextElementSibling;

    if (currentStepValue > progressStepsLength) {
      return false;
    }
    // set data-current-step
    progressIndicator.setAttribute(dataCurrentStepAttr, currentStepValue - 1);

    // set value for custom css variable
    _setMainIconPosition();

    activeStep.classList.remove(activeEl);
    activeStep.classList.add(previousEl);

    activeProgressStep.classList.remove(activeEl);
    activeProgressStep.classList.add(previousEl);

    nextFormStep.classList.add(activeEl);
    nextProgressStep.classList.add(activeEl);

    currentStep.innerHTML = currentStepValue;
  }

  function _switchStep() {
    buttonSubmit.addEventListener("click", _switchStepHandler);
  }

  function init() {
    _initCurrentStep();
    _setUserFormWidth();
    _initActiveStep();
    _switchStep();
  }

  init();

  //console.log("steps: ", steps, "active step: ", activeStep, ".progress-indicator__step: ", progressSteps, "activeProgressStep: ", activeProgressStep);

})(window, document);
