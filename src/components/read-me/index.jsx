import React from "react";

export default function ReadMe() {
  return (
    <div>
      <p># Hospital-Report App</p>

      <h6 className="mt-4">### Purpose of App</h6>
      <p>
        The aim of the application is to be able to track the reports written by
        labors to patients and to sort and display them according to various
        criteria.
      </p>

      <h6>Technology Stack</h6>
      <p>- Java</p>
      <p>- Spring Boot (Data JPA, Web, MySQL Driver)</p>
      <p>- MySQL</p>

      <p className="mt-12">## How to run the application</p>
      <ul>
        <li>1. Clone the repository </li>
        <li>
          2. Create a database schema named `hospital` with MySQL or configure
          it yourself in `application.yml` also configure the username and
          password
        </li>
        <li>
          {" "}
          3. Make sure you have Maven and Java (Java 8 or higher version,
          preferably Java 17) installed{" "}
        </li>
        <li>4. Run the application with `mvn spring-boot:run` command </li>
        <li>
          5. Open `http://localhost:8080` in your browser or use Postman to test
          the endpoints
        </li>
        <li>6. Open-up the front-end application and with `npm install` install necessary packages</li>
        <li>7. Then run the application with `npm start` command</li>
        <li>8. You can find the endpoints below</li>
      </ul>

      <p className="mt-12">## Endpoints</p>
      <p>### Patient Endpoints</p>
      <p>- `GET /patients` - Find all</p>
      <p>
        - `GET /patients/national-id` - Find a patient by national id (Requires
        a national id as a parameter)
      </p>
      <p>- `POST /patients/create` - Create a new patient</p>
      <p>
        - `POST /patients/login` - Login a patient (Requires a LoginRequest
        body)
      </p>

      <p className="mt-12">### Labor Endpoints</p>
      <p>- `GET /labors` - Find all</p>
      <p>- `POST /create` - Create a new labor</p>
      <p>- `POST /login` - Login a labor (Requires a LoginRequest body)</p>
      <p>
        - `GET /hospital-id` - Find a labor by hospital id (Requires a hospital
        id as a parameter)
      </p>

      <p className="mt-12">### Report Endpoints</p>
      <p>
        - `POST reports/create` - Create a new report (Requires a ReportDto
        body)
      </p>
      <p>
        - `GET reports/find-by-patient-name/firstName/lastName` - Find reports
        by patient's first and last name
      </p>
      <p>
        - `GET reports/find-by-labor-name/firstName/lastName` - Find reports by
        labor's first and last name
      </p>
      <p>
        - `GET reports/find-patient?nationalId=nationalId` - Find reports by
        patient's national id
      </p>
      <p>
        - `GET reports/find-all-by-order?orderBy=orderBy` - Find all reports and
        order them by given parameter (asc or desc)
      </p>
      <p>- `GET reports/find-all` - Find all</p>
      <p>
        - `PUT reports/update` - Update a report by id (Requires id as request
        param, also requires a UpdateRequest body)
      </p>
      <p>- `DELETE reports/delete/id` - Delete a report by id (int)</p>

      <p className="mt-12">### Custom Response Codes</p>
      <p>- `200` - OK</p>
      <p>- `1001` - Your hospital id must be 7 characters</p>
      <p>- `1002` - Username or password is incorrect</p>
      <p>- `1003` - National id must be 11 characters</p>
    </div>
  );
}
