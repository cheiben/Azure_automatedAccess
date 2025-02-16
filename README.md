# Access Management Portal

A simple automated access management portal that lets users submit access requests, which then trigger an approval workflow using Azure Functions and Azure Logic Apps.

## Overview

This project demonstrates:
- A **React** front-end where users can submit access requests.
- **Azure Functions** for processing access requests and approvals.
- Integration with **Azure Logic Apps** to automate the approval workflow.

## Project Structure

```
my-access-management-project/
├── AccessFunctions/                 # Azure Functions backend
│   ├── ProcessAccessRequest/        # HTTP trigger function for access requests
│   │   ├── ProcessAccessRequest.cs  
│   │   └── function.json             
│   ├── ProcessApproval/             # HTTP trigger function for processing approvals
│   │   ├── ProcessApproval.cs        
│   │   └── function.json             
│   ├── host.json                    
│   ├── local.settings.json          
│   └── AccessFunctions.csproj       
├── access-portal/                   # React frontend project
│   ├── public/
│   │   └── index.html               
│   ├── src/
│   │   ├── components/
│   │   │   ├── AccessRequestForm.js  # Form for submitting access requests
│   │   │   └── ApprovalDashboard.js  # Simulated approval dashboard
│   │   ├── services/
│   │   │   └── api.js                # API calls to the backend
│   │   ├── App.js                    
│   │   └── index.js                  
│   ├── .env                         # Contains environment variables
│   ├── package.json                 
│   └── README.md                    
└── README.md                        
```

## Prerequisites

- **Node.js** and **npm**
- **Azure Functions Core Tools**
- An active **Azure subscription** (for deployment)

## Setup and Running

### Backend (Azure Functions)

1. Navigate to the `AccessFunctions` folder:
   ```bash
   cd AccessFunctions
   ```
2. Start the functions runtime (using port 7072):
   ```bash
   func start --port 7072
   ```
3. Test the endpoints:
   - **ProcessAccessRequest:** [http://localhost:7072/api/ProcessAccessRequest](http://localhost:7072/api/ProcessAccessRequest)
   - **ProcessApproval:** [http://localhost:7072/api/ProcessApproval](http://localhost:7072/api/ProcessApproval)

### Frontend (React)

1. Navigate to the `access-portal` folder:
   ```bash
   cd access-portal
   ```
2. Create a `.env` file in the project root with the following content:
   ```env
   REACT_APP_API_BASE_URL=http://localhost:7072/api
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the React development server:
   ```bash
   npm start
   ```
5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Using the Application

- **Submit Access Request:**  
  Use the access request form to enter details like resource, access type, justification, duration, and start date.  
- **Approval Workflow:**  
  Once submitted, the request will be processed by Azure Functions. The approval workflow can be simulated via the Approval Dashboard in the React app or automated using an Azure Logic App (see next section).

## Automating Approval with Azure Logic Apps

1. **Create a Logic App:**  
   In the Azure Portal, create a Logic App with an HTTP trigger.
2. **Design the Workflow:**  
   - Configure the Logic App to receive the access request payload.
   - Use the "Start and wait for an approval" action to send an approval email/notification.
   - Add a condition to check the approver’s response.
   - Call your backend’s `ProcessApproval` endpoint with the decision.
3. **Integrate with Backend:**  
   Update the `ProcessAccessRequest` function to call your Logic App URL after processing the access request.

## Deployment

- **Backend:** Deploy the Azure Functions to Azure.
- **Frontend:** Deploy the React app to a hosting service like Azure Static Web Apps, Netlify, or Vercel.
- Update the `.env` file with the production API URL.

---

by: CheikhB
