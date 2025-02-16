import React, { useState } from "react";
import { submitAccessRequest } from "../services/api";

const AccessRequestForm = () => {
  // State for form data
  const [formData, setFormData] = useState({
    resource: "",
    accessType: "read",
    justification: "",
    duration: "",
    startDate: "",
  });

  // State for errors and submission status
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");

  // Validation function
  const validate = () => {
    const newErrors = {};
    if (!formData.resource.trim()) newErrors.resource = "Resource is required.";
    if (!formData.justification.trim()) newErrors.justification = "Justification is required.";
    if (!formData.duration || isNaN(formData.duration) || Number(formData.duration) <= 0)
      newErrors.duration = "Duration must be a positive number.";
    if (!formData.startDate) newErrors.startDate = "Start date is required.";
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResponseMessage("");
    const formErrors = validate();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    setErrors({});
    setIsSubmitting(true);

    try {
      const response = await submitAccessRequest(formData);
      setResponseMessage(response.message || "Request submitted successfully!");
    } catch (error) {
      console.error("Submission error:", error);
      setResponseMessage("Error processing your request.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <h2>Access Request Form</h2>
      <form onSubmit={handleSubmit} noValidate>
        <div>
          <label htmlFor="resource">Resource:</label>
          <input
            type="text"
            id="resource"
            name="resource"
            value={formData.resource}
            onChange={handleChange}
            placeholder="Enter resource name"
          />
          {errors.resource && <span style={{ color: "red" }}>{errors.resource}</span>}
        </div>

        <div>
          <label htmlFor="accessType">Access Type:</label>
          <select id="accessType" name="accessType" value={formData.accessType} onChange={handleChange}>
            <option value="read">Read</option>
            <option value="write">Write</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <div>
          <label htmlFor="justification">Justification:</label>
          <textarea
            id="justification"
            name="justification"
            value={formData.justification}
            onChange={handleChange}
            placeholder="Enter justification"
          />
          {errors.justification && <span style={{ color: "red" }}>{errors.justification}</span>}
        </div>

        <div>
          <label htmlFor="duration">Duration (days):</label>
          <input
            type="number"
            id="duration"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            placeholder="Enter duration"
          />
          {errors.duration && <span style={{ color: "red" }}>{errors.duration}</span>}
        </div>

        <div>
          <label htmlFor="startDate">Start Date:</label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
          />
          {errors.startDate && <span style={{ color: "red" }}>{errors.startDate}</span>}
        </div>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit Request"}
        </button>
      </form>
      {responseMessage && <p>{responseMessage}</p>}
    </div>
  );
};

export default AccessRequestForm;
