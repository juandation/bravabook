export interface ValidationRule {
  required?: boolean;
  min?: number;
  max?: number;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  message?: string;
  custom?: (value: any) => string | boolean;
}

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

export const validateField = (name: string, value: any, rules: ValidationRule): string | null => {
  if (rules.required && (value === undefined || value === null || value === '')) {
    return rules.message || `${name} is required`;
  }

  if (value === undefined || value === null || value === '') {
    return null; // Skip further validation if the field is optional and empty
  }

  if (typeof value === 'number') {
    if (rules.min !== undefined && value < rules.min) {
      return rules.message || `${name} must be at least ${rules.min}`;
    }
    if (rules.max !== undefined && value > rules.max) {
      return rules.message || `${name} must be at most ${rules.max}`;
    }
  }

  if (typeof value === 'string') {
    if (rules.minLength !== undefined && value.length < rules.minLength) {
      return rules.message || `${name} must be at least ${rules.minLength} characters`;
    }
    if (rules.maxLength !== undefined && value.length > rules.maxLength) {
      return rules.message || `${name} must be at most ${rules.maxLength} characters`;
    }
    if (rules.pattern && !rules.pattern.test(value)) {
      return rules.message || `${name} is not valid`;
    }
  }

  if (Array.isArray(value) && rules.minLength !== undefined && value.length < rules.minLength) {
    return rules.message || `Select at least ${rules.minLength} ${name}`;
  }

  if (rules.custom) {
    const customResult = rules.custom(value);
    if (typeof customResult === 'string') {
      return customResult;
    } else if (customResult === false) {
      return rules.message || `${name} is not valid`;
    }
  }

  return null;
};

export const validateForm = <T extends Record<string, any>>(
  data: T,
  rules: Record<keyof T, ValidationRule>
): ValidationResult => {
  const errors: Record<string, string> = {};
  
  for (const [field, rule] of Object.entries(rules)) {
    const error = validateField(field, data[field as keyof T], rule);
    if (error) {
      errors[field] = error;
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
