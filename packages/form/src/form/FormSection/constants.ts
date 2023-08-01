export enum FormSectionFieldTypeEnum {
  // String
  HTML = 'html',
  INPUT = 'input',
  EMAIL = 'email',
  MOBILE = 'mobile',
  PASSWORD = 'password',
  TEXTAREA = 'textarea',
  TEXT = 'text', // alias for input
  RADIO = 'radio',
  CHECKBOX = 'checkbox',

  // Dropdown
  COUNTRY_CODE = 'country_code',
  COUNTRY = 'country',

  // Number
  AMOUNT = 'amount',
  PERCENTAGE = 'percentage',
  RATE = 'rate',

  // Boolean
  SWITCH = 'switch',

  // Blob
  FILES = 'files',
  IMAGES = 'images',
  IMAGE = 'image',

  // Objects/Arrays
  MODEL = 'model',
  CHIP = 'chip',
  CHECKBOX_TABLE = 'CHECKBOX_TABLE',

  // Date
  DATE = 'date',
  DATE_TIME = 'date_time',
  TIME = 'time',
}
