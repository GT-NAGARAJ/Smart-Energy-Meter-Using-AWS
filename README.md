
# Smart Energy Meter using AWS

The **Smart Energy Meter** is an advanced IoT-based solution designed to monitor and manage energy consumption in real-time, addressing the limitations of traditional energy meters. Built on AWS cloud services and leveraging MQTT for lightweight communication, this project provides detailed, appliance-specific data, remote control capabilities, and actionable insights to reduce energy waste and costs. It is scalable across households, offices, and factories, making it a versatile tool for energy efficiency.
![Screenshot 2025-04-27 114019](https://github.com/user-attachments/assets/c619d1e4-6e7e-43fd-9165-d8e0628c1235)

---


## Project Overview

Traditional energy meters lack real-time visibility, remote control, and detailed consumption tracking, leading to inefficiencies such as forgotten appliances, phantom energy drain, and increased carbon footprints. The Smart Energy Meter solves these problems by offering:
- **Real-Time Monitoring**: Track energy usage for individual appliances.
- **Remote Control**: Toggle appliances ON/OFF and schedule operations from anywhere.
- **Data Insights**: Visualize consumption patterns and detect anomalies.
- **Cost Savings**: Reduce energy bills with optimized usage and alerts.

This project integrates IoT devices, AWS cloud services, and a user-friendly frontend to create a scalable, efficient energy management system.

---

## Features

- **Appliance Control Panel**: Add, schedule, and toggle appliances (e.g., lights, fans, ACs).
- **Energy Meter**: Displays real-time power usage (kWh) and balance management.
- **Dashboard**: Visualizes consumption via charts (e.g., power usage over time) and critical data tables.
- **Remote Monitoring**: Control appliances and view data remotely.
- **IoT Integration**: Uses MQTT for real-time device communication with AWS IoT Core.
- **Scalability**: Suitable for small households to large factories.
- **Cost Analysis**: Demonstrates significant ROI through energy savings.

![Screenshot 2025-04-27 114111](https://github.com/user-attachments/assets/bb91431f-3032-41f1-8b36-2ad20f26ffd5)
![Screenshot 2025-04-27 114155](https://github.com/user-attachments/assets/a6210d30-cb91-4771-bb5f-5260ae726557)
![Screenshot 2025-04-27 114226](https://github.com/user-attachments/assets/667138af-d16e-41f1-8568-2b7d50613729)
![Screenshot 2025-04-27 114249](https://github.com/user-attachments/assets/fc2608f1-72ed-43a1-a799-53ae1277587c)
![Screenshot 2025-04-27 114314](https://github.com/user-attachments/assets/0057702e-3a44-4227-9098-fced292f1e8f)
![Screenshot 2025-04-27 114417](https://github.com/user-attachments/assets/095949f9-e17c-4d02-b67a-95155de1848c)
![Screenshot 2025-04-27 114035](https://github.com/user-attachments/assets/57f12723-75b4-4bcf-90d3-35a751a06e82)

---

## Technologies Used

- **AWS Services**:
  - **Lambda**: Serverless functions for data processing.
  - **API Gateway**: RESTful API management with CORS support.
  - **DynamoDB**: NoSQL database for storing appliance data and usage statistics.
  - **IoT Core**: MQTT broker for device communication.
  - **S3**: Potential storage for logs or static assets.
- **Frontend**:
  - HTML5, CSS3, JavaScript for the user interface.
  - Chart.js for data visualization.
- **Protocols**:
  - MQTT for real-time, lightweight messaging.

---

## Architecture

The system architecture ensures efficiency, scalability, and real-time data flow:

1. **IoT Devices**: Collect usage data (e.g., power consumed, timestamps) and publish to MQTT topics (e.g., `appliance/status`).
2. **AWS IoT Core**: Routes messages using SQL rules to DynamoDB:
   ```sql
   SELECT timestamp AS Timestamp,
          appliance_name AS ApplicationName,
          appliance_status AS ApplianceStatus,
          currentpowerConsumer,
          start_time AS StartTime,
          end_time AS EndTime
   FROM 'appliance/status'
   ```
3. **Lambda Functions**: Process data and handle API requests (e.g., fetching dashboard data).
4. **API Gateway**: Exposes RESTful endpoints for frontend interactions.
5. **Frontend**: Provides a user-friendly interface for appliance control, energy monitoring, and data visualization.

A detailed AWS diagram is available in the project documentation.

---

## Setup Instructions

### Prerequisites
- An AWS account with permissions for Lambda, API Gateway, DynamoDB, and IoT Core.
- AWS CLI configured with credentials.
- Node.js and npm (for local testing, optional).

### Deployment Steps
1. **Create a DynamoDB Table**:
   - Create a table named `appliance` with `ApplianceName` as the partition key (String type).
   - Optionally, create a `CriticalData` table for dashboard insights.

2. **Upload Lambda Functions**:
   - Deploy Lambda functions for handling API requests (e.g., `UpdateStatus`, `CreateAppliance`, `ViewChart`).
   - Use Python 3.9 runtime and grant DynamoDB access via IAM roles.

3. **Set Up API Gateway**:
   - Create REST APIs for each operation (e.g., `POST /UpdateStatus`, `GET /ViewAppliance/{ApplianceName}`).
   - Enable CORS for cross-origin requests.
   - Deploy to a stage (e.g., `Prod`) and note the invoke URL.

4. **Configure IoT Core**:
   - Set up MQTT topics (e.g., `appliance/status`) and rules to route messages to DynamoDB.

5. **Update Frontend**:
   - Replace API URLs in JavaScript files (e.g., `ViewAppliance.js`, `dashboard.js`) with your API Gateway endpoints.

6. **Local Testing**:
   - Serve frontend files using:
     ```bash
     npx http-server
     ```
   - Test API interactions with your deployed endpoints.

Detailed setup steps are available in the project wiki.

---

## Usage

1. **Add Appliances**:
   - Use the "Add Appliance" tab to register new devices with type-specific fields (e.g., power rating, appliance ID).

2. **Control Appliances**:
   - Toggle appliances ON/OFF, track usage time, and view detailed statistics via the "View Appliances" page.

3. **Monitor Energy**:
   - Check real-time power consumption and manage your balance on the "Energy Meter" page.

4. **Analyze Data**:
   - Use the dashboard to visualize consumption patterns through pie and line charts.

5. **Remote Control**:
   - (Partial implementation) Control appliances remotely via the "Remote Controller" tab.

---

## Cost Analysis and ROI

The Smart Energy Meter delivers significant cost savings by reducing energy consumption by an estimated 7.5%:
- **Households**: 
  - Implementation cost: $147
  - Monthly savings: $262.50
  - ROI: 81.28%
- **Offices**:
  - Implementation cost: $575
  - Monthly savings: $11,250
  - ROI: 1837.44%
- **Factories**:
  - Implementation cost: $2,094
  - Monthly savings: $135,000
  - ROI: 4483.5%

These figures demonstrate the project’s economic viability across different scales.

---

## Contributing

Contributions are welcome! To contribute:
1. Fork the repository.
2. Create a feature branch.
3. Submit a pull request with clear descriptions and tests.


---

## Acknowledgments

- Built as an extension of a simple CRUD application.
- Thanks to AWS for providing scalable, serverless tools and to Chart.js for visualization.

