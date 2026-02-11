// HEALTH

function BMI(weightKg, heightCm) {
  if (weightKg <= 0 || heightCm <= 0) {
    throw new Error('Invalid Value');
  }
  
  return weightKg / Math.pow(heightCm / 100, 2);
}

function BMR(weightKg, heightCm, age, gender) {
  if (weightKg <= 0 || heightCm <= 0 || age <= 0) {
    throw new Error("Invalid Value");
  }
  
  return gender === "male"
    ? 10 * weightKg + 6.25 * heightCm - 5 * age + 5
    : 10 * weightKg + 6.25 * heightCm - 5 * age - 161;
}

function tdee(bmrValue, activityMultiplier) {
  if (bmrValue <= 0 || activityMultiplier <= 0) {
    throw new Error('Invalid Value');
  }
  
  return bmrValue * activityMultiplier;
}

function bodyFat(gender, waistCm, neckCm, heightCm, hipCm = 0) {
  if (waistCm <= 0 || neckCm <= 0 || heightCm <= 0) {
    throw new Error('Invalid Value');
  }
  
  if (gender === 'female' && hipCm <= 0) {
    throw new Error('Missing Required Value');
  }
  
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

// BODY COMPOSITION

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