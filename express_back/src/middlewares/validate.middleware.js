import ApiResponse from "../utils/apiResponse.js";

// Middleware de validation des données d'entrée
const validate =
  (schema, property = "body") =>
  (req, res, next) => {
    const result = schema.safeParse(req[property]);

    if (!result.success) {
      const errors = result.error.issues.map((err) => ({
        field: err.path[0],
        message: err.message,
      }));

      return ApiResponse.badRequest(res, "Validation échouée", errors);
    }

    req.body = result.data;
    next();
  };

export default validate;
