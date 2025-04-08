const axios = require("axios");

const API_BASE_URL = "http://localhost:3000";

class APIClient {
	constructor() {
		this.client = axios.create({
			baseURL: API_BASE_URL,
			timeout: 10000,
			headers: {
				"Content-Type": "application/json",
			},
		});
	}

	// Call the /hospital endpoint
	async sendHospitalRequest(phoneNumber) {
		try {
			const response = await this.client.post("/hospital", {
				PhoneNumber: phoneNumber,
			});
			return response.data;
		} catch (error) {
			console.error(
				"Error calling hospital endpoint:",
				error.response?.data || error.message
			);
			throw error;
		}
	}

	// Call the /hospital/upload endpoint with file
	async uploadHospitalFile(phoneNumber, filePath) {
		try {
			const formData = new FormData();
			formData.append("pdf", fs.createReadStream(filePath));
			formData.append("phoneNumber", phoneNumber);

			const response = await this.client.post(
				"/hospital/upload",
				formData,
				{
					headers: {
						...formData.getHeaders(),
					},
				}
			);
			return response.data;
		} catch (error) {
			console.error(
				"Error uploading hospital file:",
				error.response?.data || error.message
			);
			throw error;
		}
	}

	//  Call the /signup endpoint
	async registerUser(phoneNumber, deviceToken) {
		try {
			const response = await this.client.post("/signup", {
				PhoneNumber: phoneNumber,
				deviceToken: deviceToken,
			});
			return response.data;
		} catch (error) {
			console.error(
				"Error registering user:",
				error.response?.data || error.message
			);
			throw error;
		}
	}

	// Call the notification response endpoint
	async sendNotificationResponse(requestId, response) {
		try {
			const result = await this.client.post("/notification-response", {
				requestId,
				response,
			});
			return result.data;
		} catch (error) {
			console.error(
				"Error sending notification response:",
				error.response?.data || error.message
			);
			throw error;
		}
	}
}

module.exports = new APIClient();
