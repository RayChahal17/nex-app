import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
   
    en: {
        translation: {
            "All Estimates": "All Estimates",
            "Sort by": "Sort by",
            "Filter by Status": "Filter by Status",
            "Refresh": "Refresh",
            "Date": "Date",
            "Customer Name": "Customer Name",
            "Address": "Address",
            "City": "City",
            "Estimated Cost": "Estimated Cost",
            "Service Type": "Service Type",
            "Status": "Status",
            "Actions": "Actions",
            "View": "View",
            "Delete": "Delete",
            "Delete Estimate": "Delete Estimate",
            "Are you sure you want to delete this estimate?": "Are you sure you want to delete this estimate?",
            "Confirm": "Confirm",
            "Cancel": "Cancel",
            "Change Status": "Change Status",
            "Are you sure you want to change the status to": "Are you sure you want to change the status to",
            "Close": "Close",
            "Status Change": "Status Change",
            "Estimate Details": "Estimate Details",
  "Customer Information": "Customer Information",
  "Name": "Name",
  "Address": "Address",
  "City": "City",
  "Phone": "Phone",
  "Email": "Email",
  "Service Type": "Service Type",
  "Section Details": "Section Details",
  "Area (sq ft)": "Area (sq ft)",
  "Total Area": "Total Area",
  "Additional Costs": "Additional Costs",
  "Description": "Description",
  "Amount": "Amount",
  "Demolition Charges": "Demolition Charges",
  "Bin Charges": "Bin Charges",
  "Labor Charges": "Labor Charges",
  "Iron Mesh and Reinforcements Charges": "Iron Mesh and Reinforcements Charges",
  "Miscellaneous Charges": "Miscellaneous Charges",
  "Stairs": "Stairs",
  "Number of Stairs": "Number of Stairs",
  "Cost Per Stair": "Cost Per Stair",
  "Total Cost of Stairs": "Total Cost of Stairs",
  "Cost Per Square Feet": "Cost Per Square Feet",
  "Cost Per Sq Ft": "Cost Per Sq Ft",
  "Total without HST": "Total without HST",
  "HST Amount": "HST Amount",
  "Total Estimate with HST": "Total Estimate with HST",
  "Close": "Close",
  "Date": "Date",
  "Customer Name": "Customer Name",
  "Estimated Cost": "Estimated Cost",
  "Status": "Status",
  "Actions": "Actions",
  "View": "View",
  "Delete": "Delete",
  "Confirm": "Confirm",
  "Cancel": "Cancel",
  "Change Status": "Change Status",
  "Status Change": "Status Change",
  "Refresh": "Refresh",
  "Sort by": "Sort by",
  "Filter by Status": "Filter by Status",
  "Date (Closest)": "Date (Closest)",
  "Date (Farthest)": "Date (Farthest)",
  "Service Type": "Service Type",
  "Job Pending": "Job Pending",
  "Job Waiting": "Job Waiting",
  "Job In Progress": "Job In Progress",
  "Job Completed": "Job Completed",
  "Section": "Section",
  "Estimate Details": "Estimate Details",
  "Additional Notes": "Additional Notes",
            // Add all your other translations here
        }
    },
    pa: {
        translation: {
            "All Estimates": "ਸਾਰੇ ਅੰਦਾਜ਼ੇ",
            "Sort by": "ਕ੍ਰਮਬੱਧ ਕਰੋ",
            "Filter by Status": "ਸਥਿਤੀ ਦੁਆਰਾ ਫਿਲਟਰ ਕਰੋ",
            "Refresh": "ਤਾਜ਼ਾ ਕਰੋ",
            "Date": "ਮਿਤੀ",
            "Customer Name": "ਗਾਹਕ ਦਾ ਨਾਮ",
            "Address": "ਪਤਾ",
            "City": "ਸ਼ਹਿਰ",
            "Estimated Cost": "ਅੰਦਾਜ਼ ਲਾਗਤ",
            "Service Type": "ਸੇਵਾ ਦੀ ਕਿਸਮ",
            "Status": "ਸਥਿਤੀ",
            "Actions": "ਕਿਰਿਆਵਾਂ",
            "View": "ਵੇਖੋ",
            "Delete": "ਹਟਾਓ",
            "Delete Estimate": "ਅੰਦਾਜ਼ਾ ਹਟਾਓ",
            "Are you sure you want to delete this estimate?": "ਕੀ ਤੁਸੀਂ ਪੱਕਾ ਇਸ ਅੰਦਾਜ਼ੇ ਨੂੰ ਹਟਾਉਣਾ ਚਾਹੁੰਦੇ ਹੋ?",
            "Confirm": "ਪੁਸ਼ਟੀ ਕਰੋ",
            "Cancel": "ਰੱਦ ਕਰੋ",
            "Change Status": "ਸਥਿਤੀ ਬਦਲੋ",
            "Are you sure you want to change the status to": "ਕੀ ਤੁਸੀਂ ਪੱਕਾ ਸਥਿਤੀ ਨੂੰ ਬਦਲਣਾ ਚਾਹੁੰਦੇ ਹੋ",
            "Close": "ਬੰਦ ਕਰੋ",
            "Status Change": "ਸਥਿਤੀ ਬਦਲੋ",
            
            // Add all your other translations here
        }
    }
};

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: 'en', // Default language
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;
