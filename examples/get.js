/**
 * @name Get user events
 * @description Get user profile information by id
 * @route {GET} /api/users/:userId/events
 * @urlparam {string} [userId] User unique identifier
 * @headerparam {string} [Authorization] JWT token
 * @queryparam (optional) {string} [type] Event type to filter
 * @queryparam (optional) {number} [skip] Amount of results to skip
 * @queryparam (optional) {number} [limit] Max amount of results to receive
 * @response {200} OK
 * @responsebody {array<object>} [*] Events
 * @responsebody {number} [[].id] Unique event dentifier
 * @responsebody {string} [[].type] Event type
 * @responsebody {string} [[].description] Event description
 * @responsebody {date} [[].createdAt] Event date
 * @response {401} Unauthorized
 * @responsebody {string} [code] unauthorized
 * @responsebody {string} [message] Error message
 * @response {400} Invalid user id
 * @responsebody {string} [code] invalid_user_id
 * @responsebody {string} [message] Invalid user id
 */
function getUserEventsRoute() {
    // route implementation
}

getUserEventsRoute();
