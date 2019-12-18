class ValidationClass {

	errors = [];

	validate = (data) => {
		this.errors = [];
		for (let item of data) {
			let { field, name, rules, lang } = item;
       
			// field= field.trim();

			rules = rules.split('|');

			for (let rule of rules) {

				rule = rule.trim();
				validationRules = rule.split(':');

				this.validateData(field, name, lang, validationRules[0], validationRules[1]);
			}
		}

		return this.errors;
	}

	messages = (attribute, lang, rule, ruleData) => {
		       
		if (lang == 'en') {
			switch (rule) {
				case 'required':
					return `Please enter ${attribute.toLowerCase()} `
					break;
				case 'email':
					return `Please enter a valid ${attribute.toLowerCase()}`
					break;
				case 'alpha':
					return `The ${attribute} should only consist of alphabetic characters.`
					break;
				case 'max':
					return `The ${attribute} may not be greater than ${ruleData} digits`
					break;
				case 'min':
					if (attribute == 'Mobile number') {
						return `The ${attribute} should be of ${ruleData} digits`
					}
					return `${attribute} must be atleast ${ruleData} characters`
					break;
				case 'numeric':
					return `The ${attribute} should only consist of numeric digits.`
					break;
				case 'no_space':
					return `Please enter ${attribute} all blank spaces are not allowed`
					break;
				default:
					break;
			}
		}
		else {
			switch (rule) {
				case 'required':
					return `الـ ${attribute} مطلوب`
					break;
				case 'email':
					return `${attribute} يجب أن يكون البريد إلكتروني صالح.`
					break;
				case 'alpha':
					return `الـ ${attribute} يجب أن تتكون من الأحرف الأبجدية فقط.`
					break;
				case 'max':
					return `الـ ${attribute} قد لايكون أكبر من ${ruleData} حروف `
					break;
				case 'min':
					return `الـ ${attribute} لا بد أن يكون على الأقل ${ruleData} حروف `
					break;
				case 'numeric':
					return `الـ ${attribute}يجب أن يتكون فقط من أحرف رقمية.`
					break;
				case 'no_space':
					return `الـ ${attribute} لا ينبغي أن يكون هناك أي فراغ بينهما.`
					break;
				default:
					return `حدث خطأ`
					break;
			}
		}
	}


	validateData = (field, name, lang, rule, ruleData) => {

		switch (rule) {
			case 'required':
				this.fieldIsRequired(field, name, lang, rule);
				break;
			case 'email':
				this.fieldIsEmail(field, name, lang, rule);
				break;
			case 'alpha':
				this.fieldIsAlpha(field, name, lang, rule);
				break;
			case 'max':
				this.fieldMax(field, name, lang, rule, ruleData);
				break;
			case 'min':
				this.fieldMin(field, name, lang, rule, ruleData);
				break;
			case 'numeric':
				this.isNumeric(field, name, lang, rule);
				break;
			case 'no_space':
				this.noSpace(field, name, lang, rule);
				break;
			default:
				break;
		}
	}

	fieldIsRequired = (field, name, lang, rule) => {
		if (!field)
			this.errors.push({ message:this.messages(name, lang, rule),field:name});

	}

	fieldIsEmail = (field, name, lang, rule) => {
		let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

		if (!regex.test(field))
		this.errors.push({ message:this.messages(name, lang, rule),field:name});

	}

	fieldIsAlpha = (field, name, lang, rule,ruleData) => {

		let regex = /^$|^[a-zA-Z ]+$/;

		if (!regex.test(field))
		this.errors.push({ message:this.messages(name, lang, rule,ruleData),field:name});

	}

	fieldMax = (field, name, lang, rule, ruleData) => {

		if (field.length > parseInt(ruleData))
		this.errors.push({ message:this.messages(name, lang, rule,ruleData),field:name});

	}

	fieldMin = (field, name, lang, rule, ruleData) => {
		       
		if (field.length < parseInt(ruleData))
		this.errors.push({ message:this.messages(name, lang, rule,ruleData),field:name});
	}

	isNumeric = (field, name, lang, rule) => {

		let isNumeric = !isNaN(parseFloat(field)) && isFinite(field);

		if (!isNumeric)
		this.errors.push({ message:this.messages(name, lang, rule),field:name});
	}

	noSpace = (field, name, lang, rule,ruleData) => {
		// let regex = /^$|^[^\s]+$/;
		let regex = /\S/
		if (!regex.test(field))
		this.errors.push({ message:this.messages(name, lang, rule,ruleData),field:name});
	}
	
}

export default Validation = new ValidationClass();
