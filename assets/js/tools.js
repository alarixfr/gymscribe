const output = document.getElementById("output");

function writeOutput(msg) {
  output.textContent = `Output: ${msg}`;
}

// HEALTH
function BMI() {
  try {
    const weightKg = parseFloat(document.getElementById('BMIWeight').value) || 0;
    const heightCm = parseFloat(document.getElementById('BMIHeight').value) || 0;
    
    if (!weightKg && !heightCm) {
      throw new Error('Not Found');
    }
    
    if (weightKg <= 0 || heightCm <= 0) {
      throw new Error('Invalid Value');
    }
    
    const result = weightKg / Math.pow(heightCm / 100, 2);
    
    writeOutput(result.toFixed(2));
  } catch (e) {
    writeOutput(e.message);
  }
}

function BMR() {
  try {
    const weightKg = parseFloat(document.getElementById('BMRWeight').value) || 0;
    const heightCm = parseFloat(document.getElementById('BMRHeight').value) || 0;
    const age = parseFloat(document.getElementById('BMRAge').value) || 0;
    const gender = document.getElementById('BMRGender').value;
    
    if (weightKg <= 0 || heightCm <= 0 || age <= 0) {
      throw new Error("Invalid Value");
    }
    
    let result;
    if (gender === "male") {
      result = 10 * weightKg + 6.25 * heightCm - 5 * age + 5;
    } else {
      result = 10 * weightKg + 6.25 * heightCm - 5 * age - 161;
    }
    
    writeOutput(result.toFixed(2));
  } catch (e) {
    writeOutput(e.message);
  }
}

function TDEE() {
  try {
    const bmrValue = parseFloat(document.getElementById('TDEEBMR').value) || 0;
    const activityMultiplier = parseFloat(document.getElementById('TDEEActivity').value) || 0;
    
    if (bmrValue <= 0 || activityMultiplier <= 1.2 || activityMultiplier >= 2.0) {
      throw new Error('Invalid Value');
    }
  
    const result = bmrValue * activityMultiplier;
    
    writeOutput(result.toFixed(2));
  } catch (e) {
    writeOutput(e.message);
  }
}

function bodyFat() {
  try {
    const bmi = parseFloat(document.getElementById('bodyFatBMI').value) || 0;
    const age = parseFloat(document.getElementById('bodyFatAge').value) || 0;
    const gender = document.getElementById('bodyFatGender').value;
    
    if (bmi <= 0 || age <= 0) {
      throw new Error('Invalid Value');
    }
    
    let result;
    if (gender === "male") {
      result = 1.20 * bmi + 0.23 * age - 16.2;
    } else {
      result = 1.20 * bmi + 0.23 * age - 5.4;
    }
    
    writeOutput(`${result.toFixed(2)}%`);
  } catch (e) {
    writeOutput(e.message);
  }
}

function waistToHeight() {
  try {
    const waistCm = parseFloat(document.getElementById('waistToHeightWaist').value) || 0;
    const heightCm = parseFloat(document.getElementById('waistToHeightHeight').value) || 0;
    
    if (waistCm <= 0 || heightCm <= 0) {
      throw new Error('Invalid Value');
    }
    
    const result = waistCm / heightCm;
    
    writeOutput(result.toFixed(2));
  } catch (e) {
    writeOutput(e.message);
  }
}

function heartRateZones() {
  try {
    const age = parseFloat(document.getElementById('heartRateZonesAge').value) || 0;
    
    if (age <= 0 || age > 120) {
      throw new Error('Invalid Value');
    }
    
    const max = 220 - age;
    
    const result = {
      fatBurn: [(max * 0.6).toFixed(0), (max * 0.7).toFixed(0)],
      cardio: [(max * 0.7).toFixed(0), (max * 0.85).toFixed(0)],
      peak: [(max * 0.85).toFixed(0), max]
    };
    
    writeOutput(`Max: ${max} bpm, Fat Burn: ${result.fatBurn.join('-')} bpm, Cardio: ${result.cardio.join('-')} bpm, Peak: ${result.peak.join('-')} bpm`);
  } catch (e) {
    writeOutput(e.message);
  }
}

function leanBodyMass() {
  try {
    const weightKg = parseFloat(document.getElementById('leanBodyMassWeight').value) || 0;
    const bodyFatPercent = parseFloat(document.getElementById('leanBodyMassBodyFat').value) || 0;
    
    if (weightKg <= 0 || bodyFatPercent <= 0 || bodyFatPercent >= 100) {
      throw new Error('Invalid Value');
    }
  
    const result = (weightKg * (100 - bodyFatPercent)) / 100;
    
    writeOutput(result.toFixed(2));
  } catch(e) {
    writeOutput(e.message);
  }
}

function FFMI() {
  try {
    const weightKg = parseFloat(document.getElementById('FFMIWeight').value) || 0;
    const heightCm = parseFloat(document.getElementById('FFMIHeight').value) || 0;
    const bodyFatPercent = parseFloat(document.getElementById('FFMIBodyFat').value) || 0;
    
    if (weightKg <= 0 || heightCm <= 0 || bodyFatPercent <= 0 || bodyFatPercent >= 100) {
      throw new Error('Invalid Value');
    }
    
    const lbm = (weightKg * (100 - bodyFatPercent)) / 100;
    const heightM = heightCm / 100;
    
    const result = lbm / (heightM * heightM);
    
    writeOutput(result.toFixed(2));
  } catch(e) {
    writeOutput(e.message);
  }
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
        <input id="TDEEBMR" type="number" placeholder="BMR Score" required>
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
        <h2>Body Fat Estimation</h2>
        <input id="bodyFatBMI" type="number" placeholder="BMI Score" required>
        <input id="bodyFatAge" type="number" placeholder="Age (years)" required>
        <select id="bodyFatGender" name="Gender" required>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        <button id="bodyFatCalc">Calculate</button>
      </div>
    `;
    
    this.querySelector('#bodyFatCalc').onclick = () => {
      bodyFat();
    };
  }
}

class waistToHeightFormula extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div class="tools-element">
        <h2>Waist To Height Ratio</h2>
        <input id="waistToHeightWaist" type="number" placeholder="Waist (cm)" required>
        <input id="waistToHeightHeight" type="number" placeholder="Height (cm)" required>
        <button id="waistToHeightCalc">Calculate</button>
      </div>
    `;
    
    this.querySelector('#waistToHeightCalc').onclick = () => {
      waistToHeight();
    };
  }
}

class heartRateZonesFormula extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div class="tools-element">
        <h2>Heart Rate Zones Checker</h2>
        <input id="heartRateZonesAge" type="number" placeholder="Age (years)" required>
        <button id="heartRateZonesCalc">Calculate</button>
      </div>
    `;
    
    this.querySelector('#heartRateZonesCalc').onclick = () => {
      heartRateZones();
    };
  }
}

class leanBodyMassFormula extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div class="tools-element">
        <h2>Lean Body Mass Calculator</h2>
        <input id="leanBodyMassWeight" type="number" placeholder="Weight (kg)" required>
        <input id="leanBodyMassBodyFat" type="number" placeholder="Body Fat (%)" required>
        <button id="leanBodyMassCalc">Calculate</button>
      </div>
    `;
    
    this.querySelector('#leanBodyMassCalc').onclick = () => {
      leanBodyMass();
    };
  }
}

class FFMIFormula extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div class="tools-element">
        <h2>FFMI Calculator</h2>
        <input id="FFMIWeight" type="number" placeholder="Weight (kg)" required>
        <input id="FFMIHeight" type="number" placeholder="Height (kg)" required>
        <input id="FFMIBodyFat" type="number" placeholder="Body Fat (%)" required>
        <button id="FFMICalc">Calculate</button>
      </div>
    `;
    
    this.querySelector('#FFMICalc').onclick = () => {
      FFMI();
    };
  }
}

customElements.define('bmi-formula', BMIFormula);
customElements.define('bmr-formula', BMRFormula);
customElements.define('tdee-formula', TDEEFormula);
customElements.define('bodyfat-formula', bodyFatFormula);
customElements.define('waisttoheight-formula', waistToHeightFormula)
customElements.define('heartratezones-formula', heartRateZonesFormula);
customElements.define('leanbodymass-formula', leanBodyMassFormula)
customElements.define('ffmi-formula', FFMIFormula);