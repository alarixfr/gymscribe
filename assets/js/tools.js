// HEALTH

function BMI(weightKg, heightCm) {
  return weightKg / Math.pow(heightCm / 100, 2);
}

function BMR(weightKg, heightCm, age, gender) {
  return gender === "male"
    ? 10 * weightKg + 6.25 * heightCm - 5 * age + 5
    : 10 * weightKg + 6.25 * heightCm - 5 * age - 161;
}

function tdee(bmrValue, activityMultiplier) {
  return bmrValue * activityMultiplier;
}

function bodyFat(gender, waistCm, neckCm, heightCm, hipCm = 0) {
  return gender === "male"
    ? 495  /
      (1.0324 -
        0.19077 * Math.log10(waistCm - neckCm) + 
        0.15456 * Math.log10(heightCm)) -
      450
    : 495 /
      (1.29579 -
        0.35004 * Math.log10(waistCm + hipCm - neckCm) +
        0.221 * Math.log10(heightCm)) -
      450;
}

function waistToHeight(waistCm, heightCm) {
  return waistCm / heightCm;
}

function heartRateZones(age) {
  const max = 220 - age;
  
  return {
    fatBurn: [max * 0.6, max * 0.7],
    cardio: [max * 0.7, max * 0.85],
    peak: [max * 0.85, max]
  };
}

// STRENGTH

function oneRM(weightKg, reps) {
  return weightKg * (1 + reps / 30);
}

function relativeStrength(liftKg, bodyWeightKg) {
  return liftKg / bodyWeightKg;
}

function intensityPercent(liftKg, oneRmKg) {
  return (liftKg / oneRmKg) * 100;
}

// NUTRITION

function macros(calories, proteinRatio, carbRatio, fatRatio) {
  return {
    proteinGrams: (calories * proteinRatio) / 4,
    carbGrams: (calories * carbRatio) / 4,
    fatGrams: (calories * fatRatio) / 9
  };
}

function proteinIntake(weightKg, multiplier = 2) {
  return weightKg * multiplier;
}

function waterIntake(weightKg) {
  return weightKg * 35;
}

function calorieSurplus(tdeeValue, intakeCalories) {
  return intakeCalories - tdeeValue;
}

function fiberIntake(calories) {
  return (calories / 1000) * 14;
}

function glycemicLoad(gi, carbGrams) {
  return (gi * carbGrams) / 100;
}