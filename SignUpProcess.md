# Sign Up Process Documentation

This document outlines the multi-step sign-up process for the Tawsilet Driver Mobile Application.

---

## Step 1: Account Information

This is the first step of the sign-up process where the user provides their basic account and personal information.

### UI

The UI for this step consists of a form with several input fields for personal details, a profile picture upload, and password creation. It includes a button to proceed to the next step.

### Inputs

| Field             | Description                                       | Validation                                                                                                                                                                                                |
| ----------------- | ------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Profile Picture** | User's profile picture.                           | Required.                                                                                                                                                                                                 |
| **First Name**    | User's first name.                                | Required.                                                                                                                                                                                                 |
| **Last Name**     | User's last name.                                 | Required.                                                                                                                                                                                                 |
| **Email**         | User's email address.                             | Required, must be a valid email format. The system checks if the email is already in use.                                                                                                                 |
| **Phone Number**  | User's phone number.                              | Required, must be a valid phone number.                                                                                                                                                                   |
| **Region**        | The region in Tunisia where the user operates.    | Required. User selects from a list of Tunisian regions.                                                                                                                                                   |
| **Password**      | User's password for the account.                  | Required. Must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.                                                         |

---

## Step 2: Contact Information (Documents)

In this step, the user is required to upload photos of their identification and driver's license.

### UI

The UI displays four sections for document uploads. Each section shows a placeholder image and allows the user to tap to upload a photo from their camera or gallery. While uploading, a loading indicator is shown.

### Inputs

| Field               | Description                               | Validation |
| ------------------- | ----------------------------------------- | ---------- |
| **CIN Front**       | Front side of the National Identity Card. | Required.  |
| **CIN Back**        | Back side of the National Identity Card.  | Required.  |
| **Licence Front**   | Front side of the driver's license.       | Required.  |
| **Licence Back**    | Back side of the driver's license.        | Required.  |

---

## Step 3: Car Information

This step collects basic information about the user's vehicle.

### UI

This step presents a simple form with text inputs for the vehicle's details.

### Inputs

| Field           | Description                     | Validation                                                                  |
| --------------- | ------------------------------- | --------------------------------------------------------------------------- |
| **Mark**        | The brand of the car (e.g., Toyota). | Required.                                                                 |
| **Model**       | The model of the car (e.g., Corolla). | Required.                                                                 |
| **Year**        | The manufacturing year of the car. | Required. Must be a 4-digit number and not in the future.                   |
| **Color**       | The color of the car.           | Required.                                                                 |
| **Matriculation** | The license plate number.       | Required.                                                                 |

---

## Step 4: Vehicle Pictures

The user needs to upload pictures of their vehicle from different angles.

### UI

Similar to the document upload step, this UI has four sections for uploading vehicle pictures (front, back, right, and left). Each section has a placeholder and allows photo uploads from the camera or gallery.

### Inputs

| Field                 | Description                         | Validation |
| --------------------- | ----------------------------------- | ---------- |
| **Vehicle Picture 1** | A picture of the front of the vehicle. | Required.  |
| **Vehicle Picture 2** | A picture of the back of the vehicle.  | Required.  |
| **Vehicle Picture 3** | A picture of the right side of the vehicle. | Required.  |
| **Vehicle Picture 4** | A picture of the left side of the vehicle. | Required.  |

---

## Step 5: Vehicle Validation Documents

This is the final step where the user uploads vehicle-related legal documents and submits the application.

### UI

This step allows the user to pick an expiry date for their insurance and upload pictures of their insurance policy and vehicle registration card (Gray Card). A "Finish" button is present to submit all the collected information. A success modal is shown upon successful submission.

### Inputs

| Field                 | Description                                      | Validation |
| --------------------- | ------------------------------------------------ | ---------- |
| **Assurance Date**    | The expiry date of the vehicle's insurance.      | Required.  |
| **Assurance Picture** | A picture of the vehicle's insurance document.   | Required.  |
| **Gray Card Picture (Front)** | A picture of the front of the gray card.         | Required.  |
| **Gray Card Picture (Back)**  | A picture of the back of the gray card.          | Required.  |

</rewritten_file> 