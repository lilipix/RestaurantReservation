class ApiResponse {
  
  static success(res, message, data = null, statusCode = 200) {
    return res.status(statusCode).json({
      success: true,
      message,
      data,
      timestamp: new Date().toISOString(),
    });
  }

  static error(res, message, statusCode = 500, errors = null) {
    return res.status(statusCode).json({
      success: false,
      message,
      errors,
      timestamp: new Date().toISOString(),
    });
  }

  static created(res, message, data) {
    return this.success(res, message, data, 201);
  }

  static notFound(res, message = "Ressource non trouvée") {
    return this.error(res, message, 404);
  }

  static badRequest(res, message, errors = null) {
    return this.error(res, message, 400, errors);
  }

  // etc....
}

export default ApiResponse;
