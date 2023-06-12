export const ENQUIRY_API_BASE_URL = '/api/enquiries'

export const endpoints = {
  postEnquiry: `${ENQUIRY_API_BASE_URL}`,
}

export enum EnquiryTypeEnum {
  ENQUIRY = 'Enquiry',
  LEAD = 'Lead',
  NEWSLETTER = 'Newsletter',
  RESOURCE = 'Resource',
}
