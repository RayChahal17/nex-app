import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
   en: {
      translation: {
         "Concrete Cost Estimation": "Concrete Cost Estimation",
         "Project Area Details": "Project Area Details",
         "Total Area (sq ft)": "Total Area (sq ft)",
         "Enter total area in sq ft": "Enter total area in sq ft",
         "Slab Thickness (inches)": "Slab Thickness (inches)",
         "4 inches (default)": "4 inches (default)",
         "5 inches": "5 inches",
         "Concrete Details": "Concrete Details",
         "Concrete Load (cubic meters)": "Concrete Load (cubic meters)",
         "Concrete Cost ($)": "Concrete Cost ($)",
         "Cost per cubic meter ($)": "Cost per cubic meter ($)",
         "Tip ($)": "Tip ($)",
         "Minimum load until 2.5 cubic meter values": "Minimum load until 2.5 cubic meter values",
         "Extra Cost for 2 Extra Meters ($)": "Extra Cost for 2 Extra Meters ($)",
         "Recommendation: Always order 1/2 meter extra to avoid shortages": "Recommendation: Always order 1/2 meter extra to avoid shortages",
         "Digging and Bin Details": "Digging and Bin Details",
         "Dig Area (sq ft)": "Dig Area (sq ft)",
         "Depth for digging (inches)": "Depth for digging (inches)",
         "Bin Type": "Bin Type",
         "Number of Bins": "Number of Bins",
         "Bin Cost ($)": "Bin Cost ($)",
         "Reinforcement Details": "Reinforcement Details",
         "Reinforcement Type": "Reinforcement Type",
         "Wire Mesh Area (sq ft)": "Wire Mesh Area (sq ft)",
         "Wire Mesh Count": "Wire Mesh Count",
         "Rod Count": "Rod Count",
         "Labor Details": "Labor Details",
         "Number of General Labor Days": "Number of General Labor Days",
         "Number of General Labor Workers": "Number of General Labor Workers",
         "General Labor Cost ($/day)": "General Labor Cost ($/day)",
         "Number of Supervisory Labor Days": "Number of Supervisory Labor Days",
         "Number of Supervisory Labor Workers": "Number of Supervisory Labor Workers",
         "Supervisory Labor Cost ($/day)": "Supervisory Labor Cost ($/day)",
         "Gravel Details": "Gravel Details",
         "Gravel Type": "Gravel Type",
         "Gravel Yards": "Gravel Yards",
         "Delivery Fee ($)": "Delivery Fee ($)",
         "Extra Costs": "Extra Costs",
         "Extra Cost Name": "Extra Cost Name",
         "Extra Cost ($)": "Extra Cost ($)",
         "Add Extra Cost": "Add Extra Cost",
         "Calculate Total Cost": "Calculate Total Cost",
         "Total Cost:": "Total Cost:",
      },
   },
   pa: {
      translation: {
         "Concrete Cost Estimation": "ਕੰਕਰੀਟ ਲਾਗਤ ਅਨੁਮਾਨ",
         "Project Area Details": "ਪਰੋਜੈਕਟ ਖੇਤਰ ਵੇਰਵੇ",
         "Total Area (sq ft)": "ਕੁੱਲ ਖੇਤਰਫਲ (ਚੌਰਸ ਫੁੱਟ)",
         "Enter total area in sq ft": "ਕੁੱਲ ਖੇਤਰਫਲ ਦਰਜ ਕਰੋ (ਚੌਰਸ ਫੁੱਟ)",
         "Slab Thickness (inches)": "ਸਲੈਬ ਮੋਟਾਈ (ਇੰਚਾਂ)",
         "4 inches (default)": "4 ਇੰਚਾਂ (ਮੁੱਢਲੀ)",
         "5 inches": "5 ਇੰਚਾਂ",
         "Concrete Details": "ਕੰਕਰੀਟ ਵੇਰਵੇ",
         "Concrete Load (cubic meters)": "ਕੰਕਰੀਟ ਲੋਡ (ਘਣ ਮੀਟਰ)",
         "Concrete Cost ($)": "ਕੰਕਰੀਟ ਦੀ ਲਾਗਤ ($)",
         "Cost per cubic meter ($)": "ਪਰ ਘਣ ਮੀਟਰ ਦੀ ਲਾਗਤ ($)",
         "Tip ($)": "ਟਿੱਪ ($)",
         "Minimum load until 2.5 cubic meter values": "ਘੱਟੋ-ਘੱਟ ਲੋਡ 2.5 ਘਣ ਮੀਟਰ ਤੱਕ",
         "Extra Cost for 2 Extra Meters ($)": "2 ਵਾਧੂ ਮੀਟਰ ਲਈ ਵਾਧੂ ਲਾਗਤ ($)",
         "Recommendation: Always order 1/2 meter extra to avoid shortages": "ਸਿਫਾਰਿਸ਼: ਘਾਟ ਨੂੰ ਟਾਲਣ ਲਈ ਹਮੇਸ਼ਾ 1/2 ਮੀਟਰ ਵਾਧੂ ਆਰਡਰ ਕਰੋ",
         "Digging and Bin Details": "ਖੁਦਾਈ ਅਤੇ ਬਿਨ ਵੇਰਵੇ",
         "Dig Area (sq ft)": "ਖੁਦਾਈ ਖੇਤਰ (ਚੌਰਸ ਫੁੱਟ)",
         "Depth for digging (inches)": "ਖੁਦਾਈ ਲਈ ਡੂੰਘਾਈ (ਇੰਚਾਂ)",
         "Bin Type": "ਬਿਨ ਕਿਸਮ",
         "Number of Bins": "ਬਿਨ ਦੀ ਸੰਖਿਆ",
         "Bin Cost ($)": "ਬਿਨ ਦੀ ਲਾਗਤ ($)",
         "Reinforcement Details": "ਮਜਬੂਤੀ ਦੇ ਵੇਰਵੇ",
         "Reinforcement Type": "ਮਜਬੂਤੀ ਦੀ ਕਿਸਮ",
         "Wire Mesh Area (sq ft)": "ਵਾਇਰ ਮੈਸ਼ ਖੇਤਰ (ਚੌਰਸ ਫੁੱਟ)",
         "Wire Mesh Count": "ਵਾਇਰ ਮੈਸ਼ ਦੀ ਗਿਣਤੀ",
         "Rod Count": "ਰੌਡ ਗਿਣਤੀ",
         "Labor Details": "ਮਜ਼ਦੂਰ ਵੇਰਵੇ",
         "Number of General Labor Days": "ਸਧਾਰਣ ਮਜ਼ਦੂਰੀ ਦੇ ਦਿਨਾਂ ਦੀ ਸੰਖਿਆ",
         "Number of General Labor Workers": "ਸਧਾਰਣ ਮਜ਼ਦੂਰੀ ਦੇ ਕਾਮਿਆਂ ਦੀ ਸੰਖਿਆ",
         "General Labor Cost ($/day)": "ਸਧਾਰਣ ਮਜ਼ਦੂਰੀ ਦੀ ਲਾਗਤ ($/ਦਿਨ)",
         "Number of Supervisory Labor Days": "ਨਿਗਰਾਨੀ ਮਜ਼ਦੂਰੀ ਦੇ ਦਿਨਾਂ ਦੀ ਸੰਖਿਆ",
         "Number of Supervisory Labor Workers": "ਨਿਗਰਾਨੀ ਮਜ਼ਦੂਰੀ ਦੇ ਕਾਮਿਆਂ ਦੀ ਸੰਖਿਆ",
         "Supervisory Labor Cost ($/day)": "ਨਿਗਰਾਨੀ ਮਜ਼ਦੂਰੀ ਦੀ ਲਾਗਤ ($/ਦਿਨ)",
         "Gravel Details": "ਬਾਲੂ ਦੇ ਵੇਰਵੇ",
         "Gravel Type": "ਬਾਲੂ ਦੀ ਕਿਸਮ",
         "Gravel Yards": "ਬਾਲੂ ਯਾਰਡ",
         "Delivery Fee ($)": "ਡਿਲੀਵਰੀ ਫੀਸ ($)",
         "Extra Costs": "ਵਾਧੂ ਲਾਗਤ",
         "Extra Cost Name": "ਵਾਧੂ ਲਾਗਤ ਦਾ ਨਾਮ",
         "Extra Cost ($)": "ਵਾਧੂ ਲਾਗਤ ($)",
         "Add Extra Cost": "ਵਾਧੂ ਲਾਗਤ ਸ਼ਾਮਲ ਕਰੋ",
         "Calculate Total Cost": "ਕੁੱਲ ਲਾਗਤ ਦੀ ਗਣਨਾ ਕਰੋ",
         "Total Cost:": "ਕੁੱਲ ਲਾਗਤ:",
      },
   },
};

i18n
   .use(initReactI18next)
   .init({
      resources,
      lng: 'en', // default language
      fallbackLng: 'en',

      interpolation: {
         escapeValue: false,
      },
   });

export default i18n;
