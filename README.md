

[Watch the video here](https://drive.google.com/file/d/18hkm9KSxxtbDuKHKyw8eRAW4emHo2yo_/view?usp=drive_link)
## 📹 Demo Video

<p align="center">
  <a href="https://drive.google.com/file/d/18hkm9KSxxtbDuKHKyw8eRAW4emHo2yo_/view?usp=drive_link" target="_blank">
    <img src="https://img.shields.io/badge/Watch-Video-blue?style=for-the-badge" alt="Watch Video"/>
  </a>
</p>



# Smart Energy Meter using AWS

The **Smart Energy Meter** is an advanced IoT-based solution designed to monitor and manage energy consumption in real-time, addressing the limitations of traditional energy meters. Built on AWS cloud services and leveraging MQTT for lightweight communication, this project provides detailed, appliance-specific data, remote control capabilities, and actionable insights to reduce energy waste and costs. It is scalable across households, offices, and factories, making it a versatile tool for energy efficiency.

![Screenshot 2025-04-27 120646](https://github.com/user-attachments/assets/908533ba-ab5b-4c42-b1b1-962cc4ba1300)

![Screenshot 2025-04-27 114019](https://github.com/user-attachments/assets/a4f5c499-b6c2-40b8-812f-a7388699a387)

![Screenshot 2025-04-27 114226](https://github.com/user-attachments/assets/21cdcf8e-c219-403f-a0db-0af481760444)

![Screenshot 2025-04-27 114155](https://github.com/user-attachments/assets/69902fac-4c82-4177-aaac-155ce3f04f8d)

![Screenshot 2025-04-27 120313](https://github.com/user-attachments/assets/bcafaf66-0ee3-47f0-b966-a708c7bf17f6)

![Screenshot 2025-04-27 115943](https://github.com/user-attachments/assets/6e37b5c7-b5ef-4802-81a0-1afc820ddb9b)

![Screenshot 2025-04-27 120003](https://github.com/user-attachments/assets/b93a8fa8-6895-4845-aa06-6af83caf331c)

![Screenshot 2025-04-27 120028](https://github.com/user-attachments/assets/b5462718-e47a-471e-b6bf-5d306b7344e3)

![Screenshot 2025-04-27 120046](https://github.com/user-attachments/assets/c4d6e333-45f4-48e3-bd24-0932e807d27e)

![Screenshot 2025-04-27 120106](https://github.com/user-attachments/assets/57634d11-ac8c-43ce-b036-eba7df028c9e)

![Screenshot 2025-04-27 120121](https://github.com/user-attachments/assets/6caebaa4-a448-4cc7-9b97-13a519f16d23)

![Screenshot 2025-04-27 120136](https://github.com/user-attachments/assets/edbaa39d-4438-4ea4-b53e-bb4c62c1472e)

![Screenshot 2025-04-27 120153](https://github.com/user-attachments/assets/cfbc077f-c140-4b28-aaf1-ae4489cf7fb2)

![Screenshot 2025-04-27 120230](https://github.com/user-attachments/assets/be8a9d0f-4919-4b57-978a-60a3f397f10c)

![Screenshot 2025-04-27 120313](https://github.com/user-attachments/assets/80c42468-7fc6-4284-9261-3e8d4d4a4a02)

![Screenshot 2025-04-27 115924](https://github.com/user-attachments/assets/79316bb9-a4fa-4ab1-8b21-a05be5429d11)


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

## Delivered a comprehensive presentation on this Project, highlighting key insights and takeaways.
You can find the presentation files in the repo.

![unnamed (1)](https://github.com/user-attachments/assets/9c23f807-11f3-4152-bacf-77f6383f84fc)



![unnamed (2)](https://github.com/user-attachments/assets/4be53067-ad16-4e1e-817f-d4c4f3a38ace)


![unnamed (3)](https://github.com/user-attachments/assets/7e63c58f-c44a-49ea-a76c-c99cf17e0d92)
---

## Acknowledgments

- Built as an extension of a simple CRUD application.
- Thanks to AWS for providing scalable, serverless tools and to Chart.js for visualization.

