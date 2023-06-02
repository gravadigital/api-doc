/**
 * @name Save new user event
 * @description Save a new event related to user
 * @route {POST} /api/users/:userId/events
 * @urlparam {string} [userId] User unique identifier
 * @headerparam {string} [Authorization] JWT token
 * @bodyparam {string} [type] Event type
 * @bodyparam (optional) {string} [description] Event description
 * @response {200} OK
 * @responsebody {number} [id] Unique event dentifier
 * @responsebody {string} [type] Event type
 * @responsebody {string} [description] Event description
 * @responsebody {date} [createdAt] Event date
 * @response {401} Unauthorized
 * @responsebody {string} [code] unauthorized
 * @responsebody {string} [message] Error message
 * @response {400} Invalid user id
 * @responsebody {string} [code] invalid_user_id
 * @responsebody {string} [message] Invalid user id
 * @response {400} Invalid fields
 * @responsebody {string} [code] invalid_fields
 * @responsebody {string} [message] Invalid fields
 */
function postUserEventsRoute() {
    // route implementation
}

postUserEventsRoute();
