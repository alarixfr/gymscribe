const output = document.getElementById("output");

function writeOutput(msg) {
  output.textContent = `Output: ${msg}`;
}

// HEALTH
function BMI() {
  try {
    const weightKg =
      parseFloat(document.getElementById("BMIWeight").value) || 0;
    const heightCm =
      parseFloat(document.getElementById("BMIHeight").value) || 0;

    if (!weightKg && !heightCm) {
      throw new Error("Not Found");
    }

    if (weightKg <= 0 || heightCm <= 0) {
      throw new Error("Invalid Value");
    }

    const result = weightKg / Math.pow(heightCm / 100, 2);

    writeOutput(result.toFixed(2));
  } catch (e) {
    writeOutput(e.message);
  }
}

function BMR() {
  try {
    const weightKg =
      parseFloat(document.getElementById("BMRWeight").value) || 0;
    const heightCm =
      parseFloat(document.getElementById("BMRHeight").value) || 0;
    const age = parseFloat(document.getElementById("BMRAge").value) || 0;
    const gender = document.getElementById("BMRGender").value;

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
    const bmrValue = parseFloat(document.getElementById("TDEEBMR").value) || 0;
    const activityMultiplier =
      parseFloat(document.getElementById("TDEEActivity").value) || 0;

    if (
      bmrValue <= 0 ||
      activityMultiplier <= 1.2 ||
      activityMultiplier >= 2.0
    ) {
      throw new Error("Invalid Value");
    }

    const result = bmrValue * activityMultiplier;

    writeOutput(result.toFixed(2));
  } catch (e) {
    writeOutput(e.message);
  }
}

function bodyFat() {
  try {
    const bmi = parseFloat(document.getElementById("bodyFatBMI").value) || 0;
    const age = parseFloat(document.getElementById("bodyFatAge").value) || 0;
    const gender = document.getElementById("bodyFatGender").value;

    if (bmi <= 0 || age <= 0) {
      throw new Error("Invalid Value");
    }

    let result;
    if (gender === "male") {
      result = 1.2 * bmi + 0.23 * age - 16.2;
    } else {
      result = 1.2 * bmi + 0.23 * age - 5.4;
    }

    writeOutput(`${result.toFixed(2)}%`);
  } catch (e) {
    writeOutput(e.message);
  }
}

function waistToHeight() {
  try {
    const waistCm =
      parseFloat(document.getElementById("waistToHeightWaist").value) || 0;
    const heightCm =
      parseFloat(document.getElementById("waistToHeightHeight").value) || 0;

    if (waistCm <= 0 || heightCm <= 0) {
      throw new Error("Invalid Value");
    }

    const result = waistCm / heightCm;

    writeOutput(result.toFixed(2));
  } catch (e) {
    writeOutput(e.message);
  }
}

function heartRateZones() {
  try {
    const age =
      parseFloat(document.getElementById("heartRateZonesAge").value) || 0;

    if (age <= 0 || age > 120) {
      throw new Error("Invalid Value");
    }

    const max = 220 - age;

    const result = {
      fatBurn: [(max * 0.6).toFixed(0), (max * 0.7).toFixed(0)],
      cardio: [(max * 0.7).toFixed(0), (max * 0.85).toFixed(0)],
      peak: [(max * 0.85).toFixed(0), max],
    };

    writeOutput(
      `Max: ${max} bpm, Fat Burn: ${result.fatBurn.join("-")} bpm, Cardio: ${result.cardio.join("-")} bpm, Peak: ${result.peak.join("-")} bpm`,
    );
  } catch (e) {
    writeOutput(e.message);
  }
}

function leanBodyMass() {
  try {
    const weightKg =
      parseFloat(document.getElementById("leanBodyMassWeight").value) || 0;
    const bodyFatPercent =
      parseFloat(document.getElementById("leanBodyMassBodyFat").value) || 0;

    if (weightKg <= 0 || bodyFatPercent <= 0 || bodyFatPercent >= 100) {
      throw new Error("Invalid Value");
    }

    const result = (weightKg * (100 - bodyFatPercent)) / 100;

    writeOutput(result.toFixed(2));
  } catch (e) {
    writeOutput(e.message);
  }
}

function FFMI() {
  try {
    const weightKg =
      parseFloat(document.getElementById("FFMIWeight").value) || 0;
    const heightCm =
      parseFloat(document.getElementById("FFMIHeight").value) || 0;
    const bodyFatPercent =
      parseFloat(document.getElementById("FFMIBodyFat").value) || 0;

    if (
      weightKg <= 0 ||
      heightCm <= 0 ||
      bodyFatPercent <= 0 ||
      bodyFatPercent >= 100
    ) {
      throw new Error("Invalid Value");
    }

    const lbm = (weightKg * (100 - bodyFatPercent)) / 100;
    const heightM = heightCm / 100;

    const result = lbm / (heightM * heightM);

    writeOutput(result.toFixed(2));
  } catch (e) {
    writeOutput(e.message);
  }
}

function idealBodyWeight() {
  try {
    const heightCm =
      parseFloat(document.getElementById("idealBodyWeightHeight").value) || 0;
    const gender = document.getElementById("idealBodyWeightGender").value;

    if (heightCm <= 0) {
      throw new Error("Invalid Value");
    }

    const heightInches = heightCm / 2.54;

    if (heightInches < 60) {
      throw new Error("Height must be at least 152cm");
    }

    let result;
    if (gender === "male") {
      result = 50 + 2.3 * (heightInches - 60);
    } else {
      result = 45.5 + 2.3 * (heightInches - 60);
    }

    writeOutput(result.toFixed(2));
  } catch (e) {
    writeOutput(e.message);
  }
}

function VO2Max() {
  try {
    const age = parseFloat(document.getElementById("VO2MaxAge").value) || 0;
    const restingHR =
      parseFloat(document.getElementById("VO2MaxRestingHR").value) || 0;

    if (age <= 0 || age > 120 || restingHR <= 0 || restingHR > 220) {
      throw new Error("Invalid Value");
    }

    const result = 15 * ((220 - age) / restingHR);

    let category =
      result < 30
        ? "Poor"
        : result < 40
          ? "Fair"
          : result < 50
            ? "Good"
            : result < 60
              ? "Excellent"
              : "Superior";

    writeOutput(`${result.toFixed(1)}ml/kg/min (${category})`);
  } catch (e) {
    writeOutput(e.message);
  }
}

// STRENGTH
function oneRM() {
  try {
    const weightKg =
      parseFloat(document.getElementById("oneRMWeight").value) || 0;
    const reps = parseFloat(document.getElementById("oneRMReps").value) || 0;
    const formula = document.getElementById("oneRMFormulaType").value;

    if (
      weightKg <= 0 ||
      reps <= 0 ||
      reps > 20 ||
      !Number.isInteger(reps) ||
      formula === null
    ) {
      throw new Error("Invalid Value");
    }

    if (reps == 1) {
      writeOutput(weightKg.toFixed(2));
      return;
    }

    let result;
    if (formula === "epley") {
      result = weightKg * (1 + reps / 30);
    } else if (formula === "brzycki") {
      result = weightKg * (36 / (37 - reps));
    } else {
      result = weightKg * Math.pow(reps, 0.1);
    }

    writeOutput(result.toFixed(2));
  } catch (e) {
    writeOutput(e.message);
  }
}

function relativeStrength() {
  try {
    const liftKg =
      parseFloat(document.getElementById("relativeStrengthLift").value) || 0;
    const bodyWeightKg =
      parseFloat(document.getElementById("relativeStrengthBodyWeight").value) ||
      0;

    if (liftKg <= 0 || bodyWeightKg <= 0) {
      throw new Error("Invalid Value");
    }

    const result = liftKg / bodyWeightKg;

    writeOutput(result.toFixed(2));
  } catch (e) {
    writeOutput(e.message);
  }
}

function intensityPercent() {
  try {
    const liftKg =
      parseFloat(document.getElementById("intensityPercentLift").value) || 0;
    const oneRmKg =
      parseFloat(document.getElementById("intensityPercentOneRM").value) || 0;

    if (liftKg <= 0 || oneRmKg <= 0) {
      throw new Error("Invalid Value");
    }

    const result = (liftKg / oneRmKg) * 100;

    writeOutput(`${result.toFixed(2)}%`);
  } catch (e) {
    writeOutput(e.message);
  }
}

function wilksScore() {
  try {
    const liftKg =
      parseFloat(document.getElementById("wilksScoreLift").value) || 0;
    const bodyWeightKg =
      parseFloat(document.getElementById("wilksScoreBodyWeight").value) || 0;
    const gender = document.getElementById("wilksScoreGender").value;

    if (liftKg <= 0 || bodyWeightKg <= 0 || gender === null) {
      throw new Error("Invalid Value");
    }

    const coeff =
      gender === "male"
        ? [
            -216.0475144, 16.2606339, -0.002388645, -0.00113732, 7.01863e-6,
            -1.291e-8,
          ]
        : [
            594.31747775582, -27.23842536447, 0.82112226871, -0.00930733913,
            4.731582e-5, -9.054e-8,
          ];

    const denominator =
      coeff[0] +
      coeff[1] * bodyWeightKg +
      coeff[2] * Math.pow(bodyWeightKg, 2) +
      coeff[3] * Math.pow(bodyWeightKg, 3) +
      coeff[4] * Math.pow(bodyWeightKg, 4) +
      coeff[5] * Math.pow(bodyWeightKg, 5);

    const result = (liftKg * 500) / denominator;

    writeOutput(result.toFixed(2));
  } catch (e) {
    writeOutput(e.message);
  }
}

// NUTRITION
function macros() {
  try {
    const calories =
      parseFloat(document.getElementById("macrosCalories").value) || 0;
    const proteinRatio =
      parseFloat(document.getElementById("macrosProtein").value) || -1;
    const carbRatio =
      parseFloat(document.getElementById("macrosCarb").value) || -1;
    const fatRatio =
      parseFloat(document.getElementById("macrosFat").value) || -1;

    if (calories <= 0 || proteinRatio < 0 || carbRatio < 0 || fatRatio < 0) {
      throw new Error("Invalid Value");
    }

    const totalRatio = proteinRatio + carbRatio + fatRatio;

    if (Math.abs(totalRatio - 1) > 0.01) {
      throw new Error("Ratios must sum to 1");
    }

    const result = {
      proteinGrams: (calories * proteinRatio) / 4,
      carbGrams: (calories * carbRatio) / 4,
      fatGrams: (calories * fatRatio) / 9,
    };

    writeOutput(
      `Protein: ${result.proteinGrams.toFixed(2)}g, Carbs: ${result.carbGrams.toFixed(2)}g, Fat: ${result.fatGrams.toFixed(2)}g`,
    );
  } catch (e) {
    writeOutput(e.message);
  }
}

function proteinIntake() {
  try {
    const weightKg =
      parseFloat(document.getElementById("proteinIntakeWeight").value) || 0;
    const multiplier =
      parseFloat(document.getElementById("proteinIntakeMultiplier").value) || 0;

    if (weightKg <= 0 || multiplier < 0.8 || multiplier > 3) {
      throw new Error("Invalid Value");
    }

    const result = weightKg * multiplier;

    writeOutput(`${result.toFixed(2)}g`);
  } catch (e) {
    writeOutput(e.message);
  }
}

function waterIntake() {
  try {
    const weightKg =
      parseFloat(document.getElementById("waterIntakeWeight").value) || 0;

    if (weightKg <= 0) {
      throw new Error("Invalid Value");
    }

    const result = (weightKg * 35) / 1000;

    writeOutput(`${result.toFixed(2)}L`);
  } catch (e) {
    writeOutput(e.message);
  }
}

function calorieSurplus() {
  try {
    const tdeeValue =
      parseFloat(document.getElementById("calorieSurplusTDEE").value) || 0;
    const intakeCalories =
      parseFloat(document.getElementById("calorieSurplusCalories").value) || 0;

    if (tdeeValue <= 0 || intakeCalories <= 0) {
      throw new Error("Invalid Value");
    }

    const result = intakeCalories - tdeeValue;

    writeOutput(`${result.toFixed(2)}kcal`);
  } catch (e) {
    writeOutput(e.message);
  }
}

function calorieDeficit() {
  try {
    const tdeeValue =
      parseFloat(document.getElementById("calorieDeficitTDEE").value) || 0;
    const intakeCalories =
      parseFloat(document.getElementById("calorieDeficitCalories").value) || 0;

    if (tdeeValue <= 0 || intakeCalories <= 0) {
      throw new Error("Invalid Value");
    }

    const result = tdeeValue - intakeCalories;

    writeOutput(`${result.toFixed(2)}kcal`);
  } catch (e) {
    writeOutput(e.message);
  }
}

function fiberIntake() {
  try {
    const calories =
      parseFloat(document.getElementById("fiberIntakeCalories").value) || 0;

    if (calories <= 0) {
      throw new Error("Invalid Value");
    }

    const result = (calories / 1000) * 14;

    writeOutput(`${result.toFixed(2)}g`);
  } catch (e) {
    writeOutput(e.message);
  }
}

function glycemicLoad(gi, carbGrams) {
  try {
    const gi =
      parseFloat(document.getElementById("glycemicLoadGI").value) || -1;
    const carbGrams =
      parseFloat(document.getElementById("glycemicLoadCarb").value) || -1;

    if (gi < 0 || gi > 100) {
      throw new Error("GI must be between 0 and 100");
    }

    if (carbGrams < 0) {
      throw new Error("Invalid Value");
    }

    const result = (gi * carbGrams) / 100;

    writeOutput(result.toFixed(2));
  } catch (e) {
    writeOutput(e.message);
  }
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

    this.querySelector("#BMICalc").onclick = () => {
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

    this.querySelector("#BMRCalc").onclick = () => {
      BMR();
    };
  }
}

class TDEEFormula extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div class="tools-element">
        <h2>TDEE Calculator</h2>
        <p>You can check your BMR by choosing the "BMR" tool above</p>
        <p>Activity: No Exercise 1.2 - 1.9 Extra Active</p>
        <input id="TDEEBMR" type="number" placeholder="BMR Score" required>
        <input id="TDEEActivity" type="number" placeholder="Activity Multiplier" required>
        <button id="TDEECalc">Calculate</button>
      </div>
    `;

    this.querySelector("#TDEECalc").onclick = () => {
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

    this.querySelector("#bodyFatCalc").onclick = () => {
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

    this.querySelector("#waistToHeightCalc").onclick = () => {
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

    this.querySelector("#heartRateZonesCalc").onclick = () => {
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

    this.querySelector("#leanBodyMassCalc").onclick = () => {
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

    this.querySelector("#FFMICalc").onclick = () => {
      FFMI();
    };
  }
}

class oneRMFormula extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div class="tools-element">
        <h2>1RM Calculator</h2>
        <p>Enter reps from 1 - 20</p>
        <input id="oneRMWeight" type="number" placeholder="Weight (kg)" required>
        <input id="oneRMReps" type="number" placeholder="Reps (amount)" required>
        <select id="oneRMFormulaType" name="Formula" required>
          <option value="epley">Epley</option>
          <option value="brzycki">Brzycki</option>
          <option value="lombardi">Lombardi</option>
        </select>
        <button id="oneRMCalc">Calculate</button>
      </div>
    `;

    this.querySelector("#oneRMCalc").onclick = () => {
      oneRM();
    };
  }
}

class relativeStrengthFormula extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div class="tools-element">
        <h2>Relative Strength Calculator</h2>
        <input id="relativeStrengthLift" type="number" placeholder="Lift (kg)" required>
        <input id="relativeStrengthBodyWeight" type="number" placeholder="Body Weight (kg)" required>
        <button id="relativeStrengthCalc">Calculate</button>
      </div>
    `;

    this.querySelector("#relativeStrengthCalc").onclick = () => {
      relativeStrength();
    };
  }
}

class intensityPercentFormula extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div class="tools-element">
        <h2>Intensity Percent Calculator</h2>
        <input id="intensityPercentLift" type="number" placeholder="Lift (kg)" required>
        <input id="intensityPercentOneRM" type="number" placeholder="OneRM (kg)" required>
        <button id="intensityPercentCalc">Calculate</button>
      </div>
    `;

    this.querySelector("#intensityPercentCalc").onclick = () => {
      intensityPercent();
    };
  }
}

class wilksScoreFormula extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div class="tools-element">
        <h2>Wilks Score Calculator</h2>
        <input id="wilksScoreLift" type="number" placeholder="Lift (kg)" required>
        <input id="wilksScoreBodyWeight" type="number" placeholder="Body Weight (kg)" required>
        <select id="wilksScoreGender" name="Gender" required>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        <button id="wilksScoreCalc">Calculate</button>
      </div>
    `;

    this.querySelector("#wilksScoreCalc").onclick = () => {
      wilksScore();
    };
  }
}

class macrosFormula extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div class="tools-element">
        <h2>Macros Calculator</h2>
        <p>Ratio must be 0.0 - 1.0</p>
        <input id="macrosCalories" type="number" placeholder="Calories (kcal)" required>
        <input id="macrosProtein" type="number" placeholder="Protein Ratio" required>
        <input id="macrosCarb" type="number" placeholder="Carb Ratio" required>
        <input id="macrosFat" type="number" placeholder="Fat Ratio" required>
        <button id="macrosCalc">Calculate</button
      </div>
    `;

    this.querySelector("#macrosCalc").onclick = () => {
      macros();
    };
  }
}

class proteinIntakeFormula extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div class="tools-element">
        <h2>Protein Intake Calculator</h2>
        <p>Activity: 0.8 - 3.0</p>
        <p>Muscle Gain: 1.6 - 2.2</p>
        <input id="proteinIntakeWeight" type="number" placeholder="Weight (kg)" required>
        <input id="proteinIntakeMultiplier" type="number" placeholder="Multiplier" required>
        <button id="proteinIntakeCalc">Calculate</button>
      </div>
    `;

    this.querySelector("#proteinIntakeCalc").onclick = () => {
      proteinIntake();
    };
  }
}

class waterIntakeFormula extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div class="tools-element">
        <h2>Water Intake Calculator</h2>
        <p>Result may not suitable for people in hot climate and high water needs</p>
        <input id="waterIntakeWeight" type="number" placeholder="Weight (kg)" required>
        <button id="waterIntakeCalc">Calculate</button>
      </div>
    `;

    this.querySelector("#waterIntakeCalc").onclick = () => {
      waterIntake();
    };
  }
}

class calorieSurplusFormula extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div class="tools-element">
        <h2>Calorie Surplus Calculator</h2>
        <input id="calorieSurplusTDEE" type="number" placeholder="TDEE" required>
        <input id="calorieSurplusCalories" type="number" placeholder="Calories (kcal)" required>
        <button id="calorieSurplusCalc">Calculate</button>
      </div>
    `;

    this.querySelector("#calorieSurplusCalc").onclick = () => {
      calorieSurplus();
    };
  }
}

class calorieDeficitFormula extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div class="tools-element">
        <h2>Calorie Deficit Calculator</h2>
        <input id="calorieDeficitTDEE" type="number" placeholder="TDEE" required>
        <input id="calorieDeficitCalories" type="number" placeholder="Calories (kcal)" required>
        <button id="calorieDeficitCalc">Calculate</button>
      </div>
    `;

    this.querySelector("#calorieDeficitCalc").onclick = () => {
      calorieDeficit();
    };
  }
}

class fiberIntakeFormula extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div class="tools-element">
        <h2>Fiber Intake Calculator</h2>
        <input id="fiberIntakeCalories" type="number" placeholder="Calories (kcal)" required>
        <button id="fiberIntakeCalc">Calculate</button>
      </div>
    `;

    this.querySelector("#fiberIntakeCalc").onclick = () => {
      fiberIntake();
    };
  }
}

class glycemicLoadFormula extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div class="tools-element">
        <h2>Glycemic Load Calculator</h2>
        <input id="glycemicLoadGI" type="number" placeholder="Glycemic Index (GI)" required>
        <input id="glycemicLoadCarb" type="number" placeholder="Carb (g)" required>
        <button id="glycemicLoadCalc">Calculate</button>
      </div>
    `;

    this.querySelector("#glycemicLoadCalc").onclick = () => {
      glycemicLoad();
    };
  }
}

class idealBodyWeightFormula extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div class="tools-element">
        <h2>Ideal Body Weight Calculator</h2>
        <input id="idealBodyWeightHeight" type="number" placeholder="Height (cm)" required>
        <select id="idealBodyWeightGender" name="Gender" required>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        <button id="idealBodyWeightCalc">Calculate</button>
      </div>
    `;

    this.querySelector("#idealBodyWeightCalc").onclick = () => {
      idealBodyWeight();
    };
  }
}

class VO2MaxFormula extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div class="tools-element">
        <h2>VO2 Max Calculator</h2>
        <input id="VO2MaxAge" type="number" placeholder="Age (years)" required>
        <input id="VO2MaxRestingHR" type="number" placeholder="Resting HR (bpm)" required>
        <button id="VO2MaxCalc">Calculate</button>
      </div>
    `;

    this.querySelector("#VO2MaxCalc").onclick = () => {
      VO2Max();
    };
  }
}

customElements.define("bmi-formula", BMIFormula);
customElements.define("bmr-formula", BMRFormula);
customElements.define("tdee-formula", TDEEFormula);
customElements.define("bodyfat-formula", bodyFatFormula);
customElements.define("waisttoheight-formula", waistToHeightFormula);
customElements.define("heartratezones-formula", heartRateZonesFormula);
customElements.define("leanbodymass-formula", leanBodyMassFormula);
customElements.define("ffmi-formula", FFMIFormula);
customElements.define("onerm-formula", oneRMFormula);
customElements.define("relativestrength-formula", relativeStrengthFormula);
customElements.define("intensitypercent-formula", intensityPercentFormula);
customElements.define("wilksscore-formula", wilksScoreFormula);
customElements.define("macros-formula", macrosFormula);
customElements.define("proteinintake-formula", proteinIntakeFormula);
customElements.define("waterintake-formula", waterIntakeFormula);
customElements.define("caloriesurplus-formula", calorieSurplusFormula);
customElements.define("caloriedeficit-formula", calorieDeficitFormula);
customElements.define("fiberintake-formula", fiberIntakeFormula);
customElements.define("glycemicload-formula", glycemicLoadFormula);
customElements.define("idealbodyweight-formula", idealBodyWeightFormula);
customElements.define("vo2max-formula", VO2MaxFormula);
