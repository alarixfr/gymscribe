const output = document.getElementById("output");

function writeOutput(msg) {
  output.textContent = `Output: ${msg}`;
}

// HEALTH
function BMI() {
  try {
    const weightKg = document.getElementById('BMIWeight').value;
    const heightCm = document.getElementById('BMIHeight').value;
    
    if (!weightKg && !heightCm) {
      throw new Error('Not Found');
    }
    
    if (weightKg <= 0 || heightCm <= 0) {
      throw new Error('Invalid Value');
    }
    
    writeOutput((weightKg / Math.pow(heightCm / 100, 2)).toFixed(2));
  } catch (e) {
    writeOutput(e.message);
  }
}

function BMR() {
  try {
    const weightKg = document.getElementById('BMRWeight').value;
    const heightCm = document.getElementById('BMRHeight').value;
    const age = document.getElementById('BMRAge').value;
    const gender = document.getElementById('BMRGender').value;
    
    let result = 0;
    
    if (weightKg <= 0 || heightCm <= 0 || age <= 0) {
      throw new Error("Invalid Value");
    }
    
    if (gender === "male") {
      result = 10 * weightKg + 6.25 * heightCm - 5 * age + 5;
    } else if (gender === "female") {
      result = 10 * weightKg + 6.25 * heightCm - 5 * age - 161;
    } else {
      throw new Error('Invalid Value');
    }
    
    writeOutput(result.toFixed(2));
  } catch (e) {
    writeOutput(e.message);
  }
}

function TDEE() {
  try {
    const bmrValue = document.getElementById('TDEEBMR').value;
    const activityMultiplier = document.getElementById('TDEEActivity').value;
    
    let result = 0;
    
    if (bmrValue <= 0 || activityMultiplier <= 0) {
      throw new Error('Invalid Value');
    }
  
    result = bmrValue * activityMultiplier;
    
    writeOutput(result.toFixed(2));
  } catch (e) {
    writeOutput(e.message);
  }
}

function bodyFat() {
  try {
    const gender = document.getElementById('bodyFatGender').value;
    const heightCm = document.getElementById('bodyFatHeight').value;
    const neckCm = document.getElementById('bodyFatNeck').value;
    const waistCm = document.getElementById('bodyFatWaist').value;
    const hipCm = document.getElementById('bodyFatHip').value || 0;
    
    let result = 0;
    
    if (waistCm <= 0 || neckCm <= 0 || heightCm <= 0) {
      throw new Error('Invalid Value');
    }
    
    if (gender === 'female' && hipCm <= 0) {
      throw new Error('Missing Required Value');
    }
    
    if (gender === "male") {
      result = 495 /
        (1.0324 -
          0.19077 * Math.log10(waistCm - neckCm) + 
          0.15456 * Math.log10(heightCm)) -
        450;
    } else if (gender === "female") {
      result = 495 /
        (1.29579 -
          0.35004 * Math.log10(waistCm + hipCm - neckCm) +
          0.221 * Math.log10(heightCm)) -
        450;
    }
    
    writeOutput(result.toFixed(2));
  } catch (e) {
    writeOutput(e.message);
  }
}

function waistToHeight(waistCm, heightCm) {
  if (waistCm <= 0 || heightCm <= 0) {
    throw new Error('Invalid Value');
  }
  
  return waistCm / heightCm;
}

function heartRateZones(age) {
  if (age <= 0 || age > 120) {
    throw new Error('Invalid Value');
  }
  
  const max = 220 - age;
  
  return {
    fatBurn: [max * 0.6, max * 0.7],
    cardio: [max * 0.7, max * 0.85],
    peak: [max * 0.85, max]
  };
}

function leanBodyMass(weightKg, bodyFatPercent) {
  if (weightKg <= 0 || bodyFatPercent < 0 || bodyFatPercent > 100) {
    throw new Error('Invalid Value');
  }
  
  return (weightKg * (100 - bodyFatPercent)) / 100;
}

function FFMI(weightKg, heightCm, bodyFatPercent) {
  if (weightKg <= 0 || heightCm <= 0 || bodyFatPercent < 0 || bodyFatPercent > 100) {
    throw new Error('Invalid Value');
  }
  
  const lbm = leanBodyMass(weightKg, bodyFatPercent);
  const heightM = heightCm / 100;
  
  return lbm / (heightM * heightM);
}

// STRENGTH
function oneRM(weightKg, reps, formula) {
  if (weightKg <= 0 || reps <= 0) {
    throw new Error('Invalid Value');
  }
  
  if (reps == 1) return weightKg;
  
  return formula === 'epley'
    ? weightKg * (1 + reps / 30)
    : weightKg * (36 / (37 - reps));
}

function relativeStrength(liftKg, bodyWeightKg) {
  if (liftKg <= 0 || bodyWeightKg <= 0) {
    throw new Error('Invalid Value');
  }
  
  return liftKg / bodyWeightKg;
}

function intensityPercent(liftKg, oneRmKg) {
  if (liftKg <= 0 || oneRmKg <= 0) {
    throw new Error('Invalid Value');
  }
  
  return (liftKg / oneRmKg) * 100;
}

function wilksScore(liftKg, bodyWeightKg, gender) {
  if (liftKg <= 0 || bodyWeightKg <= 0) {
    throw new Error('Invalid Value');
  }
  
  const coeff =
    gender === 'male'
      ? [
          -216.0475144,
          16.2606339,
          -0.002388645,
          -0.00113732,
          7.01863e-6,
          -1.291e-8
        ]
      : [
          594.31747775582,
          -27.23842536447,
          0.82112226871,
          -0.00930733913,
          4.731582e-5,
          -9.054e-8
        ];
    
  const denominator =
    coeff[0] +
    coeff[1] * bodyWeightKg +
    coeff[2] * Math.pow(bodyWeightKg, 2) +
    coeff[3] * Math.pow(bodyWeightKg, 3) +
    coeff[4] * Math.pow(bodyWeightKg, 4) +
    coeff[5] * Math.pow(bodyWeightKg, 5);
  
  return (liftKg * 500) / denominator;
}

// NUTRITION
function macros(calories, proteinRatio, carbRatio, fatRatio) {
  if (calories <= 0) {
    throw new Error('Invalid Value');
  }
  
  const totalRatio = proteinRatio + carbRatio + fatRatio;
  
  if (Math.abs(totalRatio - 1) > 0.01) {
    throw new Error('Ratios must sum to 1');
  }
  
  return {
    proteinGrams: (calories * proteinRatio) / 4,
    carbGrams: (calories * carbRatio) / 4,
    fatGrams: (calories * fatRatio) / 9
  };
}

function proteinIntake(weightKg, multiplier = 1.6) {
  if (weightKg <= 0 || multiplier <= 0) {
    throw new Error('Invalid Value');
  }
  
  return weightKg * multiplier;
}

function waterIntake(weightKg) {
  if (weightKg <= 0) {
    throw new Error('Invalid Value');
  }
  
  return weightKg * 35;
}

function calorieSurplus(tdeeValue, intakeCalories) {
  if (tdeeValue <= 0 || intakeCalories <= 0) {
    throw new Error('Invalid Value');
  }
  
  return intakeCalories - tdeeValue;
}

function calorieDeficit(tdeeValue, intakeCalories) {
  if (tdeeValue <= 0 || intakeCalories <= 0) {
    throw new Error('Invalid Value');
  }
  
  return tdeeValue - intakeCalories;
}

function fiberIntake(calories) {
  if (calories <= 0) {
    throw new Error('Invalid Value');
  }
  
  return (calories / 1000) * 14;
}

function glycemicLoad(gi, carbGrams) {
  if (gi < 0 || gi > 100) {
    throw new Error('GI must be between 0 and 100');
  }
  
  if (carbGrams < 0) {
    throw new Error('Invalid Value');
  }
  
  return (gi * carbGrams) / 100;
}

class BMIFormula extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div class="tools-element">
        <h2>BMI Calculator</h2>
        <input id="BMIWeight" type="number" placeholder="Weight (kg)" required>
        <input id="BMIHeight" type="number" placeholder="Height (cm)" required>
        <button id="BMICalc">Calculate</button>
      </div>
    `;
    
    this.querySelector('#BMICalc').onclick = () => {
      BMI();
    };
  }
}

class BMRFormula extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div class="tools-element">
        <h2>BMR Calculator</h2>
        <input id="BMRWeight" type="number" placeholder="Weight (kg)" required>
        <input id="BMRHeight" type="number" placeholder="Height (cm)" required>
        <input id="BMRAge" type="number" placeholder="Age (years)" required>
        <select id="BMRGender" name="Gender" required>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        <button id="BMRCalc">Calculate</button>
      </div>
    `;
    
    this.querySelector('#BMRCalc').onclick = () => {
      BMR();
    };
  }
}

class TDEEFormula extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div class="tools-element">
        <h2>TDEE Calculator</h2>
        <p>You can check your BMR by choosing the "BMR" tool above. Activity: No Exercise 1.2 - 1.9 Extra Active</p>
        <input id="TDEEBMR" type="number" placeholder="BMR" required>
        <input id="TDEEActivity" type="number" placeholder="Activity Multiplier" required>
        <button id="TDEECalc">Calculate</button>
      </div>
    `;
    
    this.querySelector('#TDEECalc').onclick = () => {
      TDEE();
    };
  }
}

class bodyFatFormula extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div class="tools-element">
        <h2>Body Fat Calculator</h2>
        <input id="bodyFatHeight" type="number" placeholder="Height (cm)" required>
        <input id="bodyFatNeck" type="number" placeholder="Neck (cm)" required>
        <input id="bodyFatWaist" type="number" placeholder="Waist (cm)" required>
        <input style="display:none;" id="bodyFatHip" type="number" placeholder="Hip (cm)">
        <select id="bodyFatGender" name="Gender" required>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        <button id="bodyFatCalc">Calculate</button>
      </div>
    `;
    
    this.querySelector('#bodyFatCalc').onclick = () => {
      bodyFat();
    }
    
    this.querySelector('#bodyFatGender').onchange = (e) => {
      const hipInput = document.getElementById('bodyFatHip');
      const gender = e.target.value;
      
      
      if (gender === 'female') {
        hipInput.style.display = 'block';
        hipInput.required = true;
      } else {
        hipInput.style.display = 'none';
        hipInput.required = false;
      }
    }
  }
}

customElements.define('bmi-formula', BMIFormula);
customElements.define('bmr-formula', BMRFormula);
customElements.define('tdee-formula', TDEEFormula);
customElements.define('bodyfat-formula', bodyFatFormula);