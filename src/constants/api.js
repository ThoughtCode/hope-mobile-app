export const BASE_URL = "https://hopeec-staging.herokuapp.com";
export const STAGING_URL = "https://hopeec-staging.herokuapp.com";
// export const BASE_URL = "http://localhost:3000";
export const SIGNUP_URI = "/api/v1/customers/signup";
export const AGENT_SIGNUP_URI = "/api/v1/agents/signup";
export const CUSTOMER_SIGNIN = "/api/v1/customers/signin";
export const CUSTOMER_FACEBOOK_LOGIN = "/api/v1/customers/facebook"
export const AGENT_SIGNIN = "/api/v1/agents/signin";
export const CUSTOMER_SIGNOUT = "/api/v1/customers/signout";
export const AGENT_SIGNOUT = "/api/v1/agents/signout";
export const CUSTOMER_RECOVER_PASSWORD = "/api/v1/customers/recover_password";
export const CUSTOMER_UPDATE_PASSWORD = "/api/v1/customers/app_update_password";
export const AGENT_RECOVER_PASSWORD = "/api/v1/agents/recover_password";
export const AGENT_UPDATE_PASSWORD = "/api/v1/agents/app_update_password";
export const SERVICE_TYPES = "/api/v1/customers/service_types";
export const NEXT_JOBS = "/api/v1/customers/jobs?status=nextjobs&current_page=1&limit=4";
export const PAST_JOBS = "/api/v1/customers/jobs?status=history&current_page=1&limit=4";
export const PROPERTIES = "/api/v1/customers/properties/";
export const JOBS = "/api/v1/agents/jobs";
export const JOBS_ACCEPTED = "/api/v1/agents/jobs/accepted?date_from=<datetime>&date_to=<datetime>&min_price=<number>&max_price=<number>&frequency=<number[0|1|2|3]>&current_page=<integer>"
export const COMMENTS = "/api/v1/agents/customer/";
export const UPDATE_USER = "/api/v1/agents/update";
export const UPDATE_PASSWORD = "/api/v1/agents/change_password";
export const AGENT_COMMENTS_PROFILE = "/api/v1/agents";
export const AGENT_REPORT_PROFILE = "/api/v1/agents/jobs/reports"
export const UPDATE_PROFILE_PIC = "/api/v1/agents/update";
export const SET_REVIEW = "/api/v1/agents/jobs/";

export const CUSTOMERS_JOBS = "/api/v1/customers/jobs";
export const AGENT_REVIEWS = "/api/v1/customers/jobs/";
export const CUSTOMERS_PROPERTIES = "/api/v1/customers/properties";
export const CUSTOMERS_CREATEDJOB = "/api/v1/customers/jobs";
export const CUSTOMERS_PROFILE = "/api/v1/customers/update";
export const CUSTOMERS_PASSWORD = "/api/v1/customers/change_password";
export const GET_CITY = "/api/v1/customers/cities";
export const GET_NEIGHTBORHOODS = "/api/v1/customers/cities/";
export const SET_CUSTERMER_REVIEW = "/api/v1/customers/jobs/";
export const GET_CUSTERMER_SERVICETYPE = "/api/v1/customers/service_types/";
export const ADD_CARD = "/api/v1/customers/add_card";
export const ADD_INVOICE_DETAIL = "/api/v1/customers/invoice_details";
export const GET_CARD_LIST="/api/v1/customers/credit_cards";
export const GET_DETAILS_LIST_CREATED_JOB="/api/v1/customers/invoice_details";
export const CUSTOMER_COMMENTS_PROFILE = "/api/v1/customers";
export const GET_HOLIDAY = "/api/v1/customers/holidays";
export const SET_AGENT_MOBILE_TOKEN = "/api/v1/agents/add_mobile_token";
export const SET_CUSTOMER_MOBILE_TOKEN = "/api/v1/customers/add_mobile_token";
export const DELETE_CARD = "/api/v1/customers/delete_card/";