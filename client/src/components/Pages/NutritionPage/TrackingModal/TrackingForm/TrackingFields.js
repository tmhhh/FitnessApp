import InputField from "components/Common/InputField";
import bicepsIllustrator from "../../../../../assets/img/biceps.png";
import subscapularIllustrator from "../../../../../assets/img/subscapular.png";
import suprailiacIllustrator from "../../../../../assets/img/suprailiac.png";
import tricepsIllustrator from "../../../../../assets/img/triceps.png";
export const listInputFieldsForPredict = [
  {
    group: "Overall",
    data: [
      {
        name: "height",
        label: "Height (cm)",
        component: () => InputField,
        required: true,
      },
      {
        name: "weight",
        label: "Weight (kg)",
        component: () => InputField,
        required: true,
      },
      {
        name: "age",
        label: "Age",
        component: () => InputField,
        required: true,
      },
    ],
  },
  {
    group: "Upper Body",
    data: [
      {
        name: "neck",
        label: "Neck (cm)",
        component: () => InputField,
        required: true,
      },
      {
        name: "biceps",
        label: "Biceps (cm)",
        component: () => InputField,
        required: true,
      },
      {
        name: "chest",
        label: "Chest (cm)",
        component: () => InputField,
        required: true,
      },
      {
        name: "forearm",
        label: "Forearm (cm)",
        component: () => InputField,
        required: true,
      },
      {
        name: "abdomen",
        label: "Abdomen (cm)",
        component: () => InputField,
        required: true,
      },
      {
        name: "wrist",
        label: "Wrist (cm)",
        component: () => InputField,
        required: true,
      },
    ],
  },
  {
    group: "Lower Body",
    data: [
      {
        name: "hip",
        label: "Hip",
        component: () => InputField,
      },

      {
        name: "thigh",
        label: "Thigh (cm)",
        component: () => InputField,
      },

      {
        name: "knee",
        label: "Knee (cm)",
        component: () => InputField,
      },

      {
        name: "ankle",
        label: "Ankle (cm)",
        component: () => InputField,
      },
    ],
  },
];

export const listInputFieldsForSkinFold = [
  {
    group: "Overall",
    data: [
      {
        name: "userHeight",
        label: "Height (inch)",
        component: () => InputField,
        required: true,
      },
      {
        name: "userWeight",
        label: "Weight (lb)",
        component: () => InputField,
        required: true,
      },
      {
        name: "userAge",
        label: "Age",
        component: () => InputField,
        required: true,
      },
    ],
  },
  {
    group: "Measurement 1",
    data: [
      {
        name: "userBiceps",
        label: "Biceps (cm)",
        component: () => InputField,
        required: true,
        src: bicepsIllustrator,
        tips: "Mid point on the muscle (generally this will be opposite the nipple). Mark the point halfway between the FLEXED bicepmuscle. When taking the measurement, the muscle (arm) should be RELAXED and in a perpendicular position",
      },
      {
        name: "userTriceps",
        label: "Triceps (cm)",
        component: () => InputField,
        required: true,
        src: tricepsIllustrator,
        tips: "Between the tip of the olecranon process of the ulna (elbow)   and the acromium of the scapula (shoulder).Mark the point on the back of the arm halfway between the tip of the elbow and the shoulder mark should be 1/2 way between caliper jaws.",
      },
      {
        name: "userSubscapular",
        label: "Subscapular (cm)",
        component: () => InputField,
        required: true,
        src: subscapularIllustrator,
        tips: "Below the tip of the inferior angle of the scapular, at anangle of 45 degrees to vertical (back, just under the shoulder blade). Mark the point just under the shoulder blade halfway between the spine and side. When taking the measurement, the skinfold caliper should be orientated at 45",
      },
      {
        name: "userSuprailiac",
        label: "Suprailiac (cm)",
        component: () => InputField,
        required: true,
        src: suprailiacIllustrator,
        tips: " Above the iliac crest in mid-axillary line (about one inch above the hip bone at an angle of 45 degrees to vertical). Mark the point about one inch above the hip bone. When taking the measurement, the skinfold caliper should be orientated at 45 degrees.",
      },
    ],
  },
  {
    group: "Measurement 2",
    data: [
      {
        name: "userBiceps",
        label: "Biceps (cm)",
        component: () => InputField,
        required: true,
        src: bicepsIllustrator,
        tips: " Mid point on the muscle (generally this will be opposite the nipple). Mark the point halfway between the FLEXED bicepmuscle. When taking the measurement, the muscle (arm) should be RELAXED and in a perpendicular position",
      },
      {
        name: "userTriceps",
        label: "Triceps (cm)",
        component: () => InputField,
        required: true,
        src: tricepsIllustrator,
        tips: "Between the tip of the olecranon process of the ulna (elbow)   and the acromium of the scapula (shoulder).Mark the point on the back of the arm halfway between the tip of the elbow and the shoulder mark should be 1/2 way between caliper jaws.",
      },
      {
        name: "userSubscapular",
        label: "Subscapular (cm)",
        component: () => InputField,
        required: true,
        src: subscapularIllustrator,
        tips: "Below the tip of the inferior angle of the scapular, at anangle of 45 degrees to vertical (back, just under the shoulder blade). Mark the point just under the shoulder blade halfway between the spine and side. When taking the measurement, the skinfold caliper should be orientated at 45",
      },
      {
        name: "userSuprailiac",
        label: "Suprailiac (cm)",
        component: () => InputField,
        required: true,
        src: suprailiacIllustrator,
        tips: " Above the iliac crest in mid-axillary line (about one inch above the hip bone at an angle of 45 degrees to vertical). Mark the point about one inch above the hip bone. When taking the measurement, the skinfold caliper should be orientated at 45 degrees.",
      },
    ],
  },
  {
    group: "Measurement 3",
    data: [
      {
        name: "userBiceps",
        label: "Biceps (cm)",
        component: () => InputField,
        required: true,
        src: bicepsIllustrator,
        tips: " Mid point on the muscle (generally this will be opposite the nipple). Mark the point halfway between the FLEXED bicepmuscle. When taking the measurement, the muscle (arm) should be RELAXED and in a perpendicular position",
      },
      {
        name: "userTriceps",
        label: "Triceps (cm)",
        component: () => InputField,
        required: true,
        src: tricepsIllustrator,
        tips: "Between the tip of the olecranon process of the ulna (elbow)   and the acromium of the scapula (shoulder).Mark the point on the back of the arm halfway between the tip of the elbow and the shoulder mark should be 1/2 way between caliper jaws.",
      },
      {
        name: "userSubscapular",
        label: "Subscapular (cm)",
        component: () => InputField,
        required: true,
        src: subscapularIllustrator,
        tips: "Below the tip of the inferior angle of the scapular, at anangle of 45 degrees to vertical (back, just under the shoulder blade). Mark the point just under the shoulder blade halfway between the spine and side. When taking the measurement, the skinfold caliper should be orientated at 45",
      },
      {
        name: "userSuprailiac",
        label: "Suprailiac (cm)",
        component: () => InputField,
        required: true,
        src: suprailiacIllustrator,
        tips: " Above the iliac crest in mid-axillary line (about one inch above the hip bone at an angle of 45 degrees to vertical). Mark the point about one inch above the hip bone. When taking the measurement, the skinfold caliper should be orientated at 45 degrees.",
      },
    ],
  },
];
