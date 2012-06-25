# threadz

mobile networking application

## api

### user
-   POST /api/user/login (String login, String password)
-   GET /api/user/logout ()
-   PUT /api/user (String email, String password)

### thread
-   GET /api/thread ([Int start], [Int limit])
-   PUT /api/thread (String name)
-   DELETE /api/thread (String id)

### thread messages
-   GET /api/thread/message (String id)
-   PUT /api/thread/message (String id, String message)

### thread users
-   GET /api/thread/user (String id)
-   PUT /api/thread/user (String id, String userId)
-   DELETE /api/thread/user (String id, String userId)
